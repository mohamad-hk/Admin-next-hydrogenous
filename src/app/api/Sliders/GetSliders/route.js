import pool from "@/app/lib/db"

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tbl_sliders")
    return Response.json(result.rows, { status: 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
