import { NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const p_id = searchParams.get("slider_id")

  if (!p_id) {
    return NextResponse.json({ error: "No slider_id provided" }, { status: 400 })
  }

  try {
    await pool.query(
      "DELETE FROM tbl_sliders WHERE slider_id = $1",
      [Number(p_id)]
    )

    return NextResponse.json(
      { message: "slider deleted successfully" },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
