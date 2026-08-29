const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function run() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Connected to MySQL, fetching records...");

  // 1. Services & ServiceFaq
  const [services] = await conn.query("SELECT * FROM `Service` ORDER BY `index` ASC");
  const [serviceFaqs] = await conn.query("SELECT * FROM `ServiceFaq` ORDER BY `order` ASC");

  const faqsByServiceId = {};
  for (const faq of serviceFaqs) {
    if (!faqsByServiceId[faq.serviceId]) faqsByServiceId[faq.serviceId] = [];
    faqsByServiceId[faq.serviceId].push({
      question: faq.question,
      answer: faq.answer,
    });
  }

  const formattedServices = services.map((s) => {
    let bullets = [];
    try {
      bullets = typeof s.bullets === "string" ? JSON.parse(s.bullets) : s.bullets || [];
    } catch {
      bullets = [];
    }
    return {
      id: s.id,
      slug: s.slug,
      index: s.index,
      title: s.title,
      promise: s.promise,
      description: s.description,
      bullets,
      faqs: faqsByServiceId[s.id] || [],
      metaTitle: s.metaTitle || null,
      metaDescription: s.metaDescription || null,
      ogImage: s.ogImage || null,
      canonicalOverride: s.canonicalOverride || null,
      noIndex: Boolean(s.noIndex),
    };
  });

  // 2. SiteSettings, WhyChooseUs, MetricItems
  const [settingsRows] = await conn.query("SELECT * FROM `SiteSettings` LIMIT 1");
  const settings = settingsRows[0] || {};
  let clients = [];
  try {
    clients = typeof settings.clients === "string" ? JSON.parse(settings.clients) : settings.clients || [];
  } catch {
    clients = [];
  }

  const [whyChooseUs] = await conn.query("SELECT * FROM `WhyChooseUs` WHERE `settingsId` = ? ORDER BY `order` ASC", [settings.id]);
  const [metricItems] = await conn.query("SELECT * FROM `MetricItem` WHERE `settingsId` = ? ORDER BY `order` ASC", [settings.id]);

  const formattedSettings = {
    id: settings.id || "settings_1001",
    name: settings.name || "GGM Technologies",
    tagline: settings.tagline || "Rank higher. Spend smarter. Grow faster.",
    eyebrow: settings.eyebrow || "New Delhi · Digital Growth Partner",
    phone: settings.phone || "+91 9002600880",
    phoneHref: settings.phoneHref || "tel:+919002600880",
    email: settings.email || "info@ggmtechnologies.com",
    addressLine1: settings.addressLine1 || "4th Floor, 400-A, 12 Ajit Singh House",
    addressLine2: settings.addressLine2 || "Yusuf Sarai Commercial Complex, Green Park",
    addressLine3: settings.addressLine3 || "New Delhi 110016",
    gst: settings.gst || "07ELUPM2384A1ZV",
    businessHours: settings.businessHours || "Monday – Sunday: 9:00 AM – 9:00 PM",
    aboutEyebrow: settings.aboutEyebrow || "About GGM",
    aboutTitle: settings.aboutTitle || "We treat marketing spend like an investment, not an expense.",
    aboutIntro: settings.aboutIntro || "",
    mission: settings.mission || "",
    vision: settings.vision || "",
    clients,
    whatsapp: settings.whatsapp || "+919876543210",
    facebook: settings.facebook || "https://facebook.com/ggmtechnologies",
    twitter: settings.twitter || "https://x.com/ggmtechnologies",
    instagram: settings.instagram || "https://instagram.com/ggmtechnologies",
    youtube: settings.youtube || "https://youtube.com/@ggmtechnologies",
    linkedin: settings.linkedin || "https://linkedin.com/company/ggmtechnologies",
    msme: settings.msme || "UDYAM-DL-08-0098741",
    indiamartSeal: settings.indiamartSeal || "Verified Trust Seal Member",
    justdialSeal: settings.justdialSeal || "Justdial Verified Enterprise",
    googleBusinessUrl: settings.googleBusinessUrl || "https://maps.google.com/?cid=ggmtechnologies",
    ceoName: settings.ceoName || "Executive Leadership",
    ceoTitle: settings.ceoTitle || "Founder & Chief Executive Officer",
    ceoBio: settings.ceoBio || "",
    companyStory: settings.companyStory || "",
    qualityCompliance: settings.qualityCompliance || "",
    whyChooseUs: whyChooseUs.map((w) => ({ title: w.title, description: w.description })),
    metricItems: metricItems.map((m) => ({ value: m.value, suffix: m.suffix, label: m.label })),
  };

  // 3. Products & ProductSpec
  const [products] = await conn.query("SELECT * FROM `Product` ORDER BY `name` ASC");
  const [specs] = await conn.query("SELECT * FROM `ProductSpec` ORDER BY `order` ASC");

  const specsByProductId = {};
  for (const sp of specs) {
    if (!specsByProductId[sp.productId]) specsByProductId[sp.productId] = [];
    specsByProductId[sp.productId].push({
      label: sp.label,
      value: sp.value,
    });
  }

  const formattedProducts = products.map((p) => {
    let features = [];
    let benefits = [];
    try {
      features = typeof p.features === "string" ? JSON.parse(p.features) : p.features || [];
    } catch {}
    try {
      benefits = typeof p.benefits === "string" ? JSON.parse(p.benefits) : p.benefits || [];
    } catch {}
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      description: p.description,
      features,
      benefits,
      specs: specsByProductId[p.id] || [],
      noIndex: Boolean(p.noIndex),
      metaTitle: p.metaTitle || null,
      metaDescription: p.metaDescription || null,
      ogImage: p.ogImage || null,
      canonicalOverride: p.canonicalOverride || null,
    };
  });

  // 4. BlogPosts, Blocks & BlogFaqs
  const [posts] = await conn.query("SELECT * FROM `BlogPost` WHERE `status` = 'published' ORDER BY `date` DESC");
  const [blocks] = await conn.query("SELECT * FROM `BlogBlock` ORDER BY `order` ASC");
  const [blogFaqs] = await conn.query("SELECT * FROM `BlogFaq` ORDER BY `order` ASC");

  const blocksByPostId = {};
  for (const b of blocks) {
    if (!blocksByPostId[b.postId]) blocksByPostId[b.postId] = [];
    let items = [];
    try {
      items = typeof b.items === "string" ? JSON.parse(b.items) : b.items || [];
    } catch {}
    blocksByPostId[b.postId].push({
      id: b.id,
      postId: b.postId,
      type: b.type,
      text: b.text,
      items,
      order: b.order,
    });
  }

  const faqsByPostId = {};
  for (const f of blogFaqs) {
    if (!faqsByPostId[f.postId]) faqsByPostId[f.postId] = [];
    faqsByPostId[f.postId].push({
      question: f.question,
      answer: f.answer,
    });
  }

  const formattedPosts = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    status: p.status,
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle || null,
    metaDescription: p.metaDescription || null,
    ogImage: p.ogImage || null,
    canonicalOverride: p.canonicalOverride || null,
    blocks: blocksByPostId[p.id] || [],
    faqs: faqsByPostId[p.id] || [],
  }));

  // 5. Case Studies
  const formattedCaseStudies = [
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

  // 6. Testimonials
  const [testimonials] = await conn.query("SELECT * FROM `Testimonial` ORDER BY `order` ASC");
  const formattedTestimonials = testimonials.map((t) => ({
    id: t.id,
    quote: t.quote,
    name: t.author || t.name || "Client",
    role: t.role || (t.company ? `Executive, ${t.company}` : "Client"),
    published: true,
  }));

  // 7. Legal Pages
  const [legalPages] = await conn.query("SELECT * FROM `LegalPage` ORDER BY `title` ASC");
  const formattedLegalPages = legalPages.map((lp) => ({
    id: lp.id,
    slug: lp.slug,
    title: lp.title,
    subtitle: lp.subtitle,
    content: lp.content,
    lastUpdated: lp.lastUpdated || "August 2026",
    metaTitle: lp.metaTitle || null,
    metaDescription: lp.metaDescription || null,
    isPublished: Boolean(lp.isPublished ?? 1),
  }));

  await conn.end();

  const fileContent = `// Auto-generated database fallback dataset
// Ensures all services, settings, products, posts, and details are 100% available live even when DB connection is unavailable.
import type { Service, Post, CaseStudy, Product, Testimonial, SiteSettingsModel, LegalPage } from "@/types";

export const DB_SERVICES: Service[] = ${JSON.stringify(formattedServices, null, 2)};

export const DB_SETTINGS: SiteSettingsModel = ${JSON.stringify(formattedSettings, null, 2)};

export const DB_PRODUCTS: Product[] = ${JSON.stringify(formattedProducts, null, 2)};

export const DB_POSTS: Post[] = ${JSON.stringify(
    formattedPosts.map((p) => ({
      ...p,
      date: `__DATE__${new Date(p.date).toISOString()}__DATE__`,
    })),
    null,
    2
  ).replace(/"__DATE__(.*?)__DATE__"/g, 'new Date("$1")')};

export const DB_CASE_STUDIES: CaseStudy[] = ${JSON.stringify(formattedCaseStudies, null, 2)};

export const DB_TESTIMONIALS: Testimonial[] = ${JSON.stringify(formattedTestimonials, null, 2)};

export const DB_LEGAL_PAGES: LegalPage[] = ${JSON.stringify(formattedLegalPages, null, 2)};
`;

  const outputPath = path.join(__dirname, "..", "src", "data", "dbSeedData.ts");
  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log("Successfully written seed data to:", outputPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
