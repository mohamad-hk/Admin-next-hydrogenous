import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const products = await prisma.tbl_customer.findMany();
    const serialized = superjson.serialize(products);
    return Response.json(serialized.json, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
