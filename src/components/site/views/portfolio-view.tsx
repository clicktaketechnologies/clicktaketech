"use client";

import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { PORTFOLIO, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type PortfolioViewProps = {
  onNavigate: (v: NavView) => void;
};

export function PortfolioView({ onNavigate }: PortfolioViewProps) {
  const categoryCounts = [
    { label: "SaaS Platform", count: PORTFOLIO.filter((p) => p.category === "SaaS Platform").length, desc: "Multi-tenant products & dashboards" },
    { label: "Gadget Repair", count: PORTFOLIO.filter((p) => p.category === "Gadget Repair").length, desc: "Repair-shop commerce & booking sites" },
    { label: "Education", count: PORTFOLIO.filter((p) => p.category === "Education").length, desc: "Learning platforms & academy systems" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Portfolio · 12 Live Client Sites
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Production work, <span className="text-gradient-brand">live right now.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Twelve client platforms built and maintained by ClickTake Technologies — SaaS products,
              education portals, and e-commerce stores across the UK and globally. Every link is a
              live deployment, not a mockup.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category counts */}
      <Section className="pt-4">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-3">
            {categoryCounts.map((c) => (
              <div key={c.label} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 px-4 py-3">
                <span className="text-2xl font-bold text-gradient-brand">{c.count}</span>
                <div>
                  <div className="text-sm font-semibold">{c.label}</div>
                  <div className="text-xs text-muted-foreground">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Portfolio grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.03}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-400">{item.category}</span>
                  <span className="text-xs text-muted-foreground">since {item.since}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-blue-400" /> {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-3 w-3" /> Visit
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your product, live next.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              From first whiteboard sketch to a 24/7 production deployment — we own the entire lifecycle.
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
