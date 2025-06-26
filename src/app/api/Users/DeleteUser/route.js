import { NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const p_id = searchParams.get("customer_id")

  if (!p_id) {
    return NextResponse.json({ error: "No customer_id provided" }, { status: 400 })
  }

  try {
    await pool.query(
      "DELETE FROM tbl_customer WHERE customer_id = $1",
      [Number(p_id)]
    )

    return NextResponse.json(
      { message: "customer deleted successfully" },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
