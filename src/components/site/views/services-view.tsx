"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, GitBranch, ShieldCheck, Cpu, Zap } from "lucide-react";
import {
  SERVICES,
  SERVICE_PROCESS,
  TECH_STACK,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type ServicesViewProps = {
  onNavigate: (v: NavView) => void;
};

export function ServicesView({ onNavigate }: ServicesViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              Engineering Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Full-spectrum <span className="text-gradient-emerald">engineering services.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From the first whiteboard sketch to a 24/7 production command center, ClickTake
              owns the entire delivery lifecycle. We embed senior engineers (8+ yrs avg),
              ship every two weeks, and hand over an architecture your team can actually maintain.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services list */}
      <Section className="pt-4">
        <div className="space-y-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.04}>
              <article className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/15" />
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  {/* Left: header */}
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                        <service.icon className="h-7 w-7" />
                      </span>
                      <span className="font-mono text-3xl font-bold text-gradient-emerald">
                        {service.num}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-emerald-400">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {service.desc}
                    </p>
                  </div>

                  {/* Right: stack + deliverables */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                        <Cpu className="h-3.5 w-3.5 text-emerald-400" /> Stack
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {service.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border/50 bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                        <Check className="h-3.5 w-3.5 text-emerald-400" /> Deliverables
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Delivery Model"
          title={
            <>
              Four steps. <span className="text-gradient-amber">Six weeks to live.</span>
            </>
          }
          description="A dedicated lead engineer owns your project end-to-end — from discovery through a 30-day post-launch hypercare window."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="text-4xl font-bold text-gradient-emerald">{step.num}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Feature highlights */}
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GitBranch, title: "CI/CD from day one", desc: "Every commit ships through automated pipelines with SAST, DAST, and E2E gates." },
            { icon: Clock, title: "Weekly demos", desc: "Two-week sprints with live demos. No surprise launches — you see progress every week." },
            { icon: ShieldCheck, title: "Observability baked in", desc: "OpenTelemetry traces, Grafana dashboards, and alerting before a single user arrives." },
            { icon: Zap, title: "p99 120ms SLA", desc: "Performance budgets enforced in CI. Regressions surface before they reach production." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section className="border-t border-border/40">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Production Stack
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/50 bg-card/40 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-emerald-500/40 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card/40 to-amber-500/5 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to scope your first sprint?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              A senior engineer (not a salesperson) joins the call with a draft architecture
              for your use case. Average response time: under 4 hours.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_28px_-4px] hover:shadow-emerald-500/60"
            >
              Talk to an engineer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
