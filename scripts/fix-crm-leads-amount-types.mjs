import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
  });

  console.log("Altering approxAmount and fixAmount in CrmLead to VARCHAR(255)...");
  
  try {
    await pool.query("ALTER TABLE `CrmLead` MODIFY COLUMN `approxAmount` VARCHAR(255) NULL");
    console.log("✅ approxAmount column updated to VARCHAR(255)");
  } catch (err) {
    console.error("Error altering approxAmount:", err);
  }

  try {
    await pool.query("ALTER TABLE `CrmLead` MODIFY COLUMN `fixAmount` VARCHAR(255) NULL");
    console.log("✅ fixAmount column updated to VARCHAR(255)");
  } catch (err) {
    console.error("Error altering fixAmount:", err);
  }

  console.log("Describing CrmLead table to verify:");
  const [cols] = await pool.query("DESCRIBE `CrmLead`");
  cols.forEach((c) => {
    if (["approxAmount", "fixAmount", "advancePaid", "balanceDue"].includes(c.Field)) {
      console.log(`  - ${c.Field}: ${c.Type}`);
    }
  });

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
