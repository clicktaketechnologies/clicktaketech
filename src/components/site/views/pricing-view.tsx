"use client";

import { ArrowRight, Check, X, Sparkles } from "lucide-react";
import {
  PRICING_TIERS,
  PRICING_FAQS,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type PricingViewProps = {
  onNavigate: (v: NavView) => void;
};

export function PricingView({ onNavigate }: PricingViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Pricing · Starter · Growth · Scale · Custom
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Transparent pricing. <span className="text-gradient-brand">No universal packages.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ClickTake Technologies ships four engagement tiers across the UK, Pakistan, USA and
              Dubai. These are starting points — every project is scoped in a free 30-minute
              discovery call to match your specific goals, audience and budget. No fake universal
              pricing, no hidden fees.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing tiers */}
      <Section className="pt-4">
        <div className="grid gap-5 lg:grid-cols-4">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-1",
                  tier.popular
                    ? "border-blue-500/50 bg-card/60 ring-1 ring-blue-500/30 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/30"
                    : "border-border/50 bg-card/40 hover:border-blue-500/40"
                )}
              >
                {tier.popular && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Sparkles className="h-3 w-3" /> Popular
                  </div>
                )}
                <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>
                <div className="mt-5">
                  <div className="text-3xl font-bold text-gradient-brand">{tier.price}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{tier.cadence}</div>
                </div>
                <button
                  onClick={() => onNavigate("contact")}
                  className={cn(
                    "mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                    tier.popular
                      ? "bg-brand-gradient text-white hover:shadow-[0_0_20px_-4px] hover:shadow-blue-500/60"
                      : "border border-border/60 bg-card/40 text-foreground hover:border-blue-500/40 hover:bg-card"
                  )}
                >
                  {tier.cta}
                </button>
                <ul className="mt-6 space-y-2.5 border-t border-border/40 pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50 line-through decoration-muted-foreground/30">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's never included */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Our Promise"
          title={
            <>
              What&apos;s never included — <span className="text-gradient-pink">and never will be.</span>
            </>
          }
          description="Four things you will never see in a ClickTake engagement. Ever."
          align="center"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Juniors on your budget", desc: "Senior engineers (8+ yrs avg) own every engagement. No learning on your dime." },
            { title: "Vague discovery phases", desc: "Each step has a fixed deliverable, fixed timeline, and a written exit criterion." },
            { title: "Vendor lock-in", desc: "Code + keys handed over on launch. Your team can maintain the architecture." },
            { title: "Surprise launch fees", desc: "Fixed-scope, fixed-fee PoCs. What you sign is what you pay — nothing more." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                  <X className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading
          eyebrow="Pricing FAQs"
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
              {PRICING_FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 px-5">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Not sure which tier fits?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Book a free 30-minute discovery call. We&apos;ll recommend the right tier for your goals, audience and budget — no pressure.
            </p>
            <button onClick={() => onNavigate("contact")} className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60">
              Book a discovery call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
