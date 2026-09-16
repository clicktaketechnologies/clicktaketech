"use client";

import { getServiceContent } from "@/lib/service-content";
import {
  SERVICE_CATEGORIES,
  type NavView,
} from "@/lib/site-data";

const BASE_URL = "https://clicktaketech.com";

type Props = {
  slug: string;
};

function findServiceMeta(slug: string) {
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((s) => s.slug === slug);
    if (service) return { category, service };
  }
  return undefined;
}

/**
 * Injects FAQPage + HowTo + Service (with aggregateRating) JSON-LD for a
 * given service-detail page. Targets Google's rich-result eligibility for
 * featured snippets, "People also ask", and service search results.
 */
export function ServiceSeoJsonLd({ slug }: Props) {
  const found = findServiceMeta(slug);
  const content = getServiceContent(slug);
  if (!found || !content) return null;

  const { category, service } = found;
  const url = `${BASE_URL}/services/${category.id}/${slug}`;

  // FAQPage schema — combines service-specific FAQs + People Also Ask.
  const allFaqs = [
    ...content.faqs,
    ...content.peopleAlsoAsk,
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  // HowTo schema — the tailored 4-step delivery process.
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ClickTake delivers ${service.title}`,
    description: content.overview,
    totalTime: "P6W",
    step: content.process.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.desc,
    })),
  };

  // Service schema with aggregateRating — E-A-T signal.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: category.label,
    description: content.definition,
    url,
    category: category.label,
    provider: {
      "@type": "Organization",
      name: "ClickTake Technologies",
      url: BASE_URL,
      foundingDate: "2019",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Birmingham",
        addressCountry: "GB",
      },
    },
    areaServed: [
      { "@type": "Place", name: "United Kingdom" },
      { "@type": "Place", name: "United States" },
      { "@type": "Place", name: "United Arab Emirates" },
      { "@type": "Place", name: "Pakistan" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "80",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "1500",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

/** Type-only re-export so callers can reference the prop shape. */
export type { NavView };
