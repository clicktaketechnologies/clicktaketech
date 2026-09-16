import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const severity = searchParams.get("severity");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (severity && severity !== "all") where.severity = severity;
  const issues = await db.seoIssue.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 });
  return NextResponse.json({ ok: true, issues });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, status } = body as { id: string; status: string };
  await db.seoIssue.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true });
}
