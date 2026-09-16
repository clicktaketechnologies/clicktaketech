import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");
  const where: Record<string, unknown> = {};
  if (stage && stage !== "all") where.stage = stage;
  const leads = await db.lead.findMany({ where, orderBy: { updatedAt: "desc" }, take: 500 });
  return NextResponse.json({ ok: true, leads });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email) return NextResponse.json({ ok: false, error: "name and email required" }, { status: 422 });
  const lead = await db.lead.create({
    data: {
      name: String(body.name), email: String(body.email),
      phone: body.phone || null, company: body.company || null,
      source: body.source || "manual", stage: body.stage || "new",
      value: body.value || null, notes: body.notes || null, tags: body.tags || null, owner: body.owner || null,
    },
  });
  await logActivity({ action: "create", entity: "lead", entityId: lead.id, summary: `Created lead ${lead.name}` });
  return NextResponse.json({ ok: true, lead });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, name, email, phone, company, stage, value, notes, tags, owner } = body as Record<string, string>;
  const lead = await db.lead.update({
    where: { id },
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
  await logActivity({ action: "update", entity: "lead", entityId: id, summary: `Updated lead ${lead.name} → ${stage || "stage"}` });
  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const lead = await db.lead.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "lead", entityId: id, summary: `Deleted lead ${lead.name}` });
  return NextResponse.json({ ok: true });
}
