"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SOLUTIONS, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type SolutionsViewProps = {
  onNavigate: (v: NavView) => void;
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
              ClickTake Technologies ships tailored solutions for six audience types across the
              UK, Pakistan, USA and Dubai. Each solution combines the right mix of services — web,
              AI, marketing and creative — into a fixed-scope, fixed-timeline engagement with
              measurable outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions grid */}
      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((sol, i) => (
            <Reveal key={sol.title} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 transition-transform group-hover:scale-110">
                  <sol.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-blue-400/80">
                  {sol.audience}
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight">{sol.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sol.desc}</p>
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
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Not sure banner */}
      <Section className="pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Not sure which solution fits?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Book a free 30-minute consultation — we&apos;ll scope it together and recommend
                  the right path. A senior engineer joins the call, not a salesperson.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    "Free 30-min consultation",
                    "Draft architecture included",
                    "No commitment required",
                  ].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs font-medium text-blue-300"
                    >
                      <Check className="h-3 w-3" /> {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  onClick={() => onNavigate("contact")}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_24px_-4px] hover:shadow-blue-500/60"
                >
                  Book a Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => onNavigate("work")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                >
                  See results
                  <ArrowUpRight className="h-4 w-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
