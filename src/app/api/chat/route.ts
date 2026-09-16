import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { SERVICE_CATEGORIES, OFFICES, PRICING_TIERS } from "@/lib/site-data";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the ClickTake Technologies AI assistant — a friendly, knowledgeable concierge embedded on the ClickTake website. You help visitors understand ClickTake's services, figure out which service or solution fits their needs, answer questions about pricing, process, team, locations, and how to start a project.

ABOUT CLICKTAKE TECHNOLOGIES:
- AI-native software engineering & digital agency, founded 2019, UK-registered Ltd Co (Companies House).
- 4 offices: Birmingham (UK HQ), Multan (Pakistan engineering hub), Austin TX (US business desk), Dubai (UAE MENA office). Serves 13 cities across UK, USA, UAE, Pakistan. 18-hour workday coverage.
- 120+ production deployments shipped, 80+ clients in 14 countries, 99.9% uptime SLA, 10M+ API requests/day, p99 120ms.
- Contact: info@clicktaketech.com · UK/WhatsApp +44 7391 653377 · Pakistan +92 306 9753003.
- Free 30-minute consultation, then a fixed-scope, fixed-fee PoC shipped within 6 weeks. No long-term contract required. NDAs signed before discovery. Code + keys handed over on launch (no vendor lock-in).

SERVICES — 24 services across 4 practice areas:
${SERVICE_CATEGORIES.map(
  (cat) =>
    `${cat.label}:\n` +
    cat.services.map((s) => `- ${s.title}: ${s.desc}`).join("\n")
).join("\n\n")}

SOLUTIONS (audience types): Startups (≈90 days to live), Local Businesses (top 3 local pack), E-commerce Brands (headless, 1.5s LCP, +25-60% CVR), Repair Shops (-40% ticket time), UK Businesses (GDPR/UK Ltd Co), Agencies (white-label, +5 engineers, +40-60% margin).

PRICING (starting points, every project is scoped in a free 30-min call):
${PRICING_TIERS.map(
  (t) => `- ${t.name}: ${t.price} (${t.cadence}) — ${t.tagline}`
).join("\n")}

OFFICES: ${OFFICES.map((o) => `${o.city}, ${o.country} (${o.role})`).join("; ")}.

HOW ENGAGEMENTS WORK: 4 steps — Discover (30-min architecture review, scope fixed-price PoC) → Architect (senior engineers design schema/API/infra/observability) → Build (2-week sprints, weekly demos, CI/CD from day one, Playwright E2E) → Deploy (production launch + 30-day hypercare, then hand over keys).

YOUR JOB:
- Answer visitor questions about ClickTake's services, pricing, process, team, locations, and how to start.
- Recommend the most relevant service or solution based on what the visitor describes.
- Be concise, specific, and honest. Use short paragraphs or bullet points. Never invent metrics, prices, or guarantees not stated above.
- If a visitor wants to start a project or get a quote, guide them to the Contact page (3-step form) or to email info@clicktaketech.com / WhatsApp +44 7391 653377.
- If you don't know something, say so and point them to info@clicktaketech.com.
- Keep replies under ~180 words unless the visitor asks for detail.
- Do NOT discuss competitors by name or badmouth other agencies. Stay positive and ClickTake-focused.`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { messages?: ChatMessage[] }
      | null;

    const messages = Array.isArray(body?.messages) ? body!.messages : [];
    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No messages provided." },
        { status: 400 }
      );
    }

    // Basic validation + cap history to last 12 turns to control token cost.
    const cleanMessages = messages
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        ...cleanMessages,
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          ok: true,
          reply:
            "I couldn't generate a response just now — please try again, or email info@clicktaketech.com and a senior engineer will reply within 4 business hours.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "The assistant hit an error. Please try again, or reach us at info@clicktaketech.com.",
      },
      { status: 500 }
    );
  }
}
