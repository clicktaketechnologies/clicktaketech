import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

/**
 * Content Brief & AI Writing Assistant
 * Generates SEO/AEO/GEO optimized content briefs with headings, FAQs, entities.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const body = await req.json().catch(() => ({}));
  const { title, keyword } = (body || {}) as { title?: string; keyword?: string };

  if (!title || !keyword) {
    return NextResponse.json({ ok: false, error: "title and keyword required" }, { status: 422 });
  }

  const zai = await ZAI.create();

  const prompt = `You are an expert SEO content strategist. Create a detailed content brief for an article titled "${title}" targeting the keyword "${keyword}".

Return ONLY valid JSON (no markdown, no code blocks) with this structure:
{
  "headings": ["H2: heading", "H3: subheading", ...],
  "faqs": [{ "q": "question", "a": "25-45 word optimized answer" }],
  "entities": ["semantic entity 1", "entity 2"],
  "stats": ["statistic with source", "another stat"],
  "wordCount": <recommended 800-2000>,
  "seoScore": <predicted 0-100>,
  "aeoScore": <predicted 0-100>,
  "geoScore": <predicted 0-100>,
  "outline": "brief paragraph describing the content structure and angle"
}

Generate 8-10 headings, 5 FAQs, 10 entities, and 3 statistics. Make the brief actionable for a writer.`;

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: "You are a JSON-only content brief generator. Return valid JSON." },
      { role: "user", content: prompt },
    ],
    thinking: { type: "disabled" },
  });

  const raw = completion.choices[0]?.message?.content?.trim() || "";
  const jsonMatch = raw.match(/\{[\s\S]*\}/);

  let data: {
    headings: string[];
    faqs: { q: string; a: string }[];
    entities: string[];
    stats: string[];
    wordCount: number;
    seoScore: number;
    aeoScore: number;
    geoScore: number;
    outline: string;
  } | null = null;

  try {
    if (jsonMatch) data = JSON.parse(jsonMatch[0]);
  } catch { /* ignore */ }

  // Save to DB
  const brief = await db.contentBrief.create({
    data: {
      title,
      keyword,
      headings: data?.headings ? JSON.stringify(data.headings) : null,
      faqs: data?.faqs ? JSON.stringify(data.faqs) : null,
      entities: data?.entities ? data.entities.join(", ") : null,
      wordCount: data?.wordCount ?? 0,
      seoScore: data?.seoScore ?? 0,
      aeoScore: data?.aeoScore ?? 0,
      geoScore: data?.geoScore ?? 0,
      status: "draft",
    },
  });

  await logActivity({ action: "create", entity: "blog", entityId: brief.id, summary: `Generated content brief for "${title}"` });

  return NextResponse.json({ ok: true, brief, data });
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const briefs = await db.contentBrief.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ ok: true, briefs });
}
