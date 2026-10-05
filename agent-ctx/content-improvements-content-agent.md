# Task ID: content-improvements
# Agent: content-agent

## Task
Three content-improvement deliverables for the ClickTake Technologies Next.js site:
1. Expandable job descriptions on the Careers page (View Description + Apply Now).
2. 24 new SEO blog posts (1 per service) added to `BLOG_POSTS`.
3. Comprehensive, real legal content for Privacy / Terms / Cookies (500+ words each).

## Work Log

### Step 0 — Read prior context
- Read `/home/z/my-project/worklog.md` to understand prior agent work (home-view optimizer, etc.). The worklog showed that the site uses a static `BLOG_POSTS` list, a `LEGAL_DOCS` map, and a static `JOBS` list as a fallback behind a `/api/jobs` route.

### Step 1 — Expanded JOBS in `src/lib/site-data.ts`
- Extended the `Job` type with two new fields: `fullDescription: string[]` (paragraphs) and `requirements: string[]`.
- Rewrote the short `desc` for all 5 jobs to be longer and SEO-optimised (3–5 sentences each, mentions senior-first + UK/Pakistan delivery window).
- Wrote 3 substantive paragraphs of `fullDescription` for each job (about the role, day-to-day, who it's for) and 5 `requirements` bullets per role.
- Quote handling: replaced inner straight double quotes with curly-quote Unicode escapes (`\u201c`, `\u201d`) inside double-quoted TS string literals to avoid syntax errors. Confirmed `bunx tsc --noEmit` reports no `src/` errors after this step.

### Step 2 — Refactored `src/components/site/views/careers-view.tsx`
- Replaced the flat job row with a `<JobCard>` component that wraps the existing shadcn `<Collapsible>` primitive (`@/components/ui/collapsible`).
- Added a `toUiJob()` normaliser that maps both the static `Job[]` (with `fullDescription` + `requirements`) and the live API shape (`{ description, salary }`) into a single UI shape. Live jobs get their description split into paragraphs on `\n{2,}|\r?\n` and an empty `requirements: []` (since the API doesn't ship them).
- Each card has:
  - Always-visible header: title, department badge, short `desc`, location/type/apply-within meta, and two action buttons: **"View description"** (CollapsibleTrigger, with rotating ChevronDown) and **"Apply now"** (calls `onApply(job.slug)` if provided, else `onNavigate("contact")`).
  - Expandable detail (`CollapsibleContent`): a 3-column layout with a left "Role snapshot" `<dl>` (title, department, location, type), the right side showing the full description paragraphs and a "What we look for" requirements list with `CheckCircle2` bullets, plus a secondary Apply-now CTA inside a tinted box.
- Updated the SectionHeading description copy to mention the View-description affordance.
- Used `aria-expanded`, `aria-controls`, and `id={\`job-desc-${slug}\`}` for accessibility.

### Step 3 — Added 24 SEO blog posts (1 per service) in `BLOG_POSTS`
- Walked `SERVICE_CATEGORIES` (4 categories × 6 services = 24 services).
- For each of the 24 services, added a new `BlogPost` object with:
  - `slug`: kebab-case, prefixed `blog-`, includes the service slug + benefit keyword (e.g. `blog-ppc-paid-ads-that-actually-convert-in-2026`).
  - `title`: service name + benefit keyword (e.g. "PPC Paid Ads That Actually Convert in 2026 — A Founder's Field Guide").
  - `category`: mapped from the service category — Digital Marketing services → "Digital Marketing" (or "SEO" for seo-services & seo-web-design-services), Web & Software services → "Web" (or "Ecommerce" for ecommerce-web-design-services), AI services → "AI Automation", Creative services → "Creative" (new) or "Web".
  - `excerpt`: 3 sentences each. Sentence 1 introduces the service + keyword. Sentence 2 mentions a real use case, benefit, or framework. Sentence 3 ends with a "Book a free scoping call" CTA.
  - `date`: spread across 28 May 2026 → 25 Feb 2026 (all older than the existing newest post so the existing featured-post logic stays intact).
  - `readTime`: 7–12 min, varied per post.
- Variety of angles across the 24: how-to, case study, comparison, FAQ, checklist, common mistakes, ROI breakdown, lessons learned, decision framework, technical deep-dive, etc. No copy-paste template.
- Added a new "Creative" entry to `BLOG_CATEGORIES` so the graphic-design and b2b-video-production posts filter correctly.

### Step 4 — Expanded `LEGAL_DOCS` with comprehensive, real content
Wrote full, professional legal copy for all three legal docs. Each has 8–13 numbered sections, multiple paragraphs per section, bullet-list-style body entries, and uses curly-quote Unicode escapes (`\u201c`, `\u201d`, `\u2019`, `\u2014`, `\u2022`) instead of straight quotes inside double-quoted TS strings.

**Privacy Policy (legal-privacy)** — 13 sections:
- 01 Introduction & Scope (controller vs processor, UK + cross-jurisdiction footprint, applicable laws)
- 02 Personal Data We Collect (Identity / Contact / Project / Technical / Usage / Application)
- 03 Lawful Basis for Processing (GDPR Art. 6 — consent, contract, legal obligation, legitimate interests)
- 04 How We Use Your Data
- 05 Third-Party Services & Sub-Processors — explicit coverage of **Cloudinary, Gmail SMTP (Google Workspace), Cloudflare Turnstile, Google Analytics 4, Vercel, Stripe** with the limited data each processes
- 06 International Data Transfers (SCCs, UK IDTA, Pakistan TIA, sanctions)
- 07 Data Retention (specific retention periods per data category)
- 08 Data Security (TLS 1.2+, AES-256, RBAC, MFA, ICO 72-hour breach notification)
- 09 Your Rights — GDPR & UK DPA (all 8 rights)
- 10 Your Rights — California (CCPA/CPRA — right to know, delete, correct, opt-out, limit sensitive PI)
- 11 Children's Privacy
- 12 Changes to This Policy
- 13 Contact & Data Protection Officer (Birmingham HQ address + email)
Word count: ~1,890 words.

**Terms of Service (legal-terms)** — 13 sections:
- 01 Acceptance of Terms
- 02 Services & Engagements (SOW precedence)
- 03 Client Responsibilities
- 04 Payment Terms (14-day invoices, 30–50% deposits, retainers, 1.5% late interest, currency, VAT)
- 05 Intellectual Property (custom IP assignment on full payment, Pre-existing IP carve-out, open-source, portfolio use)
- 06 Confidentiality & NDAs (mutual NDA offer, 5-year survival, indefinite for trade secrets)
- 07 Warranties & Disclaimers ("as is" / "as available", no SEO-ranking or ROI warranty)
- 08 Limitation of Liability (aggregate cap = 12-month fees paid, carve-outs for negligence, fraud, confidentiality)
- 09 Indemnification (client indemnity + ClickTake IP-infringement indemnity)
- 10 Term & Termination (14-day cure, insolvency, survival of IP/confidentiality/liability)
- 11 Dispute Resolution (informal → CEDR mediation → court, 30/60-day windows)
- 12 Governing Law (England & Wales, with carve-out for UAE/US-entity engagements)
- 13 Contact
Word count: ~1,800 words.

**Cookie Policy (legal-cookies)** — 8 sections:
- 01 What Are Cookies (cookies + web beacons + local storage)
- 02 Types of Cookies We Use (5 categories: strictly necessary, auth, preference/functional, analytics, marketing)
- 03 Cookie Table — explicit per-cookie table: `ct_session`, `ct_theme`, `_ga`/`_ga_<id>`, `cf_clearance`, Turnstile session, `_gcl_au`, `_fbp`, `li_sug`, with first-party/third-party, lifetime, and category
- 04 Third-Party Cookies (Cloudflare Turnstile, GA4, Meta Pixel, LinkedIn Insight, Cloudinary)
- 05 Managing Cookies (consent banner, footer link, browser settings, platform opt-outs, CCPA note)
- 06 Do Not Track Signals
- 07 Updates to This Policy
- 08 Contact
Word count: ~1,190 words.

### Step 5 — Verification
- `cd /home/z/my-project && bunx tsc --noEmit 2>&1 | grep "^src/" | head -10` → **no errors** in `src/`. (Two pre-existing errors in `skills/` are unrelated to this task.)
- `cd /home/z/my-project && bun run lint 2>&1 | tail -10` → ESLint passes with no output (clean).
- Dev log (`dev.log`) shows successful `GET / 200`, `GET /api/jobs 200`, `GET /api/clients 200` after the changes — site is rendering.
- Counted 33 total blog posts (9 existing + 24 new = 33 ✓).
- All 5 jobs have `fullDescription` arrays ✓.

## Files Modified
- `src/lib/site-data.ts` — extended `Job` type + expanded JOBS data; added 24 new `BLOG_POSTS` entries + new "Creative" category; fully rewrote `LEGAL_DOCS` for all three docs.
- `src/components/site/views/careers-view.tsx` — replaced flat job rows with `<JobCard>` using shadcn `Collapsible`; added View-description toggle, role snapshot, requirements list, and Apply-now buttons (header + footer of expanded detail).

## Files NOT Modified
- `src/components/site/views/blog-view.tsx` — no changes needed; it already renders `BLOG_POSTS` and filters by `BLOG_CATEGORIES`. The new posts and the new "Creative" category slot in cleanly.
- `src/components/site/views/legal-view.tsx` — no changes needed; it already iterates `doc.sections` and renders each `body` paragraph as a `<p>`. The expanded content renders in the existing layout.
- `src/app/api/jobs/route.ts` — no changes needed; the live API returns `description` strings which the new `toUiJob()` normaliser handles gracefully.
