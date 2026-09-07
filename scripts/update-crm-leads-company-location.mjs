import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("No DATABASE_URL in .env.local");
    process.exit(1);
  }

  const pool = mysql.createPool({
    uri: dbUrl,
    ssl: { rejectUnauthorized: true },
  });

  console.log("Checking columns in CrmLead table...");
  const [cols] = await pool.query("DESCRIBE `CrmLead`");
  const colNames = cols.map((c) => c.Field);

  const newCols = [
    { name: "companyName", sql: "ALTER TABLE `CrmLead` ADD COLUMN `companyName` VARCHAR(255) NULL AFTER `email`" },
    { name: "location", sql: "ALTER TABLE `CrmLead` ADD COLUMN `location` VARCHAR(255) NULL AFTER `companyName`" },
  ];

  for (const col of newCols) {
    if (!colNames.includes(col.name)) {
      console.log(`Adding column ${col.name}...`);
      await pool.query(col.sql);
      console.log(`Column ${col.name} added successfully!`);
    } else {
      console.log(`Column ${col.name} already exists.`);
    }
  }

  console.log("CrmLead companyName and location schema migration complete!");
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
