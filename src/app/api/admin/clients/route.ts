import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const clients = await db.clientLogo.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
  return NextResponse.json({ ok: true, clients });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name) return NextResponse.json({ ok: false, error: "name required" }, { status: 422 });
  const c = await db.clientLogo.create({
    data: {
      name: String(body.name),
      logo: String(body.logo || ""),
      website: body.website || null,
      category: String(body.category || "general"),
      order: Number(body.order) || 0,
      active: body.active !== false,
    },
  });
  await logActivity({ action: "create", entity: "media", entityId: c.id, summary: `Added client "${c.name}"` });
  return NextResponse.json({ ok: true, client: c });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, logo, website, category, order, active } = body as Record<string, unknown>;
  const c = await db.clientLogo.update({
    where: { id: String(id) },
    data: {
      ...(name ? { name: String(name) } : {}),
      ...(typeof logo === "string" ? { logo: String(logo) } : {}),
      ...(typeof website === "string" ? { website: website || null } : {}),
      ...(category ? { category: String(category) } : {}),
      ...(typeof order === "number" ? { order } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
    },
  });
  return NextResponse.json({ ok: true, client: c });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const c = await db.clientLogo.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "media", entityId: id, summary: `Deleted client "${c.name}"` });
  return NextResponse.json({ ok: true });
}
