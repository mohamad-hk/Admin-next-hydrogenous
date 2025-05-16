import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const orders = await prisma.tbl_orders.findMany();
    const serialized = superjson.serialize(orders);
    return Response.json(serialized.json, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
