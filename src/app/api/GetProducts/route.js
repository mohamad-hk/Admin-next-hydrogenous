import { supabase } from "@/app/utils/client";

export async function GET(req) {
  try {
    let { data: products, error } = await supabase
      .from("tbl_products")
      .select(
        "product_id,product_name,product_price,discount_percent,discount_price,product_photo"
      );
    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
