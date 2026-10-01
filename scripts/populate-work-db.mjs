import fs from 'fs';
import mysql from 'mysql2/promise';

const workItems = [
  {
    id: "work_1000",
    slug: "vivek-patel",
    client: "Mr. Vivek Patel",
    category: "Shopify Development · Vivek Patel Studio",
    summary: "The primary objective is to design and develop a modern, premium, and conversion-focused Shopify website for Vivek Patel Studio that reflects the brand’s identity, showcases its products and collections in an engaging manner, and provides customers with a smooth and user-friendly shopping experience.",
    resultLabel: "+312% Organic Growth",
    variant: "interiors",
    order: 0,
    ogImage: "/images/uploads/work/vivek-patel_1789056701864.jpg",
    canonicalOverride: "https://vivekpatelstudio.com/"
  },
  {
    id: "work_1001",
    slug: "vantage-fitness",
    client: "Vantage Fitness",
    category: "PPC · Performance Lead Gen",
    summary: "Restructured a fragmented Google Ads account into tightly themed campaigns with conversion-tuned landing pages, driving massive qualified client acquisition.",
    resultLabel: "3.9x Blended ROAS",
    variant: "fitness",
    order: 1,
    ogImage: "/images/lead-generation-banner.png",
    canonicalOverride: null
  },
  {
    id: "work_1002",
    slug: "orn-properties",
    client: "Miss. Bhavana Panjabi",
    category: "WordPress Web Development · ORN Properties",
    summary: "Designed and developed a modern, responsive WordPress website for ORN Properties, a real estate consultancy. The website features property listings, advanced property search, property categories, service highlights, and lead generation sections.",
    resultLabel: "98+ Core Web Vitals Score",
    variant: "ecommerce",
    order: 2,
    ogImage: "/images/uploads/work/orn-properties_1789056701970.jpg",
    canonicalOverride: "https://ornproperties.com/"
  },
  {
    id: "work_1788954548356_mnya9",
    slug: "porous-materials-inc",
    client: "Porous Materials Inc",
    category: "Next.js Custom Development · PMIAPP",
    summary: "Engineered a high-performance Next.js enterprise platform for Porous Materials Inc to showcase complex technical machinery, improve global technical brand visibility, and streamline B2B inquiries across desktop and mobile.",
    resultLabel: "Sub-Second Global Load Time",
    variant: "interiors",
    order: 3,
    ogImage: "/images/uploads/work/porous-materials-inc_1789056702066.jpg",
    canonicalOverride: "https://pmi-website-pied.vercel.app/"
  },
  {
    id: "work_1788954890643_7af2e",
    slug: "arvind-rai",
    client: "Mr. Arvind Rai",
    category: "Next.js Web Application · Astrologer Arvind Rai",
    summary: "Designed and developed a modern, SEO-friendly consultation portal with Next.js for Astrologer Arvind Rai. Features fast server-side rendering, online booking appointments, client testimonials, and educational astrology blogs.",
    resultLabel: "Instant Online Booking Engine",
    variant: "interiors",
    order: 4,
    ogImage: "/images/uploads/work/arvind-rai_1789056702172.jpg",
    canonicalOverride: "https://arvindrai.com/"
  },
  {
    id: "work_1788955330688_7svkn",
    slug: "nisha",
    client: "Miss Nisha",
    category: "Next.js Travel Portal · Pakyong",
    summary: "Built a visually captivating, ultra-fast travel and exploration portal on Next.js for Pakyong. Engineered for seamless destination discovery, dynamic itinerary browsing, and high-intent tourist lead capture.",
    resultLabel: "100% Mobile Responsive UX",
    variant: "interiors",
    order: 5,
    ogImage: "/images/uploads/work/nisha_1789056702275.jpg",
    canonicalOverride: "https://pakyong.com/"
  },
  {
    id: "work_1788955619768_qolog",
    slug: "aditya",
    client: "Mr. Aditya Singh",
    category: "Next.js Enterprise · Orchid Company",
    summary: "Developed a modern, corporate digital presence utilizing Next.js for Orchid Company. Built with custom interactive modules, enterprise-grade architecture, and fast load speeds across all screen sizes.",
    resultLabel: "Enterprise-Grade Performance",
    variant: "interiors",
    order: 6,
    ogImage: "/images/uploads/work/aditya_1789056702375.jpg",
    canonicalOverride: "https://orchidcompany.com/"
  },
  {
    id: "work_1788956192551_amlf4",
    slug: "anurag",
    client: "Mr. Anurag Aman",
    category: "WordPress Creative Studio · Kalakaar Design",
    summary: "Crafted a bespoke creative studio website for Kalakaar Design Studios. Combines engaging visual showcases, fluid gallery micro-interactions, and conversion-optimized inquiry forms.",
    resultLabel: "High-Engagement Visual Portfolio",
    variant: "interiors",
    order: 7,
    ogImage: "/images/uploads/work/anurag_1789056702472.jpg",
    canonicalOverride: "https://kalakaardesignstudios.com/"
  },
  {
    id: "work_1788956623722_28qtj",
    slug: "guru-govind-mahesh",
    client: "Mr. Guru Govind Mahesh",
    category: "WordPress Corporate Platform",
    summary: "Delivered a clean, authoritative corporate website with tailored typography, custom contact touchpoints, and solid search engine foundation for Guru Govind Mahesh.",
    resultLabel: "Authority & Trust Driven Design",
    variant: "interiors",
    order: 8,
    ogImage: "/images/uploads/work/guru-govind-mahesh_1789056702568.jpg",
    canonicalOverride: "https://gurugovindmaheesh.com/"
  },
  {
    id: "work_1788957275268_vjhiw",
    slug: "abhishek",
    client: "Mr. Abhishek Singh",
    category: "WordPress Development Service",
    summary: "Constructed an intuitive, high-speed WordPress solution featuring streamlined navigation, clear service presentations, and mobile-first responsiveness.",
    resultLabel: "Optimized Customer Funnel",
    variant: "interiors",
    order: 9,
    ogImage: "/images/uploads/work/abhishek_1789056702665.jpg",
    canonicalOverride: null
  },
  {
    id: "work_1788963019486_y1io4",
    slug: "mukesh",
    client: "Mr. Mukesh",
    category: "Web Development · Oviz Consulting",
    summary: "Architected a full corporate advisory website for Oviz Consulting. Includes structured service verticals, consultant expertise highlights, and lead qualification workflows.",
    resultLabel: "B2B Lead Pipeline Activated",
    variant: "interiors",
    order: 10,
    ogImage: "/images/uploads/work/mukesh_1789056702765.jpg",
    canonicalOverride: "https://oviz.ggmtechnologies.com/"
  }
];

// Generate SQL migration file
let sql = `-- ====================================================================
-- GGM Technologies: Populate Real Case Studies & Work Showcase
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM \`casestudy\` WHERE 1=1;

`;

workItems.forEach(w => {
  const esc = (txt) => (txt ? txt.replace(/'/g, "\\'") : '');
  sql += `INSERT INTO \`casestudy\` (\`id\`, \`slug\`, \`client\`, \`category\`, \`summary\`, \`resultLabel\`, \`variant\`, \`order\`, \`createdAt\`, \`updatedAt\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`)
VALUES ('${w.id}', '${w.slug}', '${esc(w.client)}', '${esc(w.category)}', '${esc(w.summary)}', '${esc(w.resultLabel)}', '${w.variant}', ${w.order}, NOW(3), NOW(3), '${w.ogImage}', ${w.canonicalOverride ? `'${w.canonicalOverride}'` : 'NULL'}, 0)
ON DUPLICATE KEY UPDATE
  \`client\` = VALUES(\`client\`),
  \`category\` = VALUES(\`category\`),
  \`summary\` = VALUES(\`summary\`),
  \`resultLabel\` = VALUES(\`resultLabel\`),
  \`variant\` = VALUES(\`variant\`),
  \`order\` = VALUES(\`order\`),
  \`ogImage\` = VALUES(\`ogImage\`),
  \`canonicalOverride\` = VALUES(\`canonicalOverride\`),
  \`updatedAt\` = NOW(3);

`;
});

fs.writeFileSync('populate_work_case_studies.sql', sql);
console.log('Generated populate_work_case_studies.sql');

// Update local database
(async () => {
  try {
    const conn = await mysql.createConnection('mysql://root:Chirag30kum%40r@127.0.0.1:3306/ggmwebsite');
    console.log('Connected to local database');
    
    await conn.execute('DELETE FROM `CaseStudy` WHERE 1=1');
    console.log('Cleared existing CaseStudy rows in local DB');
    
    for (const w of workItems) {
      await conn.execute(
        `INSERT INTO \`CaseStudy\` (\`id\`, \`slug\`, \`client\`, \`category\`, \`summary\`, \`resultLabel\`, \`variant\`, \`order\`, \`createdAt\`, \`updatedAt\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3), ?, ?, 0)`,
        [w.id, w.slug, w.client, w.category, w.summary, w.resultLabel, w.variant, w.order, w.ogImage, w.canonicalOverride]
      );
    }
    
    const [countRes] = await conn.execute('SELECT COUNT(*) as cnt FROM `CaseStudy`');
    console.log('Local CaseStudy count now:', countRes[0].cnt);
    await conn.end();
  } catch (err) {
    console.error('Local DB update error:', err);
  }
})();
