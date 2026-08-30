import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Connected to MySQL. Exporting fresh database state to dbSeedData.ts...");

  // 1. Services
  const [services] = await conn.query("SELECT * FROM `Service` ORDER BY `index` ASC");
  const [serviceFaqs] = await conn.query("SELECT * FROM `ServiceFaq` ORDER BY `order` ASC");

  const faqsByServiceId = new Map();
  for (const f of serviceFaqs) {
    if (!faqsByServiceId.has(f.serviceId)) faqsByServiceId.set(f.serviceId, []);
    faqsByServiceId.get(f.serviceId).push({
      question: f.question,
      answer: f.answer,
    });
  }

  const exportServices = services.map((s) => ({
    id: s.id,
    slug: s.slug,
    index: s.index,
    title: s.title,
    promise: s.promise,
    description: s.description,
    bullets: typeof s.bullets === "string" ? JSON.parse(s.bullets) : (s.bullets || []),
    faqs: faqsByServiceId.get(s.id) || [],
    metaTitle: s.metaTitle || null,
    metaDescription: s.metaDescription || null,
    ogImage: s.ogImage || `/images/services/${s.slug}.jpg`,
    canonicalOverride: s.canonicalOverride || null,
    noIndex: Boolean(s.noIndex),
  }));

  // 2. Products
  const [products] = await conn.query("SELECT * FROM `Product` ORDER BY `name` ASC");
  const [productSpecs] = await conn.query("SELECT * FROM `ProductSpec` ORDER BY `order` ASC");

  const specsByProductId = new Map();
  for (const sp of productSpecs) {
    if (!specsByProductId.has(sp.productId)) specsByProductId.set(sp.productId, []);
    specsByProductId.get(sp.productId).push({
      label: sp.label,
      value: sp.value,
    });
  }

  const exportProducts = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    features: typeof p.features === "string" ? JSON.parse(p.features) : (p.features || []),
    benefits: typeof p.benefits === "string" ? JSON.parse(p.benefits) : (p.benefits || []),
    specs: specsByProductId.get(p.id) || [],
    noIndex: Boolean(p.noIndex),
    metaTitle: p.metaTitle || null,
    metaDescription: p.metaDescription || null,
    ogImage: p.ogImage || "/images/services/seo.jpg",
    canonicalOverride: p.canonicalOverride || null,
  }));

  // 3. Certificates
  const [certs] = await conn.query("SELECT * FROM `CertificateDocument` ORDER BY `order` ASC, `createdAt` ASC");
  const exportCerts = certs.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    certificateNo: c.certificateNo,
    pdfUrl: c.pdfUrl,
    imageUrl: null, // As requested: No image preview on certificate cards
    description: c.description,
    issueDate: c.issueDate,
    order: Number(c.order || 0),
  }));

  // 4. Site Settings
  const [settingsRows] = await conn.query("SELECT * FROM `SiteSettings` LIMIT 1");
  const s = settingsRows[0] || {};
  const exportSettings = {
    id: s.id || "settings_1001",
    name: s.name || "GGM Technologies",
    tagline: s.tagline || "Rank higher. Spend smarter. Grow faster.",
    eyebrow: s.eyebrow || "New Delhi · Digital Growth Partner",
    phone: s.phone || "+91 9002600880",
    phoneHref: s.phoneHref || "tel:+919002600880",
    email: s.email || "info@ggmtechnologies.com",
    addressLine1: s.addressLine1 || "4th Floor, 400-A, 12 Ajit Singh House",
    addressLine2: s.addressLine2 || "Yusuf Sarai Commercial Complex, Green Park",
    addressLine3: s.addressLine3 || "New Delhi 110016",
    gst: s.gst || "07ELUPM2384A1ZV",
    businessHours: s.businessHours || "Monday – Sunday: 9:00 AM – 9:00 PM",
    aboutEyebrow: s.aboutEyebrow || "About GGM",
    aboutTitle: s.aboutTitle || "We treat marketing spend like an investment, not an expense.",
    aboutIntro: s.aboutIntro || "GGM Technologies is a New Delhi–based digital agency specializing in website development, WordPress, Shopify, SEO, digital marketing, and lead generation solutions.",
    mission: s.mission || "Empower businesses with innovative website development, lead generation, and PPC marketing solutions that drive measurable growth.",
    vision: s.vision || "Become a globally recognized digital solutions provider.",
    clients: typeof s.clients === "string" ? JSON.parse(s.clients) : (s.clients || []),
    whatsapp: s.whatsapp || "+919002600880",
    facebook: s.facebook || "https://facebook.com/ggmtechnologies",
    twitter: s.twitter || "https://x.com/ggmtechnologies",
    instagram: s.instagram || "https://instagram.com/ggmtechnologies",
    youtube: s.youtube || "https://youtube.com/@ggmtechnologies",
    linkedin: s.linkedin || "https://linkedin.com/company/ggmtechnologies",
    msme: s.msme || "UDYAM-DL-08-0098741",
    indiamartSeal: s.indiamartSeal || "Verified Trust Seal Member",
    justdialSeal: s.justdialSeal || "Justdial Verified Enterprise",
    googleBusinessUrl: s.googleBusinessUrl || "https://maps.google.com/?cid=ggmtechnologies",
    ceoName: s.ceoName || "Executive Leadership",
    ceoTitle: s.ceoTitle || "Founder & Chief Executive Officer",
    ceoBio: s.ceoBio || "",
    companyStory: s.companyStory || "",
    qualityCompliance: s.qualityCompliance || "",
    whyChooseUs: typeof s.whyChooseUs === "string" ? JSON.parse(s.whyChooseUs) : (s.whyChooseUs || []),
    metricItems: [
      { value: 250, suffix: "+", label: "Projects delivered" },
      { value: 4.8, suffix: "x", label: "Avg. ROAS lift" },
      { value: 12, suffix: "", label: "Industries served" },
      { value: 45, suffix: " days", label: "Avg. time to page one" },
    ],
  };

  // 5. Existing Posts, Case Studies, Testimonials, Legal Pages from current dbSeedData
  const currentSeed = await import("../src/data/dbSeedData.js").catch(() => null);

  // Read existing dbSeedData.ts to preserve POSTS, CASE_STUDIES, TESTIMONIALS, LEGAL_PAGES if not in DB
  const [posts] = await conn.query("SELECT * FROM `BlogPost` ORDER BY `publishedAt` DESC").catch(() => [[]]);
  const [caseStudies] = await conn.query("SELECT * FROM `CaseStudy` ORDER BY `order` ASC").catch(() => [[]]);
  const [testimonials] = await conn.query("SELECT * FROM `Testimonial` ORDER BY `order` ASC").catch(() => [[]]);
  const [legalPages] = await conn.query("SELECT * FROM `LegalPage`").catch(() => [[]]);

  // Read existing dbSeedData to keep any blocks/sub-models intact
  const seedFilePath = path.resolve("src/data/dbSeedData.ts");
  const existingSeedText = fs.readFileSync(seedFilePath, "utf8");

  // Extract DB_POSTS, DB_CASE_STUDIES, DB_TESTIMONIALS, DB_LEGAL_PAGES
  function extractExport(name, text) {
    const regex = new RegExp(`export const ${name}[^=]*=([\\s\\S]*?);\\n\\nexport`, "m");
    const match = text.match(regex);
    if (match) return match[1].trim();
    // try at end of file
    const endRegex = new RegExp(`export const ${name}[^=]*=([\\s\\S]*?);\\s*$`, "m");
    const endMatch = text.match(endRegex);
    if (endMatch) return endMatch[1].trim();
    return "[]";
  }

  const postsText = extractExport("DB_POSTS", existingSeedText);
  const caseStudiesText = extractExport("DB_CASE_STUDIES", existingSeedText);
  const testimonialsText = extractExport("DB_TESTIMONIALS", existingSeedText);
  const legalPagesText = extractExport("DB_LEGAL_PAGES", existingSeedText);

  const fileContent = `// Auto-generated database fallback dataset
// Ensures all services, settings, products, posts, and details are 100% available live even when DB connection is unavailable.
import type { Service, Post, CaseStudy, Product, Testimonial, SiteSettingsModel, LegalPage, CertificateDocument } from "@/types";

export const DB_SERVICES: Service[] = ${JSON.stringify(exportServices, null, 2)};

export const DB_SETTINGS: SiteSettingsModel = ${JSON.stringify(exportSettings, null, 2)};

export const DB_PRODUCTS: Product[] = ${JSON.stringify(exportProducts, null, 2)};

export const DB_CERTIFICATES: CertificateDocument[] = ${JSON.stringify(exportCerts, null, 2)};

export const DB_POSTS: Post[] = ${postsText};

export const DB_CASE_STUDIES: CaseStudy[] = ${caseStudiesText};

export const DB_TESTIMONIALS: Testimonial[] = ${testimonialsText};

export const DB_LEGAL_PAGES: LegalPage[] = ${legalPagesText};
`;

  fs.writeFileSync(seedFilePath, fileContent, "utf8");
  console.log("Successfully wrote fresh database state to src/data/dbSeedData.ts!");
  console.log(`- Services: ${exportServices.length}`);
  console.log(`- Products: ${exportProducts.length}`);
  console.log(`- Certificates: ${exportCerts.length}`);

  await conn.end();
}

main().catch((err) => {
  console.error("Error in export-db-to-seed:", err);
  process.exit(1);
});
