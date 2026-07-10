import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // No tables exist yet, so we can't run a literal `select 1`.
  // auth.getSession() round-trips to the Supabase API and confirms
  // the URL/anon key are valid without depending on any schema.
  const { error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Supabase connection successful" });
}
