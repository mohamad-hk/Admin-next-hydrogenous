import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const p_id = searchParams.get("customer_id");

  if (!p_id) {
    return NextResponse.json({ error: "No ship_id provided" }, { status: 400 });
  }

  try {
    const { error } = await supabase
      .from("tbl_customer")
      .delete()
      .eq("customer_id", p_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "customer deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
