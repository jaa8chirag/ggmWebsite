import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
}
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}

const dbUrl = process.env.DATABASE_URL || "mysql://ggmuser:GgmSecurePass@2026@127.0.0.1:3306/ggmwebsite";

const TABLE_MAPPINGS = [
  ["sitesettings", "SiteSettings"],
  ["blogpost", "BlogPost"],
  ["blogblock", "BlogBlock"],
  ["blogfaq", "BlogFaq"],
  ["casestudy", "CaseStudy"],
  ["product", "Product"],
  ["productspec", "ProductSpec"],
  ["testimonial", "Testimonial"],
  ["legalpage", "LegalPage"],
  ["certificatedocument", "CertificateDocument"],
  ["quoterequest", "QuoteRequest"],
  ["whychooseus", "WhyChooseUs"],
  ["metricitem", "MetricItem"],
  ["adminuser", "AdminUser"],
  ["adminsession", "AdminSession"],
  ["service", "Service"],
  ["servicefaq", "ServiceFaq"],
  ["servicelocation", "ServiceLocation"],
  ["location", "Location"],
  ["crmlead", "CrmLead"],
  ["seosettings", "SeoSettings"],
];

async function main() {
  console.log("Connecting to database...");
  const conn = await mysql.createConnection(dbUrl);
  console.log("Connected successfully!");

  const [rows] = await conn.query("SHOW TABLES");
  const existingTables = rows.map((r) => Object.values(r)[0]);
  console.log("Existing tables:", existingTables);

  for (const [lower, pascal] of TABLE_MAPPINGS) {
    const hasLower = existingTables.includes(lower);
    const hasPascal = existingTables.includes(pascal);

    if (hasLower && !hasPascal) {
      console.log(`Renaming table \`${lower}\` -> \`${pascal}\`...`);
      try {
        await conn.query(`RENAME TABLE \`${lower}\` TO \`${pascal}\``);
        console.log(`✓ Renamed \`${lower}\` to \`${pascal}\``);
      } catch (err) {
        console.log(`Rename failed, creating VIEW instead: ${err.message}`);
        try {
          await conn.query(`CREATE OR REPLACE VIEW \`${pascal}\` AS SELECT * FROM \`${lower}\``);
          console.log(`✓ Created VIEW \`${pascal}\` -> \`${lower}\``);
        } catch (vErr) {
          console.error(`Failed to create view: ${vErr.message}`);
        }
      }
    } else if (hasPascal) {
      console.log(`✓ Table \`${pascal}\` already exists.`);
    } else {
      console.log(`⚠️ Neither \`${lower}\` nor \`${pascal}\` found.`);
    }
  }

  // Create missing utility tables if not present
  console.log("Ensuring supporting tables exist...");
  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`MetricItem\` (
      \`id\` varchar(191) NOT NULL PRIMARY KEY,
      \`settingsId\` varchar(191) NOT NULL,
      \`value\` varchar(191) NOT NULL,
      \`suffix\` varchar(50) DEFAULT '+',
      \`label\` varchar(255) NOT NULL,
      \`order\` int NOT NULL DEFAULT 0,
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`AdminUser\` (
      \`id\` varchar(191) NOT NULL PRIMARY KEY,
      \`email\` varchar(191) NOT NULL UNIQUE,
      \`passwordHash\` varchar(255) NOT NULL,
      \`name\` varchar(191) DEFAULT 'Admin',
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`AdminSession\` (
      \`id\` varchar(191) NOT NULL PRIMARY KEY,
      \`token\` varchar(255) NOT NULL UNIQUE,
      \`adminUserId\` varchar(191) NOT NULL,
      \`expiresAt\` datetime(3) NOT NULL,
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log("✓ Supporting tables verified!");

  await conn.end();
  console.log("All done!");
}

main().catch(console.error);
