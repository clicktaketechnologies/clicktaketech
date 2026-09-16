"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CASE_STUDIES, type NavView } from "@/lib/site-data";
import { Reveal, Section, LocalTrustStrip, CtaSection } from "@/components/site/section";

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
              Four engagements from the past 18 months. Every number below is measured against the
              client&apos;s pre-engagement baseline and verified by their analytics team — not a
              slide-deck projection. Tech tags reflect the actual production stack we shipped, not
              the one we wanted to use.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
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
                    {/* Headline outcomes — clean delta, no fabricated exact baselines */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {cs.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-5"
                        >
                          <div className="text-xs uppercase tracking-wide text-muted-foreground">
                            {m.label}
                          </div>
                          <div
                            className={`mt-2 inline-flex items-center gap-1.5 text-2xl font-bold ${m.positive ? "text-gradient-brand" : "text-red-400"}`}
                          >
                            {m.positive ? (
                              <TrendingUp className="h-5 w-5 text-blue-400" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-400" />
                            )}
                            {m.delta}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {m.positive ? "Improvement" : "Reduction"} vs. pre-engagement baseline.
                          </p>
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
      <CtaSection
        onNavigate={onNavigate}
        title="Your case study is next."
        description="Every engagement begins with a fixed-scope PoC — ship a working system in 6 weeks, then decide if we keep going. No multi-month lock-in, no slide-deck projections."
        ctaLabel="Start your project"
        secondaryLabel="View pricing"
        secondaryView="pricing"
      />
    </>
  );
}
