"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen, Tag } from "lucide-react";
import { BLOG_POSTS, type NavView } from "@/lib/site-data";
import { Reveal, Section, CtaSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";

type BlogPostViewProps = {
  slug: string;
  onNavigate: (v: NavView) => void;
  onNavigateBlogPost?: (slug: string) => void;
};

export function BlogPostView({ slug, onNavigate, onNavigateBlogPost }: BlogPostViewProps) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="pt-32 pb-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate("blog")} className="mt-6 bg-brand-gradient text-white">
            Back to blog
          </Button>
        </div>
      </section>
    );
  }

  // Get related posts (same category, exclude current)
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  // Get recent posts (most recent, exclude current)
  const recent = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  // Parse body content — use the post's body if available, otherwise
  // generate structured content from the title + excerpt + category.
  const bodyContent = post.body
    ? post.body
    : `## What this means for your business

${post.excerpt} This is the kind of work our senior engineers and marketers ship every day at ClickTake Technologies. We don't do theoretical frameworks — we ship measurable results with clear metrics, honest reporting, and zero vanity KPIs.

## Why this matters now

The landscape is shifting fast. Businesses that act on these insights early gain a compounding advantage — better search visibility, higher conversion rates, and lower customer acquisition costs. The teams that wait end up paying more to catch up.

## Key takeaways

- Focus on outcomes, not outputs — measure what moves revenue, not what looks impressive on a slide
- Ship in small iterations — test, learn, adjust, repeat; don't wait months for a "perfect" launch
- Use the right tools for the job — not every problem needs AI, and not every AI needs a custom LLM
- Invest in foundations — fast hosting, clean code, and proper analytics pay dividends for years
- Partner with senior engineers who have shipped to production — not consultants who've only written about it

## How ClickTake can help

If you're considering this for your business, we offer a free 30-minute scoping call with a senior engineer. We'll tell you honestly whether this approach fits your situation, what it would take to implement, and what the ROI looks like. No pitch deck, no sales call — just a real technical conversation.

Ready to talk? Book a free consultation below.`;

  const bodyParagraphs = bodyContent.split("\n\n").filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <button
              onClick={() => onNavigate("blog")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </button>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <Tag className="h-3 w-3" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.readTime} read
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hero image */}
      <Section className="pt-0">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/15 via-pink-500/10 to-blue-500/5">
              <BookOpen className="h-24 w-24 text-blue-400/30" />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Article body */}
      <Section className="pt-8">
        <div className="mx-auto max-w-3xl">
          <article className="space-y-6">
            {bodyParagraphs.map((para, i) => {
              // Check if paragraph is a heading (starts with ##)
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="pt-4 text-2xl font-bold tracking-tight text-foreground">
                    {para.replace(/^##\s+/, "")}
                  </h2>
                );
              }
              // Check if paragraph is a list item (starts with - )
              if (para.startsWith("- ")) {
                const items = para.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-2 pl-4">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-base leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        {item.replace(/^-\s+/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Regular paragraph
              return (
                <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {para}
                </p>
              );
            })}
          </article>

          {/* Share + CTA */}
          <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-6">
            <h3 className="text-lg font-semibold text-foreground">Need help with this?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Book a free 30-minute scoping call with a senior ClickTake engineer. We'll tell you if we can ship it, how long, and how much.
            </p>
            <Button
              onClick={() => onNavigate("contact")}
              className="mt-4 bg-brand-gradient text-white"
            >
              Book a free consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Recent posts */}
      {recent.length > 0 && (
        <Section className="pt-0">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Recent articles</h2>
              <button
                onClick={() => onNavigate("blog")}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.03}>
                  <article
                    onClick={() => {
                      if (onNavigateBlogPost) onNavigateBlogPost(p.slug);
                      else onNavigate("blog");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-5 transition-all hover:-translate-y-1 hover:border-blue-500/40"
                  >
                    <div className="mb-3 flex aspect-[16/10] items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-pink-500/10">
                      <BookOpen className="h-8 w-8 text-blue-400/30" />
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-400">{p.category}</span>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground line-clamp-2">{p.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {p.date}
                      <span>·</span>
                      <Clock className="h-3 w-3" /> {p.readTime}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Want a playbook for your business?"
        description="Book a free 30-minute consultation and we'll scope a custom roadmap — drawing on the same frameworks behind these articles."
        ctaLabel="Book a free consultation"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
