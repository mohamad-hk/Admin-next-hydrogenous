import { supabase } from "@/app/utils/client";

export async function GET(req) {
  try {
    let { data: shipments, error } = await supabase
      .from("tbl_products")
      .select("*");

    return Response.json(shipments, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
