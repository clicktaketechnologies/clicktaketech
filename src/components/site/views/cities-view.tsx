"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, MapPin, Building2, Clock, Shield, TrendingUp } from "lucide-react";
import { CITIES, CITY_SEO, SERVICE_CATEGORIES, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading, LocalTrustStrip, CtaSection } from "@/components/site/section";

type CitiesViewProps = {
  onNavigate: (v: NavView) => void;
  /** When set, renders a city-specific landing page instead of the all-cities grid.
   * This fixes the SEO audit's "10 duplicate city hub pages" finding — each city
   * URL now renders genuinely unique content (different word count, local proof,
   * service highlights, FAQs, stats) instead of the identical grid. */
  citySlug?: string;
};

// ═══════════════════════════════════════════════════════════════════════
//  Helper: match a localService title to a real service slug
// ═══════════════════════════════════════════════════════════════════════
// Strips the city name from the title (e.g., "Web Design Birmingham" → "Web Design"),
// then searches SERVICE_CATEGORIES for a service whose title contains the keyword.
// Returns the slug of the best match, or undefined if no match found.
function findServiceSlugByTitle(title: string, cityName: string): string | undefined {
  // Strip city name + common suffixes to extract the service keyword
  const keyword = title
    .replace(new RegExp(cityName, "gi"), "")
    .replace(new RegExp(cityName.split(",")[0], "gi"), "") // "Austin, TX" → "Austin"
    .trim()
    .toLowerCase();

  if (!keyword) return undefined;

  // Search all services for a title that contains the keyword (or vice versa)
  for (const cat of SERVICE_CATEGORIES) {
    for (const svc of cat.services) {
      const svcTitle = svc.title.toLowerCase();
      // Exact keyword match in service title
      if (svcTitle.includes(keyword)) return svc.slug;
      // Keyword contains the service title (e.g., "full-stack web development" contains "web development")
      if (keyword.includes(svcTitle) && svcTitle.length > 8) return svc.slug;
    }
  }

  // Fallback: keyword-to-slug map for common service terms
  const KEYWORD_MAP: Record<string, string> = {
    "web design": "web-design-services",
    "wordpress": "wordpress-web-design-services",
    "ecommerce": "ecommerce-web-design-services",
    "seo": "seo-services",
    "ppc": "ppc-paid-ads",
    "ai automation": "ai-automation",
    "ai chatbot": "ai-chatbots-assistants",
    "llm": "custom-llm-solutions",
    "saas": "saas-platform-engineering",
    "full-stack": "full-stack-web-development",
    "next.js": "full-stack-web-development",
    "content strategy": "content-strategy-seo",
    "cro": "conversion-rate-optimization",
    "social media": "social-media-marketing",
    "graphic design": "graphic-design",
    "video": "b2b-video-production",
    "small business": "small-business-web-design-services",
    "responsive": "responsive-web-design-services",
  };

  for (const [kw, slug] of Object.entries(KEYWORD_MAP)) {
    if (keyword.includes(kw)) return slug;
  }

  return undefined;
}

export function CitiesView({ onNavigate, citySlug }: CitiesViewProps) {
  // If a city slug is provided and matches a CITY_SEO entry, render the
  // city-specific landing page. Otherwise, render the all-cities grid.
  if (citySlug && CITY_SEO[citySlug]) {
    return <CityDetailContent slug={citySlug} onNavigate={onNavigate} />;
  }
  return <CitiesGrid onNavigate={onNavigate} />;
}

// ═══════════════════════════════════════════════════════════════════════
//  City-specific landing page — renders unique content per city
// ═══════════════════════════════════════════════════════════════════════
function CityDetailContent({ slug, onNavigate }: { slug: string; onNavigate: (v: NavView) => void }) {
  const router = useRouter();
  const city = CITIES.find((c) => c.slug === slug)!;
  const seo = CITY_SEO[slug];
  const officeLabel =
    seo.officeType === "hq" ? "UK Headquarters" :
    seo.officeType === "office" ? "Staffed Office" :
    "Service Area";

  return (
    <>
      {/* Hero — city-specific H1 */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <MapPin className="h-3.5 w-3.5" /> {city.name} · {seo.region} · {officeLabel}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {city.name} <span className="text-gradient-brand">{seo.officeType === "hq" ? "— our UK headquarters" : seo.officeType === "office" ? "— engineering hub" : "web design, SEO & AI agency"}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {seo.localIntro}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {seo.keywords.slice(0, 4).map((kw) => (
                <span key={kw} className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  <Check className="h-3 w-3" /> {kw}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local stats */}
      <Section className="pt-0">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {seo.localStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border/50 bg-card/40 p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Local proof points */}
      <Section className="pt-0">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">Why businesses in {city.name} choose ClickTake</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {seo.localProof.map((proof, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Shield className="h-4 w-4" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{proof}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* City-specific services — clickable, deep-link to matching service page */}
      <Section className="pt-0">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">Services we deliver in {city.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each engagement is staffed by senior engineers who understand the {city.name} market.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seo.localServices.map((svc, i) => {
            // Match the localService title to a real service slug by keyword.
            // Strips the city name from the title, then searches SERVICE_CATEGORIES.
            const matchSlug = findServiceSlugByTitle(svc.title, city.name);
            return (
              <Reveal key={i} delay={i * 0.04}>
                {matchSlug ? (
                  <button
                    onClick={() => router.push(`/${matchSlug}`)}
                    className="group h-full w-full rounded-xl border border-border/50 bg-card/40 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-blue-500/40"
                    data-track="city-to-service-link"
                    data-track-city={slug}
                    data-track-service={matchSlug}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <h3 className="text-sm font-semibold text-foreground">{svc.title}</h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{svc.desc}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                ) : (
                  <div className="h-full rounded-xl border border-border/50 bg-card/40 p-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <h3 className="text-sm font-semibold text-foreground">{svc.title}</h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{svc.desc}</p>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
        <div className="mt-6">
          <button
            onClick={() => onNavigate("services")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            View all 24 services available in {city.name} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Section>

      {/* Local FAQs */}
      <Section className="pt-0">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">{city.name} — frequently asked questions</h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {seo.localFaqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <details className="group rounded-xl border border-border/50 bg-card/40 p-4">
                <summary className="cursor-pointer text-sm font-medium text-foreground marker:text-blue-400">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Office vs service-area disclosure (audit requirement) */}
      <Section className="pt-0">
        <Reveal>
          <div className="rounded-xl border border-border/50 bg-card/30 p-5">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-foreground">About our {city.name} presence</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {seo.officeType === "hq" && `${city.name} is our UK-registered headquarters — staffed daily by our senior engineering and delivery team.`}
              {seo.officeType === "office" && `${city.name} is a staffed engineering office — our senior full-stack and AI engineers work here daily.`}
              {seo.officeType === "service-area" && `${city.name} is a service area where we actively deliver for clients. Our UK HQ in Birmingham and engineering hub in Multan provide the delivery backbone — we serve ${city.name} businesses with UK business-hours coverage and 18-hour workday delivery.`}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title={`Talk to a senior engineer about your ${city.name} project`}
        description="Book a free 30-minute scoping call. We'll review your brief, tell you if we can ship it, and give you a timeline and budget range — no sales calls."
        ctaLabel="Book a free consultation"
        secondaryLabel="View all services"
        secondaryView="services"
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  All-cities grid — shown at /cities (no specific city selected)
// ═══════════════════════════════════════════════════════════════════════
function CitiesGrid({ onNavigate }: { onNavigate: (v: NavView) => void }) {
  const router = useRouter();
  const grouped = CITIES.reduce<Record<string, typeof CITIES>>((acc, c) => {
    (acc[c.country] = acc[c.country] || []).push(c);
    return acc;
  }, {});

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Cities We Serve · 13 Cities · 4 Countries
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Local presence, <span className="text-gradient-brand">global delivery.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Searching for a digital agency near you? ClickTake Technologies ships custom software,
              web design, SEO and AI automation for clients across 13 cities, 4 countries. Each city
              page below has genuinely local content — local proof, city-specific services, and FAQs
              answered for that market.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Cities by country */}
      <Section className="pt-4">
        {Object.entries(grouped).map(([country, cities]) => (
          <div key={country} className="mb-12 last:mb-0">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cities[0].flag}</span>
                <h2 className="text-2xl font-bold tracking-tight">{country}</h2>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                  {cities.length} {cities.length === 1 ? "city" : "cities"}
                </span>
              </div>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city, i) => {
                const seo = CITY_SEO[city.slug];
                const officeBadge = seo?.officeType === "hq" ? "UK HQ" : seo?.officeType === "office" ? "Office" : "Service Area";
                return (
                  <Reveal key={city.slug} delay={i * 0.04}>
                    <button
                      onClick={() => router.push(`/${city.slug}`)}
                      className="group relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20"
                    >
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-lg">
                          {city.flag}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{city.name}</h3>
                          <p className="text-xs text-muted-foreground">{city.country}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {city.desc}
                      </p>
                      {seo?.officeType && (
                        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300">
                          <Building2 className="h-2.5 w-2.5" /> {officeBadge}
                        </span>
                      )}
                      <div className="mt-4 flex items-center gap-1 border-t border-border/40 pt-3 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                        View {city.name} page <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </Section>

      {/* Services available in every city */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="Full Service Menu"
          title={
            <>
              Every city gets all <span className="text-gradient-blue">24 services.</span>
            </>
          }
          description="From digital marketing to AI automation, the full ClickTake menu is available in every city we serve."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.05}>
              <button
                onClick={() => onNavigate("services")}
                className="group h-full w-full rounded-2xl border border-border/50 bg-card/40 p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <cat.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{cat.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {cat.services.length} services
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cat.services.slice(0, 3).map((s) => (
                    <Check key={s.slug} className="h-3 w-3 text-blue-400" />
                  ))}
                  <span className="text-[11px] text-muted-foreground">+{cat.services.length - 3} more</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Don't see your city?"
        description="We're remote-first and ship globally. If you're not in one of the 13 cities above, we still deliver — book a free 30-minute consultation and we'll work out the timezone that fits your team."
        ctaLabel="Book a free consultation"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
