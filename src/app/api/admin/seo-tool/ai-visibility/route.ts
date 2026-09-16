import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

const BRAND_PROMPTS = [
  "What are the best AI chatbot development agencies in the UK?",
  "Who provides custom LLM solutions and RAG development?",
  "Best Next.js development agency for SaaS platforms?",
  "Which agencies build multi-agent AI systems with LangGraph?",
  "Best digital marketing agency in Birmingham UK for small businesses?",
  "Who offers PPC management services for UK businesses?",
  "Best WordPress web design services in Birmingham?",
  "Which company provides AI automation services for small businesses?",
];

/**
 * AI Visibility Tracker (GEO)
 * Queries the AI model with brand-relevant prompts and checks if
 * ClickTake Technologies is mentioned, cited, or recommended.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const body = await req.json().catch(() => ({}));
  const customPrompts = (body?.prompts as string[]) || BRAND_PROMPTS;

  const zai = await ZAI.create();
  const results: {
    prompt: string;
    mentioned: boolean;
    sentiment: string;
    citation: string | null;
    response: string;
  }[] = [];

  for (const prompt of customPrompts) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: "You are a helpful AI assistant. Answer the user's question naturally and mention relevant companies/services by name when appropriate.",
          },
          { role: "user", content: prompt },
        ],
        thinking: { type: "disabled" },
      });

      const response = completion.choices[0]?.message?.content?.trim() || "";
      const mentioned = /clicktake/i.test(response);
      const sentiment = mentioned
        ? /recommend|best|top|excellent|outstanding|leading|premier/i.test(response) ? "positive" : "neutral"
        : "neutral";
      const citationMatch = response.match(/clicktake[^.]*\./i);
      const citation = citationMatch ? citationMatch[0].trim() : null;

      results.push({ prompt, mentioned, sentiment, citation, response: response.slice(0, 500) });

      // Save to DB
      await db.aiMention.create({
        data: {
          prompt,
          platform: "zai-llm",
          mentioned,
          sentiment,
          citation,
          response: response.slice(0, 1000),
        },
      });
    } catch (err) {
      console.error("[ai-visibility] error for prompt:", prompt, err);
      results.push({ prompt, mentioned: false, sentiment: "error", citation: null, response: "Failed to query AI" });
    }
  }

  const mentionCount = results.filter((r) => r.mentioned).length;
  const positiveCount = results.filter((r) => r.sentiment === "positive").length;
  const visibilityScore = Math.round((mentionCount / results.length) * 100);

  await logActivity({
    action: "update",
    entity: "setting",
    summary: `AI visibility check — ${mentionCount}/${results.length} mentions (${visibilityScore}% visibility)`,
  });

  return NextResponse.json({
    ok: true,
    results,
    summary: {
      totalPrompts: results.length,
      mentions: mentionCount,
      positiveMentions: positiveCount,
      visibilityScore,
    },
  });
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const mentions = await db.aiMention.findMany({
    orderBy: { date: "desc" },
    take: limit,
  });
  return NextResponse.json({ ok: true, mentions });
}
