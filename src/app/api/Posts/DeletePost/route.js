import { NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get("id")

    if (!postId) {
      return NextResponse.json({ error: "شناسه بلاگ ارسال نشده!" }, { status: 400 })
    }

    await pool.query(
      "DELETE FROM tbl_posts WHERE post_id = $1",
      [Number(postId)]
    )

    return NextResponse.json({ message: "بلاگ با موفقیت حذف شد!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 })
  }
}
