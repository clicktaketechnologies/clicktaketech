import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  const apps = await safeQuery(
    () => db.jobApplication.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 }),
    [],
    "applications"
  );
  return NextResponse.json({ ok: true, applications: apps });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, status } = body as Record<string, string>;
  try {
    const app = await db.jobApplication.update({
      where: { id: String(id) },
      data: { ...(status ? { status } : {}) },
    });
    try {
      await logActivity({ action: "update", entity: "application", entityId: String(id), summary: `Set application ${app.fullName} → ${status}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true, application: app });
  } catch (err) {
    console.error("[applications] PATCH error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not update application.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  try {
    const app = await db.jobApplication.delete({ where: { id: String(id) } });
    try {
      await logActivity({ action: "delete", entity: "application", entityId: String(id), summary: `Deleted application ${app.fullName}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[applications] DELETE error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not delete application.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}
