import pool from "@/app/lib/db"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const productID = searchParams.get("p_id")

  try {
    const result = await pool.query(
      "SELECT * FROM tbl_comment WHERE product_id = $1",
      [Number(productID)]
    )
    return Response.json(result.rows, { status: 200 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
