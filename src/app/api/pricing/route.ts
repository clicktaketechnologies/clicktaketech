import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PRICING_TIERS } from "@/lib/site-data";

export const runtime = "nodejs";

/**
 * GET /api/pricing
 * Public, unauthenticated pricing API. Returns pricing tiers from the DB,
 * merged with the static PRICING_TIERS fallback for SEO/SSR.
 *
 * This route was created so admin price edits appear on the public
 * pricing page — previously the public view imported PRICING_TIERS
 * statically and never fetched from the DB.
 */
export async function GET() {
  let dbTiers: typeof PRICING_TIERS = [];
  try {
    const rows = await db.pricingTier.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "asc" },
    });
    dbTiers = rows.map((r) => ({
      name: r.name,
      tagline: r.tagline || "",
      audience: r.audience || "",
      price: r.price,
      cadence: r.cadence || "",
      popular: r.popular,
      features: r.features ? r.features.split("\n").filter(Boolean) : [],
      notIncluded: r.notIncluded ? r.notIncluded.split("\n").filter(Boolean) : [],
      cta: r.cta || "",
    })) as typeof PRICING_TIERS;
  } catch { /* DB unreachable */ }

  // Merge: DB tiers take priority by name, static fills the rest
  const dbNames = new Set(dbTiers.map((t) => t.name));
  const staticOnly = PRICING_TIERS.filter((t) => !dbNames.has(t.name));
  const allTiers = [...dbTiers, ...staticOnly];

  return NextResponse.json({
    ok: true,
    tiers: allTiers,
    source: dbTiers.length > 0 ? "db" : "static",
  });
}
