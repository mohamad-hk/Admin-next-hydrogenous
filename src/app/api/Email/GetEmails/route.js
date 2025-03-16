import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: emails, error } = await supabase.from("tbl_email").select("*");

    return Response.json(emails, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
