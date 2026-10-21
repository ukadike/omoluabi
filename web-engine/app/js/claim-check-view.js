import { getAll, put } from "./store.js";
import { CLAIM_STATUS_VALUES, evaluateClaimVerification } from "./claim-verification.mjs";

function esc(value) {
  const node = document.createElement("span");
  node.textContent = value ?? "";
  return node.innerHTML;
}

function newId() {
  return globalThis.crypto?.randomUUID?.() || `check-${Date.now()}`;
}

function evidenceReference(value) {
  const text = esc(value);
  try {
    const url = new URL(value);
    if (["http:", "https:"].includes(url.protocol)) {
      return `<a href="${esc(url.href)}" rel="noreferrer">${text}</a>`;
    }
  } catch {
    // Non-URL evidence identifiers remain readable text.
  }
  return text;
}

function evidenceForm(checkId) {
  return `
    <form class="review-form claim-evidence-form" data-role="add-evidence" data-check-id="${esc(checkId)}">
      <h4>Add evidence record</h4>
      <div class="form-row">
        <label for="relation-${esc(checkId)}">How does it relate to the claim?</label>
        <select id="relation-${esc(checkId)}" name="relationship">
          <option value="SUPPORTS">Supports</option>
          <option value="CHALLENGES">Challenges</option>
          <option value="CONTEXTUALIZES">Adds context</option>
          <option value="CONFLICTS">Conflicts</option>
          <option value="DOES_NOT_ADDRESS">Does not address the claim</option>
        </select>
      </div>
      <div class="form-row">
        <label for="eref-${esc(checkId)}">Evidence reference or stable link</label>
        <input id="eref-${esc(checkId)}" name="evidence_ref" required />
      </div>
      <div class="form-row">
        <label for="sref-${esc(checkId)}">Source reference or name</label>
        <input id="sref-${esc(checkId)}" name="source_ref" required />
      </div>
      <div class="form-row">
        <label for="chain-${esc(checkId)}">Originating source-chain identifier</label>
        <input id="chain-${esc(checkId)}" name="source_chain_ref" required />
        <p class="help-text">Use the same identifier when records derive from the same originating source.</p>
      </div>
      <div class="form-row">
        <label for="summary-${esc(checkId)}">What does this evidence show?</label>
        <textarea id="summary-${esc(checkId)}" name="summary" rows="3"></textarea>
      </div>
      <div class="form-row">
        <label><input type="checkbox" name="independence_confirmed" /> I reviewed the source chain and confirmed this is an independent supporting source</label>
      </div>
      <div class="form-row">
        <label><input type="checkbox" name="material" /> This is a material challenge or conflict</label>
      </div>
      <button class="btn" type="submit">Add evidence</button>
    </form>`;
}

function decisionForm(check) {
  const current = check.human_decision?.status || "";
  return `
    <form class="review-form claim-decision-form" data-role="human-decision" data-check-id="${esc(check.check_id)}">
      <h4>Human editorial decision</h4>
      <p class="help-text">This is separate from the rule state. This browser-only prototype records the name and role you enter but does not authenticate them; no decision is publishable from this screen.</p>
      <div class="form-row">
        <label for="decision-${esc(check.check_id)}">Record a human decision</label>
        <select id="decision-${esc(check.check_id)}" name="status" required>
          <option value="">Choose a status</option>
          ${CLAIM_STATUS_VALUES.map((s) => `<option value="${s}" ${current === s ? "selected" : ""}>${s.replaceAll("_", " ")}</option>`).join("")}
        </select>
      </div>
      <div class="form-row">
        <label for="reviewer-${esc(check.check_id)}">Reviewer</label>
        <input id="reviewer-${esc(check.check_id)}" name="reviewer" value="${esc(check.human_decision?.reviewer || "")}" required />
      </div>
      <div class="form-row">
        <label for="reviewer-role-${esc(check.check_id)}">Reviewer role</label>
        <input id="reviewer-role-${esc(check.check_id)}" name="reviewer_role" value="${esc(check.human_decision?.reviewer_role || "")}" required />
      </div>
      <div class="form-row">
        <label for="reason-${esc(check.check_id)}">Reason and evidence considered</label>
        <textarea id="reason-${esc(check.check_id)}" name="reason" rows="3" required>${esc(check.human_decision?.reason || "")}</textarea>
      </div>
      <button class="btn" type="submit">Save human decision</button>
    </form>`;
}

function renderCheck(check) {
  const result = evaluateClaimVerification(check);
  const evidence = check.evidence_assessments || [];
  const ruleResult = check.verification || result;
  return `
    <article class="review-card claim-check-card">
      <h3>${esc(check.claim?.exact_wording || "Untitled claim")}</h3>
      <dl class="field-list">
        <dt>Rule state</dt><dd><strong>${esc(ruleResult.rule_status.replaceAll("_", " "))}</strong> — ${ruleResult.independent_supporting_groups} confirmed independent supporting source chain(s)</dd>
        <dt>Claim source</dt><dd>${esc(check.claim?.source_ref || "Not recorded")}</dd>
        <dt>Context</dt><dd>${esc(check.claim?.context || "Not recorded")}</dd>
        <dt>Original language</dt><dd>${esc(check.claim?.original_language || "Not recorded")}</dd>
        <dt>Assessment flags</dt><dd>${(check.assessment_flags || []).length ? esc(check.assessment_flags.join(", ").replaceAll("_", " ")) : "None recorded"}</dd>
        <dt>Subclaims to check</dt><dd>${(check.subclaims || []).length ? `<ul>${check.subclaims.map((q) => `<li>${esc(q.question)}</li>`).join("")}</ul>` : "None recorded"}</dd>
        <dt>Human decision</dt><dd>${check.human_decision ? `${esc(check.human_decision.status.replaceAll("_", " "))} — ${esc(check.human_decision.reviewer)}: ${esc(check.human_decision.reason)}` : "Not recorded"}</dd>
      </dl>
      <p class="inline-note" role="status">${ruleResult.rule_status === "UNSUPPORTED" ? "Unsupported means this card has no qualifying supporting source recorded; it does not mean the claim is false." : ruleResult.rule_status === "READY_FOR_REVIEW" ? "This meets the rule threshold for human review. It is not automatically corroborated." : ruleResult.rule_status === "DISPUTED" ? "A material challenge is recorded. Keep the conflict visible for review." : "Rule output is a review aid, not an editorial conclusion."}</p>
      <h4>Evidence ledger</h4>
      ${evidence.length ? `<ul>${evidence.map((item) => `<li><strong>${esc(item.relationship.replaceAll("_", " "))}</strong>: ${evidenceReference(item.evidence_ref)} — ${esc(item.summary || "No summary")} <span class="text-small">(source chain: ${esc(item.source_chain_ref)}${item.independence_confirmed ? "; independence confirmed" : ""}${item.material ? "; marked material" : ""})</span></li>`).join("")}</ul>` : "<p>No evidence has been attached yet.</p>"}
      ${evidenceForm(check.check_id)}
      ${decisionForm(check)}
    </article>`;
}

export async function renderClaimChecks(container) {
  const checks = (await getAll("claimChecks")).sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
  container.innerHTML = `
    <p><a href="#/">&larr; Back to observation inbox</a></p>
    <h2>Claim Checks</h2>
    <p>Build an evidence trail around a specific claim. Rule states come from <code>ssl.core.claim_verification</code>; they organize review and do not decide truth. Everything is saved only in this browser.</p>
    <section class="review-card">
      <h3>Start a claim check</h3>
      <form class="review-form" data-role="new-claim-check">
        <div class="form-row"><label for="claim-text">Exact wording of the claim</label><textarea id="claim-text" name="exact_wording" rows="3" required></textarea></div>
        <div class="form-row"><label for="claimant">Claimant or publisher</label><input id="claimant" name="claimant" /></div>
        <div class="form-row"><label for="claim-source">Where did you encounter it? (URL or source reference)</label><input id="claim-source" name="source_ref" /></div>
        <div class="form-row"><label for="claim-date">Publication or capture date</label><input id="claim-date" name="published_at" type="date" /></div>
        <div class="form-row"><label for="event-time">Claimed event time or period</label><input id="event-time" name="claimed_event_time" /></div>
        <div class="form-row"><label for="claim-geography">Geographic scope</label><input id="claim-geography" name="geographic_scope" /></div>
        <div class="form-row"><label for="claim-scope">Temporal scope</label><input id="claim-scope" name="temporal_scope" /></div>
        <div class="form-row"><label for="claim-language">Original language</label><input id="claim-language" name="original_language" /></div>
        <div class="form-row"><label for="claim-context">Surrounding context and limitations</label><textarea id="claim-context" name="context" rows="3"></textarea></div>
        <div class="form-row"><label for="claim-flags">Known assessment flags (select all that apply)</label><select id="claim-flags" name="assessment_flags" multiple size="6"><option value="MISSING_CONTEXT">Missing context</option><option value="MIXED_EVIDENCE">Mixed evidence</option><option value="OUTDATED">Potentially outdated</option><option value="NOT_YET_VERIFIABLE">Not yet verifiable</option><option value="TRANSLATION_UNCERTAINTY">Translation uncertainty</option><option value="SOURCE_CHAIN_UNRESOLVED">Source chain unresolved</option></select><p class="help-text">These flags describe limitations. They do not replace the canonical verification status.</p></div>
        <div class="form-row"><label for="subclaims">Testable subclaims or questions (one per line)</label><textarea id="subclaims" name="subclaims" rows="4"></textarea><p class="help-text">Break compound statements into separate questions before assessing them.</p></div>
        <button class="btn" type="submit">Create claim check</button>
      </form>
    </section>
    <h2>Saved claim checks (${checks.length})</h2>
    ${checks.length ? checks.map(renderCheck).join("") : "<p>No claim checks yet.</p>"}`;

  container.querySelector('form[data-role="new-claim-check"]').addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const checkId = newId();
    const now = new Date().toISOString();
    const record = {
      check_id: checkId,
      story_ref: null,
      investigation_ref: null,
      status: "OPEN",
      created_at: now,
      updated_at: now,
      claim: {
        exact_wording: form.elements.exact_wording.value.trim(),
        claimant: form.elements.claimant.value.trim(),
        source_ref: form.elements.source_ref.value.trim(),
        published_at: form.elements.published_at.value,
        claimed_event_time: form.elements.claimed_event_time.value.trim(),
        geographic_scope: form.elements.geographic_scope.value.split(";").map((item) => item.trim()).filter(Boolean),
        temporal_scope: form.elements.temporal_scope.value.trim(),
        original_language: form.elements.original_language.value.trim(),
        context: form.elements.context.value.trim(),
      },
      subclaims: form.elements.subclaims.value.split("\n").map((question) => question.trim()).filter(Boolean).map((question) => ({ subclaim_id: newId(), question, state: "OPEN" })),
      evidence_assessments: [],
      assessment_flags: Array.from(form.elements.assessment_flags.selectedOptions, (option) => option.value),
      human_decision: null,
      verification: null,
      correction_history: [],
    };
    record.verification = {
      schema_id: "ssl.core.claim_verification",
      evaluated_at: now,
      ...evaluateClaimVerification(record),
    };
    await put("claimChecks", record);
    await renderClaimChecks(container);
  });

  container.querySelectorAll('form[data-role="add-evidence"]').forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const check = await getAll("claimChecks").then((items) => items.find((item) => item.check_id === form.dataset.checkId));
      if (!check) return;
      check.evidence_assessments ||= [];
      check.evidence_assessments.push({
        evidence_id: newId(),
        relationship: form.elements.relationship.value,
        evidence_ref: form.elements.evidence_ref.value.trim(),
        source_ref: form.elements.source_ref.value.trim(),
        source_chain_ref: form.elements.source_chain_ref.value.trim(),
        summary: form.elements.summary.value.trim(),
        independence_confirmed: form.elements.independence_confirmed.checked,
        material: form.elements.material.checked,
        recorded_at: new Date().toISOString(),
      });
      check.verification = {
        schema_id: "ssl.core.claim_verification",
        evaluated_at: new Date().toISOString(),
        ...evaluateClaimVerification(check),
      };
      check.updated_at = new Date().toISOString();
      await put("claimChecks", check);
      await renderClaimChecks(container);
    });
  });

  container.querySelectorAll('form[data-role="human-decision"]').forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const check = await getAll("claimChecks").then((items) => items.find((item) => item.check_id === form.dataset.checkId));
      if (!check) return;
      const previous = check.human_decision || null;
      const decision = {
        status: form.elements.status.value,
        reviewer: form.elements.reviewer.value.trim(),
        reviewer_role: form.elements.reviewer_role.value.trim(),
        reason: form.elements.reason.value.trim(),
        authorization_status: "NOT_AUTHENTICATED",
        decided_at: new Date().toISOString(),
      };
      const hasMaterialChallenge = (check.evidence_assessments || []).some((item) => ["CHALLENGES", "CONFLICTS"].includes(item.relationship) && item.material === true && Boolean(item.evidence_ref));
      if (decision.status === "CORROBORATED" && check.verification?.rule_status !== "READY_FOR_REVIEW") {
        form.querySelector('[data-role="decision-error"]')?.remove();
        form.insertAdjacentHTML("afterbegin", '<p data-role="decision-error" role="alert">The rule threshold must reach READY_FOR_REVIEW before corroboration can be recorded.</p>');
        return;
      }
      if (decision.status === "INVALIDATED" && !hasMaterialChallenge) {
        form.querySelector('[data-role="decision-error"]')?.remove();
        form.insertAdjacentHTML("afterbegin", '<p data-role="decision-error" role="alert">Record material contradicting evidence before invalidation can be recorded.</p>');
        return;
      }
      if (!decision.status || !decision.reviewer || !decision.reviewer_role || !decision.reason) return;
      check.correction_history ||= [];
      if (previous) check.correction_history.push({ previous, replaced_at: decision.decided_at });
      check.human_decision = decision;
      check.updated_at = decision.decided_at;
      await put("claimChecks", check);
      await renderClaimChecks(container);
    });
  });
}
