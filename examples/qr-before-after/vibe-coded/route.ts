// app/api/qr/route.ts
// Generated from prompt: "Make me an API route that generates QR codes for restaurant menu URLs"

import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const size = request.nextUrl.searchParams.get("size");

  const qrBuffer = await QRCode.toBuffer(url!, {
    width: size ? parseInt(size) : 256,
  });

  return new NextResponse(qrBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
