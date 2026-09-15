"use client";

import { ArrowRight, MapPin, Check } from "lucide-react";
import { CITIES, SERVICE_CATEGORIES, type NavView } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";

type CitiesViewProps = {
  onNavigate: (v: NavView) => void;
};

export function CitiesView({ onNavigate }: CitiesViewProps) {
  // Group by country
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
              ClickTake serves 13 cities across the United Kingdom, United States, United Arab
              Emirates and Pakistan. Every city gets the full menu of 24 services — delivered by
              senior engineers who understand your local market.
            </p>
          </Reveal>
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
              {cities.map((city, i) => (
                <Reveal key={city.slug} delay={i * 0.04}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
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
                    <button
                      onClick={() => onNavigate("services")}
                      className="mt-5 flex items-center gap-1 border-t border-border/40 pt-4 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      View services in {city.name} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Reveal>
              ))}
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
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <MapPin className="mx-auto h-10 w-10 text-blue-400" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t see your city?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              We&apos;re remote-first and ship globally. If you&apos;re not in a city listed above,
              we still deliver — book a free 30-minute consultation.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
            >
              Book a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
