# ClickTake Technologies — Deployment Guide

## 🚀 Quick Deploy (15 minutes)

### Step 1: Database — Supabase (Free)
1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Create a new project → wait ~2 min for provisioning
3. Go to **Settings → Database → Connection string → URI**
4. Copy the connection string (looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`)

### Step 2: Storage — Cloudinary (Free)
1. Go to [cloudinary.com](https://cloudinary.com) → Sign up (free)
2. Go to **Dashboard** → copy your **Cloud name**, **API Key**, **API Secret**

### Step 3: Switch Prisma to PostgreSQL
Before deploying, change the database provider from SQLite to PostgreSQL:

```bash
# Edit prisma/schema.prisma
# Change:
#   provider = "sqlite"
# To:
#   provider = "postgresql"
```

Then push the schema to your new Supabase database and seed it:
```bash
# Set the Supabase connection string
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Push schema
bun run db:push

# Generate Prisma client
bun run db:generate

# Seed initial data
bun run scripts/seed-cms.ts
bun run scripts/seed-settings.ts
bun run scripts/seed-team-jobs.ts
bun run scripts/seed-clients.ts
bun run scripts/seed-brand.ts
```

### Step 4: Deploy to Vercel (Free)
1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
3. Click **"Add New Project"** → Import your `clicktaketech` repo
4. Vercel auto-detects Next.js — no config needed
5. Add **Environment Variables** in the Vercel dashboard:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` (update after first deploy) |
| `NODE_ENV` | `production` |

6. Click **Deploy** — Vercel builds and deploys automatically (~3 min)
7. After deploy, update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
8. (Optional) Add custom domain: **Settings → Domains → Add** → enter `clicktaketech.com`

### Step 5: Prevent Cold Starts (Free)
1. Go to [uptimerobot.com](https://uptimerobot.com) → Sign up (free)
2. Add Monitor → HTTP(s) → URL: `https://your-app.vercel.app/api/health` → Interval: 5 minutes
3. This pings your API every 5 min → serverless functions never sleep → zero cold starts

### Step 6: Admin Panel Setup
1. Visit `https://your-app.vercel.app/#admin`
2. Login: `admin@clicktaketech.com` / `clicktake-admin-2026`
3. **Change the password immediately** in Users & Roles
4. Upload client logos in Client Logos tab
5. Configure branding in Config Settings

---

## 📋 Environment Variables Reference

Create a `.env` file locally (for dev) and set these in Vercel dashboard (for production):

```env
# Database (local dev = SQLite, production = Supabase PostgreSQL)
DATABASE_URL=file:/home/z/my-project/db/custom.db

# Public site URL
NEXT_PUBLIC_SITE_URL=https://clicktaketech.com

# Environment
NODE_ENV=production

# Cloudinary (optional — for image management)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google Analytics (optional)
GOOGLE_ANALYTICS_ID=

# Google Search Console (optional)
GOOGLE_SITE_VERIFICATION=

# Stripe (optional — for payments)
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Email delivery (optional)
RESEND_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

---

## 🆓 Free Tier Limits

| Service | Free Limit | When to Upgrade |
|---------|-----------|-----------------|
| Vercel | 100GB bandwidth/mo | >10k daily visitors |
| Supabase | 500MB DB, 1GB storage | >500MB data |
| Cloudinary | 25GB storage, 25GB/mo | >25GB images |
| UptimeRobot | 50 monitors, 5-min interval | Need 1-min interval |

**Estimated capacity:** 10,000+ monthly visitors, 500+ admin operations, 25GB media — all free.

---

## 🔧 Local Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Run lint
bun run lint

# Push DB schema (SQLite)
bun run db:push

# Seed data
bun run scripts/seed-cms.ts
bun run scripts/seed-settings.ts
bun run scripts/seed-team-jobs.ts
bun run scripts/seed-clients.ts
bun run scripts/seed-brand.ts
```

---

## 📁 Project Structure

```
clicktaketech/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes (contact, chat, admin)
│   │   │   ├── admin/          # Admin CMS API (20+ routes)
│   │   │   ├── chat/           # AI chatbot
│   │   │   ├── contact/        # Contact form
│   │   │   ├── job-apply/      # Job application form
│   │   │   ├── clients/        # Public client logos
│   │   │   ├── team/           # Public team members
│   │   │   ├── jobs/           # Public job listings
│   │   │   ├── health/        # Health check (UptimeRobot)
│   │   │   ├── sitemap.ts      # Dynamic sitemap.xml
│   │   │   ├── robots.ts        # Dynamic robots.txt
│   │   │   └── manifest.ts     # PWA manifest
│   │   ├── page.tsx             # Main SPA (all views)
│   │   ├── layout.tsx           # Root layout + SEO
│   │   └── globals.css         # Theme + brand colors
│   ├── components/
│   │   └── site/                # All components
│   │       ├── views/           # 15 page views
│   │       ├── navbar.tsx       # Mega menu navbar
│   │       ├── footer.tsx       # Footer
│   │       ├── chatbot.tsx      # AI chatbot widget
│   │       ├── admin-view.tsx  # Admin CMS panel (20 tabs)
│   │       ├── seo-tool-*.tsx  # Advanced SEO tool
│   │       └── ...
│   └── lib/
│       ├── db.ts               # Prisma client
│       ├── site-data.ts        # Static content (24 services, etc.)
│       ├── service-content.ts # SEO keywords for 24 services
│       ├── rbac.ts             # Permission definitions
│       └── admin-auth.ts      # Admin auth helper
├── prisma/
│   └── schema.prisma           # 28 DB models
├── public/                     # Static assets (logos, favicons)
├── scripts/                   # Seed scripts
├── .env.example               # Environment variable template
├── next.config.ts             # Next.js config
└── package.json
```

---

## 🔐 Security Checklist (Before Launch)

- [ ] Change admin password (Users & Roles tab)
- [ ] Set `NODE_ENV=production` in Vercel
- [ ] Verify `.env` is in `.gitignore` (it is)
- [ ] Test all forms: contact, job application, chatbot
- [ ] Verify sitemap.xml and robots.txt are accessible
- [ ] Check SSL certificate (Vercel provides free SSL)
- [ ] Set up UptimeRobot for cold-start prevention
