import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";

async function main() {
  const pool = mysql.createPool(dbUrl);

  console.log("Checking columns in SiteSettings table...");
  const [cols] = await pool.query("DESCRIBE `SiteSettings`");
  const existingCols = new Set(cols.map((c) => c.Field));

  const newColumns = [
    { name: "whatsapp", type: "VARCHAR(255) NULL DEFAULT '+919876543210'" },
    { name: "facebook", type: "VARCHAR(255) NULL DEFAULT 'https://facebook.com/ggmtechnologies'" },
    { name: "twitter", type: "VARCHAR(255) NULL DEFAULT 'https://x.com/ggmtechnologies'" },
    { name: "instagram", type: "VARCHAR(255) NULL DEFAULT 'https://instagram.com/ggmtechnologies'" },
    { name: "youtube", type: "VARCHAR(255) NULL DEFAULT 'https://youtube.com/@ggmtechnologies'" },
    { name: "linkedin", type: "VARCHAR(255) NULL DEFAULT 'https://linkedin.com/company/ggmtechnologies'" },
    { name: "msme", type: "VARCHAR(255) NULL DEFAULT 'UDYAM-DL-08-0098741'" },
    { name: "indiamartSeal", type: "VARCHAR(255) NULL DEFAULT 'Verified Trust Seal Member'" },
    { name: "justdialSeal", type: "VARCHAR(255) NULL DEFAULT 'Justdial Verified Enterprise'" },
    { name: "googleBusinessUrl", type: "VARCHAR(255) NULL DEFAULT 'https://maps.google.com/?cid=ggmtechnologies'" },
    { name: "ceoName", type: "VARCHAR(255) NULL DEFAULT 'Executive Leadership'" },
    { name: "ceoTitle", type: "VARCHAR(255) NULL DEFAULT 'Founder & Chief Executive Officer'" },
    { name: "ceoBio", type: "LONGTEXT NULL" },
    { name: "companyStory", type: "LONGTEXT NULL" },
    { name: "qualityCompliance", type: "LONGTEXT NULL" },
  ];

  for (const col of newColumns) {
    if (!existingCols.has(col.name)) {
      console.log(`Adding column ${col.name}...`);
      await pool.query(`ALTER TABLE \`SiteSettings\` ADD COLUMN \`${col.name}\` ${col.type};`);
    }
  }

  // Populate default rich data for CEO, Company, and Quality if null
  await pool.query(`
    UPDATE \`SiteSettings\`
    SET 
      whatsapp = IFNULL(whatsapp, '+919876543210'),
      facebook = IFNULL(facebook, 'https://facebook.com/ggmtechnologies'),
      twitter = IFNULL(twitter, 'https://x.com/ggmtechnologies'),
      instagram = IFNULL(instagram, 'https://instagram.com/ggmtechnologies'),
      youtube = IFNULL(youtube, 'https://youtube.com/@ggmtechnologies'),
      linkedin = IFNULL(linkedin, 'https://linkedin.com/company/ggmtechnologies'),
      msme = IFNULL(msme, 'UDYAM-DL-08-0098741'),
      indiamartSeal = IFNULL(indiamartSeal, 'Verified Trust Seal Member'),
      justdialSeal = IFNULL(justdialSeal, 'Justdial Verified Enterprise'),
      googleBusinessUrl = IFNULL(googleBusinessUrl, 'https://maps.google.com/?cid=ggmtechnologies'),
      ceoName = IFNULL(ceoName, 'Chirag Kumar'),
      ceoTitle = IFNULL(ceoTitle, 'Founder & Chief Executive Officer'),
      ceoBio = IFNULL(ceoBio, 'Driven by an uncompromising commitment to transparent, numbers-backed digital growth, Chirag Kumar founded GGM Technologies to bridge the gap between creative marketing strategy and hardcore engineering precision. With over a decade of hands-on experience scaling D2C brands, B2B enterprises, and multinational eCommerce storefronts, he leads the agency with an algorithmic, ROI-first mindset.'),
      companyStory = IFNULL(companyStory, 'Founded in New Delhi, GGM Technologies emerged from a single realization: vanity metrics do not pay salaries. From our flagship headquarters in South Delhi, we have engineered full-funnel digital infrastructure for over 250+ brands globally. Our cross-functional team unites certified technical SEO specialists, conversion-rate optimization architects, Full-Stack Next.js engineers, and certified Google & Meta ad buyers.'),
      qualityCompliance = IFNULL(qualityCompliance, 'Quality and client accountability form the bedrock of every engagement at GGM Technologies. We maintain 100% adherence to Google Search Essentials white-hat guidelines, strict ISO 27001 data security compliance, and certified enterprise partner protocols with Google, Meta, and Shopify.')
    WHERE id = 'settings_1' OR id = (SELECT id FROM (SELECT id FROM \`SiteSettings\` LIMIT 1) as t);
  `);

  console.log("✓ SiteSettings schema updated and populated successfully!");
  await pool.end();
}

main().catch((err) => {
  console.error("Error updating settings schema:", err);
  process.exit(1);
});
