import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const redirects = await db.redirect.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, redirects });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.from || !body.to) {
    return NextResponse.json({ ok: false, error: "from and to are required" }, { status: 422 });
  }
  const existing = await db.redirect.findUnique({ where: { from: String(body.from) } });
  if (existing) return NextResponse.json({ ok: false, error: "A redirect with that 'from' path already exists" }, { status: 409 });
  const r = await db.redirect.create({
    data: {
      from: String(body.from),
      to: String(body.to),
      status: Number(body.status) || 301,
      active: body.active !== false,
    },
  });
  await logActivity({ action: "create", entity: "redirect", entityId: r.id, summary: `Added redirect ${r.from} → ${r.to}` });
  return NextResponse.json({ ok: true, redirect: r });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, from, to, status, active } = body as Record<string, unknown>;
  if (from) {
    const conflict = await db.redirect.findFirst({ where: { from: String(from), NOT: { id: String(id) } } });
    if (conflict) return NextResponse.json({ ok: false, error: "from path already in use" }, { status: 409 });
  }
  const r = await db.redirect.update({
    where: { id: String(id) },
    data: {
      ...(from ? { from: String(from) } : {}),
      ...(to ? { to: String(to) } : {}),
      ...(typeof status === "number" ? { status } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
    },
  });
  await logActivity({ action: "update", entity: "redirect", entityId: String(id), summary: `Updated redirect ${r.from}` });
  return NextResponse.json({ ok: true, redirect: r });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const r = await db.redirect.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "redirect", entityId: id, summary: `Deleted redirect ${r.from}` });
  return NextResponse.json({ ok: true });
}
