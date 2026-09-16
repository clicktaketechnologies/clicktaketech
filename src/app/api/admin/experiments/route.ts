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
  const experiments = await db.experiment.findMany({ where, orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ ok: true, experiments });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.variantA || !body?.variantB) return NextResponse.json({ ok: false, error: "name, variantA, variantB required" }, { status: 422 });
  const e = await db.experiment.create({
    data: {
      name: String(body.name), hypothesis: String(body.hypothesis || ""),
      page: String(body.page || "/"), variantA: String(body.variantA), variantB: String(body.variantB),
      metric: String(body.metric || "conversion"), status: String(body.status || "draft"),
    },
  });
  await logActivity({ action: "create", entity: "experiment", entityId: e.id, summary: `Created experiment "${e.name}"` });
  return NextResponse.json({ ok: true, experiment: e });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, status, visitorsA, visitorsB, convA, convB, winner } = body as Record<string, unknown>;
  const e = await db.experiment.update({
    where: { id },
    data: {
      ...(status ? { status: String(status) } : {}),
      ...(typeof visitorsA === "number" ? { visitorsA } : {}),
      ...(typeof visitorsB === "number" ? { visitorsB } : {}),
      ...(typeof convA === "number" ? { convA } : {}),
      ...(typeof convB === "number" ? { convB } : {}),
      ...(typeof winner === "string" ? { winner: winner || null } : {}),
    },
  });
  await logActivity({ action: "update", entity: "experiment", entityId: id, summary: `Updated experiment "${e.name}"` });
  return NextResponse.json({ ok: true, experiment: e });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const e = await db.experiment.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "experiment", entityId: id, summary: `Deleted experiment "${e.name}"` });
  return NextResponse.json({ ok: true });
}
