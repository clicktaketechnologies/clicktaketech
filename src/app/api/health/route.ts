import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Lightweight health check endpoint.
 * Served at /api/health as application/json. Used by uptime monitors and
 * by the API Catalog (RFC 9727) \`status\` link to verify service health.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      service: "clicktaketech.com",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
