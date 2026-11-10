import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/pages?slug=<slug>
 * Public, unauthenticated page API. Returns a single CMS page by slug.
 * Returns 404 if the page doesn't exist in the DB.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    // List all published pages
    try {
      const pages = await db.page.findMany({
        where: { status: "published" },
        orderBy: { updatedAt: "desc" },
      });
      return NextResponse.json({ ok: true, pages, source: "db" });
    } catch {
      return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 503 });
    }
  }

  // Single-page lookup
  try {
    const page = await db.page.findUnique({ where: { slug } });
    if (page) {
      return NextResponse.json({ ok: true, page, source: "db" });
    }
    return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Database unavailable" },
      { status: 503 }
    );
  }
}
