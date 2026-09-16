import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  const apps = await db.jobApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ ok: true, applications: apps });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, status } = body as Record<string, string>;
  const app = await db.jobApplication.update({
    where: { id },
    data: { ...(status ? { status } : {}) },
  });
  await logActivity({ action: "update", entity: "application", entityId: id, summary: `Set application ${app.fullName} → ${status}` });
  return NextResponse.json({ ok: true, application: app });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const app = await db.jobApplication.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "application", entityId: id, summary: `Deleted application ${app.fullName}` });
  return NextResponse.json({ ok: true });
}
