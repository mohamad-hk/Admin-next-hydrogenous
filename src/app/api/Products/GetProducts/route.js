import pool from "@/app/lib/db"

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tbl_products")
    return Response.json(result.rows, { status: 200 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
