import { unstable_cache } from "next/cache";
import { query, queryOne, parseJson } from "@/lib/db";
import {
  DB_SERVICES,
  DB_SETTINGS,
  DB_PRODUCTS,
  DB_CERTIFICATES,
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
  QuoteRequest,
  CrmLeadModel,
  CrmLeadStatus,
  LeadNote,
  CrmStats,
} from "@/types";

export const DEFAULT_SERVICES = DB_SERVICES;

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
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

    return services.map((s) => {
      let canonicalSlug = s.slug;
      const lower = (s.slug || "").toLowerCase();
      if (lower === "website-development" || lower === "web-development" || lower === "website-development-services") {
        canonicalSlug = "website-development-services";
      } else if (lower === "e-commerce" || lower === "ecommerce" || lower === "e-commerce-development") {
        canonicalSlug = "e-commerce-Development";
      } else if (lower === "shopify-development" || lower === "shopify" || lower === "shopify-wordpress" || lower === "shopify-website-development") {
        canonicalSlug = "shopify-website-development";
      }

      return {
        id: s.id,
        slug: canonicalSlug,
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
      };
    });
  },
  ["getServices"],
  { tags: ["services"], revalidate: 3600 }
);

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return unstable_cache(
    async (targetSlugInput: string) => {
      const normalized = decodeURIComponent(targetSlugInput).toLowerCase().trim().replace(/\s+/g, "-");

      let targetSlug = targetSlugInput;
      if (normalized === "website-development-services") {
        targetSlug = "website-development-services";
      } else if (normalized === "e-commerce-development") {
        targetSlug = "e-commerce-Development";
      } else if (normalized === "shopify-website-development") {
        targetSlug = "shopify-website-development";
      } else if (normalized === "wordpress" || normalized === "wp") {
        targetSlug = "wordpress-development";
      } else if (normalized === "mobile-app" || normalized === "mobile-application-development" || normalized === "app-development") {
        targetSlug = "mobile-app-development";
      } else if (normalized === "adsense" || normalized === "google-ads") {
        targetSlug = "google-adsense";
      } else if (normalized === "pay-per-click" || normalized === "pay-per-click-advertising") {
        targetSlug = "ppc";
      }

      let s = await queryOne<any>("SELECT * FROM `Service` WHERE `slug` = ? OR LOWER(`slug`) = LOWER(?)", [targetSlug, normalized]);
      if (!s && targetSlug !== targetSlugInput) {
        s = await queryOne<any>("SELECT * FROM `Service` WHERE `slug` = ? OR LOWER(`slug`) = LOWER(?)", [targetSlugInput, normalized]);
      }
      if (!s) {
        return (
          DB_SERVICES.find(
            (srv) =>
              srv.slug.toLowerCase() === targetSlug.toLowerCase() ||
              srv.slug.toLowerCase() === normalized ||
              srv.slug === targetSlugInput
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
    },
    ["getServiceBySlug"],
    { tags: ["services"], revalidate: 3600 }
  )(slug);
}

export async function getServiceLocation(
  serviceSlug: string,
  locationSlug: string
): Promise<ServiceLocationModel | null> {
  return unstable_cache(
    async (sSlug: string, lSlug: string) => {
      const normalizedService = decodeURIComponent(sSlug).toLowerCase().trim().replace(/\s+/g, "-");
      const normalizedLocation = decodeURIComponent(lSlug).toLowerCase().trim().replace(/\s+/g, "-");

      const serviceObj = await getServiceBySlug(sSlug);
      
      let sl: any = null;
      if (serviceObj?.id) {
        sl = await queryOne<any>(
          `SELECT sl.*, 
                  s.id as s_id, s.slug as s_slug, s.index as s_index, s.title as s_title, 
                  s.promise as s_promise, s.description as s_description, s.bullets as s_bullets, 
                  s.metaTitle as s_metaTitle, s.metaDescription as s_metaDescription, 
                  s.ogImage as s_ogImage, s.canonicalOverride as s_canonicalOverride, s.noIndex as s_noIndex,
                  l.id as l_id, l.slug as l_slug, l.name as l_name, l.region as l_region, l.isActive as l_isActive
           FROM \`ServiceLocation\` sl
           JOIN \`Service\` s ON sl.serviceId = s.id
           JOIN \`Location\` l ON sl.locationId = l.id
           WHERE sl.published = 1 
             AND sl.serviceId = ? 
             AND (l.slug = ? OR LOWER(l.slug) = ?)`,
          [serviceObj.id, lSlug, normalizedLocation]
        );
      }

      if (!sl) {
        sl = await queryOne<any>(
          `SELECT sl.*, 
                  s.id as s_id, s.slug as s_slug, s.index as s_index, s.title as s_title, 
                  s.promise as s_promise, s.description as s_description, s.bullets as s_bullets, 
                  s.metaTitle as s_metaTitle, s.metaDescription as s_metaDescription, 
                  s.ogImage as s_ogImage, s.canonicalOverride as s_canonicalOverride, s.noIndex as s_noIndex,
                  l.id as l_id, l.slug as l_slug, l.name as l_name, l.region as l_region, l.isActive as l_isActive
           FROM \`ServiceLocation\` sl
           JOIN \`Service\` s ON sl.serviceId = s.id
           JOIN \`Location\` l ON sl.locationId = l.id
           WHERE sl.published = 1 
             AND (s.slug = ? OR LOWER(s.slug) = ?) 
             AND (l.slug = ? OR LOWER(l.slug) = ?)`,
          [sSlug, normalizedService, lSlug, normalizedLocation]
        );
      }

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
          faqs: (faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
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
    },
    ["getServiceLocation"],
    { tags: ["services", "locations"], revalidate: 3600 }
  )(serviceSlug, locationSlug);
}

export const getPublishedServiceLocations = unstable_cache(
  async () => {
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
  },
  ["getPublishedServiceLocations"],
  { tags: ["services", "locations"], revalidate: 3600 }
);

export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
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
  },
  ["getPublishedPosts"],
  { tags: ["posts"], revalidate: 3600 }
);

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return unstable_cache(
    async (postSlug: string) => {
      const post = await queryOne<any>("SELECT * FROM `BlogPost` WHERE `slug` = ? AND `status` = 'published'", [postSlug]);
      if (!post) {
        return DB_POSTS.find((p) => p.slug === postSlug) || null;
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
    },
    ["getPostBySlug"],
    { tags: ["posts"], revalidate: 3600 }
  )(slug);
}

export const getWork = unstable_cache(
  async (): Promise<CaseStudy[]> => {
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
  },
  ["getWork"],
  { tags: ["work"], revalidate: 3600 }
);

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
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
  },
  ["getProducts"],
  { tags: ["products"], revalidate: 3600 }
);

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return unstable_cache(
    async (pSlug: string) => {
      const p = await queryOne<any>("SELECT * FROM `Product` WHERE `slug` = ?", [pSlug]);
      if (!p) {
        return DB_PRODUCTS.find((pr) => pr.slug === pSlug) || null;
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
    },
    ["getProductBySlug"],
    { tags: ["products"], revalidate: 3600 }
  )(slug);
}

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const testimonials = await query<any>("SELECT * FROM `Testimonial` WHERE `published` = 1 ORDER BY `order` ASC");
    if (!testimonials || testimonials.length === 0) {
      return DB_TESTIMONIALS;
    }
    return testimonials.map((t) => ({
      id: t.id,
      quote: t.quote,
      name: t.name,
      role: t.role,
      avatar: t.avatar || null,
      published: Boolean(t.published),
    }));
  },
  ["getTestimonials"],
  { tags: ["testimonials"], revalidate: 3600 }
);

export const getSettings = unstable_cache(
  async (): Promise<SiteSettingsModel> => {
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
      whatsapp: settings.whatsapp ?? "+919002600880",
      facebook: settings.facebook ?? "https://facebook.com/ggmtechnologies",
      twitter: settings.twitter ?? "https://x.com/ggmtechnologies",
      instagram: settings.instagram ?? "https://instagram.com/ggmtechnologies",
      youtube: settings.youtube ?? "https://youtube.com/@ggmtechnologies",
      linkedin: settings.linkedin ?? "https://linkedin.com/company/ggmtechnologies",
      msme: settings.msme ?? "UDYAM-DL-08-0098741",
      indiamartSeal: settings.indiamartSeal ?? "Verified Trust Seal Member",
      justdialSeal: settings.justdialSeal ?? "Justdial Verified Enterprise",
      googleBusinessUrl: settings.googleBusinessUrl ?? "https://maps.google.com/?cid=ggmtechnologies",
      logoUrl: settings.logoUrl ?? null,
      ceoImage: settings.ceoImage ?? null,
      aboutImage: settings.aboutImage ?? null,
      aboutEyebrow: settings.aboutEyebrow,
      aboutTitle: settings.aboutTitle,
      aboutIntro: settings.aboutIntro,
      mission: settings.mission,
      vision: settings.vision,
      ceoName: settings.ceoName ?? "Guru Govind Mahesh",
      ceoTitle: settings.ceoTitle ?? "Founder & Chief Executive Officer",
      ceoBio: settings.ceoBio ?? "",
      companyStory: settings.companyStory ?? "",
      qualityCompliance: settings.qualityCompliance ?? "",
      clients: parseJson<string[]>(settings.clients, []),
      whyChooseUs: whyChooseUs.map((w) => ({ title: w.title, description: w.description })),
      metricItems: metricItems.map((m) => ({ value: m.value, suffix: m.suffix, label: m.label })),
    };
  },
  ["getSettings"],
  { tags: ["settings"], revalidate: 3600 }
);

export const getLegalPages = unstable_cache(
  async (): Promise<LegalPage[]> => {
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
  },
  ["getLegalPages"],
  { tags: ["legal"], revalidate: 3600 }
);

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
    content: "## Executive Profile: Guru Govind Mahesh (Founder & CEO)\n\nDriven by an uncompromising commitment to transparent, revenue-backed digital growth.",
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
  return unstable_cache(
    async (legalSlug: string) => {
      const page = await queryOne<any>("SELECT * FROM `LegalPage` WHERE `slug` = ? OR `id` = ?", [legalSlug, legalSlug]);
      if (!page) {
        const fromSeed = DB_LEGAL_PAGES.find((lp) => lp.slug === legalSlug || lp.id === legalSlug);
        if (fromSeed) return fromSeed;
        const fb = STATIC_LEGAL_FALLBACKS[legalSlug];
        if (!fb) return null;
        return {
          id: legalSlug,
          slug: legalSlug,
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
    },
    ["getLegalPageBySlug"],
    { tags: ["legal"], revalidate: 3600 }
  )(slug);
}

export const getCertificates = unstable_cache(
  async (): Promise<CertificateDocument[]> => {
    const certs = await query<any>("SELECT * FROM `CertificateDocument` ORDER BY `order` ASC, `createdAt` ASC");
    if (!certs || certs.length === 0) return DB_CERTIFICATES;
    return certs.map((c) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      certificateNo: c.certificateNo,
      pdfUrl: c.pdfUrl,
      imageUrl: c.imageUrl || null,
      description: c.description,
      issueDate: c.issueDate,
      order: Number(c.order || 0),
      createdAt: c.createdAt,
    }));
  },
  ["getCertificates"],
  { tags: ["certificates"], revalidate: 3600 }
);

export async function getQuotes(status?: string): Promise<QuoteRequest[]> {
  try {
    let sql = "SELECT * FROM `QuoteRequest`";
    const params: any[] = [];
    if (status && status !== "ALL") {
      sql += " WHERE `status` = ?";
      params.push(status);
    }
    sql += " ORDER BY `createdAt` DESC";
    const rows = await query<any>(sql, params);
    return (rows || []).map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      serviceSlug: r.serviceSlug,
      serviceTitle: r.serviceTitle,
      pageUrl: r.pageUrl,
      status: r.status,
      notes: r.notes || null,
      createdAt: r.createdAt,
    }));
  } catch (err) {
    console.error("Error fetching quotes:", err);
    return [];
  }
}

export async function getQuoteStats(): Promise<{ total: number; pending: number; contacted: number; converted: number }> {
  try {
    const rows = await query<any>("SELECT `status`, COUNT(*) as cnt FROM `QuoteRequest` GROUP BY `status`");
    const stats = { total: 0, pending: 0, contacted: 0, converted: 0 };
    for (const r of rows || []) {
      const count = Number(r.cnt || 0);
      stats.total += count;
      if (r.status === "PENDING") stats.pending = count;
      if (r.status === "CONTACTED") stats.contacted = count;
      if (r.status === "CONVERTED") stats.converted = count;
    }
    return stats;
  } catch (err) {
    return { total: 0, pending: 0, contacted: 0, converted: 0 };
  }
}

/**
 * Lead Management CRM Queries
 */
export async function getLeads(statusFilter?: string): Promise<CrmLeadModel[]> {
  try {
    // 1. Sync unsynced QuoteRequests into CrmLead automatically
    const unsyncedQuotes = await query<any>(
      `SELECT q.* FROM \`QuoteRequest\` q
       LEFT JOIN \`CrmLead\` c ON c.\`quoteRequestId\` = q.\`id\` OR c.\`id\` = q.\`id\`
       WHERE c.\`id\` IS NULL`
    );

    if (unsyncedQuotes && unsyncedQuotes.length > 0) {
      for (const q of unsyncedQuotes) {
        const initialNotes = q.notes
          ? [{ id: `note_init_${Date.now()}`, text: q.notes, createdAt: new Date(q.createdAt || Date.now()).toISOString(), author: "Website System" }]
          : q.message
          ? [{ id: `note_msg_${Date.now()}`, text: `Initial Inquiry: ${q.message}`, createdAt: new Date(q.createdAt || Date.now()).toISOString(), author: "Website Form" }]
          : [];

        let crmStatus: CrmLeadStatus = "NEW";
        if (q.status === "CONTACTED") crmStatus = "IN_DISCUSSION";
        if (q.status === "CONVERTED") crmStatus = "WON";
        if (q.status === "ARCHIVED") crmStatus = "LOST";

        await query(
          `INSERT INTO \`CrmLead\`
           (\`id\`, \`name\`, \`phone\`, \`email\`, \`serviceSlug\`, \`serviceTitle\`, \`source\`, \`status\`, \`timelineNotes\`, \`quoteRequestId\`, \`createdAt\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            q.id,
            q.name,
            q.phone,
            q.email || null,
            q.serviceSlug || "general",
            q.serviceTitle || "General Consultation",
            "Website Form",
            crmStatus,
            JSON.stringify(initialNotes),
            q.id,
            q.createdAt || new Date(),
          ]
        );
      }
    }

    // 2. Fetch CrmLead rows
    let sql = "SELECT * FROM `CrmLead`";
    const params: any[] = [];
    if (statusFilter && statusFilter !== "ALL") {
      sql += " WHERE `status` = ?";
      params.push(statusFilter);
    }
    sql += " ORDER BY `createdAt` DESC";

    const rows = await query<any>(sql, params);
    return (rows || []).map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email || null,
      companyName: r.companyName || null,
      location: r.location || null,
      serviceSlug: r.serviceSlug || "general",
      serviceTitle: r.serviceTitle || "General Consultation",
      source: r.source || "Website Form",
      status: (r.status as CrmLeadStatus) || "NEW",
      approxAmount: r.approxAmount ? String(r.approxAmount) : null,
      fixAmount: r.fixAmount ? String(r.fixAmount) : null,
      advancePaid: r.advancePaid ? String(r.advancePaid) : null,
      balanceDue: r.balanceDue ? String(r.balanceDue) : null,
      paymentStatus: r.paymentStatus || "PENDING",
      quotationSent: Boolean(r.quotationSent),
      nextFollowUp: r.nextFollowUp ? new Date(r.nextFollowUp).toISOString() : null,
      nextPaymentDate: r.nextPaymentDate ? new Date(r.nextPaymentDate).toISOString() : null,
      timelineNotes: parseJson<LeadNote[]>(r.timelineNotes, []),
      quoteRequestId: r.quoteRequestId || null,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching CRM leads:", err);
    return [];
  }
}

function parseAmountValue(val: string | null | undefined): number {
  if (!val) return 0;
  const match = val.match(/\d[\d,]*/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10) || 0;
}

export async function getLeadStats(): Promise<CrmStats> {
  try {
    const leads = await getLeads();
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    let totalLeads = leads.length;
    let dueTodayCount = 0;
    let quotationsSentCount = 0;
    let pipelineSum = 0;
    let wonSum = 0;
    let advanceSum = 0;
    let balanceSum = 0;

    for (const lead of leads) {
      if (lead.quotationSent) quotationsSentCount++;

      const approxNum = parseAmountValue(lead.approxAmount);
      const fixNum = parseAmountValue(lead.fixAmount);
      const advanceNum = parseAmountValue(lead.advancePaid);
      const balanceNum = parseAmountValue(lead.balanceDue) || (fixNum > 0 ? Math.max(0, fixNum - advanceNum) : 0);

      if (lead.status !== "LOST") {
        pipelineSum += fixNum || approxNum;
      }
      if (lead.status === "WON") {
        wonSum += fixNum || approxNum;
      }

      advanceSum += advanceNum;
      balanceSum += balanceNum;

      if (lead.nextFollowUp && lead.status !== "WON" && lead.status !== "LOST") {
        const followUpDateStr = new Date(lead.nextFollowUp).toISOString().slice(0, 10);
        if (followUpDateStr <= todayStr) {
          dueTodayCount++;
        }
      }
    }

    return {
      totalLeads,
      dueTodayCount,
      quotationsSentCount,
      totalPipelineValue: pipelineSum > 0 ? `₹${pipelineSum.toLocaleString("en-IN")}` : "₹0",
      totalWonValue: wonSum > 0 ? `₹${wonSum.toLocaleString("en-IN")}` : "₹0",
      totalAdvanceCollected: advanceSum > 0 ? `₹${advanceSum.toLocaleString("en-IN")}` : "₹0",
      totalBalancePending: balanceSum > 0 ? `₹${balanceSum.toLocaleString("en-IN")}` : "₹0",
    };
  } catch (err) {
    return {
      totalLeads: 0,
      dueTodayCount: 0,
      quotationsSentCount: 0,
      totalPipelineValue: "₹0",
      totalWonValue: "₹0",
      totalAdvanceCollected: "₹0",
      totalBalancePending: "₹0",
    };
  }
}



