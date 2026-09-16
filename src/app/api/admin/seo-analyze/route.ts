import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

const BASE_URL = "http://localhost:3000";

type Issue = { severity: "error" | "warning" | "info"; message: string; fix: string };

function analyzeHtml(html: string, slug: string) {
  const issues: Issue[] = [];
  let score = 100;

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) { issues.push({ severity: "error", message: "Missing <title> tag", fix: "Add a descriptive title (50-60 chars) containing the primary keyword." }); score -= 25; }
  else if (title.length > 60) { issues.push({ severity: "warning", message: `Title is ${title.length} chars (max 60 recommended)`, fix: `Shorten to ≤60 chars. Currently: "${title.slice(0, 60)}..."` }); score -= 8; }
  else if (title.length < 30) { issues.push({ severity: "info", message: `Title is only ${title.length} chars`, fix: "Expand to 50-60 chars for better SERP visibility." }); score -= 3; }

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : "";
  if (!desc) { issues.push({ severity: "error", message: "Missing meta description", fix: "Add a compelling description (150-160 chars) with the primary keyword + CTA." }); score -= 20; }
  else if (desc.length > 160) { issues.push({ severity: "warning", message: `Description is ${desc.length} chars (max 160)`, fix: "Shorten to ≤160 chars to avoid truncation in SERPs." }); score -= 6; }

  // H1
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count === 0) { issues.push({ severity: "error", message: "No <h1> heading", fix: "Add exactly one <h1> containing the primary keyword near the top." }); score -= 15; }
  else if (h1Count > 1) { issues.push({ severity: "warning", message: `${h1Count} <h1> tags (should be 1)`, fix: "Use only one <h1> per page for proper heading hierarchy." }); score -= 10; }

  // Canonical
  if (!/rel="canonical"/i.test(html)) { issues.push({ severity: "warning", message: "Missing canonical URL", fix: "Add <link rel='canonical' href='...'> to prevent duplicate content issues." }); score -= 8; }

  // OpenGraph
  if (!/property="og:title"/i.test(html)) { issues.push({ severity: "warning", message: "Missing OpenGraph tags", fix: "Add og:title, og:description, og:image for social sharing previews." }); score -= 8; }

  // Twitter cards
  if (!/name="twitter:card"/i.test(html)) { issues.push({ severity: "info", message: "Missing Twitter Card tags", fix: "Add twitter:card, twitter:title, twitter:description for X/Twitter previews." }); score -= 4; }

  // JSON-LD
  const jsonLdCount = (html.match(/application\/ld\+json/gi) || []).length;
  if (jsonLdCount === 0) { issues.push({ severity: "error", message: "No JSON-LD structured data", fix: "Add Organization, WebSite, and BreadcrumbList JSON-LD schema." }); score -= 10; }
  else if (jsonLdCount < 3) { issues.push({ severity: "info", message: `Only ${jsonLdCount} JSON-LD block(s)`, fix: "Add FAQPage, HowTo, or Service schema for rich-result eligibility." }); score -= 3; }

  // Semantic HTML
  if (!/<main[\s>]/i.test(html)) { issues.push({ severity: "info", message: "No <main> element", fix: "Wrap primary content in <main> for accessibility." }); score -= 3; }
  if (!/<nav[\s>]/i.test(html)) { issues.push({ severity: "info", message: "No <nav> element", fix: "Use <nav> for navigation menus." }); score -= 2; }

  // Image alt text
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgTags.filter((t) => !/alt\s*=/i.test(t));
  if (imgsWithoutAlt.length > 0) { issues.push({ severity: "warning", message: `${imgsWithoutAlt.length} image(s) missing alt text`, fix: "Add descriptive alt attributes to all images for accessibility + SEO." }); score -= 5; }

  // Word count (rough estimate from visible text)
  const textOnly = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) { issues.push({ severity: "warning", message: `Only ~${wordCount} words on page`, fix: "Aim for 300+ words for topical depth. Add more relevant content." }); score -= 8; }

  // Internal links
  const internalLinks = (html.match(/href=["'][^"']*#/gi) || []).length + (html.match(/href=["']\/[^"']*["']/gi) || []).length;
  if (internalLinks < 3) { issues.push({ severity: "info", message: `Only ${internalLinks} internal links`, fix: "Add 3+ internal links to related pages for better crawling." }); score -= 3; }

  // lang attribute
  if (!/lang="/i.test(html)) { issues.push({ severity: "warning", message: "Missing lang attribute on <html>", fix: "Add lang='en' to the <html> element." }); score -= 5; }

  // viewport
  if (!/name="viewport"/i.test(html)) { issues.push({ severity: "error", message: "Missing viewport meta tag", fix: "Add <meta name='viewport' content='width=device-width, initial-scale=1'> for mobile." }); score -= 10; }

  return { score: Math.max(0, score), title, titleLen: title.length, descLen: desc.length, h1Count, jsonLdCount, wordCount, issues, internalLinks };
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "home";
  const path = slug === "home" ? "/" : `/${slug}`;

  let html = "";
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    html = await res.text();
  } catch (err) {
    return NextResponse.json({ ok: false, error: `Could not fetch page: ${err instanceof Error ? err.message : "unknown"}` }, { status: 500 });
  }

  const analysis = analyzeHtml(html, slug);

  // Save to DB
  const audit = await db.seoAudit.create({
    data: {
      url: path,
      score: analysis.score,
      titleLen: analysis.titleLen,
      descLen: analysis.descLen,
      h1Count: analysis.h1Count,
      hasCanonical: /rel="canonical"/i.test(html),
      hasOg: /property="og:title"/i.test(html),
      hasJsonLd: analysis.jsonLdCount > 0,
      hasSitemap: true,
      hasRobots: true,
      issues: analysis.issues.map((i) => `[${i.severity}] ${i.message} → ${i.fix}`).join("\n"),
    },
  });

  await logActivity({ action: "update", entity: "setting", summary: `Ran advanced SEO analysis on "${slug}" (score: ${analysis.score})` });

  return NextResponse.json({ ok: true, slug, ...analysis, auditId: audit.id });
}
