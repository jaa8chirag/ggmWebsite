import mysql from "mysql2/promise";

async function updateDb(url, name) {
  try {
    const isCloud = url.includes("tidbcloud");
    const conn = await mysql.createConnection(
      isCloud ? { uri: url, ssl: { rejectUnauthorized: false } } : url
    );

    await conn.query(
      `UPDATE Service 
       SET 
         title = 'E-commerce Website Development Company',
         promise = 'Your Products Deserve a Store That Sells',
         description = 'We create simple, fast, and secure online stores made for your business.',
         metaTitle = 'E-Commerce Website Development Company in Delhi | GGM Technologies',
         metaDescription = 'We create simple, fast, and secure online stores made for your business. Shopify, WooCommerce, Next.js & custom eCommerce solutions by GGM Technologies.'
       WHERE slug = 'e-commerce' OR id = 'srv_1001'`
    );
    console.log(`✓ Updated E-Commerce Service in ${name}`);

    const [rows] = await conn.query("SELECT id, slug, title, promise, description FROM Service WHERE slug = 'e-commerce'");
    console.table(rows);

    await conn.end();
  } catch (err) {
    console.error(`Error in ${name}:`, err.message);
  }
}

async function main() {
  await updateDb(
    "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    "TiDB Cloud"
  );
  await updateDb(
    "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite",
    "Local MySQL"
  );
}

main().catch(console.error);
