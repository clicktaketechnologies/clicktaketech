import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for markdown content negotiation (Cloudflare-style
 * "Markdown for Agents").
 *
 * When a request to the homepage has `Accept: text/markdown` (or
 * `text/x-markdown`), this middleware returns a clean markdown
 * representation of the site instead of the HTML SPA. This lets
 * AI agents consume the content without scraping HTML.
 *
 * Per https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 *
 * The Link + Content-Signal headers are added via next.config.ts
 * (static, survives edge caching). This middleware only handles
 * the dynamic markdown negotiation.
 */

const HOMEPAGE_MARKDOWN = `# ClickTake Technologies

> We ship software that actually works — and AI that earns its keep.

Connecting in a better way.

## Who we are

ClickTake is a senior engineering team that ships custom software, AI automation, and digital marketing for businesses across the UK, USA, UAE, and Pakistan. We've been AI-native since 2019, with 4 offices and 28 people.

## What we do (24 services across 4 practices)

### Digital Marketing
- **PPC / Paid Ads** — Google, Meta, LinkedIn, TikTok — profitable CPA
- **SEO Services** — Technical, on-page, off-page, local pack
- **Content Strategy & SEO** — Topical authority, content clusters
- **Conversion Rate Optimization** — A/B testing, 25-60% CVR lift
- **Social Media Marketing** — Organic, paid, community, influencer
- **SEO & Web Design** — PageSpeed 90+, schema, indexable builds

### Web & Software
- **Full-Stack Web Development** — Next.js 16, TypeScript, Prisma
- **SaaS Platform Engineering** — Multi-tenant, Stripe billing, RBAC
- **Auth & Identity** — NextAuth, OAuth/SAML, passkeys, zero-trust
- **Python Backend & APIs** — FastAPI, async workers, p99 120ms
- **WordPress Web Design** — WooCommerce, ACF, headless WP, Lighthouse 90+
- **Ecommerce Web Design** — Headless Shopify/Medusa, 1.5s LCP

### AI & Automation
- **Custom LLM Solutions** — RAG, fine-tuning, eval harness, guardrails
- **AI Chatbots & Assistants** — Tool-use, memory, human handoff
- **Prompt Engineering** — Versioning, eval suites, cost optimization
- **AI Automation** — 30+ hrs/wk saved, human-in-the-loop, kill switch
- **AI Agent Development** — LangGraph, planning, memory, multi-agent
- **Computer Vision & NLP** — OCR, object detection, document AI

### Creative & Brand
- **Professional Web Design** — UX research, Figma, hi-fi prototypes
- **Web Design Services** — End-to-end design systems, UI kits
- **Small Business Web Design** — Fast launch, local-SEO, easy CMS
- **Responsive Web Design** — Mobile-first, fluid layouts, WCAG 2.2 AA
- **Graphic Design** — Brand identity, logos, collateral, guidelines
- **B2B Video Production** — Explainers, demos, ad creatives

## Pricing

| Tier | Price | Audience |
|------|-------|----------|
| Starter | £1,500/mo | Small businesses getting started |
| Growth | £4,500/mo | Scaling teams that need more |
| Scale | £9,500/mo | Established companies with complex needs |
| Custom | Let's talk | Enterprise + custom builds |

All pricing is transparent — no hidden fees, no bloated retainers.

## Contact

- **Email:** info@clicktaketech.com
- **Phone:** +44 7391 653377
- **Offices:** Birmingham · London · Austin · Dubai · Multan
- **Website:** https://clicktaketech.com

## Agent discovery

- API Catalog: /.well-known/api-catalog
- OAuth metadata: /.well-known/oauth-authorization-server
- Agent card: /.well-known/agent-card.json
- MCP server card: /.well-known/mcp/server-card.json
- Agent skills: /.well-known/agent-skills/index.json
- Auth discovery: /auth.md
`;

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only handle the homepage.
  if (req.method === "GET" && (path === "/" || path === "")) {
    const accept = req.headers.get("accept") || "";

    // Markdown content negotiation — if the agent requests markdown,
    // return a clean markdown representation instead of the HTML SPA.
    if (accept.includes("text/markdown") || accept.includes("text/x-markdown")) {
      return new NextResponse(HOMEPAGE_MARKDOWN, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "Cache-Control": "public, max-age=300",
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run on the homepage — keep middleware fast for all other routes.
  matcher: ["/"],
};
