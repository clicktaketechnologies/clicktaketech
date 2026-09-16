"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCAL_TRUST, type NavView } from "@/lib/site-data";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-ring" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/**
 * Local SEO trust strip — human-toned credibility badges shown under hero
 * sections to reinforce local relevance and conversion trust.
 */
export function LocalTrustStrip({ className }: { className?: string }) {
  return (
    <Reveal delay={0.15}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground",
          className
        )}
      >
        {LOCAL_TRUST.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            <item.icon className="h-3.5 w-3.5 text-blue-400" />
            {item.label}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

/**
 * Standard CTA section reused at the bottom of every view.
 * Ensures every page ends with a clear, SEO-aligned conversion action.
 */
export function CtaSection({
  onNavigate,
  title,
  description,
  ctaLabel = "Start Your Project",
  secondaryLabel,
  secondaryView,
}: {
  onNavigate: (v: NavView) => void;
  title: ReactNode;
  description: ReactNode;
  ctaLabel?: string;
  secondaryLabel?: string;
  secondaryView?: NavView;
}) {
  return (
    <Section className="border-t border-border/40">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate("contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_28px_-2px] hover:shadow-pink-500/60"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              {secondaryLabel && secondaryView && (
                <button
                  onClick={() => onNavigate(secondaryView)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                >
                  {secondaryLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

