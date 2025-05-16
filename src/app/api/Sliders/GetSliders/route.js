import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const slider = await prisma.tbl_sliders.findMany();
    const serialized = superjson.serialize(slider);
    return Response.json(serialized.json, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
