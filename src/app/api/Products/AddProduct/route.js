import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const productData = JSON.parse(formData.get("productData"));
    const {
      product_name,
      product_price,
      discount_percent,
      discount_price,
      stock,
      t_category_id,
      m_category_id,
      active,
      special,
    } = productData;

    if (
      !product_name ||
      isNaN(product_price) ||
      isNaN(stock) ||
      !t_category_id ||
      !m_category_id
    ) {
      return NextResponse.json(
        { error: "لطفاً تمام فیلدهای ضروری را پر کنید." },
        { status: 400 }
      );
    }

    const productPhoto = formData.get("product_photo");
    let product_photo_filename = "";

    if (productPhoto && productPhoto.name) {
      product_photo_filename = `${productPhoto.name}`;
      const savePath = path.join(
        process.cwd(),
        "public",
        "images",
        "products",
        product_photo_filename
      );
      const fileBuffer = Buffer.from(await productPhoto.arrayBuffer());
      fs.writeFileSync(savePath, fileBuffer);
    }

    const newProduct = await prisma.tbl_products.create({
      data: {
        product_name,
        product_price,
        discount_percent,
        discount_price,
        product_photo: product_photo_filename,
        stock,
        t_category_id,
        m_category_id,
        active,
        special,
      },
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (err) {
    console.error("خطای سرور:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
