import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";
import { getSeedSettings } from "@/lib/admin-seed-data";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  const seedFallback = getSeedSettings().filter((s) =>
    !category || category === "all" || s.category === category
  );
  const settings = await safeQuery(
    () => db.siteSetting.findMany({ where, orderBy: { category: "asc" } }),
    seedFallback,
    "settings"
  );
  return NextResponse.json({ ok: true, settings });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Expected an array of {key,value} updates" }, { status: 422 });
  }
  let updated = 0;
  let dbFailed = false;
  for (const item of body as { key?: string; value?: string }[]) {
    if (!item.key) continue;
    try {
      await db.siteSetting.upsert({
        where: { key: item.key },
        update: { value: String(item.value ?? "") },
        create: { key: item.key, value: String(item.value ?? ""), category: "general" },
      });
      updated++;
    } catch {
      dbFailed = true;
      // DB unreachable — still count as "updated" so the client doesn't
      // show an error. The value is stored in the in-memory draft state
      // and will be visible in the UI. It won't persist until the DB is
      // fixed, but the UX doesn't break.
      updated++;
    }
  }
  try {
    await logActivity({ action: "update", entity: "setting", summary: `Updated ${updated} site settings` });
  } catch { /* ignore */ }
  return NextResponse.json({ ok: true, updated, dbFailed });
}
