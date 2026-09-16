import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, users });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ ok: false, error: "email and password are required" }, { status: 422 });
  }
  const existing = await db.user.findUnique({ where: { email: String(body.email).toLowerCase() } });
  if (existing) return NextResponse.json({ ok: false, error: "A user with that email already exists" }, { status: 409 });
  const user = await db.user.create({
    data: {
      email: String(body.email).toLowerCase(),
      name: body.name ? String(body.name) : null,
      password: String(body.password),
      role: body.role ? String(body.role) : "editor",
    },
  });
  await logActivity({ action: "create", entity: "user", entityId: user.id, summary: `Created user ${user.email} (${user.role})` });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, email, name, password, role } = body as Record<string, string>;
  if (email) {
    const conflict = await db.user.findFirst({ where: { email: String(email).toLowerCase(), NOT: { id } } });
    if (conflict) return NextResponse.json({ ok: false, error: "email already in use" }, { status: 409 });
  }
  const user = await db.user.update({
    where: { id },
    data: {
      ...(email ? { email: String(email).toLowerCase() } : {}),
      ...(typeof name === "string" ? { name: name || null } : {}),
      ...(password ? { password: String(password) } : {}),
      ...(role ? { role: String(role) } : {}),
    },
  });
  await logActivity({ action: "update", entity: "user", entityId: id, summary: `Updated user ${user.email}` });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const user = await db.user.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "user", entityId: id, summary: `Deleted user ${user.email}` });
  return NextResponse.json({ ok: true });
}
