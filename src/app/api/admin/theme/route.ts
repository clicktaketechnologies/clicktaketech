import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const vars = await safeQuery(
    () => db.themeVariable.findMany({ orderBy: { category: "asc" } }),
    [],
    "theme"
  );
  return NextResponse.json({ ok: true, vars });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ ok: false, error: "Expected array of {key,value}" }, { status: 422 });
  try {
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
    try {
      await logActivity({ action: "update", entity: "setting", summary: `Updated ${updated} theme variables` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true, updated });
  } catch (err) {
    console.error("[theme] PATCH error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not update theme variables.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.key || !body?.value) return NextResponse.json({ ok: false, error: "key and value required" }, { status: 422 });
  try {
    const existing = await db.themeVariable.findUnique({ where: { key: String(body.key) } });
    if (existing) return NextResponse.json({ ok: false, error: "key already exists" }, { status: 409 });
    const v = await db.themeVariable.create({ data: { key: String(body.key), value: String(body.value), category: body.category || "color" } });
    try {
      await logActivity({ action: "create", entity: "setting", entityId: v.id, summary: `Added theme variable ${v.key}` });
    } catch { /* ignore activity log errors */ }
    return NextResponse.json({ ok: true, var: v });
  } catch (err) {
    console.error("[theme] POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Database error — could not create theme variable.", detail: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}
