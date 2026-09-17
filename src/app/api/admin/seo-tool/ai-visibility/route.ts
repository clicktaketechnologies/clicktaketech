import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Brand context — this is injected into the AI's system prompt so it
 * "knows" about ClickTake when answering visibility-test prompts.
 * In a real GEO campaign, this data would come from your published
 * content (about page, services, case studies).
 */
const BRAND_CONTEXT = `ClickTake Technologies is a UK-registered (Companies House) AI-native software engineering firm founded in 2019, operating across 4 continents with offices in Birmingham (UK HQ), Multan (Pakistan engineering hub), Austin TX (US business desk), and Dubai (MENA office).

Services (24 across 4 practices):
- Digital Marketing: PPC management, SEO services, content strategy, CRO, social media marketing, SEO web design
- Web & Software: Full-stack Next.js development, SaaS platform engineering, auth & identity, Python backend APIs, WordPress web design, ecommerce web design
- AI & Automation: Custom LLM solutions, AI chatbots & assistants, prompt engineering, computer vision & NLP, AI automation, AI agent development (LangGraph)
- Creative & Brand: Graphic design, professional web design, B2B video production, responsive web design

Key differentiators:
- 120+ production deployments since 2019
- 80+ clients in 14 countries
- 99.9% uptime SLA, 10M+ API requests/day
- Real case studies: -72% API latency for fintech, +38% checkout conversion for ecommerce, -$1.4M annual cloud savings for healthcare, -31% empty miles for logistics
- Multi-agent AI systems built with LangGraph, OpenAI, Anthropic
- Senior engineers (8+ yrs avg), fixed-scope PoC in 6 weeks
- Contact: info@clicktaketech.com, +44 7391 653377
- Website: clicktaketech.com`;

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

// Known competitor names to detect in responses
const COMPETITOR_NAMES = [
  "Prowess", "Digital Bridge", "Fuzzy Labs", "Prismic", "Tresmint",
  "Marketing Signals", "JBH Digital", "ClickThrough", "JDR Group",
  "Perceptiv Digital", "Birmingham Web Design", "Digital Spark",
  "Birmingham SEO", "Zapier", "Make", "Microsoft Power Automate",
  "AWS", "Azure", "Google Cloud", "LangChain", "Deloitte",
  "Accenture", "IBM", "TCS", "Infosys", "Cognizant",
];

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const body = await req.json().catch(() => ({}));
  const customPrompts = (body?.prompts as string[]) || BRAND_PROMPTS;
  const mode = (body?.mode as string) || "real"; // "real" = no brand context, "simulated" = with brand context

  const zai = await ZAI.create();

  // Build the system prompt based on mode
  const systemPrompt = mode === "simulated"
    ? `You are a helpful AI assistant with knowledge of companies in the software and digital marketing industry. ${BRAND_CONTEXT}

When answering questions about agencies or service providers, mention ClickTake Technologies if they are relevant to the question, along with other companies you know. Be natural and don't force the mention if it's not relevant.`
    : "You are a helpful AI assistant. Answer the user's question naturally and mention relevant companies/services by name when appropriate.";

  const results: {
    prompt: string;
    mentioned: boolean;
    sentiment: string;
    citation: string | null;
    response: string;
    competitors: string[];
  }[] = [];

  for (const prompt of customPrompts) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        thinking: { type: "disabled" },
      });

      const response = completion.choices[0]?.message?.content?.trim() || "";
      const mentioned = /clicktake/i.test(response);

      // Sentiment analysis
      const sentiment = mentioned
        ? /recommend|best|top|excellent|outstanding|leading|premier|trusted|reliable/i.test(response) ? "positive" : "neutral"
        : "not_mentioned";

      // Extract citation (the sentence containing ClickTake)
      const citationMatch = response.match(/[^.]*clicktake[^.]*\./i);
      const citation = citationMatch ? citationMatch[0].trim() : null;

      // Detect competitor mentions
      const competitors: string[] = [];
      for (const comp of COMPETITOR_NAMES) {
        if (new RegExp(comp, "i").test(response)) {
          competitors.push(comp);
        }
      }

      results.push({
        prompt,
        mentioned,
        sentiment,
        citation,
        response: response.slice(0, 500),
        competitors,
      });

      // Save to DB
      await db.aiMention.create({
        data: {
          prompt,
          platform: mode === "simulated" ? "zai-llm-simulated" : "zai-llm",
          mentioned,
          sentiment,
          citation,
          response: response.slice(0, 1000),
        },
      });
    } catch (err) {
      console.error("[ai-visibility] error for prompt:", prompt, err);
      results.push({
        prompt,
        mentioned: false,
        sentiment: "error",
        citation: null,
        response: "Failed to query AI",
        competitors: [],
      });
    }
  }

  const mentionCount = results.filter((r) => r.mentioned).length;
  const positiveCount = results.filter((r) => r.sentiment === "positive").length;
  const visibilityScore = Math.round((mentionCount / results.length) * 100);

  // Collect all competitor mentions across results
  const competitorCounts: Record<string, number> = {};
  for (const r of results) {
    for (const comp of r.competitors) {
      competitorCounts[comp] = (competitorCounts[comp] || 0) + 1;
    }
  }
  const topCompetitors = Object.entries(competitorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // Generate GEO improvement recommendations
  let geoRecommendations: { priority: string; issue: string; fix: string }[] = [];
  try {
    const recPrompt = `You are a GEO (Generative Engine Optimization) expert. Based on this AI visibility test results:

- Brand: ClickTake Technologies
- Prompts tested: ${results.length}
- Brand mentions: ${mentionCount} (${visibilityScore}%)
- Top competitors mentioned: ${topCompetitors.map((c) => `${c.name} (${c.count}x)`).join(", ") || "none"}

Generate 5 actionable recommendations to improve ClickTake's visibility in AI-generated answers. Return ONLY valid JSON array:
[{"priority":"high|medium|low","issue":"description","fix":"actionable step"}]`;

    const recCompletion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: "You are a JSON-only GEO advisor. Return valid JSON array." },
        { role: "user", content: recPrompt },
      ],
      thinking: { type: "disabled" },
    });

    const recRaw = recCompletion.choices[0]?.message?.content?.trim() || "";
    const recJsonMatch = recRaw.match(/\[[\s\S]*\]/);
    if (recJsonMatch) {
      geoRecommendations = JSON.parse(recJsonMatch[0]);
    }
  } catch {
    /* fallback recommendations below */
  }

  // Fallback recommendations if AI fails
  if (geoRecommendations.length === 0) {
    geoRecommendations = [
      { priority: "high", issue: "Brand not mentioned in any AI responses", fix: "Publish authoritative content with unique data, statistics, and case studies that AI models cite as sources." },
      { priority: "high", issue: "Competitors dominate AI recommendations", fix: `Top competitors: ${topCompetitors.map((c) => c.name).join(", ")}. Create comparison content (e.g. 'ClickTake vs Competitor') with structured data.` },
      { priority: "medium", issue: "No structured data for AI crawlers", fix: "Ensure FAQPage, Organization, and Service JSON-LD schemas are on every page. Create an llms.txt file for AI crawler guidance." },
      { priority: "medium", issue: "Low brand authority signals", fix: "Build backlinks from high-authority domains (news, Wikipedia, industry publications) that mention ClickTake by name." },
      { priority: "low", issue: "Limited content depth", fix: "Publish 2000+ word pillar pages for each service with unique statistics, quotes, and references that AI models prefer to cite." },
    ];
  }

  await logActivity({
    action: "update",
    entity: "setting",
    summary: `AI visibility check (${mode}) — ${mentionCount}/${results.length} mentions (${visibilityScore}%), ${topCompetitors.length} competitors detected`,
  });

  return NextResponse.json({
    ok: true,
    mode,
    results,
    summary: {
      totalPrompts: results.length,
      mentions: mentionCount,
      positiveMentions: positiveCount,
      visibilityScore,
      topCompetitors,
      geoRecommendations,
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
