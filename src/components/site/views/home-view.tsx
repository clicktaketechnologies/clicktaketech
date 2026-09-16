"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Quote,
  Star,
} from "lucide-react";
import {
  STATS,
  IMPACT_STATS,
  CAPABILITIES,
  PROCESS_STEPS,
  TESTIMONIALS,
  TECH_STACK,
  BRAND_TAGLINE,
  EAT_SIGNALS,
  type NavView,
} from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";
import { EatTrustStrip } from "@/components/site/seo-content-blocks";
import { Icon3D } from "@/components/site/icon-3d";

// 3D emoji glyphs for the four capability cards on the homepage.
const CAPABILITY_EMOJIS: Record<string, string> = {
  "01": "📣",
  "02": "💻",
  "03": "🤖",
  "04": "🎨",
};

type HomeViewProps = {
  onNavigate: (v: NavView) => void;
};

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: copy */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Senior engineers · 24 services · 4 offices worldwide
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  We ship <span className="text-gradient-brand">software</span> that actually works —
                  and <span className="text-gradient-pink">AI</span> that earns its keep.
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300">
                  <Sparkles className="h-3 w-3" />
                  {BRAND_TAGLINE}
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Hey — we&apos;re ClickTake, a senior engineering team that ships custom software,
                  AI automation, web design services, SEO services and digital marketing for
                  founders across Birmingham, London, Manchester, Austin, Dubai and Multan. No
                  &ldquo;production-grade&rdquo; fluff: software that actually ships, that your team
                  can maintain, and that your analytics team can verify.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_28px_-4px] hover:shadow-blue-500/60"
                  >
                    Start Your Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => onNavigate("case-studies")}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                  >
                    View Case Studies
                    <ArrowUpRight className="h-4 w-4 text-blue-400" />
                  </button>
                </div>
              </Reveal>
              {/* Local SEO trust strip — reinforces local relevance + conversion trust */}
              <LocalTrustStrip className="mt-6" />
            </div>

            {/* Right: terminal card */}
            <Reveal delay={0.2} y={32}>
              <HeroTerminal />
            </Reveal>
          </div>

          {/* Stats bar */}
          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card/50 p-5 text-center backdrop-blur sm:p-6">
                  <div className="text-2xl font-bold tracking-tight text-gradient-brand sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <Section id="capabilities">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Four practices. <span className="text-gradient-brand">One team, one bar.</span>
            </>
          }
          description="We don&apos;t hand you a 200-page deck and disappear. Whether you need custom software development, AI automation, or a full digital marketing agency, you work with one team that owns design, code, cloud and growth end-to-end — so your roadmap ships as one coherent product, not four vendor handoffs."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <button
                onClick={() => onNavigate("services")}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />
                <div className="flex items-center justify-between">
                  <Icon3D emoji={CAPABILITY_EMOJIS[cap.num] ?? "✨"} size="md" variant={(["brand","blue","pink","neutral"] as const)[i % 4]} />
                  <span className="font-mono text-xs text-muted-foreground/60">{cap.num}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== PROCESS ===== */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              From discovery to <span className="text-gradient-brand">deployment.</span>
            </>
          }
          description="No vague discovery phases that drag on for months. Each step has a fixed deliverable, a fixed timeline, and a clear exit criterion — you always know what you&apos;re paying for and when you&apos;ll see it."
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
                {i < PROCESS_STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-blue-500/40 lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== IMPACT ===== */}
      <Section>
        <SectionHeading
          eyebrow="Production Impact"
          title={
            <>
              Numbers that <span className="text-gradient-pink">compounded.</span>
            </>
          }
          description="Real outcomes from real clients — measured against their pre-engagement baseline and verified by their own analytics team. Every number below is live in production today, not a slide-deck projection."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 text-center ring-gradient">
                <div className="text-3xl font-bold tracking-tight text-gradient-brand sm:text-4xl">
                  {s.value}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onNavigate("case-studies")}
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
            >
              Read full case studies
              <ArrowRight className="h-4 w-4 text-blue-400" />
            </button>
          </div>
        </Reveal>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Client Outcomes"
          title={
            <>
              What clients <span className="text-gradient-brand">actually say.</span>
            </>
          }
          description="Verbatim quotes from clients across 4 continents — no marketing edits, no polite rewriting. If you want to talk to any of them directly before signing, we&apos;ll make the intro."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-7">
                <Quote className="absolute right-5 top-5 h-10 w-10 text-blue-500/10" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-pink-400 text-pink-400" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/40 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                    <div className="text-xs text-blue-400/70">{t.location}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== TECH STACK ===== */}
      <Section>
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

      {/* ===== E-A-T TRUST STRIP ===== */}
      <Section className="border-t border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Expertise · Authoritativeness · Trust"
          title={
            <>
              Why teams choose <span className="text-gradient-brand">ClickTake.</span>
            </>
          }
          description="Quantifiable signals that align with Google's E-E-A-T quality-rater guidelines — and that your CFO can verify."
          align="center"
        />
        <div className="mt-10">
          <EatTrustStrip />
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            EAT_SIGNALS reference count: {EAT_SIGNALS.length} verified credentials
          </p>
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <CtaSection
        onNavigate={onNavigate}
        title={
          <>
            Let&apos;s ship something that{" "}
            <span className="text-gradient-brand">actually works.</span>
          </>
        }
        description="Book a 30-minute call. We&apos;ll listen to your roadmap, point at the highest-ROI automation or rebuild, and tell you honestly whether we&apos;re the right team for it — no slide deck, no hard sell."
        ctaLabel="Start Your Project"
        secondaryLabel="View Case Studies"
        secondaryView="case-studies"
      />
    </>
  );
}

function HeroTerminal() {
  const lines = [
    { prompt: "$", text: "clicktake deploy --env=production", color: "text-blue-400" },
    { prompt: ">", text: "Build Pipeline · Test coverage ✓", color: "text-foreground" },
    { prompt: ">", text: "Live Deploy · commits this week 142", color: "text-foreground" },
    { prompt: "✓", text: "p99 120ms · 10M req/day · 99.9% SLA", color: "text-pink-400" },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 to-pink-500/10 blur-2xl" />
      <div className="overflow-hidden rounded-2xl glass-strong shadow-deep">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-pink-400/80" />
          <span className="h-3 w-3 rounded-full bg-blue-400/80" />
          <div className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            clicktake@production: ~/deploy
          </div>
        </div>
        {/* body */}
        <div className="space-y-2.5 p-5 font-mono text-sm">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <span className="text-blue-400">{line.prompt}</span>
              <span className={line.color}>{line.text}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.4 }}
            className="flex items-center gap-2 pt-1"
          >
            <span className="text-blue-400">$</span>
            <span className="inline-block h-4 w-2 animate-pulse bg-blue-400" />
          </motion.div>
        </div>
        {/* footer badges */}
        <div className="grid grid-cols-3 gap-px border-t border-border/40 bg-border/30 text-center">
          {[
            { k: "Deployments", v: "120+" },
            { k: "Continents", v: "4" },
            { k: "Uptime", v: "99.9%" },
          ].map((b) => (
            <div key={b.k} className="bg-card/60 px-3 py-3">
              <div className="text-base font-bold text-blue-400">{b.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {b.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
