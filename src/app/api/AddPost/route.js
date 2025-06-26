import { NextResponse } from "next/server"
import pool from "@/app/lib/db"
import superjson from "superjson"

export async function POST(req) {
  try {
    const {
      post_title,
      post_feature_image,
      post_content,
      post_published,
      post_created_at,
    } = await req.json()

    await pool.query(
      `INSERT INTO tbl_posts 
      (post_title, post_feature_image, post_content, post_published, post_created_at)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        post_title,
        post_feature_image,
        post_content,
        post_published,
        post_created_at,
      ]
    )

    const serialized = superjson.serialize({ message: "بلاگ با موفقیت ذخیره شد!" })
    return NextResponse.json(serialized.json, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور!" }, { status: 500 })
  }
}
