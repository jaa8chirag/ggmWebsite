import { absoluteUrl, SITE_URL } from "@/lib/site";

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
}

export function organizationSchema(company: CompanyInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo/ggm-mark.png"),
    image: absoluteUrl("/logo/ggm-mark.png"),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.addressLine1}, ${company.addressLine2}`,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110016",
      addressCountry: "IN",
    },
  };
}

export function websiteSchema(company: Pick<CompanyInfo, "name">) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function localBusinessSchema(company: CompanyInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: company.name,
    image: absoluteUrl("/logo/ggm-mark.png"),
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.addressLine1}, ${company.addressLine2}`,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110016",
      addressCountry: "IN",
    },
    areaServed: "IN",
    sameAs: [] as string[],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  allServiceTitles,
}: {
  name: string;
  description: string;
  path: string;
  allServiceTitles: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IN",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GGM Technologies Services",
      itemListElement: allServiceTitles.map((title) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: title },
      })),
    },
  };
}

export function serviceLocationSchema({
  serviceName,
  locationName,
  description,
  path,
}: {
  serviceName: string;
  locationName: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} in ${locationName}`,
    description,
    url: absoluteUrl(path),
    serviceType: serviceName,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "City",
      name: locationName,
    },
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: datePublished,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: absoluteUrl(`${path}/opengraph-image`),
    mainEntityOfPage: absoluteUrl(path),
  };
}
