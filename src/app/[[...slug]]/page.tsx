import type { Metadata } from "next";
import SpaApp from "@/components/site/spa-app";
import { getServiceContent } from "@/lib/service-content";
import { SERVICE_CATEGORIES, CITIES } from "@/lib/site-data";

const BASE_URL = "https://clicktaketech.com";

/**
 * Per-path metadata for SEO.
 * This is the CRITICAL fix — previously all 53 pages shared the same
 * title, description, canonical (all → homepage), and OG tags because
 * the catch-all was a client component (can't export metadata).
 *
 * Now it's a server component that generates UNIQUE metadata per path:
 * - Self-referencing canonical (not all → homepage)
 * - Unique title per page
 * - Unique meta description per page
 * - Unique OG tags per page
 */

const PAGE_META: Record<string, { title: string; description: string }> = {
  "": {
    title: "ClickTake Technologies — AI-Native Software Engineering & Digital Agency",
    description: "ClickTake Technologies ships production-grade software, autonomous AI agents, cloud architecture, digital marketing & creative services. 24 services across 4 practices — serving 13 cities in 4 continents. Trusted by 150+ teams with 99.9% uptime.",
  },
  services: {
    title: "24 Services across 4 Practices | ClickTake Technologies",
    description: "Explore 24 expert services across Digital Marketing (PPC, SEO, content, CRO, social), Web & Software (Next.js, SaaS, WordPress, ecommerce), AI & Automation (LLM, chatbots, agents, CV/NLP), and Creative & Brand. One senior team. One delivery engine.",
  },
  solutions: {
    title: "Solutions by Audience & Industry | ClickTake Technologies",
    description: "Purpose-built solutions for SaaS startups, ecommerce brands, repair shops, education providers, and enterprises. Multi-tenant SaaS, headless commerce, local SEO, and AI automation tailored to your industry.",
  },
  "case-studies": {
    title: "Case Studies — Real Engagements, Real Metrics | ClickTake",
    description: "Real client engagements with real numbers — 120+ deployments, 10M+ requests/day, 99.9% uptime, 25-60% CVR lift. See how ClickTake ships software that works and AI that earns its keep.",
  },
  portfolio: {
    title: "Portfolio — 12 Live Client Sites | ClickTake Technologies",
    description: "Browse 12+ live client sites built by ClickTake — SaaS platforms, ecommerce stores, repair-shop commerce, education portals, and AI-powered dashboards shipped to production.",
  },
  blog: {
    title: "Blog — SEO · Web Dev · AI · Marketing | ClickTake Technologies",
    description: "Field notes from the ClickTake engineering team — technical SEO guides, Next.js architecture, AI agent development, LLM fine-tuning, PPC strategy, and digital marketing playbooks.",
  },
  pricing: {
    title: "Pricing — Starter · Growth · Scale · Custom | ClickTake Technologies",
    description: "Transparent pricing for ClickTake services — Starter from £1,500/mo, Growth from £4,500/mo, Scale from £9,500/mo, Custom for enterprise. No hidden fees, no bloated retainers.",
  },
  about: {
    title: "About — AI-Native Digital Agency Since 2019 | ClickTake",
    description: "ClickTake Technologies is an AI-native software engineering firm founded in 2019. 28 people across 4 offices (Birmingham, London, Austin, Dubai, Multan). 120+ deployments. SOC 2, GDPR, 99.9% SLA.",
  },
  team: {
    title: "Our Team — 28 People Across 4 Offices | ClickTake",
    description: "Meet the senior engineers, AI specialists, designers, and marketers behind ClickTake. 8+ years average experience. 18-hour workday coverage across UK, USA, UAE, and Pakistan.",
  },
  careers: {
    title: "Careers — Join ClickTake Technologies",
    description: "Open positions at ClickTake — Senior Next.js Engineer, AI/ML Engineer, SEO Specialist, Graphic Designer, Frontend Engineer Intern. Remote + on-site across 4 offices.",
  },
  cities: {
    title: "Cities We Serve — 13 Cities, 4 Countries | ClickTake",
    description: "ClickTake serves 13 cities across the UK (Birmingham, London, Manchester, Leeds), USA (Austin, New York, San Francisco), UAE (Dubai, Abu Dhabi), and Pakistan (Multan, Lahore, Karachi, Islamabad). Local presence, global delivery.",
  },
  connect: {
    title: "Connect — Direct Contact & Social | ClickTake Technologies",
    description: "Connect with ClickTake Technologies — email, phone, WhatsApp, and 8 social channels. NDA available. Response within 4 business hours.",
  },
  contact: {
    title: "Contact — Free 30-min Consult | ClickTake Technologies",
    description: "Book a free 30-minute scoping call with a senior ClickTake engineer. Tell us what you're building — we'll tell you if we can ship it, how long, and how much. No sales calls.",
  },
  "legal-privacy": {
    title: "Privacy Policy | ClickTake Technologies",
    description: "ClickTake Technologies privacy policy — how we collect, use, and protect your personal data. GDPR and CCPA compliant.",
  },
  "legal-terms": {
    title: "Terms of Service | ClickTake Technologies",
    description: "ClickTake Technologies terms of service — engagement terms, IP ownership, warranties, liability, and cancellation.",
  },
  "legal-cookies": {
    title: "Cookie Policy | ClickTake Technologies",
    description: "ClickTake Technologies cookie policy — what cookies we use, why, and how to manage your preferences.",
  },
};

function getPathFromSlug(slug?: string[]): string {
  if (!slug || slug.length === 0) return "";
  return slug.join("/").toLowerCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getPathFromSlug(slug);
  const pageUrl = path ? `${BASE_URL}/${path}` : BASE_URL;

  let title: string;
  let description: string;

  // Check top-level pages
  if (path in PAGE_META) {
    ({ title, description } = PAGE_META[path]);
  } else {
    // Try service detail page
    const content = getServiceContent(path);
    if (content) {
      title = content.metaTitle;
      description = content.metaDescription;
    } else if (CITIES.some((c) => c.slug === path)) {
      // City page
      const city = CITIES.find((c) => c.slug === path)!;
      title = `${city.name} Software & AI Agency | ClickTake Technologies`;
      description = `${city.desc} ClickTake Technologies — custom software, AI automation, web design, SEO, and digital marketing services in ${city.name}, ${city.country}.`;
    } else {
      // Fallback
      title = "ClickTake Technologies — AI-Native Software Engineering & Digital Agency";
      description = PAGE_META[""].description;
    }
  }

  return {
    title: title === PAGE_META[""].title ? title : { absolute: title },
    description,
    alternates: {
      canonical: pageUrl, // SELF-REFERENCING — not all → homepage!
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "ClickTake Technologies",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/logo-white.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo-white.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

// Per-path JSON-LD structured data (Fix 3)
function StructuredData({ slug }: { slug?: string[] }) {
  const path = getPathFromSlug(slug);
  const content = getServiceContent(path);

  const schemas: Record<string, unknown>[] = [];

  // Service pages get Service schema
  if (content) {
    const cat = SERVICE_CATEGORIES.find((c) => c.services.some((s) => s.slug === path));
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: content.metaTitle,
      description: content.metaDescription,
      url: `${BASE_URL}/${path}`,
      provider: {
        "@type": "Organization",
        name: "ClickTake Technologies",
        url: BASE_URL,
      },
      serviceType: cat?.label || "Professional Service",
      areaServed: ["UK", "USA", "UAE", "Pakistan"],
    });
  }

  // BreadcrumbList for all non-homepage pages
  if (path) {
    const crumbs = [{ name: "Home", url: BASE_URL }];
    if (content) {
      const cat = SERVICE_CATEGORIES.find((c) => c.services.some((s) => s.slug === path));
      if (cat) crumbs.push({ name: cat.label, url: `${BASE_URL}/services` });
      crumbs.push({ name: content.metaTitle, url: `${BASE_URL}/${path}` });
    } else {
      crumbs.push({ name: path, url: `${BASE_URL}/${path}` });
    }
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return (
    <>
      <StructuredDataWrapper params={params} />
      <SpaApp />
    </>
  );
}

// Wrapper to await params in a server component
async function StructuredDataWrapper({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <StructuredData slug={slug} />;
}
