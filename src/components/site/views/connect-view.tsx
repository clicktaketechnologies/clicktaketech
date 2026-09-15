"use client";

import { ArrowRight, ArrowUpRight, Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import {
  CONTACT_METHODS,
  SOCIAL_LINKS,
  OFFICES,
  NEXT_STEPS,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type ConnectViewProps = {
  onNavigate: (v: NavView) => void;
};

export function ConnectView({ onNavigate }: ConnectViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Connect · Direct Contact & Social
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s <span className="text-gradient-brand">connect.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Reach out however suits you — email, phone, WhatsApp, or social. We read every
              message and respond within 4 business hours. For a structured project inquiry, use
              our{" "}
              <button onClick={() => onNavigate("contact")} className="font-medium text-blue-400 underline-offset-4 hover:underline">
                contact form
              </button>{" "}
              instead.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Direct contact + social */}
      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Direct contact */}
          <Reveal>
            <div className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                <Mail className="h-5 w-5 text-blue-400" /> Direct contact
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Prefer email or a call? Reach out directly — we read every message.</p>
              <div className="mt-6 space-y-3">
                {CONTACT_METHODS.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-4 transition-all hover:border-blue-500/40 hover:bg-card"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <m.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                      <div className="truncate text-sm font-medium">{m.value}</div>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400" />
                  </a>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-background/40 p-3 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-blue-400" />
                Average response time: under 4 hours during business days.
              </div>
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                <ArrowUpRight className="h-5 w-5 text-pink-400" /> Follow us
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">We share field notes, case studies, and behind-the-scenes on social.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-4 transition-all hover:border-pink-500/40 hover:bg-card"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.value}</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pink-400" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Offices */}
      <Section className="border-t border-border/40">
        <SectionHeading
          eyebrow="Our Offices"
          title={
            <>
              Four offices, <span className="text-gradient-brand">18-hour workdays.</span>
            </>
          }
          description="Remote-first with physical hubs for in-person collaboration and client meetings."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
                <div className="text-4xl">{o.flag}</div>
                <h3 className="mt-3 text-base font-semibold">{o.city}</h3>
                <p className="text-xs text-muted-foreground">{o.country}</p>
                <span className="mt-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">{o.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What happens next */}
      <Section className="border-t border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="What Happens Next"
          title={
            <>
              From message to <span className="text-gradient-blue">working PoC.</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400 ring-1 ring-blue-500/20">{s.num}</span>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start a project?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Use our structured 3-step contact form for a free 30-minute consultation and a draft architecture.
            </p>
            <button onClick={() => onNavigate("contact")} className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60">
              Open the contact form
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
