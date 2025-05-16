import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const p_id = searchParams.get("customer_id");

  if (!p_id) {
    return NextResponse.json({ error: "No customer_id provided" }, { status: 400 });
  }

  try {
    await prisma.tbl_customer.deleteMany({
      where: {
        customer_id: Number(p_id),
      },
    });

    return NextResponse.json(
      { message: "customer deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
