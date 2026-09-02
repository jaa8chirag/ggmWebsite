import mysql from "mysql2/promise";

async function main() {
  const pool = mysql.createPool({
    uri: "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    ssl: { rejectUnauthorized: false },
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`SeoSettings\` (
      \`id\` VARCHAR(191) NOT NULL PRIMARY KEY,
      \`ahrefsVerification\` VARCHAR(255) NULL,
      \`googleVerification\` VARCHAR(255) NULL,
      \`ahrefsApiKey\` VARCHAR(255) NULL,
      \`targetDomain\` VARCHAR(255) NOT NULL DEFAULT 'ggmtechnologies.com',
      \`keywords\` JSON NULL,
      \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    INSERT INTO \`SeoSettings\` (\`id\`, \`googleVerification\`, \`targetDomain\`, \`keywords\`)
    VALUES ('seo_settings_1', 'google37f47672baefed8c', 'ggmtechnologies.com', JSON_ARRAY('Digital Marketing Agency in Delhi', 'SEO Services Delhi', 'Web Development Company Delhi'))
    ON DUPLICATE KEY UPDATE \`googleVerification\` = VALUES(\`googleVerification\`);
  `);

  console.log("✓ SeoSettings table created and seeded in TiDB Cloud!");
  await pool.end();
}

main().catch(console.error);
