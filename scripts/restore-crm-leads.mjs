import { execSync } from "child_process";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  console.log("Extracting CrmLead table and data from git backup a6edf1b...");
  const rawSql = execSync(
    'git show a6edf1b:backups/backup_full_2026-09-10T12-14-03-184Z.sql',
    { maxBuffer: 50 * 1024 * 1024 }
  ).toString("utf8");

  // Extract CrmLead part
  const match = rawSql.match(/DROP TABLE IF EXISTS `CrmLead`;[\s\S]*?(?=DROP TABLE IF EXISTS|SET FOREIGN_KEY_CHECKS|$)/);
  if (!match) {
    console.error("Could not find CrmLead section in backup");
    return;
  }

  const crmSql = match[0];
  console.log("Found CrmLead SQL snippet length:", crmSql.length);

  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    multipleStatements: true,
  });

  console.log("Applying to local MySQL database...");
  await conn.query(crmSql);

  const [rows] = await conn.query("SELECT COUNT(*) as count FROM `CrmLead`");
  console.log("✅ CrmLead table restored successfully! Row count:", rows[0].count);

  await conn.end();
}

main().catch(console.error);
