import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: orders, error } = await supabase.from("tbl_orders").select("*");

    return Response.json(orders, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
