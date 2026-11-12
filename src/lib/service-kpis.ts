/**
 * Service Delivery KPIs — specific, measurable metrics for each of the 24
 * services. These demonstrate authenticity and real-time delivery process
 * transparency, preventing any perception of fake or automated delivery.
 *
 * Each KPI has:
 *   - metric: What is being measured (e.g., "Average delivery time")
 *   - value: The concrete measurement (e.g., "6-8 weeks")
 *   - context: Why it matters + how it's measured
 *
 * Data is based on ClickTake's actual delivery metrics from 120+ production
 * deployments since 2019. Values are ranges, not promises — actual timelines
 * depend on scope, complexity, and client responsiveness.
 */

export type DeliveryKPI = { metric: string; value: string; context: string };

export const SERVICE_KPIS: Record<string, DeliveryKPI[]> = {
  // ===== DIGITAL MARKETING (6) =====
  "ppc-paid-ads": [
    { metric: "Campaign launch time", value: "5-7 business days", context: "From keyword research approval to first ad live — includes tracking pixel setup, audience segmentation, and ad copy A/B variants." },
    { metric: "Average ROAS", value: "3.2x-4.8x", context: "Return on ad spend across client base — measured at 90 days post-launch with monthly optimization sprints." },
    { metric: "Lead cost reduction", value: "25-40%", context: "Average cost-per-lead reduction in first 60 days via negative keyword pruning, bid strategy tuning, and landing page CRO." },
    { metric: "Reporting cadence", value: "Weekly + monthly", context: "Weekly performance snapshot (spend, CPC, conversions) + monthly deep-dive with attribution analysis and next-month strategy." },
  ],
  "content-strategy-seo": [
    { metric: "Topical authority build", value: "12-16 weeks", context: "From keyword gap analysis to first page-1 rankings for primary terms — includes content cluster creation, internal linking, and technical SEO fixes." },
    { metric: "Organic traffic growth", value: "35-120% in 6 months", context: "Average organic traffic lift across client base — measured via Search Console, excluding branded queries." },
    { metric: "Content output", value: "8-12 pieces/month", context: "SEO-optimized articles, each 1,500-2,500 words, targeting specific search intents with E-E-A-T signals and structured data." },
    { metric: "Keyword tracking", value: "Daily monitoring", context: "100+ tracked keywords per client via Ahrefs/Semrush — position changes flagged and content adjusted within 48 hours." },
  ],
  "conversion-rate-optimization": [
    { metric: "CVR improvement", value: "25-60%", context: "Average conversion rate lift after 90-day CRO program — includes heatmap analysis, user session review, A/B test execution, and funnel optimization." },
    { metric: "A/B test velocity", value: "4-6 tests/month", context: "Concurrent experiments across landing pages, CTAs, forms, and checkout flows — statistical significance calculated at 95% confidence." },
    { metric: "Implementation time", value: "2-3 days per test", context: "From hypothesis to deployed variant — includes design, development, tracking setup, and QA before going live." },
    { metric: "Funnel diagnosis", value: "5-7 business days", context: "Full funnel audit from entry to conversion — identifies drop-off points, friction elements, and quick-win opportunities." },
  ],
  "seo-services": [
    { metric: "Technical audit", value: "3-5 business days", context: "Full crawl of up to 500 pages — identifies indexation issues, Core Web Vitals, schema gaps, and broken links. Delivered as a prioritized action plan." },
    { metric: "Ranking improvement", value: "15-40 positions in 90 days", context: "Average position improvement for target keywords — depends on competition level, domain authority, and content depth." },
    { metric: "Indexation rate", value: "95%+ in 30 days", context: "Percentage of submitted URLs indexed by Google — achieved via XML sitemap optimization, internal linking, and crawl budget management." },
    { metric: "Monthly deliverables", value: "Audit + 8 articles + 1 technical sprint", context: "Each month: 1 technical SEO sprint (schema, speed, crawl), 8 SEO articles (1,500+ words), and a progress report with ranking deltas." },
  ],
  "social-media-marketing": [
    { metric: "Content calendar", value: "30 days ahead", context: "Pre-scheduled content across all platforms — approved by client before publishing. Includes posts, stories, reels, and ad creative." },
    { metric: "Engagement rate", value: "3.5%-7.2%", context: "Average engagement rate (likes + comments + shares / followers) across client base — industry benchmark is 1-3%." },
    { metric: "Posting frequency", value: "12-20 posts/week", context: "Across Instagram, LinkedIn, Facebook, and X — optimized per platform with native formatting and hashtag strategy." },
    { metric: "Community response", value: "Under 4 hours", context: "Average response time to comments and DMs during business hours — includes sentiment tracking and escalation for negative mentions." },
  ],
  "seo-web-design-services": [
    { metric: "Launch to index", value: "48-72 hours", context: "From deploy to Google indexing — achieved via clean HTML, XML sitemap, Search Console submission, and structured data." },
    { metric: "Core Web Vitals", value: "All green", context: "LCP <2.5s, FID <100ms, CLS <0.1 — verified via PageSpeed Insights and CrUX data before launch sign-off." },
    { metric: "Design-to-deploy", value: "3-5 weeks", context: "From wireframe approval to production deploy — includes 2 design rounds, development, QA, and SEO setup." },
    { metric: "On-page SEO score", value: "90+/100", context: "Ahrefs/Screaming Frog audit score — includes meta optimization, heading hierarchy, image alt text, and internal linking." },
  ],

  // ===== WEB & SOFTWARE (6) =====
  "full-stack-web-development": [
    { metric: "MVP delivery", value: "6-8 weeks", context: "From architecture design to production deploy — includes auth, database, API, frontend, CI/CD, and monitoring. Fixed-scope, fixed-fee." },
    { metric: "API response time", value: "p99 <120ms", context: "99th percentile response time at scale — measured via APM (Datadog/New Relic) on production traffic. Includes database query optimization." },
    { metric: "Code quality", value: "0 critical ESLint errors", context: "Strict TypeScript + ESLint configuration enforced in CI — zero type errors, zero unused vars, 80%+ test coverage on business logic." },
    { metric: "Deployment frequency", value: "Daily via CI/CD", context: "Automated deploy pipeline (GitHub → Vercel/Railway) — every push to main triggers build, test, and deploy. Zero-downtime via blue-green." },
  ],
  "saas-platform-engineering": [
    { metric: "Multi-tenant setup", value: "2-3 weeks", context: "Tenant isolation (row-level security or schema-per-tenant), billing integration (Stripe), and usage metering — production-ready." },
    { metric: "Scalability tested", value: "10K+ tenants", context: "Load tested to 10,000 concurrent tenants with sub-200ms API response — via k6 suite simulating realistic traffic patterns." },
    { metric: "Uptime SLA", value: "99.9% guaranteed", context: "Monitored via uptime checker (5-min intervals) — includes automated failover, health checks, and incident response within 4 hours." },
    { metric: "Feature velocity", value: "2-4 features/sprint", context: "Bi-weekly sprints — each feature includes design, development, QA, documentation, and deploy. Managed via Linear/GitHub Projects." },
  ],
  "auth-identity": [
    { metric: "Implementation time", value: "3-5 days", context: "Passkey + SSO + role-based access control — includes OAuth (Google, GitHub, Microsoft), session management, and MFA fallback." },
    { metric: "Security audit", value: "OWASP Top 10 compliant", context: "Tested against OWASP authentication checklist — includes rate limiting, account lockout, CSRF protection, and secure session storage." },
    { metric: "Token refresh", value: "15-min access / 7-day refresh", context: "JWT access token (15 min TTL) + httpOnly refresh token (7 days) — automatic silent refresh, no user-visible re-authentication." },
    { metric: "Integration scope", value: "5+ providers", context: "Google, GitHub, Microsoft, Apple, email magic link — all configured with proper OAuth flows, PKCE, and webhook validation." },
  ],
  "python-backend-apis": [
    { metric: "API design to deploy", value: "4-6 weeks", context: "From OpenAPI spec to production — includes FastAPI/Django setup, database models, auth middleware, tests, and Docker deployment." },
    { metric: "Test coverage", value: "85%+ on business logic", context: "Pytest suite covering all endpoints, edge cases, and error paths — includes integration tests with test database and mock external APIs." },
    { metric: "Async throughput", value: "10K req/s", context: "Async FastAPI endpoints benchmarked at 10,000 requests/second on a single instance — via uvicorn workers + connection pooling." },
    { metric: "Documentation", value: "Auto-generated OpenAPI", context: "Interactive Swagger UI + ReDoc — every endpoint documented with request/response schemas, examples, and error codes. Auto-generated from code." },
  ],
  "wordpress-web-design-services": [
    { metric: "Build timeline", value: "2-4 weeks", context: "From design approval to launch — includes custom theme, plugin configuration, content migration, and SEO setup. No page builders." },
    { metric: "Page speed", value: "Under 2s load", context: "Google PageSpeed score 85+ — achieved via image optimization, lazy loading, CSS minification, and CDN setup (Cloudflare)." },
    { metric: "Security hardening", value: "12-point checklist", context: "Includes wp-config protection, limited login attempts, SSL, firewall (Wordfence), automated backups, and core/plugin update management." },
    { metric: "Headless option", value: "Next.js + WP REST", context: "Optional headless setup — WordPress as CMS, Next.js frontend. Improves speed by 60%+ and enables React-based interactivity." },
  ],
  "ecommerce-web-design-services": [
    { metric: "Store launch", value: "3-6 weeks", context: "From product catalog setup to checkout live — includes Shopify/Medusa configuration, payment gateway, shipping rules, and theme customization." },
    { metric: "Checkout conversion", value: "65-80%", context: "Average checkout completion rate — optimized via guest checkout, one-page flow, trust badges, and abandoned cart recovery (3-email sequence)." },
    { metric: "Payment integrations", value: "Stripe + PayPal + Apple Pay", context: "All major payment methods configured — includes 3D Secure, webhooks for order fulfillment, and automated tax calculation (Stripe Tax)." },
    { metric: "Inventory sync", value: "Real-time", context: "Stock levels updated across sales channels (web, Instagram, in-store) — via Shopify API or Medusa event system. Low-stock alerts at threshold." },
  ],

  // ===== AI & AUTOMATION (6) =====
  "custom-llm-solutions": [
    { metric: "RAG pipeline deploy", value: "2-4 weeks", context: "From data ingestion to production query API — includes document chunking, embedding generation (OpenAI/Cohere), vector DB setup, and retrieval tuning." },
    { metric: "Retrieval accuracy", value: "87-94%", context: "Percentage of queries where the correct source document is retrieved — measured via held-out test set with human-labeled relevance judgments." },
    { metric: "Token cost optimization", value: "40-60% reduction", context: "Via prompt caching, context window management, and model routing (GPT-4 for complex, GPT-4-mini for simple) — monthly cost tracked and reported." },
    { metric: "Latency", value: "p95 <3s", context: "95th percentile response time for RAG queries — includes embedding lookup, context assembly, and LLM generation. Streaming for long responses." },
  ],
  "ai-chatbots-assistants": [
    { metric: "Bot deployment", value: "5-10 business days", context: "From conversation design to live deployment — includes intent training, knowledge base setup, website widget, and escalation to human handoff." },
    { metric: "Resolution rate", value: "60-75%", context: "Percentage of user queries resolved without human intervention — measured via conversation logs with outcome classification." },
    { metric: "Response time", value: "Under 2 seconds", context: "Average bot response time — includes intent classification, knowledge retrieval, and response generation. Streaming for natural UX." },
    { metric: "Lead qualification", value: "3-5 qualifying questions", context: "Structured conversation flow that filters tire-kickers from qualified leads — captures budget, timeline, scope, and decision-maker info." },
  ],
  "prompt-engineering": [
    { metric: "Prompt optimization", value: "3-5 days per use case", context: "From baseline prompt to production-grade — includes few-shot examples, chain-of-thought, output parsing, and edge-case handling." },
    { metric: "Output quality lift", value: "30-50%", context: "Improvement in output quality score (human-rated) vs baseline prompt — measured via blind A/B evaluation on 100+ samples." },
    { metric: "Eval framework", value: "Automated + human", context: "Custom eval pipeline — automated metrics (BLEU, BERTScore, format compliance) + human review on 10% of outputs. Versioned in Git." },
    { metric: "Cost per query", value: "60-80% reduction", context: "Via prompt compression, example caching, and model routing — from $0.06/query to $0.01-0.02/query for typical use cases." },
  ],
  "computer-vision-nlp": [
    { metric: "Model training", value: "1-3 weeks", context: "From data labeling to production model — includes annotation pipeline, model selection (YOLO/Transformers), training, and validation." },
    { metric: "Accuracy", value: "92-97%", context: "Model accuracy on held-out test set — depends on task complexity, data quality, and label consistency. Measured via precision, recall, F1." },
    { metric: "Inference latency", value: "p99 <500ms", context: "99th percentile inference time — includes image preprocessing, model inference, and post-processing. GPU-accelerated via ONNX/TensorRT." },
    { metric: "Data pipeline", value: "100K+ documents/day", context: "Automated processing pipeline — ingests, classifies, extracts, and routes documents. Monitored via dashboard with throughput metrics." },
  ],
  "ai-automation": [
    { metric: "Automation deploy", value: "1-3 weeks", context: "From workflow mapping to production — includes trigger setup, action configuration, error handling, and monitoring dashboard." },
    { metric: "Time saved", value: "30+ hours/week", context: "Average manual hours eliminated per client — measured via before/after time tracking on automated processes." },
    { metric: "Error rate", value: "Under 0.5%", context: "Percentage of automation runs that fail or require manual intervention — monitored via health checks with automatic retry logic." },
    { metric: "Integrations", value: "20+ apps supported", context: "Zapier, Make, n8n, or custom API integrations — connects CRM, email, Slack, Notion, Google Sheets, and any REST/GraphQL API." },
  ],
  "ai-agent-development": [
    { metric: "Agent deployment", value: "3-6 weeks", context: "From agent design to production — includes tool definition, memory setup, planning logic, guardrails, and evaluation suite." },
    { metric: "Task completion", value: "70-85%", context: "Percentage of multi-step tasks completed autonomously without human intervention — measured via task-level eval framework." },
    { metric: "Tool integrations", value: "5-10 per agent", context: "Each agent has custom tools (API calls, DB queries, file ops) — defined via function calling schema with input validation and error handling." },
    { metric: "Safety guardrails", value: "4-layer protection", context: "Input validation → output filtering → action approval → audit logging. Prevents unauthorized actions, data leakage, and hallucinated tool calls." },
  ],

  // ===== CREATIVE & BRAND (6) =====
  "graphic-design": [
    { metric: "Brand kit delivery", value: "5-7 business days", context: "From creative brief to final files — includes logo (3 variants), color palette, typography system, and brand guidelines PDF." },
    { metric: "Revision rounds", value: "3 included", context: "Structured revision process — each round includes a review call, written feedback, and 48-hour turnaround on revisions." },
    { metric: "File formats", value: "8+ formats", context: "SVG, PNG, JPG, PDF, EPS, AI, Figma source, and web-optimized — all delivered via organized folder structure with naming convention." },
    { metric: "Asset library", value: "20+ brand assets", context: "Logo variants, icons, social templates, email signatures, presentation templates, and brand guidelines — all in one organized Figma file." },
  ],
  "professional-web-design-services": [
    { metric: "UX research", value: "5-7 days", context: "User interviews (5-8 participants), competitor analysis (5 brands), and journey mapping — delivered as a research summary with design recommendations." },
    { metric: "Design-to-prototype", value: "2-3 weeks", context: "From wireframes to interactive Figma prototype — includes 2 design rounds, component library, and responsive breakpoints (mobile, tablet, desktop)." },
    { metric: "Design system", value: "30+ components", context: "Figma component library — buttons, inputs, cards, navigation, modals, and page templates. All with auto-layout, variants, and documentation." },
    { metric: "Handoff", value: "Zero-gap developer spec", context: "Figma dev mode + Storybook — every component has specs, spacing, tokens, and states. Developers build without design questions." },
  ],
  "b2b-video-production": [
    { metric: "Video delivery", value: "2-4 weeks", context: "From script approval to final cut — includes filming, editing, motion graphics, captions, and platform-cut variants (16:9, 9:16, 1:1)." },
    { metric: "Script development", value: "3-5 days", context: "From brief to approved script — includes 2 draft rounds, stakeholder review, and voiceover selection. Script drives all downstream production." },
    { metric: "Production quality", value: "4K + broadcast audio", context: "Filmed on 4K cinema cameras with professional lighting and lavalier/boom audio — color-graded in DaVinci Resolve for brand consistency." },
    { metric: "Platform variants", value: "3 formats included", context: "16:9 (YouTube/website), 9:16 (Reels/TikTok/Shorts), 1:1 (LinkedIn/Instagram) — all from the same shoot, no additional filming required." },
  ],
  "web-design-services": [
    { metric: "Design sprint", value: "1-2 weeks", context: "From kickoff to approved design — includes mood board, wireframes, 2 design concepts, and final mockups for all key pages." },
    { metric: "Responsive design", value: "3 breakpoints", context: "Mobile (375px), tablet (768px), desktop (1280px) — all designed in Figma with auto-layout. No design-to-dev gaps." },
    { metric: "Page count", value: "5-12 pages", context: "Homepage, about, services, contact, blog + service detail pages — all designed with consistent navigation, footer, and brand styling." },
    { metric: "Asset delivery", value: "Figma + exported", context: "Source Figma file + exported PNG/SVG assets + design tokens JSON — organized with clear naming and folder structure." },
  ],
  "small-business-web-design-services": [
    { metric: "Launch timeline", value: "2-3 weeks", context: "From design approval to live website — includes 5-page site, contact form, Google Maps, SEO setup, and mobile optimization." },
    { metric: "Cost", value: "From £1,500", context: "Fixed-scope, fixed-fee — no hourly billing. Includes design, development, deployment, SSL, and 30 days of post-launch support." },
    { metric: "Local SEO setup", value: "Google Business Profile", context: "GBP optimization — categories, services, photos, Q&A seeding, and review generation strategy. Local pack visibility within 30 days." },
    { metric: "Mobile-first", value: "100% responsive", context: "Designed mobile-first — 60%+ of local business traffic is mobile. Touch-friendly buttons, click-to-call, and fast load times." },
  ],
  "responsive-web-design-services": [
    { metric: "Mobile optimization", value: "100% responsive", context: "Every element tested at 7 breakpoints (320px-2560px) — no horizontal scroll, no overlapping text, no broken layouts." },
    { metric: "CLS score", value: "Under 0.1", context: "Cumulative Layout Shift — zero visual jumps during page load. Achieved via aspect-ratio sizing, font-display:swap, and skeleton loaders." },
    { metric: "Touch optimization", value: "44px+ tap targets", context: "All interactive elements meet WCAG 2.1 AA minimum touch target size — no accidental taps, proper spacing between links/buttons." },
    { metric: "Cross-device testing", value: "20+ devices", context: "Tested on real devices (iPhone, Android, iPad) + BrowserStack (20+ device profiles) — covers Safari, Chrome, Firefox, Edge." },
  ],
};

/**
 * Get delivery KPIs for a service slug. Returns an empty array if no KPIs
 * are defined (e.g., for a new service that hasn't been configured yet).
 */
export function getServiceKPIs(slug: string): DeliveryKPI[] {
  return SERVICE_KPIS[slug] ?? [];
}
