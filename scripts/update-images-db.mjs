import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;

async function main() {
  const pool = mysql.createPool(dbUrl);

  // Update Services
  await pool.query("UPDATE `Service` SET `ogImage` = '/images/seo-strategy-banner.png' WHERE `slug` LIKE '%seo%' OR `slug` LIKE '%marketing%'");
  await pool.query("UPDATE `Service` SET `ogImage` = '/images/web-development-banner.png' WHERE `slug` LIKE '%website%' OR `slug` LIKE '%shopify%' OR `slug` LIKE '%wordpress%'");
  await pool.query("UPDATE `Service` SET `ogImage` = '/images/lead-generation-banner.png' WHERE `slug` LIKE '%lead%' OR `slug` LIKE '%ppc%'");

  // Update Blog Posts
  await pool.query("UPDATE `BlogPost` SET `ogImage` = '/images/web-development-banner.png' WHERE `slug` LIKE '%website%' OR `slug` LIKE '%types%' OR `slug` LIKE '%rules%'");
  await pool.query("UPDATE `BlogPost` SET `ogImage` = '/images/lead-generation-banner.png' WHERE `slug` LIKE '%lead%'");
  await pool.query("UPDATE `BlogPost` SET `ogImage` = '/images/seo-strategy-banner.png' WHERE `slug` LIKE '%algorithm%' OR `slug` LIKE '%seo%'");

  // Update Case Studies
  await pool.query("UPDATE `CaseStudy` SET `ogImage` = '/images/lead-generation-banner.png'");

  // Update Products
  await pool.query("UPDATE `Product` SET `ogImage` = '/images/web-development-banner.png'");

  console.log("✅ SUCCESS: Database image paths updated across Services, Blogs, Case Studies & Products!");
  await pool.end();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
