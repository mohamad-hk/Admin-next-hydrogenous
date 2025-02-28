import { supabase } from "@/app/utils/client";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const productID = searchParams.get("p_id");
  
  try {
    let { data: comments, error } = await supabase
      .from("tbl_comment")
      .select("*")
      .eq("product_id", productID);

    return Response.json(comments, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
