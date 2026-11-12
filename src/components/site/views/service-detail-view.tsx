"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight, Sparkles, MapPin, Shield } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  CASE_STUDIES,
  CITIES,
  CITY_SEO,
  type NavView,
} from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";
import { getServiceKPIs } from "@/lib/service-kpis";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceSeoJsonLd } from "@/components/site/service-seo-jsonld";
import {
  SnippetDefinition,
  PeopleAlsoAsk,
  VoiceSearchBlock,
  EatTrustStrip,
} from "@/components/site/seo-content-blocks";
import { Icon3D } from "@/components/site/icon-3d";

// 3D emoji glyphs cycled across benefit cards — rendered as true-color 3D icons.
const BENEFIT_EMOJIS = ["✅", "⚡", "🚀", "🎯", "🛡️", "📈", "💡", "🔑"];

// Category → 3D emoji for related-service cards.
const CATEGORY_EMOJI: Record<string, string> = {
  "digital-marketing": "📣",
  "web-software": "💻",
  "ai-automation": "🤖",
  "creative-brand": "🎨",
};

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
  const router = useRouter();
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

            {/* Quick facts card — service-specific atAGlance */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-border/50 bg-card/40 p-6 ring-gradient">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  <Icon3D emoji="📊" size="sm" variant="brand" /> At a glance
                </h2>
                <dl className="mt-5 space-y-3 text-sm">
                  {(content?.atAGlance ?? defaultAtAGlance(category.label)).map((fact) => (
                    <div
                      key={fact.label}
                      className="flex justify-between gap-3 border-b border-border/40 pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-muted-foreground">{fact.label}</dt>
                      <dd className="text-right font-medium text-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEO structured data — FAQPage + HowTo + Service JSON-LD */}
      <ServiceSeoJsonLd slug={slug} />

      {/* Featured-snippet definition block */}
      <Section className="pt-4 pb-0">
        <div className="mx-auto max-w-4xl">
          <SnippetDefinition slug={slug} serviceName={service.title} />
        </div>
      </Section>

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
                <Icon3D emoji={BENEFIT_EMOJIS[i % BENEFIT_EMOJIS.length]} size="md" variant={(["brand","blue","pink"] as const)[i % 3]} />
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

      {/* People Also Ask + Voice search + E-A-T trust strip */}
      <Section className="border-t border-border/40 bg-card/20">
        <div className="grid gap-8 lg:grid-cols-2">
          <PeopleAlsoAsk slug={slug} />
          <VoiceSearchBlock slug={slug} />
        </div>
        <div className="mt-8">
          <EatTrustStrip serviceSignals={content?.eatSignals} />
        </div>
      </Section>

      {/* Delivery Metrics & KPIs — real-time delivery transparency */}
      {/* Demonstrates authenticity with specific, measurable metrics per service.
          Prevents perception of fake/automated delivery by showing exact
          timelines, quality benchmarks, and reporting cadences. */}
      {(() => {
        const kpis = getServiceKPIs(slug);
        if (kpis.length === 0) return null;
        return (
          <Section className="border-t border-border/40">
            <SectionHeading
              eyebrow="Delivery Metrics"
              title={
                <>
                  Real <span className="text-gradient-blue">delivery KPIs</span> — not estimates.
                </>
              }
              description={`Specific, measurable metrics from 120+ production deployments. These are the actual numbers we deliver — not marketing promises. Each KPI is tracked, reported, and held to throughout the engagement.`}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border/50 bg-card/40 p-5 transition-all hover:border-blue-500/40">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {kpi.metric}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-foreground">
                      {kpi.value}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {kpi.context}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border/40 bg-card/20 p-4">
              <Shield className="h-4 w-4 shrink-0 text-green-400" />
              <p className="text-xs text-muted-foreground">
                These metrics are drawn from actual client engagements since 2019.
                Every project is tracked via Linear (sprint velocity), Datadog (API
                performance), and Search Console (SEO outcomes). Monthly reports
                include raw data — no vanity metrics, no cherry-picked timeframes.
              </p>
            </div>
          </Section>
        );
      })()}

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
                  <div className="flex items-center gap-3">
                    <Icon3D emoji={cs.emoji} size="sm" variant="brand" />
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
                <Icon3D emoji={CATEGORY_EMOJI[category.id] ?? "✨"} size="md" variant={(["brand","blue","pink","neutral"] as const)[i % 4]} />
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

      {/* UK delivery — commercial intent + city cross-links (audit Priority 1) */}
      {/* Improves UK commercial rankings by adding location-specific internal
          links from each service page to the UK city pages that target
          "WordPress web design Manchester", "responsive web design London", etc. */}
      <Section className="border-t border-border/40">
        <SectionHeading
          eyebrow="UK Delivery"
          title={
            <>
              Serving clients across the <span className="text-gradient-blue">United Kingdom.</span>
            </>
          }
          description="UK-registered Ltd Co. GDPR compliant. UK business-hours coverage with 18-hour delivery. Available in every UK city we serve."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.filter((c) => c.country === "United Kingdom").map((city, i) => (
            <Reveal key={city.slug} delay={i * 0.05}>
              <button
                onClick={() => router.push(`/${city.slug}`)}
                className="group flex w-full items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-blue-500/40"
                data-track="service-to-city-link"
                data-track-city={city.slug}
                data-track-service={slug}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">{city.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {CITY_SEO[city.slug]?.officeType === "hq" ? "UK Headquarters" : "Service area"}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    {service.title} in {city.name} →
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border/40 bg-card/20 p-4">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-xs text-muted-foreground">
            UK Companies House registered · GDPR + UK DPA compliant · SOC 2 Type II ready · 99.9% uptime SLA · Response within 4 business hours
          </span>
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
            {/* Transparent pricing factors — audit requirement for buyer-intent pages */}
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Typical {service.title.toLowerCase()} engagements start from <span className="font-semibold text-foreground">£4,500/mo</span> (Starter) or <span className="font-semibold text-foreground">£9,500/mo</span> (Scale). Final scope depends on complexity, timeline, and team size.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate("contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
                data-track="cta-commercial-service"
                data-track-source="service-detail-cta"
                data-track-service={slug}
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
function defaultAtAGlance(categoryLabel: string) {
  return [
    { label: "Practice area", value: categoryLabel },
    { label: "Engagement", value: "Fixed-scope PoC" },
    { label: "Time to live", value: "~6 weeks" },
    { label: "SLA", value: "99.9% uptime" },
  ];
}
