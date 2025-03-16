import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { post_id, post_title, post_feature_image, post_content, post_published, post_created_at } = await req.json();

    const { data, error } = await supabase
      .from("tbl_posts")
      .update({
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
      })
      .eq("post_id", post_id);
      console.log(error,data);

    if (error) {
      return NextResponse.json({ error: " خطا در ویرایش بلاگ!" }, { status: 500 });
    }

    return NextResponse.json({ message: "بلاگ با موفقیت ویرایش شد!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: " خطای سرور!" }, { status: 500 });
  }
}
