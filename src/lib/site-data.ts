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
  | "legal-privacy"
  | "legal-terms"
  | "legal-cookies";

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

// ===== BLOG =====
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
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
];

export const BLOG_CATEGORIES = [
  "All",
  "AI Automation",
  "Digital Marketing",
  "SEO",
  "Web",
  "Ecommerce",
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
  { icon: Linkedin, label: "LinkedIn", value: "clicktake-technologies", href: "#" },
  { icon: Twitter, label: "Twitter / X", value: "@clicktaketech", href: "#" },
  { icon: Rss, label: "Blog RSS", value: "feed.xml", href: "#" },
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
    badge: "GDPR · UK DPA Compliant",
    intro:
      "ClickTake Technologies Ltd. (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website, submit discovery calls, fill out project inquiry forms, or apply for vacancies.",
    sections: [
      {
        num: "01",
        title: "Introduction & Scope",
        body: [
          "This policy applies to all individuals who interact with ClickTake Technologies Ltd. via our website, forms, email, or any of our digital services.",
          "We are a UK-registered limited company (Companies House) operating across the United Kingdom, Pakistan, the United States, and the United Arab Emirates. We act as both a data controller (for prospective-client and applicant data) and a data processor (for data processed on behalf of clients under a separate DPA).",
        ],
      },
      {
        num: "02",
        title: "Personal Data We Collect",
        body: [
          "Identity Data: First name, last name, username, and job titles.",
          "Contact Data: Email address, telephone numbers, billing addresses, and country.",
          "Technical Data: IP address, login data, browser types, operating systems, and device specs.",
          "Usage Data: Information about how you interact with our website, services, forms, and calculators.",
        ],
      },
      {
        num: "03",
        title: "How We Use Your Data",
        body: [
          "We will only use your personal data when the law allows us to. Most commonly, we will use your data to:",
          "Register you as a new customer and scope your project requirements.",
          "Deliver custom development, search engine optimization campaigns, and automation pipelines.",
          "Manage our ongoing partnership relationship (notifying you about milestones, payments, or updates).",
          "Screen prospective applicants who submit portfolios via our Careers portal.",
        ],
      },
      {
        num: "04",
        title: "Data Security",
        body: [
          "We have put in place appropriate technical and organizational measures to protect your personal data, including TLS encryption in transit, AES-256 encryption at rest, role-based access control, and quarterly security reviews.",
          "Access to personal data is restricted to authorized personnel on a need-to-know basis and is logged for audit.",
        ],
      },
      {
        num: "05",
        title: "Data Retention & Your Rights",
        body: [
          "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, and reporting requirements.",
          "Under the GDPR and UK DPA, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data, and the right to data portability.",
          "To exercise any of these rights, email info@clicktaketech.com. We respond within 30 days.",
        ],
      },
    ],
  },
  "legal-terms": {
    id: "legal-terms",
    title: "Terms of Service",
    updated: "May 26, 2026",
    badge: "Service Agreement",
    intro:
      "By accessing or using the services provided by ClickTake Technologies Ltd. (\"the Company\", \"we\", \"us\"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not engage with our services or use our website.",
    sections: [
      {
        num: "01",
        title: "Acceptance of Terms",
        body: [
          "By engaging with ClickTake Technologies, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and any Statement of Work (SOW) you sign with us.",
        ],
      },
      {
        num: "02",
        title: "Services & Engagements",
        body: [
          "We provide digital services including but not limited to: custom software, web and mobile application development; AI, machine learning and automation solutions; search engine optimization, paid media and digital marketing; and brand identity, design and creative production.",
          "Each engagement is governed by a separate Statement of Work (SOW) that specifies deliverables, timeline, price, and acceptance criteria. In the event of a conflict, the SOW prevails over these Terms.",
        ],
      },
      {
        num: "03",
        title: "Payment Terms",
        body: [
          "Unless otherwise stated in your SOW, invoices are due within 14 days of issue. We accept bank transfer (GBP, USD, PKR, AED), Stripe, and Wise.",
          "Late payments may incur a 1.5% monthly interest charge. Deposits at project kickoff are non-refundable once work commences.",
        ],
      },
      {
        num: "04",
        title: "Intellectual Property",
        body: [
          "Upon receipt of full payment, all custom-developed source code, designs, and assets delivered under an SOW are transferred to the client under a worldwide, perpetual, royalty-free license.",
          "We retain rights to reusable components, libraries, and frameworks developed prior to or independently of the engagement, which are licensed to the client on a non-exclusive basis.",
        ],
      },
      {
        num: "05",
        title: "Confidentiality & NDAs",
        body: [
          "We treat all client information as confidential and will not disclose it to third parties without consent. We are happy to sign mutual NDAs before any discovery call — this is standard practice for us.",
        ],
      },
      {
        num: "06",
        title: "Limitation of Liability",
        body: [
          "To the maximum extent permitted by law, ClickTake Technologies shall not be liable for any indirect, incidental, special, or consequential damages, or any loss of profits or revenue, arising from the use of our services.",
          "Our total liability under any SOW is limited to the fees paid by the client for the services giving rise to the claim during the 12 months preceding the claim.",
        ],
      },
      {
        num: "07",
        title: "Governing Law",
        body: [
          "These Terms and any SOW are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales, unless otherwise agreed in writing.",
        ],
      },
    ],
  },
  "legal-cookies": {
    id: "legal-cookies",
    title: "Cookie Policy",
    updated: "May 26, 2026",
    badge: "EU ePrivacy · PECR Compliant",
    intro:
      "This Cookie Policy explains how ClickTake Technologies Ltd. uses cookies and similar technologies on our website. Cookies are small text files placed on your device by the websites you visit.",
    sections: [
      {
        num: "01",
        title: "What Are Cookies",
        body: [
          "Cookies are small text files placed on your device by the websites you visit. They are widely used to make websites work more efficiently and to provide information to site owners.",
          "Cookies may be session cookies (deleted when you close your browser) or persistent cookies (remain until they expire or you delete them).",
        ],
      },
      {
        num: "02",
        title: "How We Use Cookies",
        body: [
          "Essential: Required for the website to function (e.g. session, theme preference).",
          "Analytics: To understand how visitors use our site (e.g. Google Analytics 4, anonymized).",
          "Marketing: To measure the effectiveness of our campaigns on Meta, LinkedIn, and Google Ads.",
          "Functional: To remember your preferences (e.g. dark mode, language).",
        ],
      },
      {
        num: "03",
        title: "Third-Party Cookies",
        body: [
          "We use third-party services that may set their own cookies, including Cloudflare Turnstile (bot protection), Google Analytics (usage analytics), and Meta Pixel (campaign attribution).",
          "Each third-party provider manages its own cookies according to its own privacy policy. We encourage you to review their policies.",
        ],
      },
      {
        num: "04",
        title: "Managing Cookies",
        body: [
          "You can control or delete cookies through your browser settings. Note that disabling all cookies may affect website functionality — for example, you may not be able to submit the contact form or save your theme preference.",
          "Most browsers allow you to: (a) accept all cookies; (b) reject all cookies; (c) delete existing cookies; or (d) block cookies from specific sites.",
        ],
      },
      {
        num: "05",
        title: "Updates to This Policy",
        body: [
          "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
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
