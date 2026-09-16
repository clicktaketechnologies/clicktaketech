"use client";

import { useState } from "react";
import { ArrowRight, Clock, Search, BookOpen } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, type NavView } from "@/lib/site-data";
import { Reveal, Section, LocalTrustStrip, CtaSection } from "@/components/site/section";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BlogViewProps = {
  onNavigate: (v: NavView) => void;
};

export function BlogView({ onNavigate }: BlogViewProps) {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCat === "All" || p.category === activeCat;
    const matchQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const featured = BLOG_POSTS[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <BookOpen className="h-3.5 w-3.5" /> Blog · Field Notes from the ClickTake Team
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Field notes from the <span className="text-gradient-brand">ClickTake team.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical, no-fluff articles on SEO, web development, AI automation, ecommerce and
              growth marketing — written by the engineers, marketers and designers who ship this
              work every day.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Featured post */}
      <Section className="pt-4">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/8 blur-3xl transition-all duration-500 group-hover:bg-blue-500/15" />
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400">Featured · {featured.category}</span>
                <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-400" /> {featured.readTime} read
                  </span>
                </div>
                <button onClick={() => onNavigate("contact")} className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-blue-500/60">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-pink-500/15">
                <BookOpen className="h-20 w-20 text-blue-400/40" />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Search + filters + grid */}
      <Section className="pt-0">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="bg-background/50 pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    activeCat === cat ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.03}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-400">{post.category}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <button onClick={() => onNavigate("contact")} className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Read <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-12 text-center">
            <p className="text-muted-foreground">No articles match your search. Try a different keyword or category.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Want a playbook for your business?"
        description="Book a free 30-minute consultation and we'll scope a custom roadmap — drawing on the same frameworks behind these articles. No pitch deck, just a real conversation with a senior engineer."
        ctaLabel="Book a free consultation"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
