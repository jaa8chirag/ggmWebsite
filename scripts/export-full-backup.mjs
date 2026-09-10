import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TIDB_CLOUD_URL = "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite";
const dbUrl = process.env.DATABASE_URL || TIDB_CLOUD_URL;

async function runBackup() {
  console.log("Connecting to Database for full backup...");
  const conn = await mysql.createConnection({
    uri: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(__dirname, "..", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const [tables] = await conn.query("SHOW TABLES");
  const tableNames = tables.map((t) => Object.values(t)[0]);

  console.log(`Found ${tableNames.length} tables in database:`, tableNames.join(", "));

  const fullData = {};
  let sqlDump = `-- GGM Technologies Complete Database Backup\n-- Generated on: ${new Date().toISOString()}\n\nSET FOREIGN_KEY_CHECKS = 0;\n\n`;

  for (const tableName of tableNames) {
    const [rows] = await conn.query(`SELECT * FROM \`${tableName}\``);
    fullData[tableName] = rows;

    const [createTableResult] = await conn.query(`SHOW CREATE TABLE \`${tableName}\``);
    const createSql = createTableResult[0]["Create Table"];

    sqlDump += `-- --------------------------------------------------------\n`;
    sqlDump += `-- Table structure for \`${tableName}\` (${rows.length} rows)\n`;
    sqlDump += `-- --------------------------------------------------------\n`;
    sqlDump += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
    sqlDump += `${createSql};\n\n`;

    if (rows.length > 0) {
      sqlDump += `-- Data for \`${tableName}\`\n`;
      for (const row of rows) {
        const columns = Object.keys(row).map((c) => `\`${c}\``).join(", ");
        const values = Object.values(row)
          .map((v) => {
            if (v === null || v === undefined) return "NULL";
            if (typeof v === "boolean" || typeof v === "number") return v;
            if (v instanceof Date) return `'${v.toISOString().slice(0, 19).replace("T", " ")}'`;
            if (typeof v === "object") return conn.escape(JSON.stringify(v));
            return conn.escape(String(v));
          })
          .join(", ");
        sqlDump += `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values});\n`;
      }
      sqlDump += `\n`;
    }
  }

  sqlDump += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  // Write JSON backup
  const jsonPath = path.join(backupDir, `backup_full_${timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(fullData, null, 2), "utf8");
  console.log(`Saved JSON backup to: ${jsonPath}`);

  // Write Timestamped SQL Backup
  const sqlPath = path.join(backupDir, `backup_full_${timestamp}.sql`);
  fs.writeFileSync(sqlPath, sqlDump, "utf8");
  console.log(`Saved SQL backup to: ${sqlPath}`);

  // Also update root ggm_web_dump.sql
  const rootSqlPath = path.join(__dirname, "..", "ggm_web_dump.sql");
  fs.writeFileSync(rootSqlPath, sqlDump, "utf8");
  console.log(`Updated root SQL file: ${rootSqlPath}`);

  await conn.end();
  console.log("Full database backup completed successfully!");
}

runBackup().catch((err) => {
  console.error("Backup failed:", err);
  process.exit(1);
});
