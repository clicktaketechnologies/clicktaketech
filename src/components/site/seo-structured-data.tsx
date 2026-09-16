import { SERVICE_CATEGORIES, OFFICES, CITIES, BRAND_TAGLINE } from "@/lib/site-data";

const BASE_URL = "https://clicktaketech.com";

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ClickTake Technologies",
    url: BASE_URL,
    description:
      "AI-native software engineering firm shipping production-grade autonomous agents, multi-tenant SaaS platforms, cloud architecture, digital marketing and creative services for enterprises across 4 continents.",
    foundingDate: "2019",
    founders: [
      {
        "@type": "Person",
        name: "ClickTake Technologies Ltd.",
      },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 28,
    },
    knowsAbout: [
      "Custom software development",
      "AI agent development",
      "Large language model solutions",
      "Search engine optimization",
      "Pay-per-click advertising",
      "Web design services",
      "WordPress web design",
      "Ecommerce web design",
      "Cloud DevOps",
      "SaaS platform engineering",
      "Graphic design",
      "B2B video production",
    ],
    email: "info@clicktaketech.com",
    telephone: "+44-7391-653377",
    slogan: BRAND_TAGLINE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Flat 312 Kitts Green Road",
      addressLocality: "Birmingham",
      postalCode: "B33 9SB",
      addressCountry: "GB",
    },
    areaServed: OFFICES.map((o) => ({
      "@type": "Place",
      name: `${o.city}, ${o.country}`,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@clicktaketech.com",
        telephone: "+44-7391-653377",
        availableLanguage: ["English"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "80",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/clicktaketechnologies/",
      "https://www.instagram.com/clicktaketechologiesuk/",
      "https://www.linkedin.com/company/click-take-technologies/",
      "https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw",
      "https://www.tumblr.com/clicktaketechnologies",
      "https://www.tiktok.com/@clicktaketechnologiesuk",
      "https://uk.pinterest.com/clicktaketechnologies/",
      "https://www.threads.com/@clicktaketech",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/**
 * LocalBusiness schema — critical for local SEO ranking.
 * Includes geo coordinates, opening hours, price range, and the full
 * list of 13 cities served as areaServed so Google can match "{service}
 * near me" / "{service} in {city}" queries to ClickTake.
 */
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}#localbusiness`,
    name: "ClickTake Technologies",
    alternateName: "ClickTake",
    description:
      "AI-native digital agency offering web design services, SEO services, AI automation, custom software development, SaaS platform engineering and creative branding across the UK, USA, UAE and Pakistan.",
    url: BASE_URL,
    telephone: "+44-7391-653377",
    email: "info@clicktaketech.com",
    image: `${BASE_URL}/logo-white.png`,
    logo: `${BASE_URL}/logo-dark.png`,
    priceRange: "£££",
    slogan: BRAND_TAGLINE,
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Flat 312 Kitts Green Road",
      addressLocality: "Birmingham",
      addressRegion: "West Midlands",
      postalCode: "B33 9SB",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4678,
      longitude: -1.7894,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      addressRegion: c.country,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ClickTake Services",
      itemListElement: SERVICE_CATEGORIES.map((cat) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cat.label,
          category: cat.label,
        },
      })),
    },
    sameAs: [
      "https://www.facebook.com/clicktaketechnologies/",
      "https://www.instagram.com/clicktaketechologiesuk/",
      "https://www.linkedin.com/company/click-take-technologies/",
      "https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw",
      "https://www.tumblr.com/clicktaketechnologies",
      "https://www.tiktok.com/@clicktaketechnologiesuk",
      "https://uk.pinterest.com/clicktaketechnologies/",
      "https://www.threads.com/@clicktaketech",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function ServiceJsonLd() {
  const services = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((s) => ({
      "@type": "Service",
      name: s.title,
      serviceType: cat.label,
      description: s.desc,
      provider: {
        "@type": "Organization",
        name: "ClickTake Technologies",
        url: BASE_URL,
      },
      areaServed: CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
      })),
    }))
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ClickTake Services",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: s,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClickTake Technologies",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function BreadcrumbJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Solutions", item: `${BASE_URL}/solutions` },
      { "@type": "ListItem", position: 4, name: "About", item: `${BASE_URL}/about` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${BASE_URL}/contact` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SeoStructuredData() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <ServiceJsonLd />
      <BreadcrumbJsonLd />
    </>
  );
}
