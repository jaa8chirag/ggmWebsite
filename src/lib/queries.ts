import { query, queryOne, parseJson } from "@/lib/db";
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

const DEFAULT_SERVICES: Service[] = [
  {
    id: "srv_seo",
    slug: "seo",
    index: "01",
    title: "Technical SEO & Search Dominance",
    promise: "Engineer top rankings on high-intent commercial keywords.",
    description: "Full-funnel organic search architecture: semantic entity graphs, programmatic SEO, Core Web Vitals optimization, and high-authority digital PR.",
    bullets: ["Semantic entity clustering", "Core Web Vitals 100/100 scores", "Automated log file analysis", "Editorial digital PR & backlink acquisition"],
    faqs: [
      { question: "How quickly do SEO results show?", answer: "Technical fixes show indexing improvements within 2–4 weeks; competitive rankings typically compound over 90–120 days." }
    ],
    metaTitle: "Technical SEO Agency Delhi | GGM Technologies",
    metaDescription: "Scale organic search traffic with numbers-backed Technical SEO and white-hat link acquisition.",
    noIndex: false,
  },
  {
    id: "srv_ppc",
    slug: "ppc",
    index: "02",
    title: "PPC & Performance Media Buying",
    promise: "Maximize ROAS across Google Ads, Meta, and YouTube.",
    description: "Algorithmic bidding architectures, server-side Conversions API (CAPI), and rapid creative testing engines that scale revenue predictably.",
    bullets: ["Google Ads Smart Bidding automation", "Meta Advantage+ funnel design", "Server-side CAPI tracking", "Custom landing page CRO"],
    faqs: [
      { question: "Do you charge a percentage of ad spend?", answer: "We offer transparent flat management retainers with zero hidden markups." }
    ],
    metaTitle: "PPC & Google Ads Agency Delhi | GGM Technologies",
    metaDescription: "Scale revenue predictably with algorithmic PPC and performance media buying.",
    noIndex: false,
  },
  {
    id: "srv_webdev",
    slug: "web-development",
    index: "03",
    title: "High-Performance Web Engineering",
    promise: "Sub-second Next.js web applications engineered for conversions.",
    description: "Custom web development using Next.js, React, Tailwind, and Node.js. Built for lightning-fast speeds, SEO indexability, and high conversion rates.",
    bullets: ["Next.js App Router architectures", "Sub-second Core Web Vitals", "Headless CMS integrations", "Custom conversion funnel optimization"],
    faqs: [
      { question: "Do you build custom websites?", answer: "Yes, 100% custom code in Next.js and TypeScript for maximum speed and security." }
    ],
    metaTitle: "Web Development Agency Delhi | GGM Technologies",
    metaDescription: "High-performance Next.js and Full-Stack web engineering engineered for revenue.",
    noIndex: false,
  },
  {
    id: "srv_leadgen",
    slug: "lead-generation",
    index: "04",
    title: "B2B & High-Ticket Lead Generation",
    promise: "Fill your sales pipeline with verified, high-intent prospects.",
    description: "Multi-channel lead generation pipelines combining targeted LinkedIn outreach, search intent ads, and automated CRM qualification.",
    bullets: ["Multi-channel qualification funnels", "CRM & WhatsApp Business automation", "Direct calendar booking workflows", "Verified B2B prospect targeting"],
    faqs: [
      { question: "How do you qualify leads?", answer: "We implement dynamic multi-step form verification and instant CRM scoring." }
    ],
    metaTitle: "Lead Generation Agency Delhi | GGM Technologies",
    metaDescription: "Scale B2B sales pipelines with verified lead generation funnels.",
    noIndex: false,
  },
];

export async function getServices(): Promise<Service[]> {
  const services = await query<any>("SELECT * FROM `Service` ORDER BY `index` ASC");
  if (!services || services.length === 0) return DEFAULT_SERVICES;

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
    return DEFAULT_SERVICES.find((srv) => srv.slug === slug) || null;
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
    return [
      {
        id: "post_1",
        slug: "how-to-scale-google-ads-roas-2026",
        title: "How to Scale Google Ads ROAS in 2026 Without Bleeding Budget",
        excerpt: "A deep dive into Smart Bidding algorithms, server-side CAPI tracking, and first-party data architecture.",
        date: new Date(),
        category: "PPC Strategy",
        status: "published",
        blocks: [],
        faqs: [],
        noIndex: false,
      },
      {
        id: "post_2",
        slug: "programmatic-seo-delhi-business-guide",
        title: "Programmatic SEO: The Secret to Dominating Local & Regional Search",
        excerpt: "How to generate hundreds of high-intent location-specific landing pages that rank on page 1 of Google.",
        date: new Date(),
        category: "SEO Strategy",
        status: "published",
        blocks: [],
        faqs: [],
        noIndex: false,
      },
    ];
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
    const defaultPost = (await getPublishedPosts()).find((p) => p.slug === slug);
    return defaultPost || null;
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
    return [
      {
        id: "cs_1",
        slug: "luxury-interiors-lead-engine",
        client: "Aura Studio Living",
        category: "Lead Generation",
        summary: "Generated 340+ high-ticket villa interior inquiries with sub-₹450 CPL using multi-step qualification funnels.",
        resultLabel: "+340% Pipeline Growth",
        variant: "interiors",
        noIndex: false,
      },
      {
        id: "cs_2",
        slug: "national-fitness-brand-seo",
        client: "Apex Nutrition & Gyms",
        category: "Technical SEO",
        summary: "Scaled organic search clicks from 15k to 180k/month across 42 commercial transactional keywords.",
        resultLabel: "12x Organic Clicks",
        variant: "fitness",
        noIndex: false,
      },
      {
        id: "cs_3",
        slug: "d2c-apparel-performance-scale",
        client: "VogueThreads Apparel",
        category: "PPC & Performance",
        summary: "Scaled monthly ad spend to ₹18L while maintaining 4.4x blended ROAS across Google Ads and Meta.",
        resultLabel: "4.4x Blended ROAS",
        variant: "ecommerce",
        noIndex: false,
      },
    ];
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
  return (products || []).map((p) => ({
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
  if (!p) return null;

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
    return [
      {
        id: "t_1",
        name: "Rohit Malhotra",
        role: "Founder, Aura Studio Living",
        quote: "GGM Technologies transformed our digital acquisition. We went from struggling for qualified leads to closing high-ticket interior projects every week.",
        published: true,
      },
      {
        id: "t_2",
        name: "Simran Kapoor",
        role: "Marketing Head, Apex Nutrition",
        quote: "Their algorithmic approach to SEO and media buying is unmatched in Delhi. Transparent, accountable, and numbers-backed.",
        published: true,
      },
    ];
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
    return {
      id: "settings_1",
      name: "GGM Technologies",
      tagline: "Rank higher. Spend smarter. Grow faster.",
      eyebrow: "NEW DELHI · DIGITAL GROWTH PARTNER",
      phone: "+91 98765 43210",
      phoneHref: "tel:+919876543210",
      email: "contact@ggmtechnologies.com",
      addressLine1: "Plot 42, Okhla Industrial Area, Phase-III",
      addressLine2: "South Delhi",
      addressLine3: "New Delhi, Delhi 110020",
      gst: "07AABCU9603R1ZM",
      businessHours: "Mon–Sat, 09:30 AM – 06:30 PM IST",
      whatsapp: "+919876543210",
      facebook: "https://facebook.com/ggmtechnologies",
      twitter: "https://x.com/ggmtechnologies",
      instagram: "https://instagram.com/ggmtechnologies",
      youtube: "https://youtube.com/@ggmtechnologies",
      linkedin: "https://linkedin.com/company/ggmtechnologies",
      msme: "UDYAM-DL-08-0098741",
      indiamartSeal: "Verified Trust Seal Member",
      justdialSeal: "Justdial Verified Enterprise",
      googleBusinessUrl: "https://maps.google.com/?cid=ggmtechnologies",
      aboutEyebrow: "WHO WE ARE",
      aboutTitle: "We engineer digital dominance with numbers and code.",
      aboutIntro: "GGM Technologies is a New Delhi digital growth partner running SEO, PPC, web development, and lead generation on accountable numbers.",
      mission: "Transform digital marketing from speculative expense into a predictable, mathematically attributable revenue engine.",
      vision: "To be India's premier digital performance agency trusted by high-growth brands globally.",
      ceoName: "Chirag Kumar",
      ceoTitle: "Founder & Chief Executive Officer",
      ceoBio: "Driven by an uncompromising commitment to transparent, revenue-backed digital growth, Chirag Kumar founded GGM Technologies to bridge the gap between creative marketing strategy and hardcore engineering precision.",
      companyStory: "Founded in New Delhi, GGM Technologies emerged from a single realization: vanity metrics do not pay salaries. We have engineered full-funnel digital infrastructure for over 250+ brands globally.",
      qualityCompliance: "Quality and client accountability form the bedrock of every engagement at GGM Technologies. 100% adherence to Google Search Essentials and ISO 27001 data protection.",
      clients: ["Shopify Plus", "Razorpay", "Zomato Partner", "Tata 1mg", "Lenskart Ecosystem", "HealthKart"],
      whyChooseUs: [
        { title: "Revenue Attributable", description: "Every rupee spent connects directly to qualified pipeline value and ROI." },
        { title: "Hardcore Engineering", description: "Sub-second Next.js web applications built with 100/100 Core Web Vitals." },
        { title: "100% Transparency", description: "Zero media markups, full client account ownership, and real-time dashboards." },
      ],
      metricItems: [
        { value: 250, suffix: "+", label: "Brands Scaled" },
        { value: 4.8, suffix: "x", label: "Average ROAS" },
        { value: 99.4, suffix: "%", label: "Client Retention" },
        { value: 12, suffix: "M+", label: "Organic Clicks Generated" },
      ],
    };
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


