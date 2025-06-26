import pool from "@/app/lib/db"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const pId = searchParams.get("product_id")

  if (!pId) {
    return Response.json({ error: "شناسه محصول ارسال نشده است." }, { status: 400 })
  }

  try {
    const result = await pool.query(
      "SELECT * FROM tbl_products WHERE product_id = $1",
      [Number(pId)]
    )

    return Response.json(result.rows, { status: 200 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
