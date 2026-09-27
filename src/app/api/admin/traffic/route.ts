import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const days = Math.min(Number(searchParams.get("days") || 30), 90);

  const since = new Date();
  since.setDate(since.getDate() - days);

  // Wrap the whole stats query in safeQuery — if the SiteVisit table is
  // missing (fresh Supabase DB), return zeros instead of 500.
  const stats = await safeQuery(async () => {
    const [totalVisits, recentVisits, topPages, topReferrers, deviceBreakdown] = await Promise.all([
      db.siteVisit.count(),
      db.siteVisit.count({ where: { createdAt: { gte: since } } }),
      db.siteVisit.groupBy({ by: ["path"], _count: true, orderBy: { _count: { path: "desc" } }, take: 10 }),
      db.siteVisit.groupBy({ by: ["referrer"], _count: true, orderBy: { _count: { referrer: "desc" } }, take: 10 }),
      db.siteVisit.groupBy({ by: ["device"], _count: true }),
    ]);
    const dailyRaw = await db.siteVisit.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
      take: 10000,
    });
    const daily: { date: string; count: number }[] = [];
    for (let d = days - 1; d >= 0; d--) {
      const day = new Date();
      day.setDate(day.getDate() - d);
      const dayStr = day.toISOString().slice(0, 10);
      const count = dailyRaw.filter((v) => v.createdAt.toISOString().slice(0, 10) === dayStr).length;
      daily.push({ date: dayStr, count });
    }
    const uniqueSessions = await db.siteVisit.groupBy({ by: ["sessionId"], _count: true });
    return {
      stats: { totalVisits, recentVisits, uniqueVisitors: uniqueSessions.length, avgPerDay: days > 0 ? Math.round(recentVisits / days) : 0 },
      daily,
      topPages: topPages.map((p) => ({ path: p.path, views: p._count })),
      topReferrers: topReferrers.filter((r) => r.referrer).map((r) => ({ referrer: r.referrer, visits: r._count })),
      deviceBreakdown: deviceBreakdown.map((d) => ({ device: d.device, count: d._count })),
    };
  }, {
    stats: { totalVisits: 0, recentVisits: 0, uniqueVisitors: 0, avgPerDay: 0 },
    daily: [] as { date: string; count: number }[],
    topPages: [],
    topReferrers: [],
    deviceBreakdown: [],
  }, "traffic");

  return NextResponse.json({ ok: true, ...stats });
}

// Record a visit (public — called from the frontend tracker)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null) as { path?: string; referrer?: string; sessionId?: string } | null;
    const path = body?.path || "/";
    const referrer = body?.referrer || null;
    const sessionId = body?.sessionId || null;

    // Device detection from user agent
    const ua = req.headers.get("user-agent") || "";
    const device = /Mobile|Android|iPhone/i.test(ua) ? "mobile" : /iPad|Tablet/i.test(ua) ? "tablet" : "desktop";
    const browser = /Chrome/i.test(ua) ? "Chrome" : /Firefox/i.test(ua) ? "Firefox" : /Safari/i.test(ua) ? "Safari" : /Edge/i.test(ua) ? "Edge" : "Other";

    await db.siteVisit.create({
      data: { path, referrer, device, browser: browser || null, sessionId },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[traffic] record error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
