import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pId = searchParams.get("product_id");

  if (pId) {
    try {
      const shipments = await prisma.tbl_products.findMany({
        where: {
          product_id: Number(pId),
        },
      });

      const serialized = superjson.serialize(shipments);
      return Response.json(serialized.json, { status: 200 });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  return Response.json({ error: "شناسه محصول ارسال نشده است." }, { status: 400 });
}
