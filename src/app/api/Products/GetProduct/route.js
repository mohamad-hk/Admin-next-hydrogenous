import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pId = searchParams.get("product_id");
  if (pId) {
    try {
      let { data: shipments, error } = await supabase
        .from("tbl_products")
        .select("*").eq("product_id",pId);

      return Response.json(shipments, { status: 200 });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }
}
