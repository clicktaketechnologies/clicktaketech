"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, GitBranch, ShieldCheck, Cpu, Zap, Sparkles } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  PROCESS_STEPS,
  TECH_STACK,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading, LocalTrustStrip, CtaSection } from "@/components/site/section";

type ServicesViewProps = {
  onNavigate: (v: NavView) => void;
  onNavigateService?: (slug: string) => void;
};

// Senior-engineer-tone category blurbs that double as SEO copy.
// Each line weaves in the practice's primary service keywords so the page
// ranks for high-intent commercial queries (web design services, SEO services,
// AI automation, custom software development, WordPress & ecommerce web design).
const CATEGORY_BLURBS: Record<string, string> = {
  "digital-marketing":
    "We don't buy vanity metrics. PPC, SEO services, content, CRO and social are run as one revenue engine — tracked from impression to closed-won, audited monthly, and tuned to the CPA target your CFO actually signed off on.",
  "web-software":
    "We don't ship prototypes — we ship products with design systems, observability, CI/CD, and E2E test coverage from day one. Full-stack web development, SaaS platform engineering, custom software development, WordPress web design and ecommerce web design all live under one roof.",
  "ai-automation":
    "Custom LLMs, autonomous agents and AI automation — built for production workloads, not demos. Every system ships with an eval harness, guardrails, cost controls and a human-in-loop fallback before it ever touches a real customer.",
  "creative-brand":
    "Premium craft, delivered on deadline. Brand identity, professional web design services, B2B video production and creative systems that make your product unmistakable across every touchpoint — from the first impression to the hundredth.",
};

export function ServicesView({ onNavigate, onNavigateService }: ServicesViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              24 Services · 4 Practice Areas · One Delivery Engine
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Full-spectrum{" "}
              <span className="text-gradient-brand">engineering services.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We don't ship prototypes — we ship products with design systems,
              observability, CI/CD and E2E test coverage from day one. Senior
              engineers (8+ yrs avg) embed into your roadmap, ship every two weeks,
              and hand over an architecture your team can actually maintain —
              serving businesses in Birmingham, London, Dubai, Austin and beyond.
            </p>
          </Reveal>
          {/* Category quick-nav */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-blue-500/40 hover:text-foreground"
                >
                  <cat.icon className="h-4 w-4 text-blue-400" />
                  {cat.label}
                  <span className="rounded-full bg-blue-500/10 px-1.5 text-[10px] font-bold text-blue-400">
                    {cat.services.length}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
          {/* Local SEO trust strip — reinforces local relevance under the hero */}
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Categories */}
      {SERVICE_CATEGORIES.map((cat, catIdx) => (
        <Section
          key={cat.id}
          id={`cat-${cat.id}`}
          className={catIdx % 2 === 1 ? "border-y border-border/40 bg-card/20" : ""}
        >
          {/* Category header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_0_20px_-4px] shadow-blue-500/50">
                  <cat.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Practice 0{catIdx + 1}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{cat.label}</h2>
              <p className="mt-2 text-sm font-medium text-blue-400">{cat.tagline}</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {CATEGORY_BLURBS[cat.id] ?? cat.blurb}
              </p>
            </div>
          </div>

          {/* Service cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cat.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateService) onNavigateService(service.slug);
                    else onNavigate("services");
                  }}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 transition-transform group-hover:scale-110">
                      <service.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 flex items-center gap-1 border-t border-border/40 pt-4 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    View service <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      {/* City relevance hook — local-intent callout */}
      <Section className="border-y border-border/40 bg-card/20">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 via-card/40 to-pink-500/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Local intent, global delivery
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Looking for web design, SEO or AI automation in your city?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We serve 13 cities across the UK, USA, UAE and Pakistan — same senior
                engineers, same delivery engine, same UK Ltd Co invoicing. From Birmingham
                to Dubai, your project moves 18 hours a day.
              </p>
            </div>
            <button
              onClick={() => onNavigate("cities")}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition-all hover:border-blue-500/60 hover:bg-blue-500/15"
            >
              View cities we serve
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>

      {/* Process */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Delivery Model"
          title={
            <>
              Four steps. <span className="text-gradient-pink">Six weeks to live.</span>
            </>
          }
          description="A dedicated lead engineer owns your project end-to-end — from discovery through a 30-day post-launch hypercare window."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-gradient-brand">{step.num}</span>
                  <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-medium text-blue-400">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                <div className="mt-4 border-t border-border/40 pt-3 text-xs text-muted-foreground">
                  <span className="text-foreground">Deliverable: </span>
                  {step.deliverable}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Feature highlights */}
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GitBranch, title: "CI/CD from day one", desc: "Every commit ships through automated pipelines with SAST, DAST, and E2E gates." },
            { icon: Clock, title: "Weekly demos", desc: "Two-week sprints with live demos. No surprise launches — you see progress every week." },
            { icon: ShieldCheck, title: "Observability baked in", desc: "OpenTelemetry traces, Grafana dashboards, and alerting before a single user arrives." },
            { icon: Zap, title: "p99 120ms SLA", desc: "Performance budgets enforced in CI. Regressions surface before they reach production." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section className="border-t border-border/40">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Production Stack
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/50 bg-card/40 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-500/40 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Ready to scope your first sprint?"
        description="A senior engineer (not a salesperson) joins the call with a draft architecture for your use case. Average response time: under 4 hours."
        ctaLabel="Talk to an engineer"
        secondaryLabel="View Pricing"
        secondaryView="pricing"
      />
    </>
  );
}
