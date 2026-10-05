import { db } from "@/lib/db";

/**
 * Creates all Prisma-model tables via raw SQL (CREATE TABLE IF NOT EXISTS)
 * when `prisma db push` can't run (e.g. on Vercel serverless where the
 * prisma CLI isn't in the bundle). PostgreSQL syntax (Supabase).
 *
 * Field types map from the Prisma schema:
 *   String → TEXT, Int → INTEGER, Boolean → BOOLEAN, DateTime → TIMESTAMP
 *   @id @default(cuid()) → TEXT PRIMARY KEY
 *   @unique → UNIQUE constraint
 *   @default(now()) → DEFAULT NOW()
 *
 * Idempotent — safe to call multiple times.
 */
export async function createTables(): Promise<string[]> {
  const results: string[] = [];

  const statements: { name: string; sql: string }[] = [
    {
      name: "User",
      sql: `CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        permissions TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "Page",
      sql: `CREATE TABLE IF NOT EXISTS "Page" (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'custom',
        status TEXT NOT NULL DEFAULT 'published',
        hero TEXT,
        overview TEXT,
        body TEXT,
        "metaTitle" TEXT,
        "metaDescription" TEXT,
        keywords TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "BlogPost",
      sql: `CREATE TABLE IF NOT EXISTS "BlogPost" (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'General',
        excerpt TEXT NOT NULL,
        body TEXT,
        status TEXT NOT NULL DEFAULT 'published',
        "readTime" TEXT NOT NULL DEFAULT '5 min',
        "metaTitle" TEXT,
        "metaDescription" TEXT,
        keywords TEXT,
        "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "PricingTier",
      sql: `CREATE TABLE IF NOT EXISTS "PricingTier" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        tagline TEXT NOT NULL,
        audience TEXT NOT NULL,
        price TEXT NOT NULL,
        cadence TEXT NOT NULL,
        popular BOOLEAN NOT NULL DEFAULT false,
        features TEXT NOT NULL,
        "notIncluded" TEXT,
        cta TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "ContactQuery",
      sql: `CREATE TABLE IF NOT EXISTS "ContactQuery" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        need TEXT,
        message TEXT,
        source TEXT NOT NULL DEFAULT 'contact',
        status TEXT NOT NULL DEFAULT 'new',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "JobApplication",
      sql: `CREATE TABLE IF NOT EXISTS "JobApplication" (
        id TEXT PRIMARY KEY,
        "jobId" TEXT NOT NULL,
        "positionType" TEXT,
        "fullName" TEXT NOT NULL,
        email TEXT NOT NULL,
        mobile TEXT,
        "filesFolder" TEXT,
        "filesManifest" TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "SeoAudit",
      sql: `CREATE TABLE IF NOT EXISTS "SeoAudit" (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        score INTEGER NOT NULL DEFAULT 0,
        "titleLen" INTEGER NOT NULL DEFAULT 0,
        "descLen" INTEGER NOT NULL DEFAULT 0,
        "h1Count" INTEGER NOT NULL DEFAULT 0,
        "hasCanonical" BOOLEAN NOT NULL DEFAULT false,
        "hasOg" BOOLEAN NOT NULL DEFAULT false,
        "hasJsonLd" BOOLEAN NOT NULL DEFAULT false,
        "hasSitemap" BOOLEAN NOT NULL DEFAULT false,
        "hasRobots" BOOLEAN NOT NULL DEFAULT false,
        issues TEXT,
        notes TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "MediaAsset",
      sql: `CREATE TABLE IF NOT EXISTS "MediaAsset" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        mime TEXT NOT NULL,
        size INTEGER NOT NULL DEFAULT 0,
        alt TEXT,
        folder TEXT NOT NULL DEFAULT 'uploads',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "Redirect",
      sql: `CREATE TABLE IF NOT EXISTS "Redirect" (
        id TEXT PRIMARY KEY,
        "from" TEXT NOT NULL UNIQUE,
        "to" TEXT NOT NULL,
        status INTEGER NOT NULL DEFAULT 301,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "SiteSetting",
      sql: `CREATE TABLE IF NOT EXISTS "SiteSetting" (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "ActivityLog",
      sql: `CREATE TABLE IF NOT EXISTS "ActivityLog" (
        id TEXT PRIMARY KEY,
        action TEXT NOT NULL,
        entity TEXT NOT NULL,
        "entityId" TEXT,
        summary TEXT NOT NULL,
        actor TEXT NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "Lead",
      sql: `CREATE TABLE IF NOT EXISTS "Lead" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        source TEXT NOT NULL DEFAULT 'website',
        stage TEXT NOT NULL DEFAULT 'new',
        value TEXT,
        notes TEXT,
        tags TEXT,
        owner TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "EmailTemplate",
      sql: `CREATE TABLE IF NOT EXISTS "EmailTemplate" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'transactional',
        status TEXT NOT NULL DEFAULT 'draft',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "Experiment",
      sql: `CREATE TABLE IF NOT EXISTS "Experiment" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        hypothesis TEXT NOT NULL,
        page TEXT NOT NULL,
        "variantA" TEXT NOT NULL,
        "variantB" TEXT NOT NULL,
        metric TEXT NOT NULL DEFAULT 'conversion',
        status TEXT NOT NULL DEFAULT 'draft',
        "visitorsA" INTEGER NOT NULL DEFAULT 0,
        "visitorsB" INTEGER NOT NULL DEFAULT 0,
        "convA" INTEGER NOT NULL DEFAULT 0,
        "convB" INTEGER NOT NULL DEFAULT 0,
        winner TEXT,
        "startDate" TIMESTAMP(3),
        "endDate" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "ThemeVariable",
      sql: `CREATE TABLE IF NOT EXISTS "ThemeVariable" (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'color',
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "TypographyPreset",
      sql: `CREATE TABLE IF NOT EXISTS "TypographyPreset" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        "fontFamily" TEXT NOT NULL,
        "headingScale" TEXT NOT NULL,
        "bodySize" TEXT NOT NULL,
        "lineHeight" TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "SecurityLog",
      sql: `CREATE TABLE IF NOT EXISTS "SecurityLog" (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        ip TEXT,
        email TEXT,
        detail TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "SiteVisit",
      sql: `CREATE TABLE IF NOT EXISTS "SiteVisit" (
        id TEXT PRIMARY KEY,
        path TEXT NOT NULL,
        referrer TEXT,
        country TEXT,
        device TEXT NOT NULL DEFAULT 'desktop',
        browser TEXT,
        "sessionId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "TeamMember",
      sql: `CREATE TABLE IF NOT EXISTS "TeamMember" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        department TEXT NOT NULL,
        bio TEXT,
        photo TEXT,
        linkedin TEXT,
        twitter TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "Job",
      sql: `CREATE TABLE IF NOT EXISTS "Job" (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'Full-time',
        description TEXT NOT NULL,
        requirements TEXT,
        salary TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "Keyword",
      sql: `CREATE TABLE IF NOT EXISTS "Keyword" (
        id TEXT PRIMARY KEY,
        keyword TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL DEFAULT 'commercial',
        volume INTEGER NOT NULL DEFAULT 0,
        difficulty INTEGER NOT NULL DEFAULT 0,
        cpc TEXT,
        intent TEXT,
        status TEXT NOT NULL DEFAULT 'tracking',
        "currentRank" INTEGER,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "Ranking",
      sql: `CREATE TABLE IF NOT EXISTS "Ranking" (
        id TEXT PRIMARY KEY,
        keyword TEXT NOT NULL,
        position INTEGER NOT NULL,
        engine TEXT NOT NULL DEFAULT 'google',
        "serpFeature" TEXT,
        url TEXT,
        date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "AiMention",
      sql: `CREATE TABLE IF NOT EXISTS "AiMention" (
        id TEXT PRIMARY KEY,
        prompt TEXT NOT NULL,
        platform TEXT NOT NULL,
        mentioned BOOLEAN NOT NULL DEFAULT false,
        sentiment TEXT,
        citation TEXT,
        response TEXT,
        date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "Backlink",
      sql: `CREATE TABLE IF NOT EXISTS "Backlink" (
        id TEXT PRIMARY KEY,
        "sourceUrl" TEXT NOT NULL,
        "targetUrl" TEXT NOT NULL,
        "anchorText" TEXT,
        "domainRating" INTEGER NOT NULL DEFAULT 0,
        dofollow BOOLEAN NOT NULL DEFAULT true,
        status TEXT NOT NULL DEFAULT 'active',
        "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "ContentBrief",
      sql: `CREATE TABLE IF NOT EXISTS "ContentBrief" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        keyword TEXT NOT NULL,
        headings TEXT,
        faqs TEXT,
        entities TEXT,
        "wordCount" INTEGER NOT NULL DEFAULT 0,
        "seoScore" INTEGER NOT NULL DEFAULT 0,
        "aeoScore" INTEGER NOT NULL DEFAULT 0,
        "geoScore" INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'draft',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )`,
    },
    {
      name: "SeoIssue",
      sql: `CREATE TABLE IF NOT EXISTS "SeoIssue" (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        severity TEXT NOT NULL DEFAULT 'warning',
        url TEXT NOT NULL,
        detail TEXT NOT NULL,
        "fixSuggestion" TEXT,
        status TEXT NOT NULL DEFAULT 'open',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "SeoReport",
      sql: `CREATE TABLE IF NOT EXISTS "SeoReport" (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        score INTEGER NOT NULL DEFAULT 0,
        summary TEXT,
        data TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: "ClientLogo",
      sql: `CREATE TABLE IF NOT EXISTS "ClientLogo" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT NOT NULL,
        website TEXT,
        category TEXT NOT NULL DEFAULT 'general',
        "order" INTEGER NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    },
  ];

  for (const { name, sql } of statements) {
    try {
      await db.$executeRawUnsafe(sql);
      results.push(`${name}: created/exists`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push(`${name}: FAILED — ${msg.substring(0, 120)}`);
    }
  }

  return results;
}
