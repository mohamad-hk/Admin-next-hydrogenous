import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const productPhoto = formData.get("product_photo");

    if (!productPhoto) {
      return NextResponse.json({ error: "لطفاً یک تصویر انتخاب کنید." }, { status: 400 });
    }

    const fileName = `${Date.now()}_${productPhoto.name}`;
    const savePath = path.join(process.cwd(), "public", "images", "sliders", fileName);

    const fileBuffer = Buffer.from(await productPhoto.arrayBuffer());
    fs.writeFileSync(savePath, fileBuffer);

    const data = await prisma.tbl_sliders.create({
      data: {
        slider_image: fileName,
      },
    });

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (err) {
    console.error("خطای سرور:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
