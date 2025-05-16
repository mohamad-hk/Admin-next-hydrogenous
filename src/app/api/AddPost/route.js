import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import superjson from "superjson";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      post_title,
      post_feature_image,
      post_content,
      post_published,
      post_created_at,
    } = body;

    const data = await prisma.tbl_posts.create({
      data: {
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
      },
    });

    const serialized = superjson.serialize({ message: "بلاگ با موفقیت ذخیره شد!" });
    return NextResponse.json(serialized.json, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 });
  }
}
