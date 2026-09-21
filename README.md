# ClickTake Technologies — AI-Native Software Engineering Website

A production-ready, full-stack Next.js 16 website with a built-in CMS admin panel, AI chatbot, advanced SEO/AEO/GEO tools, and 24 service pages.

## Features

- **24 services** across 4 practice areas (Digital Marketing, Web & Software, AI & Automation, Creative & Brand)
- **Full CMS admin panel** at `/#admin` with 20+ tabs:
  - Pages, Blog (with CSV/MD import), Pricing, Media Library
  - Team Members, Job Listings, Client Logos
  - Lead CRM (drag-and-drop pipeline), Contact Queries, Job Applications
  - Email Center, A/B Experiments
  - Theme Engine (colors, fonts), Typography Engine
  - Advanced SEO Tool (AI-powered content analyzer, keyword research, AI visibility tracker, GEO recommendations)
  - Site Settings (logo, favicon, opening hours, target areas, branding)
  - User Roles & Permissions (RBAC with 39 granular permissions)
  - Activity Log, Security Logs, Traffic Analytics
- **AI chatbot** powered by z-ai-web-dev-sdk
- **Job application form** with file uploads (CV, photo, CNIC)
- **Multi-step contact form** with server-side validation
- **Light/dark mode** switcher in admin panel
- **SEO optimized**: JSON-LD structured data, sitemap.xml, robots.txt, OpenGraph, per-page meta tags
- **Voice search + AEO optimization**: featured snippet definitions, People Also Ask, voice search queries
- **E-A-T signals**: aggregate ratings, founder info, 8 social profiles, case studies

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM (SQLite for dev, PostgreSQL for production)
- **AI**: z-ai-web-dev-sdk (LLM chat, vision, web search)
- **Animations**: Framer Motion
- **Icons**: Lucide React + 3D emoji icons

## Quick Start

```bash
bun install
bun run dev
```

Visit `http://localhost:3000` and `http://localhost:3000/#admin` (login: `admin@clicktaketech.com` / `clicktake-admin-2026`)

## Deployment

See [DEPLOY.md](./DEPLOY.md) for full deployment guide (Vercel + Supabase + Cloudinary, all free tier).

## License

© 2026 ClickTake Technologies. All rights reserved.
