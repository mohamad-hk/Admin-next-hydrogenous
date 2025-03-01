import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: products, error } = await supabase
      .from("tbl_blog")
      .select("*");
    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
