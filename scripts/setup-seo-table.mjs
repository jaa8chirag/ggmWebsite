import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("DATABASE_URL missing!");
  process.exit(1);
}

async function main() {
  const pool = mysql.createPool(dbUrl);

  const createSql = `
    CREATE TABLE IF NOT EXISTS \`SeoSettings\` (
      \`id\` VARCHAR(191) NOT NULL,
      \`ahrefsVerification\` VARCHAR(255) NULL,
      \`googleVerification\` VARCHAR(255) NULL,
      \`ahrefsApiKey\` VARCHAR(255) NULL,
      \`targetDomain\` VARCHAR(191) NOT NULL DEFAULT 'ggmtechnologies.com',
      \`keywords\` JSON NOT NULL,
      \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createSql);

  const initialKeywords = [
    "Digital Marketing Agency in Delhi",
    "SEO Services Delhi",
    "Web Development Company Delhi",
    "Lead Generation Agency Delhi",
    "PPC Agency Delhi",
    "Shopify Development Delhi",
  ];

  await pool.query(
    "INSERT IGNORE INTO `SeoSettings` (`id`, `targetDomain`, `keywords`) VALUES ('seo_settings_1', 'ggmtechnologies.com', ?)",
    [JSON.stringify(initialKeywords)]
  );

  console.log("✅ SUCCESS: SeoSettings table operational in MySQL!");
  await pool.end();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
