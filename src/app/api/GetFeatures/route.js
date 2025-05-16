import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const tbl_customer = await prisma.tbl_features.findMany();
    const serialized = superjson.serialize(tbl_customer);
    return Response.json(serialized.json, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
