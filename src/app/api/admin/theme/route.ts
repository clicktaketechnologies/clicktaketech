import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const vars = await db.themeVariable.findMany({ orderBy: { category: "asc" } });
  return NextResponse.json({ ok: true, vars });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ ok: false, error: "Expected array of {key,value}" }, { status: 422 });
  let updated = 0;
  for (const item of body as { key?: string; value?: string }[]) {
    if (!item.key) continue;
    await db.themeVariable.upsert({
      where: { key: item.key },
      update: { value: String(item.value ?? "") },
      create: { key: item.key, value: String(item.value ?? ""), category: "color" },
    });
    updated++;
  }
  await logActivity({ action: "update", entity: "setting", summary: `Updated ${updated} theme variables` });
  return NextResponse.json({ ok: true, updated });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.key || !body?.value) return NextResponse.json({ ok: false, error: "key and value required" }, { status: 422 });
  const existing = await db.themeVariable.findUnique({ where: { key: String(body.key) } });
  if (existing) return NextResponse.json({ ok: false, error: "key already exists" }, { status: 409 });
  const v = await db.themeVariable.create({ data: { key: String(body.key), value: String(body.value), category: body.category || "color" } });
  await logActivity({ action: "create", entity: "setting", entityId: v.id, summary: `Added theme variable ${v.key}` });
  return NextResponse.json({ ok: true, var: v });
}
