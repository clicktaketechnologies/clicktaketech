import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const PAGES_TO_AUDIT = [
  { slug: "home", path: "/" },
  { slug: "services", path: "/services" },
  { slug: "pricing", path: "/pricing" },
  { slug: "blog", path: "/blog" },
];

function countMatches(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

async function auditPage(path: string) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? descMatch[1] : "";
    const h1Count = countMatches(html, /<h1[\s>]/gi);
    const issues: string[] = [];
    let score = 100;
    if (title.length === 0) { issues.push("Missing <title>"); score -= 25; }
    else if (title.length > 60) { issues.push(`Title too long (${title.length} chars, max 60)`); score -= 8; }
    if (desc.length === 0) { issues.push("Missing meta description"); score -= 20; }
    else if (desc.length > 160) { issues.push(`Description too long (${desc.length} chars, max 160)`); score -= 6; }
    if (h1Count === 0) { issues.push("No <h1> heading"); score -= 15; }
    else if (h1Count > 1) { issues.push(`Multiple <h1> (${h1Count}) — should be exactly 1`); score -= 10; }
    const hasCanonical = /rel="canonical"/i.test(html);
    if (!hasCanonical) { issues.push("Missing canonical URL"); score -= 8; }
    const hasOg = /property="og:title"/i.test(html);
    if (!hasOg) { issues.push("Missing OpenGraph tags"); score -= 8; }
    const hasJsonLd = /application\/ld\+json/i.test(html);
    if (!hasJsonLd) { issues.push("Missing JSON-LD structured data"); score -= 10; }
    if (!/lang="/i.test(html)) { issues.push("Missing lang attribute"); score -= 5; }
    score = Math.max(0, score);
    return {
      title,
      titleLen: title.length,
      desc,
      descLen: desc.length,
      h1Count,
      hasCanonical,
      hasOg,
      hasJsonLd,
      score,
      issues: issues.join("\n") || "No issues detected.",
    };
  } catch (err) {
    return {
      title: "",
      titleLen: 0,
      desc: "",
      descLen: 0,
      h1Count: 0,
      hasCanonical: false,
      hasOg: false,
      hasJsonLd: false,
      score: 0,
      issues: `Audit fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  // Check sitemap + robots
  let hasSitemap = false;
  let hasRobots = false;
  try {
    const sm = await fetch(`${BASE_URL}/sitemap.xml`, { cache: "no-store" });
    hasSitemap = sm.ok;
    const rb = await fetch(`${BASE_URL}/robots.txt`, { cache: "no-store" });
    hasRobots = rb.ok;
  } catch {
    /* ignore */
  }

  const results = [];
  for (const p of PAGES_TO_AUDIT) {
    const a = await auditPage(p.path);
    const rec = await db.seoAudit.create({
      data: {
        url: p.path,
        score: a.score,
        titleLen: a.titleLen,
        descLen: a.descLen,
        h1Count: a.h1Count,
        hasCanonical: a.hasCanonical,
        hasOg: a.hasOg,
        hasJsonLd: a.hasJsonLd,
        hasSitemap,
        hasRobots,
        issues: a.issues,
      },
    });
    results.push({ slug: p.slug, ...a, hasSitemap, hasRobots, auditId: rec.id });
  }
  return NextResponse.json({ ok: true, results, hasSitemap, hasRobots });
}
