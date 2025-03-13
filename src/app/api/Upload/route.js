import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "فایلی ارسال نشده!" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/images/posts", fileName);

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, Buffer.from(buffer));

    return NextResponse.json({ fileName }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: " خطا در ذخیره‌سازی فایل!" }, { status: 500 });
  }
}
