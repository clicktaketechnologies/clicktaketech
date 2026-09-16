import type { ServiceContent } from "@/lib/site-data";

// Detailed, keyword-optimised content for each of the 24 ClickTake services.
// Drives the per-service detail page (slug → content). One entry per slug.

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  // ===== Digital Marketing =====
  "ppc-paid-ads": {
    slug: "ppc-paid-ads",
    primaryKeyword: "PPC management services",
    secondaryKeywords: [
      "Google Ads management",
      "Meta Ads management",
      "paid media agency",
      "PPC advertising services",
      "Google Ads agency",
    ],
    shortTermKeywords: [
      "PPC agency for small business UK",
      "Google Ads management Birmingham",
      "affordable PPC services",
      "local paid ads management",
      "B2B paid advertising London",
    ],
    longTermKeywords: [
      "best PPC agency UK",
      "enterprise paid advertising company",
      "top paid media agency",
    ],
    metaTitle: "PPC Management Services | ClickTake",
    metaDescription:
      "PPC management services across Google, Meta, LinkedIn and TikTok — engineered around profitable CPA. Book a free audit today.",
    overview:
      "We run profitable paid media across Google, Meta, LinkedIn and TikTok, built around a CPA target you set — not vanity clicks. Daily budget pacing, creative testing and landing-page CRO are baked in, with full-funnel GA4 and server-side tracking. You keep the ad accounts; we keep the spend working.",
    benefits: [
      {
        title: "CPA-first campaign architecture",
        desc: "We structure accounts around your target cost-per-acquisition from day one — every bid, budget and creative decision is scored against it.",
      },
      {
        title: "Multi-platform expertise",
        desc: "One team running Google Ads, Meta, LinkedIn and TikTok with platform-native best practices, not copy-paste campaigns.",
      },
      {
        title: "Creative testing engine",
        desc: "Weekly creative rotation with hook, format and offer tests so winning ads compound instead of fatiguing.",
      },
      {
        title: "Server-side conversion tracking",
        desc: "GA4, server-side tagging and consent-mode v2 set up so iOS, Safari and cookieless traffic still reports accurately.",
      },
      {
        title: "Landing-page CRO included",
        desc: "Every campaign ships with a tested landing page — not just ads — so conversion rate isn't bottlenecked by your homepage.",
      },
      {
        title: "You own the assets",
        desc: "Ad accounts, audiences, creative and pixels live in your business manager — no lock-in, no hostage data.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Account audit & CPA modelling",
        desc: "We audit your existing accounts, model a realistic CPA from your margins, and map the gap between today's spend and target returns.",
      },
      {
        num: "02",
        title: "Build & tracking setup",
        desc: "We rebuild campaigns with SKAG-free modern structure, install server-side GA4 tagging, and validate conversion data against your CRM.",
      },
      {
        num: "03",
        title: "Creative & landing-page sprints",
        desc: "Weekly creative refreshes and landing-page A/B tests run in parallel, with a clear losing-variant kill rule to keep budgets on winners.",
      },
      {
        num: "04",
        title: "Scale or sunset",
        desc: "At 90 days we review profitable cohorts against your CPA target — scaling winners with incremental budget and pausing what doesn't pay back.",
      },
    ],
    faqs: [
      {
        q: "How much ad spend do I need before you take us on?",
        a: "We work with accounts from £5k/month on Google and £3k/month on Meta. Below that, the data is too thin for our testing cadence to be profitable.",
      },
      {
        q: "Do you charge a percentage of ad spend?",
        a: "No — we charge a fixed monthly retainer so our incentive is your CPA, not your budget. You'll see the full fee before signing.",
      },
      {
        q: "Will you keep using my old campaigns?",
        a: "We audit first, then decide. We keep what's profitable, rebuild what isn't, and never pause a winning campaign just to claim credit for it.",
      },
      {
        q: "Which platforms do you actually run?",
        a: "Google Ads (Search, Performance Max, YouTube), Meta (Facebook + Instagram), LinkedIn Ads, and TikTok Ads. We don't run X, Pinterest or Reddit in-house.",
      },
    ],
  },

  "content-strategy-seo": {
    slug: "content-strategy-seo",
    primaryKeyword: "content strategy services",
    secondaryKeywords: [
      "topical authority SEO",
      "content clusters",
      "editorial calendar services",
      "SEO content marketing",
      "content marketing agency",
    ],
    shortTermKeywords: [
      "content strategy services UK",
      "B2B content marketing Birmingham",
      "topical authority SEO for SaaS",
      "editorial calendar services for startups",
      "SEO content strategy London",
    ],
    longTermKeywords: [
      "best content marketing agency UK",
      "top SEO content strategy company",
      "enterprise content marketing services",
    ],
    metaTitle: "Content Strategy Services | ClickTake",
    metaDescription:
      "Content strategy services that build topical authority: content clusters, editorial calendars and on-page SEO. Book a free content audit.",
    overview:
      "We build topical authority, not blog posts — content clusters mapped to commercial intent and an editorial calendar your team can actually ship. Every brief targets a primary keyword with clear intent, internal links to your money pages, and a measurable SERP position to win.",
    benefits: [
      {
        title: "Topical authority mapping",
        desc: "We map your domain against 3-5 competitor sites and design pillar/cluster structures that close every content gap that matters.",
      },
      {
        title: "Intent-scored briefs",
        desc: "Every brief carries a primary keyword, search intent tag, suggested word count and the exact internal links to place — writers don't guess.",
      },
      {
        title: "12-month editorial calendar",
        desc: "You get a quarter-by-quarter calendar with publishing dates, owners and target SERP positions — no 'just write something about X' briefs.",
      },
      {
        title: "On-page SEO baked in",
        desc: "Briefs include schema, H-tag hierarchy, meta title/description targets and entity coverage so each page is technical-SEO ready on day one.",
      },
      {
        title: "Internal linking blueprint",
        desc: "We hand you a link map showing which existing pages should link to new ones — to pass authority where it converts, not where it's nice to have.",
      },
      {
        title: "Performance reporting",
        desc: "Monthly reports track rankings, organic clicks, assisted conversions and cost-per-ranked-page — not vanity traffic.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Content gap & SERP analysis",
        desc: "We crawl your site and 3 competitor domains, identify every commercially-relevant keyword gap, and score each by intent and difficulty.",
      },
      {
        num: "02",
        title: "Cluster & pillar design",
        desc: "We design pillar pages with supporting cluster articles, mapping internal links so authority flows toward your conversion pages.",
      },
      {
        num: "03",
        title: "Brief & calendar delivery",
        desc: "You receive intent-scored briefs for each article plus a 12-month publishing calendar your writers can execute without further input.",
      },
      {
        num: "04",
        title: "Publish, monitor, refine",
        desc: "As articles ship, we track SERP positions, prune underperformers, and refresh winners so the cluster compounds quarterly.",
      },
    ],
    faqs: [
      {
        q: "Do you write the content or just plan it?",
        a: "We can do either. Our default is briefs + calendar your writers execute, but we have in-house writers for B2B SaaS, ecommerce and professional services if you'd prefer a turnkey service.",
      },
      {
        q: "How long before we see ranking movement?",
        a: "Most clusters show movement within 8-12 weeks of the first articles publishing. Topical authority compounds over 6-12 months — we set expectations per cluster, not per article.",
      },
      {
        q: "Will you work with our existing writers?",
        a: "Yes. Briefs are written to be picked up by any competent writer — including an AI-assisted one with human editing — and we run a quality check on the first 3 articles to calibrate.",
      },
      {
        q: "Can you help with content pruning?",
        a: "Yes. We audit existing pages, flag redirects, consolidations and updates, and give you a prune list ranked by traffic impact so you can free crawl budget for what matters.",
      },
    ],
  },

  "conversion-rate-optimization": {
    slug: "conversion-rate-optimization",
    primaryKeyword: "conversion rate optimization services",
    secondaryKeywords: [
      "CRO agency",
      "A/B testing services",
      "funnel analysis",
      "heatmap analysis",
      "landing page optimization",
    ],
    shortTermKeywords: [
      "CRO services for small business UK",
      "conversion rate optimization Birmingham",
      "A/B testing services for ecommerce",
      "affordable CRO audits",
      "Shopify CRO agency London",
    ],
    longTermKeywords: [
      "best CRO agency UK",
      "top conversion rate optimization company",
      "enterprise CRO services",
    ],
    metaTitle: "Conversion Rate Optimization Services",
    metaDescription:
      "Conversion rate optimization services: A/B testing, heatmaps and funnel analysis that lift CVR 25-60%. Free CRO audit — book today.",
    overview:
      "We diagnose why visitors don't convert and ship tests that move revenue — typically a 25-60% CVR lift within 90 days. Our playbook pairs session replay, funnel analysis and A/B testing on high-traffic pages, so every experiment is measurable. You get a prioritised roadmap, shipped tests and a learnings library.",
    benefits: [
      {
        title: "Quantified conversion lift",
        desc: "Every test ships with a hypothesis, minimum detectable effect and pre-registered success metric — no cherry-picked wins.",
      },
      {
        title: "Funnel & session analysis",
        desc: "We use GA4 funnels, Microsoft Clarity heatmaps and session replays to find the friction, not just the symptoms.",
      },
      {
        title: "Statistical integrity",
        desc: "Tests run to significance with proper sample sizing — we call inconclusive results inconclusive, not 'directional wins'.",
      },
      {
        title: "Test pipeline, not one-offs",
        desc: "You get a 12-week prioritised test pipeline scored by ICE (impact, confidence, ease) — not random 'let's try this' experiments.",
      },
      {
        title: "Experimentation library",
        desc: "Every shipped test is documented with hypothesis, variant, result and learning — so institutional knowledge doesn't walk out the door.",
      },
      {
        title: "No vendor lock-in tools",
        desc: "We work in your existing stack (VWO, Optimizely, GA4 Experiments, Convert) and hand over the experiment code and learnings.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Quantitative funnel audit",
        desc: "We instrument GA4 funnels, review session replays, and quantify drop-off at each step from landing to checkout.",
      },
      {
        num: "02",
        title: "Hypothesis & ICE prioritisation",
        desc: "We draft testable hypotheses, score each by Impact/Confidence/Ease, and sequence the next 12 weeks of experiments.",
      },
      {
        num: "03",
        title: "Design, build & ship tests",
        desc: "Each test is designed, built and QA'd in your experimentation tool, with variant code shipped and verified live before traffic splits.",
      },
      {
        num: "04",
        title: "Readout & learnings library",
        desc: "Each concluded test is documented with the result, statistical confidence, and the next iteration — win, lose or inconclusive.",
      },
    ],
    faqs: [
      {
        q: "What conversion rate lift can we realistically expect?",
        a: "Most clients see 25-60% CVR lift on optimised pages within 90 days. Pages with severe friction or weak messaging can exceed that; genuinely good pages move less.",
      },
      {
        q: "What traffic do we need to run tests?",
        a: "We need roughly 1,000 conversions per month per variant for statistically valid tests. Below that, we'll focus on heuristic audits and high-confidence fixes first.",
      },
      {
        q: "Will you redesign our pages or just test?",
        a: "Both. Tests often need redesigned variants — we design, build and ship those in your stack, then document what worked.",
      },
      {
        q: "Do you handle ecommerce and lead-gen?",
        a: "Yes — Shopify, WooCommerce, headless commerce, SaaS self-serve, and B2B lead-gen funnels. The testing methodology is the same; the metric definitions differ.",
      },
    ],
  },

  "seo-services": {
    slug: "seo-services",
    primaryKeyword: "SEO services",
    secondaryKeywords: [
      "technical SEO audit",
      "on-page SEO",
      "off-page SEO services",
      "local SEO services",
      "SEO agency",
    ],
    shortTermKeywords: [
      "SEO services for small business UK",
      "local SEO services Birmingham",
      "affordable SEO services London",
      "technical SEO audit for SaaS",
      "SEO services for ecommerce UK",
    ],
    longTermKeywords: [
      "best SEO agency UK",
      "top SEO services company",
      "enterprise SEO services",
    ],
    metaTitle: "SEO Services | Technical, On-Page & Local",
    metaDescription:
      "SEO services covering technical, on-page and off-page SEO — built to land you in the top 3 local pack. Free SEO audit, book today.",
    overview:
      "We run technical, on-page and off-page SEO as one system, not three disconnected workstreams. Crawlability, schema, internal links, content and backlinks compound toward defensible rankings. Local businesses get a top-3 Maps pack strategy; SaaS and ecommerce get programmatic SEO.",
    benefits: [
      {
        title: "Technical SEO foundation",
        desc: "Crawl budget, indexation, Core Web Vitals, schema and site architecture audited and fixed before any content work begins.",
      },
      {
        title: "On-page optimisation",
        desc: "Title tags, meta descriptions, H1s, internal anchors and entity coverage — applied across your existing pages, not just new ones.",
      },
      {
        title: "Top-3 local pack strategy",
        desc: "Google Business Profile, citations, review velocity and locality signals — built to land you in the top 3 map results.",
      },
      {
        title: "Programmatic & topical SEO",
        desc: "For SaaS and ecommerce: programmatic landing pages and topical clusters that scale indexed pages from hundreds to thousands.",
      },
      {
        title: "Authority backlinks",
        desc: "Digital PR, guest posts and HARO placements on real, indexed sites — no PBNs, no link farms, no risky disavows later.",
      },
      {
        title: "Transparent monthly reporting",
        desc: "Rankings, organic clicks, conversions and assisted revenue — reported monthly with the actual work done, not jargon.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Technical & competitive audit",
        desc: "We crawl your site, audit competitors, and benchmark current rankings, traffic and Core Web Vitals to set baselines.",
      },
      {
        num: "02",
        title: "Roadmap & quick wins",
        desc: "You receive a 6-month roadmap with technical fixes, content priorities and link targets — plus the quick wins we ship in week one.",
      },
      {
        num: "03",
        title: "Execution sprints",
        desc: "Technical fixes, on-page edits, new content and link outreach run in two-week sprints with a clear owner and acceptance criteria.",
      },
      {
        num: "04",
        title: "Reporting & compounding",
        desc: "Monthly rankings and traffic reports, quarterly strategy reviews, and roadmap re-prioritisation based on what actually moved.",
      },
    ],
    faqs: [
      {
        q: "How soon will we see ranking improvements?",
        a: "Technical fixes show movement in 4-8 weeks. Content and link campaigns compound over 3-6 months. We give you per-keyword estimates, not vague '3-6 months' ranges.",
      },
      {
        q: "Do you guarantee #1 rankings?",
        a: "No — and you should distrust anyone who does. We guarantee the work, the methodology and the reporting; rankings depend on your niche, competition and history.",
      },
      {
        q: "Do you work with new domains or only established sites?",
        a: "Both. For new domains we focus on crawlability, topical authority and early links; for established sites we focus on technical debt, content pruning and authority building.",
      },
      {
        q: "What about link building — is it safe?",
        a: "We only build links on real, indexed sites through digital PR, guest posts and HARO. No PBNs, no link exchanges, no bought links — your domain stays clean.",
      },
    ],
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    primaryKeyword: "social media marketing services",
    secondaryKeywords: [
      "social media management",
      "paid social advertising",
      "influencer marketing services",
      "community management",
      "social media agency",
    ],
    shortTermKeywords: [
      "social media marketing for small business UK",
      "social media management Birmingham",
      "affordable social media agency London",
      "B2B social media marketing services",
      "Instagram marketing for ecommerce UK",
    ],
    longTermKeywords: [
      "best social media agency UK",
      "top social media marketing company",
      "enterprise social media services",
    ],
    metaTitle: "Social Media Marketing Services | ClickTake",
    metaDescription:
      "Social media marketing services: organic content, paid social, community and influencer ops. Free strategy call — book today.",
    overview:
      "We run organic, paid, community and influencer as one engine, not four contractors. Organic builds reach, paid converts it, community turns customers into advocates, and influencer ops scale distribution. Every post has a commercial goal and every channel a defined funnel role.",
    benefits: [
      {
        title: "Channel-role strategy",
        desc: "We assign each platform a defined role (awareness, consideration, conversion or retention) so your feed doesn't try to do everything everywhere.",
      },
      {
        title: "Native content production",
        desc: "Reels, carousels, shorts and TikToks shot and edited in-platform-native formats — not resized landscape videos.",
      },
      {
        title: "Paid social amplification",
        desc: "Top organic posts get amplified with paid spend on Meta, TikTok and LinkedIn — creative testing pays for itself.",
      },
      {
        title: "Community & DM management",
        desc: "We respond to comments and DMs within 4 working hours, escalate issues to your team, and turn complaints into trust signals.",
      },
      {
        title: "Influencer ops",
        desc: "Briefs, contracts, usage rights and reporting for influencer campaigns — from micro (1k-10k) to mid-tier (50k-500k) creators.",
      },
      {
        title: "Revenue-attributed reporting",
        desc: "Monthly reports tie social activity to assisted revenue, not just engagement — using UTM, GA4 and platform-native attribution.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Audit & channel strategy",
        desc: "We audit your current channels, map competitors, and assign each platform a defined commercial role before any content is produced.",
      },
      {
        num: "02",
        title: "Content system build",
        desc: "We design a 30-day content calendar, build templates and briefs, and produce the first batch of native-format posts.",
      },
      {
        num: "03",
        title: "Publish, engage, amplify",
        desc: "Posts publish on schedule, community is managed daily, and the top organic performers are amplified with paid budget.",
      },
      {
        num: "04",
        title: "Optimise & scale",
        desc: "Monthly creative performance review, channel-role adjustment, and creator/influencer pipeline expansion based on what's converting.",
      },
    ],
    faqs: [
      {
        q: "Which platforms do you actually manage?",
        a: "Instagram, TikTok, LinkedIn, X, Facebook, YouTube Shorts and Pinterest. We don't manage Snapchat or Threads in-house, but can advise on them.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "Both. We script, shoot/edit and publish — including UGC-style vertical video. You can supply brand assets and we handle the rest.",
      },
      {
        q: "How many posts per week?",
        a: "Typically 4 organic posts per platform per week plus daily stories/reels — calibrated to your team's capacity to engage. Volume without engagement is wasted.",
      },
      {
        q: "Can you run influencer campaigns too?",
        a: "Yes — sourcing, briefing, contracting, usage rights and reporting. We work with micro and mid-tier creators; we don't manage celebrity-tier campaigns.",
      },
    ],
  },

  "seo-web-design-services": {
    slug: "seo-web-design-services",
    primaryKeyword: "SEO web design services",
    secondaryKeywords: [
      "SEO-friendly websites",
      "PageSpeed optimisation",
      "schema markup",
      "indexable web design",
      "SEO-first web development",
    ],
    shortTermKeywords: [
      "SEO web design services UK",
      "SEO-friendly websites Birmingham",
      "fast-loading websites for small business",
      "schema markup web design London",
      "indexable WordPress design UK",
    ],
    longTermKeywords: [
      "best SEO web design agency UK",
      "top SEO web design company",
      "enterprise SEO-friendly websites",
    ],
    metaTitle: "SEO Web Design Services | ClickTake",
    metaDescription:
      "SEO web design services: PageSpeed 90+, schema, indexability and SEO-first builds. Free technical design audit — book today.",
    overview:
      "We design websites that rank before they look pretty — PageSpeed 90+, full schema, clean crawl paths and zero render-blocking resources. Every page is indexable, every image optimised, every internal link mapped to commercial intent. You get a site that converts search visitors.",
    benefits: [
      {
        title: "PageSpeed 90+ guaranteed",
        desc: "Every site ships with a Lighthouse Performance score of 90+ on mobile — measured against your real production URLs, not a demo.",
      },
      {
        title: "Schema-first architecture",
        desc: "Organisation, Product, Article, FAQ, Breadcrumb and LocalBusiness schema deployed from the template, not bolted on later.",
      },
      {
        title: "Indexability by design",
        desc: "Clean URL structure, XML sitemaps, canonical tags and robots directives baked in — no orphan pages, no accidental noindex.",
      },
      {
        title: "Internal-link blueprint",
        desc: "We map every internal link to a commercial intent so authority flows to your money pages, not your blog tag pages.",
      },
      {
        title: "Mobile-first responsive",
        desc: "Sites designed mobile-first with no CLS and a layout that doesn't shift — Google indexes the mobile version, so do we.",
      },
      {
        title: "Headless-ready CMS",
        desc: "WordPress, Sanity, Payload or Contentful — your editors get a familiar CMS, your site stays fast and SEO-friendly.",
      },
    ],
    process: [
      {
        num: "01",
        title: "SEO & technical audit",
        desc: "We audit your current site's rankings, Core Web Vitals, schema and indexability — then map the redesign against those baselines.",
      },
      {
        num: "02",
        title: "Information architecture",
        desc: "We design URL structure, internal links and content hierarchy around commercial intent — so the site architecture serves SEO.",
      },
      {
        num: "03",
        title: "Design & build",
        desc: "Sites are built with PageSpeed 90+, full schema and clean markup — tested against real Lighthouse runs, not 'it looks fast'.",
      },
      {
        num: "04",
        title: "Migration & monitoring",
        desc: "On launch we redirect old URLs, resubmit sitemaps, and monitor rankings and Core Web Vitals weekly for 30 days.",
      },
    ],
    faqs: [
      {
        q: "Will you redesign our existing site or rebuild it?",
        a: "Depends on your current stack. We can redesign in place if the platform supports SEO targets, or rebuild on Next.js, Astro or WordPress if it doesn't — we'll tell you which in the audit.",
      },
      {
        q: "Do you guarantee a Lighthouse score?",
        a: "Yes — 90+ on mobile Performance for production URLs. If we don't hit it on launch, we keep working until we do, at no extra cost.",
      },
      {
        q: "What about schema — do you set it up?",
        a: "Yes. We deploy schema for Organisation, Product/Service, Article, FAQ, Breadcrumb and LocalBusiness as standard, validated against Google's Rich Results test.",
      },
      {
        q: "Can you handle the site migration without losing rankings?",
        a: "Yes. We map 301 redirects, preserve canonical URLs, pre-submit sitemaps, and monitor rankings daily for 30 days post-launch — and we'll flag any expected risk before we ship.",
      },
    ],
  },

  // ===== Web & Software =====
  "full-stack-web-development": {
    slug: "full-stack-web-development",
    primaryKeyword: "full-stack web development services",
    secondaryKeywords: [
      "Next.js development agency",
      "TypeScript web development",
      "Prisma Postgres development",
      "Playwright E2E testing",
      "web application development",
    ],
    shortTermKeywords: [
      "full-stack web development UK",
      "Next.js development agency London",
      "TypeScript web development Birmingham",
      "web app development for SaaS UK",
      "Postgres Prisma development services",
    ],
    longTermKeywords: [
      "best full-stack development agency UK",
      "top web application development company",
      "enterprise full-stack development services",
    ],
    metaTitle: "Full-Stack Web Development Services",
    metaDescription:
      "Full-stack web development with Next.js 16, TypeScript, Prisma, Postgres and Playwright E2E. Free architecture review — book today.",
    overview:
      "We ship production web apps on Next.js 16, TypeScript, Prisma and Postgres, with Playwright E2E tests guarding every release. Type-safe APIs, server actions, optimistic UI, queued jobs and a real CI/CD pipeline. You get a codebase your team can own, not a black-box handover.",
    benefits: [
      {
        title: "Type-safe end to end",
        desc: "TypeScript from the database (Prisma) through server actions to the UI — runtime errors caught at compile time, not in production.",
      },
      {
        title: "Server components & actions",
        desc: "Next.js 16 server components and server actions used appropriately — not a React SPA with a thin API layer bolted on.",
      },
      {
        title: "Playwright E2E suite",
        desc: "Every critical user journey is covered by an automated Playwright test that runs on every PR — regressions don't reach production.",
      },
      {
        title: "CI/CD pipeline included",
        desc: "GitHub Actions, preview deploys on every PR, automated migrations, and one-command rollbacks — no 'works on my machine' releases.",
      },
      {
        title: "Background jobs & queues",
        desc: "Email, webhooks, PDF generation and heavy compute handled by queue workers (BullMQ or Inngest), not blocking the request cycle.",
      },
      {
        title: "Observable by default",
        desc: "Structured logging, OpenTelemetry traces and Sentry error tracking wired in from day one — not retrofitted after the first outage.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Architecture & schema",
        desc: "We design the data model, API surface, auth boundaries and deployment topology — documented in an architecture decision record.",
      },
      {
        num: "02",
        title: "Build sprints",
        desc: "Two-week sprints ship features against the ADR, with demoable work at the end of each sprint and a staging environment always live.",
      },
      {
        num: "03",
        title: "Test & QA hardening",
        desc: "Playwright E2E, Vitest unit tests, and OWASP-aligned security review run against every release — no manual 'looks fine' sign-off.",
      },
      {
        num: "04",
        title: "Launch & handover",
        desc: "Production launch with runbooks, monitoring dashboards and a 2-week paired handover to your in-house engineers.",
      },
    ],
    faqs: [
      {
        q: "Do you work with our existing engineering team?",
        a: "Yes. Most engagements are mixed — our engineers pair with yours, run code reviews, and document decisions so the team can own the codebase post-launch.",
      },
      {
        q: "Why Next.js 16 specifically?",
        a: "Server components, server actions, partial prerendering and the App Router let us ship type-safe, fast, SEO-friendly apps without bolting a separate backend onto a SPA. It's our default for new web apps.",
      },
      {
        q: "What about deployment — AWS, Vercel, self-hosted?",
        a: "All three. Vercel for fast-moving SaaS, AWS (ECS/Fargate) for cost-sensitive scale, self-hosted for regulated workloads. We'll recommend based on your traffic, compliance and budget.",
      },
      {
        q: "Do you write tests or ship fast?",
        a: "Both. Critical paths get E2E tests in the same sprint they ship — we don't trade velocity for tests because tests are how we keep velocity.",
      },
    ],
  },

  "saas-platform-engineering": {
    slug: "saas-platform-engineering",
    primaryKeyword: "SaaS platform engineering services",
    secondaryKeywords: [
      "multi-tenant SaaS development",
      "Stripe billing integration",
      "RBAC implementation",
      "usage metering",
      "SaaS backend engineering",
    ],
    shortTermKeywords: [
      "SaaS platform engineering UK",
      "multi-tenant SaaS development London",
      "Stripe billing integration services",
      "RBAC implementation for SaaS UK",
      "usage-based billing development",
    ],
    longTermKeywords: [
      "best SaaS development agency UK",
      "top SaaS platform engineering company",
      "enterprise multi-tenant SaaS services",
    ],
    metaTitle: "SaaS Platform Engineering Services",
    metaDescription:
      "SaaS platform engineering: multi-tenant architecture, Stripe billing, RBAC and usage metering. Free architecture review — book today.",
    overview:
      "We engineer SaaS platforms that scale from 10 to 10,000 tenants without rewrites — multi-tenant isolation, Stripe billing with usage metering, RBAC, and a daily-shipping release pipeline. Auth, billing, audit logs and observability are designed in from day one, not bolted on later.",
    benefits: [
      {
        title: "Multi-tenant data isolation",
        desc: "Row-level security or schema-per-tenant — chosen against your compliance needs, not by accident — with no cross-tenant data leaks.",
      },
      {
        title: "Stripe billing & metering",
        desc: "Subscription, usage-based and hybrid billing models wired into Stripe with idempotent webhooks and proper proration.",
      },
      {
        title: "Granular RBAC",
        desc: "Role definitions, resource-level permissions and org-scoped access — built so adding a new role doesn't require a migration.",
      },
      {
        title: "Usage metering pipeline",
        desc: "Event ingestion, aggregation and rollups that feed Stripe — so customers see accurate usage in real time, not a monthly surprise.",
      },
      {
        title: "Admin & audit tooling",
        desc: "Impersonation, feature flags, audit logs and admin actions — every privileged operation recorded and replayable.",
      },
      {
        title: "Ship multiple times a day",
        desc: "Feature flags, trunk-based development and progressive rollouts — releases aren't a quarterly drama, they're a non-event.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Tenancy & billing model",
        desc: "We design the multi-tenant model, billing entities and usage metering pipeline — documented against your pricing page and compliance needs.",
      },
      {
        num: "02",
        title: "Auth, RBAC & admin",
        desc: "We implement auth (NextAuth/Clerk/Auth0), RBAC enforcement, org-scoped queries and admin tooling with full audit logging.",
      },
      {
        num: "03",
        title: "Stripe & metering build",
        desc: "We wire Stripe subscriptions, usage-based pricing, webhook handling and the metering pipeline that feeds it — with reconciliation jobs.",
      },
      {
        num: "04",
        title: "Launch & scale",
        desc: "We ship to production with load testing, observability dashboards, and a runbook for tenant onboarding, billing failures and incident response.",
      },
    ],
    faqs: [
      {
        q: "Do you support usage-based pricing?",
        a: "Yes — we build the event ingestion, aggregation and rollup pipeline that feeds Stripe's Usage Records API. Customers see real-time usage in your UI; Stripe invoices accurately at period end.",
      },
      {
        q: "How do you handle multi-tenancy?",
        a: "Row-level security on Postgres for most SaaS, schema-per-tenant for stricter isolation needs, or separate databases for regulated workloads. We recommend the model in the architecture review and document the tradeoffs.",
      },
      {
        q: "Can you integrate our existing Stripe account?",
        a: "Yes — we'll work with your existing products, prices and customers. If your Stripe setup needs cleanup, we'll flag that as a separate workstream before billing integration.",
      },
      {
        q: "What about SOC 2 / ISO 27001 readiness?",
        a: "We engineer to SOC 2 controls — audit logs, access reviews, change management — but we don't issue the certification. We can introduce a compliance partner for the audit itself.",
      },
    ],
  },

  "auth-identity": {
    slug: "auth-identity",
    primaryKeyword: "authentication & identity services",
    secondaryKeywords: [
      "NextAuth development",
      "OAuth SSO integration",
      "SAML SSO services",
      "passkey implementation",
      "zero-trust session management",
    ],
    shortTermKeywords: [
      "authentication services UK",
      "NextAuth development London",
      "SAML SSO services for B2B SaaS",
      "passkey implementation UK",
      "zero-trust session management services",
    ],
    longTermKeywords: [
      "best identity & auth services UK",
      "top authentication engineering company",
      "enterprise SSO & identity platform",
    ],
    metaTitle: "Authentication & Identity Services",
    metaDescription:
      "Authentication & identity services: NextAuth, OAuth/SAML SSO, passkeys and zero-trust sessions. Free security review — book today.",
    overview:
      "We build authentication that doesn't get your users phished — NextAuth, OAuth/SAML SSO for enterprise, passkeys for passwordless, and zero-trust session management. MFA, device pairing, step-up auth and audit logs are designed in. You get a system your CISO can defend.",
    benefits: [
      {
        title: "NextAuth with adapter strategy",
        desc: "Auth.js v5 with database or JWT sessions — adapter chosen against your scaling needs, not by default.",
      },
      {
        title: "Enterprise SSO (SAML & OIDC)",
        desc: "SAML and OIDC SSO for enterprise customers — the kind that closes a 6-figure deal — with IdP-specific metadata handling.",
      },
      {
        title: "Passkeys & passwordless",
        desc: "WebAuthn passkeys deployed alongside passwords so users can opt in — and we measure how fast adoption actually happens.",
      },
      {
        title: "Zero-trust sessions",
        desc: "Short-lived rotating tokens, device binding and server-side session revocation that survives a stolen refresh token.",
      },
      {
        title: "Step-up & MFA flows",
        desc: "Risk-based step-up auth for sensitive actions (billing, exports, admin) — not a blanket MFA prompt on every login.",
      },
      {
        title: "Audit logs for everything",
        desc: "Every login, MFA challenge, SSO link and admin action logged with user, IP, device and timestamp — exportable for SOC 2.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Threat model & auth matrix",
        desc: "We map your user types, devices, risk levels and required auth factors — documented before any code is written.",
      },
      {
        num: "02",
        title: "Provider & session design",
        desc: "We choose auth providers, session strategy and token lifetimes against your threat model, not against convenience.",
      },
      {
        num: "03",
        title: "Implementation & hardening",
        desc: "We implement auth, MFA, SSO and audit logging, with rate limiting, account lockout and credential-stuffing protections.",
      },
      {
        num: "04",
        title: "Security review & launch",
        desc: "We run an OWASP-aligned review, ship to production behind feature flags, and monitor for anomalies over the first 30 days.",
      },
    ],
    faqs: [
      {
        q: "Should we use Auth.js, Clerk or Auth0?",
        a: "Depends on your team size, SSO needs and budget. Auth.js for full control, Clerk for speed-to-market on B2B SaaS, Auth0 or WorkOS for enterprise SSO-heavy sales. We'll recommend in the audit.",
      },
      {
        q: "Can you add SSO to our existing app?",
        a: "Yes — we add SAML/OIDC SSO alongside existing password auth, scoped to enterprise plans. Existing users keep their passwords; enterprise customers get SSO. No forced migration.",
      },
      {
        q: "Do passkeys actually work for non-technical users?",
        a: "Yes, with caveats. We deploy them alongside passwords, measure adoption, and fall back gracefully. Adoption typically reaches 30-50% within 6 months on consumer apps.",
      },
      {
        q: "How do you handle account takeover protection?",
        a: "Rate limiting, IP-based lockouts, credential-stuffing detection (haveibeenpwned API), and forced password reset on suspicious activity. MFA is the last line of defense, not the first.",
      },
    ],
  },

  "python-backend-apis": {
    slug: "python-backend-apis",
    primaryKeyword: "Python backend & API development",
    secondaryKeywords: [
      "FastAPI development",
      "async Python workers",
      "GraphQL API development",
      "OpenAPI documentation",
      "high-performance Python APIs",
    ],
    shortTermKeywords: [
      "Python backend development UK",
      "FastAPI development services London",
      "GraphQL API development Birmingham",
      "async Python workers services",
      "Python API development for startups UK",
    ],
    longTermKeywords: [
      "best Python development agency UK",
      "top backend API engineering company",
      "enterprise Python API services",
    ],
    metaTitle: "Python Backend & API Development",
    metaDescription:
      "Python backend & API development with FastAPI, async workers, GraphQL and OpenAPI at p99 120ms. Free architecture review — book today.",
    overview:
      "We build Python backends that hold a p99 of 120ms under load — FastAPI for async requests, Celery or RQ workers for background jobs, REST or GraphQL with OpenAPI for clients, and proper connection pooling so the DB isn't the bottleneck. Typed with Pydantic, tested with pytest, observable with OpenTelemetry.",
    benefits: [
      {
        title: "FastAPI async by default",
        desc: "Async request handlers, async DB drivers and async HTTP clients — so a single worker handles thousands of concurrent requests, not dozens.",
      },
      {
        title: "Pydantic type safety",
        desc: "Request and response models validated with Pydantic v2 — runtime errors surface at the schema boundary, not three layers deep.",
      },
      {
        title: "OpenAPI auto-generated",
        desc: "Clients get a typed OpenAPI schema generated from your route definitions — SDKs in TypeScript, Python and Go, with no drift.",
      },
      {
        title: "Async background workers",
        desc: "Celery, RQ or Arq workers for email, webhooks, PDF and heavy compute — separated from the request cycle so p99 stays predictable.",
      },
      {
        title: "GraphQL when you need it",
        desc: "Strawberry or Ariadne GraphQL added when clients genuinely need flexible queries — not as a default that complicates caching.",
      },
      {
        title: "Observable & profileable",
        desc: "OpenTelemetry traces, Pyroscope profiling and structured logging — so when p99 spikes, you find the slow query, not a 'feeling'.",
      },
    ],
    process: [
      {
        num: "01",
        title: "API surface & schema design",
        desc: "We design the resource model, endpoint surface and Pydantic schemas — documented in OpenAPI before the first route ships.",
      },
      {
        num: "02",
        title: "Async architecture",
        desc: "We choose async DB drivers, connection pool sizes, worker backends and queue topology against your expected load profile.",
      },
      {
        num: "03",
        title: "Implementation & testing",
        desc: "Routes ship with pytest unit tests, contract tests against the OpenAPI schema, and load tests proving the p99 target holds.",
      },
      {
        num: "04",
        title: "Observability & launch",
        desc: "OpenTelemetry, Sentry and structured logging wired in before production launch — with dashboards that show p99, error rate and queue depth.",
      },
    ],
    faqs: [
      {
        q: "Why FastAPI over Flask or Django?",
        a: "Async request handling, native Pydantic validation and auto-generated OpenAPI make FastAPI our default for new API services. We still use Django for admin-heavy apps and Flask for small internal tools — we'll recommend based on the workload.",
      },
      {
        q: "Can you hit a real 120ms p99?",
        a: "Yes, on standard infrastructure — with async DB drivers, proper indexes and connection pooling. We measure against production load, not a single localhost request, and we'll show you the trace if we miss it.",
      },
      {
        q: "GraphQL or REST?",
        a: "REST with OpenAPI by default — simpler caching, simpler clients. GraphQL when you have many clients with genuinely different data needs. We don't recommend GraphQL for a single web client.",
      },
      {
        q: "How do you handle background jobs?",
        a: "Celery for complex workflows, RQ for simple ones, Arq for async-native. We design idempotent jobs, retry strategies and dead-letter queues — jobs don't silently fail.",
      },
    ],
  },

  "wordpress-web-design-services": {
    slug: "wordpress-web-design-services",
    primaryKeyword: "WordPress web design services",
    secondaryKeywords: [
      "WooCommerce development",
      "headless WordPress",
      "ACF block development",
      "WordPress SEO",
      "Lighthouse optimisation",
    ],
    shortTermKeywords: [
      "WordPress web design services UK",
      "WooCommerce development Birmingham",
      "headless WordPress London",
      "ACF block development services",
      "WordPress web design for small business UK",
    ],
    longTermKeywords: [
      "best WordPress web design agency UK",
      "top WooCommerce development company",
      "enterprise WordPress development services",
    ],
    metaTitle: "WordPress Web Design Services | ClickTake",
    metaDescription:
      "WordPress web design services: WooCommerce, ACF, headless WP and Lighthouse 90+. Free site audit — book today.",
    overview:
      "We build WordPress sites that don't slow you down — WooCommerce, ACF blocks, headless WP and Lighthouse 90+. Custom themes, custom blocks, an editing experience your team can use. No page-builder bloat and no plugins we'd be embarrassed to defend in a security review.",
    benefits: [
      {
        title: "Custom ACF block system",
        desc: "A bespoke Gutenberg block library built with ACF Blocks or native blocks — your editors compose pages without touching HTML.",
      },
      {
        title: "WooCommerce done right",
        desc: "WooCommerce stores with proper indexing, transactional emails and a checkout that doesn't lose customers to a 5-second spinner.",
      },
      {
        title: "Headless WordPress option",
        desc: "Headless WP on Next.js or Astro when Lighthouse 95+ and edge caching matter more than visual theme editors.",
      },
      {
        title: "Lighthouse 90+ as standard",
        desc: "Every site ships with mobile Lighthouse Performance 90+ — measured on production URLs, not a sandbox.",
      },
      {
        title: "Security-hardened defaults",
        desc: "Minimal plugin footprint, patched core, WAF rules and forced HTTPS — we don't ship sites that get pwned in week one.",
      },
      {
        title: "Editor-friendly CMS",
        desc: "Your marketing team gets a documented editing workflow with preview, scheduling and reusable block patterns — not a page builder they avoid.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Audit & information architecture",
        desc: "We audit your current WP install (plugins, theme, content) and redesign the information architecture around commercial intent.",
      },
      {
        num: "02",
        title: "Block system & theme build",
        desc: "We build a custom ACF or native block library and a hardened theme — no off-the-shelf theme with 50 unused features.",
      },
      {
        num: "03",
        title: "WooCommerce & integrations",
        desc: "Where needed, we wire WooCommerce, payment gateways, shipping plugins and email automation with idempotent order handling.",
      },
      {
        num: "04",
        title: "Migration & hardening",
        desc: "We migrate content, redirect old URLs, run a security review and ship to production with monitoring on Core Web Vitals.",
      },
    ],
    faqs: [
      {
        q: "Do you use page builders like Elementor or Divi?",
        a: "Generally no — page builders hurt Lighthouse scores, complicate maintenance and lock you into their ecosystem. We build custom ACF blocks or native Gutenberg blocks instead. We'll use a builder only if your team is already trained on it.",
      },
      {
        q: "Can you make our existing WordPress site faster?",
        a: "Yes — we run a Lighthouse audit, fix Core Web Vitals, replace heavy plugins, optimise images and add caching. Often a 2-3x speed improvement without a full rebuild.",
      },
      {
        q: "Do you do headless WordPress?",
        a: "Yes — headless WP with Next.js, Astro or Gatsby as the front-end. Recommended when you need Lighthouse 95+, edge caching or a custom UI WP themes can't deliver.",
      },
      {
        q: "Will you maintain the site after launch?",
        a: "Optionally. We offer monthly maintenance — core updates, plugin patching, backups, uptime monitoring and security review — but you own the site and can hand it to any WordPress developer.",
      },
    ],
  },

  "ecommerce-web-design-services": {
    slug: "ecommerce-web-design-services",
    primaryKeyword: "ecommerce web design services",
    secondaryKeywords: [
      "headless Shopify development",
      "Medusa commerce",
      "Stripe ecommerce integration",
      "Shopify Plus development",
      "ecommerce CRO",
    ],
    shortTermKeywords: [
      "ecommerce web design services UK",
      "headless Shopify development London",
      "Medusa commerce Birmingham",
      "Shopify Plus development for small business",
      "ecommerce web design for DTC brands UK",
    ],
    longTermKeywords: [
      "best ecommerce web design agency UK",
      "top Shopify development company",
      "enterprise ecommerce development services",
    ],
    metaTitle: "Ecommerce Web Design Services | ClickTake",
    metaDescription:
      "Ecommerce web design services: headless Shopify/Medusa, Stripe, 1.5s LCP and +25-60% CVR. Free store audit — book today.",
    overview:
      "We build ecommerce stores that load in 1.5s and convert 25-60% better — headless Shopify, Medusa or Next.js storefronts, Stripe checkout, CRO baked in. No theme bloat, no plugin soup, no checkout that loses carts. You get a store that's fast, indexed and measurable.",
    benefits: [
      {
        title: "1.5s LCP storefront",
        desc: "Headless Next.js or Hydrogen storefronts that load in 1.5s on mobile — measured on production URLs, not a staging demo.",
      },
      {
        title: "Headless Shopify / Medusa",
        desc: "We decouple the storefront from the commerce engine so you can iterate on UX without touching cart, inventory or tax logic.",
      },
      {
        title: "Stripe & Shopify Payments",
        desc: "Stripe, Shopify Payments, Apple Pay and Google Pay wired in with idempotent webhooks and proper 3DS handling.",
      },
      {
        title: "+25-60% CVR by design",
        desc: "CRO is part of the build — quick view, sticky ATC, urgency, trust signals and a checkout that doesn't ask for the same field twice.",
      },
      {
        title: "SEO-friendly by default",
        desc: "Schema for Product, Offer and Review; crawlable product URLs; clean pagination; and no JS-required content for SEO bots.",
      },
      {
        title: "Composable commerce",
        desc: "Best-of-breed stack: Shopify or Medusa for commerce, Algolia for search, Sanity for content, Klaviyo for email — no monolith lock-in.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Commerce audit & stack choice",
        desc: "We audit your current store's CVR, PageSpeed and revenue per visit — then recommend Shopify Plus, Medusa or custom build against your volume.",
      },
      {
        num: "02",
        title: "Storefront design & build",
        desc: "We design and build a headless storefront with CRO patterns baked in — quick view, sticky ATC, optimised PDP and PLP templates.",
      },
      {
        num: "03",
        title: "Payments & integrations",
        desc: "We wire Stripe or Shopify Payments, Klaviyo, Algolia/search, shipping and ERP/OMS integrations with proper error handling.",
      },
      {
        num: "04",
        title: "Launch, monitor, optimise",
        desc: "We launch with monitoring on CVR, AOV, PageSpeed and Core Web Vitals — then run a 90-day CRO sprint to lift CVR 25-60%.",
      },
    ],
    faqs: [
      {
        q: "Shopify, Medusa or custom build?",
        a: "Shopify Plus for fastest time-to-market and lowest ops overhead, Medusa for full control and lower fees at scale, custom Next.js storefronts for brands that need a unique UX. We recommend based on your volume, team and roadmap.",
      },
      {
        q: "Will you migrate our existing store?",
        a: "Yes — we migrate products, customers, orders, URLs and reviews from Shopify, WooCommerce, Magento or BigCommerce, with 301 redirects and a launch-day traffic plan to preserve SEO.",
      },
      {
        q: "How fast can you make our store?",
        a: "Headless storefronts typically hit 1.5s LCP on mobile. Heavier existing stores often go from 5-8s to under 2.5s with caching, image optimisation and a CDN.",
      },
      {
        q: "Do you handle Klaviyo, search and ERP integrations?",
        a: "Yes — Klaviyo for email/SMS, Algolia or Searchspring for search, and ERP/OMS integration through idempotent webhooks. We scope integrations explicitly, not as 'we'll figure it out'.",
      },
    ],
  },

  // ===== AI & Automation =====
  "custom-llm-solutions": {
    slug: "custom-llm-solutions",
    primaryKeyword: "custom LLM solutions",
    secondaryKeywords: [
      "RAG development",
      "LLM fine-tuning services",
      "LLM evaluation harness",
      "AI guardrails",
      "LLM cost optimisation",
    ],
    shortTermKeywords: [
      "custom LLM solutions UK",
      "RAG development services London",
      "LLM fine-tuning Birmingham",
      "custom AI chatbot for enterprise UK",
      "private LLM deployment services",
    ],
    longTermKeywords: [
      "best custom LLM development agency UK",
      "top enterprise LLM solutions company",
      "production AI platform services",
    ],
    metaTitle: "Custom LLM Solutions | ClickTake",
    metaDescription:
      "Custom LLM solutions: RAG, fine-tuning, eval harness, guardrails and cost control. Free architecture review — book today.",
    overview:
      "We build LLM systems that ship to production — RAG over your real data, fine-tuning where it earns its keep, eval harnesses for regressions, guardrails for safe outputs, and cost controls. You get measured accuracy, a fallback chain and a runbook for misbehaviour.",
    benefits: [
      {
        title: "RAG over your real data",
        desc: "Retrieval over your actual documents, tickets and knowledge base — not a generic chatbot trained on the open web.",
      },
      {
        title: "Fine-tuning when warranted",
        desc: "We fine-tune only when prompts and RAG can't close the gap — and we measure lift against the baseline before you pay for it.",
      },
      {
        title: "Eval harness included",
        desc: "Every prompt and model change runs against a labelled eval set — so accuracy is measured, not vibes-based.",
      },
      {
        title: "Guardrails for safety",
        desc: "Input and output moderation, PII redaction, jailbreak detection and topic filtering — shipped, not 'we'll add it later'.",
      },
      {
        title: "Cost control by default",
        desc: "Token budgeting, prompt caching, model routing and small-model fallbacks — so your LLM bill scales with revenue, not surprise.",
      },
      {
        title: "Multi-model & fallback",
        desc: "OpenAI, Anthropic, open-source (Llama, Mistral) wired behind one interface — so a model outage doesn't take your product down.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Use case & data audit",
        desc: "We map the use case, available data, accuracy targets and cost ceiling — and decide whether RAG, fine-tuning or both are warranted.",
      },
      {
        num: "02",
        title: "RAG pipeline & eval set",
        desc: "We build the retrieval pipeline (embeddings, vector store, reranker) and a labelled eval set — so every change is measured.",
      },
      {
        num: "03",
        title: "Guardrails & cost controls",
        desc: "We add input/output moderation, PII redaction, token budgeting and model routing — safety and cost designed in, not bolted on.",
      },
      {
        num: "04",
        title: "Production & monitoring",
        desc: "We ship to production with logging, eval-on-deploy and a runbook for the inevitable 'the model is misbehaving' page.",
      },
    ],
    faqs: [
      {
        q: "Should we fine-tune a model or use RAG?",
        a: "Usually RAG first — it's cheaper, faster to iterate and easier to debug. We fine-tune when RAG can't close the accuracy gap, the domain is narrow, or latency/cost demands a smaller model. We'll recommend in the audit.",
      },
      {
        q: "Which LLM do you use?",
        a: "Whichever fits the use case — GPT-4/4o, Claude, Gemini, or open-source Llama/Mistral for on-prem or cost-sensitive workloads. We wire multiple models behind one interface so you can switch without rewriting.",
      },
      {
        q: "How do we know the model is accurate?",
        a: "We build a labelled eval set for your use case and run every change against it. You see accuracy numbers, not 'it feels better'. We also track production metrics — answer rate, escalation rate, human-edit rate.",
      },
      {
        q: "What about data privacy?",
        a: "We can deploy on VPC, on-prem or use API providers with zero-retention contracts. Your data is never used to train third-party models. We'll document the data flow before any code is written.",
      },
    ],
  },

  "ai-chatbots-assistants": {
    slug: "ai-chatbots-assistants",
    primaryKeyword: "AI chatbot development",
    secondaryKeywords: [
      "AI assistant development",
      "tool-using LLM agents",
      "conversational AI",
      "human handoff chatbots",
      "multi-channel AI assistants",
    ],
    shortTermKeywords: [
      "AI chatbot development UK",
      "AI assistant development London",
      "custom chatbot for small business UK",
      "WhatsApp AI chatbot Birmingham",
      "Slack AI assistant services",
    ],
    longTermKeywords: [
      "best AI chatbot development agency UK",
      "top conversational AI company",
      "enterprise AI assistant platform",
    ],
    metaTitle: "AI Chatbot Development | ClickTake",
    metaDescription:
      "AI chatbot development with tool-use, memory, human handoff and multi-channel deploy (site/WhatsApp/Slack). Free scope call — book today.",
    overview:
      "We build chatbots that actually do things — call your APIs, query your database, escalate to a human when stuck, and remember conversations across sessions. Deployed on your site, WhatsApp, Slack or Teams. You get a bot with a defined tool surface, human fallback and full conversation logs.",
    benefits: [
      {
        title: "Tool-using agents",
        desc: "Bots call your real APIs — order lookup, refund initiation, ticket creation — not 'I'll forward this to the team'.",
      },
      {
        title: "Conversation memory",
        desc: "Sessions remember context across channels and visits — a customer on WhatsApp continues on your site without restarting.",
      },
      {
        title: "Human handoff built in",
        desc: "Escalation to a human agent with full conversation context, summary and intent classification — not 'a specialist will be in touch'.",
      },
      {
        title: "Multi-channel deploy",
        desc: "Same bot, multiple channels — your website, WhatsApp Business, Slack, MS Teams and Instagram DMs — from one codebase.",
      },
      {
        title: "Guardrails & moderation",
        desc: "Topic filtering, PII redaction and refusal behaviour for out-of-scope requests — the bot doesn't answer questions it shouldn't.",
      },
      {
        title: "Full conversation logs",
        desc: "Every conversation logged with intent, outcome, tool calls and satisfaction score — for QA, training and compliance.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Use case & tool surface",
        desc: "We map the use case (support, sales, internal), the tools the bot can call, the escalation rules and the success metrics.",
      },
      {
        num: "02",
        title: "Build & eval set",
        desc: "We build the bot with tool-use, memory and guardrails, and an eval set of real conversations to measure accuracy and deflection.",
      },
      {
        num: "03",
        title: "Channel integration",
        desc: "We deploy to your site, WhatsApp, Slack or Teams — with channel-specific UX and a shared conversation backend.",
      },
      {
        num: "04",
        title: "Monitor, train, scale",
        desc: "We monitor deflection, satisfaction and escalation, retrain on edge cases, and expand the tool surface as the bot proves itself.",
      },
    ],
    faqs: [
      {
        q: "Will the chatbot replace our support team?",
        a: "No — it deflects 40-70% of repetitive tickets so your team handles the complex 30-60% that need a human. We design for human handoff, not human replacement.",
      },
      {
        q: "What channels do you deploy to?",
        a: "Website widget, WhatsApp Business, Slack, MS Teams and Instagram DMs. Same bot backend, channel-specific UX. We don't currently deploy to SMS or voice in-house.",
      },
      {
        q: "How do you prevent hallucinations?",
        a: "Tool-use over generation — the bot queries your data instead of inventing answers. Guardrails on input and output. And a labelled eval set that runs on every change to catch regressions.",
      },
      {
        q: "Can the bot call our internal APIs?",
        a: "Yes — we expose a defined tool surface (order lookup, refund, ticket creation, scheduling) with auth scoped to the bot. The bot can't do anything your team hasn't explicitly authorised.",
      },
    ],
  },

  "prompt-engineering": {
    slug: "prompt-engineering",
    primaryKeyword: "prompt engineering services",
    secondaryKeywords: [
      "prompt versioning",
      "LLM evaluation suites",
      "few-shot prompting",
      "prompt optimisation",
      "LLM cost reduction",
    ],
    shortTermKeywords: [
      "prompt engineering services UK",
      "LLM evaluation suites London",
      "few-shot prompting services",
      "prompt optimisation for SaaS UK",
      "affordable prompt engineering Birmingham",
    ],
    longTermKeywords: [
      "best prompt engineering agency UK",
      "top LLM optimisation company",
      "enterprise prompt engineering services",
    ],
    metaTitle: "Prompt Engineering Services | ClickTake",
    metaDescription:
      "Prompt engineering services: versioning, eval suites, few-shot and cost optimisation. Free prompt audit — book today.",
    overview:
      "We engineer prompts like code — versioned, tested, evaluated against labelled sets, and optimised for cost and latency. No vibes, no 'we tried a few and this felt best'. You get a prompt library with version history, an eval suite that catches regressions, and per-prompt cost targets.",
    benefits: [
      {
        title: "Prompt versioning & history",
        desc: "Every prompt is versioned in Git with a changelog — rollback to last-known-good takes seconds, not a Slack archaeology session.",
      },
      {
        title: "Eval suite per use case",
        desc: "Each prompt ships with a labelled eval set — accuracy, format adherence and refusal rate measured on every change.",
      },
      {
        title: "Few-shot where it helps",
        desc: "Few-shot examples added where they measurably lift accuracy — and removed where they add cost without benefit.",
      },
      {
        title: "Cost & latency targets",
        desc: "Token budgeting, prompt caching, and model routing to smaller models for easy cases — so cost scales with revenue, not surprise.",
      },
      {
        title: "A/B testing in production",
        desc: "New prompts roll out as experiments with guardrail metrics — accuracy, latency, cost, satisfaction — not gut feel.",
      },
      {
        title: "Documented prompt library",
        desc: "Your team gets a documented library of prompts with intent, inputs, outputs and tradeoffs — not a single .txt file in someone's laptop.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Use case & baseline",
        desc: "We map the use case, baseline prompt, accuracy targets, cost ceiling and existing examples — documented before any optimisation.",
      },
      {
        num: "02",
        title: "Eval set & versioning",
        desc: "We build a labelled eval set for the use case and version every prompt change in Git with a changelog and eval run.",
      },
      {
        num: "03",
        title: "Optimise & measure",
        desc: "We iterate on prompts — system message, few-shot, structured output, model routing — measured against the eval set and cost targets.",
      },
      {
        num: "04",
        title: "Deploy & monitor",
        desc: "We roll out behind feature flags with guardrail metrics and a rollback plan — and re-eval monthly as models and usage evolve.",
      },
    ],
    faqs: [
      {
        q: "Isn't prompt engineering just 'trying prompts until one works'?",
        a: "No — that's prompt trying. Prompt engineering is versioned, measured and reproducible. We treat prompts like code: tested, peer-reviewed, with rollback and eval.",
      },
      {
        q: "Which models do you write prompts for?",
        a: "All major frontier models — GPT-4/4o, Claude, Gemini — plus open-source Llama and Mistral. Prompt patterns differ; we adapt to the model's strengths.",
      },
      {
        q: "Can you reduce our LLM costs?",
        a: "Usually 30-60% — through prompt compression, model routing (small models for easy cases), prompt caching and few-shot optimisation. We measure cost per successful response, not per token.",
      },
      {
        q: "Do you train our team on prompt engineering?",
        a: "Yes — optional workshop on prompt patterns, eval design and cost control, with a documented prompt library your team can extend. We don't gatekeep.",
      },
    ],
  },

  "computer-vision-nlp": {
    slug: "computer-vision-nlp",
    primaryKeyword: "computer vision & NLP services",
    secondaryKeywords: [
      "OCR development",
      "object detection models",
      "document AI",
      "text classification",
      "edge AI deployment",
    ],
    shortTermKeywords: [
      "computer vision services UK",
      "OCR development London",
      "document AI services Birmingham",
      "object detection for retail UK",
      "edge AI deployment services",
    ],
    longTermKeywords: [
      "best computer vision company UK",
      "top document AI platform",
      "enterprise NLP services",
    ],
    metaTitle: "Computer Vision & NLP Services",
    metaDescription:
      "Computer vision & NLP: OCR, object detection, document AI, classification and edge deployment. Free scope call — book today.",
    overview:
      "We build computer vision and NLP systems that work in production — OCR, object detection, document AI and text classification, trained on your data and deployable on cloud or edge. No 'we trained a model' demos — you get measured accuracy, an eval harness and a deploy plan.",
    benefits: [
      {
        title: "Trained on your data",
        desc: "Models fine-tuned on your real documents, images or text — not a generic ImageNet classifier that breaks on your edge cases.",
      },
      {
        title: "OCR & document AI",
        desc: "Tesseract, PaddleOCR or fine-tuned Donut/LayoutLM for invoices, contracts, forms and ID documents — with structured extraction, not just text.",
      },
      {
        title: "Object detection",
        desc: "YOLO, DETR or fine-tuned models for retail inventory, defect detection, safety monitoring and queue analytics.",
      },
      {
        title: "NLP & classification",
        desc: "Text classification, NER, sentiment and topic modelling for support triage, content moderation and contract analysis.",
      },
      {
        title: "Edge deployment",
        desc: "Models quantised and deployed to edge devices — Jetson, mobile or browser via ONNX/WebGPU — when latency or privacy demands it.",
      },
      {
        title: "Eval harness included",
        desc: "Every model ships with a labelled eval set and CI test — so regressions are caught before deploy, not by a customer.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Use case & data audit",
        desc: "We map the use case, available labelled data, accuracy targets and deployment constraints — and decide build vs fine-tune vs API.",
      },
      {
        num: "02",
        title: "Labelling & training",
        desc: "We label or curate training data, fine-tune a base model, and run it against a held-out eval set with documented metrics.",
      },
      {
        num: "03",
        title: "Pipeline & integration",
        desc: "We build the inference pipeline, integrate with your app or data warehouse, and add monitoring for drift and accuracy.",
      },
      {
        num: "04",
        title: "Edge or cloud deploy",
        desc: "We deploy to cloud (GPU or serverless) or edge (mobile, browser, Jetson) per your latency and privacy constraints — with a retraining cadence.",
      },
    ],
    faqs: [
      {
        q: "Build or fine-tune or use an API?",
        a: "Depends on accuracy targets, data volume, latency and cost. Off-the-shelf APIs (Google Vision, AWS Textract) for common cases, fine-tuned models for domain-specific accuracy, and full custom builds for novel use cases. We recommend in the audit.",
      },
      {
        q: "How much data do we need?",
        a: "For fine-tuning: 100-1,000 labelled examples for narrow tasks, 5,000+ for broader ones. For OCR or document AI, we can often start with pre-trained models and 50-100 annotated examples.",
      },
      {
        q: "Can you deploy on edge devices?",
        a: "Yes — models quantised to ONNX, TensorRT or TFLite for Jetson, Raspberry Pi, mobile or in-browser via WebGPU. Useful for offline, latency-sensitive or privacy-constrained workloads.",
      },
      {
        q: "How do you handle model drift?",
        a: "We monitor prediction confidence and accuracy on a sample of production data, alert on drift, and run a scheduled retraining cadence — quarterly for stable domains, monthly for fast-moving ones.",
      },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    primaryKeyword: "AI automation services",
    secondaryKeywords: [
      "workflow automation",
      "AI agent orchestration",
      "human-in-the-loop automation",
      "integration automation",
      "business process automation",
    ],
    shortTermKeywords: [
      "AI automation services UK",
      "workflow automation London",
      "AI automation for small business UK",
      "business process automation Birmingham",
      "AI automation for operations UK",
    ],
    longTermKeywords: [
      "best AI automation agency UK",
      "top workflow automation company",
      "enterprise AI automation services",
    ],
    metaTitle: "AI Automation Services | ClickTake",
    metaDescription:
      "AI automation services that eliminate 30+ hrs/wk of manual work — workflow orchestration, integrations and monitoring. Free scope call — book today.",
    overview:
      "We automate the workflows eating your team's week — invoicing, onboarding, lead routing, reports and support triage — with AI where it earns its keep and deterministic code elsewhere. Human-in-the-loop, monitoring on every job, kill switch included. Typically 30+ hrs/wk saved in 90 days.",
    benefits: [
      {
        title: "Workflow orchestration",
        desc: "Multi-step workflows across your tools — Slack, HubSpot, Notion, Gmail, Stripe — orchestrated with retries, idempotency and audit logs.",
      },
      {
        title: "AI where it earns its keep",
        desc: "LLMs used for extraction, classification and drafting — not bolted onto every step where a deterministic rule works better.",
      },
      {
        title: "Human-in-the-loop",
        desc: "Judgement-heavy steps routed to a human approver with full context — automation handles the 90%, humans the 10% that matter.",
      },
      {
        title: "Monitoring & alerting",
        desc: "Every job logs duration, success, cost and output — you see a dashboard, not a 'is it still running?' Slack ping.",
      },
      {
        title: "Kill switch & rollback",
        desc: "Every automation has a one-click pause and a manual fallback — when it misbehaves, you stop it in seconds, not in a war room.",
      },
      {
        title: "Real time saved, measured",
        desc: "We track hours saved per workflow, weekly — automation either pays for itself or we pause and rethink. No vanity automations.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Workflow audit & ROI map",
        desc: "We map your team's manual workflows, score each by hours/week and automation feasibility, and prioritise the highest-ROI candidates first.",
      },
      {
        num: "02",
        title: "Build & integrate",
        desc: "We build the orchestration with retries, idempotency and audit logs, integrating your existing tools — no rip-and-replace.",
      },
      {
        num: "03",
        title: "Human-in-loop & guardrails",
        desc: "We add human approval steps where judgement matters, guardrails on AI steps, and a kill switch on every automation.",
      },
      {
        num: "04",
        title: "Monitor, measure, scale",
        desc: "We monitor hours saved, error rate and cost weekly, iterate on edge cases, and expand to the next workflow once ROI is proven.",
      },
    ],
    faqs: [
      {
        q: "How many hours per week can you actually save?",
        a: "Typically 30+ hours/week within 90 days across 3-5 automated workflows. We measure hours saved per workflow weekly — if a workflow isn't paying for itself, we pause and rethink it.",
      },
      {
        q: "Which tools do you integrate?",
        a: "Slack, HubSpot, Salesforce, Notion, Gmail, Stripe, QuickBooks, Airtable, Zapier, Make — plus your internal APIs. If a tool has an API or a webhook, we can integrate it.",
      },
      {
        q: "What about security and access?",
        a: "We use scoped OAuth where possible, store secrets in a vault, and log every privileged action. Automation runs with least-privilege credentials — it can't do anything your team hasn't authorised.",
      },
      {
        q: "Will the automation replace our team?",
        a: "No — it removes the repetitive 30-50% so your team handles the high-value work. We design for human-in-the-loop, not human replacement. Most clients redeploy freed capacity to higher-leverage work.",
      },
    ],
  },

  "ai-agent-development": {
    slug: "ai-agent-development",
    primaryKeyword: "AI agent development services",
    secondaryKeywords: [
      "LangGraph development",
      "multi-agent orchestration",
      "agent memory systems",
      "AI planning agents",
      "agent evaluation",
    ],
    shortTermKeywords: [
      "AI agent development UK",
      "LangGraph development London",
      "multi-agent orchestration Birmingham",
      "AI agent development for SaaS UK",
      "custom AI agent services",
    ],
    longTermKeywords: [
      "best AI agent development agency UK",
      "top multi-agent orchestration company",
      "enterprise AI agent platform",
    ],
    metaTitle: "AI Agent Development Services | ClickTake",
    metaDescription:
      "AI agent development: LangGraph, planning, memory, multi-agent orchestration and production evals. Free scope call — book today.",
    overview:
      "We build production AI agents that plan, use tools, remember context and orchestrate with others — not single-shot LLM calls. LangGraph for stateful orchestration, structured memory, tool-use with retries, and eval suites. You get an agent that completes multi-step tasks reliably.",
    benefits: [
      {
        title: "LangGraph orchestration",
        desc: "Stateful agent graphs with branching, retries and human-in-loop checkpoints — not a single prompt that hopes for the best.",
      },
      {
        title: "Planning & reasoning",
        desc: "Agents decompose goals into steps, choose tools per step, and revise the plan when a step fails — observable reasoning, not a black box.",
      },
      {
        title: "Structured memory",
        desc: "Short-term working memory and long-term vector memory — agents remember context across sessions, not just within one.",
      },
      {
        title: "Multi-agent orchestration",
        desc: "Specialist agents (researcher, coder, reviewer) orchestrated by a planner — each with its own tools, prompts and eval sets.",
      },
      {
        title: "Production evals",
        desc: "Every agent change runs against a labelled task suite — success rate, tool-call accuracy and cost measured on every release.",
      },
      {
        title: "Observability & cost control",
        desc: "Every agent run is traced end-to-end with LangSmith or Langfuse — you see which step cost what, and where the failure was.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Task & tool surface design",
        desc: "We map the task, the tools the agent can call, the success criteria and the failure modes — documented before any code.",
      },
      {
        num: "02",
        title: "Graph, memory & tools",
        desc: "We build the LangGraph state machine, wire tools with retries and validation, and add short-term and long-term memory.",
      },
      {
        num: "03",
        title: "Eval set & guardrails",
        desc: "We build a labelled task eval set, add guardrails (PII, topic, output schema) and run regression tests on every change.",
      },
      {
        num: "04",
        title: "Production & monitoring",
        desc: "We ship with LangSmith/Langfuse tracing, cost monitoring, human-in-loop checkpoints, and a runbook for agent failures.",
      },
    ],
    faqs: [
      {
        q: "LangGraph, AutoGen or CrewAI?",
        a: "LangGraph for stateful, production-grade orchestration with clear control flow. AutoGen or CrewAI for multi-agent experimentation. We default to LangGraph for production because the state machine is auditable.",
      },
      {
        q: "How do you stop the agent going off the rails?",
        a: "Guardrails on input and output, schema-validated tool calls, human-in-loop checkpoints on high-stakes actions, and an eval suite that runs on every change. The agent can't take actions you haven't authorised.",
      },
      {
        q: "Can the agent use our internal tools?",
        a: "Yes — we expose your APIs, databases and SaaS tools as agent tools with scoped auth. The agent only sees tools you've explicitly authorised, with audit logging on every call.",
      },
      {
        q: "How do you measure agent quality?",
        a: "Task success rate, tool-call accuracy, cost per task and human-edit rate — measured against a labelled eval set on every release, and on a sample of production runs.",
      },
    ],
  },

  // ===== Creative & Brand =====
  "graphic-design": {
    slug: "graphic-design",
    primaryKeyword: "graphic design services",
    secondaryKeywords: [
      "brand identity design",
      "logo design services",
      "marketing collateral design",
      "social media creatives",
      "brand guidelines",
    ],
    shortTermKeywords: [
      "graphic design services UK",
      "brand identity design London",
      "logo design services Birmingham",
      "affordable graphic design for small business",
      "social media creatives UK",
    ],
    longTermKeywords: [
      "best graphic design agency UK",
      "top brand identity company",
      "enterprise brand design services",
    ],
    metaTitle: "Graphic Design Services | ClickTake",
    metaDescription:
      "Graphic design services: brand identity, logos, marketing collateral and social creatives. Free brand audit — book today.",
    overview:
      "We design brand identities that hold up across every touchpoint — logos, type, colour, marketing collateral, social creatives and enforceable guidelines. Not a logo on a slide; a system that scales from billboard to favicon. You get formats your team can actually use.",
    benefits: [
      {
        title: "Brand identity system",
        desc: "Logo, type scale, colour palette, iconography and motion principles — designed as a system, not a one-off logo.",
      },
      {
        title: "Logo with variations",
        desc: "Primary, secondary, monochrome, favicon and responsive lockups — your logo works in every context, not just the hero.",
      },
      {
        title: "Marketing collateral",
        desc: "Pitch decks, sales one-pagers, business cards, signage and ad creatives — designed on-brand and ready to print or post.",
      },
      {
        title: "Social media creatives",
        desc: "Static, carousel, story and reel templates your marketing team can adapt weekly without a designer on call.",
      },
      {
        title: "Brand guidelines document",
        desc: "A Figma-published guidelines doc your team can enforce — usage rules, do/don'ts, and downloadable assets.",
      },
      {
        title: "Developer-ready handoff",
        desc: "Design tokens (colours, type, spacing) exported as CSS variables and Tailwind config — your engineers implement, not reverse-engineer.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Discovery & brand strategy",
        desc: "We map your audience, positioning, competitors and brand attributes — a brief that drives every design decision downstream.",
      },
      {
        num: "02",
        title: "Identity exploration",
        desc: "We present 2-3 distinct identity directions with rationale — you choose, we refine. No endless iterations on a single direction.",
      },
      {
        num: "03",
        title: "System & collateral build",
        desc: "We extend the chosen identity into a full system — type, colour, icons, templates, collateral and the guidelines doc.",
      },
      {
        num: "04",
        title: "Handoff & enablement",
        desc: "We hand over design tokens, Figma libraries, templates and the guidelines doc — with a walkthrough so your team can use them.",
      },
    ],
    faqs: [
      {
        q: "How many logo concepts do we get?",
        a: "Two to three distinct directions, each with rationale — not ten variations of the same idea. We'd rather you choose between real options than iterate on one forever.",
      },
      {
        q: "Do you do brand strategy or just design?",
        a: "Both. Design without strategy is decoration. We start with positioning, audience and competitors, then design — but we can also work from your existing strategy if you have one.",
      },
      {
        q: "What files do we get?",
        a: "Source Figma files, exported SVG/PNG/PDF, design tokens as CSS/Tailwind, and a published brand guidelines doc. You own everything.",
      },
      {
        q: "Can you redesign our existing brand?",
        a: "Yes — we audit your current brand, recommend what to keep and what to evolve, and phase the rollout so you don't lose brand equity overnight.",
      },
    ],
  },

  "professional-web-design-services": {
    slug: "professional-web-design-services",
    primaryKeyword: "professional web design services",
    secondaryKeywords: [
      "UX research services",
      "wireframe design",
      "Figma design systems",
      "high-fidelity prototypes",
      "user experience design",
    ],
    shortTermKeywords: [
      "professional web design services UK",
      "UX research services London",
      "Figma design systems Birmingham",
      "wireframe design for SaaS UK",
      "hi-fi prototype services",
    ],
    longTermKeywords: [
      "best professional web design agency UK",
      "top UX design company",
      "enterprise web design services",
    ],
    metaTitle: "Professional Web Design Services | ClickTake",
    metaDescription:
      "Professional web design services: UX research, wireframes, Figma design systems and hi-fi prototypes. Free UX audit — book today.",
    overview:
      "We design websites the way senior product teams do — UX research, user flows, wireframes, Figma design systems and hi-fi prototypes user-tested before code. No design by committee. You get a design system your developers can implement and marketers can extend.",
    benefits: [
      {
        title: "UX research first",
        desc: "User interviews, card sorts and analytics review before any pixel is pushed — design decisions grounded in evidence, not opinion.",
      },
      {
        title: "Information architecture",
        desc: "Sitemaps, user flows and content hierarchy designed around commercial intent — visitors reach the page that converts them.",
      },
      {
        title: "Wireframes before pixels",
        desc: "Low-fidelity wireframes for every key page, reviewed and approved before hi-fi design — so feedback happens on structure, not colour.",
      },
      {
        title: "Figma design system",
        desc: "Component library with tokens, variants and documentation — your developers implement once, your marketers reuse forever.",
      },
      {
        title: "Hi-fi prototypes tested",
        desc: "Clickable prototypes tested with 5-8 real users before development — usability issues caught at 1/100th the cost of fixing post-launch.",
      },
      {
        title: "Dev-ready handoff",
        desc: "Figma file with inspect mode, design tokens and a component library matching the codebase — your engineers build, not guess.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Research & IA",
        desc: "We run user interviews, audit analytics and competitors, and design sitemaps and user flows around commercial intent.",
      },
      {
        num: "02",
        title: "Wireframes & flows",
        desc: "We design low-fidelity wireframes for every key page and flow — reviewed and approved before any visual design starts.",
      },
      {
        num: "03",
        title: "Design system & hi-fi",
        desc: "We build a Figma design system and high-fidelity designs for every page — consistent, accessible and on-brand.",
      },
      {
        num: "04",
        title: "Prototype, test, handoff",
        desc: "We build clickable prototypes, test with real users, refine, and hand off to engineering with full component documentation.",
      },
    ],
    faqs: [
      {
        q: "Do you do design only or design + development?",
        a: "Both. We can hand off a Figma design system to your engineers, or design and build the site end-to-end. We'll scope either way — but we strongly recommend the same team designs and builds to avoid handoff drift.",
      },
      {
        q: "How many rounds of revisions?",
        a: "Two structured rounds on wireframes, two on hi-fi — not 'unlimited revisions', which leads to design by committee. We scope additional rounds if needed.",
      },
      {
        q: "Do you do user testing?",
        a: "Yes — we run moderated tests with 5-8 users on clickable prototypes before development. The cost is a fraction of fixing usability issues post-launch.",
      },
      {
        q: "Will you work with our existing brand?",
        a: "Yes — we work within your existing brand guidelines and extend them into a Figma design system. If your brand needs refreshing, we'll flag that as a separate workstream.",
      },
    ],
  },

  "b2b-video-production": {
    slug: "b2b-video-production",
    primaryKeyword: "B2B video production services",
    secondaryKeywords: [
      "explainer video production",
      "product demo videos",
      "ad creative video",
      "motion graphics",
      "corporate video production",
    ],
    shortTermKeywords: [
      "B2B video production UK",
      "explainer video production London",
      "product demo videos Birmingham",
      "ad creative video for SaaS UK",
      "corporate video production for startups",
    ],
    longTermKeywords: [
      "best B2B video production agency UK",
      "top explainer video company",
      "enterprise video production services",
    ],
    metaTitle: "B2B Video Production Services | ClickTake",
    metaDescription:
      "B2B video production: explainer videos, product demos, ad creatives and motion graphics. Free creative scoping — book today.",
    overview:
      "We produce B2B videos that earn their place in your funnel — explainers that shorten sales cycles, demos that drive trials, ad creatives that lower CPA, motion graphics that simplify. Scripted, shot and edited in every aspect ratio each platform needs. Every video has a job.",
    benefits: [
      {
        title: "Script-first production",
        desc: "Every video starts with a script written against a commercial goal — not a 'cool concept' that wins awards but doesn't convert.",
      },
      {
        title: "Explainer videos",
        desc: "60-90 second explainers that turn 'what does your product actually do?' into a clear answer — your sales team stops repeating themselves.",
      },
      {
        title: "Product demo videos",
        desc: "Feature demos and walkthroughs that drive free trial signups and reduce onboarding support tickets — for site, email and sales decks.",
      },
      {
        title: "Ad creative video",
        desc: "Performance-focused ad creatives for Meta, TikTok, YouTube and LinkedIn — tested across hooks, formats and offers with your paid team.",
      },
      {
        title: "Motion graphics",
        desc: "Animated explainers, data visualisations and logo stings — complex ideas made simple without a film shoot or talent budget.",
      },
      {
        title: "Multi-format delivery",
        desc: "Every video delivered in 16:9, 9:16 and 1:1 with captions baked in — ready for site, YouTube, Reels, TikTok and LinkedIn.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Brief & script",
        desc: "We map the audience, funnel stage, commercial goal and distribution channel — then write a script that hits the goal.",
      },
      {
        num: "02",
        title: "Storyboard & style",
        desc: "We storyboard the script, define visual style and motion language, and align with your brand — before any production starts.",
      },
      {
        num: "03",
        title: "Production & edit",
        desc: "We shoot, animate, edit and sound-design — with two structured review rounds on the rough cut and the final cut.",
      },
      {
        num: "04",
        title: "Delivery & variants",
        desc: "We deliver master files plus platform-specific variants (16:9, 9:16, 1:1) with captions — ready to publish.",
      },
    ],
    faqs: [
      {
        q: "Do you shoot on location or just motion graphics?",
        a: "Both. We have an in-house team for motion graphics and partner videographers for live-action shoots in the UK, US and UAE. We'll recommend based on budget and message.",
      },
      {
        q: "How long should our video be?",
        a: "Depends on the goal — 30-60s for ads, 60-90s for explainers, 2-3 minutes for product demos, 5+ minutes only for onboarding. We'll scope the length against the funnel stage.",
      },
      {
        q: "Do you write the script or do we?",
        a: "We write the first draft from a structured brief with you, then iterate. We don't take your 200-word paragraph and 'make it a video' — scripts drive everything downstream.",
      },
      {
        q: "What about captions and accessibility?",
        a: "Every video ships with burned-in captions and a separate SRT file. WCAG-compliant captions are standard, not an add-on.",
      },
    ],
  },

  "web-design-services": {
    slug: "web-design-services",
    primaryKeyword: "web design services",
    secondaryKeywords: [
      "design systems",
      "UI kits",
      "design handoff",
      "design QA",
      "responsive web design",
    ],
    shortTermKeywords: [
      "web design services UK",
      "design systems London",
      "UI kits Birmingham",
      "design handoff for SaaS UK",
      "affordable web design services UK",
    ],
    longTermKeywords: [
      "best web design agency UK",
      "top web design company",
      "enterprise web design services",
    ],
    metaTitle: "Web Design Services | ClickTake",
    metaDescription:
      "Web design services: end-to-end design systems, UI kits, dev handoff and design QA. Free design audit — book today.",
    overview:
      "We design websites end-to-end — research, IA, wireframes, design systems, UI kits, dev handoff and design QA through to launch. One team owns the design from first sketch to shipped site, so what you saw in Figma is what goes live. No 'the developer didn't quite get it right'.",
    benefits: [
      {
        title: "End-to-end ownership",
        desc: "One team designs, builds and QAs — what you saw in Figma is what goes live, not 'the developer's interpretation'.",
      },
      {
        title: "Design system delivered",
        desc: "Figma component library with tokens, variants and docs — your team extends it, doesn't rebuild from scratch.",
      },
      {
        title: "UI kit included",
        desc: "Core UI kit (buttons, forms, cards, modals) designed, documented and ready for your engineers to implement.",
      },
      {
        title: "Dev-ready handoff",
        desc: "Figma inspect, design tokens, component docs and a walkthrough — engineers build, not reverse-engineer.",
      },
      {
        title: "Design QA in build",
        desc: "We QA the implementation against the design system through to launch — pixel drift caught and fixed, not accepted.",
      },
      {
        title: "Responsive by default",
        desc: "Designs delivered for mobile, tablet and desktop — every breakpoint defined, no 'let's see how it looks on mobile' surprises.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Discovery & IA",
        desc: "We map audience, goals and content, and design the information architecture and sitemap around commercial intent.",
      },
      {
        num: "02",
        title: "Wireframes & system",
        desc: "We design low-fi wireframes, get them approved, then build the Figma design system and UI kit before hi-fi design.",
      },
      {
        num: "03",
        title: "Hi-fi design & prototype",
        desc: "We design every page in high fidelity as a clickable prototype, test with users, and refine against feedback.",
      },
      {
        num: "04",
        title: "Handoff & design QA",
        desc: "We hand off tokens, components and docs — then QA the implementation through to launch so design ships as designed.",
      },
    ],
    faqs: [
      {
        q: "Do you design only or design and build?",
        a: "Both. We can hand off a Figma design system to your engineers, or design and build end-to-end. We strongly recommend the same team designs and builds — design QA in the build is part of the service.",
      },
      {
        q: "What's a design system and do we need one?",
        a: "A reusable library of components, tokens and rules. You need one if you'll add pages or features after launch — it stops each new page from being designed from scratch.",
      },
      {
        q: "How do you handle design QA?",
        a: "We review the implementation against the Figma file at key milestones — pixel drift, spacing, type, states and responsive breakpoints — and flag fixes before launch.",
      },
      {
        q: "Do you work with our existing brand?",
        a: "Yes. We extend your existing brand into a Figma design system and UI kit. If the brand needs work, we'll flag that as a separate workstream before design starts.",
      },
    ],
  },

  "small-business-web-design-services": {
    slug: "small-business-web-design-services",
    primaryKeyword: "small business web design services",
    secondaryKeywords: [
      "small business website design",
      "local SEO ready websites",
      "easy CMS websites",
      "fast launch websites",
      "mobile-first small business sites",
    ],
    shortTermKeywords: [
      "small business web design UK",
      "small business website design Birmingham",
      "affordable small business websites London",
      "fast launch website for startups UK",
      "local SEO ready websites for small business",
    ],
    longTermKeywords: [
      "best small business web design agency UK",
      "top small business website company",
      "affordable small business web design services",
    ],
    metaTitle: "Small Business Web Design Services",
    metaDescription:
      "Small business web design services: fast launch, local-SEO ready, mobile-first and easy CMS. Free scope call — book today.",
    overview:
      "We build small business websites that launch in weeks, rank locally and your team can update without calling us — mobile-first, local-SEO ready, on a CMS your staff can run. No bloated retainers, no locked editing, no per-page invoices. You get a site that earns its keep from day one.",
    benefits: [
      {
        title: "Launch in 2-4 weeks",
        desc: "Most small business sites launch in 2-4 weeks from kickoff — not 3 months of agency ping-pong.",
      },
      {
        title: "Local-SEO ready",
        desc: "Google Business Profile, local schema, citations and review strategy — built to land you in the top 3 local pack.",
      },
      {
        title: "Easy CMS for non-technical staff",
        desc: "WordPress or Webflow with a documented editing workflow — your team updates text, images and pages without calling us.",
      },
      {
        title: "Mobile-first responsive",
        desc: "Designed mobile-first because most of your customers will find you on their phone — no pinching, no broken layouts.",
      },
      {
        title: "Fixed-scope pricing",
        desc: "Fixed-scope, fixed-price packages with clear deliverables — no open-ended hourly invoices, no scope-creep surprises.",
      },
      {
        title: "Built to convert",
        desc: "Clear CTAs, contact forms, click-to-call and map embeds — designed for the actions local customers actually take.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Discovery & scope",
        desc: "We map your audience, services, local market and competitors — and agree a fixed scope, price and launch date in writing.",
      },
      {
        num: "02",
        title: "Design & build",
        desc: "We design and build your site mobile-first, with local SEO, schema and a CMS configured for your team to edit.",
      },
      {
        num: "03",
        title: "Local SEO setup",
        desc: "We set up Google Business Profile, local schema, citations and a review strategy — so you rank for '{service} near me'.",
      },
      {
        num: "04",
        title: "Launch & handover",
        desc: "We launch, train your team on the CMS, hand over credentials and documentation — and we're on call for 30 days post-launch.",
      },
    ],
    faqs: [
      {
        q: "How much does a small business website cost?",
        a: "Most small business sites land between £2,500-£7,500 depending on scope, pages and integrations. We'll quote a fixed price after the discovery call — no open-ended hourly billing.",
      },
      {
        q: "How long until launch?",
        a: "Typically 2-4 weeks from kickoff, depending on how quickly you provide content and feedback. We'll commit to a launch date in writing.",
      },
      {
        q: "Will we be able to update the site ourselves?",
        a: "Yes — we build on WordPress or Webflow with a documented editing workflow, and train your team before handover. You won't need to call us to change a phone number.",
      },
      {
        q: "Do you handle local SEO?",
        a: "Yes — Google Business Profile, local schema, citation building and review strategy are part of every small business site. We want you ranking for '{service} {city}' from launch.",
      },
    ],
  },

  "responsive-web-design-services": {
    slug: "responsive-web-design-services",
    primaryKeyword: "responsive web design services",
    secondaryKeywords: [
      "mobile-first web design",
      "fluid layout design",
      "CLS-free websites",
      "WCAG 2.2 AA accessibility",
      "responsive web development",
    ],
    shortTermKeywords: [
      "responsive web design services UK",
      "mobile-first web design London",
      "WCAG 2.2 AA compliance Birmingham",
      "CLS-free websites UK",
      "accessible web design for small business",
    ],
    longTermKeywords: [
      "best responsive web design agency UK",
      "top accessible web design company",
      "enterprise responsive web services",
    ],
    metaTitle: "Responsive Web Design Services | ClickTake",
    metaDescription:
      "Responsive web design services: mobile-first, fluid layouts, no CLS and WCAG 2.2 AA. Free accessibility audit — book today.",
    overview:
      "We design responsive websites that work on every device — mobile-first layouts, fluid type, zero CLS and WCAG 2.2 AA accessibility built in. Engineered against Core Web Vitals, tested with screen readers. You get a site that ranks, converts and is usable by every customer.",
    benefits: [
      {
        title: "Mobile-first by default",
        desc: "Layouts designed for mobile first, then scaled up — because Google indexes the mobile version and most of your visitors arrive on a phone.",
      },
      {
        title: "Fluid type & spacing",
        desc: "Clamp-based typography and spacing that scales smoothly across viewports — no jarring breakpoints, no fixed-width layouts.",
      },
      {
        title: "Zero CLS",
        desc: "Images, ads and embeds sized up front so layout never shifts — Cumulative Layout Shift of 0 is the target, not a 'nice to have'.",
      },
      {
        title: "WCAG 2.2 AA compliant",
        desc: "Colour contrast, focus states, semantic HTML, ARIA where needed — tested with screen readers and keyboard-only navigation.",
      },
      {
        title: "Tested on real devices",
        desc: "We test on a real device lab (iOS, Android, Windows, macOS) — not just Chrome DevTools emulation.",
      },
      {
        title: "Core Web Vitals tracked",
        desc: "LCP, INP and CLS monitored against real user data through CrUX and your analytics — not just a one-off Lighthouse run.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Audit & breakpoints",
        desc: "We audit your current site's responsive behaviour, Core Web Vitals and accessibility, and define the breakpoint strategy.",
      },
      {
        num: "02",
        title: "Mobile-first design",
        desc: "We design mobile-first, then scale up — fluid type, fluid spacing, and a layout that doesn't break at any viewport.",
      },
      {
        num: "03",
        title: "Accessibility & performance",
        desc: "We implement WCAG 2.2 AA, zero CLS, image sizing and Core Web Vitals targets — tested with screen readers and real devices.",
      },
      {
        num: "04",
        title: "Launch & monitor",
        desc: "We launch and monitor Core Web Vitals via CrUX and your analytics, with a 30-day post-launch accessibility and performance review.",
      },
    ],
    faqs: [
      {
        q: "What's WCAG 2.2 AA and do we need it?",
        a: "WCAG 2.2 AA is the international accessibility standard. You need it if you serve UK, EU or US public-sector customers (legal requirement), or if you care about the 1 in 5 customers with a disability. We build to AA as standard.",
      },
      {
        q: "Will our site actually pass accessibility audits?",
        a: "Yes — we test with axe, WAVE and screen readers (NVDA, VoiceOver), and run keyboard-only navigation tests. We'll fix any AA issues before launch, not after a complaint.",
      },
      {
        q: "Can you fix CLS on our existing site?",
        a: "Usually yes — image sizing, font loading, ad slot reservation and embed handling are the typical culprits. We audit, fix and monitor CLS through CrUX data.",
      },
      {
        q: "Do you test on real devices?",
        a: "Yes — a real device lab (iOS, Android, Windows, macOS) plus BrowserStack for edge cases. Chrome DevTools emulation misses real-world rendering bugs.",
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug];
}
