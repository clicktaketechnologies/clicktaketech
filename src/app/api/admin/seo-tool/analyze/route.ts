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

  // Fetch the page HTML
  let html = "";
  let title = "";
  let metaDesc = "";
  let h1 = "";
  let wordCount = 0;
  let headings: string[] = [];
  let paragraphs: string[] = [];

  try {
    const res = await fetch(fullUrl, { cache: "no-store" });
    html = await res.text();

    // Extract key elements
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : "";

    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    metaDesc = descMatch ? descMatch[1] : "";

    const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
    h1 = h1Match ? h1Match[1].trim() : "";

    // Extract all headings
    const headingMatches = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || [];
    headings = headingMatches.map((h) => h.replace(/<[^>]+>/g, "").trim()).filter(Boolean);

    // Extract text content for word count
    const textOnly = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ");
    wordCount = textOnly.split(/\s+/).filter(Boolean).length;

    // Extract paragraphs
    const pMatches = html.match(/<p[^>]*>([^<]+)<\/p>/gi) || [];
    paragraphs = pMatches.map((p) => p.replace(/<[^>]+>/g, "").trim()).filter((p) => p.length > 50).slice(0, 10);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Failed to fetch ${fullUrl}: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 }
    );
  }

  // Technical checks (non-AI)
  const technicalChecks = {
    hasTitle: !!title,
    titleLength: title.length,
    hasMetaDesc: !!metaDesc,
    descLength: metaDesc.length,
    hasH1: !!h1,
    h1Count: (html.match(/<h1[\s>]/gi) || []).length,
    hasCanonical: /rel="canonical"/i.test(html),
    hasOg: /property="og:title"/i.test(html),
    hasTwitter: /name="twitter:card"/i.test(html),
    hasJsonLd: /application\/ld\+json/i.test(html),
    jsonLdCount: (html.match(/application\/ld\+json/gi) || []).length,
    hasViewport: /name="viewport"/i.test(html),
    hasLang: /lang="/i.test(html),
    wordCount,
    headingCount: headings.length,
    internalLinks: (html.match(/href=["'][^"']*#/gi) || []).length + (html.match(/href=["']\/[^"']*["']/gi) || []).length,
    imgCount: (html.match(/<img/gi) || []).length,
    imgWithoutAlt: (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length,
  };

  // Calculate technical SEO score
  let techScore = 100;
  if (!technicalChecks.hasTitle) techScore -= 25;
  else if (technicalChecks.titleLength > 60) techScore -= 8;
  if (!technicalChecks.hasMetaDesc) techScore -= 20;
  else if (technicalChecks.descLength > 160) techScore -= 6;
  if (technicalChecks.h1Count === 0) techScore -= 15;
  else if (technicalChecks.h1Count > 1) techScore -= 10;
  if (!technicalChecks.hasCanonical) techScore -= 8;
  if (!technicalChecks.hasOg) techScore -= 8;
  if (!technicalChecks.hasJsonLd) techScore -= 10;
  if (!technicalChecks.hasViewport) techScore -= 10;
  if (!technicalChecks.hasLang) techScore -= 5;
  if (technicalChecks.wordCount < 300) techScore -= 8;
  if (technicalChecks.imgWithoutAlt > 0) techScore -= 5;
  techScore = Math.max(0, techScore);

  // Use AI for deep content analysis (SEO + AEO + GEO)
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

    const contentSummary = `
Page: ${targetUrl}
Title: ${title}
Meta Description: ${metaDesc}
H1: ${h1}
Word Count: ${wordCount}
Headings: ${headings.join(" | ")}
First Paragraphs: ${paragraphs.join(" | ").slice(0, 2000)}
Technical Score: ${techScore}/100
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
- Voice: natural language questions, concise answers, local intent`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: "You are a JSON-only SEO analysis API. Return valid JSON, nothing else." },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    // Extract JSON from the response (handle markdown code blocks)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      aiAnalysis = JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.error("[seo-tool] AI analysis error", err);
    // Fall back to technical-only scores if AI fails
  }

  // Build the result
  const result = {
    url: targetUrl,
    keyword: targetKeyword,
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
      summary: `SEO:${result.seoScore} AEO:${result.aeoScore} GEO:${result.geoScore} Voice:${result.voiceScore} — ${targetUrl}`,
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
