import { get, getAll, put, getLinkedRecords } from "./store.js";
import { pipelineStatus, isStageUnlocked } from "./gate.js";
import { draftSuggestion } from "./ai-assist.js";

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function nowIso() {
  return new Date().toISOString();
}

function renderStepper(observation, linked, activeKey) {
  const statuses = pipelineStatus(observation, linked);
  const items = statuses
    .map((s) => {
      const href = `#/observation/${observation.observation_id}/${s.path}`;
      const isActive = s.key === activeKey;
      if (s.status === "locked") {
        return `<li><span class="locked" aria-current="${isActive}">${esc(
          s.label
        )} <span class="step-status" data-state="locked">Locked</span></span></li>`;
      }
      return `<li><a href="${href}" aria-current="${isActive ? "page" : "false"}">${esc(
        s.label
      )} <span class="step-status" data-state="${s.status}">${
        s.status === "complete" ? "Done" : "Review"
      }</span></a></li>`;
    })
    .join("");
  return `<ol class="stepper" aria-label="Governance pipeline progress">${items}</ol>`;
}

function lockedNotice(stageLabel) {
  return `
    <div class="review-card">
      <h2>${esc(stageLabel)}</h2>
      <p class="inline-note" role="status">
        This stage is locked. Earlier stages in the governance pipeline have
        not been reviewed yet — see architecture/governance-pipeline.md.
        No screen may skip ahead.
      </p>
    </div>`;
}

/* ==========================================================================
   Inbox
   ========================================================================== */

export async function renderInbox(container) {
  const observations = await getAll("observations");
  if (observations.length === 0) {
    container.innerHTML = `
      <h2>Inbox</h2>
      <p>No observations yet. Observations arrive from the field device,
      a web form, or import — see architecture/data-lifecycle.md.</p>`;
    return;
  }

  const rows = await Promise.all(
    observations.map(async (obs) => {
      const linked = await getLinkedRecords(obs);
      const statuses = pipelineStatus(obs, linked);
      const current = statuses.find((s) => s.status === "current");
      const doneCount = statuses.filter((s) => s.status === "complete").length;
      return `
        <li class="review-card inbox-item">
          <div>
            <h2 style="margin-top:0;"><a href="#/observation/${esc(
              obs.observation_id
            )}">${esc(obs.observation_id)}</a></h2>
            <p class="text-small" style="margin:0;">System: ${esc(
              obs.system
            )} &middot; Created ${esc(obs.created_at)}</p>
          </div>
          <div>
            <p class="text-small" style="margin:0;">${doneCount} / ${
        statuses.length
      } stages reviewed</p>
            <p style="margin:0;">${
              current
                ? `Next: <strong>${esc(current.label)}</strong>`
                : "All stages reviewed"
            }</p>
          </div>
        </li>`;
    })
  );

  container.innerHTML = `
    <h2>Inbox — new and in-review observations</h2>
    <p>Each observation must pass Source, Consent, Risk, and Accessibility
      review, then Human Review, before a Publication Status decision can
      be recorded.</p>
    <ul class="inbox-grid" style="list-style:none; padding:0;">${rows.join(
      ""
    )}</ul>`;
}

/* ==========================================================================
   Observation detail
   ========================================================================== */

export async function renderObservationDetail(container, { id }) {
  const observation = await get("observations", id);
  if (!observation) {
    container.innerHTML = `<p>No observation found with id "${esc(id)}".</p>`;
    return;
  }
  const linked = await getLinkedRecords(observation);

  container.innerHTML = `
    <p><a href="#/">&larr; Back to inbox</a></p>
    <h2>Observation ${esc(observation.observation_id)}</h2>
    <dl class="field-list">
      <dt>System</dt><dd>${esc(observation.system)}</dd>
      <dt>Created</dt><dd>${esc(observation.created_at)}</dd>
      <dt>Observer</dt><dd>${esc(observation.observer_id || "—")}</dd>
      <dt>Device</dt><dd>${esc(observation.device_id || "—")}</dd>
      <dt>Location precision</dt><dd>${esc(
        (observation.location && observation.location.precision) || "—"
      )}</dd>
      <dt>Media</dt><dd>${
        observation.media
          ? Object.entries(observation.media)
              .map(([k, v]) => `${esc(k)}: <code>${esc(v)}</code>`)
              .join("<br>")
          : "—"
      }</dd>
      <dt>Publication status (recorded on observation)</dt>
      <dd>${esc(observation.publication_status)}</dd>
    </dl>
    ${renderStepper(observation, linked, null)}
    <p class="help-text">Open the current or completed stage above to review it.
      Locked stages become reachable once every earlier stage is reviewed.</p>`;
}

/* ==========================================================================
   Generic reviewable-field screen (source, consent, risk, accessibility)
   ========================================================================== */

const STAGE_CONFIG = {
  source: {
    label: "Source",
    storeName: "sources",
    linkedKey: "source",
    fields: [
      ["origin_type", "Origin type"],
      ["collector_id", "Collector"],
      ["device_id", "Device"],
      ["recorded_at", "Recorded at"],
    ],
    ruleNote: "SSL-002, Provenance Required — governance/rule-library.md.",
  },
  consent: {
    label: "Consent",
    storeName: "consent",
    linkedKey: "consent",
    fields: [
      ["state", "State"],
      ["consent_version", "Consent version"],
      ["subject_acknowledged", "Subject acknowledged"],
      ["recorded_by", "Recorded by"],
      ["recorded_at", "Recorded at"],
    ],
    ruleNote: "SSL-003, Consent State Required — governance/consent-model.md.",
  },
  risk: {
    label: "Risk",
    storeName: "risks",
    linkedKey: "risk",
    fields: [
      ["risk_level", "Risk level"],
      ["risk_factors", "Risk factors"],
      ["mitigations", "Mitigations"],
      ["assessed_by", "Assessed by"],
      ["assessed_at", "Assessed at"],
    ],
    ruleNote: "SSL-008, Risk Before Reach — governance/rule-library.md.",
  },
  accessibility: {
    label: "Accessibility",
    storeName: "accessibility",
    linkedKey: "accessibility",
    fields: [
      ["alt_text", "Alt text"],
      ["transcript", "Transcript"],
      ["captions_available", "Captions available"],
      ["plain_language_summary", "Plain-language summary"],
      ["screen_reader_label", "Screen reader label"],
    ],
    ruleNote: "SSL-004, Accessibility Required — governance/rule-library.md.",
  },
};

function formatValue(v) {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? esc(v.join(", ")) : "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return esc(String(v));
}

export async function renderStageReview(container, { id, stageKey }) {
  const observation = await get("observations", id);
  if (!observation) {
    container.innerHTML = `<p>No observation found with id "${esc(id)}".</p>`;
    return;
  }
  const linked = await getLinkedRecords(observation);
  const config = STAGE_CONFIG[stageKey];

  if (!isStageUnlocked(stageKey, observation, linked)) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, stageKey) +
      lockedNotice(config.label);
    return;
  }

  const record = linked[config.linkedKey];
  const reviewed = Boolean(record && record._reviewed_at);

  const fieldRows = config.fields
    .map(([key, label]) => `<dt>${esc(label)}</dt><dd>${formatValue(record?.[key])}</dd>`)
    .join("");

  container.innerHTML = `
    <p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>
    ${renderStepper(observation, linked, stageKey)}
    <section class="review-card">
      <h2>${esc(config.label)} review</h2>
      <p class="inline-note">${esc(config.ruleNote)}</p>
      ${
        record
          ? `<dl class="field-list">${fieldRows}</dl>`
          : `<p>No ${esc(config.label.toLowerCase())} record is linked to this observation.</p>`
      }
      ${
        reviewed
          ? `<p class="inline-note" role="status">Reviewed by ${esc(
              record._reviewed_by
            )} at ${esc(record._reviewed_at)}.</p>`
          : record
          ? `<form class="review-form" data-role="mark-reviewed">
              <div class="form-row">
                <label for="reviewer-id">Reviewer name or id</label>
                <input type="text" id="reviewer-id" name="reviewer" required />
                <p class="help-text">Required so this confirmation carries provenance, per Constitutional Principle 2.</p>
              </div>
              <button type="submit" class="btn">Confirm ${esc(
                config.label.toLowerCase()
              )} reviewed</button>
            </form>`
          : ""
      }
    </section>`;

  const form = container.querySelector('form[data-role="mark-reviewed"]');
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const reviewer = form.elements.reviewer.value.trim();
      if (!reviewer) return;
      record._reviewed_by = reviewer;
      record._reviewed_at = nowIso();
      await put(config.storeName, record);
      location.hash = `#/observation/${id}`;
    });
  }
}

/* ==========================================================================
   AI assist
   ========================================================================== */

export async function renderAiAssist(container, { id }) {
  const observation = await get("observations", id);
  if (!observation) {
    container.innerHTML = `<p>No observation found with id "${esc(id)}".</p>`;
    return;
  }
  const linked = await getLinkedRecords(observation);

  if (!isStageUnlocked("ai-assist", observation, linked)) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "ai-assist") +
      lockedNotice("AI assist");
    return;
  }

  const assist = observation.ai_assist;
  if (!assist || assist.enabled === false) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "ai-assist") +
      `<div class="review-card"><h2>AI assist</h2><p>AI assist is not enabled for this observation. Nothing to review — you can continue to Human Review.</p></div>`;
    return;
  }

  if (assist.human_verified) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "ai-assist") +
      `<div class="review-card"><h2>AI assist</h2><p class="inline-note" role="status">A human has already verified this suggestion.</p></div>`;
    return;
  }

  const suggestion = draftSuggestion(observation);

  container.innerHTML = `
    <p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>
    ${renderStepper(observation, linked, "ai-assist")}
    <section class="review-card">
      <h2>AI assist review</h2>
      <p class="inline-note">
        Advisory only, per governance/ai-permissions.md (SSL-005). AI may
        suggest; it may not publish, decide risk, or decide status.
      </p>
      <p>Task: <strong>${esc(suggestion.task)}</strong> &middot; Model: <code>${esc(
    suggestion.model
  )}</code> &middot; Confidence: ${
    suggestion.confidence === null ? "—" : esc(String(suggestion.confidence))
  }</p>
      <div class="ai-suggestion">
        <p class="text-small">Suggested draft</p>
        <p>${esc(suggestion.draftText)}</p>
      </div>
      <form class="review-form" data-role="ai-decision">
        <div class="form-row">
          <label for="ai-reviewer">Your name or id</label>
          <input type="text" id="ai-reviewer" name="reviewer" required />
        </div>
        <div class="button-row">
          <button type="submit" class="btn" data-decision="accept">Accept — mark human-verified</button>
          <button type="submit" class="btn" data-decision="reject">Reject — discard suggestion</button>
        </div>
      </form>
    </section>`;

  const form = container.querySelector('form[data-role="ai-decision"]');
  form.querySelectorAll("button[data-decision]").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const reviewer = form.elements.reviewer.value.trim();
      if (!reviewer) return;
      const decision = btn.dataset.decision;
      observation.ai_assist.human_verified = decision === "accept";
      observation.ai_assist._reviewed_by = reviewer;
      observation.ai_assist._reviewed_at = nowIso();
      observation.ai_assist._decision = decision;
      await put("observations", observation);
      location.hash = `#/observation/${id}`;
    });
  });
}

/* ==========================================================================
   Human review
   ========================================================================== */

export async function renderHumanReview(container, { id }) {
  const observation = await get("observations", id);
  if (!observation) {
    container.innerHTML = `<p>No observation found with id "${esc(id)}".</p>`;
    return;
  }
  const linked = await getLinkedRecords(observation);

  if (!isStageUnlocked("human-review", observation, linked)) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "human-review") +
      lockedNotice("Human review");
    return;
  }

  if (linked.review) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "human-review") +
      `<div class="review-card"><h2>Human review</h2>
        <p class="inline-note" role="status">Signed off by ${esc(
          linked.review.reviewed_by
        )} at ${esc(linked.review.reviewed_at)}.</p>
        ${
          linked.review.notes
            ? `<p><strong>Notes:</strong> ${esc(linked.review.notes)}</p>`
            : ""
        }
      </div>`;
    return;
  }

  container.innerHTML = `
    <p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>
    ${renderStepper(observation, linked, "human-review")}
    <section class="review-card">
      <h2>Human review sign-off</h2>
      <p class="inline-note">
        SSL-006, Human Publication — governance/rule-library.md. This
        confirms a human has reviewed source, consent, risk, accessibility,
        and any AI assist output for this observation. This log entry is a
        prototype extension of this app, not yet a schema in /schemas/.
      </p>
      <form class="review-form" data-role="human-review">
        <div class="form-row">
          <label for="hr-reviewer">Reviewer name or id</label>
          <input type="text" id="hr-reviewer" name="reviewer" required />
        </div>
        <div class="form-row">
          <label for="hr-notes">Notes (optional)</label>
          <textarea id="hr-notes" name="notes"></textarea>
        </div>
        <div class="form-row">
          <label for="hr-confirm" style="display:flex; gap: var(--space-sm); align-items: baseline; font-weight:400;">
            <input type="checkbox" id="hr-confirm" name="confirm" required style="width:auto;" />
            I confirm I have reviewed source, consent, risk, and accessibility
            for this observation.
          </label>
        </div>
        <button type="submit" class="btn">Record human review</button>
      </form>
    </section>`;

  const form = container.querySelector('form[data-role="human-review"]');
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const reviewer = form.elements.reviewer.value.trim();
    if (!reviewer || !form.elements.confirm.checked) return;
    await put("reviews", {
      review_id: `review-${observation.observation_id}`,
      observation_id: observation.observation_id,
      reviewed_by: reviewer,
      reviewed_at: nowIso(),
      notes: form.elements.notes.value.trim(),
    });
    location.hash = `#/observation/${id}`;
  });
}

/* ==========================================================================
   Publication status
   ========================================================================== */

const PUBLICATION_STATES = [
  "private",
  "internal_review",
  "public",
  "embargoed",
  "withdrawn",
];

export async function renderPublication(container, { id }) {
  const observation = await get("observations", id);
  if (!observation) {
    container.innerHTML = `<p>No observation found with id "${esc(id)}".</p>`;
    return;
  }
  const linked = await getLinkedRecords(observation);

  if (!isStageUnlocked("publication", observation, linked)) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "publication") +
      lockedNotice("Publication status");
    return;
  }

  if (linked.publication) {
    container.innerHTML =
      `<p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>` +
      renderStepper(observation, linked, "publication") +
      `<div class="review-card"><h2>Publication status</h2>
        <p class="inline-note" role="status">
          Decided: <strong>${esc(linked.publication.status)}</strong> by
          ${esc(linked.publication.decided_by)} at ${esc(
        linked.publication.decided_at
      )}.
        </p>
        <p>See governance/publication-status.md. This decision, not the
          observation's own <code>publication_status</code> field, is the
          canonical record per ADR-0004.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <p><a href="#/observation/${esc(id)}">&larr; Back to observation</a></p>
    ${renderStepper(observation, linked, "publication")}
    <section class="review-card">
      <h2>Publication status decision</h2>
      <p class="inline-note">
        governance/publication-status.md. Consent constrains which status
        values are reachable but does not set this field — a human editor
        does (ADR-0004).
      </p>
      <form class="review-form" data-role="publication">
        <div class="form-row">
          <label for="pub-status">Status</label>
          <select id="pub-status" name="status">
            ${PUBLICATION_STATES.map(
              (s) => `<option value="${esc(s)}">${esc(s)}</option>`
            ).join("")}
          </select>
        </div>
        <div class="form-row">
          <label for="pub-decider">Decided by</label>
          <input type="text" id="pub-decider" name="decider" required />
        </div>
        <div class="form-row">
          <label for="pub-reason">Withdrawal reason (only if withdrawing)</label>
          <input type="text" id="pub-reason" name="reason" />
        </div>
        <button type="submit" class="btn">Record decision</button>
      </form>
    </section>`;

  const form = container.querySelector('form[data-role="publication"]');
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const decider = form.elements.decider.value.trim();
    if (!decider) return;
    const status = form.elements.status.value;
    const decidedAt = nowIso();
    await put("publications", {
      publication_id: `pub-${observation.observation_id}`,
      observation_id: observation.observation_id,
      status,
      decided_by: decider,
      decided_at: decidedAt,
      withdrawal_reason:
        status === "withdrawn" ? form.elements.reason.value.trim() : undefined,
    });
    observation.publication_status = status;
    await put("observations", observation);
    location.hash = `#/observation/${id}`;
  });
}

/* ==========================================================================
   Archive & search
   ========================================================================== */

export async function renderArchive(container) {
  const observations = await getAll("observations");
  const rows = await Promise.all(
    observations.map(async (obs) => {
      const linked = await getLinkedRecords(obs);
      const exportable = linked.publication && linked.publication.status !== "private";
      return `
        <tr>
          <td><a href="#/observation/${esc(obs.observation_id)}">${esc(
        obs.observation_id
      )}</a></td>
          <td>${esc(obs.system)}</td>
          <td>${esc(obs.publication_status)}</td>
          <td>${esc(obs.created_at)}</td>
          <td>${
            exportable
              ? `<button class="btn" type="button" data-export="${esc(
                  obs.observation_id
                )}">Export JSON</button>`
              : `<span class="text-small">Not exportable while private / undecided</span>`
          }</td>
        </tr>`;
    })
  );

  container.innerHTML = `
    <h2>Archive &amp; search</h2>
    <p>Original records are preserved with their review and decision
      history (Data Lifecycle step 7). Export is only offered for records
      with a non-private publication decision — "APIs expose governed
      records, not raw extraction" (Constitutional Principle 13).</p>
    <table class="archive-table">
      <caption>All observations</caption>
      <thead>
        <tr><th scope="col">Observation</th><th scope="col">System</th><th scope="col">Status</th><th scope="col">Created</th><th scope="col">Export</th></tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>`;

  container.querySelectorAll("button[data-export]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const obsId = btn.dataset.export;
      const obs = await get("observations", obsId);
      const linked = await getLinkedRecords(obs);
      const bundle = { observation: obs, ...linked };
      const blob = new Blob([JSON.stringify(bundle, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${obsId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  });
}
