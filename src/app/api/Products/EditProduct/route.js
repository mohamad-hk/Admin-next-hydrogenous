import { NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function PATCH(req) {
  try {
    const {
      p_id,
      product_name,
      product_price,
      discount_percent,
      discount_price,
      product_photo,
      stock,
      t_category_id,
      m_category_id,
      active,
      special,
    } = await req.json()

    if (!p_id) {
      return NextResponse.json({ error: "p_id is required" }, { status: 400 })
    }

    const existing = await pool.query(
      "SELECT * FROM tbl_products WHERE product_id = $1",
      [Number(p_id)]
    )

    if (existing.rowCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    const fields = []
    const values = []
    let idx = 1

    if (product_name) {
      fields.push(`product_name = $${idx++}`)
      values.push(product_name)
    }
    if (product_price) {
      fields.push(`product_price = $${idx++}`)
      values.push(product_price)
    }
    if (discount_percent) {
      fields.push(`discount_percent = $${idx++}`)
      values.push(discount_percent)
    }
    if (discount_price) {
      fields.push(`discount_price = $${idx++}`)
      values.push(discount_price)
    }
    if (product_photo) {
      fields.push(`product_photo = $${idx++}`)
      values.push(product_photo)
    }
    if (typeof stock !== "undefined") {
      fields.push(`stock = $${idx++}`)
      values.push(Number(stock))
    }
    if (t_category_id) {
      fields.push(`t_category_id = $${idx++}`)
      values.push(t_category_id)
    }
    if (m_category_id) {
      fields.push(`m_category_id = $${idx++}`)
      values.push(m_category_id)
    }
    if (typeof active !== "undefined") {
      fields.push(`active = $${idx++}`)
      values.push(active)
    }
    if (typeof special !== "undefined") {
      fields.push(`special = $${idx++}`)
      values.push(special)
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    values.push(Number(p_id))
    const query = `UPDATE tbl_products SET ${fields.join(", ")} WHERE product_id = $${idx}`
    const updated = await pool.query(query, values)

    return NextResponse.json({ status: 200, data: updated }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
