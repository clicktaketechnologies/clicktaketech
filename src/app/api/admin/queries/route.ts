import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (source && source !== "all") where.source = source;
  const queries = await safeQuery(
    () => db.contactQuery.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 }),
    [],
    "queries"
  );
  return NextResponse.json({ ok: true, queries });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  const { id, status } = body as Record<string, string>;
  const q = await db.contactQuery.update({
    where: { id: String(id) },
    data: { ...(status ? { status } : {}) },
  });
  return NextResponse.json({ ok: true, query: q });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  await db.contactQuery.delete({ where: { id: String(id) } });
  return NextResponse.json({ ok: true });
}
