import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * AI-Powered Content Analysis Engine
 * Analyzes any page for SEO + AEO + GEO optimization.
 * Uses z-ai-web-dev-sdk to generate actionable recommendations.
 * Handles SPA architecture (client-side rendered pages).
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const body = await req.json().catch(() => null);
  const { url, keyword, mode } = (body || {}) as {
    url?: string;
    keyword?: string;
    mode?: "full" | "seo" | "aeo" | "geo";
  };

  const targetUrl = url || "/";
  const targetKeyword = keyword || "";
  const analysisMode = mode || "full";
  const fullUrl = targetUrl.startsWith("http") ? targetUrl : `${SITE_URL}${targetUrl}`;

  // Fetch the page HTML — handle SPA 404s gracefully
  let html = "";
  let httpStatus = 200;
  let isSpaRoute = false;
  let title = "";
  let metaDesc = "";
  let h1Text = "";
  let wordCount = 0;
  let headings: string[] = [];
  let paragraphs: string[] = [];

  try {
    const res = await fetch(fullUrl, { cache: "no-store" });
    httpStatus = res.status;
    html = await res.text();

    // If we got a 404 (SPA route that doesn't exist server-side),
    // fall back to fetching the homepage and note it's an SPA route.
    // The homepage HTML contains all the SEO meta, JSON-LD, and the
    // React app shell that renders all views client-side.
    if (httpStatus === 404 && targetUrl !== "/") {
      isSpaRoute = true;
      const homeRes = await fetch(`${SITE_URL}/`, { cache: "no-store" });
      html = await homeRes.text();
      httpStatus = 200;
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Failed to fetch ${fullUrl}: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 }
    );
  }

  // --- Extract key elements with robust regexes ---

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  // Meta description (handles both orderings of name/content)
  const descMatch =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
    html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  metaDesc = descMatch ? descMatch[1] : "";

  // H1 — strip inner HTML tags (handles <h1><span>text</span></h1>)
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "";

  // Extract all headings (H1-H6) — strip inner tags
  const headingMatches = html.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
  headings = headingMatches
    .map((h) => h.replace(/<[^>]+>/g, "").trim())
    .filter((h) => h.length > 0);

  // Extract text content for word count
  const textOnly = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  wordCount = textOnly.split(/\s+/).filter(Boolean).length;

  // Extract paragraphs (with inner content stripped)
  const pMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  paragraphs = pMatches
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter((p) => p.length > 50)
    .slice(0, 10);

  // --- Technical checks ---
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const hasCanonical = /rel=["']canonical["']/i.test(html);
  const hasOg = /property=["']og:title["']/i.test(html);
  const hasTwitter = /name=["']twitter:card["']/i.test(html);
  const jsonLdCount = (html.match(/application\/ld\+json/gi) || []).length;
  const hasViewport = /name=["']viewport["']/i.test(html);
  const hasLang = /<html[^>]*lang=["']/i.test(html);
  const imgCount = (html.match(/<img/gi) || []).length;
  const imgWithoutAlt = (html.match(/<img(?![^>]*\salt=)[^>]*>/gi) || []).length;

  const technicalChecks = {
    hasTitle: !!title,
    titleLength: title.length,
    hasMetaDesc: !!metaDesc,
    descLength: metaDesc.length,
    hasH1: h1Count > 0,
    h1Count,
    h1Text: h1Text || "(not found)",
    hasCanonical,
    hasOg,
    hasTwitter,
    hasJsonLd: jsonLdCount > 0,
    jsonLdCount,
    hasViewport,
    hasLang,
    wordCount,
    headingCount: headings.length,
    internalLinks: (html.match(/href=["'][^"']*#/gi) || []).length + (html.match(/href=["']\/[^"']*["']/gi) || []).length,
    imgCount,
    imgWithoutAlt,
    httpStatus,
    isSpaRoute,
  };

  // Calculate technical SEO score
  let techScore = 100;
  if (!technicalChecks.hasTitle) techScore -= 25;
  else if (technicalChecks.titleLength > 60) techScore -= 8;
  else if (technicalChecks.titleLength < 30) techScore -= 3;
  if (!technicalChecks.hasMetaDesc) techScore -= 20;
  else if (technicalChecks.descLength > 160) techScore -= 6;
  if (h1Count === 0) techScore -= 15;
  else if (h1Count > 1) techScore -= 10;
  if (!hasCanonical) techScore -= 8;
  if (!hasOg) techScore -= 8;
  if (jsonLdCount === 0) techScore -= 10;
  else if (jsonLdCount < 3) techScore -= 3;
  if (!hasViewport) techScore -= 10;
  if (!hasLang) techScore -= 5;
  if (wordCount < 300) techScore -= 8;
  if (imgWithoutAlt > 0) techScore -= 5;
  techScore = Math.max(0, techScore);

  // --- Use AI for deep content analysis ---
  let aiAnalysis: {
    seoScore: number;
    aeoScore: number;
    geoScore: number;
    voiceScore: number;
    recommendations: { category: string; priority: string; issue: string; fix: string }[];
    suggestedFaqs: { q: string; a: string }[];
    entities: string[];
    aiCitationWorthiness: string;
  } | null = null;

  try {
    const zai = await ZAI.create();

    // Build content summary for the AI
    const contentSummary = `
Page URL: ${targetUrl}
${isSpaRoute ? "Note: This is a client-side rendered SPA route. The base HTML (from /) is being analyzed since the content is rendered client-side via React." : ""}
Page Title: ${title}
Meta Description: ${metaDesc}
H1 Text: ${h1Text}
Word Count: ${wordCount}
Total Headings: ${headings.length}
Heading List: ${headings.join(" | ")}
First Paragraphs: ${paragraphs.join(" | ").slice(0, 2000)}
Technical Score: ${techScore}/100
JSON-LD Blocks: ${jsonLdCount}
Canonical: ${hasCanonical ? "present" : "missing"}
OpenGraph: ${hasOg ? "present" : "missing"}
Target Keyword: ${targetKeyword || "not specified"}
`.trim();

    const prompt = `You are an expert SEO + AEO (Answer Engine Optimization) + GEO (Generative Engine Optimization) analyst. Analyze this webpage and return a JSON object with scores and recommendations.

${contentSummary}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "seoScore": <0-100>,
  "aeoScore": <0-100>,
  "geoScore": <0-100>,
  "voiceScore": <0-100>,
  "recommendations": [
    { "category": "SEO|AEO|GEO|Technical|Content", "priority": "high|medium|low", "issue": "description", "fix": "actionable fix" }
  ],
  "suggestedFaqs": [
    { "q": "question", "a": "25-45 word answer" }
  ],
  "entities": ["entity1", "entity2"],
  "aiCitationWorthiness": "why AI would or wouldn't cite this content"
}

Scoring criteria:
- SEO: title/meta/h1/keyword density/internal links/content depth
- AEO: answer blocks, FAQ, definitions, tables, lists, speakable content
- GEO: unique data, statistics, quotes, references, brand authority signals
- Voice: natural language questions, concise answers, local intent

Important:
- If this is a SPA route with thin HTML content, note that the real content is rendered client-side and score based on what's available.
- Do NOT report 404 errors — the page loads fine for users (it's a client-side route).
- Focus on actionable recommendations.`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: "You are a JSON-only SEO analysis API. Return valid JSON, nothing else." },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      aiAnalysis = JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.error("[seo-tool] AI analysis error", err);
    // Fall back to technical-only scores
  }

  // Build the result
  const result = {
    url: targetUrl,
    keyword: targetKeyword,
    isSpaRoute,
    httpStatus,
    technical: technicalChecks,
    techScore,
    seoScore: aiAnalysis?.seoScore ?? Math.round(techScore * 0.7),
    aeoScore: aiAnalysis?.aeoScore ?? 0,
    geoScore: aiAnalysis?.geoScore ?? 0,
    voiceScore: aiAnalysis?.voiceScore ?? 0,
    recommendations: aiAnalysis?.recommendations ?? [],
    suggestedFaqs: aiAnalysis?.suggestedFaqs ?? [],
    entities: aiAnalysis?.entities ?? [],
    aiCitationWorthiness: aiAnalysis?.aiCitationWorthiness ?? "Not analyzed",
    analyzedAt: new Date().toISOString(),
  };

  // Save to DB
  await db.seoReport.create({
    data: {
      type: analysisMode,
      score: result.seoScore,
      summary: `SEO:${result.seoScore} AEO:${result.aeoScore} GEO:${result.geoScore} Voice:${result.voiceScore} — ${targetUrl}${isSpaRoute ? " (SPA)" : ""}`,
      data: JSON.stringify(result),
    },
  });

  await logActivity({
    action: "update",
    entity: "setting",
    summary: `SEO analysis on "${targetUrl}" — SEO:${result.seoScore} AEO:${result.aeoScore} GEO:${result.geoScore}`,
  });

  return NextResponse.json({ ok: true, analysis: result });
}
