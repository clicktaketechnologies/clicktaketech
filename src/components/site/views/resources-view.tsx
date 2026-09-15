"use client";

import { useState } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  type NavView,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ResourcesViewProps = {
  onNavigate: (v: NavView) => void;
};

export function ResourcesView({ onNavigate }: ResourcesViewProps) {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = RESOURCES.filter((r) => {
    const matchCat = activeCat === "All" || r.category === activeCat;
    const matchQuery =
      query.trim() === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Resources · Guides & Playbooks
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Field-tested playbooks &{" "}
              <span className="text-gradient-brand">engineering guides.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              The exact frameworks, checklists, and technical guides we use on client engagements.
              No fluff — every resource is written by a senior engineer who has shipped it to
              production.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search + filters */}
      <Section className="pt-4">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources..."
                className="bg-background/50 pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    activeCat === cat
                      ? "bg-brand-gradient text-white"
                      : "border border-border/50 bg-card/40 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Resource grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource, i) => (
            <Reveal key={resource.slug} delay={i * 0.04}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-400">
                    {resource.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {resource.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{resource.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {resource.desc}
                </p>
                <button
                  onClick={() => onNavigate("contact")}
                  className="mt-5 flex items-center gap-1 border-t border-border/40 pt-4 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Read guide <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-12 text-center">
            <p className="text-muted-foreground">
              No resources match your search. Try a different keyword or category.
            </p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-card/40 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want a playbook for your business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Book a free 30-minute consultation and we&apos;ll scope a custom roadmap for your
              use case — drawing on the same frameworks behind these guides.
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
