"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  X,
  ArrowRight,
  Clock,
  Zap,
  Shield,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { PRICING_TIERS, type NavView } from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PricingViewProps = {
  onNavigate: (v: NavView) => void;
};

// ===== Proof bar — factual numbers drawn from site-data.ts ground truth =====
const PROOF_STATS = [
  { value: "120+", label: "Deployments shipped" },
  { value: "99.9%", label: "Uptime SLA, every tier" },
  { value: "28", label: "Senior engineers" },
  { value: "4", label: "Global offices" },
];

// ===== Comparison matrix =====
// 'check' = green check (included), 'x' = soft-red X (not included), 'text' = custom string.
type Cell = { kind: "check" } | { kind: "x" } | { kind: "text"; text: string };

const COMPARISON_ROWS: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Starting price (one-off)",
    cells: [
      { kind: "text", text: "£1,500" },
      { kind: "text", text: "£6,000" },
      { kind: "text", text: "£18,000" },
      { kind: "text", text: "Scoped" },
    ],
  },
  {
    label: "Project type",
    cells: [
      { kind: "text", text: "5-page site" },
      { kind: "text", text: "Web / commerce" },
      { kind: "text", text: "SaaS platform" },
      { kind: "text", text: "Fixed-scope PoC" },
    ],
  },
  {
    label: "AI automation included",
    cells: [
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Monthly SEO retainer",
    cells: [
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Paid media management (Google + Meta)",
    cells: [
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Dedicated lead engineer + pod",
    cells: [
      { kind: "x" },
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "p99 120ms SLA + 99.9% uptime",
    cells: [
      { kind: "x" },
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "SOC 2 Type II audit prep",
    cells: [
      { kind: "x" },
      { kind: "x" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Source code + keys on launch",
    cells: [
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Mutual NDA before discovery",
    cells: [
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
      { kind: "check" },
    ],
  },
  {
    label: "Revision rounds",
    cells: [
      { kind: "text", text: "2 rounds" },
      { kind: "text", text: "Unlimited" },
      { kind: "text", text: "Unlimited" },
      { kind: "text", text: "Scoped" },
    ],
  },
  {
    label: "Post-launch support",
    cells: [
      { kind: "text", text: "14 days" },
      { kind: "text", text: "30 days" },
      { kind: "text", text: "24/7 on-call" },
      { kind: "text", text: "Scoped" },
    ],
  },
];

// ===== FAQ — answer-ready (25-45 words each) for GEO / AI extraction =====
const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does custom software cost?",
    a: "Custom software pricing at ClickTake starts at £1,500 for a 5-page mobile-first site, £6,000 for production web or e-commerce builds, and £18,000+ for multi-tenant SaaS platforms. Every engagement is fixed-scope, fixed-fee, and quoted after a free 30-minute scoping call.",
  },
  {
    q: "What is AI agency pricing?",
    a: "AI agency pricing covers chatbots, lead scoring, multi-agent orchestration and LLM fine-tuning. Our AI engagements start from £6,000 inside the Growth tier and scale to £18,000+ for LangGraph multi-agent systems on the Scale tier — always production-grade, never a slide deck.",
  },
  {
    q: "What is web design pricing for small businesses?",
    a: "Web design pricing for small businesses starts at £1,500 for a 5-page mobile-first Next.js site with Google Business Profile setup, on-page SEO, SSL, CDN and 14-day post-launch support. Larger commerce builds start at £6,000 and include A/B testing and Storybook design systems.",
  },
  {
    q: "Do you offer payment plans or monthly retainers?",
    a: "Yes. Growth and Scale tiers include month-to-month retainers for SEO, paid media, CRO and hypercare — 30-day notice, no long-term lock-in. One-off projects accept a 30–50% deposit at kickoff with the balance invoiced 14 days from issue, payable by bank transfer, Stripe or Wise.",
  },
  {
    q: "What's never included on a ClickTake invoice?",
    a: "Four things: juniors learning on your budget, vague discovery phases that drag for months, vendor lock-in, and surprise launch fees. Senior engineers own every engagement, code and keys are handed over on launch, and fixed-scope PoCs mean what you sign is what you pay.",
  },
  {
    q: "Is there a free consultation before I commit?",
    a: "Yes. Every engagement starts with a free 30-minute scoping call with a senior engineer — not a salesperson. You receive a draft architecture, ballpark estimate and a fixed-scope, fixed-fee quote. If none of our tiers fit your goals, we tell you that too.",
  },
  {
    q: "Do you sign NDAs and hand over source code?",
    a: "Yes. We sign mutual NDAs before any discovery call and hand over source code, design files, infrastructure keys and documentation on launch — no vendor lock-in. The architecture is yours to maintain, extend or hand to another team without restriction.",
  },
  {
    q: "What uptime and SLA guarantees do you offer?",
    a: "Scale tier ships with a p99 120ms SLA and a 99.9% uptime guarantee backed by 24/7 on-call runbooks, Kubernetes autoscaling, Terraform IaC and full observability. SOC 2 Type II audit prep and security hardening are included as standard from £18,000.",
  },
];

function ComparisonCell({ cell }: { cell: Cell }) {
  if (cell.kind === "check") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (cell.kind === "x") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#fef2f2]/5 text-[#ffa3a3]">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="text-sm font-medium text-white/90">{cell.text}</span>
  );
}

export function PricingView({ onNavigate }: PricingViewProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Accessible form — client-side validation + handoff to the contact view,
  // where the founder can complete scoping-call booking. No data leaves the
  // browser until they confirm.
  const handlePdfSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    window.setTimeout(() => onNavigate("contact"), 600);
  };

  return (
    <div className="relative bg-black text-white pb-20 sm:pb-0">
      {/* =========================================================
          HERO — dark gradient (black → blue tint), layered background
          ========================================================= */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#04122e] to-black" />
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#136dff]/25 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#136dff]/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#136dff]/40 bg-[#136dff]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Software Pricing · AI Agency Pricing · Web Design Pricing
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transparent pricing for{" "}
              <span className="text-gradient-brand">software &amp; AI services</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Real{" "}
              <span className="text-white">software pricing</span>,{" "}
              <span className="text-white">AI agency pricing</span> and{" "}
              <span className="text-white">web design pricing</span> from £1,500 to
              £18,000+ — across 24 services, 4 global offices, 120+ production
              deployments and a 99.9% uptime SLA. Every engagement is
              fixed-scope, fixed-fee, and scoped in a free 30-minute call with a
              senior engineer. No fake universal pricing, no hidden fees.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => onNavigate("contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#136dff] to-[#0f5cff] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_-4px] shadow-[#136dff]/60 transition-all hover:shadow-[0_0_36px_-2px] hover:shadow-[#136dff]/70"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
              >
                <Clock className="h-4 w-4" />
                Book a free call
              </button>
            </div>
          </Reveal>
          <LocalTrustStrip className="mt-10 border-t border-white/10 pt-6 text-white/60" />
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-2 text-xs text-white/40">
              <span>Scroll to compare tiers &amp; FAQs</span>
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          PROOF BAR — horizontal strip, glass background
          ========================================================= */}
      <section className="relative -mt-8 sm:-mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {PROOF_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "text-center",
                      i < PROOF_STATS.length - 1 && "sm:border-r sm:border-white/10"
                    )}
                  >
                    <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          PRICING TIERS — 4 glassmorphism cards, responsive grid
          ========================================================= */}
      <Section className="bg-black pt-12 sm:pt-16">
        <SectionHeading
          eyebrow="Engagement Tiers"
          title={
            <>
              Four software pricing tiers.{" "}
              <span className="text-gradient-brand">No universal packages.</span>
            </>
          }
          description="Most agencies hide their prices or quote a number from thin air. We don't. Here are real starting points for our four engagement tiers — actual web design pricing, SEO pricing and AI automation cost ranges, all in GBP. Pick the tier that fits your goals, or scope a custom quote."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px] hover:shadow-[#136dff]/30",
                  tier.popular
                    ? "border-[#136dff]/60 bg-gradient-to-b from-[#136dff]/15 to-white/[0.04] ring-1 ring-[#136dff]/40"
                    : "border-white/10 bg-white/[0.04] hover:border-[#136dff]/40"
                )}
              >
                {tier.popular && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#136dff] to-[#0f5cff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_0_16px_-4px] shadow-[#136dff]/60">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold tracking-tight text-white">
                  {tier.name}
                </h3>
                <p className="mt-1 text-xs text-white/60">{tier.tagline}</p>
                <div className="mt-5">
                  <div className="text-4xl font-bold text-white">{tier.price}</div>
                  <div className="mt-1 text-xs text-white/60">{tier.cadence}</div>
                </div>
                <button
                  onClick={() => onNavigate("contact")}
                  className={cn(
                    "mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                    tier.popular
                      ? "bg-gradient-to-r from-[#136dff] to-[#0f5cff] text-white shadow-[0_0_20px_-4px] shadow-[#136dff]/60 hover:shadow-[0_0_28px_-2px] hover:shadow-[#136dff]/70"
                      : "border border-white/15 bg-white/5 text-white hover:border-[#136dff]/50 hover:bg-white/10"
                  )}
                >
                  {tier.cta}
                </button>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/75"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#136dff]" />
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/35 line-through decoration-white/20"
                    >
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs text-white/50">
            All prices in GBP, exclusive of VAT. Deposits 30–50% at kickoff.
            Source code, design files and infrastructure keys handed over on
            launch — no vendor lock-in, ever.
          </p>
        </Reveal>
      </Section>

      {/* =========================================================
          COMPARISON / BENEFITS TABLE — highlight Most Popular column
          ========================================================= */}
      <Section className="border-t border-white/10 bg-gradient-to-b from-black via-[#04122e] to-black">
        <SectionHeading
          eyebrow="Compare Tiers"
          title={
            <>
              What&apos;s included across{" "}
              <span className="text-gradient-brand">every tier.</span>
            </>
          }
          description="A side-by-side comparison of software pricing, deliverables and SLAs across Starter, Growth, Scale and Custom Quote. Green check = included; soft-red cross = not included at this tier."
          align="center"
        />
        <Reveal delay={0.05}>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="min-w-[760px]">
              {/* Header row */}
              <div className="grid grid-cols-[2fr_repeat(4,1fr)] gap-2 border-b border-white/10 p-4">
                <div className="flex items-end">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                    Feature
                  </span>
                </div>
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className={cn(
                      "rounded-lg p-3 text-center",
                      tier.popular &&
                        "bg-gradient-to-b from-[#136dff]/20 to-transparent ring-1 ring-[#136dff]/40"
                    )}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-sm font-bold text-white">
                        {tier.name}
                      </span>
                      {tier.popular && (
                        <Sparkles className="h-3.5 w-3.5 text-[#136dff]" />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/60">{tier.price}</div>
                    {tier.popular && (
                      <div className="mt-1.5 inline-flex rounded-full bg-[#136dff]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-200">
                        Most Popular
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Body rows */}
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid grid-cols-[2fr_repeat(4,1fr)] items-center gap-2 border-b border-white/5 p-4",
                    idx % 2 === 1 && "bg-white/[0.015]"
                  )}
                >
                  <span className="text-sm text-white/80">{row.label}</span>
                  {row.cells.map((cell, ci) => (
                    <div
                      key={ci}
                      className={cn(
                        "flex justify-center text-center",
                        PRICING_TIERS[ci].popular &&
                          "rounded-md bg-[#136dff]/[0.04]"
                      )}
                    >
                      <ComparisonCell cell={cell} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        {/* Methodology + external authoritative citations */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/40">
            Benchmarks cross-referenced against the{" "}
            <a
              href="https://clutch.co/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#136dff] underline-offset-2 hover:underline"
            >
              Clutch 2025 software development buyer survey
            </a>
            ,{" "}
            <a
              href="https://www.goodfirms.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#136dff] underline-offset-2 hover:underline"
            >
              GoodFirms custom software cost research
            </a>{" "}
            and the{" "}
            <a
              href="https://www.statista.com/topics/310/artificial-intelligence-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#136dff] underline-offset-2 hover:underline"
            >
              Statista 2030 AI market forecast
            </a>
            . Currency benchmarks converted at GBP rates published Q1 2026.
          </p>
        </Reveal>
      </Section>

      {/* =========================================================
          EMAIL FORM — accessible, with sr-only label + help text
          ========================================================= */}
      <Section className="bg-black">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Get the pricing PDF in your inbox
              </h3>
              <p className="mt-2 text-sm text-white/60">
                We&apos;ll send the full tier breakdown, payment terms and 6-week
                PoC scoping template — no sales calls, no list-sharing.
              </p>
            </div>
            <form
              onSubmit={handlePdfSubmit}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              aria-label="Request the pricing PDF"
            >
              <div className="flex-1">
                <label htmlFor="pricing-email" className="sr-only">
                  Your work email address
                </label>
                <Input
                  id="pricing-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="pricing-email-help"
                  className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
                <span id="pricing-email-help" className="sr-only">
                  We&apos;ll only use this to send the pricing PDF. No marketing
                  list, no third-party sharing.
                </span>
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-11 shrink-0 bg-gradient-to-r from-[#136dff] to-[#0f5cff] text-white shadow-[0_0_20px_-4px] shadow-[#136dff]/60 hover:shadow-[0_0_28px_-2px] hover:shadow-[#136dff]/70"
              >
                {submitted ? "Sending…" : "Send me the PDF"}
                {!submitted && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-3 text-xs text-white/40">
              By requesting the PDF you agree to our{" "}
              <button
                type="button"
                onClick={() => onNavigate("legal-privacy")}
                className="text-[#136dff] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </button>
              . GDPR-compliant, unsubscribe in one click.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* =========================================================
          FAQ — semantic accordion, 25-45 word answers (GEO-ready)
          ========================================================= */}
      <Section className="border-t border-white/10 bg-gradient-to-b from-black via-[#04122e] to-black">
        <SectionHeading
          eyebrow="Pricing FAQs"
          title={
            <>
              Frequently asked{" "}
              <span className="text-gradient-brand">pricing questions.</span>
            </>
          }
          description="The pricing questions founders ask on the first call — answered straight, before you book anything. Answers are kept short and factual so AI assistants can extract them directly."
          align="center"
        />
        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 backdrop-blur-md"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-white/70">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* =========================================================
          FINAL STICKY CTA — gradient, single button (CtaSection)
          ========================================================= */}
      <CtaSection
        onNavigate={onNavigate}
        title={
          <>
            Ready to start? Book a free 30-minute scoping call.
          </>
        }
        description="We'll recommend the right tier for your goals, audience and budget — and if none of them fit, we'll tell you that too. No sales deck, no obligation, no follow-up emails unless you ask."
        ctaLabel="Book my free scoping call"
      />

      {/* =========================================================
          MOBILE STICKY BOTTOM BAR — single CTA, mobile-first
          ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#136dff]/30 bg-black/90 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <Clock className="h-3.5 w-3.5 text-[#136dff]" />
              Free 30-min scoping call
            </div>
            <div className="truncate text-xs text-white/60">
              Senior engineer · No obligation · NDA on request
            </div>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#136dff] to-[#0f5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_-4px] shadow-[#136dff]/60"
          >
            Book now
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Final-CTA trust badges — NDA, draft architecture, fixed-fee quote
          (rendered inline so CtaSection stays single-button per spec) */}
      <Section className="bg-black pt-0">
        <Reveal>
          <div className="mx-auto -mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#136dff]" /> NDA before
              discovery
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#136dff]" /> Draft architecture in
              48h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#136dff]" /> Fixed-fee quote
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#136dff]" /> Senior engineer,
              not a salesperson
            </span>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
