import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  // Fix: was missing safeQuery — the ONLY admin route without it.
  // Caused 500 → empty state in Email Center when DB unreachable.
  const templates = await safeQuery(
    () => db.emailTemplate.findMany({ where, orderBy: { updatedAt: "desc" }, take: 500 }),
    [],
    "email-templates"
  );
  return NextResponse.json({ ok: true, templates });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.slug || !body?.subject) return NextResponse.json({ ok: false, error: "name, slug, subject required" }, { status: 422 });
  try {
    const existing = await db.emailTemplate.findUnique({ where: { slug: String(body.slug) } });
    if (existing) return NextResponse.json({ ok: false, error: "slug already exists" }, { status: 409 });
    const t = await db.emailTemplate.create({
      data: {
        name: String(body.name), slug: String(body.slug), subject: String(body.subject),
        body: body.body || "", category: body.category || "transactional", status: body.status || "draft",
      },
    });
    try { await logActivity({ action: "create", entity: "email", entityId: t.id, summary: `Created email template "${t.name}"` }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true, template: t });
  } catch (err) {
    console.error("[email-templates] POST error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not create template.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, slug, subject, body: tBody, category, status } = body as Record<string, string>;
  try {
    if (slug) {
      const conflict = await db.emailTemplate.findFirst({ where: { slug: String(slug), NOT: { id } } });
      if (conflict) return NextResponse.json({ ok: false, error: "slug already in use" }, { status: 409 });
    }
    const t = await db.emailTemplate.update({
      where: { id: String(id) },
      data: {
        ...(name ? { name } : {}), ...(slug ? { slug } : {}), ...(subject ? { subject } : {}),
        ...(typeof tBody === "string" ? { body: tBody } : {}),
        ...(category ? { category } : {}), ...(status ? { status } : {}),
      },
    });
    try { await logActivity({ action: "update", entity: "email", entityId: String(id), summary: `Updated email template "${t.name}"` }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true, template: t });
  } catch (err) {
    console.error("[email-templates] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not update template.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  try {
    const t = await db.emailTemplate.delete({ where: { id: String(id) } });
    try { await logActivity({ action: "delete", entity: "email", entityId: String(id), summary: `Deleted email template "${t.name}"` }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[email-templates] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not delete template.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}
