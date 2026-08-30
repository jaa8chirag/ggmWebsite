import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";

async function main() {
  const pool = mysql.createPool(dbUrl);

  console.log("1. Creating QuoteRequest table...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`QuoteRequest\` (
      \`id\` VARCHAR(191) NOT NULL PRIMARY KEY,
      \`name\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(50) NOT NULL,
      \`serviceSlug\` VARCHAR(100) NOT NULL,
      \`serviceTitle\` VARCHAR(255) NOT NULL,
      \`pageUrl\` VARCHAR(500) NOT NULL,
      \`status\` ENUM('PENDING', 'CONTACTED', 'CONVERTED', 'ARCHIVED') NOT NULL DEFAULT 'PENDING',
      \`notes\` TEXT NULL,
      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log("✓ QuoteRequest table ready.");

  console.log("2. Reordering and splitting services in MySQL...");
  
  // The 7 requested services in exact user order:
  // 1. Website Development (index: 1)
  // 2. SEO (index: 2)
  // 3. PPC & Google Ads (index: 3)
  // 4. Lead Generation (index: 4)
  // 5. Social Media Marketing (index: 5)
  // 6. Shopify Development (index: 6)
  // 7. WordPress Development (index: 7)

  const SERVICES = [
    {
      id: "srv_1002",
      slug: "website-development",
      title: "Website Development",
      index: 1,
      promise: "Custom builds on modern stacks",
      description: "Modern, high-performance web applications and bespoke digital platforms engineered for conversion.",
      bullets: JSON.stringify(["Custom builds on modern stacks", "Core Web Vitals performance", "CMS handoff & training"]),
      metaTitle: "Website Development Company in Delhi | Custom Web Design | GGM Technologies",
      metaDescription: "Premier website development company in Delhi. Custom React, Next.js, and modern full-stack web applications engineered for speed, SEO, and business scale.",
      ogImage: "/images/services/website-development.jpg",
    },
    {
      id: "srv_1000",
      slug: "seo",
      title: "SEO",
      index: 2,
      promise: "Rankings that convert to revenue",
      description: "Search engine optimization engineered to dominate high-intent keywords and build sustainable organic pipeline.",
      bullets: JSON.stringify(["Technical audit & fixes", "On-page & content architecture", "Authoritative link acquisition"]),
      metaTitle: "Best SEO Agency in Delhi | Rank #1 on Google | GGM Technologies",
      metaDescription: "Enterprise SEO services delivering top organic search rankings. Technical audits, high-intent keyword strategies, and authoritative link acquisition.",
      ogImage: "/images/services/seo.jpg",
    },
    {
      id: "srv_1001",
      slug: "ppc",
      title: "PPC & Google Ads",
      index: 3,
      promise: "Relentless ROAS focus",
      description: "Performance advertising across Google Search, Performance Max, Display, and paid social with relentless ROAS focus.",
      bullets: JSON.stringify(["Full-funnel campaign buildout", "Daily bid & query sculpting", "Custom attribution & reporting"]),
      metaTitle: "PPC & Google Ads Agency in Delhi | High ROAS Campaigns | GGM Technologies",
      metaDescription: "Google Ads and performance PPC management. Stop wasting ad spend with data-driven Search, PMax, and remarketing campaigns built for maximum return.",
      ogImage: "/images/services/ppc.jpg",
    },
    {
      id: "srv_1003",
      slug: "lead-generation",
      title: "Lead Generation",
      index: 4,
      promise: "Qualified pipeline, predictable revenue",
      description: "B2B and high-ticket pipeline generation using multi-channel prospecting, landing page CRO, and CRM sync.",
      bullets: JSON.stringify(["Ideal Customer Profile mapping", "High-converting offer & landing pages", "Automated CRM lead routing"]),
      metaTitle: "B2B Lead Generation Services | High-Ticket Sales Pipeline | GGM Technologies",
      metaDescription: "Drive qualified sales leads with our multi-channel B2B lead generation engine. Custom funnel architecture, CRO landing pages, and automated CRM routing.",
      ogImage: "/images/services/lead-generation.jpg",
    },
    {
      id: "srv_1004",
      slug: "social-media-marketing",
      title: "Social Media Marketing",
      index: 5,
      promise: "Audience growth that moves the needle",
      description: "Organic community growth and paid social amplification across LinkedIn, Meta, and X that builds brand equity.",
      bullets: JSON.stringify(["Editorial calendar & asset creation", "Community management & outreach", "Performance creative testing"]),
      metaTitle: "Social Media Marketing Agency Delhi | Meta, LinkedIn, X Growth | GGM Technologies",
      metaDescription: "Grow authority and drive high-converting social media traffic. Custom content engines, viral brand campaigns, and paid social ads across Instagram, LinkedIn, and Meta.",
      ogImage: "/images/services/social-media.jpg",
    },
    {
      id: "srv_1005",
      slug: "shopify-development",
      title: "Shopify Development",
      index: 6,
      promise: "High-velocity D2C storefronts",
      description: "High-conversion Shopify & Shopify Plus storefronts engineered for fast checkout, seamless apps, and maximum AOV.",
      bullets: JSON.stringify(["Custom Liquid & OS 2.0 themes", "Checkout Extensibility & CRO", "Seamless ERP, CRM & app integration"]),
      metaTitle: "Shopify Development Company in Delhi | Shopify Plus Experts | GGM Technologies",
      metaDescription: "Bespoke Shopify and Shopify Plus store development. Ultra-fast Liquid themes, frictionless checkout optimization, and scalable D2C e-commerce architecture.",
      ogImage: "/images/services/shopify-wordpress.jpg",
    },
    {
      id: "srv_1006",
      slug: "wordpress-development",
      title: "WordPress Development",
      index: 7,
      promise: "Enterprise CMS & WooCommerce engines",
      description: "Enterprise WordPress & WooCommerce platforms engineered with bespoke PHP, Gutenberg blocks, and sub-second load times.",
      bullets: JSON.stringify(["Custom PHP & Gutenberg architecture", "WooCommerce high-volume stores", "Hardened security & Redis caching"]),
      metaTitle: "WordPress & WooCommerce Development Company | GGM Technologies",
      metaDescription: "Enterprise WordPress development and WooCommerce engineering. Custom block themes, headless WP, sub-second query performance, and bank-grade security.",
      ogImage: "/images/services/shopify-wordpress.jpg",
    },
  ];

  for (const s of SERVICES) {
    await pool.query(
      "INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `metaTitle`, `metaDescription`, `ogImage`, `createdAt`, `updatedAt`)" +
      " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))" +
      " ON DUPLICATE KEY UPDATE" +
      "   slug = VALUES(slug)," +
      "   `index` = VALUES(`index`)," +
      "   title = VALUES(title)," +
      "   promise = VALUES(promise)," +
      "   description = VALUES(description)," +
      "   bullets = VALUES(bullets)," +
      "   metaTitle = VALUES(metaTitle)," +
      "   metaDescription = VALUES(metaDescription)," +
      "   ogImage = VALUES(ogImage)," +
      "   updatedAt = NOW(3);",
      [s.id, s.slug, s.index, s.title, s.promise, s.description, s.bullets, s.metaTitle, s.metaDescription, s.ogImage]
    );
    console.log(`✓ Seeded/Updated Service [index: ${s.index}]: ${s.title} (${s.slug})`);
  }

  // Delete legacy merged service row if present
  await pool.query("DELETE FROM `Service` WHERE `slug` = 'shopify-wordpress' AND `id` NOT IN ('srv_1005', 'srv_1006')");

  const [current] = await pool.query("SELECT `id`, `slug`, `index`, `title` FROM `Service` ORDER BY `index` ASC");
  console.log("\nServices in MySQL after update:");
  console.table(current);

  await pool.end();
  console.log("\nServices and Quote migration complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
