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

export async function getServices(): Promise<Service[]> {
  const services = await query<any>("SELECT * FROM `Service` ORDER BY `index` ASC");
  if (services.length === 0) return [];

  const faqs = await query<any>("SELECT * FROM `ServiceFaq` ORDER BY `order` ASC");
  const faqsByServiceId = new Map<string, any[]>();
  for (const faq of faqs) {
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
  if (!s) return null;
  const faqs = await query<any>("SELECT * FROM `ServiceFaq` WHERE `serviceId` = ? ORDER BY `order` ASC", [s.id]);
  return {
    id: s.id,
    slug: s.slug,
    index: s.index,
    title: s.title,
    promise: s.promise,
    description: s.description,
    bullets: parseJson<string[]>(s.bullets, []),
    faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
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
  if (!post) return null;

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
    blocks: blocks.map((b) => ({
      id: b.id,
      postId: b.postId,
      type: b.type as any,
      text: b.text,
      items: parseJson<string[]>(b.items, []),
      order: b.order,
    })),
    faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
  };
}

export async function getWork(): Promise<CaseStudy[]> {
  const work = await query<any>("SELECT * FROM `CaseStudy` ORDER BY `order` ASC");
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
    specs: specs.map((s) => ({ label: s.label, value: s.value })),
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    ogImage: p.ogImage,
    canonicalOverride: p.canonicalOverride,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await query<any>("SELECT * FROM `Testimonial` WHERE `published` = 1 ORDER BY `order` ASC");
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
    throw new Error("SiteSettings not found in database");
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

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  const page = await queryOne<any>("SELECT * FROM `LegalPage` WHERE `slug` = ? OR `id` = ?", [slug, slug]);
  if (!page) return null;
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


