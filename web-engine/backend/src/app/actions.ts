"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireMember } from "@/lib/auth";

const text = (v: FormDataEntryValue | null) => typeof v === "string" ? v.trim() : "";
const idSchema = z.string().uuid();
export async function signIn(form: FormData) {
  const email = text(form.get("email"));
  if (!z.string().email().safeParse(email).success) redirect("/login?error=Enter%20a%20valid%20email%20address");
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) redirect("/login?error=Set%20NEXT_PUBLIC_SITE_URL%20in%20the%20app%20environment");
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/confirm?next=/` } });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?sent=1");
}

export async function signOut() { const supabase = await createClient(); await supabase.auth.signOut(); redirect("/login"); }

export async function createInvestigation(form: FormData) {
  const { supabase, user } = await requireMember();
  const title = text(form.get("title")); const summary = text(form.get("summary"));
  if (title.length < 4) redirect("/investigations/new?error=Add%20a%20descriptive%20title");
  const { data, error } = await supabase.from("investigations").insert({ title, summary, created_by: user.id }).select("id").single();
  if (error) redirect(`/investigations/new?error=${encodeURIComponent(error.message)}`);
  redirect(`/investigations/${data.id}`);
}

export async function addSource(form: FormData) {
  const { supabase, user } = await requireMember(); const investigation_id = text(form.get("investigation_id"));
  if (!idSchema.safeParse(investigation_id).success) throw new Error("Invalid investigation.");
  const title = text(form.get("title")); const url = text(form.get("url")); const publisher = text(form.get("publisher"));
  const parsedUrl = z.string().url().safeParse(url); if (!parsedUrl.success || !/^https?:/.test(url)) redirect(`/investigations/${investigation_id}?error=Enter%20a%20valid%20http%20or%20https%20source%20URL`);
  if (title.length < 3) redirect(`/investigations/${investigation_id}?error=Add%20the%20source%20title`);
  const { data, error } = await supabase.from("sources").insert({ investigation_id, title, url, publisher, source_type: text(form.get("source_type")) || "document", consent_status: text(form.get("consent_status")) || "unknown", notes: text(form.get("notes")), created_by: user.id }).select("id").single();
  if (error) redirect(`/investigations/${investigation_id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/investigations/${investigation_id}`); redirect(`/investigations/${investigation_id}#sources`);
}

export async function addClaim(form: FormData) {
  const { supabase, user } = await requireMember(); const investigation_id = text(form.get("investigation_id"));
  if (!idSchema.safeParse(investigation_id).success) throw new Error("Invalid investigation.");
  const claim_text = text(form.get("claim_text")); if (claim_text.length < 8) redirect(`/investigations/${investigation_id}?error=Write%20the%20claim%20as%20a%20specific%20checkable%20statement`);
  const { data, error } = await supabase.from("claims").insert({ investigation_id, claim_text, status: "unreviewed", created_by: user.id }).select("id").single();
  if (error) redirect(`/investigations/${investigation_id}?error=${encodeURIComponent(error.message)}`);
  const sourceIds = form.getAll("source_ids").filter((value): value is string => typeof value === "string" && idSchema.safeParse(value).success);
  if (sourceIds.length) {
    const relationshipResult = z.enum(["supports","challenges","context"]).safeParse(text(form.get("relationship")));
    const relationship = relationshipResult.success ? relationshipResult.data : "context";
    const excerpt = text(form.get("excerpt"));
    const links = sourceIds.map((source_id) => ({ claim_id: data.id, source_id, investigation_id, relationship, excerpt, created_by: user.id }));
    const { error: evidenceError } = await supabase.from("claim_evidence").insert(links);
    if (evidenceError) redirect(`/investigations/${investigation_id}?error=${encodeURIComponent(evidenceError.message)}`);
  }
  revalidatePath(`/investigations/${investigation_id}`); redirect(`/investigations/${investigation_id}#claims`);
}

export async function reviewClaim(form: FormData) {
  const { supabase, user } = await requireMember(); const id = text(form.get("claim_id")); const investigation_id = text(form.get("investigation_id"));
  if (!idSchema.safeParse(id).success || !idSchema.safeParse(investigation_id).success) throw new Error("Invalid claim.");
  const status = z.enum(["supported","disputed","not_substantiated"]).safeParse(text(form.get("status")));
  if (!status.success) redirect(`/investigations/${investigation_id}?error=Choose%20an%20explicit%20human%20review%20outcome`);
  const { error } = await supabase.from("claims").update({ status: status.data, reviewed_by: user.id, reviewed_at: new Date().toISOString() }).eq("id",id).eq("investigation_id",investigation_id);
  if (error) redirect(`/investigations/${investigation_id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/investigations/${investigation_id}`); redirect(`/investigations/${investigation_id}#claims`);
}

export async function linkEvidence(form: FormData) {
  const { supabase, user } = await requireMember();
  const investigation_id = text(form.get("investigation_id"));
  const claim_id = text(form.get("claim_id"));
  if (!idSchema.safeParse(investigation_id).success || !idSchema.safeParse(claim_id).success) throw new Error("Invalid claim or investigation.");
  const sourceIds = form.getAll("source_ids").filter((value): value is string => typeof value === "string" && idSchema.safeParse(value).success);
  if (!sourceIds.length) redirect(`/investigations/${investigation_id}?error=Select%20at%20least%20one%20source`);
  const relationshipResult = z.enum(["supports","challenges","context"]).safeParse(text(form.get("relationship")));
  const relationship = relationshipResult.success ? relationshipResult.data : "context";
  const excerpt = text(form.get("excerpt"));
  const rows = sourceIds.map((source_id) => ({ claim_id, source_id, investigation_id, relationship, excerpt, created_by:user.id }));
  const { error } = await supabase.from("claim_evidence").insert(rows);
  if (error) redirect(`/investigations/${investigation_id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/investigations/${investigation_id}`); redirect(`/investigations/${investigation_id}#claims`);
}

export async function updateReadiness(form: FormData) {
  const { supabase, user } = await requireMember(); const id = text(form.get("investigation_id"));
  if (!idSchema.safeParse(id).success) throw new Error("Invalid investigation.");
  const values = { consent_status: text(form.get("consent_status")), risk_status: text(form.get("risk_status")), accessibility_status: text(form.get("accessibility_status")) };
  const enums = [z.enum(["unknown","cleared","restricted","withheld"]),z.enum(["unassessed","reviewed","high_risk"]),z.enum(["unassessed","reviewed"])];
  if (!enums[0].safeParse(values.consent_status).success || !enums[1].safeParse(values.risk_status).success || !enums[2].safeParse(values.accessibility_status).success) throw new Error("Invalid review status.");
  const { error } = await supabase.from("investigations").update(values).eq("id",id);
  if (error) redirect(`/investigations/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/investigations/${id}`); redirect(`/investigations/${id}#readiness`);
}

export async function setPublication(form: FormData) {
  const { supabase, user, role } = await requireMember(); const id = text(form.get("investigation_id"));
  if (!idSchema.safeParse(id).success) throw new Error("Invalid investigation.");
  if (role !== "publisher") redirect(`/investigations/${id}?error=Only%20a%20designated%20publisher%20can%20change%20publication%20status`);
  const status = z.enum(["private","internal_review","public","embargoed","withdrawn"]).safeParse(text(form.get("publication_status")));
  if (!status.success) throw new Error("Invalid publication status.");
  const { error } = await supabase.from("investigations").update({ publication_status: status.data, publication_decided_by: user.id, publication_decided_at: new Date().toISOString() }).eq("id",id);
  if (error) redirect(`/investigations/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/"); revalidatePath(`/investigations/${id}`); redirect(`/investigations/${id}?notice=Publication%20status%20saved`);
}

export async function createIntake(form: FormData) {
  const { supabase, user } = await requireMember(); const title = text(form.get("title")); const payload = text(form.get("payload"));
  if (title.length < 3 || payload.length < 8) redirect("/intake?error=Add%20a%20title%20and%20enough%20detail%20to%20review");
  const { data, error } = await supabase.from("intake_items").insert({ title, payload, created_by:user.id }).select("id").single();
  if (error) redirect(`/intake?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/intake"); redirect("/intake?notice=Temporary%20intake%20saved%20for%20human%20review");
}

export async function promoteIntake(form: FormData) {
  const { supabase, user } = await requireMember(); const id = text(form.get("intake_id"));
  if (!idSchema.safeParse(id).success) throw new Error("Invalid intake record.");
  const { data: item, error: readError } = await supabase.from("intake_items").select("id,title,payload").eq("id",id).is("promoted_at",null).gt("expires_at",new Date().toISOString()).single();
  if (readError || !item) redirect("/intake?error=This%20item%20expired%20or%20was%20already%20promoted");
  const { data: inv, error } = await supabase.from("investigations").insert({ title:item.title, summary:item.payload, created_by:user.id }).select("id").single();
  if (error) redirect(`/intake?error=${encodeURIComponent(error.message)}`);
  const { error: updateError } = await supabase.from("intake_items").update({ promoted_at:new Date().toISOString(), promoted_by:user.id, promoted_investigation_id:inv.id }).eq("id",id);
  if (updateError) throw new Error(updateError.message);
  revalidatePath("/intake"); redirect(`/investigations/${inv.id}?notice=Promoted%20after%20human%20review`);
}
