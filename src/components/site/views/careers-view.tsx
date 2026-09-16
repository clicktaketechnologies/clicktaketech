"use client";

import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { JOBS, CAREERS_PERKS, type NavView } from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";

type CareersViewProps = {
  onNavigate: (v: NavView) => void;
  onApply?: (jobSlug: string) => void;
};

export function CareersView({ onNavigate, onApply }: CareersViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Careers · Join ClickTake
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build production software that{" "}
              <span className="text-gradient-brand">millions rely on.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We hire senior-first — engineers with 8+ years who&apos;ve already shipped to
              production. From week one, you&apos;ll work on systems handling 10M+ requests a day,
              with a UK-based account lead and a Pakistan-based tech lead who actually know what
              they&apos;re doing. Four offices (Birmingham, Multan, Austin, Dubai), remote-first,
              AI-native. No busywork, no juniors learning on your budget.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Perks */}
      <Section className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAREERS_PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_0_18px_-4px] shadow-blue-500/50">
                  <perk.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open roles */}
      <Section className="border-t border-border/40">
        <SectionHeading
          eyebrow="Open Positions"
          title={
            <>
              Current <span className="text-gradient-blue">openings.</span>
            </>
          }
          description="Senior-first, with a paid intern program for emerging talent. Every role ships to production — no toy projects, no busywork, no &quot;shadowing&quot; for six months."
        />
        <div className="mt-10 space-y-3">
          {JOBS.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.04}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:border-blue-500/40 hover:bg-card/60 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <span className="rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[11px] font-medium text-pink-400">
                      {job.department}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.desc}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> {job.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => (onApply ? onApply(job.slug) : onNavigate("contact"))}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-pink-500/60"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Don't see your role?"
        description="We&apos;re always looking for senior engineers, designers, and marketers. Send your portfolio — we read every application and reply within 4 business hours."
        ctaLabel="Send your portfolio"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
