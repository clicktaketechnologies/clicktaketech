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
  BookOpen,
  Tag,
  Briefcase,
  Building2,
  Scale,
  FileText,
  Cookie,
  Heart,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  Bookmark,
  BookMarked,
  MessagesSquare,
  Rss,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export type NavView =
  | "home"
  | "services"
  | "solutions"
  | "portfolio"
  | "case-studies"
  | "blog"
  | "pricing"
  | "about"
  | "team"
  | "careers"
  | "cities"
  | "connect"
  | "contact"
  | "service-detail"
  | "job-apply"
  | "admin"
  | "legal-privacy"
  | "legal-terms"
  | "legal-cookies"
  | "blog-post";

// ===== Service detail SEO content =====
// Detailed, keyword-optimized content for each of the 24 services.
// Populated in src/lib/service-content.ts (kept separate for size).
export type ServiceContent = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  shortTermKeywords: string[];
  longTermKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  overview: string;
  benefits: { title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  // --- Voice search + featured snippet + E-A-T additions ---
  /** 40-55 word definition that targets the "What is X?" featured-snippet block. */
  definition: string;
  /** 4-5 conversational questions voice-assistant users ask, each with a concise (25-45 word) answer. */
  peopleAlsoAsk: { q: string; a: string }[];
  /** 3-5 natural-language, long-tail questions mirroring how people speak to voice assistants. */
  voiceSearchQueries: string[];
  /** E-A-T signals: quantifiable expertise, authority, and trust statements for this service. */
  eatSignals: { label: string; value: string }[];
  /** 4 service-specific "at a glance" facts for the detail-page sidebar — tailored per service, never generic. */
  atAGlance: { label: string; value: string }[];
};

// ===== Site-wide E-A-T (Expertise, Authoritativeness, Trustworthiness) signals =====
// Used to surface trust signals on Home, About, and every service-detail page so
// content aligns with Google's E-E-A-T quality rater guidelines.
export type EatSignal = { label: string; value: string; icon: LucideIcon };

export const EAT_SIGNALS: EatSignal[] = [
  { label: "Years in operation", value: "Since 2019", icon: ShieldCheck },
  { label: "Production deployments", value: "120+ shipped", icon: Cpu },
  { label: "Clients served", value: "80+ in 14 countries", icon: Users },
  { label: "Avg client rating", value: "5.0 / 5.0", icon: Zap },
  { label: "Uptime SLA", value: "99.9%", icon: Cloud },
  { label: "Registered entity", value: "UK Ltd Co (Companies House)", icon: Building2 },
  { label: "Compliance", value: "GDPR · CCPA · SOC 2 Type II ready", icon: ShieldCheck },
  { label: "Response time", value: "Under 4 business hours", icon: MessageCircle },
];

export const TRUST_BADGES = [
  "GDPR Compliant",
  "SOC 2 Type II Ready",
  "UK Companies House",
  "AWS Partner",
  "Vercel Partner",
  "99.9% Uptime SLA",
  "Stripe Verified",
  "5.0 Client Rating",
];

type NavDropdownItem = {
  id: NavView;
  label: string;
  desc: string;
  icon: LucideIcon;
};

type NavItem =
  | { id: NavView; label: string; kind: "link" }
  | { id: "services"; label: string; kind: "mega" }
  | { id: "resources"; label: string; kind: "dropdown"; items: NavDropdownItem[] }
  | { id: "company"; label: string; kind: "dropdown"; items: NavDropdownItem[] };

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", kind: "link" },
  { id: "services", label: "Services", kind: "mega" },
  { id: "solutions", label: "Solutions", kind: "link" },
  {
    id: "resources",
    label: "Resources",
    kind: "dropdown",
    items: [
      { id: "portfolio", label: "Portfolio", desc: "12 live client deployments", icon: Briefcase },
      { id: "case-studies", label: "Case Studies", desc: "Real metrics from real engagements", icon: BarChart3 },
      { id: "blog", label: "Blog", desc: "Field notes on SEO, web & AI", icon: BookOpen },
      { id: "pricing", label: "Pricing", desc: "Starter · Growth · Scale · Custom", icon: Tag },
    ],
  },
  {
    id: "company",
    label: "Company",
    kind: "dropdown",
    items: [
      { id: "about", label: "About ClickTake", desc: "AI-native agency since 2019", icon: Building2 },
      { id: "team", label: "Our Team", desc: "28 people across 4 offices", icon: Users },
      { id: "careers", label: "Careers", desc: "Open roles across all practices", icon: Briefcase },
      { id: "connect", label: "Connect", desc: "Direct contact & social", icon: Heart },
      { id: "cities", label: "Cities We Serve", desc: "13 cities · 4 countries", icon: MapPin },
      { id: "contact", label: "Contact", desc: "Free 30-min consult", icon: Mail },
    ],
  },
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
  fullDescription: string[];
  requirements: string[];
};

export const JOBS: Job[] = [
  {
    slug: "senior-nextjs-engineer",
    title: "Senior Next.js Engineer",
    location: "Remote · UK / Pakistan",
    type: "Full-time",
    department: "Web & Software",
    desc: "Lead production Next.js 16 builds for enterprise clients. Own architecture, CI/CD, and mentor mid-level engineers across the UK and Pakistan delivery window.",
    fullDescription: [
      "As a Senior Next.js Engineer at ClickTake Technologies you will own end-to-end delivery of production Next.js 16 applications for clients across SaaS, fintech, ecommerce and healthcare. You will be the technical anchor for your pod — making architecture decisions on React Server Components, streaming, partial prerendering, edge runtime and caching strategies that ship to systems serving 10M+ requests a day.",
      "You will pair with a UK-based account lead who manages client communication and a Pakistan-based tech lead who runs delivery. Your code goes to production from week one — there is no shadow period, no toy project, and no \u201cbest-effort\u201d deploy path. Every PR is reviewed by another senior engineer, every release is gated by Playwright E2E, and every page is measured against Lighthouse 90+ and Core Web Vitals thresholds.",
      "This is a senior-first role: we hire engineers with 8+ years of production experience who have already shipped, scaled and operated real Next.js apps. You will mentor mid-level engineers through code review and pairing, but you will not be a full-time people manager — your job is to ship excellent software and lift the bar of everyone around you.",
    ],
    requirements: [
      "8+ years production web engineering; 4+ years deep in React and at least 2 years shipping Next.js 13/14/16 to production.",
      "Strong TypeScript, a working knowledge of Prisma/Postgres, and hands-on experience with edge runtimes and streaming.",
      "Comfortable owning CI/CD (GitHub Actions), observability (Sentry, PostHog) and E2E (Playwright) for your pod.",
      "Excellent asynchronous written English — you can write a clear ADR and a non-defensive PR review.",
      "Comfortable working across UK and Pakistan time zones (roughly 09:00–20:00 UK with core overlap 12:00–17:00 UK).",
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    location: "Remote · UK / Pakistan",
    type: "Full-time",
    department: "AI & Automation",
    desc: "Design and ship multi-agent systems, RAG pipelines, and custom LLM solutions with evals, guardrails and cost controls — built for production, not demos.",
    fullDescription: [
      "As an AI/ML Engineer at ClickTake Technologies you will design, build and operate production LLM systems for clients across regulated industries. Think RAG pipelines grounded in private corpora, multi-agent orchestration via LangGraph, fine-tuned models where they actually beat prompting, and eval harnesses that catch regressions before customers do.",
      "You will own the full lifecycle: scoping with the client, prototyping in a notebook, hardening into a typed FastAPI service, instrumenting with traces and evals, and operating it on call. We do not ship \u201cdemos\u201d — every AI system goes to production with cost ceilings, guardrails, human-in-loop fallbacks and a clear escalation path.",
      "This is a senior-first role. You have shipped at least one production LLM system that real users rely on, you understand the difference between an eval that flatters you and one that catches you, and you can explain — in plain English to a non-technical founder — why a particular model, retrieval strategy or agent pattern is the right call.",
    ],
    requirements: [
      "5+ years of software engineering, with at least 2 years hands-on production LLM/RAG/agent work.",
      "Deep familiarity with the OpenAI/Anthropic/Google SDKs, vector stores (pgvector, Pinecone, Qdrant), and LangGraph or a comparable orchestration framework.",
      "Strong Python and async patterns (FastAPI, Celery/arq, asyncio); TypeScript is a plus for client-side wiring.",
      "Experience designing evals — golden sets, LLM-as-judge, online evals — and turning them into CI gates.",
      "Comfortable owning cost controls, rate limits, prompt versioning and incident response for production AI systems.",
    ],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    location: "Birmingham, UK · Hybrid",
    type: "Full-time",
    department: "Digital Marketing",
    desc: "Drive technical, on-page and local SEO for clients across 4 continents. Own rankings, Core Web Vitals, structured data, and reporting that ties organic to revenue.",
    fullDescription: [
      "As an SEO Specialist at ClickTake Technologies you will own organic search performance for clients ranging from local Birmingham service businesses to Series-B SaaS platforms in Austin and ecommerce stores in Dubai. You will run the full SEO playbook: technical audits, on-page optimisation, internal linking, schema markup, content briefs, digital PR and link building, and local SEO for the map pack.",
      "You will not be a one-person \u201cdo everything\u201d generalist. You will work alongside content strategists, developers (who actually ship your technical recommendations), paid media specialists and designers — so your SEO work compounds instead of stalling in a Jira queue. Your reporting will tie organic rankings and traffic to leads, pipeline and revenue, not just impressions.",
      "This role is hybrid from our Birmingham HQ — two to three days in the office, the rest remote. You will be the organic search owner for a portfolio of 6–10 clients and will report directly into the Head of Growth.",
    ],
    requirements: [
      "4+ years of SEO experience, ideally across both B2B SaaS and local/service-area or ecommerce verticals.",
      "Hands-on with the usual stack: Search Console, GA4, Ahrefs/Semrush, Screaming Frog, Looker Studio, Looker.",
      "Comfortable writing content briefs, auditing JavaScript-rendered sites, and briefing developers on technical fixes that will actually get shipped.",
      "Strong written English — you can write a meta description that reads like a human wrote it, and a strategy deck that a CFO can follow.",
      "Experience with local SEO (GBP optimisation, citations, review strategy) and international SEO (hreflang, multi-region) is a strong plus.",
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    location: "Dubai, UAE · Hybrid",
    type: "Full-time",
    department: "Creative & Brand",
    desc: "Craft brand identities, marketing creatives and web design systems for clients across the UK, US and MENA — premium craft, on deadline.",
    fullDescription: [
      "As a Graphic Designer at ClickTake Technologies you will lead brand identity, marketing collateral and design system work for clients across the UK, US, and MENA regions. You will own the visual expression of a brand from logo system through to social templates, ad creatives, pitch decks and website UI — and hand off clean, documented Figma files that engineers can build from without twenty rounds of clarification.",
      "You will sit inside the Creative & Brand pod alongside a creative director, motion designer and copywriter, and collaborate closely with the web engineering pod on every production build. We are senior-first: you have shipped real brand work for real clients and you understand the difference between a portfolio piece and a deliverable that survives six rounds of stakeholder feedback.",
      "This role is hybrid from our Dubai (MENA) office — three days in the office, the rest remote. Travel to client kickoffs in the GCC region is expected roughly once per quarter.",
    ],
    requirements: [
      "5+ years of professional graphic/brand design experience with a portfolio showing end-to-end brand identity work (not just social posts).",
      "Expert-level Figma — design systems, components, auto-layout, variables, and clean dev handoff.",
      "Strong understanding of accessibility, responsive behaviour, and how your designs will be built in code.",
      "Comfortable presenting and defending design decisions to non-designer founders and stakeholders.",
      "Bonus: motion design (After Effects, Lottie), illustration, or front-end (HTML/CSS/React) literacy.",
    ],
  },
  {
    slug: "frontend-engineer-intern",
    title: "Frontend Engineer Intern",
    location: "Multan, Pakistan · On-site",
    type: "Internship",
    department: "Web & Software",
    desc: "Learn production Next.js, React and TypeScript alongside senior engineers. Paid, 3-month rotational program with a clear path to a full-time junior role.",
    fullDescription: [
      "Our Frontend Engineer Internship is a paid, 3-month rotational program based on-site at our Multan engineering hub. You will work alongside senior engineers (8+ years) on real production Next.js 16 codebases — not a sandbox, not a tutorial, not \u201cintern projects\u201d that nobody uses. From week two you will be shipping PRs that go to production for paying clients.",
      "The program rotates you through three pods — web & software, AI & automation, and creative & brand — so you finish the internship with a working sense of how a real digital agency operates end-to-end. You will be paired with a dedicated mentor who reviews every PR, runs a weekly 1:1, and helps you build a portfolio you can take anywhere.",
      "Strong interns are offered a full-time Junior Frontend Engineer role at the end of the 3 months — historically about 70% of our interns have converted. This is the only junior-level role we hire for: every other engineering role at ClickTake is senior-first.",
    ],
    requirements: [
      "Final-year student or recent graduate in Computer Science, Software Engineering, or a related field — or a self-taught developer with a real portfolio.",
      "Solid HTML, CSS and JavaScript fundamentals; some React exposure (course, personal project or internship).",
      "Comfortable with Git and the command line; familiarity with TypeScript is a strong plus.",
      "On-site in Multan, Pakistan — this is not a remote internship. You must be able to commute daily.",
      "Curious, humble, and comfortable asking questions — we are senior-first precisely so juniors can learn fast in a low-blame environment.",
    ],
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
export const BRAND_TAGLINE = "Connecting in a better way";

export const OFFICES = [
  { city: "Birmingham", country: "United Kingdom", flag: "🇬🇧", role: "UK HQ" },
  { city: "Multan", country: "Pakistan", flag: "🇵🇰", role: "Engineering hub" },
  { city: "Austin, TX", country: "United States", flag: "🇺🇸", role: "US business desk" },
  { city: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", role: "MENA office" },
];

// ===== LOCAL SEO (city-wise optimization for local ranking) =====
// Each city carries local-intent keywords and a human-toned SEO paragraph
// that helps the page rank for "{service} in {city}" and "{service} near me"
// queries in that region.
export type CitySeo = {
  slug: string;
  name: string;
  region: string;
  keywords: string[];
  // Human-toned local paragraph — uses city name + service intent naturally.
  localIntro: string;
};

export const CITY_SEO: Record<string, CitySeo> = {
  birmingham: {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands, UK",
    keywords: [
      "web design Birmingham",
      "SEO agency Birmingham",
      "AI automation Birmingham",
      "software development Birmingham UK",
      "digital marketing agency Birmingham",
    ],
    localIntro:
      "Looking for a web design or SEO agency in Birmingham? ClickTake Technologies is headquartered in the West Midlands and has shipped 120+ production websites, SaaS platforms and AI automations for Birmingham businesses — from local service-area companies in Solihull and Sutton Coldfield to fintech startups in the city centre. We combine UK business-hours coverage with an extended Pakistan delivery window, so your Birmingham project moves 18 hours a day.",
  },
  london: {
    slug: "london",
    name: "London",
    region: "Greater London, UK",
    keywords: [
      "web development London",
      "SEO services London",
      "AI agency London",
      "SaaS development London",
      "digital agency London",
    ],
    localIntro:
      "Need a digital agency in London that actually ships? ClickTake serves London fintech, ecommerce and SaaS scale-ups with production-grade Next.js builds, multi-agent AI systems and paid-media management — all from a UK-registered Ltd Co that understands the London market, GDPR and the speed your investors expect.",
  },
  manchester: {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester, UK",
    keywords: [
      "web design Manchester",
      "SEO Manchester",
      "SaaS agency Manchester",
      "digital marketing Manchester",
    ],
    localIntro:
      "Manchester's tech corridor runs on fast, modern web platforms. ClickTake builds SaaS products, runs SEO and paid media, and ships AI automations for Manchester brands — from Spinningfields agencies to Northern Quarter startups. Local intent, senior engineers, UK invoicing.",
  },
  leeds: {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire, UK",
    keywords: [
      "web design Leeds",
      "local SEO Leeds",
      "repair shop software Leeds",
      "ecommerce Leeds",
    ],
    localIntro:
      "From local SEO that wins the Leeds pack to WooCommerce repair-shop sites with live checkout, ClickTake helps West Yorkshire businesses turn searches into walk-ins and sales. Senior engineers, fast launch, UK Ltd Co invoicing.",
  },
  austin: {
    slug: "austin",
    name: "Austin",
    region: "Texas, USA",
    keywords: [
      "web development Austin",
      "SaaS agency Austin TX",
      "AI automation Austin",
      "SEO Austin Texas",
    ],
    localIntro:
      "Austin's SaaS and AI scene moves fast. ClickTake's US business desk in Austin ships SaaS growth channels, AI automation and full-stack Next.js builds for Texas startups — with UK + Pakistan delivery coverage that keeps your roadmap moving 18 hours a day.",
  },
  "new-york": {
    slug: "new-york",
    name: "New York",
    region: "New York, USA",
    keywords: [
      "web development New York",
      "AI agency NYC",
      "fintech development New York",
      "SEO New York",
    ],
    localIntro:
      "New York fintech, media and enterprise clients work with ClickTake for production AI, headless commerce and AI-native product engineering — delivered with SOC 2-aligned practices and the pace the East Coast demands.",
  },
  "san-francisco": {
    slug: "san-francisco",
    name: "San Francisco",
    region: "California, USA",
    keywords: [
      "SaaS development San Francisco",
      "AI agency San Francisco",
      "LLM engineering Bay Area",
      "SEO San Francisco",
    ],
    localIntro:
      "Series A to Series C SaaS and AI-native startups in the Bay Area ship with ClickTake for multi-agent orchestration, RAG pipelines and production Next.js — the kind of engineering your investors expect, at a fraction of Bay Area rates.",
  },
  dubai: {
    slug: "dubai",
    name: "Dubai",
    region: "United Arab Emirates",
    keywords: [
      "web design Dubai",
      "SEO agency Dubai",
      "AI agency Dubai UAE",
      "digital marketing Dubai",
      "software development Dubai",
    ],
    localIntro:
      "Launching in Dubai or the wider GCC? ClickTake's MENA office in Dubai handles market entry, bilingual web design, SEO and AI automation for UAE businesses — with local cultural fluency and an engineering team that ships to 10M+ requests a day.",
  },
  "abu-dhabi": {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    region: "United Arab Emirates",
    keywords: [
      "web development Abu Dhabi",
      "government software Abu Dhabi",
      "SEO Abu Dhabi",
      "AI automation Abu Dhabi",
    ],
    localIntro:
      "Abu Dhabi's government, healthcare and enterprise sectors work with ClickTake for secure, compliant web platforms, AI automation and SEO — engineered to GCC regulatory standards from our Dubai MENA office.",
  },
  multan: {
    slug: "multan",
    name: "Multan",
    region: "Punjab, Pakistan",
    keywords: [
      "software house Multan",
      "web development Multan",
      "AI engineering Multan Pakistan",
      "SEO Multan",
    ],
    localIntro:
      "ClickTake's engineering hub in Multan is where 12 senior full-stack and AI engineers ship production Next.js, Python and LangGraph systems for clients across 4 continents — giving every engagement 18-hour workday coverage.",
  },
  lahore: {
    slug: "lahore",
    name: "Lahore",
    region: "Punjab, Pakistan",
    keywords: [
      "software house Lahore",
      "web development Lahore",
      "SaaS development Lahore",
      "AI agency Lahore",
    ],
    localIntro:
      "Lahore's full-stack and AI engineering talent powers ClickTake's delivery — from SaaS platforms to multi-agent systems. Senior engineers, English-fluent, working UK business hours.",
  },
  karachi: {
    slug: "karachi",
    name: "Karachi",
    region: "Sindh, Pakistan",
    keywords: [
      "digital marketing agency Karachi",
      "SEO Karachi",
      "creative agency Karachi",
      "web design Karachi",
    ],
    localIntro:
      "ClickTake's digital marketing, SEO and creative production teams in Karachi run paid media, content strategy and brand systems for clients across the UK, US and UAE — English-native copy, senior strategists, 18-hour coverage.",
  },
  islamabad: {
    slug: "islamabad",
    name: "Islamabad",
    region: "Islamabad Capital Territory, Pakistan",
    keywords: [
      "software house Islamabad",
      "SaaS development Islamabad",
      "cloud DevOps Islamabad",
      "web development Islamabad",
    ],
    localIntro:
      "Islamabad-based SaaS engineering and cloud DevOps talent powers ClickTake's enterprise engagements — Terraform IaC, Kubernetes autoscaling and p99 120ms SLAs delivered from Pakistan's capital.",
  },
};

// Local-intent keyword clusters reused across hero & section copy.
export const LOCAL_KEYWORDS = [
  "web design services",
  "SEO services",
  "AI automation agency",
  "custom software development",
  "digital marketing agency",
  "WordPress web design services",
  "ecommerce web design services",
  "small business web design",
  "responsive web design services",
  "AI chatbot development",
  "SaaS platform engineering",
  "PPC paid ads management",
  "social media marketing",
  "graphic design services",
  "B2B video production",
];

// Human-toned trust strip used under hero sections on every page for local SEO.
export const LOCAL_TRUST = [
  { label: "UK Ltd Co · GDPR compliant", icon: ShieldCheck },
  { label: "4 offices · 13 cities served", icon: MapPin },
  { label: "Senior engineers (8+ yrs avg)", icon: Users },
  { label: "120+ production deployments", icon: Code2 },
];

// Per-view SEO meta description + target keywords (used for <meta> + JSON-LD).
export const VIEW_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  home: {
    title: "ClickTake Technologies — AI-Native Software Engineering & Digital Agency",
    description:
      "ClickTake Technologies is an AI-native digital agency engineering custom software, autonomous AI agents, cloud architecture, SEO and creative for businesses across the UK, USA, UAE & Pakistan. 24 services, 4 offices, 120+ deployments. Connecting in a better way.",
    keywords: [
      "AI agency", "software development agency", "web design services", "SEO services",
      "AI automation", "digital agency UK", "SaaS development", "custom software",
    ],
  },
  services: {
    title: "Services — 24 Digital, Web, AI & Marketing Services | ClickTake",
    description:
      "Explore 24 services across 4 practices: Digital Marketing (PPC, SEO, social), Web & Software (full-stack, SaaS, WordPress, ecommerce), AI & Automation (LLMs, chatbots, agents), and Creative & Brand. Senior engineers ship in 6 weeks.",
    keywords: [
      "web design services", "SEO services", "AI automation", "SaaS development",
      "WordPress web design", "ecommerce web design", "AI chatbot development",
    ],
  },
  solutions: {
    title: "Solutions by Industry — Startups, E-commerce, Local & UK Businesses",
    description:
      "Tailored solutions for startups, local businesses, ecommerce brands, repair shops, UK SMEs and agencies. Fixed-scope, fixed-timeline engagements with measurable outcomes — local SEO, web design and AI built for your business type.",
    keywords: [
      "startup web design", "local business SEO", "ecommerce development",
      "repair shop software", "UK digital agency", "white-label agency",
    ],
  },
  "case-studies": {
    title: "Case Studies — Real Clients, Real Metrics | ClickTake",
    description:
      "Four production case studies with verified metrics: -72% API latency, +38% checkout conversion, -$1.4M cloud cost, -31% empty fleet miles. Real engagements from fintech, ecommerce, healthcare and logistics.",
    keywords: ["case studies", "AI case study", "SEO results", "web development results"],
  },
  portfolio: {
    title: "Portfolio — 12 Live Client Sites | ClickTake Technologies",
    description:
      "Twelve live client deployments built and maintained by ClickTake — SaaS platforms, repair-shop commerce sites and education portals across the UK and globally. Every link is a real production site, not a mockup.",
    keywords: ["portfolio", "web design portfolio", "SaaS portfolio", "client websites"],
  },
  blog: {
    title: "Blog — SEO, Web Dev, AI & Marketing Field Notes | ClickTake",
    description:
      "Practical, no-fluff articles on SEO, web development, AI automation, ecommerce and growth marketing — written by the engineers, marketers and designers who ship this work for clients across the UK, USA, UAE & Pakistan.",
    keywords: ["SEO blog", "AI automation blog", "web development blog", "digital marketing blog"],
  },
  pricing: {
    title: "Pricing — Starter · Growth · Scale · Custom | ClickTake",
    description:
      "Transparent pricing across four engagement tiers from £1,500 one-off to custom enterprise retainers. No fake universal packages — every project is scoped in a free 30-min call. UK Ltd Co, GDPR invoicing.",
    keywords: ["web design pricing", "SEO pricing", "AI automation cost", "SaaS development pricing"],
  },
  about: {
    title: "About — AI Digital Agency Since 2019 | ClickTake Technologies",
    description:
      "ClickTake Technologies is a multi-region AI-native digital agency founded in 2019, operating across Birmingham, Multan, Austin and Dubai. 120+ projects, 80+ clients in 14 countries, 5.0 avg rating.",
    keywords: ["about digital agency", "AI agency UK", "software company Birmingham", "digital agency Pakistan"],
  },
  team: {
    title: "Our Team — 28 People Across 4 Offices | ClickTake Technologies",
    description:
      "28 senior engineers, marketers and designers across Birmingham, Multan, Austin and Dubai — coordinated as one engineering organization with 18-hour workday coverage on every engagement.",
    keywords: ["agency team", "software engineering team", "AI engineers", "digital marketing team"],
  },
  careers: {
    title: "Careers — Join ClickTake Technologies",
    description:
      "Remote-first, senior-first engineering roles across web, AI, SEO and creative. Open positions for senior Next.js engineers, AI/ML engineers, SEO specialists and designers. 4 offices, 18-hour workdays.",
    keywords: ["digital agency jobs", "software engineer jobs", "AI engineer careers", "SEO jobs"],
  },
  cities: {
    title: "Cities We Serve — 13 Cities, 4 Countries | ClickTake",
    description:
      "ClickTake serves 13 cities across the UK, USA, UAE and Pakistan — Birmingham, London, Manchester, Leeds, Austin, New York, San Francisco, Dubai, Abu Dhabi, Multan, Lahore, Karachi and Islamabad. Local presence, global delivery.",
    keywords: [
      "web design Birmingham", "web design London", "web design Dubai",
      "SEO Austin", "software house Multan", "digital agency near me",
    ],
  },
  connect: {
    title: "Connect — Direct Contact & Social | ClickTake Technologies",
    description:
      "Reach ClickTake by email, phone, WhatsApp or social. We respond within 4 business hours. info@clicktaketech.com · +44 7391 653377 · 4 offices worldwide.",
    keywords: ["contact digital agency", "web design contact", "AI agency contact"],
  },
  contact: {
    title: "Contact — Free 30-min Consult | ClickTake Technologies",
    description:
      "Book a free 30-minute consultation. A senior engineer (not a salesperson) reviews your brief within 4 hours and brings a draft architecture. 3-step form, no commitment.",
    keywords: ["free consultation", "web design quote", "SEO consultation", "AI project quote"],
  },
};

export const CONTACT_METHODS = [
  { icon: Mail, label: "Email", value: "info@clicktaketech.com", href: "mailto:info@clicktaketech.com" },
  { icon: Phone, label: "United Kingdom", value: "+44 7391 653377", href: "tel:+447391653377" },
  { icon: Phone, label: "Pakistan", value: "+92 306 9753003", href: "tel:+923069753003" },
  { icon: MessageCircle, label: "WhatsApp", value: "+44 7391 653377", href: "https://wa.me/447391653377" },
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

// ===== BLOG =====
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body?: string; // full blog post content (markdown)
  date: string;
  readTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "blog-7-best-ai-chatbots-for-capturing-website-leads-2026",
    title: "7 Best AI Chatbots for Capturing Website Leads (2026)",
    category: "AI Automation",
    excerpt:
      "If you're asking what is the best AI chatbot for capturing leads on a website, the answer depends on something most buying guides skip entirely: whether the bot actually qualifies prospects or merely collects their contact details.",
    date: "5 Aug 2026",
    readTime: "14 min",
  },
  {
    slug: "blog-7-social-media-content-types-that-actually-drive-sales",
    title: "7 social media content types that actually drive sales",
    category: "Digital Marketing",
    excerpt:
      "Most brands measure social media performance by likes, shares, and follower growth. These metrics feel meaningful; they're easy to report, and they generate the kind of positive momentum that keeps stakeholders happy in a monthly review.",
    date: "27 Jul 2026",
    readTime: "11 min",
  },
  {
    slug: "blog-ai-automations-that-actually-work-for-small-businesses",
    title: "AI Automations That Actually Work for Small Businesses",
    category: "AI Automation",
    excerpt:
      "If you're wondering what AI automations actually work for small businesses, you're not alone — and the answer is more straightforward than most vendors make it sound.",
    date: "18 Jul 2026",
    readTime: "12 min",
  },
  {
    slug: "blog-ai-business-automation-what-actually-works-for-smes",
    title: "AI business automation: what actually works for SMEs",
    category: "AI Automation",
    excerpt:
      "A practical breakdown of the AI automations that deliver real ROI for small and medium enterprises — and the ones that are smoke and mirrors.",
    date: "10 Jul 2026",
    readTime: "13 min",
  },
  {
    slug: "blog-how-to-build-a-social-media-content-strategy-in-2026",
    title: "How to build a social media content strategy in 2026",
    category: "Digital Marketing",
    excerpt:
      "A repeatable framework for building a social media content strategy that compounds — from audience research to editorial calendar to measurement.",
    date: "2 Jul 2026",
    readTime: "15 min",
  },
  {
    slug: "blog-leading-platforms-for-website-user-behavior-analytics-in-2026",
    title: "Leading Platforms for Website User Behavior Analytics in 2026",
    category: "Web",
    excerpt:
      "A technical comparison of the leading user behavior analytics platforms — PostHog, FullStory, Hotjar, Microsoft Clarity — and when to pick each.",
    date: "24 Jun 2026",
    readTime: "16 min",
  },
  {
    slug: "blog-next-js-pagespeed-optimisation-how-to-hit-90-scores",
    title: "Next.js PageSpeed optimisation: how to hit 90+ scores",
    category: "Web",
    excerpt:
      "The exact performance patterns we use to ship Next.js 16 apps that hit 90+ Lighthouse scores — from RSC to image optimization to edge caching.",
    date: "16 Jun 2026",
    readTime: "13 min",
  },
  {
    slug: "blog-seo-audit-checklist-25-steps-to-rank-higher-in-2026",
    title: "SEO Audit Checklist: 25 Steps to Rank Higher in 2026",
    category: "SEO",
    excerpt:
      "The exact 25-step technical SEO audit we run on every new engagement — covering crawlability, indexation, Core Web Vitals, structured data, and content gaps.",
    date: "8 Jun 2026",
    readTime: "20 min",
  },
  {
    slug: "blog-social-media-for-ecommerce-turning-views-into-sales",
    title: "Social media for ecommerce: turning views into sales",
    category: "Ecommerce",
    excerpt:
      "How D2C brands turn social media views into actual sales — the content formats, funnel design, and attribution models that work in 2026.",
    date: "1 Jun 2026",
    readTime: "12 min",
  },
  // ===== Service-led SEO blog posts (1 per service, 24 total) =====
  // Digital Marketing services
  {
    slug: "blog-ppc-paid-ads-that-actually-convert-in-2026",
    title: "PPC Paid Ads That Actually Convert in 2026 — A Founder's Field Guide",
    category: "Digital Marketing",
    excerpt:
      "PPC paid ads still drive the fastest pipeline of any digital channel — but only when you optimise for ROAS, not clicks. This guide breaks down the exact full-funnel setup, conversion tracking and creative testing loop we use to ship profitable Google, Meta and LinkedIn campaigns for SaaS and ecommerce clients across four continents. Book a free scoping call and we'll audit your account in 30 minutes flat.",
    date: "28 May 2026",
    readTime: "11 min",
  },
  {
    slug: "blog-content-strategy-seo-that-compounds-traffic",
    title: "Content Strategy & SEO: How to Build a Topical Authority Engine That Compounds",
    category: "Digital Marketing",
    excerpt:
      "A real content strategy & SEO programme does not chase keywords — it builds topical authority that compounds month over month. We break down how we map topic clusters, design editorial calendars and wire in on-page SEO so organic traffic grows on itself, not in spikes. Book a free scoping call and we'll show you the cluster map we'd build for your site.",
    date: "24 May 2026",
    readTime: "10 min",
  },
  {
    slug: "blog-conversion-rate-optimization-case-study-25-percent-lift",
    title: "Conversion Rate Optimization Case Study: How We Lifted Checkout CVR by 38%",
    category: "Digital Marketing",
    excerpt:
      "Conversion rate optimization is the cheapest pipeline lever most teams underuse — and this case study shows exactly how we lifted a UK retailer's checkout CVR by 38% with five A/B tests, not a rebuild. We cover the funnel analysis, hypothesis tree, and heatmap findings that drove the lift. Book a free scoping call to get the same teardown on your funnel.",
    date: "20 May 2026",
    readTime: "9 min",
  },
  {
    slug: "blog-seo-services-for-local-businesses-the-complete-checklist",
    title: "SEO Services for Local Businesses: The Complete 2026 Checklist",
    category: "SEO",
    excerpt:
      "SEO services for local businesses live or die on the map pack — and the rules changed again in 2026. This 24-point checklist covers Google Business Profile optimisation, citations, review velocity, on-page local SEO and Core Web Vitals for service-area businesses across the UK and US. Book a free scoping call and we'll run the checklist against your business live.",
    date: "16 May 2026",
    readTime: "12 min",
  },
  {
    slug: "blog-social-media-marketing-mistakes-killing-your-roi",
    title: "7 Social Media Marketing Mistakes Killing Your ROI (and How to Fix Them)",
    category: "Digital Marketing",
    excerpt:
      "Social media marketing is where most SME budgets quietly leak — seven common mistakes account for 80% of the underperformance we see in audits. From vanity KPIs to broken attribution to creator-fatigue, here is what to fix first to turn your social spend into revenue. Book a free scoping call and we'll tell you which of the seven you're making.",
    date: "12 May 2026",
    readTime: "8 min",
  },
  {
    slug: "blog-seo-web-design-services-build-rankings-from-day-one",
    title: "SEO Web Design Services: How to Build Sites That Rank From Launch Day",
    category: "SEO",
    excerpt:
      "Most websites are retrofitted for SEO after launch — SEO web design services flip that, engineering indexability, schema and Core Web Vitals into the build from the first commit. Here is the exact pre-launch SEO checklist we run on every new build, plus the architecture choices that keep you ranking. Book a free scoping call and we'll spec your SEO-first build.",
    date: "8 May 2026",
    readTime: "10 min",
  },
  // Web & Software services
  {
    slug: "blog-full-stack-web-development-architecture-decisions-2026",
    title: "Full-Stack Web Development in 2026: 6 Architecture Decisions We Got Right",
    category: "Web",
    excerpt:
      "Full-stack web development in 2026 lives or dies on a handful of architecture calls — RSC vs client, edge vs node, monorepo vs polyrepo, and where the auth boundary sits. Here are six decisions we made on production Next.js 16 builds this year, what worked, and what we'd undo. Book a free scoping call and we'll walk you through the right calls for your stack.",
    date: "4 May 2026",
    readTime: "11 min",
  },
  {
    slug: "blog-saas-platform-engineering-multi-tenancy-patterns",
    title: "SaaS Platform Engineering: Multi-Tenancy Patterns That Scale to 100K Tenants",
    category: "Web",
    excerpt:
      "SaaS platform engineering is mostly about getting multi-tenancy right before you have to migrate 100K tenants — and getting it wrong is expensive. We compare shared-database, schema-per-tenant and database-per-tenant patterns, with the billing, RBAC and usage metering each one enables. Book a free scoping call and we'll tell you which pattern fits your SaaS.",
    date: "30 Apr 2026",
    readTime: "12 min",
  },
  {
    slug: "blog-auth-identity-passkeys-sso-zero-trust",
    title: "Auth & Identity in 2026: Passkeys, SSO, and Zero-Trust Sessions Explained",
    category: "Web",
    excerpt:
      "Auth & identity is the part of your stack attackers care about most — and most teams are still shipping 2018-era sessions. We explain how passkeys, SSO/SAML and zero-trust session handling fit together in a modern Next.js app, and what to do about the OAuth + cookie trade-offs. Book a free scoping call and we'll audit your auth posture in 30 minutes.",
    date: "26 Apr 2026",
    readTime: "9 min",
  },
  {
    slug: "blog-python-backend-apis-fastapi-vs-django-2026",
    title: "Python Backend APIs: FastAPI vs Django in 2026 — When to Pick Each",
    category: "Web",
    excerpt:
      "Python backend APIs power most of the AI, automation and data-heavy work we ship — and the FastAPI vs Django debate is more nuanced than Twitter admits. We compare them on async ergonomics, ORM, type safety, OpenAPI docs and team velocity, with a decision tree for greenfield SaaS vs internal tooling. Book a free scoping call and we'll tell you which fits your project.",
    date: "22 Apr 2026",
    readTime: "10 min",
  },
  {
    slug: "blog-wordpress-web-design-services-when-to-go-headless",
    title: "WordPress Web Design Services in 2026: When to Go Headless (and When Not To)",
    category: "Web",
    excerpt:
      "WordPress web design services still ship 40% of the web — but the headless WP conversation is loud and often wrong. We break down the real performance, SEO and editor-experience trade-offs of going headless, plus three concrete cases where vanilla WordPress + ACF is still the right answer. Book a free scoping call and we'll tell you which path fits your site.",
    date: "18 Apr 2026",
    readTime: "8 min",
  },
  {
    slug: "blog-ecommerce-web-design-services-headless-shopify-vs-medusa",
    title: "Ecommerce Web Design Services: Headless Shopify vs Medusa — A Real Comparison",
    category: "Ecommerce",
    excerpt:
      "Ecommerce web design services in 2026 are mostly a fight between headless Shopify and Medusa — and the right call depends on your checkout, catalog and roadmap. We compare them on LCP, total cost, customisation and developer velocity, with the specific use cases where each one wins. Book a free scoping call and we'll spec your commerce build.",
    date: "14 Apr 2026",
    readTime: "11 min",
  },
  // AI & Automation services
  {
    slug: "blog-custom-llm-solutions-rag-vs-fine-tuning",
    title: "Custom LLM Solutions: RAG vs Fine-Tuning — What Actually Works in Production",
    category: "AI Automation",
    excerpt:
      "Custom LLM solutions are not a religion — RAG and fine-tuning solve different problems and the wrong choice will burn six figures before you notice. We explain when to RAG, when to fine-tune, when to do both, and how to set up the eval harness that tells you which is winning. Book a free scoping call and we'll design the LLM architecture for your data.",
    date: "10 Apr 2026",
    readTime: "12 min",
  },
  {
    slug: "blog-ai-chatbots-assistants-that-actually-qualify-leads",
    title: "AI Chatbots & Assistants That Actually Qualify Leads (Not Just Collect Emails)",
    category: "AI Automation",
    excerpt:
      "Most AI chatbots & assistants on websites today collect emails and annoy buyers — the difference between that and a bot that actually qualifies leads is tool-use, memory and handoff design. Here is the qualification tree we deploy, the guardrails that stop hallucinations, and the analytics that prove ROI to the CFO. Book a free scoping call and we'll spec your lead-qualifying bot.",
    date: "6 Apr 2026",
    readTime: "10 min",
  },
  {
    slug: "blog-prompt-engineering-at-scale-versioning-and-evals",
    title: "Prompt Engineering at Scale: Versioning, Evals, and Cost Control",
    category: "AI Automation",
    excerpt:
      "Prompt engineering at scale stops being cute the moment 100K users hit your LLM — version drift, eval regressions and cost spikes eat your margin. We share the prompt-versioning workflow, the eval-suite anatomy and the cost-control playbook we run on production LLM systems every week. Book a free scoping call and we'll set up the same loop on your LLM stack.",
    date: "2 Apr 2026",
    readTime: "9 min",
  },
  {
    slug: "blog-computer-vision-nlp-document-automation-case-study",
    title: "Computer Vision & NLP Case Study: Automating Invoice Processing for a UK Logistics Firm",
    category: "AI Automation",
    excerpt:
      "Computer vision & NLP stop being research and start being ROI when you can cut 30 hours a week of manual invoice processing — which is exactly what we did for a Birmingham logistics firm. We cover the OCR pipeline, the document-classification model, and the human-in-loop fallback that made it shippable. Book a free scoping call and we'll scope the same automation for your ops team.",
    date: "29 Mar 2026",
    readTime: "11 min",
  },
  {
    slug: "blog-ai-automation-roi-calculator-30-hours-saved",
    title: "AI Automation ROI: How to Calculate Before You Build (30+ Hours/Week Saved)",
    category: "AI Automation",
    excerpt:
      "AI automation projects fail because no one ran the ROI math before building. We share the simple four-line ROI calculator we use on every scoping call — hours saved, error rate reduced, revenue lifted, cost avoided — with real numbers from a 30-hour-per-week finance-ops automation. Book a free scoping call and we'll run the calculator on your workflow live.",
    date: "25 Mar 2026",
    readTime: "7 min",
  },
  {
    slug: "blog-ai-agent-development-multi-agent-langgraph-production",
    title: "AI Agent Development: Shipping Multi-Agent Systems to Production with LangGraph",
    category: "AI Automation",
    excerpt:
      "AI agent development crossed the production line in 2026 — multi-agent systems built on LangGraph now run real workloads with planning, memory and tool-use. We walk through the architecture of a production agent we shipped for a UK client, including the eval gates, the guardrails and the human-in-loop fallback. Book a free scoping call and we'll scope the agent for your use case.",
    date: "21 Mar 2026",
    readTime: "12 min",
  },
  // Creative & Brand services
  {
    slug: "blog-graphic-design-brand-identity-that-converts",
    title: "Graphic Design for Brands: Building an Identity System That Actually Converts",
    category: "Creative",
    excerpt:
      "Great graphic design is not decoration — a brand identity system that converts is built around a clear visual hierarchy, a defensible colour system and component reuse across every touchpoint. We break down the brand-identity-to-conversion pipeline we run for UK, US and MENA clients, and the test that proves it worked. Book a free scoping call and we'll spec your brand identity build.",
    date: "17 Mar 2026",
    readTime: "8 min",
  },
  {
    slug: "blog-professional-web-design-services-ux-research-process",
    title: "Professional Web Design Services: Our UX Research Process in 8 Steps",
    category: "Web",
    excerpt:
      "Professional web design services without UX research is just decoration — the design that converts starts with user interviews, journey maps and competitive teardowns. Here is the exact 8-step UX research process we run on every professional web design engagement, from kickoff to validated Figma prototype. Book a free scoping call and we'll run the first three steps on your audience.",
    date: "13 Mar 2026",
    readTime: "10 min",
  },
  {
    slug: "blog-b2b-video-production-explainer-videos-that-sell",
    title: "B2B Video Production: Explainer Videos That Actually Drive Pipeline",
    category: "Creative",
    excerpt:
      "B2B video production is not about cameras — it is about scripting an explainer that moves a CFO from \u201cwhat is this\u201d to \u201csend me a proposal\u201d in 90 seconds. We share the script structure, the storyboard discipline and the distribution plan that turns a 5K video into 500K pipeline. Book a free scoping call and we'll storyboard your first explainer.",
    date: "9 Mar 2026",
    readTime: "9 min",
  },
  {
    slug: "blog-web-design-services-design-system-handoff-developers",
    title: "Web Design Services: How We Hand Off Design Systems to Developers (Without 20 Rounds)",
    category: "Web",
    excerpt:
      "Web design services live or die on the design-to-developer handoff — most agencies ship Figma chaos and call it a system. We share the design-system structure, token naming and component contract we use to hand off cleanly, so the build round-trips in three rounds not twenty. Book a free scoping call and we'll audit your existing design-to-dev handoff.",
    date: "5 Mar 2026",
    readTime: "8 min",
  },
  {
    slug: "blog-small-business-web-design-services-launch-in-3-weeks",
    title: "Small Business Web Design Services: How to Launch in 3 Weeks (Without Looking Cheap)",
    category: "Web",
    excerpt:
      "Small business web design services do not have to mean slow, bloated or cheap — you can launch a local-SEO-ready, conversion-focused site in three weeks if you scope like a senior. Here is the exact 21-day timeline, the page list and the CMS setup we use for local service businesses across the Midlands. Book a free scoping call and we'll start your three-week clock.",
    date: "1 Mar 2026",
    readTime: "7 min",
  },
  {
    slug: "blog-responsive-web-design-services-no-cls-checklist",
    title: "Responsive Web Design Services: The No-CLS, Mobile-First Checklist for 2026",
    category: "Web",
    excerpt:
      "Responsive web design services in 2026 are about more than breakpoints — Google's interaction metrics now penalise layout shift, slow LCP and poor tap-targets on mobile. Here is the no-CLS, mobile-first, WCAG 2.2 AA checklist we ship on every responsive build, with the Lighthouse scores you should expect. Book a free scoping call and we'll run the checklist on your site live.",
    date: "25 Feb 2026",
    readTime: "9 min",
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "AI Automation",
  "Digital Marketing",
  "SEO",
  "Web",
  "Ecommerce",
  "Creative",
];

// ===== PRICING =====
export type PricingTier = {
  name: string;
  tagline: string;
  audience: string;
  price: string;
  cadence: string;
  popular?: boolean;
  features: string[];
  notIncluded: string[];
  cta: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    tagline: "For new founders & local businesses",
    audience: "From £1,500",
    price: "£1,500",
    cadence: "one-off project",
    cta: "Start with Starter",
    features: [
      "Up to 5-page mobile-first Next.js website",
      "Google Business Profile setup + optimization",
      "Foundational on-page SEO (titles, meta, schema, sitemap)",
      "Contact form with spam protection + email notifications",
      "SSL, CDN, analytics and Search Console setup",
      "Domain + 1 year managed hosting",
      "2 rounds of revisions",
      "14-day post-launch support",
    ],
    notIncluded: ["AI chatbot or automation", "Ongoing monthly SEO", "Paid media management"],
  },
  {
    name: "Growth",
    tagline: "For scaling brands & e-commerce stores",
    audience: "From £6,000",
    price: "£6,000",
    cadence: "one-off + monthly retainer",
    popular: true,
    cta: "Start with Growth",
    features: [
      "Production-ready website or e-commerce rebuild",
      "Headless commerce (Shopify / Medusa) with 1.5s LCP",
      "AI automation (chatbot, lead scoring, or workflow)",
      "Ongoing monthly SEO (technical + content)",
      "Paid media management (Google + Meta)",
      "Conversion rate optimization (A/B testing)",
      "Design system in Storybook + Playwright E2E",
      "Weekly demos + 30-day post-launch hypercare",
    ],
    notIncluded: ["Multi-agent orchestration", "Custom LLM fine-tuning"],
  },
  {
    name: "Scale",
    tagline: "For SaaS platforms & enterprises",
    audience: "From £18,000",
    price: "£18,000",
    cadence: "one-off + monthly retainer",
    cta: "Start with Scale",
    features: [
      "Multi-tenant SaaS platform engineering",
      "Custom AI / multi-agent orchestration (LangGraph)",
      "Cloud DevOps (AWS/GCP/Azure) with Terraform IaC",
      "Kubernetes autoscaling + observability stack",
      "SOC 2 Type II audit prep + security hardening",
      "Dedicated lead engineer + 4-person pod",
      "p99 120ms SLA + 99.9% uptime guarantee",
      "24/7 on-call runbook + quarterly roadmapping",
    ],
    notIncluded: [],
  },
  {
    name: "Custom Quote",
    tagline: "For something that doesn't fit a box",
    audience: "Let's scope it",
    price: "Custom",
    cadence: "scoped in a free 30-min call",
    cta: "Book a discovery call",
    features: [
      "Fixed-scope, fixed-fee PoC in 6 weeks",
      "Senior engineer (not salesperson) on the call",
      "Draft architecture + ballpark estimate",
      "Pick any mix of the 24 services",
      "No long-term contract required to start",
      "NDA signed before any discovery call",
      "UK Ltd Co + GDPR-compliant invoicing",
      "Code + keys handed over, never locked in",
    ],
    notIncluded: [],
  },
];

export const PRICING_FAQS = [
  {
    q: "Are these prices fixed?",
    a: "These are starting points. Every engagement is scoped in a free 30-minute discovery call to match your specific goals, audience and budget. No fake universal pricing, no hidden fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer (GBP, USD, PKR, AED), Stripe, and Wise. Invoices are due within 14 days of issue. Deposits at project kickoff are non-refundable once work commences.",
  },
  {
    q: "Do you offer monthly retainers?",
    a: "Yes. Growth and Scale tiers include monthly retainers for ongoing SEO, paid media, CRO, and hypercare. Retainers are month-to-month with a 30-day notice period — no long-term lock-in.",
  },
  {
    q: "What's never included — and never will be?",
    a: "Juniors learning on your budget, vague discovery phases that drag on for months, vendor lock-in, and surprise launch fees. The architecture is always handed over.",
  },
];

// ===== TEAM =====
export const TEAM_STATS = [
  { value: "28", label: "Team members" },
  { value: "4", label: "Offices" },
  { value: "5", label: "Departments" },
  { value: "2.4 yrs", label: "Avg tenure" },
];

export type Department = {
  num: string;
  name: string;
  headcount: string;
  location: string;
  icon: LucideIcon;
  desc: string;
};

export const DEPARTMENTS: Department[] = [
  {
    num: "01",
    name: "Leadership",
    headcount: "3 people",
    location: "Birmingham + Multan",
    icon: Users,
    desc: "Founders and practice leads who own P&L, client relationships, and engineering standards across every engagement.",
  },
  {
    num: "02",
    name: "Development",
    headcount: "12 people",
    location: "Multan",
    icon: Code2,
    desc: "Full-stack engineers, AI/ML engineers, and DevOps specialists shipping production Next.js, Python, and LangGraph systems.",
  },
  {
    num: "03",
    name: "Marketing",
    headcount: "3 people",
    location: "Birmingham + Multan",
    icon: Megaphone,
    desc: "SEO specialists, paid media managers, and content strategists who compound qualified pipeline month over month.",
  },
  {
    num: "04",
    name: "Creative",
    headcount: "3 people",
    location: "Multan + Birmingham",
    icon: Palette,
    desc: "Graphic designers, web designers, and video producers who make every client product look premium.",
  },
  {
    num: "05",
    name: "Operations",
    headcount: "4 people",
    location: "Distributed",
    icon: Cpu,
    desc: "Project managers, finance, and people ops who keep the 4-office, 18-hour workday engine running smoothly.",
  },
];

export const HIRING_STAGES = [
  {
    num: "01",
    title: "Recruiter Screen",
    duration: "30 min",
    desc: "A conversation about your background, expectations, and whether the role is a mutual fit.",
  },
  {
    num: "02",
    title: "Technical Interview",
    duration: "60 min",
    desc: "A senior engineer walks through your past work and a live system-design or code-review exercise.",
  },
  {
    num: "03",
    title: "Take-Home Exercise",
    duration: "4–6 hours, paid",
    desc: "A realistic, paid exercise relevant to the role — never a LeetCode puzzle or free spec work.",
  },
  {
    num: "04",
    title: "Team & Culture Fit",
    duration: "45 min",
    desc: "Meet 2–3 future teammates to confirm working style and values alignment.",
  },
];

export const TEAM_VALUES = [
  { icon: Globe, title: "Hybrid by default", desc: "In-office 2–3 days/week for engineering; fully remote options for senior roles." },
  { icon: Cpu, title: "Senior-first", desc: "8+ yr average tenure. No juniors learning on client budgets." },
  { icon: Users, title: "Cross-office pods", desc: "Every engagement is staffed with a UK account lead + Pakistan tech lead." },
  { icon: Zap, title: "Real production work", desc: "You ship to 10M+ req/day systems from week one — no busywork." },
];

// ===== CONNECT (social + direct) =====
export const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook", value: "clicktaketechnologies", href: "https://www.facebook.com/clicktaketechnologies/" },
  { icon: Instagram, label: "Instagram", value: "clicktaketechologiesuk", href: "https://www.instagram.com/clicktaketechologiesuk/" },
  { icon: Linkedin, label: "LinkedIn", value: "click-take-technologies", href: "https://www.linkedin.com/company/click-take-technologies/" },
  { icon: Youtube, label: "YouTube", value: "ClickTake Technologies", href: "https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw" },
  { icon: BookMarked, label: "Tumblr", value: "clicktaketechnologies", href: "https://www.tumblr.com/clicktaketechnologies" },
  { icon: Music2, label: "TikTok", value: "@clicktaketechnologiesuk", href: "https://www.tiktok.com/@clicktaketechnologiesuk" },
  { icon: Bookmark, label: "Pinterest", value: "clicktaketechnologies", href: "https://uk.pinterest.com/clicktaketechnologies/" },
  { icon: MessagesSquare, label: "Threads", value: "@clicktaketech", href: "https://www.threads.com/@clicktaketech" },
];

// ===== LEGAL =====
export type LegalSection = {
  num: string;
  title: string;
  body: string[];
};

export type LegalDoc = {
  id: "legal-privacy" | "legal-terms" | "legal-cookies";
  title: string;
  updated: string;
  badge: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_DOCS: Record<LegalDoc["id"], LegalDoc> = {
  "legal-privacy": {
    id: "legal-privacy",
    title: "Privacy Policy",
    updated: "May 26, 2026",
    badge: "GDPR · UK DPA · CCPA Compliant",
    intro:
      "ClickTake Technologies Ltd. (\u201cwe\u201d, \u201cus\u201d, \u201cour\u201d) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect your personal data when you visit clicktaketech.com, submit a discovery-call request, fill out a project inquiry form, apply for a role on our Careers page, or otherwise engage our services. We have written this policy in plain English — but it is a real legal document, and by using our site you confirm that you have read it.",
    sections: [
      {
        num: "01",
        title: "Introduction & Scope",
        body: [
          "This policy applies to all individuals who interact with ClickTake Technologies Ltd. via our website, contact forms, email, or any of our digital services. It does not apply to data processed on behalf of our clients under a separate Data Processing Agreement (DPA) — that data is governed by the DPA signed with each client, in which we act as a data processor.",
          "We are ClickTake Technologies Ltd., a private limited company registered in England and Wales, headquartered in Birmingham, West Midlands, with offices in Multan (Pakistan), Austin, TX (USA), and Dubai (UAE). We act as a data controller for prospective-client data, careers-applicant data, and website visitor data, and as a data processor for data processed on behalf of clients under a separate DPA.",
          "This policy complies with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, the EU GDPR, the California Consumer Privacy Act (CCPA) as amended by the CPRA, and other applicable privacy laws.",
        ],
      },
      {
        num: "02",
        title: "Personal Data We Collect",
        body: [
          "Identity Data: first name, last name, job title, company name, LinkedIn profile URL (when voluntarily provided).",
          "Contact Data: email address, telephone numbers, billing address, and country.",
          "Project Data: information you provide in our contact form, discovery-call request, or RFP — including project scope, budget range, timeline, and current technical stack.",
          "Technical Data: IP address, browser type and version, operating system, device type, referring URL, and pages visited. This is collected via server logs and Google Analytics 4.",
          "Usage Data: information about how you interact with our website — pages viewed, time on page, form starts and submissions, and CTA clicks.",
          "Application Data: CV, portfolio link, GitHub username, cover note, and right-to-work information submitted via our Careers portal.",
        ],
      },
      {
        num: "03",
        title: "Lawful Basis for Processing (GDPR)",
        body: [
          "Under Article 6 of the UK/EU GDPR, we rely on the following lawful bases to process your personal data:",
          "Consent (Art. 6(1)(a)) — for analytics cookies, marketing cookies, and any optional communications you opt into. You can withdraw consent at any time by emailing info@clicktaketech.com.",
          "Contract (Art. 6(1)(b)) — to process project inquiries, deliver contracted services, and manage our partnership relationship with you under a signed Statement of Work.",
          "Legal obligation (Art. 6(1)(c)) — to comply with UK tax, accounting, and Companies House filing obligations, and to retain records as required by HMRC.",
          "Legitimate interests (Art. 6(1)(f)) — to respond to inbound enquiries, prevent fraud, secure our systems, and improve our services. We carry out a legitimate-interests assessment (LIA) for any processing that relies on this basis.",
        ],
      },
      {
        num: "04",
        title: "How We Use Your Data",
        body: [
          "We use your personal data to:",
          "Respond to your discovery-call request or project inquiry within 4 business hours and scope a fixed-price proposal.",
          "Deliver custom software development, AI automation, SEO and digital marketing, and brand-design services under a signed SOW.",
          "Manage our ongoing client relationship — milestone updates, invoicing, support tickets, and renewal discussions.",
          "Screen prospective candidates who apply via our Careers portal and conduct first-round technical interviews.",
          "Send you our newsletter and resources — only if you have explicitly opted in, and you can unsubscribe in one click.",
          "Maintain and improve our website, services, and security posture, including fraud prevention and abuse detection.",
        ],
      },
      {
        num: "05",
        title: "Third-Party Services & Sub-Processors",
        body: [
          "We use the following third-party services to operate our business. Each one processes a limited subset of personal data on our behalf, and we have written agreements in place with each that meet GDPR Article 28 requirements where applicable.",
          "Cloudinary — image and video hosting for website and marketing assets. May receive asset metadata; does not receive personal data directly.",
          "Gmail SMTP (Google Workspace) — business email. Stores your contact details, email content, and attachments to deliver correspondence with you. Google Workspace is certified under ISO/IEC 27001, SOC 2 Type II, and operates under EU GDPR.",
          "Cloudflare Turnstile — bot protection on our public forms. May set a cookie and collect limited device signals to distinguish humans from automated traffic. No personal data is sent to Cloudflare beyond what is strictly necessary for bot detection.",
          "Google Analytics 4 — website usage analytics, configured with IP anonymisation and a 14-month data retention window. We do not enable Google Signals or advertising features that would re-identify individuals across devices.",
          "Vercel — hosting provider for clicktaketech.com and client projects. Operates under SOC 2 Type II and processes server logs strictly for security and abuse prevention.",
          "Stripe — payment processing for client invoices. Stripe is the data controller for card data; we never see or store your full card number.",
          "A full, up-to-date list of sub-processors is available on request — email info@clicktaketech.com and we will send it within 30 days.",
        ],
      },
      {
        num: "06",
        title: "International Data Transfers",
        body: [
          "Because we operate offices in the UK, Pakistan, the US, and the UAE, your personal data may be accessed from, or transferred to, countries outside your home jurisdiction. We protect such transfers using Standard Contractual Clauses (SCCs) approved by the European Commission, the UK International Data Transfer Agreement (IDTA), and additional safeguards such as encryption in transit and at rest.",
          "Pakistan is not recognised as providing an adequate level of data protection under UK/EU law; we therefore rely on SCCs/IDTA + supplementary measures (encryption, access controls, and audit rights) for any transfer of personal data to our Multan engineering hub. We have conducted and documented Transfer Impact Assessments (TIAs) for these transfers.",
          "We do not knowingly transfer personal data to any country subject to UK, EU, or US sanctions.",
        ],
      },
      {
        num: "07",
        title: "Data Retention",
        body: [
          "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including any legal, accounting, or reporting requirements. Specific retention periods:",
          "Project inquiries and discovery-call recordings — 24 months from the last interaction, then deleted unless a contract is signed.",
          "Client project data — for the duration of the engagement + 7 years for tax and accounting purposes, then securely deleted or returned to the client.",
          "Careers applications — 12 months from application, then deleted (or until you ask us to extend, in writing).",
          "Website server logs — 30 days, then automatically purged.",
          "Newsletter subscribers — until you unsubscribe, after which your email is removed within 7 days.",
          "To exercise your rights earlier, email info@clicktaketech.com and we will respond within 30 days.",
        ],
      },
      {
        num: "08",
        title: "Data Security",
        body: [
          "We have implemented appropriate technical and organisational measures to protect your personal data, including: TLS 1.2+ encryption in transit, AES-256 encryption at rest, role-based access control with least-privilege defaults, multi-factor authentication for all production systems, quarterly access reviews, and annual penetration testing.",
          "Access to personal data is restricted to authorised personnel on a need-to-know basis and is logged for audit. We have a documented incident-response plan and will notify the ICO (and any affected individuals) within 72 hours of becoming aware of a notifiable personal data breach, as required by Article 33 of the UK GDPR.",
        ],
      },
      {
        num: "09",
        title: "Your Rights — GDPR & UK DPA",
        body: [
          "Under the UK GDPR and EU GDPR, you have the following rights:",
          "The right to be informed (this policy).",
          "The right of access — you can request a copy of the personal data we hold about you.",
          "The right to rectification — to correct inaccurate or incomplete data.",
          "The right to erasure (\u201cright to be forgotten\u201d) — subject to legal-retention overrides.",
          "The right to restrict processing — for example, while a rectification request is being assessed.",
          "The right to data portability — to receive your data in a structured, machine-readable format.",
          "The right to object to processing based on legitimate interests or for direct marketing.",
          "Rights related to automated decision-making and profiling — we do not use automated decision-making for anything that produces legal or similarly significant effects.",
          "To exercise any of these rights, email info@clicktaketech.com with the subject line \u201cDSAR — [your name]\u201d. We respond within 30 days, free of charge, except where requests are manifestly unfounded or excessive.",
        ],
      },
      {
        num: "10",
        title: "Your Rights — California (CCPA/CPRA)",
        body: [
          "If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), grants you additional rights:",
          "The right to know — the categories of personal information we collect, the sources, the business or commercial purpose for collecting it, and the categories of third parties to whom we disclose it.",
          "The right to delete — to request deletion of your personal information, subject to legal-retention overrides.",
          "The right to correct — to request correction of inaccurate personal information.",
          "The right to opt-out of the \u201csale\u201d or \u201csharing\u201d of personal information — ClickTake does not sell personal information and does not share it for cross-context behavioural advertising.",
          "The right to limit the use of sensitive personal information — we do not collect sensitive personal information as defined by CPRA beyond what is strictly necessary for HR screening.",
          "To exercise any CCPA right, email info@clicktaketech.com. We will verify your identity before processing the request and respond within 45 days, extendable by 45 days where reasonably necessary.",
        ],
      },
      {
        num: "11",
        title: "Children\u2019s Privacy",
        body: [
          "Our website and services are intended for businesses and professionals aged 18 and over. We do not knowingly collect personal data from anyone under 18. If you believe a child has provided us with personal data, please email info@clicktaketech.com and we will delete it promptly.",
        ],
      },
      {
        num: "12",
        title: "Changes to This Policy",
        body: [
          "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will post any material changes on this page and update the \u201cLast Updated\u201d date at the top. For significant changes (e.g., new sub-processors or new lawful bases), we will also notify you by email if you are an active client or newsletter subscriber.",
        ],
      },
      {
        num: "13",
        title: "Contact & Data Protection Officer",
        body: [
          "ClickTake Technologies Ltd. is the data controller for the personal data processed under this policy. For any privacy question, data-subject request, or complaint, contact our Data Protection Lead at:",
          "ClickTake Technologies Ltd., UK HQ, Birmingham, West Midlands, United Kingdom.",
          "Email: info@clicktaketech.com (please use the subject line \u201cPrivacy / DSAR\u201d).",
          "We respond within 30 days. If you are not satisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner\u2019s Office (ico.org.uk) or your local data-protection authority.",
        ],
      },
    ],
  },
  "legal-terms": {
    id: "legal-terms",
    title: "Terms of Service",
    updated: "May 26, 2026",
    badge: "Service Agreement · England & Wales",
    intro:
      "By accessing or using the services provided by ClickTake Technologies Ltd. (\u201cthe Company\u201d, \u201cwe\u201d, \u201cus\u201d), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not engage with our services, sign a Statement of Work, or use our website. These Terms govern the general relationship between you and ClickTake; each specific engagement is additionally governed by its own signed Statement of Work (SOW).",
    sections: [
      {
        num: "01",
        title: "Acceptance of Terms",
        body: [
          "By engaging with ClickTake Technologies — including requesting a discovery call, signing a Statement of Work, paying an invoice, or otherwise commissioning work — you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and any SOW you sign with us.",
          "If you are signing on behalf of a company, you represent and warrant that you have the authority to bind that company to these Terms.",
        ],
      },
      {
        num: "02",
        title: "Services & Engagements",
        body: [
          "We provide professional digital services including, but not limited to: custom software, web and mobile application development on Next.js, React, Python and Node; AI, machine learning, and automation solutions (LLMs, RAG, agents, computer vision); search engine optimisation, paid media, and digital marketing; brand identity, graphic design, and video production.",
          "Each engagement is governed by a separate Statement of Work (SOW) that specifies deliverables, timeline, price, payment schedule, acceptance criteria, and any project-specific terms. In the event of a conflict between these Terms and an SOW, the SOW prevails for that engagement only.",
          "Any work outside the scope of a signed SOW (\u201cout-of-scope work\u201d) will be quoted separately and requires written approval before we commence.",
        ],
      },
      {
        num: "03",
        title: "Client Responsibilities",
        body: [
          "To enable us to deliver the services, the client agrees to:",
          "Provide timely access to systems, data, brand assets, and personnel as specified in the SOW.",
          "Assign a single point of contact authorised to approve deliverables, scope changes, and invoices.",
          "Respond to review, feedback, and approval requests within 5 business days; delays beyond this may shift the project timeline and we will not be liable for the resulting schedule slippage.",
          "Ensure that any content, assets, or data provided to us does not infringe the IP rights of any third party.",
          "Obtain and maintain any licences, subscriptions, or accounts for third-party tools required to operate the delivered solution (e.g., Vercel, Stripe, OpenAI).",
        ],
      },
      {
        num: "04",
        title: "Payment Terms",
        body: [
          "Unless otherwise stated in your SOW, invoices are due within 14 days of issue. We accept bank transfer (GBP, USD, PKR, AED), Stripe, and Wise. Currency and settlement instructions are stated on each invoice.",
          "Most fixed-price engagements require a 30\u201350% deposit at kickoff. Deposits cover committed team allocation and are non-refundable once work commences, except where we have materially breached the SOW.",
          "Retainer engagements are billed in advance, monthly, and are non-refundable once the month begins. Unused retainer hours do not roll over beyond 60 days unless agreed in writing.",
          "Late payments may incur a 1.5% per-month interest charge plus reasonable recovery costs. We reserve the right to suspend or pause ongoing work on any engagement with invoices more than 14 days overdue.",
          "All fees are exclusive of applicable taxes (including VAT, where applicable), which are added at the prevailing UK rate unless you provide a valid VAT registration number and we agree to reverse-charge treatment.",
        ],
      },
      {
        num: "05",
        title: "Intellectual Property",
        body: [
          "Upon receipt of full payment of all fees due under an SOW, all custom-developed source code, designs, and assets specifically created for the client under that SOW are assigned to the client under a worldwide, perpetual, royalty-free, irrevocable license, to use, copy, modify, and sublicense for internal and external business purposes.",
          "We retain ownership of, and the right to reuse, the following (\u201cPre-existing IP\u201d): (a) reusable components, libraries, frameworks, and utilities developed prior to or independently of the engagement; (b) generic development tools, starter templates, and boilerplate; (c) methodologies, processes, and know-how. Pre-existing IP is licensed to the client on a non-exclusive, worldwide, perpetual, royalty-free basis as embedded in the deliverables.",
          "Open-source components included in deliverables remain licensed under their original open-source licences (e.g., MIT, Apache 2.0, BSD). The client agrees to comply with the terms of those licences.",
          "We may reference the engagement and the client\u2019s name in our portfolio, case studies, and marketing materials, unless the SOW expressly prohibits it or the client requests in writing that we do not.",
        ],
      },
      {
        num: "06",
        title: "Confidentiality & NDAs",
        body: [
          "We treat all client information \u2014 including business plans, source code, customer data, pricing, and product roadmaps \u2014 as confidential. We will not disclose it to any third party except where required by law or where the client has given written consent.",
          "We restrict access to confidential information to personnel who need it to deliver the engagement, and we bind all employees and contractors to written confidentiality obligations that survive termination of their engagement.",
          "We are happy to sign a mutual Non-Disclosure Agreement before any discovery call or scoping conversation \u2014 this is standard practice for us. Email info@clicktaketech.com and we will send a mutual NDA template within one business day.",
          "Confidentiality obligations survive termination of the engagement for a period of 5 years, except for trade secrets, which survive indefinitely.",
        ],
      },
      {
        num: "07",
        title: "Warranties & Disclaimers",
        body: [
          "We warrant that the services will be performed in a professional and workmanlike manner, consistent with industry standards for senior-level software engineering, design, and marketing work. If any deliverable fails to meet the acceptance criteria in the SOW, we will, at our option, re-perform the work or refund the fees paid for that specific deliverable.",
          "Except as expressly set out in these Terms or an SOW, all services, deliverables, and code are provided \u201cas is\u201d and \u201cas available\u201d, and we disclaim all other warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
          "We do not warrant that any software will be error-free or that it will operate uninterrupted or in all combinations the client may choose. We do not warrant specific SEO rankings, advertising ROI, or business outcomes, which depend on factors outside our control.",
          "The client is responsible for independently verifying any third-party dependencies, open-source licences, and regulatory compliance applicable to their use of the delivered work.",
        ],
      },
      {
        num: "08",
        title: "Limitation of Liability",
        body: [
          "To the maximum extent permitted by law, in no event shall ClickTake Technologies be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, business, goodwill, data, or anticipated savings, arising out of or related to the services, whether in contract, tort (including negligence), or under any other theory of liability.",
          "Our total aggregate liability arising out of or related to an engagement, regardless of the form of action, shall not exceed the fees paid by the client to us for the services giving rise to the claim during the 12 months preceding the event giving rise to the claim.",
          "The limitations and exclusions in this section do not apply to: (a) liability for death or personal injury caused by our negligence; (b) liability for fraud or fraudulent misrepresentation; (c) any breach of confidentiality obligations under Section 06; (d) any liability that cannot be lawfully limited under the laws of England and Wales.",
        ],
      },
      {
        num: "09",
        title: "Indemnification",
        body: [
          "The client agrees to indemnify and hold harmless ClickTake Technologies, its officers, employees, and contractors from any claim, demand, action, loss, or damages (including reasonable legal fees) arising from: (a) the client\u2019s breach of these Terms or an SOW; (b) the client\u2019s content, data, or assets provided for use in the engagement; (c) the client\u2019s misuse of the delivered work in violation of applicable law or third-party rights.",
          "We will indemnify the client against any third-party claim that a deliverable infringes the IP rights of a third party, subject to us being promptly notified and given sole control of the defence and settlement. If a deliverable becomes the subject of an infringement claim, we will, at our option, (i) modify it to be non-infringing, (ii) replace it with a functionally equivalent alternative, or (iii) refund the fees paid for that deliverable.",
        ],
      },
      {
        num: "10",
        title: "Term & Termination",
        body: [
          "These Terms take effect when you first engage us and remain in force for the duration of our business relationship. Each SOW specifies its own term and any renewal terms.",
          "Either party may terminate an engagement immediately by written notice if the other party: (a) commits a material breach that is not cured within 14 days of written notice; (b) becomes insolvent, enters administration, or has a liquidator or receiver appointed; or (c) ceases to carry on business.",
          "On termination, the client shall pay for all services performed and expenses incurred up to the effective date of termination, including any non-cancelable third-party costs. Provisions that by their nature should survive \u2014 including IP, confidentiality, limitation of liability, and governing law \u2014 survive termination indefinitely.",
        ],
      },
      {
        num: "11",
        title: "Dispute Resolution",
        body: [
          "Both parties agree to act in good faith to resolve any dispute informally. If a dispute arises, the complaining party will notify the other in writing with reasonable detail. Senior representatives of both parties will meet (in person or by video) within 14 days to attempt resolution.",
          "If the dispute is not resolved within 30 days of the notice, either party may refer the dispute to mediation under the Centre for Effective Dispute Resolution (CEDR) Model Mediation Procedure. The mediator will be agreed between the parties within a further 14 days, failing which appointed by CEDR.",
          "If mediation does not resolve the dispute within 60 days of referral, either party may commence court proceedings in accordance with the governing-law clause below.",
        ],
      },
      {
        num: "12",
        title: "Governing Law",
        body: [
          "These Terms and any SOW are governed by and construed in accordance with the laws of England and Wales. Any dispute that cannot be resolved under Section 11 shall be subject to the exclusive jurisdiction of the courts of England and Wales, unless otherwise agreed in writing for engagements contracted with our Dubai (UAE) or Austin, TX (USA) entities, in which case the governing law and jurisdiction specified in the SOW will apply.",
        ],
      },
      {
        num: "13",
        title: "Contact",
        body: [
          "For any question about these Terms, a proposed engagement, or an existing contract, contact us at:",
          "ClickTake Technologies Ltd., UK HQ, Birmingham, West Midlands, United Kingdom.",
          "Email: info@clicktaketech.com.",
        ],
      },
    ],
  },
  "legal-cookies": {
    id: "legal-cookies",
    title: "Cookie Policy",
    updated: "May 26, 2026",
    badge: "EU ePrivacy · UK PECR · CCPA Compliant",
    intro:
      "This Cookie Policy explains how ClickTake Technologies Ltd. uses cookies and similar technologies on clicktaketech.com. Under the EU ePrivacy Directive and the UK Privacy and Electronic Communications Regulations (PECR), we are required to obtain your consent for any non-essential cookies before they are set, except where they are strictly necessary to provide a service you have requested.",
    sections: [
      {
        num: "01",
        title: "What Are Cookies",
        body: [
          "Cookies are small text files that a website places on your device when you visit. They are widely used to make websites work efficiently and to give site owners information about how the site is used.",
          "Cookies are not the only technology we use for these purposes. We also use web beacons (also called pixels), local storage, and similar technologies. In this policy, the word \u201ccookies\u201d covers all of these technologies unless we say otherwise.",
          "Cookies may be session cookies (deleted when you close your browser) or persistent cookies (which remain until they expire or you delete them). Cookies can be first-party (set by us) or third-party (set by a third-party service we use, such as Google Analytics).",
        ],
      },
      {
        num: "02",
        title: "Types of Cookies We Use",
        body: [
          "We group our cookies into five categories:",
          "Strictly necessary cookies \u2014 required for the website to function. These cannot be disabled in our system because they enable core functionality such as session continuity, security, and form submission. They do not collect personally identifiable information for analytics or marketing.",
          "Authentication cookies \u2014 used when you log in to admin areas or a client portal. These are session-only and are deleted on logout.",
          "Preference / functional cookies \u2014 remember your choices such as theme (light/dark), language, and accessibility settings. These require your consent under PECR.",
          "Analytics cookies \u2014 help us understand how visitors use the site so we can improve it. We use Google Analytics 4 with IP anonymisation and a 14-month retention window. These require your consent.",
          "Marketing cookies \u2014 used to measure the effectiveness of our paid campaigns and to retarget visitors who have shown interest in our services. These require your consent and are never set until you opt in.",
        ],
      },
      {
        num: "03",
        title: "Cookie Table",
        body: [
          "The main cookies and similar technologies we use are:",
          "\u2022 ct_session (first-party, session, strictly necessary) \u2014 maintains your session while you navigate the site.",
          "\u2022 ct_theme (first-party, 365 days, functional) \u2014 remembers your light/dark theme preference.",
          "\u2022 _ga, _ga_<id> (first-party via Google Analytics, 14 months, analytics) \u2014 anonymous usage statistics with IP anonymisation.",
          "\u2022 cf_clearance (Cloudflare, 30 days, strictly necessary) \u2014 protects the site from automated abuse; required to load pages.",
          "\u2022 Turnstile session cookie (Cloudflare, session, strictly necessary) \u2014 verifies that form submissions are made by humans.",
          "\u2022 _gcl_au (Google Ads, 90 days, marketing, opt-in) \u2014 attributes conversions to paid-search campaigns.",
          "\u2022 _fbp (Meta Pixel, 90 days, marketing, opt-in) \u2014 attributes conversions to Meta campaigns.",
          "\u2022 li_sug (LinkedIn Insight Tag, 30 days, marketing, opt-in) \u2014 attributes conversions to LinkedIn campaigns.",
          "We do not set cookies that personally identify you across other websites you visit. We do not sell the data collected by these cookies.",
        ],
      },
      {
        num: "04",
        title: "Third-Party Cookies",
        body: [
          "Some cookies are set by third-party services we use to operate the site. We have written agreements in place with each provider and only enable the cookies necessary for the function we are using.",
          "Cloudflare Turnstile \u2014 bot protection on public forms. Sets a session cookie to verify human submissions. Strictly necessary; cannot be disabled if you wish to submit a form.",
          "Google Analytics 4 \u2014 website analytics. We have configured GA4 with IP anonymisation, a 14-month retention window, and we have explicitly disabled Google Signals and any user-provided data fields. We do not use GA4 data for cross-device remarketing.",
          "Meta Pixel \u2014 campaign attribution for Meta ads. Set only if you have accepted marketing cookies. We do not share your email or any other personal data with Meta via the pixel.",
          "LinkedIn Insight Tag \u2014 campaign attribution for LinkedIn ads. Set only if you have accepted marketing cookies.",
          "Cloudinary \u2014 image CDN. May set a cookie for asset caching; does not receive personal data.",
          "Each third-party provider manages its own cookies under its own privacy policy. We encourage you to review their policies via the links in our Privacy Policy\u2019s sub-processor list.",
        ],
      },
      {
        num: "05",
        title: "Managing Cookies",
        body: [
          "You have several ways to manage cookies:",
          "Use our cookie-consent banner on first visit \u2014 you can accept all, accept only strictly necessary, or open the preferences panel and toggle each category.",
          "Change your preferences at any time by clicking \u201cCookie preferences\u201d in the website footer; we will re-load your settings immediately.",
          "Use your browser settings \u2014 most modern browsers let you accept all, reject all, delete existing, or block cookies from specific sites. Disabling all cookies may affect website functionality; for example, you may not be able to submit the contact form, save your theme preference, or use the client portal.",
          "Use platform-level opt-outs \u2014 for analytics, install the Google Analytics opt-out browser add-on; for marketing, use the Digital Advertising Alliance consumer-choice tools at youronlinechoices.com (EU) or aboutads.info (US).",
          "If you are a California resident, you may opt out of the \u201csale\u201d or \u201csharing\u201d of your personal information at any time. ClickTake does not sell personal information and does not share it for cross-context behavioural advertising, so no opt-out is required for those activities.",
        ],
      },
      {
        num: "06",
        title: "Do Not Track Signals",
        body: [
          "Some browsers transmit a \u201cDo Not Track\u201d (DNT) signal. There is currently no industry consensus on what DNT means or how websites should respond. We interpret DNT as a request to disable analytics and marketing cookies. If your browser sends DNT, we will not set GA4, Meta Pixel, or LinkedIn Insight cookies on your device, even if you have previously consented.",
          "Strictly necessary and Cloudflare-Turnstile cookies will still be set because they are required for the site to load and to protect forms from automated abuse.",
        ],
      },
      {
        num: "07",
        title: "Updates to This Policy",
        body: [
          "We may update this Cookie Policy from time to time to reflect changes in our cookie usage, in third-party services, or in applicable law (e.g., the EU ePrivacy Regulation when finalised). Any material change will be posted on this page with an updated \u201cLast Updated\u201d date. Where we add a new non-essential cookie category, we will re-prompt for consent on your next visit.",
        ],
      },
      {
        num: "08",
        title: "Contact",
        body: [
          "If you have any question about this Cookie Policy or want to withdraw consent for a specific category, contact us at:",
          "ClickTake Technologies Ltd., UK HQ, Birmingham, West Midlands, United Kingdom.",
          "Email: info@clicktaketech.com (please use the subject line \u201cCookie Policy\u201d).",
          "We respond within 30 days. You also have the right to lodge a complaint with the UK Information Commissioner\u2019s Office (ico.org.uk) or your local data-protection authority.",
        ],
      },
    ],
  },
};

export const LEGAL_LINKS: { id: NavView; label: string }[] = [
  { id: "legal-privacy", label: "Privacy Policy" },
  { id: "legal-terms", label: "Terms of Service" },
  { id: "legal-cookies", label: "Cookie Policy" },
];
