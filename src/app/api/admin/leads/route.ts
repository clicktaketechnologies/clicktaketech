import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");
  const where: Record<string, unknown> = {};
  if (stage && stage !== "all") where.stage = stage;
  const leads = await safeQuery(
    () => db.lead.findMany({ where, orderBy: { updatedAt: "desc" }, take: 500 }),
    [],
    "leads"
  );
  return NextResponse.json({ ok: true, leads });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email) return NextResponse.json({ ok: false, error: "name and email required" }, { status: 422 });
  try {
    const lead = await db.lead.create({
      data: {
        name: String(body.name), email: String(body.email),
        phone: body.phone || null, company: body.company || null,
        source: body.source || "manual", stage: body.stage || "new",
        value: body.value || null, notes: body.notes || null, tags: body.tags || null, owner: body.owner || null,
      },
    });
    try {
      await logActivity({ action: "create", entity: "lead", entityId: lead.id, summary: `Created lead ${lead.name}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error("[leads] POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not create lead.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, email, phone, company, stage, value, notes, tags, owner } = body as Record<string, string>;
  try {
    const lead = await db.lead.update({
      where: { id: String(id) },
      data: {
        ...(name ? { name } : {}), ...(email ? { email } : {}),
        ...(typeof phone === "string" ? { phone: phone || null } : {}),
        ...(typeof company === "string" ? { company: company || null } : {}),
        ...(stage ? { stage } : {}), ...(typeof value === "string" ? { value: value || null } : {}),
        ...(typeof notes === "string" ? { notes: notes || null } : {}),
        ...(typeof tags === "string" ? { tags: tags || null } : {}),
        ...(typeof owner === "string" ? { owner: owner || null } : {}),
      },
    });
    try {
      await logActivity({ action: "update", entity: "lead", entityId: String(id), summary: `Updated lead ${lead.name} → ${stage || "stage"}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error("[leads] PATCH error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not update lead.", detail: err instanceof Error ? err.message : String(err) },
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
    const lead = await db.lead.delete({ where: { id: String(id) } });
    try {
      await logActivity({ action: "delete", entity: "lead", entityId: String(id), summary: `Deleted lead ${lead.name}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] DELETE error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not delete lead.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}
