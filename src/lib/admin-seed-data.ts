/**
 * Seed-data fallback for admin API endpoints.
 * ============================================
 * When the Supabase DB is unreachable (IPv6 direct connection, no pooler),
 * admin GET endpoints return empty arrays via safeQuery. This module
 * provides the SAME data the seed scripts would insert, in the exact
 * DB-model shape, so the admin panel can display real content even when
 * the DB is down.
 *
 * This is READ-ONLY fallback — edits won't persist until the DB is fixed.
 * But it makes the admin panel functional for viewing/browsing instead
 * of showing a blank dashboard.
 */
import {
  SERVICE_CATEGORIES,
  BLOG_POSTS,
  PRICING_TIERS,
  JOBS,
} from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";
import { DEFAULT_SETTINGS } from "@/lib/admin-activity";

type Page = {
  id: string; slug: string; title: string; category: string; status: string;
  hero: string | null; overview: string | null; body: string | null;
  metaTitle: string | null; metaDescription: string | null; keywords: string | null;
  createdAt: Date; updatedAt: Date;
};

type BlogPost = {
  id: string; slug: string; title: string; category: string; excerpt: string;
  body: string | null; status: string; readTime: string;
  metaTitle: string | null; metaDescription: string | null; keywords: string | null;
  publishedAt: Date; createdAt: Date; updatedAt: Date;
};

type PricingTier = {
  id: string; name: string; tagline: string; audience: string; price: string;
  cadence: string; popular: boolean; features: string; notIncluded: string | null;
  cta: string; status: string; createdAt: Date; updatedAt: Date;
};

type TeamMember = {
  id: string; name: string; role: string; department: string; bio: string | null;
  photo: string | null; linkedin: string | null; twitter: string | null;
  order: number; active: boolean; createdAt: Date; updatedAt: Date;
};

type Job = {
  id: string; slug: string; title: string; department: string; location: string;
  type: string; description: string; requirements: string | null; salary: string | null;
  active: boolean; createdAt: Date; updatedAt: Date;
};

type ClientLogo = {
  id: string; name: string; logo: string; website: string | null;
  category: string; order: number; active: boolean; createdAt: Date;
};

type SiteSetting = {
  id: string; key: string; value: string; category: string; updatedAt: Date;
};

type User = {
  id: string; email: string; name: string | null; role: string;
  createdAt: Date;
};

const NOW = new Date();

export function getSeedPages(): Page[] {
  const pages: Page[] = [];
  const topLevel = [
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
  for (const p of topLevel) {
    pages.push({
      id: `seed-page-${p.slug}`, slug: p.slug, title: p.title, category: p.category,
      status: "published", hero: p.hero, overview: null, body: null,
      metaTitle: null, metaDescription: null, keywords: null,
      createdAt: NOW, updatedAt: NOW,
    });
  }
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      const content = getServiceContent(s.slug);
      pages.push({
        id: `seed-page-${s.slug}`, slug: s.slug, title: s.title, category: cat.label,
        status: "published", hero: s.title,
        overview: content?.overview ?? s.desc, body: s.desc,
        metaTitle: content?.metaTitle ?? s.title,
        metaDescription: content?.metaDescription ?? s.desc,
        keywords: [content?.primaryKeyword, ...(content?.secondaryKeywords ?? [])].filter(Boolean).join(", "),
        createdAt: NOW, updatedAt: NOW,
      });
    }
  }
  return pages;
}

export function getSeedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.map((b) => ({
    id: `seed-blog-${b.slug}`, slug: b.slug, title: b.title, category: b.category,
    excerpt: b.excerpt, body: b.excerpt, status: "published", readTime: b.readTime,
    metaTitle: null, metaDescription: null, keywords: null,
    publishedAt: NOW, createdAt: NOW, updatedAt: NOW,
  }));
}

export function getSeedPricingTiers(): PricingTier[] {
  return PRICING_TIERS.map((t) => ({
    id: `seed-tier-${t.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`,
    name: t.name, tagline: t.tagline, audience: t.audience, price: t.price,
    cadence: t.cadence, popular: t.popular ?? false,
    features: t.features.join("\n"), notIncluded: t.notIncluded.join("\n"),
    cta: t.cta, status: "published", createdAt: NOW, updatedAt: NOW,
  }));
}

export function getSeedTeamMembers(): TeamMember[] {
  const members = [
    { id: "sarah-mitchell", name: "Sarah Mitchell", role: "Founder & CEO", department: "Leadership", bio: "Founded ClickTake in 2019. 15+ years in software engineering and AI.", order: 1 },
    { id: "james-o-connor", name: "James O'Connor", role: "CTO", department: "Leadership", bio: "Leads the engineering practice. Ex-AWS, ex-fintech.", order: 2 },
    { id: "aisha-khan", name: "Aisha Khan", role: "Head of Growth", department: "Marketing", bio: "Drives SEO, paid, and content strategy across all clients.", order: 3 },
    { id: "aisha-al-mansoori", name: "Aisha Al-Mansoori", role: "MENA Director", department: "Operations", bio: "Heads the Dubai office and MENA client relationships.", order: 4 },
    { id: "david-chen", name: "David Chen", role: "Lead AI Engineer", department: "Development", bio: "Ships multi-agent systems and RAG pipelines to production.", order: 5 },
    { id: "maria-santos", name: "Maria Santos", role: "Creative Director", department: "Creative", bio: "Leads brand identity and web design across all engagements.", order: 6 },
  ];
  return members.map((m) => ({
    ...m, photo: null, linkedin: null, twitter: null, active: true,
    createdAt: NOW, updatedAt: NOW,
  }));
}

export function getSeedJobs(): Job[] {
  return JOBS.map((j) => ({
    id: `seed-job-${j.slug}`, slug: j.slug, title: j.title, department: j.department,
    location: j.location, type: j.type, description: j.desc,
    requirements: null, salary: null, active: true, createdAt: NOW, updatedAt: NOW,
  }));
}

export function getSeedClients(): ClientLogo[] {
  const clients = [
    { name: "DibNow", logo: "", website: "https://dibnow.com", category: "saas", order: 1 },
    { name: "Panel — Employee Management", logo: "", website: "", category: "saas", order: 2 },
    { name: "LogiTrack", logo: "", website: "", category: "saas", order: 3 },
    { name: "ClickOpticX", logo: "", website: "", category: "saas", order: 4 },
    { name: "Mearns Gadget Repair", logo: "", website: "", category: "repair", order: 5 },
    { name: "Gadget Doctor LS", logo: "", website: "", category: "repair", order: 6 },
    { name: "Academy Portal", logo: "", website: "", category: "education", order: 7 },
    { name: "LearnHub", logo: "", website: "", category: "education", order: 8 },
  ];
  return clients.map((c) => ({
    id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ...c, active: true, createdAt: NOW,
  }));
}

export function getSeedSettings(): SiteSetting[] {
  return DEFAULT_SETTINGS.map((s) => ({
    id: `seed-setting-${s.key.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`,
    key: s.key, value: s.value, category: s.category, updatedAt: NOW,
  }));
}

export function getSeedUsers(): User[] {
  return [{
    id: "seed-admin",
    email: process.env.SUPERADMIN_EMAIL || "admin@clicktaketech.com",
    name: "ClickTake Admin",
    role: "admin",
    createdAt: NOW,
  }];
}

/**
 * Check if the DB is unreachable (used to decide whether to show a
 * "read-only mode" banner in the admin panel).
 */
export function isDbUnreachableError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /Can't reach database server|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|getaddrinfo|connection refused|connection timed out|tenant\/user.*not found/i.test(msg);
}
