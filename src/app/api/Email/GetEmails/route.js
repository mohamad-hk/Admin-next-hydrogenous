import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const emails = await prisma.tbl_email.findMany();
    const serialized = superjson.serialize(emails);
    return Response.json(serialized.json, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
