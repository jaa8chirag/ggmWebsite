import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const pool = mysql.createPool(process.env.DATABASE_URL);
  
  const [tables] = await pool.query("SHOW TABLES");
  console.log("==================================================");
  console.log("📊 TABLES PRESENT IN LOCAL MYSQL (ggmwebsite):");
  console.log("==================================================");
  tables.forEach((t) => console.log("  - " + Object.values(t)[0]));

  const [cols] = await pool.query("DESCRIBE SeoSettings");
  console.log("\n==================================================");
  console.log("🛠️ STRUCTURE OF NEW SeoSettings TABLE:");
  console.log("==================================================");
  cols.forEach((c) => console.log(`  - ${c.Field}: ${c.Type} (Null: ${c.Null})`));

  const [rows] = await pool.query("SELECT * FROM SeoSettings");
  console.log("\n==================================================");
  console.log("💾 LIVE RECORD IN SeoSettings:");
  console.log("==================================================");
  console.log(rows[0]);

  await pool.end();
}

main().catch((err) => console.error(err));
