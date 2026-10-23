import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireMember() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: membership } = await supabase.from("workspace_members").select("role").eq("user_id", user.id).maybeSingle();
  if (!membership) redirect("/access-needed");
  return { supabase, user, role: membership.role as "editor" | "reviewer" | "publisher" };
}
