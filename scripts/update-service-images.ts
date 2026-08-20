import { pool } from "../src/lib/db";

async function main() {
  const imageMap: Record<string, string> = {
    seo: "/images/services/seo.jpg",
    ppc: "/images/services/ppc.jpg",
    "website-development": "/images/services/web-development.jpg",
    "lead-generation": "/images/services/lead-generation.jpg",
    "social-media-marketing": "/images/services/social-media-marketing.jpg",
    "shopify-wordpress": "/images/services/shopify-wordpress.jpg",
  };

  for (const [slug, img] of Object.entries(imageMap)) {
    await pool.query("UPDATE `Service` SET ogImage = ? WHERE slug = ?", [img, slug]);
    console.log(`Updated ${slug} -> ${img}`);
  }

  const [after] = await pool.query<any[]>("SELECT id, slug, title, ogImage FROM `Service`");
  console.log("Services after update:", after);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
