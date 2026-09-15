"use client";

import { ArrowRight, MapPin, Briefcase, Clock, Building2 } from "lucide-react";
import { JOBS, CAREERS_PERKS, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type CareersViewProps = {
  onNavigate: (v: NavView) => void;
};

export function CareersView({ onNavigate }: CareersViewProps) {
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
              We&apos;re a remote-first, AI-native engineering firm with 4 offices across the UK,
              Pakistan, USA and UAE. Senior engineers own engagements end-to-end and ship to
              10M+ req/day systems from week one.
            </p>
          </Reveal>
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
          description="We hire senior-first, with a paid intern program for emerging talent. Every role ships to production — no busywork."
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
                  onClick={() => onNavigate("contact")}
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
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <Building2 className="mx-auto h-10 w-10 text-blue-400" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t see your role?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              We&apos;re always looking for senior engineers, designers, and marketers. Send us your
              portfolio — we read every application.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
            >
              Send your portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
