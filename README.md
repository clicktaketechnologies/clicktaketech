# ClickTake Technologies — AI-Native Software Engineering Website

A production-ready, full-stack Next.js 16 website with a built-in CMS admin panel, AI chatbot, advanced SEO/AEO/GEO tools, AI agent discovery standards, and 24 service pages.

## Features

### Core Website
- **24 services** across 4 practice areas (Digital Marketing, Web & Software, AI & Automation, Creative & Brand)
- **13 city landing pages** (Birmingham, London, Manchester, Leeds, Austin, New York, San Francisco, Dubai, Abu Dhabi, Multan, Lahore, Karachi, Islamabad)
- **33 blog posts** (9 editorial + 24 service-related, each SEO-optimized)
- **Full legal pages** with real content (Privacy Policy ~1,890 words GDPR/CCPA, Terms of Service ~1,800 words, Cookie Policy ~1,190 words)
- **AI chatbot** powered by z-ai-web-dev-sdk
- **Job application form** with file uploads (CV, photo, CNIC)
- **Multi-step contact form** with server-side validation
- **Light/dark mode** switcher in admin panel
- **Expandable careers page** with full job descriptions + requirements

### CMS Admin Panel (`/#admin`)
- **20+ tabs**: Pages, Blog (with CSV/MD import), Pricing, Media Library, Team & Careers, Client Logos, Lead CRM (drag-and-drop pipeline), Contact Queries, Job Applications, Email Center, A/B Experiments, Theme Engine, Typography Engine, Advanced SEO Tool, Config Settings, Redirects, Security & Logs, User Roles (RBAC), Activity Log, Traffic Analytics
- **Env-driven auth**: Login uses `SUPERADMIN_EMAIL` + `SUPERADMIN_PASSWORD` env vars (no DB dependency for super-admin)
- **Token verify-on-mount**: Detects stale sessions + auto-logout on 401
- **Seed-data fallback**: Admin panel shows real data even when the DB is unreachable
- **Logo upload from computer**: File upload to Cloudinary (no URL input)
- **Setup Database button**: One-click schema creation + data seeding
- **Dynamic demo credentials**: Login form fetches real credentials from the server
- **Resilient API endpoints**: All admin GET endpoints use `safeQuery()` wrapper (returns seed data on DB error)
- **User Roles & Permissions**: RBAC with 39 granular permissions, 5 role presets (Super Admin, Admin, Editor, Author, Viewer)

### AI Agent Readiness (isitagentready.com — 16/22 checks passing)
- **Content-Signal directives** in response header (`ai-train=no, search=yes, ai-input=no`)
- **Markdown content negotiation** (`Accept: text/markdown` returns clean markdown)
- **API Catalog** (`/.well-known/api-catalog`) — RFC 9727 linkset+json
- **Link headers** on homepage — RFC 8288 (api-catalog, service-desc, service-doc, describedby)
- **OAuth Authorization Server** (`/.well-known/oauth-authorization-server`) — RFC 8414 with `agent_auth` block
- **OAuth Protected Resource** (`/.well-known/oauth-protected-resource`) — RFC 9728
- **OIDC Discovery** (`/.well-known/openid-configuration`)
- **A2A Agent Card** (`/.well-known/agent-card.json`)
- **Agent Skills Discovery** (`/.well-known/agent-skills/index.json`) — v0.2.0 schema with 2 skills
- **MCP Server Card** (`/.well-known/mcp/server-card.json`) — SEP-1649
- **Web Bot Auth** (`/.well-known/http-message-signatures-directory`) — JWKS with Ed25519 key
- **Auth.md** (`/auth.md`) — agent registration discovery with YAML frontmatter
- **llms.txt** (`/llms.txt`) — LLM-friendly site content listing
- **WebMCP** — 4 tools registered via `navigator.modelContext.registerTool()` (search-services, get-pricing, list-jobs, navigate)
- **OpenAPI spec** (`/api/openapi.json`) + **API docs** (`/api/docs`) + **Health check** (`/api/health`)

### SEO Optimization
- **Per-page metadata**: Unique `<title>`, `<meta description>`, `<link rel="canonical">`, OG tags for all 53 pages via `generateMetadata()` in a server component
- **Self-referencing canonicals**: Each page's canonical points to itself (not all → homepage)
- **H1 in SSR HTML**: 6 most important views eager-loaded so H1 appears in server-rendered HTML
- **Per-path structured data**: `Service` schema + `BreadcrumbList` JSON-LD on service pages
- **Catch-all route**: All 53 sitemap URLs return HTTP 200 (optional catch-all `[[...slug]]`)
- **Crawlable internal links**: Navbar + footer use `<a href>` tags (not `<button onClick>`)
- **Hidden nav for orphaned pages**: Visually-hidden `<nav>` with links to all 24 service + 13 city + 10 blog pages
- **Sitemap**: 53 URLs with correct single-segment format (service slugs, city slugs, legal pages)
- **robots.txt**: Valid format, explicit `Allow` for 10 AI search bots (ChatGPT, Claude, Perplexity, GPTBot, CCBot, etc.)
- **JSON-LD**: 10 structured data blocks on homepage (Organization, ProfessionalService, WebSite, ItemList, BreadcrumbList)
- **Voice search + AEO**: Featured snippet definitions, People Also Ask, voice search queries per service
- **E-A-T signals**: Aggregate ratings, founder info, 8 social profiles, case studies

### Performance
- **Lazy-loaded views**: 16 non-critical views loaded via `next/dynamic` (initial JS bundle ~200 KiB, was ~2,272 KiB)
- **Font display: swap**: Geist + Geist Mono fonts use `display: "swap"` (eliminates FOIT)
- **Cloudinary media uploads**: File uploads go to Cloudinary CDN (works on Vercel's read-only filesystem)

### Navbar UX
- **Smooth close-then-navigate**: Mobile menu closes with animation (220ms) BEFORE navigating
- **Mega menu z-index fix**: Dropdown renders above hero text (z-[200])
- **Safe hover zone**: Padding on dropdown prevents premature close (300ms delay)
- **AnimatePresence**: Both mobile menu + mega menu use exit animations

### Footer
- **8 social media icons**: Facebook, Instagram, LinkedIn, YouTube, Tumblr, TikTok, Pinterest, Threads
- **"Start Your Project" CTA** button in footer
- **No empty gaps**: Restructured layout (brand+nav → social+CTA → offices → legal)

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Database**: Prisma ORM (SQLite for dev, PostgreSQL/Supabase for production)
- **AI**: z-ai-web-dev-sdk (LLM chat, vision, web search, TTS, ASR)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Media**: Cloudinary (image uploads + CDN)
- **Email**: Gmail SMTP (Nodemailer)
- **Bot Protection**: Cloudflare Turnstile
- **Auth**: Custom token-based (base64 email:password, env-driven super-admin)

## Quick Start

```bash
bun install
bun run dev
```

Visit `http://localhost:3000` and `http://localhost:3000/#admin`

**Login**: `admin@clicktaketech.com` / `ChangeMe!2025` (or whatever `SUPERADMIN_PASSWORD` is set to in `.env`)

## Environment Variables

See `.env.example` for the full list. Key variables:

```env
DATABASE_URL=file:./db/custom.db    # SQLite for dev, postgresql:// for prod
SUPERADMIN_EMAIL=admin@clicktaketech.com
SUPERADMIN_PASSWORD=ChangeMe!2025
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_UPLOAD_PRESET=your-preset
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your-app-password
TURNSTILE_SITE_KEY=your-key
TURNSTILE_SECRET_KEY=your-secret
```

## API Endpoints

### Public
- `GET /api/clients` — client logos
- `GET /api/team` — team members
- `GET /api/jobs` — open positions
- `GET /api/contact` — contact form submission
- `GET /api/health` — health check
- `GET /api/openapi.json` — OpenAPI 3.0 spec
- `GET /api/docs` — API docs (HTML)

### Admin (requires `x-admin-token` header)
- `GET /api/admin/pages` — list pages
- `GET /api/admin/blog` — list blog posts
- `GET /api/admin/pricing` — list pricing tiers
- `GET /api/admin/settings` — site settings
- `GET /api/admin/users` — admin users
- `POST /api/admin/media` — upload file to Cloudinary
- `POST /api/admin/setup` — create tables + seed data
- `GET /api/admin/auth` — verify token
- `POST /api/admin/auth` — login

### AI Agent Discovery
- `GET /.well-known/api-catalog` — RFC 9727
- `GET /.well-known/oauth-protected-resource` — RFC 9728
- `GET /.well-known/oauth-authorization-server` — RFC 8414
- `GET /.well-known/openid-configuration` — OIDC
- `GET /.well-known/agent-card.json` — A2A
- `GET /.well-known/agent-skills/index.json` — skills discovery
- `GET /.well-known/mcp/server-card.json` — MCP
- `GET /.well-known/http-message-signatures-directory` — JWKS
- `GET /auth.md` — agent auth discovery
- `GET /llms.txt` — LLM content listing
- `GET /robots.txt` — crawler rules + AI bot allowances

## Deployment

See [DEPLOY.md](./DEPLOY.md) for full deployment guide (Vercel + Supabase + Cloudinary, all free tier).

### One-shot database setup

After deploying, run the SQL script to create all tables + seed data:
1. Download: https://raw.githubusercontent.com/clicktaketechnologies/clicktaketech/main/supabase-setup.sql
2. Paste into Supabase SQL Editor → Run
3. Or use the "Setup Database" button in the admin panel Overview tab

## License

© 2026 ClickTake Technologies Ltd. All rights reserved.
