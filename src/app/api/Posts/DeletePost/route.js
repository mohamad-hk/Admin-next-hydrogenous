import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json({ error: "شناسه بلاگ ارسال نشده!" }, { status: 400 });
    }

    await prisma.tbl_posts.deleteMany({
      where: {
        post_id: Number(postId),
      },
    });

    return NextResponse.json({ message: "بلاگ با موفقیت حذف شد!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 });
  }
}
