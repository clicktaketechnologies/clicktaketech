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
} from "lucide-react";

export type NavView =
  | "home"
  | "services"
  | "solutions"
  | "about"
  | "work"
  | "contact";

export const NAV_ITEMS: { id: NavView; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
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
    icon: Code2,
    title: "Custom Software",
    desc: "Multi-tenant SaaS, dashboards, and internal tools. Built on Next.js + Postgres + Stripe with design systems and observability from day one.",
    tags: ["Next.js 16", "Postgres", "Stripe", "Prisma"],
  },
  {
    num: "02",
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous goal-pursuing agents with tool-use, memory, and planning. Multi-agent orchestration with evals, guardrails, and human-in-loop fallbacks.",
    tags: ["LangGraph", "OpenAI", "Anthropic", "pgvector"],
  },
  {
    num: "03",
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS · GCP · Azure. Terraform IaC, GitOps pipelines, autoscaling K8s clusters, and observability stacks that surface regressions before users do.",
    tags: ["AWS", "Terraform", "Kubernetes", "ArgoCD"],
  },
  {
    num: "04",
    icon: Smartphone,
    title: "Web & Mobile",
    desc: "Next.js 16 + React Native. Production apps with CI/CD from day one — design systems in Storybook and E2E Playwright coverage.",
    tags: ["React Native", "Flutter", "CI/CD", "Playwright"],
  },
  {
    num: "05",
    icon: ShieldCheck,
    title: "Security Systems",
    desc: "Zero-trust architectures, SOC 2 Type II audit prep, SAST/DAST in CI, and pen-test remediation. Compliance as code.",
    tags: ["Zero-trust", "SOC 2", "SAST/DAST", "Pen-test"],
  },
  {
    num: "06",
    icon: TrendingUp,
    title: "Growth Systems",
    desc: "SEO, paid, and CRO. Data-led marketing that compounds qualified pipeline — measured against your analytics, not vanity metrics.",
    tags: ["SEO", "Paid", "CRO", "Analytics"],
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

// ===== SERVICES VIEW =====
export type Service = {
  num: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  stack: string[];
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    num: "01",
    icon: Code2,
    title: "Custom Web & Mobile Apps",
    tagline: "Production-grade applications, not prototypes.",
    desc: "Built on Next.js 16, React Native, and Flutter. We ship products with design systems, observability, CI/CD, and E2E test coverage from day one.",
    stack: ["Next.js 16", "React 19", "TypeScript", "React Native", "Flutter", "Tailwind", "Prisma"],
    deliverables: [
      "Design system + Storybook",
      "Playwright E2E suite",
      "Lighthouse 95+ baseline",
      "WCAG 2.2 AA compliance",
    ],
  },
  {
    num: "02",
    icon: Cloud,
    title: "Enterprise Cloud DevOps",
    tagline: "AWS, GCP, Azure — pick one or all three.",
    desc: "Infrastructure-as-code, GitOps pipelines, autoscaling K8s clusters, and observability stacks that surface regressions before your users do.",
    stack: ["AWS", "GCP", "Azure", "Terraform", "ArgoCD", "Kubernetes", "OpenTelemetry", "Grafana"],
    deliverables: [
      "Terraform modules library",
      "GitOps release pipeline",
      "Cost optimization (avg 35%↓)",
      "24/7 on-call runbook",
    ],
  },
  {
    num: "03",
    icon: Bot,
    title: "AI / ML Pipelines",
    tagline: "From PoC to production in 6 weeks.",
    desc: "From RAG over your internal knowledge base to multi-agent orchestration handling real customer workflows — with evals, guardrails, and human-in-loop fallbacks.",
    stack: ["LangGraph", "OpenAI", "Anthropic", "Pinecone", "Weaviate", "pgvector", "vLLM", "LangSmith"],
    deliverables: [
      "Multi-agent orchestration",
      "Enterprise RAG (10M+ docs)",
      "Custom LLM fine-tuning",
      "Eval harness + guardrails",
    ],
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Security Systems",
    tagline: "Zero-trust, compliance as code.",
    desc: "Zero-trust architectures, compliance as code, and pen-test-ready hardening. We've taken 20+ clients through SOC 2 Type II audit prep.",
    stack: ["Zero-trust", "SOC 2", "SAST/DAST", "Pen-test", "Vault", "OWASP", "CIS Benchmarks"],
    deliverables: [
      "Zero-trust network design",
      "SOC 2 Type II audit prep",
      "SAST/DAST pipelines in CI",
      "Pen-test remediation report",
    ],
  },
];

export const SERVICE_PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Roadmap mapping, ROI prioritization, fixed-price PoC scoping.",
  },
  {
    num: "02",
    title: "3D Prototyping",
    desc: "Interactive prototypes validated with real users before a line of production code.",
  },
  {
    num: "03",
    title: "Agile Sprints",
    desc: "Two-week sprints with weekly demos, CI/CD from day one, design system in Storybook.",
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "Production launch, 30-day hypercare, runbooks, and on-call rotation handoff.",
  },
];

// ===== SOLUTIONS VIEW =====
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

// ===== ABOUT VIEW =====
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
    a: "We are a full-stack, AI-native software engineering firm. We ship custom SaaS platforms, autonomous AI agents, cloud architecture, web & mobile apps, security systems, and growth marketing — structured as six practices under one delivery engine.",
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
    a: "Four offices: Birmingham (UK HQ), Multan (engineering hub), Austin (US business desk), and Dubai (MENA office). The combined time zones give us 18-hour workday coverage on every engagement.",
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
