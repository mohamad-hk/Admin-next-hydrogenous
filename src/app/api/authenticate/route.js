import { NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(req) {
  try {
    const { token, secret } = await req.json();

    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token, 
      window: 1, 
    });

    return NextResponse.json({ verified }); 
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
