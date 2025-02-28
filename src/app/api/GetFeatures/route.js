import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: tbl_customer, error } = await supabase
      .from("tbl_features")
      .select("*");

    return Response.json(tbl_customer, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
