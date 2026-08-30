import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/website-development.jpg",
    "website-development",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/seo.jpg",
    "seo",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/ppc.jpg",
    "ppc",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/lead-generation.jpg",
    "lead-generation",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/social-media-marketing.jpg",
    "social-media-marketing",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/shopify-development.jpg",
    "shopify-development",
  ]);
  await conn.query("UPDATE `Service` SET `ogImage` = ? WHERE `slug` = ?", [
    "/images/services/wordpress-development.jpg",
    "wordpress-development",
  ]);

  const [rows] = await conn.query("SELECT `slug`, `title`, `ogImage` FROM `Service` ORDER BY `index` ASC");
  console.log("Services and images in MySQL:");
  console.table(rows);

  await conn.end();
}

main().catch((err) => {
  console.error("Failed to update service images:", err);
  process.exit(1);
});
