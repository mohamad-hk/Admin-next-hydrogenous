import { prisma } from "@/app/lib/prisma";
import superjson from "superjson";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productID = searchParams.get("p_id");

  try {
    const comments = await prisma.tbl_comment.findMany({
      where: {
        product_id: Number(productID),
      },
    });

    const serialized = superjson.serialize(comments);
    return Response.json(serialized.json, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
