import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { post_title, post_feature_image, post_content, post_published, post_created_at } = body;

    const { data, error } = await supabase.from("tbl_posts").insert([
      {
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
      },
    ]);
            console.log(data,error);
    if (error) {
      return NextResponse.json({ error: " خطا در ذخیره بلاگ!" }, { status: 500 });
    }

    return NextResponse.json({ message: " بلاگ با موفقیت ذخیره شد!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 });
  }
}
