import { NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function PATCH(req) {
  try {
    const {
      post_id,
      post_title,
      post_feature_image,
      post_content,
      post_published,
      post_created_at,
    } = await req.json()

    await pool.query(
      `UPDATE tbl_posts SET 
        post_title = $1,
        post_feature_image = $2,
        post_content = $3,
        post_published = $4,
        post_created_at = $5
      WHERE post_id = $6`,
      [
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
        Number(post_id),
      ]
    )

    return NextResponse.json({ message: "بلاگ با موفقیت ویرایش شد!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: " خطای سرور!" }, { status: 500 })
  }
}
