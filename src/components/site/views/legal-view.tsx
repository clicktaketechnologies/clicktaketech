"use client";

import { ArrowRight, Scale, ShieldCheck, Cookie, Clock } from "lucide-react";
import {
  LEGAL_DOCS,
  LEGAL_LINKS,
  type NavView,
  type LegalDoc,
} from "@/lib/site-data";
import { Reveal, Section } from "@/components/site/section";
import { cn } from "@/lib/utils";

type LegalViewProps = {
  docId: LegalDoc["id"];
  onNavigate: (v: NavView) => void;
};

const DOC_ICONS: Record<LegalDoc["id"], typeof ShieldCheck> = {
  "legal-privacy": ShieldCheck,
  "legal-terms": Scale,
  "legal-cookies": Cookie,
};

export function LegalView({ docId, onNavigate }: LegalViewProps) {
  const doc = LEGAL_DOCS[docId];
  const Icon = DOC_ICONS[docId];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <Icon className="h-3.5 w-3.5" /> {doc.badge}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {doc.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-blue-400" />
              Last Updated: {doc.updated}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{doc.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Legal tabs (switch between docs) */}
      <Section className="pt-4">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {LEGAL_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  link.id === docId
                    ? "bg-brand-gradient text-white"
                    : "border border-border/50 bg-card/40 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Sections */}
        <div className="mt-10 space-y-6">
          {doc.sections.map((section, i) => (
            <Reveal key={section.num} delay={i * 0.03}>
              <article className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-gradient-brand">{section.num}</span>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {section.body.map((para, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Contact prompt */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about this policy? Email{" "}
              <a href="mailto:info@clicktaketech.com" className="font-medium text-blue-400 underline-offset-4 hover:underline">
                info@clicktaketech.com
              </a>{" "}
              — we respond within 30 days.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start your project?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Free 30-minute consultation. No commitment, no sales pitch — just a draft architecture.
            </p>
            <button onClick={() => onNavigate("contact")} className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
