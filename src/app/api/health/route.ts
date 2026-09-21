import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Lightweight health check endpoint.
 * Ping this every 10 minutes via UptimeRobot/cron-job.org to keep
 * Vercel serverless functions warm (prevent cold starts on free tier).
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? `${process.uptime().toFixed(0)}s` : "n/a",
  });
}
