"use client";

import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { CASE_STUDIES, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type CaseStudiesViewProps = {
  onNavigate: (v: NavView) => void;
};

export function CaseStudiesView({ onNavigate }: CaseStudiesViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Case Studies · Real Engagements, Real Metrics
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Real clients. <span className="text-gradient-brand">Real numbers.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Four engagements from the past 18 months. Every metric is measured against the
              client&apos;s pre-engagement baseline and verified by their analytics team. Tech tags
              reflect the actual production stack — not what we wanted to use, what we shipped.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Case studies */}
      <Section className="pt-4">
        <div className="space-y-6">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.04}>
              <article className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 lg:p-10">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/12" />
                <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cs.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">{cs.sector}</div>
                        <div className="text-xs text-muted-foreground">{cs.type}</div>
                      </div>
                    </div>
                    <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{cs.title}</h2>
                    <div className="mt-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Production stack</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cs.stack.map((s) => (
                          <span key={s} className="rounded-md border border-border/50 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{cs.summary}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="rounded-2xl border border-border/50 bg-background/40 p-4">
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                          <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="text-sm text-muted-foreground line-through decoration-red-400/60">{m.before}</span>
                            <span className="text-lg font-bold text-foreground">{m.after}</span>
                          </div>
                          <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${m.positive ? "bg-blue-500/15 text-blue-400" : "bg-red-500/15 text-red-400"}`}>
                            {m.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {m.delta}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your case study is next.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Every engagement begins with a fixed-scope PoC. Ship a working system in 6 weeks, then decide if we keep going.
            </p>
            <button onClick={() => onNavigate("contact")} className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60">
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
