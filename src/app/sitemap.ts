import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES, CITIES } from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";

const BASE_URL = "https://clicktaketech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level pages — all return 200 via the catch-all route
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/cities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/connect`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Legal pages — single-segment URLs (not nested)
    { url: `${BASE_URL}/legal-privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal-terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Service detail pages — each service has its own SEO-optimized page
  // These are single-segment URLs (e.g., /ppc-paid-ads, /seo-services)
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      const content = getServiceContent(s.slug);
      pages.push({
        url: `${BASE_URL}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // City landing pages — single-segment (e.g., /birmingham, /london)
  for (const city of CITIES) {
    pages.push({
      url: `${BASE_URL}/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return pages;
}
