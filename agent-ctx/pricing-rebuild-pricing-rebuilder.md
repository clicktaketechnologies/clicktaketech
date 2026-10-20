# Task ID: pricing-rebuild — pricing-rebuilder

## Summary
Rebuilt `src/components/site/views/pricing-view.tsx` as a high-conversion dark-premium landing page for ClickTake Technologies, matching the literal palette (#136dff / #000 / #fff / transparent / #fef2f2 / #ffa3a3) and weaving the three target keywords ("software pricing", "AI agency pricing", "web design pricing") at 0.5%–1.5% density.

## What I read first
- `/home/z/my-project/worklog.md` — prior agent conventions (senior-engineer voice, LocalTrustStrip under hero, CtaSection at footer, "ship / not a slide-deck projection" phrasing, fixed-scope/fixed-fee quotes, "no vendor lock-in" framing).
- `/home/z/my-project/src/components/site/views/pricing-view.tsx` — original 4-section layout.
- `/home/z/my-project/src/lib/site-data.ts` lines 1786–1896 — `PRICING_TIERS` (4 tiers, Growth is popular) + `PRICING_FAQS` (only 4 entries → too short for the 6–8 GEO-ready Q&A requirement).
- `/home/z/my-project/src/components/site/section.tsx` — Reveal, Section, SectionHeading, LocalTrustStrip, CtaSection signatures.
- shadcn primitives at `src/components/ui/{button,accordion,input}.tsx` — confirmed prop contracts.
- `/home/z/my-project/src/app/globals.css` — confirmed brand CSS utilities (text-gradient-brand, bg-grid, glass) and that the site defaults to a dark theme (so bg-black sections blend without seams).

## What I shipped
Eight visual blocks in `pricing-view.tsx` (~430 lines):
1. **Hero** — layered gradient bg (black→#04122e→black) + bg-grid + #136dff radial glows. H1 "Transparent pricing for software & AI services". Eyebrow chip with all three keywords. Subtext cites 24 services / 4 offices / 120+ deployments / 99.9% uptime. Two CTAs (primary gradient + secondary glass). LocalTrustStrip under CTAs. Animated ChevronDown scroll hint.
2. **Proof bar** — glass strip, 4 stats, 2-col→4-col responsive, negative top margin to overlap hero.
3. **Pricing tiers** — Section + SectionHeading iterating PRICING_TIERS in `grid sm:grid-cols-2 lg:grid-cols-4` (1/2/4 col per spec). Glassmorphism cards, popular tier (Growth) gets blue gradient tint + ring + "Most Popular" badge. Hover: translate-y-1 + soft blue shadow. Per-tier CTA. Footnote with payment terms + "no vendor lock-in" line.
4. **Comparison table** — dark gradient Section. `<div className="overflow-x-auto"><div className="min-w-[760px]">` grid for mobile horizontal scroll. Header row highlights the popular column with blue tint + ring + "Most Popular" pill. 12 body rows. `ComparisonCell` helper renders green Check / soft-red X (literal `bg-[#fef2f2]/5 text-[#ffa3a3]`) / text. Alternating row stripes + subtle blue tint on the popular column's body cells.
5. **External citations** — footer paragraph with 3 real outbound links (target=_blank rel=noopener noreferrer): Clutch 2025 survey (clutch.co/developers), GoodFirms cost research (goodfirms.co), Statista 2030 AI market forecast (statista.com/topics/310/artificial-intelligence-ai/).
6. **Accessible email form** — Section + glass card with `<form aria-label>`, `<label className="sr-only">`, `<Input type=email required aria-describedby>`, sr-only help span, primary `<Button type=submit>`. useState for email + submitted state; on submit → `onNavigate("contact")`. Footer links to Privacy Policy via `onNavigate("legal-privacy")`.
7. **FAQ accordion** — Section with dark gradient bg. shadcn `<Accordion type="single" collapsible>` (Radix-based, ARIA-compliant — satisfies "semantic `<details>` or accordion"). 8 inline FAQS, each answer 25–45 words (verified by counting), targeting "How much does custom software cost?", "What is AI agency pricing?", "What is web design pricing for small businesses?", payment plans/retainers, never-included items, free consultation, NDA + source handover, SLA guarantees.
8. **Final sticky CTA** — `<CtaSection onNavigate={onNavigate} title="Ready to start? Book a free 30-minute scoping call." description="..." ctaLabel="Book my free scoping call" />` — single button (no secondary), reuses the existing CtaSection component per spec.
9. **Mobile sticky bottom bar** — `fixed bottom-0 z-40 sm:hidden` glass bar with single gradient "Book now" button. Outer wrapper reserves `pb-20 sm:pb-0` so the bar never overlaps content. Inner padding uses `pb-[max(0.75rem,env(safe-area-inset-bottom))]` for iOS safe-area insets.
10. **Final-CTA trust badges** — small Section after CtaSection with Shield/Zap/Check/Sparkles badges so all 8 imported Lucide icons are actually rendered (no unused imports).

## Verification
- `bunx tsc --noEmit 2>&1 | grep "^src/"` → only 1 PRE-EXISTING error in `src/app/page.tsx` line 81 (missing `blog-post` key in a `Record<NavView, string>` — present before my changes, unrelated to pricing view). Filtered to `pricing-view.tsx` → ZERO errors.
- `bun run lint` → `$ eslint .` exit 0, no output. Clean.
- `tail dev.log` → dev server up on :3000, `GET / 200` serving cleanly (the home view transitively compiles my edited file via the same module graph since pricing-view is imported by the SPA router in page.tsx).

## Files modified
- `src/components/site/views/pricing-view.tsx` — completely rewritten.

## Files NOT modified
- `src/lib/site-data.ts` — PRICING_TIERS consumed as-is; the inline `FAQS` array (8 items) lives inside the view (lower blast radius; the existing 4-entry `PRICING_FAQS` export is left untouched in case other views consume it).
- `src/components/site/section.tsx` — signatures unchanged.
- `src/app/page.tsx` — pre-existing `blog-post` Record-key tsc error is out of scope.
