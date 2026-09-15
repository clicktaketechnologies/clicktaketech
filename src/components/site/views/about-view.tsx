"use client";

import { ArrowRight, Check, X, Minus } from "lucide-react";
import {
  ABOUT_STATS,
  HISTORY_TIMELINE,
  COMPANY_VALUES,
  ENGAGEMENT_PHASES,
  COMPARE_ROWS,
  FAQS,
  OFFICES,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AboutViewProps = {
  onNavigate: (v: NavView) => void;
};

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              About ClickTake
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              A multi-region agency engineering{" "}
              <span className="text-gradient-brand">AI, Web &amp; Growth</span> systems since 2019.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              120+ projects shipped across four offices — Birmingham (UK HQ), Multan (engineering
              hub), Austin (US business desk) and Dubai (MENA office). We combine UK business-hours
              coverage with an extended Pakistan delivery window for 18-hour workdays on every
              engagement.
            </p>
          </Reveal>
          {/* Stats */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {ABOUT_STATS.map((s) => (
                <div key={s.label} className="bg-card/50 p-5 text-center">
                  <div className="text-2xl font-bold text-gradient-brand sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-3">
          {COMPANY_VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* History timeline */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Company History & Operating Model"
          title={
            <>
              From a Birmingham web shop to a{" "}
              <span className="text-gradient-brand">four-continent engineering firm.</span>
            </>
          }
        />
        <div className="mt-12 space-y-6">
          {HISTORY_TIMELINE.map((item, i) => (
            <Reveal key={item.period} delay={i * 0.06}>
              <div className="grid gap-4 rounded-2xl border border-border/50 bg-card/40 p-6 sm:grid-cols-[180px_1fr] sm:p-8">
                <div>
                  <span className="font-mono text-sm font-semibold text-blue-400">
                    {item.period}
                  </span>
                  <div className="mt-2 hidden h-full w-px bg-gradient-to-b from-blue-500/40 to-transparent sm:block" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement phases */}
      <Section>
        <SectionHeading
          eyebrow="How We Run Engagements"
          title={
            <>
              5 phases, 4 offices, <span className="text-gradient-pink">one team.</span>
            </>
          }
          description="A repeatable engagement model with fixed deliverables, fixed timelines, and a written exit criterion at every phase."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {ENGAGEMENT_PHASES.map((phase, i) => (
            <Reveal key={phase.num} delay={i * 0.05}>
              <div className="relative h-full rounded-2xl border border-border/50 bg-card/40 p-5">
                <span className="text-3xl font-bold text-gradient-brand">{phase.num}</span>
                <h3 className="mt-3 text-base font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="How ClickTake Compares"
          title={
            <>
              ClickTake vs.{" "}
              <span className="text-gradient-brand">the alternatives.</span>
            </>
          }
          description="An honest comparison against a UK boutique agency, an offshore firm, and an in-house hire."
        />
        <Reveal delay={0.05}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[680px] overflow-hidden rounded-2xl border border-border/50">
              <thead>
                <tr className="bg-card/60">
                  <th className="p-4 text-left text-sm font-semibold">Capability</th>
                  <th className="p-4 text-center text-sm font-semibold text-blue-400">
                    ClickTake
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-muted-foreground">
                    UK Boutique
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-muted-foreground">
                    Offshore
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-muted-foreground">
                    In-house
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card/20" : "bg-transparent"}>
                    <td className="p-4 text-sm text-foreground">{row.feature}</td>
                    <td className="p-4 text-center">
                      <CompareCell value={row.clicktake} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <CompareCell value={row.boutique} />
                    </td>
                    <td className="p-4 text-center">
                      <CompareCell value={row.offshore} />
                    </td>
                    <td className="p-4 text-center">
                      <CompareCell value={row.inhouse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* Offices */}
      <Section>
        <SectionHeading
          eyebrow="Where We Are"
          title={
            <>
              Four offices. <span className="text-gradient-brand">18-hour workdays.</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
                <div className="text-4xl">{o.flag}</div>
                <h3 className="mt-3 text-base font-semibold">{o.city}</h3>
                <p className="text-xs text-muted-foreground">{o.country}</p>
                <span className="mt-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">
                  {o.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border/40">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently asked <span className="text-gradient-brand">questions.</span>
            </>
          }
          align="center"
        />
        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 px-5"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/5 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want to talk to a real engineer, not a salesperson?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Book a 30-minute intro call. We bring a draft architecture and a ballpark estimate.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_28px_-4px] hover:shadow-blue-500/60"
            >
              Book a 30-min intro call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function CompareCell({
  value,
  highlight = false,
}: {
  value: boolean | string;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight ? "bg-blue-500 text-white" : "bg-blue-500/15 text-blue-400"
        }`}
      >
        <Check className="h-4 w-4" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-muted-foreground/50">
        <X className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      <Minus className="h-3 w-3" />
      {value}
    </span>
  );
}
