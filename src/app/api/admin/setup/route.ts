import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { execSync } from "node:child_process";
import path from "node:path";
import { createTables } from "@/lib/admin-create-tables";
import {
  SERVICE_CATEGORIES,
  BLOG_POSTS,
  PRICING_TIERS,
  JOBS,
} from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";
import { DEFAULT_SETTINGS } from "@/lib/admin-activity";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/admin/setup
 * One-shot endpoint that:
 *   1. Detects whether the Supabase DB schema is provisioned.
 *   2. If missing, runs `prisma db push --accept-data-loss` via the local
 *      prisma binary to create ALL tables from prisma/schema.prisma.
 *   3. Seeds ALL data: admin user, pages, blog posts, pricing tiers, team
 *      members, jobs, client logos, site settings, theme variables,
 *      typography presets.
 *   4. Returns a summary.
 * Idempotent (uses upserts) — safe to call multiple times.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();

  const summary: Record<string, number | string | string[]> = {};
  const steps: string[] = [];

  // Step 1: detect if the schema is provisioned.
  let schemaReady = false;
  try {
    await db.page.count();
    schemaReady = true;
    steps.push("schema: already provisioned (Page table responds)");
  } catch {
    steps.push("schema: Page table missing — will push schema");
  }

  // Step 2: push schema if missing.
  if (!schemaReady) {
    const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
    const env = { ...process.env };
    // Try multiple ways to invoke the Prisma CLI — Vercel's serverless
    // bundle may not include the node_modules/.bin/prisma symlink, but the
    // prisma package's JS entry point is usually present.
    const prismaInvocations = [
      () => execSync(`"${path.join(process.cwd(), "node_modules", ".bin", "prisma")}" db push --accept-data-loss --schema="${schemaPath}"`, { stdio: "pipe", timeout: 45000, env }),
      () => execSync(`node "${path.join(process.cwd(), "node_modules", "prisma", "build", "index.js")}" db push --accept-data-loss --schema="${schemaPath}"`, { stdio: "pipe", timeout: 45000, env }),
      () => execSync(`npx --no-install prisma db push --accept-data-loss --schema="${schemaPath}"`, { stdio: "pipe", timeout: 45000, env }),
    ];
    for (let i = 0; i < prismaInvocations.length; i++) {
      try {
        prismaInvocations[i]();
        steps.push(`schema: pushed via prisma db push (method ${i + 1}, all tables created)`);
        schemaReady = true;
        break;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        steps.push(`schema: method ${i + 1} failed — ${msg.substring(0, 150)}`);
      }
    }
  }

  if (!schemaReady) {
    // Step 2b: raw SQL fallback — create all tables via CREATE TABLE IF
    // NOT EXISTS using db.$executeRawUnsafe. This works even on Vercel
    // serverless where the prisma CLI isn't in the bundle.
    steps.push("schema: CLI methods failed — falling back to raw SQL table creation");
    try {
      const tableResults = await createTables();
      steps.push(...tableResults);
      // Re-check if Page table is now accessible
      try {
        await db.page.count();
        schemaReady = true;
        steps.push("schema: confirmed ready via raw SQL creation");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        steps.push(`schema: raw SQL created tables but Page still inaccessible — ${msg.substring(0, 150)}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      steps.push(`schema: raw SQL creation failed — ${msg.substring(0, 150)}`);
    }
  }

  if (!schemaReady) {
    summary.error = "Schema creation failed (CLI + raw SQL both failed). See steps for details.";
    summary.steps = steps;
    return NextResponse.json({ ok: false, summary }, { status: 500 });
  }

  // Step 3: seed all data (idempotent via upserts).

  // Admin user
  try {
    const adminEmail = (process.env.SUPERADMIN_EMAIL || "admin@clicktaketech.com").trim().toLowerCase();
    const adminPassword = process.env.SUPERADMIN_PASSWORD || "clicktake-admin-2026";
    const existing = await db.user.findUnique({ where: { email: adminEmail } });
    if (!existing) {
      await db.user.create({ data: { email: adminEmail, name: "ClickTake Admin", password: adminPassword, role: "admin", permissions: null } });
    } else if (existing.password !== adminPassword) {
      await db.user.update({ where: { id: existing.id }, data: { password: adminPassword, role: "admin", permissions: null } });
    }
    steps.push("admin user: synced to env");
  } catch (e) {
    steps.push(`admin user: FAILED — ${e instanceof Error ? e.message.substring(0, 100) : e}`);
  }

  // Pages: 13 top-level + 24 service detail
  let pageCount = 0;
  const topLevelPages = [
    { slug: "home", title: "Home", category: "core", hero: "Engineering Tomorrow's Intelligence, Today." },
    { slug: "services", title: "Services", category: "core", hero: "Full-spectrum engineering services." },
    { slug: "solutions", title: "Solutions", category: "core", hero: "Built for your business type." },
    { slug: "case-studies", title: "Case Studies", category: "core", hero: "Real clients. Real numbers." },
    { slug: "portfolio", title: "Portfolio", category: "core", hero: "Production work, live right now." },
    { slug: "blog", title: "Blog", category: "core", hero: "Field notes from the ClickTake team." },
    { slug: "pricing", title: "Pricing", category: "core", hero: "Transparent pricing." },
    { slug: "about", title: "About", category: "core", hero: "AI-native agency since 2019." },
    { slug: "team", title: "Our Team", category: "core", hero: "28 people across 4 offices." },
    { slug: "careers", title: "Careers", category: "core", hero: "Join ClickTake." },
    { slug: "cities", title: "Cities We Serve", category: "core", hero: "Local presence, global delivery." },
    { slug: "connect", title: "Connect", category: "core", hero: "Let's connect." },
    { slug: "contact", title: "Contact", category: "core", hero: "Let's build something extraordinary." },
  ];
  for (const p of topLevelPages) {
    try {
      await db.page.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, status: "published" } });
      pageCount++;
    } catch { /* skip */ }
  }
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      try {
        const content = getServiceContent(s.slug);
        await db.page.upsert({
          where: { slug: s.slug },
          update: {},
          create: {
            slug: s.slug, title: s.title, category: cat.label, hero: s.title,
            overview: content?.overview ?? s.desc, body: s.desc,
            metaTitle: content?.metaTitle ?? s.title,
            metaDescription: content?.metaDescription ?? s.desc,
            keywords: [content?.primaryKeyword, ...(content?.secondaryKeywords ?? [])].filter(Boolean).join(", "),
            status: "published",
          },
        });
        pageCount++;
      } catch { /* skip */ }
    }
  }
  summary.pages = pageCount;
  steps.push(`pages: ${pageCount} seeded (13 top-level + 24 service)`);

  // Blog posts
  let blogCount = 0;
  for (const b of BLOG_POSTS) {
    try {
      await db.blogPost.upsert({
        where: { slug: b.slug },
        update: {},
        create: { slug: b.slug, title: b.title, category: b.category, excerpt: b.excerpt, body: b.excerpt, status: "published", readTime: b.readTime },
      });
      blogCount++;
    } catch { /* skip */ }
  }
  summary.blogPosts = blogCount;
  steps.push(`blog posts: ${blogCount} seeded`);

  // Pricing tiers
  let pricingCount = 0;
  for (const t of PRICING_TIERS) {
    try {
      await db.pricingTier.upsert({
        where: { name: t.name },
        update: {},
        create: {
          name: t.name, tagline: t.tagline, audience: t.audience, price: t.price,
          cadence: t.cadence, popular: t.popular ?? false,
          features: t.features.join("\n"), notIncluded: t.notIncluded.join("\n"),
          cta: t.cta, status: "published",
        },
      });
      pricingCount++;
    } catch { /* skip */ }
  }
  summary.pricingTiers = pricingCount;
  steps.push(`pricing tiers: ${pricingCount} seeded`);

  // Team members
  const teamMembers = [
    { id: "sarah-mitchell", name: "Sarah Mitchell", role: "Founder & CEO", department: "Leadership", bio: "Founded ClickTake in 2019. 15+ years in software engineering and AI.", order: 1 },
    { id: "james-o-connor", name: "James O'Connor", role: "CTO", department: "Leadership", bio: "Leads the engineering practice. Ex-AWS, ex-fintech.", order: 2 },
    { id: "aisha-khan", name: "Aisha Khan", role: "Head of Growth", department: "Marketing", bio: "Drives SEO, paid, and content strategy across all clients.", order: 3 },
    { id: "aisha-al-mansoori", name: "Aisha Al-Mansoori", role: "MENA Director", department: "Operations", bio: "Heads the Dubai office and MENA client relationships.", order: 4 },
    { id: "david-chen", name: "David Chen", role: "Lead AI Engineer", department: "Development", bio: "Ships multi-agent systems and RAG pipelines to production.", order: 5 },
    { id: "maria-santos", name: "Maria Santos", role: "Creative Director", department: "Creative", bio: "Leads brand identity and web design across all engagements.", order: 6 },
  ];
  let teamCount = 0;
  for (const m of teamMembers) {
    try {
      await db.teamMember.upsert({ where: { id: m.id }, update: {}, create: { ...m, active: true } });
      teamCount++;
    } catch { /* skip */ }
  }
  summary.teamMembers = teamCount;
  steps.push(`team members: ${teamCount} seeded`);

  // Jobs
  let jobCount = 0;
  for (const j of JOBS) {
    try {
      await db.job.upsert({
        where: { slug: j.slug },
        update: {},
        create: {
          slug: j.slug, title: j.title, department: j.department, location: j.location,
          type: j.type, description: j.desc,
          requirements: null, salary: null, active: true,
        },
      });
      jobCount++;
    } catch { /* skip */ }
  }
  summary.jobs = jobCount;
  steps.push(`jobs: ${jobCount} seeded`);

  // Client logos
  const sampleClients = [
    { name: "DibNow", logo: "", website: "https://dibnow.com", category: "saas", order: 1 },
    { name: "Panel — Employee Management", logo: "", website: "", category: "saas", order: 2 },
    { name: "LogiTrack", logo: "", website: "", category: "saas", order: 3 },
    { name: "ClickOpticX", logo: "", website: "", category: "saas", order: 4 },
    { name: "Mearns Gadget Repair", logo: "", website: "", category: "repair", order: 5 },
    { name: "Gadget Doctor LS", logo: "", website: "", category: "repair", order: 6 },
    { name: "Academy Portal", logo: "", website: "", category: "education", order: 7 },
    { name: "LearnHub", logo: "", website: "", category: "education", order: 8 },
  ];
  let clientCount = 0;
  for (const c of sampleClients) {
    try {
      const id = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await db.clientLogo.upsert({ where: { id }, update: {}, create: { ...c, id, active: true } });
      clientCount++;
    } catch { /* skip */ }
  }
  summary.clientLogos = clientCount;
  steps.push(`client logos: ${clientCount} seeded`);

  // Site settings
  let settingsCount = 0;
  for (const s of DEFAULT_SETTINGS) {
    try {
      await db.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s });
      settingsCount++;
    } catch { /* skip */ }
  }
  summary.siteSettings = settingsCount;
  steps.push(`site settings: ${settingsCount} seeded`);

  // Theme variables
  const themeVars = [
    { key: "--color-primary", value: "#136DFF", category: "color" },
    { key: "--color-accent", value: "#FF53A9", category: "color" },
    { key: "--color-background", value: "#0a0e1a", category: "color" },
    { key: "--color-foreground", value: "#f8fafc", category: "color" },
    { key: "--color-card", value: "#141828", category: "color" },
    { key: "--color-border", value: "rgba(255,255,255,0.1)", category: "color" },
    { key: "--radius", value: "0.75rem", category: "radius" },
    { key: "--font-sans", value: "Geist, system-ui, sans-serif", category: "font" },
    { key: "--font-mono", value: "Geist Mono, monospace", category: "font" },
  ];
  let themeCount = 0;
  for (const t of themeVars) {
    try {
      await db.themeVariable.upsert({ where: { key: t.key }, update: {}, create: t });
      themeCount++;
    } catch { /* skip */ }
  }
  summary.themeVariables = themeCount;
  steps.push(`theme variables: ${themeCount} seeded`);

  // Typography preset
  try {
    await db.typographyPreset.upsert({
      where: { name: "Default" },
      update: {},
      create: { name: "Default", fontFamily: "Geist, system-ui, sans-serif", headingScale: "1.25", bodySize: "16px", lineHeight: "1.6", active: true },
    });
    steps.push("typography preset: 1 seeded");
  } catch { /* skip */ }

  summary.steps = steps;

  try {
    await logActivity({ action: "create", entity: "setting", summary: "Database setup/seed completed via /api/admin/setup" });
  } catch { /* ignore */ }

  return NextResponse.json({ ok: true, summary });
}
