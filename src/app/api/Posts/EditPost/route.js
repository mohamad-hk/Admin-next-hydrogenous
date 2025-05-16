import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const {
      post_id,
      post_title,
      post_feature_image,
      post_content,
      post_published,
      post_created_at,
    } = await req.json();

    await prisma.tbl_posts.update({
      where: {
        post_id: Number(post_id),
      },
      data: {
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
      },
    });

    return NextResponse.json({ message: "بلاگ با موفقیت ویرایش شد!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: " خطای سرور!" }, { status: 500 });
  }
}
