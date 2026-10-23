import Link from "next/link";
import { requireMember } from "@/lib/auth";
import { signOut } from "./actions";

export default async function Home() {
  const { supabase, user, role } = await requireMember();
  const { data: investigations } = await supabase.from("investigations").select("id,title,summary,publication_status,updated_at").order("updated_at",{ascending:false}).limit(50);
  return <>
    <div className="eyebrow">Investigative workspace</div><h1>Your investigations</h1>
    <p className="intro">Research records stay private until a designated human publisher changes their status. Source, consent, risk, accessibility, and claim review remain visible as separate decisions.</p>
    <div className="toolbar"><Link className="button" href="/investigations/new">Create investigation</Link><span className="muted">Signed in as {user.email} · role: {role}</span><form action={signOut}><button type="submit">Sign out</button></form></div>
    {!investigations?.length ? <section className="notice"><strong>No investigations yet.</strong> Start a record or submit an observation to Temporary intake.</section> : <div className="grid">{investigations.map((item)=><article className="card" key={item.id}><div className="status">{item.publication_status.replace("_"," ")}</div><h2><Link href={`/investigations/${item.id}`}>{item.title}</Link></h2><p>{item.summary || "No summary yet."}</p><p className="muted">Updated {new Date(item.updated_at).toLocaleDateString()}</p></article>)}</div>}
  </>;
}
