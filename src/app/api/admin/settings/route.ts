import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  const settings = await db.siteSetting.findMany({
    where,
    orderBy: { category: "asc" },
  });
  return NextResponse.json({ ok: true, settings });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Expected an array of {key,value} updates" }, { status: 422 });
  }
  let updated = 0;
  for (const item of body as { key?: string; value?: string }[]) {
    if (!item.key) continue;
    await db.siteSetting.upsert({
      where: { key: item.key },
      update: { value: String(item.value ?? "") },
      create: { key: item.key, value: String(item.value ?? ""), category: "general" },
    });
    updated++;
  }
  await logActivity({ action: "update", entity: "setting", summary: `Updated ${updated} site settings` });
  return NextResponse.json({ ok: true, updated });
}
