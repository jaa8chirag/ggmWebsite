import { query, queryOne, parseJson } from "@/lib/db";
import {
  DB_SERVICES,
  DB_SETTINGS,
  DB_PRODUCTS,
  DB_POSTS,
  DB_CASE_STUDIES,
  DB_TESTIMONIALS,
  DB_LEGAL_PAGES,
} from "@/data/dbSeedData";
import type {
  Service,
  Post,
  CaseStudy,
  Product,
  Testimonial,
  SiteSettingsModel,
  ServiceLocationModel,
  BlogBlockModel,
  LegalPage,
  CertificateDocument,
} from "@/types";

export const DEFAULT_SERVICES = DB_SERVICES;

export async function getServices(): Promise<Service[]> {
  const services = await query<any>("SELECT * FROM `Service` ORDER BY `index` ASC");
  if (!services || services.length === 0) return DB_SERVICES;

  const faqs = await query<any>("SELECT * FROM `ServiceFaq` ORDER BY `order` ASC");
  const faqsByServiceId = new Map<string, any[]>();
  for (const faq of faqs || []) {
    if (!faqsByServiceId.has(faq.serviceId)) {
      faqsByServiceId.set(faq.serviceId, []);
    }
    faqsByServiceId.get(faq.serviceId)!.push({
      question: faq.question,
      answer: faq.answer,
    });
  }

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    index: s.index,
    title: s.title,
    promise: s.promise,
    description: s.description,
    bullets: parseJson<string[]>(s.bullets, []),
    faqs: faqsByServiceId.get(s.id) || [],
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    ogImage: s.ogImage,
    canonicalOverride: s.canonicalOverride,
    noIndex: Boolean(s.noIndex),
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const s = await queryOne<any>("SELECT * FROM `Service` WHERE `slug` = ?", [slug]);
  if (!s) {
    return (
      DB_SERVICES.find(
        (srv) =>
          srv.slug === slug ||
          (slug === "website-development" && srv.slug === "web-development") ||
          (slug === "web-development" && srv.slug === "website-development")
      ) || null
    );
  }
  const faqs = await query<any>("SELECT * FROM `ServiceFaq` WHERE `serviceId` = ? ORDER BY `order` ASC", [s.id]);
  return {
    id: s.id,
    slug: s.slug,
    index: s.index,
    title: s.title,
    promise: s.promise,
    description: s.description,
    bullets: parseJson<string[]>(s.bullets, []),
    faqs: (faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    ogImage: s.ogImage,
    canonicalOverride: s.canonicalOverride,
    noIndex: Boolean(s.noIndex),
  };
}

export async function getServiceLocation(
  serviceSlug: string,
  locationSlug: string
): Promise<ServiceLocationModel | null> {
  const sl = await queryOne<any>(
    `SELECT sl.*, 
            s.id as s_id, s.slug as s_slug, s.index as s_index, s.title as s_title, 
            s.promise as s_promise, s.description as s_description, s.bullets as s_bullets, 
            s.metaTitle as s_metaTitle, s.metaDescription as s_metaDescription, 
            s.ogImage as s_ogImage, s.canonicalOverride as s_canonicalOverride, s.noIndex as s_noIndex,
            l.id as l_id, l.slug as l_slug, l.name as l_name, l.region as l_region, l.isActive as l_isActive
     FROM \`ServiceLocation\` sl
     JOIN \`Service\` s ON sl.serviceId = s.id
     JOIN \`Location\` l ON sl.locationId = l.id
     WHERE sl.published = 1 AND s.slug = ? AND l.slug = ?`,
    [serviceSlug, locationSlug]
  );
  if (!sl) return null;

  const faqs = await query<any>("SELECT * FROM `ServiceFaq` WHERE `serviceId` = ? ORDER BY `order` ASC", [sl.s_id]);

  return {
    id: sl.id,
    serviceId: sl.serviceId,
    locationId: sl.locationId,
    customIntro: sl.customIntro,
    published: Boolean(sl.published),
    metaTitle: sl.metaTitle,
    metaDescription: sl.metaDescription,
    ogImage: sl.ogImage,
    canonicalOverride: sl.canonicalOverride,
    noIndex: Boolean(sl.noIndex),
    service: {
      id: sl.s_id,
      slug: sl.s_slug,
      index: sl.s_index,
      title: sl.s_title,
      promise: sl.s_promise,
      description: sl.s_description,
      bullets: parseJson<string[]>(sl.s_bullets, []),
      faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
      metaTitle: sl.s_metaTitle,
      metaDescription: sl.s_metaDescription,
      ogImage: sl.s_ogImage,
      canonicalOverride: sl.s_canonicalOverride,
      noIndex: Boolean(sl.s_noIndex),
    },
    location: {
      id: sl.l_id,
      slug: sl.l_slug,
      name: sl.l_name,
      region: sl.l_region,
      isActive: Boolean(sl.l_isActive),
    },
  };
}

export async function getPublishedServiceLocations() {
  const rows = await query<any>(
    `SELECT sl.*, s.slug as serviceSlug, l.slug as locationSlug
     FROM \`ServiceLocation\` sl
     JOIN \`Service\` s ON sl.serviceId = s.id
     JOIN \`Location\` l ON sl.locationId = l.id
     WHERE sl.published = 1`
  );
  return rows.map((r) => ({
    id: r.id,
    published: Boolean(r.published),
    service: { slug: r.serviceSlug },
    location: { slug: r.locationSlug },
  }));
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await query<any>("SELECT * FROM `BlogPost` WHERE `status` = 'published' ORDER BY `date` DESC");
  if (!posts || posts.length === 0) {
    return DB_POSTS;
  }
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: new Date(p.date),
    category: p.category,
    status: p.status,
    blocks: [],
    faqs: [],
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    ogImage: p.ogImage,
    canonicalOverride: p.canonicalOverride,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await queryOne<any>("SELECT * FROM `BlogPost` WHERE `slug` = ? AND `status` = 'published'", [slug]);
  if (!post) {
    return DB_POSTS.find((p) => p.slug === slug) || null;
  }

  const blocks = await query<any>("SELECT * FROM `BlogBlock` WHERE `postId` = ? ORDER BY `order` ASC", [post.id]);
  const faqs = await query<any>("SELECT * FROM `BlogFaq` WHERE `postId` = ? ORDER BY `order` ASC", [post.id]);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date),
    category: post.category,
    status: post.status,
    noIndex: Boolean(post.noIndex),
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    ogImage: post.ogImage,
    canonicalOverride: post.canonicalOverride,
    blocks: (blocks || []).map((b) => ({
      id: b.id,
      postId: b.postId,
      type: b.type as any,
      text: b.text,
      items: parseJson<string[]>(b.items, []),
      order: b.order,
    })),
    faqs: (faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
  };
}

export async function getWork(): Promise<CaseStudy[]> {
  const work = await query<any>("SELECT * FROM `CaseStudy` ORDER BY `order` ASC");
  if (!work || work.length === 0) {
    return DB_CASE_STUDIES;
  }
  return work.map((w) => ({
    id: w.id,
    slug: w.slug,
    client: w.client,
    category: w.category,
    summary: w.summary,
    resultLabel: w.resultLabel,
    variant: w.variant,
    noIndex: Boolean(w.noIndex),
    metaTitle: w.metaTitle,
    metaDescription: w.metaDescription,
    ogImage: w.ogImage,
    canonicalOverride: w.canonicalOverride,
  }));
}

export async function getProducts(): Promise<Product[]> {
  const products = await query<any>("SELECT * FROM `Product` ORDER BY `name` ASC");
  if (!products || products.length === 0) return DB_PRODUCTS;
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    features: parseJson<string[]>(p.features, []),
    benefits: parseJson<string[]>(p.benefits, []),
    specs: [],
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    ogImage: p.ogImage,
    canonicalOverride: p.canonicalOverride,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await queryOne<any>("SELECT * FROM `Product` WHERE `slug` = ?", [slug]);
  if (!p) {
    return DB_PRODUCTS.find((pr) => pr.slug === slug) || null;
  }

  const specs = await query<any>("SELECT * FROM `ProductSpec` WHERE `productId` = ? ORDER BY `order` ASC", [p.id]);

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    features: parseJson<string[]>(p.features, []),
    benefits: parseJson<string[]>(p.benefits, []),
    specs: (specs || []).map((s) => ({ label: s.label, value: s.value })),
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    ogImage: p.ogImage,
    canonicalOverride: p.canonicalOverride,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await query<any>("SELECT * FROM `Testimonial` WHERE `published` = 1 ORDER BY `order` ASC");
  if (!testimonials || testimonials.length === 0) {
    return DB_TESTIMONIALS;
  }
  return testimonials.map((t) => ({
    id: t.id,
    quote: t.quote,
    name: t.name,
    role: t.role,
    published: Boolean(t.published),
  }));
}

export async function getSettings(): Promise<SiteSettingsModel> {
  const settings = await queryOne<any>("SELECT * FROM `SiteSettings` LIMIT 1");
  if (!settings) {
    return DB_SETTINGS;
  }

  const whyChooseUs = await query<any>("SELECT * FROM `WhyChooseUs` WHERE `settingsId` = ? ORDER BY `order` ASC", [settings.id]);
  const metricItems = await query<any>("SELECT * FROM `MetricItem` WHERE `settingsId` = ? ORDER BY `order` ASC", [settings.id]);

  return {
    id: settings.id,
    name: settings.name,
    tagline: settings.tagline,
    eyebrow: settings.eyebrow,
    phone: settings.phone,
    phoneHref: settings.phoneHref,
    email: settings.email,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
    addressLine3: settings.addressLine3,
    gst: settings.gst,
    businessHours: settings.businessHours,
    whatsapp: settings.whatsapp ?? "+919876543210",
    facebook: settings.facebook ?? "https://facebook.com/ggmtechnologies",
    twitter: settings.twitter ?? "https://x.com/ggmtechnologies",
    instagram: settings.instagram ?? "https://instagram.com/ggmtechnologies",
    youtube: settings.youtube ?? "https://youtube.com/@ggmtechnologies",
    linkedin: settings.linkedin ?? "https://linkedin.com/company/ggmtechnologies",
    msme: settings.msme ?? "UDYAM-DL-08-0098741",
    indiamartSeal: settings.indiamartSeal ?? "Verified Trust Seal Member",
    justdialSeal: settings.justdialSeal ?? "Justdial Verified Enterprise",
    googleBusinessUrl: settings.googleBusinessUrl ?? "https://maps.google.com/?cid=ggmtechnologies",
    aboutEyebrow: settings.aboutEyebrow,
    aboutTitle: settings.aboutTitle,
    aboutIntro: settings.aboutIntro,
    mission: settings.mission,
    vision: settings.vision,
    ceoName: settings.ceoName ?? "Chirag Kumar",
    ceoTitle: settings.ceoTitle ?? "Founder & Chief Executive Officer",
    ceoBio: settings.ceoBio ?? "",
    companyStory: settings.companyStory ?? "",
    qualityCompliance: settings.qualityCompliance ?? "",
    clients: parseJson<string[]>(settings.clients, []),
    whyChooseUs: whyChooseUs.map((w) => ({ title: w.title, description: w.description })),
    metricItems: metricItems.map((m) => ({ value: m.value, suffix: m.suffix, label: m.label })),
  };
}

export async function getLegalPages(): Promise<LegalPage[]> {
  const pages = await query<any>("SELECT * FROM `LegalPage` ORDER BY `title` ASC");
  if (!pages || pages.length === 0) return DB_LEGAL_PAGES;
  return pages.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    content: p.content,
    lastUpdated: p.lastUpdated,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    isPublished: Boolean(p.isPublished),
    updatedAt: p.updatedAt,
  }));
}

const STATIC_LEGAL_FALLBACKS: Record<string, { title: string; subtitle: string; content: string }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle: "How GGM Technologies collects, protects, and governs client and visitor data in compliance with EU GDPR and Indian DPDP norms.",
    content: "## 1. Commitment to Privacy\n\nAt **GGM Technologies**, we respect your digital privacy. All client assets are protected under strict Non-Disclosure Agreements (NDAs).",
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    subtitle: "Transparent terms regarding retainers, development milestones, and service cancellations.",
    content: "## 1. Retainer & Milestone Terms\n\nGGM Technologies provides custom software engineering, dedicated media buying, and technical SEO advisory.",
  },
  "cookie-policy": {
    title: "Cookie Policy",
    subtitle: "Comprehensive disclosure of cookies, trackers, and local storage tokens used on our digital platforms.",
    content: "## 1. What Are Cookies\n\nCookies are small text files stored on your browser to facilitate seamless site functionality and analyze aggregated traffic.",
  },
  "disclaimer": {
    title: "Disclaimer & Terms of Use",
    subtitle: "Legal disclaimers regarding performance projections, third-party platform algorithms, and intellectual property.",
    content: "## 1. Performance Projections & Estimates\n\nCase studies and projected ROAS metrics featured on GGM Technologies represent verified historical results.",
  },
  "certifications": {
    title: "Certifications & Accreditations",
    subtitle: "Verified Government MSME registration, GST compliance, and certified partner accreditations.",
    content: "## Official Government & Industry Accreditations\n\n- **Govt. MSME Udyam:** UDYAM-DL-08-0098741\n- **GSTIN:** 07AABCU9603R1ZM\n- **IndiaMART TrustSeal & Google Partner**",
  },
  "quality-compliance": {
    title: "Quality & Compliance Standards",
    subtitle: "Enterprise Governance, 100% White-Hat Search Protocols, and ISO 27001 Data Protection Benchmarks.",
    content: "## Engineering Precision & Ethical Search Standards\n\n100% adherence to Google Search Essentials and ISO 27001 data protection protocols.",
  },
  "about-ceo": {
    title: "About Founder & CEO",
    subtitle: "Algorithmic Growth Strategist, Full-Stack Engineer, and Visionary Leader of GGM Technologies.",
    content: "## Executive Profile: Chirag Kumar (Founder & CEO)\n\nDriven by an uncompromising commitment to transparent, revenue-backed digital growth.",
  },
  "about-the-company": {
    title: "About The Company & Infrastructure",
    subtitle: "Born in South Delhi, scaling world-class enterprises with full-funnel digital growth infrastructure.",
    content: "## Born in South Delhi, Scaling Globally\n\nFull-funnel digital growth infrastructure for over 250+ brands globally.",
  },
  "why-us": {
    title: "Why Choose GGM Technologies",
    subtitle: "Built on verified data, accountable to net revenue, and engineered for sustainable market dominance.",
    content: "## Why Leading Brands Partner With GGM Technologies\n\nRevenue-attributable execution, high-octane Next.js engineering, and 100% transparency.",
  },
};

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  const page = await queryOne<any>("SELECT * FROM `LegalPage` WHERE `slug` = ? OR `id` = ?", [slug, slug]);
  if (!page) {
    const fromSeed = DB_LEGAL_PAGES.find((lp) => lp.slug === slug || lp.id === slug);
    if (fromSeed) return fromSeed;
    const fb = STATIC_LEGAL_FALLBACKS[slug];
    if (!fb) return null;
    return {
      id: slug,
      slug,
      title: fb.title,
      subtitle: fb.subtitle,
      content: fb.content,
      lastUpdated: "August 2026",
      metaTitle: `${fb.title} | GGM Technologies`,
      metaDescription: fb.subtitle,
      isPublished: true,
      updatedAt: new Date(),
    };
  }
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    subtitle: page.subtitle,
    content: page.content,
    lastUpdated: page.lastUpdated,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    isPublished: Boolean(page.isPublished),
    updatedAt: page.updatedAt,
  };
}

export async function getCertificates(): Promise<CertificateDocument[]> {
  const certs = await query<any>("SELECT * FROM `CertificateDocument` ORDER BY `order` ASC, `createdAt` ASC");
  if (!certs || certs.length === 0) {
    return [
      {
        id: "cert_msme",
        title: "MSME Udyam Registration Certificate",
        issuer: "Ministry of MSME, Govt. of India",
        certificateNo: "UDYAM-DL-08-0098741",
        pdfUrl: "/uploads/certificates/msme-udyam-certificate.pdf",
        description: "Official Micro, Small and Medium Enterprises registration.",
        issueDate: "2024",
        order: 0,
      },
      {
        id: "cert_gst",
        title: "GST Registration Certificate (Form REG-06)",
        issuer: "Goods and Services Tax Network, Govt. of India",
        certificateNo: "07AABCU9603R1ZM",
        pdfUrl: "/uploads/certificates/gst-registration-certificate.pdf",
        description: "Government tax compliance and verified enterprise entity status.",
        issueDate: "2024",
        order: 1,
      },
      {
        id: "cert_google",
        title: "Google Certified Partner & Search Ads Specialist",
        issuer: "Google Partners Academy",
        certificateNo: "GP-ADS-9982314-IN",
        pdfUrl: "/uploads/certificates/google-partner-certificate.pdf",
        description: "Certified proficiency in advanced Search Campaigns and GA4 telemetry.",
        issueDate: "2025",
        order: 2,
      },
      {
        id: "cert_indiamart",
        title: "IndiaMART TrustSeal Verified Certificate",
        issuer: "IndiaMART InterMESH Limited",
        certificateNo: "IM-TS-884710",
        pdfUrl: "/uploads/certificates/indiamart-trustseal.pdf",
        description: "Verified supplier credential ensuring authentic business location.",
        issueDate: "2025",
        order: 3,
      },
    ];
  }
  return certs.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    certificateNo: c.certificateNo,
    pdfUrl: c.pdfUrl,
    description: c.description,
    issueDate: c.issueDate,
    order: Number(c.order || 0),
    createdAt: c.createdAt,
  }));
}


