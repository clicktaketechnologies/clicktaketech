import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 100), 500);
  const entity = searchParams.get("entity");
  const where: Record<string, unknown> = {};
  if (entity && entity !== "all") where.entity = entity;
  const logs = await safeQuery(
    () => db.activityLog.findMany({ where, orderBy: { createdAt: "desc" }, take: limit }),
    [],
    "activity"
  );
  return NextResponse.json({ ok: true, logs });
}
