import { NextResponse } from "next/server"
import pool from "@/app/lib/db"
import fs from "fs/promises"
import path from "path"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const productPhoto = formData.get("product_photo")

    if (!productPhoto) {
      return NextResponse.json({ error: "لطفاً یک تصویر انتخاب کنید." }, { status: 400 })
    }

    const fileName = `${Date.now()}_${productPhoto.name}`
    const savePath = path.join(process.cwd(), "public", "images", "sliders", fileName)

    const fileBuffer = Buffer.from(await productPhoto.arrayBuffer())
    await fs.mkdir(path.dirname(savePath), { recursive: true })
    await fs.writeFile(savePath, fileBuffer)

    const result = await pool.query(
      `INSERT INTO tbl_sliders (slider_image) VALUES ($1) RETURNING *`,
      [fileName]
    )

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error("خطای سرور:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
