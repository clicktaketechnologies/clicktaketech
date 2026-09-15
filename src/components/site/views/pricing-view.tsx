"use client";

import { Check, X, Sparkles } from "lucide-react";
import {
  PRICING_TIERS,
  PRICING_FAQS,
  type NavView,
} from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";
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
              Most agencies hide their prices or quote a number from thin air. We don&apos;t. Here are
              real starting points for our four engagement tiers — actual{" "}
              <span className="text-foreground">web design pricing</span>,{" "}
              <span className="text-foreground">SEO pricing</span> and{" "}
              <span className="text-foreground">AI automation cost</span> ranges, all in GBP. Every
              project is still scoped in a free 30-minute call to match your goals and budget.
              <span className="text-foreground"> No fake universal pricing, no hidden fees.</span>
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
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
          description="Four things you will never see on a ClickTake invoice. Ever. If you find one, forward it to us and we&apos;ll refund the whole engagement."
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
          description="The pricing questions founders ask on the first call — answered straight, before you book anything."
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
      <CtaSection
        onNavigate={onNavigate}
        title="Not sure which tier fits?"
        description="Book a free 30-minute discovery call. We&apos;ll recommend the right tier for your goals, audience and budget — and if none of them fit, we&apos;ll tell you that too."
        ctaLabel="Book a discovery call"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
