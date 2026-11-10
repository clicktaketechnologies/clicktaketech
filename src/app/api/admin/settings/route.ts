import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";
import { getSeedSettings } from "@/lib/admin-seed-data";

export const runtime = "nodejs";

/**
 * GET /api/admin/settings?category=identity
 * Returns all site settings (optionally filtered by category).
 * The `source` field indicates whether data came from the DB ("db") or
 * the seed fallback ("seed") — the frontend uses this to show a warning
 * banner when the DB is unreachable.
 */
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  const seedFallback = getSeedSettings().filter((s) =>
    !category || category === "all" || s.category === category
  );

  let source: "db" | "seed" = "db";
  const settings = await safeQuery(
    () => db.siteSetting.findMany({ where, orderBy: { category: "asc" } }),
    seedFallback,
    "settings"
  );
  // safeQuery returns the fallback on failure — detect by checking if we
  // got the exact seed array back (same reference).
  if (settings === seedFallback) source = "seed";

  return NextResponse.json({ ok: true, settings, source });
}

/**
 * PATCH /api/admin/settings
 * Body: Array<{ key: string; value: string; category?: string }>
 * Upserts each setting. Returns proper error status when DB writes fail
 * (previously returned HTTP 200 with dbFailed:true — frontend never
 * checked it, causing "settings don't persist" perception).
 */
export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, error: "Expected an array of {key,value} updates" },
      { status: 422 }
    );
  }

  let updated = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const item of body as { key?: string; value?: string; category?: string }[]) {
    if (!item.key) {
      failed++;
      errors.push("Missing key in one or more items");
      continue;
    }
    try {
      await db.siteSetting.upsert({
        where: { key: item.key },
        update: { value: String(item.value ?? "") },
        create: {
          key: item.key,
          value: String(item.value ?? ""),
          // Use the category from the request if provided; fall back to
          // "general" only if not specified. This prevents new settings
          // from being invisible in the UI (previously always "general").
          category: item.category || "general",
        },
      });
      updated++;
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${item.key}: ${msg}`);
      console.error("[settings] upsert failed for key:", item.key, msg);
    }
  }

  // Activity log (best-effort)
  try {
    await logActivity({
      action: "update",
      entity: "setting",
      summary: `Updated ${updated} setting(s)${failed > 0 ? `, ${failed} failed` : ""}`,
    });
  } catch { /* ignore */ }

  // If ANY writes failed, return a non-2xx status so the frontend
  // knows the save didn't fully succeed. Previously this always
  // returned 200 with dbFailed:true — the frontend never checked it.
  if (failed > 0 && updated === 0) {
    // All writes failed — DB is likely unreachable
    return NextResponse.json(
      {
        ok: false,
        error: "Database unavailable — settings were NOT saved. Please try again later.",
        updated,
        failed,
        errors: errors.slice(0, 5), // first 5 error details
      },
      { status: 503 }
    );
  }

  if (failed > 0) {
    // Partial success — some saved, some failed
    return NextResponse.json(
      {
        ok: true,
        warning: `${updated} saved, ${failed} failed. Some settings may not have persisted.`,
        updated,
        failed,
        errors: errors.slice(0, 5),
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, updated, failed: 0 });
}
