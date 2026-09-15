import { SERVICE_CATEGORIES, OFFICES } from "@/lib/site-data";

const BASE_URL = "https://clicktaketech.com";

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ClickTake Technologies",
    url: BASE_URL,
    description:
      "AI-native software engineering firm shipping production-grade autonomous agents, multi-tenant SaaS platforms and cloud architecture for enterprises across 4 continents.",
    foundingDate: "2019",
    email: "info@clicktaketech.com",
    telephone: "+44-7391-653377",
    slogan: "Engineering Tomorrow's Intelligence, Today.",
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
    sameAs: [
      "https://www.facebook.com/clicktaketechnologies/",
      "https://www.instagram.com/clicktaketechologiesuk/",
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
      areaServed: "Global",
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
      <WebSiteJsonLd />
      <ServiceJsonLd />
      <BreadcrumbJsonLd />
    </>
  );
}
