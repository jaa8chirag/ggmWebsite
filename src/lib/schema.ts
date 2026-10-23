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
    legalName: "GGM Technologies",
    url: SITE_URL,
    logo: absoluteUrl("/logo/ggm-logo.png"),
    image: absoluteUrl("/logo/ggm-logo.png"),
    email: company.email,
    telephone: company.phone,
    taxID: "07AABCU9603R1ZM",
    founder: {
      "@type": "Person",
      name: "Guru Govind Mahesh",
      jobTitle: "Founder & Chief Executive Officer",
      url: `${SITE_URL}/about-ceo`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.addressLine1}, ${company.addressLine2}`,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110016",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "customer service",
      areaServed: ["IN", "AE", "US", "GB"],
      availableLanguage: ["English", "Hindi"],
    },
    knowsAbout: [
      "Search Engine Optimization",
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Web Development",
      "Next.js Development",
      "E-Commerce Solutions",
      "Shopify Website Development",
      "B2B Lead Generation",
      "Mobile Application Development",
    ],
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
    taxID: "07AABCU9603R1ZM",
    founder: {
      "@type": "Person",
      name: "Guru Govind Mahesh",
      jobTitle: "Founder & Chief Executive Officer",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.addressLine1}, ${company.addressLine2}`,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110016",
      addressCountry: "IN",
    },
    areaServed: ["IN", "AE", "US", "GB"],
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
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
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
    "@type": "ProfessionalService",
    name: `${serviceName} in ${locationName}`,
    description,
    url: absoluteUrl(path),
    telephone: "+91 90026 00880",
    email: "varanasi@ggmtechnologies.com",
    priceRange: "₹₹",
    image: absoluteUrl("/logo/ggm-logo.png"),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "City",
      name: locationName,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Packages in ${locationName}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Standard ${serviceName}`,
            description: `Full-cycle ${serviceName} tailored for businesses in ${locationName}.`,
          },
          priceCurrency: "INR",
          price: "9999",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Enterprise ${serviceName}`,
            description: `Scalable, high-performance ${serviceName} with dedicated management in ${locationName}.`,
          },
          priceCurrency: "INR",
          price: "24999",
        },
      ],
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
