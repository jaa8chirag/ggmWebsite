import mysql from "mysql2/promise";
import fs from "fs";

async function main() {
  const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";
  console.log("Connecting to MySQL to setup Digital Agency service...");
  const conn = await mysql.createConnection(dbUrl);

  const serviceId = "srv_digital_agency";
  const slug = "digital-agency";
  const index = "10";
  const title = "Digital Agency";
  const promise = "Unified brand design, cutting-edge engineering, and high-ROAS performance marketing under one roof.";
  const description =
    "GGM Technologies is an end-to-end full-service digital agency. We unify bespoke digital brand identity, sub-second web and mobile engineering, AI-driven search dominance (SEO & GEO), and multi-channel performance marketing into a synchronized growth engine that accelerates revenue and out-converts your competition.";
  const bullets = JSON.stringify([
    "Bespoke UI/UX design systems & brand identity",
    "Full-stack Next.js web & mobile app engineering",
    "Synchronized high-ROAS multi-channel performance marketing",
  ]);
  const ogImage = "/images/services/digital-agency.jpg";
  const metaTitle = "Premier Digital Agency in Delhi & Globally | 360° Growth & Creative Solutions — GGM Technologies";
  const metaDescription =
    "Partner with GGM Technologies, a premier full-service digital agency. We deliver cutting-edge web development, performance marketing, SEO, and brand transformation.";

  // 1. Insert or update Service
  await conn.query(
    `INSERT INTO service (id, slug, \`index\`, title, promise, description, bullets, ogImage, metaTitle, metaDescription, noIndex, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(3), NOW(3))
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       \`index\` = VALUES(\`index\`),
       promise = VALUES(promise),
       description = VALUES(description),
       bullets = VALUES(bullets),
       ogImage = VALUES(ogImage),
       metaTitle = VALUES(metaTitle),
       metaDescription = VALUES(metaDescription),
       updatedAt = NOW(3)`,
    [serviceId, slug, index, title, promise, description, bullets, ogImage, metaTitle, metaDescription]
  );
  console.log("✅ Inserted / Updated service:", title);

  // 2. Insert FAQs
  await conn.query("DELETE FROM servicefaq WHERE serviceId = ?", [serviceId]);

  const faqs = [
    {
      question: "What makes GGM Technologies different from traditional digital marketing agencies?",
      answer:
        "Unlike fragmented agencies that outsource dev work or treat design and media buying as isolated silos, GGM Technologies is a unified full-service digital agency. Our engineers, UX designers, technical SEO specialists, and media buyers sit in the same room. This ensures that every ad campaign drives traffic to sub-second, conversion-optimized landing pages, and every web platform is architected from day one to dominate organic search and AI search engines.",
    },
    {
      question: "What services are included in a full-service Digital Agency engagement?",
      answer:
        "Our digital agency retainers encompass complete digital growth: bespoke UI/UX design and design systems, custom Next.js web and mobile app development, full-funnel organic search (SEO & Generative Engine Optimization), paid media execution (Google Ads, Meta Ads, LinkedIn Ads), conversion rate optimization (CRO), automated CRM lead funnels, and real-time Looker Studio reporting.",
    },
    {
      question: "How long does a digital transformation or agency engagement take to show results?",
      answer:
        "Paid acquisition channels (Google Ads and Meta Ads) begin capturing qualified leads and pipeline within the first 7 to 14 days of campaign launch. Full-scale web development projects typically ship in 4 to 8 weeks following our agile sprint methodology. Organic search dominance and topical authority compound aggressively between months 3 and 6, delivering sustainable, zero-marginal-cost customer acquisition.",
    },
    {
      question: "Do you offer flexible retainer models or fixed-scope project delivery?",
      answer:
        "We offer both models depending on your strategic requirements. For complete digital transformation and ongoing customer acquisition, our monthly growth retainers provide a dedicated multidisciplinary squad (Project Lead, Senior Developer, Creative Designer, and Performance Marketer). For specific builds (such as new web applications or brand re-launches), we provide fixed-price milestone delivery with zero surprise overages.",
    },
    {
      question: "Who owns the code, creative design assets, and ad account data?",
      answer:
        "You retain 100% intellectual property ownership. All Figma design files, Git code repositories, Google Ads / Meta Ads accounts, domain DNS records, and analytics tracking properties belong exclusively to your organization. We believe in earning client retention through quantifiable commercial performance, not artificial vendor lock-in.",
    },
    {
      question: "How do you track ROI and report marketing performance?",
      answer:
        "We provide live, 24/7 custom Looker Studio dashboards tracking revenue, Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), organic keyword rankings, and pipeline velocity. You receive weekly agile check-ins and monthly executive strategy reviews with transparent multi-touch attribution.",
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    const faqId = `faq_da_${Date.now()}_${i}`;
    await conn.query(
      "INSERT INTO servicefaq (id, serviceId, question, answer, `order`) VALUES (?, ?, ?, ?, ?)",
      [faqId, serviceId, f.question, f.answer, i]
    );
  }
  console.log(`✅ Inserted ${faqs.length} FAQs for Digital Agency`);

  // 3. Link with all active locations in servicelocation
  const [locResult] = await conn.query(
    `INSERT INTO servicelocation (id, serviceId, locationId, published, createdAt, updatedAt)
     SELECT 
       CONCAT('sl_', SUBSTRING(MD5(CONCAT(?, '_', l.id)), 1, 16)) AS id,
       ? AS serviceId,
       l.id AS locationId,
       1 AS published,
       NOW() AS createdAt,
       NOW() AS updatedAt
     FROM location l
     WHERE l.isActive = 1
     ON DUPLICATE KEY UPDATE published = 1`,
    [serviceId, serviceId]
  );
  console.log("✅ Linked Digital Agency with all locations in database:", locResult.affectedRows, "rows affected");

  // 4. Generate standalone SQL file for server deployment
  const sqlDump = `-- ========================================================
-- GGM Technologies: Add Digital Agency Service (10th Service)
-- ========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert Service
INSERT INTO \`service\` (\`id\`, \`slug\`, \`index\`, \`title\`, \`promise\`, \`description\`, \`bullets\`, \`ogImage\`, \`metaTitle\`, \`metaDescription\`, \`noIndex\`, \`createdAt\`, \`updatedAt\`)
VALUES (
  'srv_digital_agency',
  'digital-agency',
  '10',
  'Digital Agency',
  ${conn.escape(promise)},
  ${conn.escape(description)},
  ${conn.escape(bullets)},
  '/images/services/digital-agency.jpg',
  ${conn.escape(metaTitle)},
  ${conn.escape(metaDescription)},
  0,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  \`title\` = VALUES(\`title\`),
  \`index\` = VALUES(\`index\`),
  \`promise\` = VALUES(\`promise\`),
  \`description\` = VALUES(\`description\`),
  \`bullets\` = VALUES(\`bullets\`),
  \`ogImage\` = VALUES(\`ogImage\`),
  \`metaTitle\` = VALUES(\`metaTitle\`),
  \`metaDescription\` = VALUES(\`metaDescription\`),
  \`updatedAt\` = NOW(3);

-- 2. Insert FAQs
DELETE FROM \`servicefaq\` WHERE \`serviceId\` = 'srv_digital_agency';

${faqs
  .map(
    (f, idx) =>
      `INSERT INTO \`servicefaq\` (\`id\`, \`serviceId\`, \`question\`, \`answer\`, \`order\`) VALUES ('faq_da_${idx + 1}', 'srv_digital_agency', ${conn.escape(
        f.question
      )}, ${conn.escape(f.answer)}, ${idx});`
  )
  .join("\n")}

-- 3. Link with all Active Locations
INSERT INTO \`servicelocation\` (\`id\`, \`serviceId\`, \`locationId\`, \`published\`, \`createdAt\`, \`updatedAt\`)
SELECT 
  CONCAT('sl_', SUBSTRING(MD5(CONCAT('srv_digital_agency', '_', l.id)), 1, 16)) AS \`id\`,
  'srv_digital_agency' AS \`serviceId\`,
  l.id AS \`locationId\`,
  1 AS \`published\`,
  NOW() AS \`createdAt\`,
  NOW() AS \`updatedAt\`
FROM \`location\` l
WHERE l.isActive = 1
ON DUPLICATE KEY UPDATE \`published\` = 1;

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'digital_agency_setup_complete' AS status, COUNT(*) AS live_locations 
FROM \`servicelocation\` 
WHERE \`serviceId\` = 'srv_digital_agency';
`;

  fs.writeFileSync("add_digital_agency_service.sql", sqlDump, "utf8");
  console.log("✅ Generated add_digital_agency_service.sql for server deployment!");

  await conn.end();
}

main().catch((err) => {
  console.error("Error setting up Digital Agency:", err);
  process.exit(1);
});
