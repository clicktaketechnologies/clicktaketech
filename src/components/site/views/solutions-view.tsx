"use client";

import { ArrowRight } from "lucide-react";
import { SOLUTIONS, type NavView } from "@/lib/site-data";
import { Reveal, Section, LocalTrustStrip, CtaSection } from "@/components/site/section";
import { Icon3D } from "@/components/site/icon-3d";

// 3D emoji glyphs for each solution audience.
const SOLUTION_EMOJI: Record<string, string> = {
  "For Startups": "🚀",
  "For Local Businesses": "🏪",
  "For E-commerce Brands": "🛒",
  "For Repair Shops": "🔧",
  "For UK Businesses": "🇬🇧",
  "For Agencies": "🤝",
};

type SolutionsViewProps = {
  onNavigate: (v: NavView) => void;
};

// Empathetic, audience-specific copy that speaks directly to each business
// type. Each line weaves in the relevant local-intent keywords (local SEO,
// small business web design, ecommerce development, SaaS development) so the
// page ranks for "X for {audience}" and "{keyword} near me" queries.
const SOLUTION_DESC_OVERRIDES: Record<string, string> = {
  "For Startups":
    "You've got a vision and a hard launch date. We take you from idea to live product in 90 days — full brand system, production SaaS development on Next.js, and an AI assistant that genuinely moves the needle. No agency fog, just shipped software.",
  "For Local Businesses":
    "You don't need a flashy site — you need the local pack, more calls and more walk-ins. We handle local SEO, small business web design, reviews automation and a fast mobile-first site built to convert the people already searching for you nearby.",
  "For E-commerce Brands":
    "Headless commerce that loads in 1.5s and converts 25–60% better. Our ecommerce development runs on Shopify Hydrogen, Medusa or custom — sub-second LCP, AI-assisted merchandising, and infinite scale without re-platforming every Black Friday.",
  "For Repair Shops":
    "Repair-shop software built the way you actually work — serialized inventory, ticket tracking, customer status lookups, and fewer phone calls. Cut ticket time 40%, slash incoming calls 70%, and stop losing parts to bad paperwork.",
  "For UK Businesses":
    "A UK-registered partner that actually understands GDPR, HMRC and what 'local' means in your market. UK Ltd Co invoicing, EMEA coverage, and engineers who work your business hours — not 9 timezones away.",
  "For Agencies":
    "White-label engineering, AI and growth — under your brand, plugged into your delivery pipeline. Senior teams, UK business hours, and margins your clients won't question. We disappear into your process so you look like the hero.",
};

export function SolutionsView({ onNavigate }: SolutionsViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Solutions
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Built for your business type —{" "}
              <span className="text-gradient-brand">not a generic pitch.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We've shipped enough products to know that a startup, a repair shop and a
              DTC brand don't want the same website. So we don't sell one. Each solution
              below is a fixed-scope, fixed-timeline engagement — the right mix of web,
              AI, marketing and creative for your business type, delivered by the same
              senior engineers from Birmingham to Dubai.
            </p>
          </Reveal>
          {/* Local SEO trust strip — local relevance + conversion trust */}
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Solutions grid */}
      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((sol, i) => (
            <Reveal key={sol.title} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
                <Icon3D emoji={SOLUTION_EMOJI[sol.title] ?? "✨"} size="md" variant={(["brand","blue","pink"] as const)[i % 3]} />
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-blue-400/80">
                  {sol.audience}
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight">{sol.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SOLUTION_DESC_OVERRIDES[sol.title] ?? sol.desc}
                </p>
                {/* Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/40 pt-5">
                  {sol.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-sm font-bold text-gradient-brand sm:text-base">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate("contact")}
                  className="group mt-5 flex items-center justify-between gap-2 border-t border-border/40 pt-4 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                >
                  Talk to us about this
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Not sure which solution fits?"
        description="Book a free 30-minute consultation — we'll scope it together and recommend the right path. A senior engineer joins the call, not a salesperson. Free, no commitment, draft architecture included."
        ctaLabel="Book a free consultation"
        secondaryLabel="See results"
        secondaryView="case-studies"
      />
    </>
  );
}
