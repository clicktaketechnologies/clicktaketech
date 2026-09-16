import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const reports = await db.seoReport.findMany({ orderBy: { createdAt: "desc" }, take: limit });
  return NextResponse.json({ ok: true, reports });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  await db.seoReport.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
