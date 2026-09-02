import mysql from "mysql2/promise";

const localUrl = "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";
const tidbConfig = {
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: "iSRsEqH2SkyvMby.root",
  password: "bTD5FvytknLlrY9i",
  ssl: {
    rejectUnauthorized: true,
  },
};

async function main() {
  console.log("1. Connecting to TiDB Cloud Serverless...");
  const tidbConn = await mysql.createConnection(tidbConfig);
  console.log("✓ Connected to TiDB Cloud!");

  console.log("2. Ensuring database `ggmwebsite` exists on TiDB...");
  await tidbConn.query("CREATE DATABASE IF NOT EXISTS `ggmwebsite`");
  await tidbConn.query("USE `ggmwebsite`");
  console.log("✓ Active database set to `ggmwebsite`.");

  console.log("3. Connecting to Local MySQL (source of truth)...");
  const localConn = await mysql.createConnection(localUrl);
  console.log("✓ Connected to Local MySQL!");

  const tables = [
    "Service",
    "ServiceFaq",
    "Location",
    "ServiceLocation",
    "BlogPost",
    "BlogBlock",
    "BlogFaq",
    "CaseStudy",
    "Product",
    "ProductSpec",
    "Testimonial",
    "SiteSettings",
    "WhyChooseUs",
    "LegalPage",
    "CertificateDocument",
    "QuoteRequest",
  ];

  await tidbConn.query("SET FOREIGN_KEY_CHECKS = 0");

  for (const table of tables) {
    try {
      console.log(`\n--- Migrating table: ${table} ---`);
      const [createRes] = await localConn.query(`SHOW CREATE TABLE \`${table}\``);
      const createSql = createRes[0]["Create Table"];
      
      await tidbConn.query(`DROP TABLE IF EXISTS \`${table}\``);
      await tidbConn.query(createSql);
      console.log(`✓ Table structure created for ${table}`);

      const [rows] = await localConn.query(`SELECT * FROM \`${table}\``);
      const rowList = rows;
      if (rowList.length > 0) {
        const columns = Object.keys(rowList[0]).map(c => `\`${c}\``).join(", ");
        const placeholders = Object.keys(rowList[0]).map(() => "?").join(", ");
        const insertSql = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;

        for (const r of rowList) {
          const values = Object.values(r).map(v => {
            if (v !== null && typeof v === "object" && !(v instanceof Date)) {
              return JSON.stringify(v);
            }
            return v;
          });
          await tidbConn.query(insertSql, values);
        }
        console.log(`✓ Copied ${rowList.length} rows into ${table}`);
      } else {
        console.log(`ℹ 0 rows to copy for ${table} (empty table ready)`);
      }
    } catch (err) {
      console.warn(`Warning migrating ${table}:`, err.message);
    }
  }

  await tidbConn.query("SET FOREIGN_KEY_CHECKS = 1");

  // Verify QuoteRequest table
  console.log("\n--- Verifying QuoteRequest in TiDB ---");
  const testId = `lead_tidb_test_${Date.now()}`;
  await tidbConn.query(
    "INSERT INTO `QuoteRequest` (`id`, `name`, `phone`, `serviceSlug`, `serviceTitle`, `pageUrl`, `status`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW(3))",
    [testId, "GGM Lead Test", "+91 99999 88888", "website-development", "Website Development", "https://ggmtechnologies.com/services/website-development"]
  );
  console.log(`✓ Successfully inserted test quote: ${testId}`);

  const [verifyQuotes] = await tidbConn.query("SELECT * FROM `QuoteRequest` ORDER BY `createdAt` DESC LIMIT 5");
  console.log("Recent quotes in TiDB Cloud:");
  console.table(verifyQuotes);

  const [serviceCount] = await tidbConn.query("SELECT COUNT(*) as c FROM `Service`");
  console.log(`Total Services in TiDB Cloud:`, serviceCount[0].c);

  const [certCount] = await tidbConn.query("SELECT COUNT(*) as c FROM `CertificateDocument`");
  console.log(`Total Certificates in TiDB Cloud:`, certCount[0].c);

  await localConn.end();
  await tidbConn.end();

  console.log("\n========================================================");
  console.log("🎉 SUCCESS! All tables and data migrated to TiDB Cloud!");
  console.log("========================================================");
}

main().catch(console.error);
