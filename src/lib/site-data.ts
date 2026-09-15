import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Bot,
  Cloud,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Rocket,
  Store,
  ShoppingCart,
  Wrench,
  Flag,
  Handshake,
  Cpu,
  Globe,
  Users,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Megaphone,
  Target,
  PenTool,
  Search,
  Share2,
  BarChart3,
  Layers,
  Server,
  Lock,
  Database,
  Palette,
  Video,
  Monitor,
  Sparkles,
  Brain,
  Eye,
  Workflow,
  MessageSquare,
  Zap,
} from "lucide-react";

export type NavView =
  | "home"
  | "services"
  | "solutions"
  | "work"
  | "about"
  | "careers"
  | "cities"
  | "resources"
  | "contact";

export const NAV_ITEMS: { id: NavView; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resources", label: "Resources" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: "150+", label: "Teams served" },
  { value: "4", label: "Continents" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10M+", label: "API requests / day" },
];

export const IMPACT_STATS = [
  { value: "99.9%", label: "Uptime SLA across all production environments" },
  { value: "120+", label: "Enterprise apps shipped to production since 2019" },
  { value: "40%", label: "AI workflow efficiency — avg. lift across client base" },
  { value: "p99 120ms", label: "API response time served at scale" },
];

export type Capability = {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    num: "01",
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "PPC, content strategy, CRO, SEO, and social media. Data-led marketing that compounds qualified pipeline — measured against your analytics.",
    tags: ["PPC", "SEO", "CRO", "Social"],
  },
  {
    num: "02",
    icon: Code2,
    title: "Web & Software",
    desc: "Full-stack web development, SaaS engineering, auth, Python APIs, WordPress & ecommerce. Production-grade apps with CI/CD from day one.",
    tags: ["Next.js", "SaaS", "Python", "WordPress"],
  },
  {
    num: "03",
    icon: Bot,
    title: "AI & Automation",
    desc: "Custom LLMs, chatbots, prompt engineering, computer vision & NLP, AI automation, and agent development — from PoC to production in 6 weeks.",
    tags: ["LLM", "Agents", "RAG", "Automation"],
  },
  {
    num: "04",
    icon: Palette,
    title: "Creative & Brand",
    desc: "Graphic design, professional web design, B2B video production, and responsive web design for small businesses and enterprises alike.",
    tags: ["Branding", "Video", "UI/UX", "Responsive"],
  },
];

// ===== SERVICES (4 categories × 6 services = 24) =====
export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
};

export type ServiceCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  blurb: string;
  services: ServiceItem[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    tagline: "Data-led growth that compounds pipeline.",
    blurb:
      "Performance marketing engineered around measurable revenue — not vanity metrics. Every channel is tracked end-to-end from impression to closed-won.",
    services: [
      {
        slug: "ppc-paid-ads",
        icon: Target,
        title: "PPC / Paid Ads",
        desc: "Google, Meta, LinkedIn & TikTok ad campaigns engineered around profitable CPA, not clicks. Full-funnel tracking from impression to revenue.",
        features: ["Google Ads", "Meta & LinkedIn", "ROAS optimization", "Conversion tracking"],
      },
      {
        slug: "content-strategy-seo",
        icon: PenTool,
        title: "Content Strategy & SEO",
        desc: "Topical authority maps, content clusters, and editorial calendars that compound organic traffic month over month.",
        features: ["Topic clusters", "Editorial calendar", "On-page SEO", "Content ops"],
      },
      {
        slug: "conversion-rate-optimization",
        icon: BarChart3,
        title: "Conversion Rate Optimization",
        desc: "A/B testing, heatmaps, and funnel analysis that lift checkout conversion by 25–60% without extra ad spend.",
        features: ["A/B testing", "Funnel analysis", "Heatmaps", "Landing page CRO"],
      },
      {
        slug: "seo-services",
        icon: Search,
        title: "SEO Services",
        desc: "Technical, on-page, and off-page SEO. We move you into the top 3 of the local pack and keep you there.",
        features: ["Technical SEO", "Local SEO", "Link building", "Core Web Vitals"],
      },
      {
        slug: "social-media-marketing",
        icon: Share2,
        title: "Social Media Marketing",
        desc: "Organic and paid social strategy that turns followers into a community and views into sales.",
        features: ["Content calendars", "Community management", "Paid social", "Influencer ops"],
      },
      {
        slug: "seo-web-design-services",
        icon: Monitor,
        title: "SEO & Web Design Services",
        desc: "Sites built SEO-first from the ground up — fast, indexable, and structured for ranking from launch day.",
        features: ["SEO-first build", "Schema markup", "PageSpeed 90+", "Indexability audit"],
      },
    ],
  },
  {
    id: "web-software",
    label: "Web & Software",
    icon: Code2,
    tagline: "Production-grade apps, not prototypes.",
    blurb:
      "Full-stack engineering on Next.js, React, Python and Node — shipped with design systems, observability, CI/CD, and E2E test coverage from day one.",
    services: [
      {
        slug: "full-stack-web-development",
        icon: Layers,
        title: "Full-Stack Web Development",
        desc: "Next.js 16 + TypeScript + Prisma + Postgres. Design systems, Storybook, Playwright E2E, and CI/CD from day one.",
        features: ["Next.js 16", "TypeScript", "Prisma + Postgres", "Playwright E2E"],
      },
      {
        slug: "saas-platform-engineering",
        icon: Cloud,
        title: "SaaS Platform Engineering",
        desc: "Multi-tenant SaaS with billing (Stripe), RBAC, audit logs, and usage metering — architected to scale to 100K tenants.",
        features: ["Multi-tenancy", "Stripe billing", "RBAC", "Usage metering"],
      },
      {
        slug: "auth-identity",
        icon: Lock,
        title: "Auth & Identity",
        desc: "NextAuth, OAuth, SSO, SAML, and passkey-based authentication with zero-trust session handling.",
        features: ["NextAuth v4", "OAuth / SSO / SAML", "Passkeys", "Zero-trust sessions"],
      },
      {
        slug: "python-backend-apis",
        icon: Server,
        title: "Python Backend & APIs",
        desc: "FastAPI services, async workers, and typed REST/GraphQL APIs with OpenAPI docs and p99 120ms SLAs.",
        features: ["FastAPI", "Async workers", "GraphQL", "OpenAPI docs"],
      },
      {
        slug: "wordpress-web-design-services",
        icon: Monitor,
        title: "WordPress Web Design Services",
        desc: "Custom WordPress + WooCommerce builds with headless options, ACF blocks, and Lighthouse 90+ performance.",
        features: ["WordPress + Woo", "Headless WP", "ACF blocks", "Lighthouse 90+"],
      },
      {
        slug: "ecommerce-web-design-services",
        icon: ShoppingCart,
        title: "Ecommerce Web Design Services",
        desc: "Headless Shopify, Medusa, and custom commerce — sub-second LCP, +25–60% CVR, and infinite scale.",
        features: ["Headless Shopify", "Medusa", "Stripe checkout", "1.5s LCP"],
      },
    ],
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    icon: Bot,
    tagline: "From PoC to production in 6 weeks.",
    blurb:
      "Custom LLMs, autonomous agents, and AI automation with evals, guardrails, and human-in-loop fallbacks — built for real production workloads, not demos.",
    services: [
      {
        slug: "custom-llm-solutions",
        icon: Brain,
        title: "Custom LLM Solutions",
        desc: "Fine-tuned and RAG-grounded LLMs over your private data — with eval harnesses, guardrails, and cost controls.",
        features: ["RAG pipelines", "Fine-tuning", "Eval harness", "Guardrails"],
      },
      {
        slug: "ai-chatbots-assistants",
        icon: MessageSquare,
        title: "AI Chatbots & Assistants",
        desc: "Production chatbots with tool-use, memory, and human handoff — deployed on your site, WhatsApp, and Slack.",
        features: ["Tool-use", "Memory", "Human handoff", "Multi-channel"],
      },
      {
        slug: "prompt-engineering",
        icon: Sparkles,
        title: "Prompt Engineering",
        desc: "Systematic prompt design, evaluation, and version control for reliable LLM behaviour at scale.",
        features: ["Prompt versioning", "Eval suites", "Few-shot design", "Cost optimization"],
      },
      {
        slug: "computer-vision-nlp",
        icon: Eye,
        title: "Computer Vision & NLP",
        desc: "OCR, object detection, document intelligence, and classification models deployed to production endpoints.",
        features: ["OCR & document AI", "Object detection", "Classification", "Edge deployment"],
      },
      {
        slug: "ai-automation",
        icon: Workflow,
        title: "AI Automation",
        desc: "Workflows that eliminate 30+ hours/week of manual work — connecting your tools with intelligent agents.",
        features: ["Workflow orchestration", "Tool integrations", "Human-in-loop", "Monitoring"],
      },
      {
        slug: "ai-agent-development",
        icon: Bot,
        title: "AI Agent Development",
        desc: "Autonomous goal-pursuing agents with planning, memory, and multi-agent orchestration via LangGraph.",
        features: ["LangGraph", "Planning & memory", "Multi-agent", "Production evals"],
      },
    ],
  },
  {
    id: "creative-brand",
    label: "Creative & Brand",
    icon: Palette,
    tagline: "Premium craft, delivered on deadline.",
    blurb:
      "Brand identity, web design, and video production that make your product unforgettable — executed at an elite level across every touchpoint.",
    services: [
      {
        slug: "graphic-design",
        icon: PenTool,
        title: "Graphic Design",
        desc: "Logos, brand systems, marketing collateral, and social creatives that look premium and convert.",
        features: ["Brand identity", "Logo systems", "Marketing collateral", "Social creatives"],
      },
      {
        slug: "professional-web-design-services",
        icon: Monitor,
        title: "Professional Web Design Services",
        desc: "Conversion-focused web design with UX research, wireframes, and pixel-perfect Figma handoff.",
        features: ["UX research", "Wireframes", "Figma design systems", "Hi-fi prototypes"],
      },
      {
        slug: "b2b-video-production",
        icon: Video,
        title: "B2B Video Production",
        desc: "Explainer videos, product demos, and ad creatives — scripted, shot, and edited end-to-end.",
        features: ["Explainer videos", "Product demos", "Ad creatives", "Motion graphics"],
      },
      {
        slug: "web-design-services",
        icon: Layers,
        title: "Web Design Services",
        desc: "End-to-end web design from concept to launch — design systems, UI kits, and developer handoff.",
        features: ["Design systems", "UI kits", "Dev handoff", "Design QA"],
      },
      {
        slug: "small-business-web-design-services",
        icon: Store,
        title: "Small Business Web Design Services",
        desc: "Affordable, fast-launch websites for small businesses — local-SEO-ready and conversion-optimized.",
        features: ["Fast launch", "Local-SEO ready", "Mobile-first", "Easy CMS"],
      },
      {
        slug: "responsive-web-design-services",
        icon: Smartphone,
        title: "Responsive Web Design Services",
        desc: "Flawless experiences across every device — mobile, tablet, desktop, and ultra-wide — with no layout shifts.",
        features: ["Mobile-first", "Fluid layouts", "No CLS", "WCAG 2.2 AA"],
      },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "30-min architecture review. We map your roadmap, identify highest-ROI automation, and scope a fixed-price PoC.",
    duration: "Week 0",
    deliverable: "Roadmap + PoC scope",
  },
  {
    num: "02",
    title: "Architect",
    desc: "Senior engineers (not juniors) design the system — schema, API contracts, infra topology, and observability stack.",
    duration: "Week 1",
    deliverable: "Architecture blueprint",
  },
  {
    num: "03",
    title: "Build",
    desc: "Sprint-based delivery with weekly demos. CI/CD from day one. E2E Playwright suite + design system in Storybook.",
    duration: "Weeks 2–5",
    deliverable: "Working software, weekly",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Production launch with runbooks, on-call rotation, and 30-day post-launch hypercare. Then we hand over the keys.",
    duration: "Week 6",
    deliverable: "Live + 30-day hypercare",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  location: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Lumen Commerce",
    quote:
      "ClickTake rebuilt our entire stack and tripled our online revenue in just four months. They genuinely felt like an extension of our internal team.",
    location: "E-commerce · London, UK",
    initials: "SM",
  },
  {
    name: "James O'Connor",
    role: "CTO, Northwind",
    quote:
      "The AI automations they engineered save us over 30 hours every week. Exceptional execution, clean systems and incredible design taste.",
    location: "SaaS Platform · Manchester, UK",
    initials: "JO",
  },
  {
    name: "Aisha Khan",
    role: "Marketing Director, Verve Studio",
    quote:
      "The best digital partner we've worked with. Strategy, branding, development and growth — all executed at an elite level.",
    location: "SaaS Platform · Birmingham, UK",
    initials: "AK",
  },
  {
    name: "Aisha Al-Mansoori",
    role: "COO, Hospitality Group",
    quote:
      "From brand identity to a fully custom booking platform, ClickTake handled everything end-to-end. Premium craft, delivered on deadline.",
    location: "Operations · Dubai, UAE",
    initials: "AA",
  },
];

export const TECH_STACK = [
  "Python",
  "OpenAI",
  "Docker",
  "PostgreSQL",
  "AWS",
  "Vercel",
  "Terraform",
  "Next.js 16",
  "LangGraph",
  "Anthropic",
  "Kubernetes",
  "Redis",
];

// ===== SOLUTIONS =====
export type Solution = {
  icon: LucideIcon;
  audience: string;
  title: string;
  desc: string;
  metrics: { label: string; value: string }[];
};

export const SOLUTIONS: Solution[] = [
  {
    icon: Rocket,
    audience: "Founders launching a new product or brand",
    title: "For Startups",
    desc: "Launch online end-to-end in 90 days — not 9 months. Full brand system, production app, and an AI assistant baked in.",
    metrics: [
      { label: "Time to live", value: "≈ 90 days" },
      { label: "Brand assets", value: "Full system" },
      { label: "AI assistant", value: "Production" },
    ],
  },
  {
    icon: Store,
    audience: "Brick-and-mortar service-area businesses",
    title: "For Local Businesses",
    desc: "Win your local pack and turn searches into walk-ins. Local SEO, reviews automation, and a conversion-optimized site.",
    metrics: [
      { label: "Local pack", value: "Top 3" },
      { label: "PageSpeed", value: "90+" },
      { label: "Reviews / mo", value: "+15–30" },
    ],
  },
  {
    icon: ShoppingCart,
    audience: "DTC, multi-channel and marketplace sellers",
    title: "For E-commerce Brands",
    desc: "Headless commerce that loads fast, converts better and scales infinitely. Sub-second LCP and AI-assisted merchandising.",
    metrics: [
      { label: "LCP", value: "1.5s" },
      { label: "Conversion", value: "+25–60%" },
      { label: "AOV", value: "+15%" },
    ],
  },
  {
    icon: Wrench,
    audience: "Phone, laptop, auto & appliance repair shops",
    title: "For Repair Shops",
    desc: "Repair-shop management software built for the way you actually work — serialized inventory, tickets, and status lookups.",
    metrics: [
      { label: "Ticket time", value: "-40%" },
      { label: "Customer calls", value: "-70%" },
      { label: "Parts waste", value: "-25%" },
    ],
  },
  {
    icon: Flag,
    audience: "UK-registered SMEs and limited companies",
    title: "For UK Businesses",
    desc: "A UK-registered partner that understands GDPR, HMRC and local intent. UK Ltd Co, compliant invoicing, and EMEA coverage.",
    metrics: [
      { label: "Entity", value: "UK Ltd Co" },
      { label: "GDPR", value: "Compliant" },
      { label: "Invoices", value: "UK VAT" },
    ],
  },
  {
    icon: Handshake,
    audience: "Marketing, design & dev agencies needing white-label",
    title: "For Agencies",
    desc: "White-label engineering, AI and growth — under your brand. Senior teams that plug into your delivery pipeline.",
    metrics: [
      { label: "Capacity", value: "+5 engineers" },
      { label: "Margin", value: "+40–60%" },
      { label: "Quality", value: "Senior" },
    ],
  },
];

// ===== CASE STUDIES =====
export type CaseStudy = {
  emoji: string;
  sector: string;
  type: string;
  period: string;
  duration: string;
  title: string;
  summary: string;
  stack: string[];
  metrics: { label: string; before: string; after: string; delta: string; positive: boolean }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    emoji: "🏦",
    sector: "FinTech · B2B",
    type: "2024 · 14 weeks",
    period: "2024",
    duration: "14 weeks",
    title: "Real-time Payments API — p99 latency cut 72%",
    summary:
      "A Series-C fintech processing $4.2B/yr in B2B payments needed to bring p99 API latency under 200ms to qualify for tier-1 bank partnerships. We rebuilt the request hot-path, replaced synchronous compliance calls with an event-driven sidecar, and migrated to a multi-region active-active Postgres+Redis topology.",
    stack: ["Next.js 16", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "Terraform"],
    metrics: [
      { label: "P99 Latency", before: "720ms", after: "200ms", delta: "-72%", positive: true },
      { label: "Throughput", before: "8K rps", after: "22K rps", delta: "+175%", positive: true },
      { label: "Infra Cost / Mo", before: "$48K", after: "$31K", delta: "-35%", positive: true },
    ],
  },
  {
    emoji: "🛒",
    sector: "E-commerce · D2C",
    type: "2024 · 10 weeks",
    period: "2024",
    duration: "10 weeks",
    title: "AI Shopping Assistant — +38% checkout conversion",
    summary:
      "A 9-figure D2C skincare brand deployed a RAG-grounded shopping assistant across PDP pages and cart. We built the retrieval pipeline over 14K SKUs + 280K reviews, integrated a multi-agent orchestrator for product-match + ingredient-safety checks, and A/B-tested against the static chatbot for 8 weeks.",
    stack: ["Next.js 16", "Python", "OpenAI", "LangGraph", "Pinecone", "PostgreSQL", "Vercel"],
    metrics: [
      { label: "Checkout CVR", before: "2.6%", after: "3.6%", delta: "+38%", positive: true },
      { label: "Avg. Order Value", before: "$42", after: "$54", delta: "+29%", positive: true },
      { label: "Returns Rate", before: "12.4%", after: "8.1%", delta: "-35%", positive: true },
    ],
  },
  {
    emoji: "🏥",
    sector: "Healthcare · HIPAA",
    type: "2023 · 22 weeks",
    period: "2023",
    duration: "22 weeks",
    title: "Clinical Notes RAG — $1.4M annual cloud savings",
    summary:
      "A regional hospital network (1,200 beds, 14 facilities) needed to make 18M anonymized clinical notes searchable for clinical research. We built a hybrid retrieval pipeline with Weaviate + BGE reranking, cutting query latency 6× and eliminating a $1.4M/yr legacy search contract.",
    stack: ["Python", "FastAPI", "Weaviate", "OpenAI", "BGE-Reranker", "PostgreSQL", "Docker", "GCP"],
    metrics: [
      { label: "Query Latency", before: "4.2s", after: "0.7s", delta: "-83%", positive: true },
      { label: "Annual Cost", before: "$1.7M", after: "$0.3M", delta: "-$1.4M", positive: true },
      { label: "Recall@10", before: "61%", after: "94%", delta: "+33pts", positive: true },
    ],
  },
  {
    emoji: "🚚",
    sector: "Logistics · Fleet",
    type: "2024 · 12 weeks",
    period: "2024",
    duration: "12 weeks",
    title: "Fleet Orchestration Agents — 31% fewer empty miles",
    summary:
      "A mid-market logistics operator deployed multi-agent orchestration across dispatch, routing, and load-matching. Agents negotiate loads, rebalance empty repositioning, and surface exceptions to humans only when SLAs risk breach.",
    stack: ["Python", "LangGraph", "OpenAI", "PostgreSQL", "Redis", "Kubernetes", "GCP"],
    metrics: [
      { label: "Empty Miles", before: "22%", after: "15%", delta: "-31%", positive: true },
      { label: "Dispatch Time", before: "14m", after: "3m", delta: "-79%", positive: true },
      { label: "On-time %", before: "88%", after: "96%", delta: "+8pts", positive: true },
    ],
  },
];

// ===== PORTFOLIO =====
export type PortfolioItem = {
  name: string;
  since: string;
  category: string;
  desc: string;
  stack: string[];
  location: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    name: "DibNow",
    since: "2024",
    category: "SaaS Platform",
    desc: "Cloud-based gadget repair management software with POS, serialized inventory, multi-branch support, and AI-powered customer service.",
    stack: ["React", "Node.js", "Render", "Stripe"],
    location: "Global",
  },
  {
    name: "Panel — Employee Management",
    since: "2025",
    category: "SaaS Platform",
    desc: "Modern employee management system with attendance tracking, project management, and team analytics.",
    stack: ["Next.js", "React", "Firebase"],
    location: "Global",
  },
  {
    name: "LogiTrack",
    since: "2025",
    category: "SaaS Platform",
    desc: "Logistics and shipment tracking platform with real-time dashboards and carrier integrations.",
    stack: ["React", "Node.js", "Render"],
    location: "Global",
  },
  {
    name: "ClickOpticX",
    since: "2025",
    category: "SaaS Platform",
    desc: "Optical retail management platform with prescription tracking, inventory, and customer journey tools.",
    stack: ["React", "Node.js", "Render"],
    location: "Global",
  },
  {
    name: "Mearns Gadget Repair",
    since: "2024",
    category: "Gadget Repair",
    desc: "Fast mobile, MacBook, and tablet repair booking site with live WooCommerce checkout and Stripe payments.",
    stack: ["WordPress", "WooCommerce", "Stripe"],
    location: "Glasgow, UK",
  },
  {
    name: "Gadget Doctor LS",
    since: "2024",
    category: "Gadget Repair",
    desc: "Same-day device repair shop site with WooCommerce catalog, branch info, and integrated repair-status lookups.",
    stack: ["WordPress", "WooCommerce", "Stripe"],
    location: "Leeds, UK",
  },
  {
    name: "PhoneFix Glasgow",
    since: "2023",
    category: "Gadget Repair",
    desc: "Multi-branch repair commerce site with booking, branch routing, and serialized ticket tracking.",
    stack: ["WordPress", "WooCommerce"],
    location: "Glasgow, UK",
  },
  {
    name: "Academy Portal",
    since: "2024",
    category: "Education",
    desc: "Learning platform with course catalog, progress tracking, and instructor-led cohorts.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    location: "Global",
  },
  {
    name: "EduTrack LMS",
    since: "2023",
    category: "Education",
    desc: "Academy management system with enrollments, assessments, and parent portals.",
    stack: ["React", "Node.js"],
    location: "Global",
  },
  {
    name: "LearnHub",
    since: "2025",
    category: "Education",
    desc: "Modern learning experience platform with AI-tutor assist and adaptive pathways.",
    stack: ["Next.js", "OpenAI", "Vercel"],
    location: "Global",
  },
  {
    name: "RetailFlow POS",
    since: "2024",
    category: "SaaS Platform",
    desc: "Multi-location retail POS with inventory sync, staff management, and reporting dashboards.",
    stack: ["React", "Node.js", "Render"],
    location: "Global",
  },
  {
    name: "BookingPro",
    since: "2025",
    category: "SaaS Platform",
    desc: "Appointment booking and scheduling platform with calendar sync and reminders.",
    stack: ["Next.js", "Prisma", "Stripe"],
    location: "Global",
  },
];

// ===== ABOUT =====
export const ABOUT_STATS = [
  { value: "2019", label: "Founded" },
  { value: "120+", label: "Projects shipped" },
  { value: "80+", label: "Clients in 14 countries" },
  { value: "5.0", label: "Avg client rating" },
];

export const HISTORY_TIMELINE = [
  {
    period: "2019–2021",
    title: "Founding and the Birmingham HQ",
    desc: "ClickTake is founded in Birmingham as a full-stack web shop serving UK SMEs. First 30 projects ship on Next.js + Postgres.",
  },
  {
    period: "2022–2023",
    title: "US entry and the AI pivot",
    desc: "Austin business desk opens. The team pivots into AI-native engineering — LangGraph agents, RAG pipelines, and the first multi-agent production deployments go live.",
  },
  {
    period: "2024–2026",
    title: "Dubai, the deep-dive rebuild, and today",
    desc: "Dubai MENA office opens. The platform is rebuilt around six practices sharing one delivery engine. 120+ production deployments shipped across four continents.",
  },
];

export const COMPANY_VALUES = [
  {
    icon: Cpu,
    title: "Engineering-first",
    desc: "Senior engineers (8+ yrs avg) own engagements end-to-end. No juniors learning on your budget.",
  },
  {
    icon: Globe,
    title: "Multi-region delivery",
    desc: "Four offices across UK, Pakistan, US and UAE give us 18-hour workday coverage on every engagement.",
  },
  {
    icon: Users,
    title: "Embedded, not outsourced",
    desc: "We feel like an extension of your internal team — shared Slack, shared sprints, shared metrics.",
  },
];

export const ENGAGEMENT_PHASES = [
  {
    num: "01",
    title: "Discovery & Scope Lock",
    desc: "Roadmap mapping, ROI prioritization, fixed-price PoC scoping, and a written exit criterion per workstream.",
  },
  {
    num: "02",
    title: "Architecture & Design",
    desc: "Schema, API contracts, infra topology, observability stack — signed off before build begins.",
  },
  {
    num: "03",
    title: "Build Sprints",
    desc: "Two-week sprints, weekly demos, CI/CD from day one, design system in Storybook, E2E Playwright.",
  },
  {
    num: "04",
    title: "Launch & Handoff",
    desc: "Production launch with runbooks and on-call rotation. Then we hand over the keys — no lock-in.",
  },
  {
    num: "05",
    title: "Operate & Iterate",
    desc: "Optional hypercare + ongoing iteration. We measure against your analytics, not vanity metrics.",
  },
];

export const COMPARE_ROWS = [
  { feature: "Senior engineers (8+ yrs)", clicktake: true, boutique: true, offshore: false, inhouse: "varies" },
  { feature: "18-hour workday coverage", clicktake: true, boutique: false, offshore: false, inhouse: false },
  { feature: "Fixed-price PoC in 6 weeks", clicktake: true, boutique: "sometimes", offshore: false, inhouse: false },
  { feature: "AI-native (agents, RAG, evals)", clicktake: true, boutique: false, offshore: "rare", inhouse: false },
  { feature: "Code + keys handed over", clicktake: true, boutique: "varies", offshore: false, inhouse: true },
  { feature: "UK Ltd Co + GDPR invoicing", clicktake: true, boutique: true, offshore: false, inhouse: "n/a" },
];

export const FAQS = [
  {
    q: "What does ClickTake actually do?",
    a: "We are a full-stack, AI-native software engineering firm organized across four practice areas: Digital Marketing, Web & Software, AI & Automation, and Creative & Brand. We ship 24 specialized services under one delivery engine.",
  },
  {
    q: "How fast can you ship a working PoC?",
    a: "Most engagements begin with a fixed-scope, fixed-fee PoC delivered within 6 weeks. The discovery call scopes it and gives you a written exit criterion before any code is written.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Yes. We embed into your Slack, sprints, and code reviews. Many engagements are hybrid — we own specific workstreams while your team owns others. The architecture is always handed over, never locked in.",
  },
  {
    q: "Where are you based?",
    a: "Four offices: Birmingham (UK HQ), Multan (engineering hub), Austin (US business desk), and Dubai (MENA office). We serve 12+ cities across the UK, Pakistan, USA and UAE.",
  },
  {
    q: "How is pricing structured?",
    a: "Discovery is free (30-min call). PoCs are fixed-price and fixed-scope (typically 6 weeks). Ongoing engagements are sprint-based with weekly demos. No long-term contracts are required to start.",
  },
  {
    q: "Do you sign NDAs and comply with GDPR / SOC 2?",
    a: "Yes. We are a UK-registered Ltd Co, GDPR-compliant, and have taken 20+ clients through SOC 2 Type II audit prep. NDAs are signed before any discovery call.",
  },
];

// ===== CAREERS =====
export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  department: string;
  desc: string;
};

export const JOBS: Job[] = [
  {
    slug: "senior-nextjs-engineer",
    title: "Senior Next.js Engineer",
    location: "Remote · UK / Pakistan",
    type: "Full-time",
    department: "Web & Software",
    desc: "Lead production Next.js 16 builds for enterprise clients. Own architecture, CI/CD, and mentor mid-level engineers.",
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    location: "Remote · UK / Pakistan",
    type: "Full-time",
    department: "AI & Automation",
    desc: "Design and ship multi-agent systems, RAG pipelines, and custom LLM solutions with evals and guardrails.",
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    location: "Birmingham, UK · Hybrid",
    type: "Full-time",
    department: "Digital Marketing",
    desc: "Drive technical, on-page, and local SEO for clients across 4 continents. Own rankings, Core Web Vitals, and reporting.",
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    location: "Dubai, UAE · Hybrid",
    type: "Full-time",
    department: "Creative & Brand",
    desc: "Craft brand identities, marketing creatives, and web design systems for clients across the UK, US and MENA.",
  },
  {
    slug: "frontend-engineer-intern",
    title: "Frontend Engineer Intern",
    location: "Multan, Pakistan · On-site",
    type: "Internship",
    department: "Web & Software",
    desc: "Learn production Next.js, React, and TypeScript alongside senior engineers. Paid, 3-month rotational program.",
  },
];

export const CAREERS_PERKS = [
  { icon: Globe, title: "Remote-first", desc: "Work from any of our 4 office cities or fully remote." },
  { icon: Cpu, title: "Senior mentorship", desc: "8+ yr engineers review every PR you ship." },
  { icon: Zap, title: "Real production work", desc: "Ship to 10M+ req/day systems from week one." },
  { icon: Users, title: "Global team", desc: "Collaborate across UK, Pakistan, US & UAE time zones." },
];

// ===== CITIES =====
export type City = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  desc: string;
};

export const CITIES: City[] = [
  { slug: "birmingham", name: "Birmingham", country: "United Kingdom", flag: "🇬🇧", desc: "Our UK HQ — serving local businesses, repair shops, and SaaS startups across the Midlands." },
  { slug: "london", name: "London", country: "United Kingdom", flag: "🇬🇧", desc: "Enterprise fintech, ecommerce, and AI engagements for the capital's scale-ups." },
  { slug: "manchester", name: "Manchester", country: "United Kingdom", flag: "🇬🇧", desc: "SaaS platforms and digital marketing for the North's tech corridor." },
  { slug: "leeds", name: "Leeds", country: "United Kingdom", flag: "🇬🇧", desc: "Local SEO, web design, and repair-shop commerce across West Yorkshire." },
  { slug: "austin", name: "Austin, TX", country: "United States", flag: "🇺🇸", desc: "Our US business desk — SaaS growth channels and AI automation for US startups." },
  { slug: "new-york", name: "New York", country: "United States", flag: "🇺🇸", desc: "Fintech, media, and enterprise AI engagements on the East Coast." },
  { slug: "san-francisco", name: "San Francisco", country: "United States", flag: "🇺🇸", desc: "Series-A to Series-C SaaS and AI-native product engineering." },
  { slug: "dubai", name: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", desc: "Our MENA office — market entry, branding, and AI for the GCC region." },
  { slug: "abu-dhabi", name: "Abu Dhabi", country: "United Arab Emirates", flag: "🇦🇪", desc: "Government, healthcare, and enterprise web platforms." },
  { slug: "multan", name: "Multan", country: "Pakistan", flag: "🇵🇰", desc: "Our engineering hub — 18-hour workday delivery coverage." },
  { slug: "lahore", name: "Lahore", country: "Pakistan", flag: "🇵🇰", desc: "Full-stack engineering and AI talent pool." },
  { slug: "karachi", name: "Karachi", country: "Pakistan", flag: "🇵🇰", desc: "Digital marketing, SEO, and creative production." },
  { slug: "islamabad", name: "Islamabad", country: "Pakistan", flag: "🇵🇰", desc: "SaaS engineering and cloud DevOps talent." },
];

// ===== RESOURCES =====
export type Resource = {
  slug: string;
  title: string;
  category: string;
  desc: string;
  readTime: string;
};

export const RESOURCES: Resource[] = [
  { slug: "birmingham-seo-guide", title: "Birmingham SEO Guide", category: "SEO", desc: "Rank in the local pack across the Midlands with this step-by-step technical and local SEO playbook.", readTime: "12 min" },
  { slug: "ai-adoption-playbook-2026", title: "AI Adoption Playbook 2026", category: "AI", desc: "How to identify, scope, and ship the highest-ROI AI automation for your business in 6 weeks.", readTime: "18 min" },
  { slug: "dubai-market-entry", title: "Dubai Market Entry", category: "Strategy", desc: "Launching a digital presence in the GCC — legal, cultural, and technical considerations.", readTime: "15 min" },
  { slug: "austin-saas-growth-channels", title: "Austin SaaS Growth Channels", category: "Growth", desc: "The paid, organic, and partnership channels driving SaaS pipeline in the US tech corridor.", readTime: "10 min" },
  { slug: "headless-shopify-vs-medusa", title: "Headless Shopify vs Medusa", category: "Ecommerce", desc: "A technical comparison of the two leading headless commerce stacks — when to pick each.", readTime: "14 min" },
  { slug: "pakistan-tech-talent-guide", title: "Pakistan Tech Talent Guide", category: "Hiring", desc: "How to hire and manage senior engineering talent across Pakistan's tech hubs.", readTime: "11 min" },
  { slug: "next-js-pagespeed-optimisation", title: "Next.js PageSpeed Optimisation", category: "Web", desc: "Hit 90+ Lighthouse scores with these Next.js 16 performance patterns.", readTime: "13 min" },
  { slug: "seo-audit-checklist-2026", title: "SEO Audit Checklist — 25 Steps to Rank Higher in 2026", category: "SEO", desc: "The exact 25-step technical SEO audit we run on every new engagement.", readTime: "20 min" },
];

export const RESOURCE_CATEGORIES = [
  "All",
  "SEO",
  "AI",
  "Growth",
  "Ecommerce",
  "Web",
  "Strategy",
  "Hiring",
];

// ===== OFFICES & CONTACT =====
export const OFFICES = [
  { city: "Birmingham", country: "United Kingdom", flag: "🇬🇧", role: "UK HQ" },
  { city: "Multan", country: "Pakistan", flag: "🇵🇰", role: "Engineering hub" },
  { city: "Austin, TX", country: "United States", flag: "🇺🇸", role: "US business desk" },
  { city: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", role: "MENA office" },
];

export const CONTACT_METHODS = [
  { icon: Mail, label: "Email", value: "info@clicktaketech.com", href: "mailto:info@clicktaketech.com" },
  { icon: Phone, label: "United Kingdom", value: "+44 7391 653377", href: "tel:+447391653377" },
  { icon: Phone, label: "Pakistan", value: "+92 306 9753003", href: "tel:+923069753003" },
  { icon: MessageCircle, label: "WhatsApp", value: "+44 7751 553879", href: "https://wa.link/iqz8eg" },
];

export const NEXT_STEPS = [
  {
    num: "01",
    title: "Senior engineer reviews your brief",
    desc: "Within 4 hours during business days. Not a salesperson — an engineer who has shipped production systems.",
  },
  {
    num: "02",
    title: "30-minute architecture call",
    desc: "We bring a draft architecture + ballpark estimate tailored to your use case.",
  },
  {
    num: "03",
    title: "Working PoC in 6 weeks",
    desc: "Fixed-scope, fixed-fee. No long-term contract required to start.",
  },
];

export const PROJECT_NEEDS = [
  "Custom Web/Mobile App",
  "Cloud / DevOps",
  "AI / ML Pipeline",
  "Security Audit",
  "Growth / Marketing",
  "Something else",
];
