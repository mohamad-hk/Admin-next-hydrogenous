import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json({ error: "شناسه بلاگ ارسال نشده!" }, { status: 400 });
    }

    const { error } = await supabase.from("tbl_posts").delete().eq("post_id", postId);

    if (error) {
      return NextResponse.json({ error: "خطا در حذف بلاگ!" }, { status: 500 });
    }

    return NextResponse.json({ message: " بلاگ با موفقیت حذف شد!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 });
  }
}
