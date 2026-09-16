import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

/**
 * Keyword & Prompt Research
 * Uses AI to generate keyword ideas, question mining, and entity extraction.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const body = await req.json().catch(() => ({}));
  const { seed, type } = (body || {}) as { seed?: string; type?: string };
  const seedKeyword = seed || "AI software development agency UK";
  const researchType = type || "all"; // all | keywords | questions | entities

  const zai = await ZAI.create();

  const prompt = `You are an expert SEO keyword researcher. For the seed keyword "${seedKeyword}", generate a comprehensive keyword research report.

Return ONLY valid JSON (no markdown, no code blocks) with this structure:
{
  "keywords": [
    { "keyword": "long-tail keyword", "type": "commercial|informational|navigational|question|voice", "volume": <estimated 100-10000>, "difficulty": <1-100>, "cpc": "£X.XX", "intent": "transactional|research|comparison" }
  ],
  "questions": [
    { "q": "question from PAA/Quora/Reddit style", "source": "google_paa|quora|reddit|chatgpt" }
  ],
  "entities": ["entity1", "entity2", "semantic concept"],
  "voiceQueries": ["natural language voice query 1", "voice query 2"]
}

Generate 15 keywords, 10 questions, 10 entities, and 5 voice queries. Make them realistic and relevant to the UK market for a digital agency.`;

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: "You are a JSON-only SEO keyword research API. Return valid JSON." },
      { role: "user", content: prompt },
    ],
    thinking: { type: "disabled" },
  });

  const raw = completion.choices[0]?.message?.content?.trim() || "";
  const jsonMatch = raw.match(/\{[\s\S]*\}/);

  let data: {
    keywords: { keyword: string; type: string; volume: number; difficulty: number; cpc: string; intent: string }[];
    questions: { q: string; source: string }[];
    entities: string[];
    voiceQueries: string[];
  } | null = null;

  try {
    if (jsonMatch) data = JSON.parse(jsonMatch[0]);
  } catch { /* ignore parse error */ }

  // Save keywords to DB
  if (data?.keywords) {
    for (const kw of data.keywords.slice(0, 15)) {
      await db.keyword.upsert({
        where: { keyword: kw.keyword },
        update: { type: kw.type, volume: kw.volume, difficulty: kw.difficulty, cpc: kw.cpc, intent: kw.intent },
        create: { keyword: kw.keyword, type: kw.type, volume: kw.volume, difficulty: kw.difficulty, cpc: kw.cpc, intent: kw.intent },
      });
    }
  }

  return NextResponse.json({ ok: true, data });
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const keywords = await db.keyword.findMany({ orderBy: { volume: "desc" }, take: 200 });
  return NextResponse.json({ ok: true, keywords });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  await db.keyword.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
