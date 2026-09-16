import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const members = await db.teamMember.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
  return NextResponse.json({ ok: true, members });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.role) return NextResponse.json({ ok: false, error: "name and role required" }, { status: 422 });
  const m = await db.teamMember.create({
    data: {
      name: String(body.name), role: String(body.role),
      department: String(body.department || "General"),
      bio: body.bio || null, photo: body.photo || null,
      linkedin: body.linkedin || null, twitter: body.twitter || null,
      order: Number(body.order) || 0, active: body.active !== false,
    },
  });
  await logActivity({ action: "create", entity: "team", entityId: m.id, summary: `Added team member "${m.name}"` });
  return NextResponse.json({ ok: true, member: m });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, role, department, bio, photo, linkedin, twitter, order, active } = body as Record<string, unknown>;
  const m = await db.teamMember.update({
    where: { id: String(id) },
    data: {
      ...(name ? { name: String(name) } : {}),
      ...(role ? { role: String(role) } : {}),
      ...(department ? { department: String(department) } : {}),
      ...(typeof bio === "string" ? { bio: bio || null } : {}),
      ...(typeof photo === "string" ? { photo: photo || null } : {}),
      ...(typeof linkedin === "string" ? { linkedin: linkedin || null } : {}),
      ...(typeof twitter === "string" ? { twitter: twitter || null } : {}),
      ...(typeof order === "number" ? { order } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
    },
  });
  await logActivity({ action: "update", entity: "team", entityId: String(id), summary: `Updated team member "${m.name}"` });
  return NextResponse.json({ ok: true, member: m });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const m = await db.teamMember.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "team", entityId: id, summary: `Deleted team member "${m.name}"` });
  return NextResponse.json({ ok: true });
}
