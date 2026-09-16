import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  const templates = await db.emailTemplate.findMany({ where, orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ ok: true, templates });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.slug || !body?.subject) return NextResponse.json({ ok: false, error: "name, slug, subject required" }, { status: 422 });
  const existing = await db.emailTemplate.findUnique({ where: { slug: String(body.slug) } });
  if (existing) return NextResponse.json({ ok: false, error: "slug already exists" }, { status: 409 });
  const t = await db.emailTemplate.create({
    data: {
      name: String(body.name), slug: String(body.slug), subject: String(body.subject),
      body: body.body || "", category: body.category || "transactional", status: body.status || "draft",
    },
  });
  await logActivity({ action: "create", entity: "email", entityId: t.id, summary: `Created email template "${t.name}"` });
  return NextResponse.json({ ok: true, template: t });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, slug, subject, body: tBody, category, status } = body as Record<string, string>;
  if (slug) {
    const conflict = await db.emailTemplate.findFirst({ where: { slug: String(slug), NOT: { id } } });
    if (conflict) return NextResponse.json({ ok: false, error: "slug already in use" }, { status: 409 });
  }
  const t = await db.emailTemplate.update({
    where: { id },
    data: {
      ...(name ? { name } : {}), ...(slug ? { slug } : {}), ...(subject ? { subject } : {}),
      ...(typeof tBody === "string" ? { body: tBody } : {}),
      ...(category ? { category } : {}), ...(status ? { status } : {}),
    },
  });
  await logActivity({ action: "update", entity: "email", entityId: id, summary: `Updated email template "${t.name}"` });
  return NextResponse.json({ ok: true, template: t });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const t = await db.emailTemplate.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "email", entityId: id, summary: `Deleted email template "${t.name}"` });
  return NextResponse.json({ ok: true });
}
