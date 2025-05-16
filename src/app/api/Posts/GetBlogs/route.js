import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET() {
  try {
    const posts = await prisma.tbl_posts.findMany();
    const serialized = superjson.serialize(posts);
    return Response.json(serialized.json, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
