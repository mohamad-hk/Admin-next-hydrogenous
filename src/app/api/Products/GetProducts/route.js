import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET(req) {
  try {
    const shipments = await prisma.tbl_products.findMany();
    const serialized = superjson.serialize(shipments);
    return Response.json(serialized.json, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
