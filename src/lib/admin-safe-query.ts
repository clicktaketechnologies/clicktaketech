/**
 * Admin query resilience helper.
 * =============================
 * Wraps an async Prisma query in try/catch so a missing/empty Supabase
 * table (e.g. on a fresh DB where the postinstall schema-push didn't
 * complete) returns the provided fallback value instead of throwing a
 * 500. The admin SPA's OverviewTab and individual tab components already
 * handle empty arrays / zero counts gracefully, so this keeps the panel
 * usable even when the DB is partially provisioned.
 *
 * Usage:
 *   const pages = await safeQuery(
 *     () => db.page.findMany(...),
 *     [] as Page[]
 *   );
 */
export async function safeQuery<T>(
  query: () => Promise<T>,
  fallback: T,
  label?: string
): Promise<T> {
  try {
    return await query();
  } catch (err) {
    if (label) {
      console.error(`[admin:${label}] query failed:`, err instanceof Error ? err.message : err);
    }
    return fallback;
  }
}
