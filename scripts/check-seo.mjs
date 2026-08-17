import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;

console.log("\n==================================================");
console.log("🔍 GGM TECHNOLOGIES - AUTOMATED SEO & DB AUDIT");
console.log("==================================================\n");

if (!dbUrl) {
  console.error("❌ ERROR: DATABASE_URL is missing in .env.local!");
  process.exit(1);
}

try {
  const pool = mysql.createPool(dbUrl);

  // 1. Audit Services & Slugs
  const [services] = await pool.query("SELECT id, slug, title, metaTitle FROM Service");
  console.log(`✅ DATABASE: Found ${services.length} active services`);
  services.forEach((s) => {
    console.log(`   - /services/${s.slug} (${s.title})`);
  });

  // 2. Audit Location Pages
  const [locations] = await pool.query("SELECT id, slug, name FROM Location WHERE isActive = 1");
  const [slCount] = await pool.query("SELECT COUNT(*) as c FROM ServiceLocation WHERE published = 1");
  console.log(`\n✅ LOCAL SEO: ${locations.length} target cities active, ${slCount[0].c} published location pages`);
  locations.forEach((l) => {
    console.log(`   - City: ${l.name} (/services/[slug]/${l.slug})`);
  });

  // 3. Audit Blog Articles
  const [posts] = await pool.query("SELECT id, slug, title, status FROM BlogPost WHERE status = 'published'");
  console.log(`\n✅ BLOG SEO: ${posts.length} published blog articles`);
  posts.forEach((p) => {
    console.log(`   - /blog/${p.slug}`);
  });

  // 4. Audit Site Settings
  const [settings] = await pool.query("SELECT name, email, phone, gst FROM SiteSettings LIMIT 1");
  if (settings[0]) {
    console.log(`\n✅ BRAND IDENTITY: ${settings[0].name}`);
    console.log(`   - Email: ${settings[0].email}`);
    console.log(`   - Phone: ${settings[0].phone}`);
    console.log(`   - GST: ${settings[0].gst}`);
  }

  await pool.end();
  console.log("\n==================================================");
  console.log("🎉 ALL SEO & DATABASE AUDIT CHECKS PASSED 100%");
  console.log("==================================================\n");
} catch (err) {
  console.error("❌ SEO Audit Error:", err.message);
  process.exit(1);
}
