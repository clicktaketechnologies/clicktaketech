import { db } from "../src/lib/db";
import { SERVICE_CATEGORIES, BLOG_POSTS, PRICING_TIERS } from "../src/lib/site-data";
import { getServiceContent } from "../src/lib/service-content";

async function main() {
  console.log("Seeding CMS tables...");

  // 1. Admin user (email/password — change password after first login)
  const existing = await db.user.findUnique({ where: { email: "admin@clicktaketech.com" } });
  if (!existing) {
    await db.user.create({
      data: {
        email: "admin@clicktaketech.com",
        name: "ClickTake Admin",
        // NOTE: demo password only — replace with a hashed password in production.
        password: "clicktake-admin-2026",
        role: "admin",
      },
    });
    console.log("  ✓ admin user created (admin@clicktaketech.com / clicktake-admin-2026)");
  }

  // 2. Pages — top-level pages + 24 service detail pages
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
    await db.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        hero: p.hero,
        status: "published",
      },
    });
  }
  console.log(`  ✓ ${topLevelPages.length} top-level pages`);

  // 24 service detail pages
  let serviceCount = 0;
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      const content = getServiceContent(s.slug);
      await db.page.upsert({
        where: { slug: s.slug },
        update: {},
        create: {
          slug: s.slug,
          title: s.title,
          category: cat.label,
          hero: s.title,
          overview: content?.overview ?? s.desc,
          body: s.desc,
          metaTitle: content?.metaTitle ?? s.title,
          metaDescription: content?.metaDescription ?? s.desc,
          keywords: [
            content?.primaryKeyword,
            ...(content?.secondaryKeywords ?? []),
          ].filter(Boolean).join(", "),
          status: "published",
        },
      });
      serviceCount++;
    }
  }
  console.log(`  ✓ ${serviceCount} service pages`);

  // 3. Blog posts
  for (const b of BLOG_POSTS) {
    await db.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        slug: b.slug,
        title: b.title,
        category: b.category,
        excerpt: b.excerpt,
        body: b.excerpt,
        status: "published",
        readTime: b.readTime,
      },
    });
  }
  console.log(`  ✓ ${BLOG_POSTS.length} blog posts`);

  // 4. Pricing tiers
  for (const t of PRICING_TIERS) {
    await db.pricingTier.upsert({
      where: { name: t.name },
      update: {},
      create: {
        name: t.name,
        tagline: t.tagline,
        audience: t.audience,
        price: t.price,
        cadence: t.cadence,
        popular: t.popular ?? false,
        features: t.features.join("\n"),
        notIncluded: t.notIncluded.join("\n"),
        cta: t.cta,
        status: "published",
      },
    });
  }
  console.log(`  ✓ ${PRICING_TIERS.length} pricing tiers`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
