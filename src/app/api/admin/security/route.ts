import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 100), 500);
  const type = searchParams.get("type");
  const where: Record<string, unknown> = {};
  if (type && type !== "all") where.type = type;
  const logs = await db.securityLog.findMany({ where, orderBy: { createdAt: "desc" }, take: limit });
  return NextResponse.json({ ok: true, logs });
}
