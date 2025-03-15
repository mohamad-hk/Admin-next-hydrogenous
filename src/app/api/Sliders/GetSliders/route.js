import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: slider, error } = await supabase
      .from("tbl_sliders")
      .select("*");
    return Response.json(slider, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
