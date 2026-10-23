const CONFIG_KEY = "omoluabi.workspace.config.v1";
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const date = (value) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value)) : "—";
let supabase;
let user;
let role;
let currentInvestigation;
let clientModule;

function config() {
  try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null"); } catch { return null; }
}

function announce(message, isError = false) {
  const node = $("#notice");
  node.textContent = message;
  node.classList.toggle("is-error", isError);
  node.classList.remove("hidden");
  window.clearTimeout(announce.timeout);
  announce.timeout = window.setTimeout(() => node.classList.add("hidden"), 6000);
}

function show(view) {
  ["setup-view", "login-view", "access-view", "workspace-view"].forEach((id) => $("#" + id).classList.toggle("hidden", id !== view));
}

function connection(message, healthy = false) {
  const node = $("#connection-status");
  node.lastElementChild.textContent = message;
  node.classList.toggle("is-connected", healthy);
}

async function connect() {
  const settings = config();
  if (!settings?.url || !settings?.key) {
    show("setup-view");
    connection("Not connected");
    return;
  }
  try {
    clientModule ||= await import("https://esm.sh/@supabase/supabase-js@2");
    supabase = clientModule.createClient(settings.url.replace(/\/$/, ""), settings.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    connection("Connecting…");
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession?.user) void authorize(nextSession.user);
      else { user = undefined; role = undefined; show("login-view"); $("#sign-out").classList.add("hidden"); }
    });
    if (session?.user) await authorize(session.user);
    else { show("login-view"); connection("Ready to sign in", true); }
  } catch (error) {
    connection("Connection error");
    show("setup-view");
    $("#setup-error").textContent = error.message || "Could not connect. Check your project URL and public anon key.";
  }
}

async function authorize(authenticatedUser) {
  user = authenticatedUser;
  $("#sign-out").classList.remove("hidden");
  connection("Checking access…");
  const { data, error } = await supabase.from("workspace_members").select("role").eq("user_id", user.id).maybeSingle();
  if (error) {
    show("workspace-view");
    connection("Needs database setup");
    announce(`Could not verify workspace access: ${error.message}`, true);
    return;
  }
  if (!data) {
    role = undefined;
    show("access-view");
    connection("Invitation required", true);
    return;
  }
  role = data.role;
  show("workspace-view");
  connection(`Signed in · ${role}`, true);
  await loadInvestigations();
}

async function loadInvestigations() {
  const list = $("#investigation-list");
  list.innerHTML = `<div class="loading-card">Loading investigations…</div>`;
  const { data, error } = await supabase.from("investigations").select("id,title,summary,publication_status,updated_at").order("updated_at", { ascending: false });
  if (error) { list.innerHTML = `<div class="empty-card">${escapeHtml(error.message)}</div>`; return; }
  if (!data.length) {
    list.innerHTML = `<div class="empty-card"><span class="empty-icon" aria-hidden="true">＋</span><h2>Your research desk is ready</h2><p>Create an investigation to gather its sources, claims and evidence in one place.</p><button class="primary-button" type="button" data-action="new-investigation">Create an investigation</button></div>`;
    return;
  }
  list.innerHTML = data.map((item) => `<button class="investigation-row" type="button" data-open="${escapeHtml(item.id)}"><span class="row-title">${escapeHtml(item.title)}</span><span class="row-summary">${escapeHtml(item.summary || "No brief added yet.")}</span><span class="row-meta"><span class="badge status-${escapeHtml(item.publication_status)}">${escapeHtml(item.publication_status.replaceAll("_", " "))}</span><time datetime="${escapeHtml(item.updated_at)}">Updated ${date(item.updated_at)}</time><span class="row-arrow" aria-hidden="true">→</span></span></button>`).join("");
}

function showScreen(id) {
  ["list-screen", "detail-screen", "intake-screen"].forEach((screen) => $("#" + screen).classList.toggle("hidden", screen !== id));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.screen === (id === "intake-screen" ? "intake" : "investigations")));
  $("#main").focus({ preventScroll: true });
}

async function createInvestigation(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const title = String(values.get("title")).trim();
  if (title.length < 4) return;
  const { data, error } = await supabase.from("investigations").insert({ title, summary: String(values.get("summary")).trim(), created_by: user.id }).select("id").single();
  if (error) { announce(error.message, true); return; }
  form.reset(); form.classList.add("hidden");
  announce("Investigation created.");
  await openInvestigation(data.id);
}

async function openInvestigation(id) {
  currentInvestigation = id;
  showScreen("detail-screen");
  $("#detail-screen").innerHTML = `<div class="loading-card">Opening investigation…</div>`;
  const [investigation, sources, claims, evidence] = await Promise.all([
    supabase.from("investigations").select("*").eq("id", id).single(),
    supabase.from("sources").select("*").eq("investigation_id", id).order("created_at"),
    supabase.from("claims").select("*").eq("investigation_id", id).order("created_at"),
    supabase.from("claim_evidence").select("*").eq("investigation_id", id).order("created_at"),
  ]);
  const failed = [investigation, sources, claims, evidence].find((result) => result.error);
  if (failed) { $("#detail-screen").innerHTML = `<p class="error-card" role="alert">${escapeHtml(failed.error.message)}</p>`; return; }
  const recordIds = [id, ...sources.data.map((row) => row.id), ...claims.data.map((row) => row.id), ...evidence.data.map((row) => row.id)];
  const audits = await supabase.from("audit_events").select("action,table_name,created_at,details").in("record_id", recordIds).order("created_at", { ascending: false }).limit(12);
  if (audits.error) { $("#detail-screen").innerHTML = `<p class="error-card" role="alert">${escapeHtml(audits.error.message)}</p>`; return; }
  renderDetail(investigation.data, sources.data, claims.data, evidence.data, audits.data);
}

function renderDetail(item, sources, claims, evidence, audits) {
  const publisher = role === "publisher";
  const sourceOptions = sources.map((source) => `<option value="${escapeHtml(source.id)}">${escapeHtml(source.title)}</option>`).join("");
  const claimOptions = claims.map((claim) => `<option value="${escapeHtml(claim.id)}">${escapeHtml(claim.claim_text)}</option>`).join("");
  const claimCards = claims.length ? claims.map((claim) => {
    const links = evidence.filter((link) => link.claim_id === claim.id);
    const status = claim.status.replaceAll("_", " ");
    return `<article class="record-card"><div class="record-heading"><h3>${escapeHtml(claim.claim_text)}</h3><span class="badge status-${escapeHtml(claim.status)}">${escapeHtml(status)}</span></div><p class="record-meta">${claim.reviewed_at ? `Reviewed ${date(claim.reviewed_at)}` : "Awaiting review"}</p>${links.length ? `<ul class="evidence-list">${links.map((link) => { const source = sources.find((entry) => entry.id === link.source_id); return `<li><strong>${escapeHtml(link.relationship)}</strong> · ${escapeHtml(source?.title || "Source removed")}${link.excerpt ? ` <span>“${escapeHtml(link.excerpt)}”</span>` : ""}</li>`; }).join("")}</ul>` : `<p class="muted">No source evidence linked yet.</p>`}<form class="inline-form" data-form="review-claim" data-id="${escapeHtml(claim.id)}"><label class="sr-only" for="claim-status-${escapeHtml(claim.id)}">Claim review status</label><select id="claim-status-${escapeHtml(claim.id)}" name="status"><option value="unreviewed" ${claim.status === "unreviewed" ? "selected" : ""}>Unreviewed</option><option value="supported" ${claim.status === "supported" ? "selected" : ""}>Supported</option><option value="disputed" ${claim.status === "disputed" ? "selected" : ""}>Disputed</option><option value="not_substantiated" ${claim.status === "not_substantiated" ? "selected" : ""}>Not substantiated</option></select><button class="secondary-button" type="submit">Save review</button></form></article>`;
  }).join("") : `<p class="muted">Add a checkable claim, then link the evidence that supports or challenges it.</p>`;
  const sourceCards = sources.length ? `<div class="source-list">${sources.map((source) => `<article class="source-row"><div><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.title)} ↗</a><p>${escapeHtml(source.publisher || source.source_type)} · Consent: ${escapeHtml(source.consent_status)}</p>${source.notes ? `<p>${escapeHtml(source.notes)}</p>` : ""}</div><span class="badge status-${escapeHtml(source.consent_status)}">${escapeHtml(source.consent_status)}</span></article>`).join("")}</div>` : `<p class="muted">No sources added yet.</p>`;
  const publicationOptions = ["private", "internal_review", "public", "embargoed", "withdrawn"].map((status) => `<option value="${status}" ${item.publication_status === status ? "selected" : ""}>${status.replaceAll("_", " ")}</option>`).join("");
  $("#detail-screen").innerHTML = `
    <button class="back-link" data-action="back-list" type="button">← All investigations</button>
    <div class="page-heading detail-heading"><div><p class="eyebrow">Investigation · ${escapeHtml(item.id.slice(0, 8))}</p><h1 id="detail-title">${escapeHtml(item.title)}</h1><p class="subheading">${escapeHtml(item.summary || "Add a brief to explain the question and the work still needed.")}</p></div><span class="badge status-${escapeHtml(item.publication_status)}">${escapeHtml(item.publication_status.replaceAll("_", " "))}</span></div>
    <section class="panel" aria-labelledby="governance-title"><div class="section-heading"><div><p class="eyebrow">Review controls</p><h2 id="governance-title">Governance checks</h2></div><span class="role-pill">Your role: ${escapeHtml(role)}</span></div><form id="governance-form" class="governance-grid"><label>Investigation consent<select name="consent_status"><option value="unknown" ${item.consent_status === "unknown" ? "selected" : ""}>Unknown</option><option value="cleared" ${item.consent_status === "cleared" ? "selected" : ""}>Cleared</option><option value="restricted" ${item.consent_status === "restricted" ? "selected" : ""}>Restricted</option><option value="withheld" ${item.consent_status === "withheld" ? "selected" : ""}>Withheld</option></select></label><label>Risk review<select name="risk_status"><option value="unassessed" ${item.risk_status === "unassessed" ? "selected" : ""}>Unassessed</option><option value="reviewed" ${item.risk_status === "reviewed" ? "selected" : ""}>Reviewed</option><option value="high_risk" ${item.risk_status === "high_risk" ? "selected" : ""}>High risk</option></select></label><label>Accessibility review<select name="accessibility_status"><option value="unassessed" ${item.accessibility_status === "unassessed" ? "selected" : ""}>Unassessed</option><option value="reviewed" ${item.accessibility_status === "reviewed" ? "selected" : ""}>Reviewed</option></select></label><label>Publication status<select name="publication_status" ${publisher ? "" : "disabled"}>${publicationOptions}</select><small>${publisher ? "Only a publisher can change this. The database enforces the evidence and review gate." : "A designated publisher makes publication decisions."}</small></label><button class="primary-button governance-save" type="submit">Save review checks</button></form><p class="fine-print">Public status requires cleared consent, reviewed risk and accessibility, cleared source consent, reviewed claims and linked evidence. The database blocks incomplete decisions.</p></section>
    <section class="panel" aria-labelledby="sources-title"><div class="section-heading"><div><p class="eyebrow">Provenance</p><h2 id="sources-title">Sources <span class="count">${sources.length}</span></h2></div></div>${sourceCards}<details class="add-details"><summary>Add a source</summary><form class="stack-form compact-form" data-form="add-source"><label>Source title<input name="title" required maxlength="240"></label><label>Source URL<input name="url" type="url" required placeholder="https://"></label><label>Publisher or origin<input name="publisher" maxlength="200"></label><div class="form-pair"><label>Type<select name="source_type"><option>document</option><option>dataset</option><option>interview</option><option>archive</option><option>media</option><option>other</option></select></label><label>Consent<select name="consent_status"><option>unknown</option><option>cleared</option><option>restricted</option><option>withheld</option></select></label></div><label>Research notes<textarea name="notes" rows="2"></textarea></label><button class="secondary-button" type="submit">Save source</button></form></details></section>
    <section class="panel" aria-labelledby="claims-title"><div class="section-heading"><div><p class="eyebrow">Evidence desk</p><h2 id="claims-title">Claims <span class="count">${claims.length}</span></h2></div></div>${claimCards}<details class="add-details"><summary>Add a claim</summary><form class="stack-form compact-form" data-form="add-claim"><label>One checkable statement<textarea name="claim_text" rows="3" required minlength="8" maxlength="1000" placeholder="State what the evidence should establish, not what you assume."></textarea></label><button class="secondary-button" type="submit">Save claim</button></form></details>${sources.length && claims.length ? `<details class="add-details"><summary>Link evidence to a claim</summary><form class="stack-form compact-form" data-form="add-evidence"><label>Claim<select name="claim_id" required>${claimOptions}</select></label><label>Source<select name="source_id" required>${sourceOptions}</select></label><label>Relationship<select name="relationship"><option value="supports">Supports</option><option value="challenges">Challenges</option><option value="context">Context</option></select></label><label>Relevant excerpt or locator<textarea name="excerpt" rows="2" maxlength="2000" placeholder="Page, timestamp, paragraph, or short excerpt"></textarea></label><button class="secondary-button" type="submit">Link evidence</button></form></details>` : ""}</section>
    <section class="panel" aria-labelledby="history-title"><div class="section-heading"><div><p class="eyebrow">Record trail</p><h2 id="history-title">Recent changes</h2></div></div>${audits.length ? `<ol class="audit-list">${audits.map((event) => `<li><span class="audit-dot" aria-hidden="true"></span><div><strong>${escapeHtml(event.action.replaceAll(".", " "))}</strong><p>${escapeHtml(event.table_name)} · ${date(event.created_at)}</p></div></li>`).join("")}</ol>` : `<p class="muted">Changes to this investigation will appear here.</p>`}</section>`;
}

async function submitDetailForm(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const values = new FormData(form);
  const row = Object.fromEntries(values.entries());
  const kind = form.dataset.form;
  let result;
  if (kind === "add-source") result = await supabase.from("sources").insert({ ...row, investigation_id: currentInvestigation, created_by: user.id });
  if (kind === "add-claim") result = await supabase.from("claims").insert({ claim_text: row.claim_text.trim(), investigation_id: currentInvestigation, created_by: user.id });
  if (kind === "add-evidence") result = await supabase.from("claim_evidence").insert({ ...row, investigation_id: currentInvestigation, created_by: user.id });
  if (kind === "review-claim") result = await supabase.from("claims").update({ status: row.status, reviewed_by: user.id, reviewed_at: new Date().toISOString() }).eq("id", form.dataset.id);
  if (result?.error) { announce(result.error.message, true); return; }
  announce(kind === "review-claim" ? "Claim review saved." : "Record saved.");
  await openInvestigation(currentInvestigation);
}

async function saveGovernance(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (role !== "publisher") delete values.publication_status;
  const { error } = await supabase.from("investigations").update(values).eq("id", currentInvestigation);
  if (error) { announce(error.message, true); return; }
  announce("Review checks saved.");
  await openInvestigation(currentInvestigation);
}

async function loadIntake() {
  const list = $("#intake-list");
  list.innerHTML = `<div class="loading-card">Loading temporary items…</div>`;
  const { data, error } = await supabase.from("intake_items").select("id,title,payload,created_at,expires_at").is("promoted_at", null).order("created_at", { ascending: false });
  if (error) { list.innerHTML = `<div class="error-card">${escapeHtml(error.message)}</div>`; return; }
  $("#intake-count").textContent = String(data.length);
  if (!data.length) { list.innerHTML = `<div class="empty-card"><span class="empty-icon" aria-hidden="true">⌁</span><h2>No temporary items</h2><p>New intake stays here for 72 hours until a person reviews and promotes it.</p></div>`; return; }
  list.innerHTML = data.map((item) => `<article class="intake-card"><div class="row-meta"><span class="badge status-internal_review">Expires ${date(item.expires_at)}</span><time>Received ${date(item.created_at)}</time></div><h2>${escapeHtml(item.title)}</h2><pre>${escapeHtml(item.payload)}</pre><form class="promote-form" data-id="${escapeHtml(item.id)}"><label>Create investigation title<input name="title" required minlength="4" value="${escapeHtml(item.title)}"></label><button class="secondary-button" type="submit">Review and promote</button></form></article>`).join("");
}

async function addIntake(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  const { error } = await supabase.from("intake_items").insert({ title: values.title.trim(), payload: values.payload.trim(), created_by: user.id });
  if (error) { announce(error.message, true); return; }
  event.currentTarget.reset(); announce("Added to temporary intake. It will expire in 72 hours."); await loadIntake();
}

async function promoteIntake(event) {
  const form = event.target.closest("form.promote-form");
  if (!form) return;
  event.preventDefault();
  const title = new FormData(form).get("title").trim();
  const itemId = form.dataset.id;
  const { data: item, error: readError } = await supabase.from("intake_items").select("title,payload").eq("id", itemId).single();
  if (readError) { announce(readError.message, true); return; }
  const { data: investigation, error: createError } = await supabase.from("investigations").insert({ title, summary: item.payload, created_by: user.id }).select("id").single();
  if (createError) { announce(createError.message, true); return; }
  const { error } = await supabase.from("intake_items").update({ promoted_at: new Date().toISOString(), promoted_by: user.id, promoted_investigation_id: investigation.id }).eq("id", itemId);
  if (error) { announce(`Investigation created, but the intake promotion marker failed: ${error.message}`, true); return; }
  announce("Reviewed item promoted to a permanent investigation.");
  await openInvestigation(investigation.id);
}

$("#setup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (!/^https:\/\//.test(values.url)) { $("#setup-error").textContent = "Enter the secure https URL from your Supabase project settings."; return; }
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ url: values.url.replace(/\/$/, ""), key: values.key.trim() }));
  $("#setup-error").textContent = "";
  await connect();
});

$("#settings-open").addEventListener("click", () => {
  const saved = config() || {};
  const form = $("#settings-form");
  form.elements.url.value = saved.url || "";
  form.elements.key.value = saved.key || "";
  $("#settings-dialog").showModal();
});
$("#settings-form").addEventListener("submit", async (event) => {
  if (event.submitter?.value !== "save") return;
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ url: values.url.replace(/\/$/, ""), key: values.key.trim() }));
  await supabase?.auth.signOut();
  $("#settings-dialog").close();
  user = undefined; role = undefined; supabase = undefined;
  await connect();
});
$("#change-project").addEventListener("click", () => $("#settings-open").click());
$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email").trim();
  const button = event.currentTarget.querySelector("button");
  button.disabled = true;
  $("#login-message").textContent = "Sending your secure link…";
  try {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href.split("#")[0] } });
    $("#login-message").textContent = error ? error.message : "Check your inbox for a sign-in link. This browser will return to the workspace when you open it.";
  } catch (error) {
    $("#login-message").textContent = error.message || "Could not send a sign-in link. Check your connection and try again.";
  } finally { button.disabled = false; }
});
$("#sign-out").addEventListener("click", async () => { await supabase?.auth.signOut(); });
$("#access-sign-out").addEventListener("click", async () => { await supabase?.auth.signOut(); });
$("#new-investigation").addEventListener("click", () => { $("#new-form").classList.remove("hidden"); $("#new-form").elements.title.focus(); });
$("#cancel-new").addEventListener("click", () => $("#new-form").classList.add("hidden"));
$("#new-form").addEventListener("submit", createInvestigation);
$("#intake-form").addEventListener("submit", addIntake);
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => {
  if (item.dataset.screen === "intake") { showScreen("intake-screen"); void loadIntake(); }
  else { showScreen("list-screen"); void loadInvestigations(); }
}));
$("#investigation-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-open], [data-action='new-investigation']");
  if (button?.dataset.open) void openInvestigation(button.dataset.open);
  else if (button) { $("#new-form").classList.remove("hidden"); $("#new-form").elements.title.focus(); }
});
$("#detail-screen").addEventListener("click", (event) => {
  if (event.target.closest("[data-action='back-list']")) { showScreen("list-screen"); void loadInvestigations(); }
});
$("#detail-screen").addEventListener("submit", (event) => {
  if (event.target.id === "governance-form") void saveGovernance(event);
  else void submitDetailForm(event);
});
$("#intake-list").addEventListener("submit", (event) => void promoteIntake(event));

await connect();
