import Link from "next/link";
import { notFound } from "next/navigation";
import { requireMember } from "@/lib/auth";
import { addClaim, addSource, linkEvidence, reviewClaim, setPublication, updateReadiness } from "../../actions";

export default async function InvestigationPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; notice?: string }> }) {
  const { id } = await params;
  const { error, notice } = await searchParams;
  const { supabase, role } = await requireMember();
  const [{ data: inv }, { data: sources }, { data: claims }, { data: evidence }, { data: audit }] = await Promise.all([
    supabase.from("investigations").select("*").eq("id", id).maybeSingle(),
    supabase.from("sources").select("id,title,url,publisher,source_type,consent_status,notes,created_at").eq("investigation_id", id).order("created_at"),
    supabase.from("claims").select("id,claim_text,status,reviewed_by,reviewed_at,created_at").eq("investigation_id", id).order("created_at"),
    supabase.from("claim_evidence").select("claim_id,source_id,relationship,excerpt").eq("investigation_id", id),
    supabase.from("audit_events").select("action,table_name,record_id,details,created_at,actor_id").eq("record_id", id).order("created_at", { ascending: false }).limit(20),
  ]);
  if (!inv) notFound();

  return <>
    <p><Link href="/">← All investigations</Link></p>
    <div className="eyebrow">Investigation · private research record</div>
    <h1>{inv.title}</h1><p className="intro">{inv.summary || "No working summary."}</p>
    {error && <p className="error" role="alert">{error}</p>}{notice && <p className="good" role="status">{notice}</p>}
    <div className="toolbar"><span className="status">Publication: {inv.publication_status.replace("_", " ")}</span><span className="status">{sources?.length || 0} sources</span><span className="status">{claims?.length || 0} claims</span></div>

    <section id="readiness"><h2>Governance reviews</h2><p>Each review is a distinct human decision. These fields inform the publication gate enforced by the database.</p>
      <form className="card" action={updateReadiness}><input type="hidden" name="investigation_id" value={id}/>
        <div className="split"><div><label htmlFor="consent">Consent and disclosure</label><select id="consent" name="consent_status" defaultValue={inv.consent_status}><option value="unknown">Unknown / not reviewed</option><option value="cleared">Cleared for publication</option><option value="restricted">Restricted use</option><option value="withheld">Withheld</option></select></div>
        <div><label htmlFor="risk">Risk review</label><select id="risk" name="risk_status" defaultValue={inv.risk_status}><option value="unassessed">Not assessed</option><option value="reviewed">Reviewed</option><option value="high_risk">High risk / hold</option></select></div></div>
        <label htmlFor="accessibility">Accessibility review</label><select id="accessibility" name="accessibility_status" defaultValue={inv.accessibility_status}><option value="unassessed">Not assessed</option><option value="reviewed">Reviewed</option></select>
        <p><button type="submit">Save review statuses</button></p>
      </form>
    </section>

    <section id="sources"><h2>Sources</h2>{sources?.map((s) => <article className="row" key={s.id}><h3><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></h3><p>{s.publisher || "Publisher not recorded"} · {s.source_type} · consent: {s.consent_status}</p>{s.notes && <p>{s.notes}</p>}</article>)}
      <details className="card"><summary><strong>Add a source</strong></summary><form action={addSource}><input type="hidden" name="investigation_id" value={id}/>
        <label htmlFor="source-title">Title</label><input id="source-title" name="title" required/><label htmlFor="url">URL</label><input id="url" name="url" type="url" placeholder="https://" required/>
        <label htmlFor="publisher">Publisher or custodian</label><input id="publisher" name="publisher"/><label htmlFor="source-type">Source type</label><select id="source-type" name="source_type"><option value="document">Document / article</option><option value="dataset">Dataset</option><option value="interview">Interview / testimony</option><option value="archive">Archive / record</option><option value="media">Image / audio / video</option><option value="other">Other</option></select>
        <label htmlFor="source-consent">Consent status</label><select id="source-consent" name="consent_status"><option value="unknown">Unknown</option><option value="cleared">Cleared</option><option value="restricted">Restricted</option><option value="withheld">Withheld</option></select><label htmlFor="source-notes">Notes and limitations</label><textarea id="source-notes" name="notes"/><p><button type="submit">Save source</button></p>
      </form></details>
    </section>

    <section id="claims"><h2>Claims and review</h2>{claims?.map((c) => <article className="card" key={c.id}><p>{c.claim_text}</p><p className="muted">Status: {c.status.replaceAll("_", " ")}{c.reviewed_at ? ` · reviewed ${new Date(c.reviewed_at).toLocaleDateString()}` : " · awaits human review"}</p>
      {evidence?.filter((e) => e.claim_id === c.id).map((e, i) => { const source = sources?.find((item) => item.id === e.source_id); return <p key={i}>Evidence ({e.relationship}): <a href={source?.url || "#"} target="_blank" rel="noreferrer">{source?.title || "Source"}</a>{e.excerpt ? ` — ${e.excerpt}` : ""}</p>; })}
      <details><summary>Link or add evidence</summary><form action={linkEvidence}><input type="hidden" name="claim_id" value={c.id}/><input type="hidden" name="investigation_id" value={id}/>
        <label htmlFor={`evidence-sources-${c.id}`}>Sources for this claim</label><select id={`evidence-sources-${c.id}`} name="source_ids" multiple required size={Math.min(Math.max(sources?.length || 1, 2), 6)}>{sources?.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}</select>
        <label htmlFor={`evidence-relationship-${c.id}`}>Relationship</label><select id={`evidence-relationship-${c.id}`} name="relationship"><option value="supports">Supports</option><option value="challenges">Challenges</option><option value="context">Context</option></select>
        <label htmlFor={`evidence-excerpt-${c.id}`}>Excerpt or page/section locator</label><textarea id={`evidence-excerpt-${c.id}`} name="excerpt"/><p><button type="submit">Save evidence link</button></p>
      </form></details>
      <form action={reviewClaim} className="toolbar"><input type="hidden" name="claim_id" value={c.id}/><input type="hidden" name="investigation_id" value={id}/><label htmlFor={`review-${c.id}`}>Review outcome</label><select id={`review-${c.id}`} name="status" defaultValue={c.status === "unreviewed" ? "" : c.status} required><option value="" disabled>Choose an outcome</option><option value="supported">Supported by evidence</option><option value="disputed">Disputed</option><option value="not_substantiated">Not substantiated</option></select><button type="submit">Record human review</button></form>
    </article>)}
      <details className="card"><summary><strong>Add a claim</strong></summary><form action={addClaim}><input type="hidden" name="investigation_id" value={id}/><label htmlFor="claim">Specific, checkable statement</label><textarea id="claim" name="claim_text" required/><p className="muted">Add the claim first, then use “Link or add evidence” to connect its sources.</p><p><button type="submit">Add unreviewed claim</button></p></form></details>
    </section>

    <section><h2>Human publication decision</h2><p>Publishing requires a publisher role, cleared consent, completed risk and accessibility review, at least one source, at least one reviewed claim, a linked source for each claim, and no disputed claims.</p>
      <form className="card" action={setPublication}><input type="hidden" name="investigation_id" value={id}/><label htmlFor="publication">Set publication status</label><select id="publication" name="publication_status" defaultValue={inv.publication_status}><option value="private">Private</option><option value="internal_review">Internal review</option><option value="public">Public</option><option value="embargoed">Embargoed</option><option value="withdrawn">Withdrawn</option></select><p><button disabled={role !== "publisher"} type="submit">{role === "publisher" ? "Save human decision" : "Publisher role required"}</button></p></form>
    </section>

    <section><h2>Recent record history</h2>{audit?.length ? <ul>{audit.map((e, i) => <li key={`${e.created_at}-${i}`}><time>{new Date(e.created_at).toLocaleString()}</time> · {e.action.replaceAll(".", " ")} · {e.table_name}</li>)}</ul> : <p className="muted">No changes logged yet.</p>}</section>
  </>;
}
