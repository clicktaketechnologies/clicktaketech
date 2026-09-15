"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Globe2,
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
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

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
                  AI-Native Software Engineering · 24 Services · 4 Continents
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Engineering{" "}
                  <span className="text-gradient-brand">Tomorrow&apos;s</span>{" "}
                  Intelligence, <span className="text-gradient-pink">Today.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  ClickTake Technologies ships production-grade software, autonomous AI
                  agents, and cloud architecture for global enterprises — trusted by 150+
                  teams across 4 continents with 99.9% uptime and 10M+ API requests served
                  every day.
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
                    onClick={() => onNavigate("work")}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                  >
                    View Case Studies
                    <ArrowUpRight className="h-4 w-4 text-blue-400" />
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> SOC 2 Type II
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-blue-400" /> AWS · GCP · Azure
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-blue-400" /> 99.9% SLA
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> GDPR · CCPA
                  </span>
                </div>
              </Reveal>
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
          eyebrow="Core Capabilities"
          title={
            <>
              Six practices. <span className="text-gradient-brand">One delivery engine.</span>
            </>
          }
          description="Every ClickTake engagement is structured around six tightly-integrated practices. They share the same design system, the same observability stack, and the same engineering bar — so your roadmap ships as one coherent product, not six vendor handoffs."
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 transition-transform group-hover:scale-110">
                    <cap.icon className="h-6 w-6" />
                  </span>
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
          description="A repeatable 4-step engagement model. No vague discovery phases that drag on for months — each step has a fixed deliverable, a fixed timeline, and a fixed exit criterion."
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
          description="Real client outcomes measured against the pre-engagement baseline and verified by their analytics team. Every metric below is in production right now."
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
              onClick={() => onNavigate("work")}
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
              What clients <span className="text-gradient-brand">say.</span>
            </>
          }
          description="Real outcomes from real clients across 4 continents. Each quote is verbatim — no marketing edits."
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

      {/* ===== CTA ===== */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/5 p-8 text-center sm:p-12 lg:p-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to deploy your{" "}
                <span className="text-gradient-brand">AI workforce?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Book a 30-minute architecture review. We&apos;ll map your roadmap, identify
                the highest-ROI automation, and ship a working PoC within 6 weeks.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate("contact")}
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_28px_-4px] hover:shadow-blue-500/60"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="mailto:info@clicktaketech.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
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
