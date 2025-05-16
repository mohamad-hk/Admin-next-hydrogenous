import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(req) {
  try {
    const {
      p_id,
      product_name,
      product_price,
      discount_percent,
      discount_price,
      product_photo,
      stock,
      t_category_id,
      m_category_id,
      active,
      special,
    } = await req.json();

    if (!p_id) {
      return NextResponse.json({ error: "p_id is required" }, { status: 400 });
    }

    const existingProduct = await prisma.tbl_products.findUnique({
      where: {
        product_id: Number(p_id),
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const updateData = {};

    if (product_name) updateData.product_name = product_name;
    if (product_price) updateData.product_price = product_price;
    if (discount_percent) updateData.discount_percent = discount_percent;
    if (discount_price) updateData.discount_price = discount_price;
    if (product_photo) updateData.product_photo = product_photo;
    if (stock) updateData.stock = Number(stock);
    if (t_category_id) updateData.t_category_id = t_category_id;
    if (m_category_id) updateData.m_category_id = m_category_id;
    if (typeof active !== "undefined") updateData.active = active;
    if (typeof special !== "undefined") updateData.special = special;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updatedProduct = await prisma.tbl_products.update({
      where: {
        product_id: Number(p_id),
      },
      data: updateData,
    });

    return NextResponse.json({ status: 200, data: updatedProduct });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
