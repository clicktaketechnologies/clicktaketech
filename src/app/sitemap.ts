import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES, CITIES } from "@/lib/site-data";

const BASE_URL = "https://clicktaketech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level pages
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/cities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Service pages (4 categories + 24 services)
  for (const cat of SERVICE_CATEGORIES) {
    pages.push({
      url: `${BASE_URL}/services/${cat.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const s of cat.services) {
      pages.push({
        url: `${BASE_URL}/services/${cat.id}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // City pages (13 cities × service categories)
  for (const city of CITIES) {
    pages.push({
      url: `${BASE_URL}/cities/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return pages;
}
