"use client";

import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  CASE_STUDIES,
  type NavView,
} from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ServiceDetailViewProps = {
  slug: string;
  onNavigate: (v: NavView) => void;
  onNavigateService: (slug: string) => void;
};

type FoundService = {
  category: (typeof SERVICE_CATEGORIES)[number];
  service: (typeof SERVICE_CATEGORIES)[number]["services"][number];
};

function findService(slug: string): FoundService | undefined {
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((s) => s.slug === slug);
    if (service) return { category, service };
  }
  return undefined;
}

export function ServiceDetailView({
  slug,
  onNavigate,
  onNavigateService,
}: ServiceDetailViewProps) {
  const found = findService(slug);
  const content = getServiceContent(slug);

  if (!found) {
  return (
      <Section className="pt-32">
        <div className="mx-auto max-w-xl rounded-2xl border border-border/50 bg-card/40 p-10 text-center">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We couldn&apos;t find that service. Browse all 24 services instead.
          </p>
          <button
            onClick={() => onNavigate("services")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
          >
            View all services <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Section>
    );
  }

  const { category, service } = found;
  const relatedServices = category.services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Breadcrumb + hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <button onClick={() => onNavigate("home")} className="transition-colors hover:text-blue-400">
                Home
              </button>
              <ChevronRight className="h-3 w-3" />
              <button onClick={() => onNavigate("services")} className="transition-colors hover:text-blue-400">
                Services
              </button>
              <ChevronRight className="h-3 w-3" />
              <button
                onClick={() => onNavigate("services")}
                className="transition-colors hover:text-blue-400"
              >
                {category.label}
              </button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{service.title}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
                  <service.icon className="h-3.5 w-3.5" />
                  {category.label}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {content?.overview ?? service.desc}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => onNavigate("pricing")}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                  >
                    See pricing
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Quick facts card */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-border/50 bg-card/40 p-6 ring-gradient">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  <Sparkles className="h-4 w-4" /> At a glance
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3 border-b border-border/40 pb-3">
                    <dt className="text-muted-foreground">Practice area</dt>
                    <dd className="text-right font-medium">{category.label}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/40 pb-3">
                    <dt className="text-muted-foreground">Time to PoC</dt>
                    <dd className="text-right font-medium">6 weeks</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/40 pb-3">
                    <dt className="text-muted-foreground">Engagement</dt>
                    <dd className="text-right font-medium">Fixed-fee PoC</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">SLA</dt>
                    <dd className="text-right font-medium text-blue-400">99.9% uptime</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What you get (benefits) */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="What You Get"
          title={
            <>
              Built around <span className="text-gradient-brand">outcomes.</span>
            </>
          }
          description="Every engagement ships with these deliverables baked in — not bolted on later."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(content?.benefits ?? defaultBenefits(service.features)).map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack + process */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight">Tech stack</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The production stack we ship for {service.title.toLowerCase()}.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-border/50 bg-white/5 px-3 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-6 border-t border-border/40 pt-4 text-xs leading-relaxed text-muted-foreground">
                Senior engineers (8+ yrs avg) own every engagement. CI/CD from day one,
                observability baked in, and a p99 120ms performance budget enforced in CI.
              </p>
            </div>
          </Reveal>

          {/* Process */}
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight">How we deliver it</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A tailored 4-step process for {service.title.toLowerCase()}.
              </p>
              <div className="mt-5 space-y-4">
                {(content?.process ?? defaultProcess()).map((step) => (
                  <div key={step.num} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400 ring-1 ring-blue-500/20">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{step.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      {content?.faqs && content.faqs.length > 0 && (
        <Section className="border-t border-border/40">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                {service.title} <span className="text-gradient-brand">questions.</span>
              </>
            }
            align="center"
          />
          <Reveal delay={0.05}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3">
                {content.faqs.map((faq, i) => (
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
      )}

      {/* Related case studies */}
      <Section className="border-t border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Proof"
          title={
            <>
              Real results from <span className="text-gradient-blue">similar work.</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.05}>
              <button
                onClick={() => onNavigate("case-studies")}
                className="group h-full w-full text-left"
              >
                <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{cs.emoji}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      {cs.sector}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug">{cs.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {cs.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <span
                        key={m.label}
                        className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-400"
                      >
                        {m.delta} {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Related services */}
      <Section>
        <SectionHeading
          eyebrow={`More in ${category.label}`}
          title={
            <>
              Related <span className="text-gradient-pink">services.</span>
            </>
          }
          description={`Other ${category.label.toLowerCase()} services that pair well with ${service.title}.`}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <button
                onClick={() => onNavigateService(s.slug)}
                className="group flex h-full w-full items-start gap-4 rounded-2xl border border-border/50 bg-card/40 p-5 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 transition-transform group-hover:scale-110">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {s.desc}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    View service <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start with {service.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Book a free 30-minute consultation. A senior engineer reviews your brief within 4 hours
              and brings a draft architecture — fixed-scope PoC in 6 weeks.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate("contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
              >
                Start your project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="https://wa.me/447391653377"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
              >
                WhatsApp +44 7391 653377
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

// Fallbacks if a service somehow lacks content in service-content.ts
function defaultBenefits(features: string[]) {
  return features.map((f) => ({ title: f, desc: "Included as standard on every engagement." }));
}
function defaultProcess() {
  return [
    { num: "01", title: "Discover", desc: "30-min architecture review to scope a fixed-price PoC." },
    { num: "02", title: "Architect", desc: "Senior engineers design the system before build begins." },
    { num: "03", title: "Build", desc: "Two-week sprints with weekly demos, CI/CD from day one." },
    { num: "04", title: "Deploy", desc: "Production launch plus 30-day post-launch hypercare." },
  ];
}
