import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const presets = await db.typographyPreset.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, presets });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.fontFamily) return NextResponse.json({ ok: false, error: "name and fontFamily required" }, { status: 422 });
  const existing = await db.typographyPreset.findUnique({ where: { name: String(body.name) } });
  if (existing) return NextResponse.json({ ok: false, error: "name already exists" }, { status: 409 });
  const p = await db.typographyPreset.create({
    data: {
      name: String(body.name), fontFamily: String(body.fontFamily),
      headingScale: String(body.headingScale || "1.25"), bodySize: String(body.bodySize || "16px"),
      lineHeight: String(body.lineHeight || "1.6"), active: false,
    },
  });
  await logActivity({ action: "create", entity: "setting", entityId: p.id, summary: `Created typography preset "${p.name}"` });
  return NextResponse.json({ ok: true, preset: p });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, active } = body as { id: string; active?: boolean };
  // If activating, deactivate all others first
  if (active) {
    await db.typographyPreset.updateMany({ data: { active: false } });
  }
  const p = await db.typographyPreset.update({ where: { id }, data: { ...(typeof active === "boolean" ? { active } : {}) } });
  await logActivity({ action: "update", entity: "setting", entityId: id, summary: `${active ? "Activated" : "Updated"} typography preset "${p.name}"` });
  return NextResponse.json({ ok: true, preset: p });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const p = await db.typographyPreset.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "setting", entityId: id, summary: `Deleted typography preset "${p.name}"` });
  return NextResponse.json({ ok: true });
}
