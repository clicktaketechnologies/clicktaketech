// Generates a complete supabase-setup.sql file that creates all 28 tables
// + seeds all data. The user pastes this into the Supabase SQL Editor.
import { db } from "../src/lib/db";
import {
  SERVICE_CATEGORIES,
  BLOG_POSTS,
  PRICING_TIERS,
  JOBS,
} from "../src/lib/site-data";
import { getServiceContent } from "../src/lib/service-content";
import { DEFAULT_SETTINGS } from "../src/lib/admin-activity";
import { writeFileSync } from "node:fs";

function esc(s: string | null | undefined): string {
  if (s == null) return "NULL";
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function q(s: string): string {
  return `"${s}"`;
}

const lines: string[] = [];
lines.push("-- ============================================================");
lines.push("-- ClickTake Technologies — Supabase Setup Script");
lines.push("-- Paste this entire file into: Supabase Dashboard → SQL Editor");
lines.push("--   → New Query → paste → Run");
lines.push("-- Creates all 28 tables + seeds all data (idempotent).");
lines.push("-- ============================================================");
lines.push("");
lines.push("-- Enable statement timeout extension for long-running seed");
lines.push("SET statement_timeout = '120s';");
lines.push("");

// ---- CREATE TABLE statements (from admin-create-tables.ts logic) ----
const tables: { name: string; sql: string }[] = [
  { name: "User", sql: `CREATE TABLE IF NOT EXISTS "User" (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin', permissions TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "Page", sql: `CREATE TABLE IF NOT EXISTS "Page" (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'custom', status TEXT NOT NULL DEFAULT 'published', hero TEXT, overview TEXT, body TEXT, "metaTitle" TEXT, "metaDescription" TEXT, keywords TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "BlogPost", sql: `CREATE TABLE IF NOT EXISTS "BlogPost" (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'General', excerpt TEXT NOT NULL, body TEXT, status TEXT NOT NULL DEFAULT 'published', "readTime" TEXT NOT NULL DEFAULT '5 min', "metaTitle" TEXT, "metaDescription" TEXT, keywords TEXT, "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "PricingTier", sql: `CREATE TABLE IF NOT EXISTS "PricingTier" (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, tagline TEXT NOT NULL, audience TEXT NOT NULL, price TEXT NOT NULL, cadence TEXT NOT NULL, popular BOOLEAN NOT NULL DEFAULT false, features TEXT NOT NULL, "notIncluded" TEXT, cta TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'published', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "ContactQuery", sql: `CREATE TABLE IF NOT EXISTS "ContactQuery" (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, company TEXT, need TEXT, message TEXT, source TEXT NOT NULL DEFAULT 'contact', status TEXT NOT NULL DEFAULT 'new', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "JobApplication", sql: `CREATE TABLE IF NOT EXISTS "JobApplication" (id TEXT PRIMARY KEY, "jobId" TEXT NOT NULL, "positionType" TEXT, "fullName" TEXT NOT NULL, email TEXT NOT NULL, mobile TEXT, "filesFolder" TEXT, "filesManifest" TEXT, status TEXT NOT NULL DEFAULT 'new', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "SeoAudit", sql: `CREATE TABLE IF NOT EXISTS "SeoAudit" (id TEXT PRIMARY KEY, url TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0, "titleLen" INTEGER NOT NULL DEFAULT 0, "descLen" INTEGER NOT NULL DEFAULT 0, "h1Count" INTEGER NOT NULL DEFAULT 0, "hasCanonical" BOOLEAN NOT NULL DEFAULT false, "hasOg" BOOLEAN NOT NULL DEFAULT false, "hasJsonLd" BOOLEAN NOT NULL DEFAULT false, "hasSitemap" BOOLEAN NOT NULL DEFAULT false, "hasRobots" BOOLEAN NOT NULL DEFAULT false, issues TEXT, notes TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "MediaAsset", sql: `CREATE TABLE IF NOT EXISTS "MediaAsset" (id TEXT PRIMARY KEY, name TEXT NOT NULL, url TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL DEFAULT 0, alt TEXT, folder TEXT NOT NULL DEFAULT 'uploads', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "Redirect", sql: `CREATE TABLE IF NOT EXISTS "Redirect" (id TEXT PRIMARY KEY, "from" TEXT NOT NULL UNIQUE, "to" TEXT NOT NULL, status INTEGER NOT NULL DEFAULT 301, active BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "SiteSetting", sql: `CREATE TABLE IF NOT EXISTS "SiteSetting" (id TEXT PRIMARY KEY, key TEXT NOT NULL UNIQUE, value TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'general', "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "ActivityLog", sql: `CREATE TABLE IF NOT EXISTS "ActivityLog" (id TEXT PRIMARY KEY, action TEXT NOT NULL, entity TEXT NOT NULL, "entityId" TEXT, summary TEXT NOT NULL, actor TEXT NOT NULL DEFAULT 'admin', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "Lead", sql: `CREATE TABLE IF NOT EXISTS "Lead" (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, company TEXT, source TEXT NOT NULL DEFAULT 'website', stage TEXT NOT NULL DEFAULT 'new', value TEXT, notes TEXT, tags TEXT, owner TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "EmailTemplate", sql: `CREATE TABLE IF NOT EXISTS "EmailTemplate" (id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, subject TEXT NOT NULL, body TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'transactional', status TEXT NOT NULL DEFAULT 'draft', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "Experiment", sql: `CREATE TABLE IF NOT EXISTS "Experiment" (id TEXT PRIMARY KEY, name TEXT NOT NULL, hypothesis TEXT NOT NULL, page TEXT NOT NULL, "variantA" TEXT NOT NULL, "variantB" TEXT NOT NULL, metric TEXT NOT NULL DEFAULT 'conversion', status TEXT NOT NULL DEFAULT 'draft', "visitorsA" INTEGER NOT NULL DEFAULT 0, "visitorsB" INTEGER NOT NULL DEFAULT 0, "convA" INTEGER NOT NULL DEFAULT 0, "convB" INTEGER NOT NULL DEFAULT 0, winner TEXT, "startDate" TIMESTAMP(3), "endDate" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "ThemeVariable", sql: `CREATE TABLE IF NOT EXISTS "ThemeVariable" (id TEXT PRIMARY KEY, key TEXT NOT NULL UNIQUE, value TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'color', "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "TypographyPreset", sql: `CREATE TABLE IF NOT EXISTS "TypographyPreset" (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, "fontFamily" TEXT NOT NULL, "headingScale" TEXT NOT NULL, "bodySize" TEXT NOT NULL, "lineHeight" TEXT NOT NULL, active BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "SecurityLog", sql: `CREATE TABLE IF NOT EXISTS "SecurityLog" (id TEXT PRIMARY KEY, type TEXT NOT NULL, ip TEXT, email TEXT, detail TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "SiteVisit", sql: `CREATE TABLE IF NOT EXISTS "SiteVisit" (id TEXT PRIMARY KEY, path TEXT NOT NULL, referrer TEXT, country TEXT, device TEXT NOT NULL DEFAULT 'desktop', browser TEXT, "sessionId" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "TeamMember", sql: `CREATE TABLE IF NOT EXISTS "TeamMember" (id TEXT PRIMARY KEY, name TEXT NOT NULL, role TEXT NOT NULL, department TEXT NOT NULL, bio TEXT, photo TEXT, linkedin TEXT, twitter TEXT, "order" INTEGER NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "Job", sql: `CREATE TABLE IF NOT EXISTS "Job" (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, department TEXT NOT NULL, location TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'Full-time', description TEXT NOT NULL, requirements TEXT, salary TEXT, active BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "Keyword", sql: `CREATE TABLE IF NOT EXISTS "Keyword" (id TEXT PRIMARY KEY, keyword TEXT NOT NULL UNIQUE, type TEXT NOT NULL DEFAULT 'commercial', volume INTEGER NOT NULL DEFAULT 0, difficulty INTEGER NOT NULL DEFAULT 0, cpc TEXT, intent TEXT, status TEXT NOT NULL DEFAULT 'tracking', "currentRank" INTEGER, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "Ranking", sql: `CREATE TABLE IF NOT EXISTS "Ranking" (id TEXT PRIMARY KEY, keyword TEXT NOT NULL, position INTEGER NOT NULL, engine TEXT NOT NULL DEFAULT 'google', "serpFeature" TEXT, url TEXT, date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "AiMention", sql: `CREATE TABLE IF NOT EXISTS "AiMention" (id TEXT PRIMARY KEY, prompt TEXT NOT NULL, platform TEXT NOT NULL, mentioned BOOLEAN NOT NULL DEFAULT false, sentiment TEXT, citation TEXT, response TEXT, date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "Backlink", sql: `CREATE TABLE IF NOT EXISTS "Backlink" (id TEXT PRIMARY KEY, "sourceUrl" TEXT NOT NULL, "targetUrl" TEXT NOT NULL, "anchorText" TEXT, "domainRating" INTEGER NOT NULL DEFAULT 0, dofollow BOOLEAN NOT NULL DEFAULT true, status TEXT NOT NULL DEFAULT 'active', "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "ContentBrief", sql: `CREATE TABLE IF NOT EXISTS "ContentBrief" (id TEXT PRIMARY KEY, title TEXT NOT NULL, keyword TEXT NOT NULL, headings TEXT, faqs TEXT, entities TEXT, "wordCount" INTEGER NOT NULL DEFAULT 0, "seoScore" INTEGER NOT NULL DEFAULT 0, "aeoScore" INTEGER NOT NULL DEFAULT 0, "geoScore" INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'draft', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
  { name: "SeoIssue", sql: `CREATE TABLE IF NOT EXISTS "SeoIssue" (id TEXT PRIMARY KEY, type TEXT NOT NULL, severity TEXT NOT NULL DEFAULT 'warning', url TEXT NOT NULL, detail TEXT NOT NULL, "fixSuggestion" TEXT, status TEXT NOT NULL DEFAULT 'open', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "SeoReport", sql: `CREATE TABLE IF NOT EXISTS "SeoReport" (id TEXT PRIMARY KEY, type TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0, summary TEXT, data TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "ClientLogo", sql: `CREATE TABLE IF NOT EXISTS "ClientLogo" (id TEXT PRIMARY KEY, name TEXT NOT NULL, logo TEXT NOT NULL, website TEXT, category TEXT NOT NULL DEFAULT 'general', "order" INTEGER NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)` },
  { name: "Post", sql: `CREATE TABLE IF NOT EXISTS "Post" (id TEXT PRIMARY KEY, title TEXT NOT NULL, content TEXT, published BOOLEAN NOT NULL DEFAULT false, "authorId" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL)` },
];

lines.push("-- ============================================");
lines.push("-- 1. CREATE ALL TABLES (28 tables)");
lines.push("-- ============================================");
for (const t of tables) {
  lines.push(`${t.sql};`);
}
lines.push("");

// ---- CREATE INDEXES ----
lines.push("-- ============================================");
lines.push("-- 2. CREATE INDEXES");
lines.push("-- ============================================");
const indexes = [
  ['"Page"', '"status"', 'Page_status_idx'],
  ['"Page"', '"category"', 'Page_category_idx'],
  ['"BlogPost"', '"status"', 'BlogPost_status_idx'],
  ['"BlogPost"', '"category"', 'BlogPost_category_idx'],
  ['"ContactQuery"', '"status"', 'ContactQuery_status_idx'],
  ['"ContactQuery"', '"source"', 'ContactQuery_source_idx'],
  ['"JobApplication"', '"status"', 'JobApplication_status_idx'],
  ['"JobApplication"', '"jobId"', 'JobApplication_jobId_idx'],
  ['"MediaAsset"', '"folder"', 'MediaAsset_folder_idx'],
  ['"MediaAsset"', '"mime"', 'MediaAsset_mime_idx'],
  ['"ActivityLog"', '"entity"', 'ActivityLog_entity_idx'],
  ['"ActivityLog"', '"action"', 'ActivityLog_action_idx'],
  ['"ActivityLog"', '"createdAt"', 'ActivityLog_createdAt_idx'],
  ['"Lead"', '"stage"', 'Lead_stage_idx'],
  ['"Lead"', '"source"', 'Lead_source_idx'],
  ['"Lead"', '"owner"', 'Lead_owner_idx'],
  ['"EmailTemplate"', '"category"', 'EmailTemplate_category_idx'],
  ['"EmailTemplate"', '"status"', 'EmailTemplate_status_idx'],
  ['"Experiment"', '"status"', 'Experiment_status_idx'],
  ['"SecurityLog"', '"type"', 'SecurityLog_type_idx'],
  ['"SecurityLog"', '"createdAt"', 'SecurityLog_createdAt_idx'],
  ['"SiteVisit"', '"path"', 'SiteVisit_path_idx'],
  ['"SiteVisit"', '"createdAt"', 'SiteVisit_createdAt_idx'],
  ['"SiteVisit"', '"sessionId"', 'SiteVisit_sessionId_idx'],
  ['"TeamMember"', '"active"', 'TeamMember_active_idx'],
  ['"TeamMember"', '"department"', 'TeamMember_department_idx'],
  ['"Job"', '"active"', 'Job_active_idx'],
  ['"Job"', '"department"', 'Job_department_idx'],
  ['"Keyword"', '"status"', 'Keyword_status_idx'],
  ['"Keyword"', '"type"', 'Keyword_type_idx'],
  ['"Ranking"', '"keyword"', 'Ranking_keyword_idx'],
  ['"Ranking"', '"date"', 'Ranking_date_idx'],
  ['"AiMention"', '"platform"', 'AiMention_platform_idx'],
  ['"AiMention"', '"date"', 'AiMention_date_idx'],
  ['"Backlink"', '"status"', 'Backlink_status_idx'],
  ['"ContentBrief"', '"status"', 'ContentBrief_status_idx'],
  ['"SeoIssue"', '"status"', 'SeoIssue_status_idx'],
  ['"SeoIssue"', '"severity"', 'SeoIssue_severity_idx'],
  ['"SeoReport"', '"type"', 'SeoReport_type_idx'],
  ['"ClientLogo"', '"active"', 'ClientLogo_active_idx'],
  ['"ClientLogo"', '"category"', 'ClientLogo_category_idx'],
];
for (const [table, col, idx] of indexes) {
  lines.push(`CREATE INDEX IF NOT EXISTS ${idx} ON ${table} (${col});`);
}
lines.push("");

// ---- SEED DATA ----
lines.push("-- ============================================");
lines.push("-- 3. SEED DATA (idempotent — ON CONFLICT DO NOTHING)");
lines.push("-- ============================================");

// Admin user
lines.push("-- Admin user");
lines.push(`INSERT INTO "User" (id, email, name, password, role, permissions, "createdAt", "updatedAt") VALUES ('admin-1', 'admin@clicktaketech.com', 'ClickTake Admin', 'ChangeMe!2025', 'admin', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role, permissions = EXCLUDED.permissions;`);

// Pages: 13 top-level + 24 service
lines.push("");
lines.push("-- Pages (13 top-level + 24 service detail = 37)");
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
  lines.push(`INSERT INTO "Page" (id, slug, title, category, status, hero, "createdAt", "updatedAt") VALUES ('page-${p.slug}', ${esc(p.slug)}, ${esc(p.title)}, ${esc(p.category)}, 'published', ${esc(p.hero)}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (slug) DO NOTHING;`);
}
for (const cat of SERVICE_CATEGORIES) {
  for (const s of cat.services) {
    const content = getServiceContent(s.slug);
    const keywords = [content?.primaryKeyword, ...(content?.secondaryKeywords ?? [])].filter(Boolean).join(", ");
    lines.push(`INSERT INTO "Page" (id, slug, title, category, status, hero, overview, body, "metaTitle", "metaDescription", keywords, "createdAt", "updatedAt") VALUES ('page-${s.slug}', ${esc(s.slug)}, ${esc(s.title)}, ${esc(cat.label)}, 'published', ${esc(s.title)}, ${esc(content?.overview ?? s.desc)}, ${esc(s.desc)}, ${esc(content?.metaTitle ?? s.title)}, ${esc(content?.metaDescription ?? s.desc)}, ${esc(keywords)}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (slug) DO NOTHING;`);
  }
}

// Blog posts
lines.push("");
lines.push("-- Blog posts");
for (const b of BLOG_POSTS) {
  lines.push(`INSERT INTO "BlogPost" (id, slug, title, category, excerpt, body, status, "readTime", "createdAt", "updatedAt", "publishedAt") VALUES ('blog-${b.slug}', ${esc(b.slug)}, ${esc(b.title)}, ${esc(b.category)}, ${esc(b.excerpt)}, ${esc(b.excerpt)}, 'published', ${esc(b.readTime)}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (slug) DO NOTHING;`);
}

// Pricing tiers
lines.push("");
lines.push("-- Pricing tiers");
for (const t of PRICING_TIERS) {
  lines.push(`INSERT INTO "PricingTier" (id, name, tagline, audience, price, cadence, popular, features, "notIncluded", cta, status, "createdAt", "updatedAt") VALUES ('tier-${t.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}', ${esc(t.name)}, ${esc(t.tagline)}, ${esc(t.audience)}, ${esc(t.price)}, ${esc(t.cadence)}, ${t.popular ? 'TRUE' : 'FALSE'}, ${esc(t.features.join("\\n"))}, ${esc(t.notIncluded.join("\\n"))}, ${esc(t.cta)}, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (name) DO NOTHING;`);
}

// Team members
lines.push("");
lines.push("-- Team members (6)");
const teamMembers = [
  { id: "sarah-mitchell", name: "Sarah Mitchell", role: "Founder & CEO", department: "Leadership", bio: "Founded ClickTake in 2019. 15+ years in software engineering and AI.", order: 1 },
  { id: "james-o-connor", name: "James O'Connor", role: "CTO", department: "Leadership", bio: "Leads the engineering practice. Ex-AWS, ex-fintech.", order: 2 },
  { id: "aisha-khan", name: "Aisha Khan", role: "Head of Growth", department: "Marketing", bio: "Drives SEO, paid, and content strategy across all clients.", order: 3 },
  { id: "aisha-al-mansoori", name: "Aisha Al-Mansoori", role: "MENA Director", department: "Operations", bio: "Heads the Dubai office and MENA client relationships.", order: 4 },
  { id: "david-chen", name: "David Chen", role: "Lead AI Engineer", department: "Development", bio: "Ships multi-agent systems and RAG pipelines to production.", order: 5 },
  { id: "maria-santos", name: "Maria Santos", role: "Creative Director", department: "Creative", bio: "Leads brand identity and web design across all engagements.", order: 6 },
];
for (const m of teamMembers) {
  lines.push(`INSERT INTO "TeamMember" (id, name, role, department, bio, "order", active, "createdAt", "updatedAt") VALUES (${esc(m.id)}, ${esc(m.name)}, ${esc(m.role)}, ${esc(m.department)}, ${esc(m.bio)}, ${m.order}, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (id) DO NOTHING;`);
}

// Jobs
lines.push("");
lines.push("-- Jobs");
for (const j of JOBS) {
  lines.push(`INSERT INTO "Job" (id, slug, title, department, location, type, description, active, "createdAt", "updatedAt") VALUES ('job-${j.slug}', ${esc(j.slug)}, ${esc(j.title)}, ${esc(j.department)}, ${esc(j.location)}, ${esc(j.type)}, ${esc(j.desc)}, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (slug) DO NOTHING;`);
}

// Client logos
lines.push("");
lines.push("-- Client logos (8)");
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
for (const c of sampleClients) {
  const id = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  lines.push(`INSERT INTO "ClientLogo" (id, name, logo, website, category, "order", active, "createdAt") VALUES (${esc(id)}, ${esc(c.name)}, ${esc(c.logo)}, ${esc(c.website)}, ${esc(c.category)}, ${c.order}, TRUE, CURRENT_TIMESTAMP) ON CONFLICT (id) DO NOTHING;`);
}

// Site settings
lines.push("");
lines.push("-- Site settings");
for (const s of DEFAULT_SETTINGS) {
  lines.push(`INSERT INTO "SiteSetting" (id, key, value, category, "updatedAt") VALUES ('setting-${s.key.replace(/[^a-z0-9]/gi, "-").toLowerCase()}', ${esc(s.key)}, ${esc(s.value)}, ${esc(s.category)}, CURRENT_TIMESTAMP) ON CONFLICT (key) DO NOTHING;`);
}

// Theme variables
lines.push("");
lines.push("-- Theme variables (9)");
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
for (const t of themeVars) {
  lines.push(`INSERT INTO "ThemeVariable" (id, key, value, category, "updatedAt") VALUES ('theme-${t.key.replace(/[^a-z0-9]/gi, "-").toLowerCase()}', ${esc(t.key)}, ${esc(t.value)}, ${esc(t.category)}, CURRENT_TIMESTAMP) ON CONFLICT (key) DO NOTHING;`);
}

// Typography preset
lines.push("");
lines.push("-- Typography preset");
lines.push(`INSERT INTO "TypographyPreset" (id, name, "fontFamily", "headingScale", "bodySize", "lineHeight", active, "createdAt") VALUES ('typography-default', 'Default', 'Geist, system-ui, sans-serif', '1.25', '16px', '1.6', TRUE, CURRENT_TIMESTAMP) ON CONFLICT (name) DO NOTHING;`);

lines.push("");
lines.push("-- ============================================");
lines.push("-- DONE! All 28 tables created + data seeded.");
lines.push("-- Your admin panel at clicktaketech.com/#admin");
lines.push("-- will now show all data.");
lines.push("-- ============================================");

const sql = lines.join("\n");
writeFileSync("supabase-setup.sql", sql);
console.log(`Generated supabase-setup.sql (${sql.length} chars, ${lines.length} lines)`);
console.log("Tables:", tables.length);
console.log("Indexes:", indexes.length);

await db.$disconnect();
