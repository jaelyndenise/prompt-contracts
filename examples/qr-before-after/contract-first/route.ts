// app/api/qr/route.ts
// Generated from the prompt contract in prompt-contract.md

import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

const MIN_SIZE = 150;
const MAX_SIZE = 1000;
const DEFAULT_SIZE = 300;
const MAX_URL_LENGTH = 2048;
const ALLOWED_SCHEMES = ["http:", "https:"];

function jsonError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function clampSize(raw: string | null): number {
  if (raw === null) return DEFAULT_SIZE;
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed)) return DEFAULT_SIZE;
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, parsed));
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  const rawSize = request.nextUrl.searchParams.get("size");

  // --- Validate url parameter ---

  if (!rawUrl) {
    return jsonError("Missing required parameter: url");
  }

  if (rawUrl.length > MAX_URL_LENGTH) {
    return jsonError(
      `URL exceeds maximum length of ${MAX_URL_LENGTH} characters`
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return jsonError("Invalid URL format");
  }

  if (!ALLOWED_SCHEMES.includes(parsed.protocol)) {
    return jsonError("URL must use http or https scheme");
  }

  // --- Generate QR code ---

  const size = clampSize(rawSize);

  try {
    const qrBuffer = await QRCode.toBuffer(rawUrl, {
      width: size,
      margin: 2,
    });

    return new NextResponse(qrBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return jsonError("Failed to generate QR code", 500);
  }
}
