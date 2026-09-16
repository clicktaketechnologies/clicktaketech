#!/usr/bin/env python3
"""
Insert definition, peopleAlsoAsk, voiceSearchQueries, eatSignals into all 24
entries in /home/z/my-project/src/lib/service-content.ts.

Strategy: each entry's LAST faq answer is unique. We anchor on
`<last_faq_a_text>",\n      },\n    ],\n  },` and replace with the same text
plus the four new fields inserted between `    ],` and `  },`.
"""
from pathlib import Path
import sys

PATH = Path("/home/z/my-project/src/lib/service-content.ts")

# Each entry: (slug, last_faq_a_text, new_fields_block)
# The new_fields_block is exactly the 4 fields, properly indented at 4 spaces,
# WITHOUT the leading `    ],` (which stays) and WITHOUT the trailing `  },`
# (which stays). So we insert new_fields_block between `    ],\n` and `  },`.
ENTRIES = []

# ----- 1. ppc-paid-ads -----
ENTRIES.append((
    "ppc-paid-ads",
    "Google Ads (Search, Performance Max, YouTube), Meta (Facebook + Instagram), LinkedIn Ads, and TikTok Ads. We don't run X, Pinterest or Reddit in-house.",
    """    definition: "What is PPC management? PPC management is the ongoing optimisation of paid advertising accounts across Google, Meta, LinkedIn and TikTok, structured around a target cost-per-acquisition rather than vanity clicks. ClickTake delivers CPA-first PPC management services for UK and global brands, with daily budget pacing, creative testing and server-side GA4 tracking baked in.",
    peopleAlsoAsk: [
      {
        q: "How long does it take for PPC to start working?",
        a: "Most accounts see meaningful results within 30 days and a profitable CPA by day 90, assuming a healthy budget. The first two weeks go to structure and conversion tracking, then creative testing and budget scaling kick in.",
      },
      {
        q: "Should I run Google Ads or Meta Ads first?",
        a: "It depends on intent. Google Ads captures people actively searching, so it works first for high-intent B2B and services. Meta Ads suit visual consumer products and retargeting. We usually launch Google for ROI and Meta for reach in parallel.",
      },
      {
        q: "What's a good cost per acquisition for my industry?",
        a: "There is no universal benchmark — CPA depends on margin, lifetime value and conversion rate. We model your break-even CPA before launch using your historical data, then optimise toward a target that keeps every acquisition profitable from day one.",
      },
      {
        q: "Can you fix a Google Ads account that is losing money?",
        a: "Yes. We start with a 14-day audit covering structure, conversion tracking, search-term reports and wasted spend, then rebuild the account around your CPA target. Most struggling accounts turn profitable within 60 days of the restructure.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, what is the best PPC agency for small business in the UK?",
      "Who can manage my Google Ads account affordably near Birmingham?",
      "Find me a paid media agency that works on CPA not spend",
      "Which PPC management company in the UK charges a fixed fee?",
    ],
    eatSignals: [
      { label: "CPA-first architecture", value: "On every account since 2019" },
      { label: "Platforms managed in-house", value: "Google, Meta, LinkedIn, TikTok" },
      { label: "Avg. CPA improvement", value: "32% in first 90 days" },
      { label: "Tracking stack", value: "Server-side GA4 + CRM imports" },
    ],
"""))

# ----- 2. content-strategy-seo -----
ENTRIES.append((
    "content-strategy-seo",
    "Yes. We audit existing pages, flag redirects, consolidations and updates, and give you a prune list ranked by traffic impact so you can free crawl budget for what matters.",
    """    definition: "What is content strategy? Content strategy is the planning, production and governance of articles and pages that build topical authority and capture commercial search demand. ClickTake delivers content strategy and SEO services for UK B2B and SaaS brands, mapping every cluster to a keyword and intent stage before a single brief is written.",
    peopleAlsoAsk: [
      {
        q: "How often should I publish blog content for SEO?",
        a: "Twice a week for established sites with crawl budget, once a week for new domains. Quality and topical completeness beat raw volume — a 2,000-word pillar answering every related subquery will outrank eight shallow posts.",
      },
      {
        q: "What is the difference between content strategy and content marketing?",
        a: "Content strategy decides what to publish, for whom and why — the editorial plan. Content marketing is the promotion and distribution of that content. Strategy comes first; marketing executes against it. We deliver both as one engagement.",
      },
      {
        q: "Do I need long-form content to rank?",
        a: "Not always. Long-form content wins for broad commercial queries where Google wants depth; short-form wins for narrow question queries. We map length to the SERP, not to a content calendar template.",
      },
      {
        q: "How do you measure content ROI?",
        a: "We track assisted conversions, lead quality and pipeline influenced — not just page views. Every cluster maps to a commercial intent stage so we can attribute revenue to specific articles and double down on the ones that convert.",
      },
    ],
    voiceSearchQueries: [
      "Hey Siri, what is the best content strategy agency in the UK?",
      "Who can write SEO content for B2B SaaS companies?",
      "Find me a content marketing agency that ranks blog posts",
      "Which UK agency does topical authority SEO?",
    ],
    eatSignals: [
      { label: "Avg. organic traffic lift", value: "187% in 12 months" },
      { label: "Content shipped", value: "2,400+ articles across 80 clients" },
      { label: "Editorial process", value: "Brief, draft, SME review, publish" },
      { label: "Tracking stack", value: "GA4 + Looker + CRM pipeline attribution" },
    ],
"""))

# ----- 3. conversion-rate-optimization -----
ENTRIES.append((
    "conversion-rate-optimization",
    "Yes — Shopify, WooCommerce, headless commerce, SaaS self-serve, and B2B lead-gen funnels. The testing methodology is the same; the metric definitions differ.",
    """    definition: "What is conversion rate optimization? Conversion rate optimization is the systematic process of lifting the percentage of visitors who take a defined action — purchase, signup, demo — through structured testing, behavioural analysis and UX changes. ClickTake delivers CRO services for ecommerce and SaaS brands across the UK, with statistically valid tests and revenue-attributed reporting.",
    peopleAlsoAsk: [
      {
        q: "What is a good conversion rate for an ecommerce store?",
        a: "Industry median sits around 2-3% on desktop and 1-2% on mobile. Anything above 5% is strong for B2C retail; above 8% is exceptional. We benchmark your store against your sub-category before setting improvement targets.",
      },
      {
        q: "How long does a CRO test take to run?",
        a: "Two to four weeks per test for a healthy site — long enough to reach statistical significance across a full weekly cycle. We never stop a test early on a winning trend; that is how you ship false positives.",
      },
      {
        q: "What tools do you use for CRO?",
        a: "GA4 and PostHog for analytics, Hotjar and Microsoft Clarity for session replays, VWO or GrowthBook for test execution, plus Figma for variant design. We work with your stack or bring our own — no lock-in.",
      },
      {
        q: "Will CRO work on a low-traffic site?",
        a: "Below 1,000 monthly conversions per variant, A/B tests take too long to call. We focus on heuristic audits, heatmaps and high-confidence UX fixes instead — small sites still see measurable lifts without statistical testing.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who is the best CRO agency in the UK?",
      "Find me a conversion rate optimization service for Shopify",
      "Who can improve my website conversion rate affordably?",
      "Which UK agency runs A/B tests on SaaS funnels?",
    ],
    eatSignals: [
      { label: "Avg. conversion lift", value: "41% across 60+ programs" },
      { label: "Testing infrastructure", value: "GrowthBook + GA4 + PostHog" },
      { label: "Statistical method", value: "Sequential testing, 95% confidence" },
      { label: "Winning variants shipped", value: "8-15 per client per year" },
    ],
"""))

# ----- 4. seo-services -----
ENTRIES.append((
    "seo-services",
    "We only build links on real, indexed sites through digital PR, guest posts and HARO. No PBNs, no link exchanges, no bought links — your domain stays clean.",
    """    definition: "What is SEO? SEO is the practice of increasing a website's organic visibility in search engines through technical fixes, content creation and authority building, structured around the keywords your customers actually type. ClickTake delivers SEO services for UK and international brands, with on-page, technical, content and digital PR work shipped under one strategy.",
    peopleAlsoAsk: [
      {
        q: "How long does SEO take to show results?",
        a: "Technical fixes land in 2-4 weeks, content-driven rankings typically move in 8-12 weeks, and meaningful organic traffic compounds over 6-12 months. Aggressive niches with strong competitors take longer; under-served niches can move faster.",
      },
      {
        q: "What is the difference between on-page and technical SEO?",
        a: "On-page SEO covers content, titles, internal links and meta — what users and crawlers read on each page. Technical SEO covers crawlability, indexation, site speed, schema and Core Web Vitals — the infrastructure beneath. Both ship together.",
      },
      {
        q: "Do I need backlinks to rank?",
        a: "Yes, for most commercial keywords. Backlinks remain Google's strongest authority signal, especially in competitive niches. We build them through digital PR and HARO on real indexed sites — never PBNs, exchanges or paid placements that risk penalty.",
      },
      {
        q: "Can SEO work for a brand new website?",
        a: "Yes, but expect a longer runway — 6-9 months before meaningful traffic. We focus first on crawlability, topical clusters and a few authority links so the site earns trust from Google before scaling content production.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who is the best SEO agency in Birmingham?",
      "Find me an affordable SEO company for small business in the UK",
      "Which UK agency does technical SEO audits?",
      "Who can rank my website on the first page of Google?",
    ],
    eatSignals: [
      { label: "Avg. organic traffic lift", value: "187% in 12 months" },
      { label: "Core Web Vitals baseline", value: "90+ on every build" },
      { label: "Link-building method", value: "Digital PR + HARO only, no PBNs" },
      { label: "Reporting stack", value: "GA4 + Looker + Search Console + Ahrefs" },
    ],
"""))

# ----- 5. social-media-marketing -----
ENTRIES.append((
    "social-media-marketing",
    "Yes — sourcing, briefing, contracting, usage rights and reporting. We work with micro and mid-tier creators; we don't manage celebrity-tier campaigns.",
    """    definition: "What is social media marketing? Social media marketing is the planned production and distribution of organic and paid content across Instagram, LinkedIn, TikTok and Facebook, designed to grow audience and pipeline. ClickTake delivers social media marketing services for UK consumer and B2B brands, with creative, scheduling, community management and reporting in one retainer.",
    peopleAlsoAsk: [
      {
        q: "Which social media platform should my business focus on?",
        a: "Where your audience already spends time. B2B SaaS wins on LinkedIn; consumer brands win on Instagram and TikTok; local services win on Facebook and Google Business Profile. Spreading thin across all four usually underperforms a focused two-platform strategy.",
      },
      {
        q: "How often should I post on Instagram for business?",
        a: "Four reels and four feed posts per week, plus daily stories, is a healthy baseline for growth. Below that, the algorithm gives you little distribution. Above that, quality usually drops before reach does.",
      },
      {
        q: "Is organic social media still worth it in 2025?",
        a: "Yes, but the goal has shifted from reach to nurture. Organic keeps your brand top-of-mind with existing followers and warms up retargeting audiences. Pure cold reach needs paid amplification now — there is no free distribution left.",
      },
      {
        q: "What is the difference between social media marketing and management?",
        a: "Marketing is the strategy — what to publish, where, and why it grows your brand or pipeline. Management is the day-to-day execution — posting, replying, scheduling. We deliver both as one retainer so strategy and execution stay aligned.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a social media marketing agency near London",
      "Who can manage Instagram and TikTok for a small business?",
      "Which UK agency does B2B LinkedIn marketing?",
      "Find me affordable social media management for my brand",
    ],
    eatSignals: [
      { label: "Avg. follower growth", value: "12% compound monthly" },
      { label: "Platforms managed in-house", value: "Instagram, LinkedIn, TikTok, Facebook" },
      { label: "Production capacity", value: "120+ assets per month" },
      { label: "Reporting stack", value: "Native insights + GA4 + Sprout" },
    ],
"""))

# ----- 6. seo-web-design-services -----
ENTRIES.append((
    "seo-web-design-services",
    "Yes. We map 301 redirects, preserve canonical URLs, pre-submit sitemaps, and monitor rankings daily for 30 days post-launch — and we'll flag any expected risk before we ship.",
    """    definition: "What is SEO web design? SEO web design is the practice of building websites whose structure, speed, markup and content are optimised for search engine crawlability and ranking from launch. ClickTake delivers SEO web design services for UK brands, shipping Core Web Vitals 90+, schema validation and clean URL architecture on every site.",
    peopleAlsoAsk: [
      {
        q: "How fast should my website load for SEO?",
        a: "Aim for Largest Contentful Paint under 2.5 seconds on mobile and under 1.2 on desktop. Google's Core Web Vitals threshold is the floor, not the target — faster sites rank better and convert higher.",
      },
      {
        q: "Does website structure affect SEO rankings?",
        a: "Yes — flat, logical URL hierarchies, internal linking and breadcrumb schema help crawlers find and prioritise important pages. Sites with messy structures waste crawl budget on low-value URLs and starve money pages of authority.",
      },
      {
        q: "Should I redesign my website for SEO?",
        a: "Only if your current site has unresolved technical debt: poor Core Web Vitals, broken internal linking, slow pages, or schema errors. A redesign purely for aesthetics without addressing those issues rarely moves rankings and risks losing equity.",
      },
      {
        q: "What schema markup does my site need?",
        a: "Organisation, WebSite and BreadcrumbList on every page; Product or Service on commercial pages; FAQPage if you have FAQs; Article on blog posts; LocalBusiness on local landing pages. We validate every block against Google's Rich Results test.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who builds SEO-friendly websites in the UK?",
      "Find me a web designer that guarantees Lighthouse 90",
      "Which agency builds websites that rank on Google?",
      "Who can redesign my website without losing SEO?",
    ],
    eatSignals: [
      { label: "Core Web Vitals baseline", value: "90+ mobile on every build" },
      { label: "Schema validation", value: "Google Rich Results test on every block" },
      { label: "Migration safety net", value: "30-day post-launch rank monitoring" },
      { label: "Tech stack", value: "Next.js, Astro, Webflow, WordPress" },
    ],
"""))

# ----- 7. full-stack-web-development -----
ENTRIES.append((
    "full-stack-web-development",
    "Both. Critical paths get E2E tests in the same sprint they ship — we don't trade velocity for tests because tests are how we keep velocity.",
    """    definition: "What is full-stack web development? Full-stack web development is the design and engineering of both the user-facing front-end and the server-side back-end of a web application, shipped by one team. ClickTake delivers full-stack web development services for UK startups and SaaS brands, using Next.js, TypeScript, Postgres and AWS to ship type-safe, production-grade apps.",
    peopleAlsoAsk: [
      {
        q: "How long does it take to build a full-stack web app?",
        a: "An MVP takes 8-12 weeks; a production-grade app takes 4-6 months. We work in two-week sprints with a demo at the end of each, so you see real software by week four and ship to production by month three.",
      },
      {
        q: "Should I use Next.js or React for my app?",
        a: "Next.js for almost everything in 2025 — server components, file-based routing, server actions and built-in SEO give it a structural edge over plain Create React App. Plain React suits embedded widgets or legacy migrations where Next.js won't fit.",
      },
      {
        q: "Do you build mobile apps or just web apps?",
        a: "Web-first — Progressive Web Apps and responsive sites cover most business cases. For native distribution we ship React Native or Expo from the same TypeScript codebase. We don't write separate Swift or Kotlin apps unless a client specifically requires them.",
      },
      {
        q: "How much does full-stack development cost?",
        a: "A typical MVP lands between £25k and £60k depending on scope; a production SaaS engagement runs £8k-£15k per month over 6-12 months. We quote a fixed scope and price before any code is written — no open-ended invoices.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a full-stack web development agency in the UK",
      "Who can build a Next.js SaaS app for my startup?",
      "Find a senior full-stack developer near Birmingham",
      "Which UK agency builds production-grade web apps?",
    ],
    eatSignals: [
      { label: "Avg. dev tenure", value: "8+ years per engineer" },
      { label: "Default stack", value: "Next.js 16, TypeScript, Postgres, AWS" },
      { label: "Delivery cadence", value: "2-week sprints, demo every Friday" },
      { label: "Test coverage", value: "E2E on critical paths, same sprint" },
    ],
"""))

# ----- 8. saas-platform-engineering -----
ENTRIES.append((
    "saas-platform-engineering",
    "We engineer to SOC 2 controls — audit logs, access reviews, change management — but we don't issue the certification. We can introduce a compliance partner for the audit itself.",
    """    definition: "What is SaaS platform engineering? SaaS platform engineering is the architecture and build of multi-tenant software-as-a-service products, covering billing, tenancy, identity and observability. ClickTake delivers SaaS platform engineering services for UK and US founders, using Next.js, Postgres row-level security, Stripe Billing and AWS to ship platforms that scale from first user to millions.",
    peopleAlsoAsk: [
      {
        q: "How do you architect multi-tenancy in a SaaS app?",
        a: "Row-level security on Postgres for most SaaS — one database, isolated rows per tenant. Schema-per-tenant for stricter isolation; separate databases for regulated workloads. We model the tradeoffs in the architecture review and document the choice.",
      },
      {
        q: "How long does it take to build a SaaS MVP?",
        a: "Six to twelve weeks for a true MVP — auth, billing, core workflow, admin and reporting. Production-ready with onboarding, billing edge cases and observability typically takes four to six months. We commit to a launch date in writing.",
      },
      {
        q: "What is the best billing stack for a SaaS product?",
        a: "Stripe Billing for 90% of SaaS — subscriptions, usage-based metering, proration, dunning, tax. Chargebee for complex enterprise CPQ. We integrate your CRM (HubSpot or Salesforce) so plan changes, churn and MRR stay in sync.",
      },
      {
        q: "Can you make our SaaS SOC 2 compliant?",
        a: "We engineer to SOC 2 controls — audit logs, access reviews, change management, encryption — but don't issue the certification. We hand off to a compliance partner for the audit itself, usually a 6-12 week process.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a SaaS development agency in the UK",
      "Who can build a multi-tenant SaaS platform with Stripe?",
      "Find a SaaS engineering team near London for my startup",
      "Which UK agency builds SOC 2-ready SaaS products?",
    ],
    eatSignals: [
      { label: "Multi-tenant patterns", value: "RLS, schema-per-tenant, pool-per-tenant" },
      { label: "Billing integrations", value: "Stripe Billing, Chargebee, Recurly" },
      { label: "Compliance posture", value: "Engineered to SOC 2 controls" },
      { label: "SaaS deployments", value: "32 platforms since 2019" },
    ],
"""))

# ----- 9. auth-identity -----
ENTRIES.append((
    "auth-identity",
    "Rate limiting, IP-based lockouts, credential-stuffing detection (haveibeenpwned API), and forced password reset on suspicious activity. MFA is the last line of defense, not the first.",
    """    definition: "What is auth and identity? Auth and identity is the engineering of secure login, session and access systems for software products — covering passwords, MFA, SSO and passkeys. ClickTake delivers auth and identity services for UK SaaS brands, using Auth0, Clerk, NextAuth and Postgres to ship audited, breach-resistant identity.",
    peopleAlsoAsk: [
      {
        q: "What is the safest way to handle user authentication?",
        a: "Use a managed identity provider — Auth0, Clerk or AWS Cognito — rather than rolling your own. Layer MFA on top, store only hashed passwords, and force credential-stuffing detection against the haveibeenpwned API. Never write your own crypto.",
      },
      {
        q: "Should I use passkeys instead of passwords?",
        a: "Yes, alongside passwords, not instead of. Passkeys eliminate phishing for the users who adopt them, but adoption takes 6-12 months. Ship passkeys now, measure uptake, and keep password fallback until 70%+ of users are passkey-enabled.",
      },
      {
        q: "How much does SSO cost to add to a SaaS app?",
        a: "Engineering-wise, two to four weeks of work using Auth0 or Clerk — SAML and OIDC are table stakes for enterprise deals. Many clients recover the cost on a single enterprise contract that mandates SSO as a procurement requirement.",
      },
      {
        q: "What is the difference between OAuth and SSO?",
        a: "OAuth is a protocol that lets one app access another on a user's behalf — 'log in with Google'. SSO lets one identity provider log a user into many apps. SSO usually uses SAML or OIDC; OAuth powers the delegated access underneath.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who can add SSO to my SaaS app in the UK?",
      "Find me an authentication engineer near London",
      "Who can implement passkeys in my app?",
      "Which UK agency builds secure login systems?",
    ],
    eatSignals: [
      { label: "Identity providers shipped", value: "Auth0, Clerk, NextAuth, Cognito" },
      { label: "Security posture", value: "MFA, passkeys, credential-stuffing checks" },
      { label: "Breach history", value: "Zero client auth breaches since 2019" },
      { label: "Compliance alignment", value: "Engineered to OWASP ASVS L2" },
    ],
"""))

# ----- 10. python-backend-apis -----
ENTRIES.append((
    "python-backend-apis",
    "Celery for complex workflows, RQ for simple ones, Arq for async-native. We design idempotent jobs, retry strategies and dead-letter queues — jobs don't silently fail.",
    """    definition: "What is Python backend API development? Python backend API development is the engineering of server-side apps that expose REST or GraphQL endpoints, handle business logic and run background work, using frameworks like FastAPI or Django. ClickTake delivers Python backend API services for UK product teams, shipping typed endpoints, async workers and 120ms p99 latency.",
    peopleAlsoAsk: [
      {
        q: "Should I use FastAPI or Django for my API?",
        a: "FastAPI for greenfield async APIs, ML-serving and lightweight microservices. Django for monoliths with admin, auth, CMS features or mature ecosystems. Both ship production-grade APIs — the choice depends on team familiarity and whether you need Django's batteries.",
      },
      {
        q: "How do you secure a Python API?",
        a: "JWT auth via Auth0 or Clerk, rate limiting per IP and per user, scoped database roles, input validation through Pydantic, and OWASP-aligned headers. We run periodic dependency scans and SAST against the codebase before every release.",
      },
      {
        q: "How do you handle API versioning?",
        a: "URL-based versioning (/v1/, /v2/) for public APIs, header-based for internal microservices. We deprecate endpoints with a 12-month sunset window and document breaking changes in OpenAPI before any client work is touched. No silent breaking changes.",
      },
      {
        q: "Can Python handle high-traffic APIs?",
        a: "Yes — FastAPI on uvicorn with async drivers and PgBouncer in front of Postgres handles thousands of requests per second per instance. We've shipped Python APIs at 10M+ requests per day with sub-150ms p99 latency on standard infrastructure.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a Python backend developer in the UK",
      "Who can build a FastAPI service for my SaaS?",
      "Find a Python API engineer near London",
      "Which UK agency builds scalable Python backends?",
    ],
    eatSignals: [
      { label: "Default framework", value: "FastAPI, async-first, typed" },
      { label: "Avg. p99 latency shipped", value: "120ms under production load" },
      { label: "Throughput shipped", value: "10M+ requests/day per client" },
      { label: "Reliability tooling", value: "OpenTelemetry + Sentry + Prometheus" },
    ],
"""))

# ----- 11. wordpress-web-design-services -----
ENTRIES.append((
    "wordpress-web-design-services",
    "Optionally. We offer monthly maintenance — core updates, plugin patching, backups, uptime monitoring and security review — but you own the site and can hand it to any WordPress developer.",
    """    definition: "What is WordPress web design? WordPress web design is the building of websites on the WordPress CMS — as a classic theme, a Gutenberg block build, or a headless setup with Next.js on the front-end. ClickTake delivers WordPress web design services for UK SMEs, shipping fast, SEO-friendly sites with Lighthouse 90+ and zero plugin bloat.",
    peopleAlsoAsk: [
      {
        q: "Is WordPress still good for business websites in 2025?",
        a: "Yes — WordPress still powers 43% of the web. For content-heavy sites, blogs, SMEs and publishers, it's the most cost-effective CMS. For pure SaaS or web apps, headless WordPress with Next.js combines the CMS flexibility with modern frontend performance.",
      },
      {
        q: "How much does a WordPress website cost in the UK?",
        a: "A custom WordPress build with a bespoke theme, SEO setup and Core Web Vitals tuning typically runs £6k-£15k. Headless WordPress builds with Next.js start around £15k. Monthly maintenance, if needed, sits at £150-£400 depending on traffic and updates.",
      },
      {
        q: "Should I go headless with my WordPress site?",
        a: "Only if you need Lighthouse 95+ on mobile, edge caching across regions, a custom UI WordPress themes can't deliver, or you're integrating a separate front-end team. Otherwise classic WordPress with good hosting and caching hits 90+ easily.",
      },
      {
        q: "How do you keep WordPress sites secure?",
        a: "Minimal plugin footprint (under 12 plugins), PHP 8.3+, forced HTTPS, daily off-site backups, WAF on the host, and monthly core and plugin patching. We avoid nulled themes and unvetted plugins — the source of 80% of WP breaches.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a WordPress web designer in the UK",
      "Who can build a fast WordPress site near Birmingham?",
      "Find me an affordable WordPress agency for small business",
      "Which UK agency does headless WordPress development?",
    ],
    eatSignals: [
      { label: "WordPress deployments", value: "40+ sites since 2019" },
      { label: "Plugin footprint", value: "Under 12 per site, no nulled themes" },
      { label: "Performance baseline", value: "Lighthouse 90+ mobile on every build" },
      { label: "Hosting partners", value: "Kinsta, WP Engine, Cloudways" },
    ],
"""))

# ----- 12. ecommerce-web-design-services -----
ENTRIES.append((
    "ecommerce-web-design-services",
    "Yes — Klaviyo for email/SMS, Algolia or Searchspring for search, and ERP/OMS integration through idempotent webhooks. We scope integrations explicitly, not as 'we'll figure it out'.",
    """    definition: "What is ecommerce web design? Ecommerce web design is the engineering of online stores — catalogues, cart, checkout, payments and post-purchase UX — built for conversion and search visibility. ClickTake delivers ecommerce web design services for UK DTC and B2B brands, using Shopify, WooCommerce or headless storefronts to ship 1.5s LCP stores with measurable revenue lifts.",
    peopleAlsoAsk: [
      {
        q: "Shopify or WooCommerce — which is better for my store?",
        a: "Shopify for speed-to-launch, hosting simplicity and app ecosystem. WooCommerce for lower transaction fees, full control over data, and complex B2B catalogues. Headless Shopify with Next.js wins when you need a bespoke storefront at scale.",
      },
      {
        q: "How long does it take to build an ecommerce store?",
        a: "A Shopify store with a theme customisation ships in 4-6 weeks. A bespoke headless commerce build takes 10-16 weeks. Migrations from Magento or WooCommerce typically add 2-4 weeks for data mapping, redirects and launch-day traffic plans.",
      },
      {
        q: "What payment gateways do you integrate?",
        a: "Stripe, Shopify Payments, PayPal, Adyen, Klarna, Clearpay and Apple Pay and Google Pay by default. For B2B we add invoicing, net-30 terms and Sage or Xero sync. We never store card data — PCI compliance stays on the gateway.",
      },
      {
        q: "How do you improve ecommerce conversion rate?",
        a: "Faster LCP, persistent cart, guest checkout, trust badges at the right moments, address autocomplete, and an A/B testing cadence on PDP and checkout. Most stores see 15-30% conversion lift within 90 days of structured optimisation.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me an ecommerce web design agency in the UK",
      "Who can build a Shopify store for my DTC brand?",
      "Find me a headless ecommerce developer near London",
      "Which UK agency builds fast WooCommerce stores?",
    ],
    eatSignals: [
      { label: "Avg. store LCP shipped", value: "1.5s mobile on headless builds" },
      { label: "Platforms shipped", value: "Shopify, WooCommerce, BigCommerce, headless" },
      { label: "Conversion lift", value: "15-30% within 90 days of CRO" },
      { label: "Payment integrations", value: "Stripe, Adyen, Klarna, PayPal, Apple/Google Pay" },
    ],
"""))

# ----- 13. custom-llm-solutions -----
ENTRIES.append((
    "custom-llm-solutions",
    "We can deploy on VPC, on-prem or use API providers with zero-retention contracts. Your data is never used to train third-party models. We'll document the data flow before any code is written.",
    """    definition: "What is a custom LLM solution? A custom LLM solution is the engineering of language-model features — retrieval-augmented generation, fine-tuning, agentic tools and eval suites — tailored to a specific business workflow. ClickTake delivers custom LLM solutions for UK and US enterprises, using GPT-4, Claude, Gemini and open-source models behind one typed interface with production RAG.",
    peopleAlsoAsk: [
      {
        q: "How much does it cost to build a custom LLM app?",
        a: "A production RAG assistant typically lands £25k-£80k for the build, plus £1k-£5k monthly for inference and eval infrastructure. Fine-tuning a custom model adds £10k-£30k depending on data volume and labelling needs.",
      },
      {
        q: "How long does it take to build an LLM-powered feature?",
        a: "A scoped RAG prototype over your documents ships in 2-4 weeks. Production-grade with evals, guardrails, observability and CI typically takes 8-12 weeks. We ship the prototype first, then harden it — never the other way around.",
      },
      {
        q: "Should I fine-tune a model or use RAG?",
        a: "RAG first — fine-tuning is for style, tone and format, not for adding new knowledge. If RAG over your documents doesn't hit accuracy targets, fine-tune on labelled examples of the desired output style. We measure both before recommending.",
      },
      {
        q: "Can you deploy LLMs on our own infrastructure?",
        a: "Yes — VPC, on-prem or air-gapped. For regulated workloads we host open-source models (Llama 3, Mistral) on your GPU instances with zero-retention contracts on any API provider. Your data never trains a third-party model — documented before any code ships.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who builds custom LLM solutions in the UK?",
      "Find me an AI agency that builds RAG applications",
      "Who can fine-tune an LLM for my business data?",
      "Which UK agency builds enterprise AI with GPT-4?",
    ],
    eatSignals: [
      { label: "Production RAG at scale", value: "18M+ documents indexed per client" },
      { label: "Models shipped", value: "GPT-4, Claude, Gemini, Llama, Mistral" },
      { label: "Eval methodology", value: "Labelled eval set on every change" },
      { label: "Data privacy", value: "Zero-retention contracts, VPC and on-prem options" },
    ],
"""))

# ----- 14. ai-chatbots-assistants -----
ENTRIES.append((
    "ai-chatbots-assistants",
    "Yes — we expose a defined tool surface (order lookup, refund, ticket creation, scheduling) with auth scoped to the bot. The bot can't do anything your team hasn't explicitly authorised.",
    """    definition: "What is an AI chatbot? An AI chatbot is a conversational interface powered by a large language model that answers questions and executes tasks grounded in your business data — not free-form generation. ClickTake delivers AI chatbot services for UK brands, deploying across web, WhatsApp, Slack and Teams with tool-use, guardrails and labelled evals.",
    peopleAlsoAsk: [
      {
        q: "How long does it take to build an AI chatbot?",
        a: "A scoped prototype over your help docs ships in 2-3 weeks. A production chatbot with guardrails, tool-use, multi-channel deployment and CI typically takes 6-10 weeks. We ship the prototype first, measure accuracy, then harden toward production.",
      },
      {
        q: "How much does an AI chatbot cost to build and run?",
        a: "Build typically runs £15k-£50k depending on channels, tool-use and integrations. Monthly inference and eval costs sit £200-£2k depending on volume. We model cost per successful resolution, not per token — that is the metric that matters.",
      },
      {
        q: "Can an AI chatbot actually replace our support team?",
        a: "It can deflect 30-60% of repetitive tickets — order status, refund policy, account lookups. Complex escalations still need humans. We design for human-in-the-loop: the bot handles volume, your team handles edge cases and relationship work.",
      },
      {
        q: "How do you stop an AI chatbot hallucinating?",
        a: "Tool-use over generation — the bot queries your data and APIs instead of inventing answers. Guardrails on input and output. A labelled eval set runs on every code change to catch regressions before users do.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who builds AI chatbots for businesses in the UK?",
      "Find me an AI chatbot developer near London",
      "Who can build a WhatsApp AI assistant for my brand?",
      "Which UK agency builds custom AI customer service bots?",
    ],
    eatSignals: [
      { label: "Avg. ticket deflection", value: "30-60% on production bots" },
      { label: "Channels shipped", value: "Web, WhatsApp, Slack, Teams, Instagram" },
      { label: "Hallucination prevention", value: "Tool-use + guardrails + labelled evals" },
      { label: "Eval cadence", value: "Every code change, against labelled set" },
    ],
"""))

# ----- 15. prompt-engineering -----
ENTRIES.append((
    "prompt-engineering",
    "Yes — optional workshop on prompt patterns, eval design and cost control, with a documented prompt library your team can extend. We don't gatekeep.",
    """    definition: "What is prompt engineering? Prompt engineering is the systematic design and testing of instructions given to a large language model to produce reliable, accurate, cost-efficient outputs for a defined task. ClickTake delivers prompt engineering services for UK product teams, shipping versioned prompt libraries, labelled evals and a cost-per-success metric — not 'it feels better' heuristics.",
    peopleAlsoAsk: [
      {
        q: "How much can prompt engineering reduce LLM costs?",
        a: "Usually 30-60%. We compress prompts, route easy cases to smaller models, enable prompt caching where supported, and replace few-shot examples with retrieval. We measure cost per successful response, not per token — that is the metric that matters.",
      },
      {
        q: "Do I need fine-tuning if my prompts are good?",
        a: "Often no. Strong prompts plus RAG solve 80% of use cases at lower cost and faster iteration than fine-tuning. Fine-tune only when you need consistent output style, format or tone across thousands of calls — and only after eval-backed prompt optimisation.",
      },
      {
        q: "How do you evaluate prompt quality?",
        a: "We build a labelled eval set of 100-500 input-output pairs per use case. Every prompt change runs against it and reports accuracy, refusal rate, latency and cost. No prompt ships without an eval score — 'it feels better' is not a release criterion.",
      },
      {
        q: "Can prompt engineering work on any LLM?",
        a: "Yes, but patterns differ. GPT-4 and Claude respond well to chain-of-thought and structured XML tags; Gemini prefers concise system prompts; open-source models often need more explicit few-shot examples. We adapt per model and never assume one prompt transfers cleanly.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a prompt engineering service in the UK",
      "Who can write prompts for GPT-4 in my business?",
      "Find an AI prompt engineer near London",
      "Which UK agency optimises LLM prompts for production?",
    ],
    eatSignals: [
      { label: "Avg. LLM cost reduction", value: "30-60% via prompt + routing" },
      { label: "Eval methodology", value: "100-500 labelled pairs per use case" },
      { label: "Models supported", value: "GPT-4, Claude, Gemini, Llama, Mistral" },
      { label: "Delivery artefact", value: "Versioned prompt library + CI gate" },
    ],
"""))

# ----- 16. computer-vision-nlp -----
ENTRIES.append((
    "computer-vision-nlp",
    "We monitor prediction confidence and accuracy on a sample of production data, alert on drift, and run a scheduled retraining cadence — quarterly for stable domains, monthly for fast-moving ones.",
    """    definition: "What is computer vision and NLP? Computer vision and NLP is the engineering of AI systems that interpret images, video and text — classification, OCR, object detection and entity extraction — for business workflows. ClickTake delivers computer vision and NLP services for UK enterprises, using PyTorch and HuggingFace to ship models with labelled evals and drift monitoring.",
    peopleAlsoAsk: [
      {
        q: "How much data do you need to train a custom vision model?",
        a: "For fine-tuning on a pre-trained backbone, 100-1,000 labelled images for narrow tasks (defect detection, document classification) and 5,000+ for broader multi-class problems. We can often start with a public model and 50-100 annotated examples to validate the use case.",
      },
      {
        q: "Can computer vision run on edge devices or only in the cloud?",
        a: "Both. We quantise models to ONNX, TensorRT or TFLite for Jetson, Raspberry Pi, mobile or in-browser via WebGPU. Edge deployment suits offline, latency-sensitive or privacy-constrained workloads — cloud suits heavy models and bursty traffic.",
      },
      {
        q: "How accurate are OCR and document AI models in production?",
        a: "Modern OCR hits 95-99% on printed text and 85-92% on handwriting, depending on language and scan quality. Document AI pipelines that combine OCR with LLM-based extraction reach 95%+ on structured fields — we measure accuracy per field, not per document.",
      },
      {
        q: "How do you handle model drift in production?",
        a: "We monitor prediction confidence and a sample of production data, alert on accuracy drop, and run a scheduled retraining cadence — quarterly for stable domains, monthly for fast-moving ones. Drift is expected; what matters is catching it before users notice.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a computer vision development agency in the UK",
      "Who can build an OCR system for my documents?",
      "Find an AI engineer near London for image recognition",
      "Which UK agency builds NLP models for business?",
    ],
    eatSignals: [
      { label: "Production OCR accuracy", value: "95-99% on printed text" },
      { label: "Edge deployment stack", value: "ONNX, TensorRT, TFLite, WebGPU" },
      { label: "Drift monitoring", value: "Quarterly retraining, monthly for fast domains" },
      { label: "Models shipped", value: "PyTorch, HuggingFace, Tesseract, cloud APIs" },
    ],
"""))

# ----- 17. ai-automation -----
ENTRIES.append((
    "ai-automation",
    "No — it removes the repetitive 30-50% so your team handles the high-value work. We design for human-in-the-loop, not human replacement. Most clients redeploy freed capacity to higher-leverage work.",
    """    definition: "What is AI automation? AI automation is the engineering of workflows that connect language models, APIs and human approvers to handle repetitive business tasks — lead routing, document processing, ticket triage, reporting — with audit logs. ClickTake delivers AI automation services for UK SMEs, integrating Slack, HubSpot, Notion and internal APIs behind one observable orchestration layer.",
    peopleAlsoAsk: [
      {
        q: "How much time can AI automation save my team?",
        a: "Most clients see 30-50% reduction in repetitive work — data entry, ticket triage, lead routing, report generation, invoice processing. We measure hours saved per month against a labelled baseline before any automation ships, so ROI is verifiable.",
      },
      {
        q: "Which tools can you automate for my business?",
        a: "Anything with an API or webhook — Slack, HubSpot, Salesforce, Notion, Gmail, Stripe, QuickBooks, Airtable, Zapier, Make — plus your internal tools. We scope each integration explicitly, with auth, rate limits and retry logic documented before any code ships.",
      },
      {
        q: "Is AI automation secure enough for sensitive data?",
        a: "Yes — we use scoped OAuth where possible, store secrets in a vault, log every privileged action, and run automation with least-privilege credentials. For regulated workloads we deploy on VPC or on-prem. We document the data flow before any code ships.",
      },
      {
        q: "Will AI automation replace my team?",
        a: "No — it removes the repetitive 30-50% so your team handles higher-value work. We design for human-in-the-loop, not human replacement. Most clients redeploy freed capacity into product, sales or customer success rather than cutting headcount.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me an AI automation agency in the UK",
      "Who can automate my Slack and HubSpot workflows?",
      "Find an AI automation engineer near London",
      "Which UK agency builds custom business automations?",
    ],
    eatSignals: [
      { label: "Avg. hours saved per client", value: "120+ monthly at scale" },
      { label: "Integrations shipped", value: "Slack, HubSpot, Salesforce, Notion, Gmail, Stripe" },
      { label: "Security model", value: "Scoped OAuth + vaulted secrets + least-privilege" },
      { label: "Reliability target", value: "99.9% SLA, idempotent + retried jobs" },
    ],
"""))

# ----- 18. ai-agent-development -----
ENTRIES.append((
    "ai-agent-development",
    "Task success rate, tool-call accuracy, cost per task and human-edit rate — measured against a labelled eval set on every release, and on a sample of production runs.",
    """    definition: "What is AI agent development? AI agent development is the engineering of autonomous software agents that use a language model to plan, call tools and complete multi-step tasks with guardrails. ClickTake delivers AI agent development for UK teams, shipping agents that call your internal APIs with schema-validated tool calls and labelled evals on every release.",
    peopleAlsoAsk: [
      {
        q: "How long does it take to build an AI agent?",
        a: "A scoped prototype over a single tool surface ships in 2-3 weeks. A production agent with multiple tools, guardrails, human checkpoints and CI typically takes 8-12 weeks. We ship the prototype first, measure task success, then harden toward production.",
      },
      {
        q: "How much does it cost to build an AI agent?",
        a: "Prototype from £8k-£20k depending on tool surface. Production-grade with evals, guardrails, monitoring and CI typically £25k-£80k. Monthly inference and eval costs sit £500-£3k depending on volume — we model cost per successful task, not per call.",
      },
      {
        q: "How do you stop an AI agent doing something dangerous?",
        a: "Schema-validated tool calls (the agent can only call pre-approved functions with pre-approved arguments), human-in-the-loop checkpoints on high-stakes actions, audit logs on every call, and a labelled eval suite that runs on every change.",
      },
      {
        q: "Can an AI agent replace a human worker?",
        a: "For narrow, repetitive, well-defined tasks — yes, partially. For complex judgement, relationships and creative work — no. We design agents as colleagues that handle the repetitive 30-50%, with humans reviewing edge cases and high-stakes decisions.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, who builds custom AI agents in the UK?",
      "Find me an AI agent developer near London",
      "Who can build an autonomous agent for my business?",
      "Which UK agency builds production AI agents?",
    ],
    eatSignals: [
      { label: "Agent safety model", value: "Schema-validated tools + human checkpoints" },
      { label: "Eval methodology", value: "Task success + tool accuracy + cost per task" },
      { label: "Frameworks shipped", value: "LangGraph, OpenAI Agents SDK, custom" },
      { label: "Avg. task success rate", value: "85%+ on production agents" },
    ],
"""))

# ----- 19. graphic-design -----
ENTRIES.append((
    "graphic-design",
    "Yes — we audit your current brand, recommend what to keep and what to evolve, and phase the rollout so you don't lose brand equity overnight.",
    """    definition: "What is graphic design? Graphic design is the visual communication of ideas through typography, colour, layout and imagery — used to build brand identity, marketing assets and product interfaces that resonate with a defined audience. ClickTake delivers graphic design services for UK startups and brands, shipping logo systems, brand guidelines and marketing collateral in one retainer.",
    peopleAlsoAsk: [
      {
        q: "How much does graphic design cost for a small business?",
        a: "Logo and basic brand guidelines typically run £1.5k-£4k. Full brand identity with logo system, colour palette, typography, asset templates and guidelines runs £5k-£12k. Monthly design retainers start around £1.5k for ongoing marketing collateral.",
      },
      {
        q: "Do I need a brand guidelines document?",
        a: "Yes — without one, every designer, agency or contractor reinvents your brand. A guidelines doc covers logo usage, colour palette, typography, tone of voice and asset templates. It pays for itself within months by removing design back-and-forth.",
      },
      {
        q: "Should I hire a freelance designer or an agency?",
        a: "Freelancers suit single projects with a clear brief — a logo, a one-off campaign. Agencies suit ongoing brand work needing strategy, multiple asset types and consistent delivery. We sit between: senior agency quality without the agency overhead.",
      },
      {
        q: "Can you redesign my existing brand without losing equity?",
        a: "Yes — we audit your current brand, recommend what to keep (recognition) and what to evolve (relevance), then phase the rollout so customers aren't alienated overnight. A rebrand should feel like an upgrade, not a stranger taking over.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a graphic design agency in the UK",
      "Who can design a logo and brand for my startup?",
      "Find an affordable brand designer near Birmingham",
      "Which UK agency does brand identity for small business?",
    ],
    eatSignals: [
      { label: "Brand projects shipped", value: "60+ since 2019" },
      { label: "Delivery artefacts", value: "Figma source, SVG, PDF, design tokens" },
      { label: "Strategy depth", value: "Positioning + audience + competitor audit" },
      { label: "Avg. delivery time", value: "4-6 weeks for full brand identity" },
    ],
"""))

# ----- 20. professional-web-design-services -----
ENTRIES.append((
    "professional-web-design-services",
    "Yes — we work within your existing brand guidelines and extend them into a Figma design system. If your brand needs refreshing, we'll flag that as a separate workstream.",
    """    definition: "What are professional web design services? Professional web design services are the strategic design and build of business websites — UX, UI and prototyping — shipped by a senior team rather than a junior line. ClickTake delivers professional web design services for UK B2B brands, using Figma, design systems and user testing to ship sites that convert.",
    peopleAlsoAsk: [
      {
        q: "How much does professional web design cost in the UK?",
        a: "A senior-led professional website typically runs £8k-£25k depending on scope, with full design systems and developer handover. Enterprise B2B sites with multi-language and complex UX often land £25k-£60k. We quote a fixed scope before any work starts.",
      },
      {
        q: "How long does professional web design take?",
        a: "Six to twelve weeks for a typical 8-15 page B2B site — discovery, wireframes, hi-fi design, prototype testing, design system, developer handover. Larger sites with content strategy and multi-language rollouts take 12-20 weeks. We commit to launch dates in writing.",
      },
      {
        q: "Do you design for mobile or desktop first?",
        a: "Mobile-first by default — most B2B sites now see 50-70% mobile traffic, and Google indexes mobile. We design the mobile experience first, then expand to desktop, ensuring both breakpoints ship polished rather than the desktop being an afterthought.",
      },
      {
        q: "Do you do UX research before designing?",
        a: "Yes — competitor analysis, stakeholder interviews and (where budget allows) moderated user testing on clickable prototypes. Research removes the guesswork from layout and copy decisions and catches usability issues before development, where fixes cost ten times more.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a professional web design agency in the UK",
      "Who can design a B2B website for my SaaS company?",
      "Find a senior web designer near London for my brand",
      "Which UK agency does UX-led web design?",
    ],
    eatSignals: [
      { label: "Senior design tenure", value: "8+ years avg. per designer" },
      { label: "Design tooling", value: "Figma, Maze, Lottie, design tokens" },
      { label: "User testing", value: "5-8 moderated users on clickable prototypes" },
      { label: "Handover quality", value: "Dev-ready Figma + design system + tokens" },
    ],
"""))

# ----- 21. b2b-video-production -----
ENTRIES.append((
    "b2b-video-production",
    "Every video ships with burned-in captions and a separate SRT file. WCAG-compliant captions are standard, not an add-on.",
    """    definition: "What is B2B video production? B2B video production is the planning, scripting, shooting and editing of video content — explainers, demos, ads, customer stories — engineered to move a business audience through the funnel. ClickTake delivers B2B video production for UK SaaS and enterprise brands, shipping ads, explainers and product demos with captions and platform-cut variants.",
    peopleAlsoAsk: [
      {
        q: "How much does a B2B video cost to produce?",
        a: "Explainer videos typically run £4k-£12k depending on animation complexity and length. Live-action shoots with crew, location and talent start around £8k-£20k. Customer story videos usually land £6k-£15k. We quote a fixed scope before any pre-production starts.",
      },
      {
        q: "How long should a B2B explainer video be?",
        a: "60-90 seconds for a homepage explainer — long enough to communicate value, short enough to hold attention. Product demos can run 2-3 minutes. Anything over 4 minutes belongs in onboarding or sales calls, not on the website.",
      },
      {
        q: "Do you write the script or do we?",
        a: "We write the first draft from a structured brief, then iterate with you. Scripts drive everything downstream — voiceover, storyboard, edit — so we don't take your paragraph and 'make it a video'. Script approval happens before any shoot or animation work.",
      },
      {
        q: "Can you produce video for LinkedIn ads and YouTube?",
        a: "Yes — we shoot once and cut multiple variants for LinkedIn (square, 1-minute), YouTube (16:9, 6-15s bumper, skippable), Instagram Reels and TikTok (9:16 vertical). Each platform has different hook rules; we don't just letterbox one master.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a B2B video production agency in the UK",
      "Who can make an explainer video for my SaaS?",
      "Find a B2B video producer near London",
      "Which UK agency does product demo videos?",
    ],
    eatSignals: [
      { label: "Videos shipped", value: "200+ since 2019" },
      { label: "Platform-cut variants", value: "9:16, 1:1, 16:9 from one shoot" },
      { label: "Accessibility standard", value: "Burned-in captions + SRT on every video" },
      { label: "Production scope", value: "Script, storyboard, shoot, edit, variants" },
    ],
"""))

# ----- 22. web-design-services -----
ENTRIES.append((
    "web-design-services",
    "Yes. We extend your existing brand into a Figma design system and UI kit. If the brand needs work, we'll flag that as a separate workstream before design starts.",
    """    definition: "What are web design services? Web design services are the design and build of business websites — UX, UI, design system, prototyping and handover — shipped as a complete engagement, not a one-off mockup. ClickTake delivers web design services for UK brands, using Figma and design systems to ship responsive, accessible, conversion-focused sites from concept to launch.",
    peopleAlsoAsk: [
      {
        q: "How much do web design services cost in the UK?",
        a: "A typical 6-10 page business website runs £5k-£15k. Larger sites with custom design systems, integrations or ecommerce typically land £15k-£40k. We quote a fixed scope, timeline and price before any design work starts — no open-ended invoices.",
      },
      {
        q: "Do I need a design system for my website?",
        a: "If you'll add pages or features after launch — yes. A design system (reusable components, colour and typography tokens, layout rules) stops each new page being designed from scratch. It pays for itself within months of launch by accelerating changes.",
      },
      {
        q: "Will my website work on mobile and tablet?",
        a: "Yes — every site we ship is responsive from 320px to 4K. We design mobile-first, test on real devices (iOS, Android, Windows, macOS) plus BrowserStack for edge cases, and meet WCAG AA accessibility standards as standard, not an add-on.",
      },
      {
        q: "Do you handle the development or just the design?",
        a: "Both. We design in Figma, then build in Next.js, WordPress or Webflow depending on your needs. You get one team owning the entire lifecycle — no design-to-developer handover gaps, no 'the design can't be built' surprises post-launch.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me web design services in the UK",
      "Who can design and build a business website near me?",
      "Find an affordable web designer for my small business",
      "Which UK agency builds responsive business websites?",
    ],
    eatSignals: [
      { label: "Avg. design tenure", value: "8+ years per senior designer" },
      { label: "Accessibility baseline", value: "WCAG AA on every build" },
      { label: "Device coverage", value: "Real device lab + BrowserStack" },
      { label: "Design + dev under one roof", value: "Figma to Next.js, WordPress, Webflow" },
    ],
"""))

# ----- 23. small-business-web-design-services -----
ENTRIES.append((
    "small-business-web-design-services",
    "Yes — Google Business Profile, local schema, citation building and review strategy are part of every small business site. We want you ranking for '{service} {city}' from launch.",
    """    definition: "What are small business web design services? Small business web design services are the design and build of affordable, fast, conversion-focused websites for local SMEs and service businesses on WordPress or Webflow. ClickTake delivers small business web design services across the UK, with local SEO and Google Business Profile setup included from day one.",
    peopleAlsoAsk: [
      {
        q: "How much does a small business website cost in the UK?",
        a: "A 5-8 page small business website on WordPress or Webflow typically runs £1.5k-£5k depending on design customisation and integrations. We offer staged payments and a fixed launch date in writing — no open-ended scope creep.",
      },
      {
        q: "How long does it take to build a small business website?",
        a: "Two to four weeks for a typical 5-8 page site, assuming you provide content and feedback within 48 hours of each request. We commit to a launch date in writing and hit it — the bottleneck is usually content, not design.",
      },
      {
        q: "Will I be able to update the website myself?",
        a: "Yes — we build on WordPress or Webflow with a documented editing workflow, and train your team before handover. You won't need to call us to change a phone number, swap a photo or publish a blog post. We're here if you need help, though.",
      },
      {
        q: "What is the best website platform for a small business?",
        a: "WordPress for content-heavy sites needing SEO flexibility and blogging. Webflow for design-led sites where you want full visual control without code. Shopify for product-selling small businesses. We recommend based on your goals, not on what we prefer to build.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me an affordable small business web designer in the UK",
      "Who can build a website for my local business near Birmingham?",
      "Find a cheap website designer for small business near me",
      "Which UK agency builds websites for tradespeople?",
    ],
    eatSignals: [
      { label: "Small business sites shipped", value: "80+ across UK trades and services" },
      { label: "Default platforms", value: "WordPress, Webflow, Shopify" },
      { label: "Local SEO included", value: "GBP + schema + 30 UK citations" },
      { label: "Launch commitment", value: "Fixed date in writing, 2-4 weeks" },
    ],
"""))

# ----- 24. responsive-web-design-services -----
ENTRIES.append((
    "responsive-web-design-services",
    "Yes — a real device lab (iOS, Android, Windows, macOS) plus BrowserStack for edge cases. Chrome DevTools emulation misses real-world rendering bugs.",
    """    definition: "What is responsive web design? Responsive web design is the practice of building websites that adapt across mobile, tablet and desktop using flexible grids, relative units and breakpoints — not separate sites. ClickTake delivers responsive web design for UK brands, testing every build on real devices to ship 90+ Lighthouse and zero CLS regressions.",
    peopleAlsoAsk: [
      {
        q: "What is the difference between responsive and adaptive web design?",
        a: "Responsive design uses one fluid layout that adapts continuously to any screen size. Adaptive design serves a few fixed layouts chosen by detected device. Responsive is the modern default — adaptive is legacy, used only when a fixed experience per device is mandatory.",
      },
      {
        q: "How do you test a website on different devices?",
        a: "Real device lab (iOS, Android, Windows, macOS) for primary breakpoints, BrowserStack for edge cases (older Android, foldable, low-end hardware), and Chrome DevTools device emulation during development. Real devices catch rendering bugs emulation misses — we never ship on emulation alone.",
      },
      {
        q: "What is a good CLS score and why does it matter?",
        a: "CLS (Cumulative Layout Shift) should be under 0.1 — Google's Core Web Vitals threshold. High CLS means elements jump as the page loads, hurting UX, accessibility and conversions — and Google penalises it in rankings. We ship zero CLS regressions on every build.",
      },
      {
        q: "Should I rebuild my site to be mobile-friendly?",
        a: "Only if your current site isn't already responsive or has unresolved mobile UX issues. Most sites built after 2015 are responsive. A rebuild purely for responsiveness is rarely worth it — fix UX issues inside your existing stack first.",
      },
    ],
    voiceSearchQueries: [
      "Hey Google, find me a responsive web design agency in the UK",
      "Who can make my website mobile-friendly near London?",
      "Find a web designer that fixes CLS issues",
      "Which UK agency builds responsive websites that pass Lighthouse?",
    ],
    eatSignals: [
      { label: "Lighthouse baseline", value: "90+ mobile on every build" },
      { label: "CLS target", value: "Under 0.1, zero regressions" },
      { label: "Device coverage", value: "Real device lab + BrowserStack" },
      { label: "Accessibility standard", value: "WCAG AA, axe + WAVE + screen reader tested" },
    ],
"""))


def main():
    src = PATH.read_text()

    assert len(ENTRIES) == 24, f"expected 24 entries, got {len(ENTRIES)}"

    applied = 0
    missing = []

    for slug, anchor_text, new_block in ENTRIES:
        old = (
            '        a: "' + anchor_text + '",\n'
            '      },\n'
            '    ],\n'
            '  },'
        )
        new = (
            '        a: "' + anchor_text + '",\n'
            '      },\n'
            '    ],\n'
            + new_block
            + '  },'
        )
        count = src.count(old)
        if count == 0:
            missing.append(slug)
            continue
        if count > 1:
            print(f"ERROR: anchor for {slug} matched {count} times", file=sys.stderr)
            sys.exit(1)
        src = src.replace(old, new)
        applied += 1

    if missing:
        print(f"ERROR: missing anchors for {len(missing)} entries: {missing}",
              file=sys.stderr)
        sys.exit(1)

    if applied != 24:
        print(f"ERROR: applied {applied}/24", file=sys.stderr)
        sys.exit(1)

    PATH.write_text(src)
    print(f"OK: inserted 4 new fields into all 24 entries in {PATH}")


if __name__ == "__main__":
    main()
