import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
  });

  const id = `lead_test_${Date.now()}`;
  const name = "Test Manual Lead";
  const phone = "+919876543210";
  const email = "test@example.com";
  const companyName = "Test Company";
  const location = "Delhi";
  const serviceSlug = "seo";
  const serviceTitle = "SEO Services";
  const source = "MANUAL";
  const status = "NEW";
  const approxAmount = "₹25,000";
  const fixAmount = "₹28,000";
  const advancePaid = "₹10,000";
  const balanceDue = "₹18,000";
  const paymentStatus = "PARTIAL";
  const quotationSent = 1;
  const nextFollowUp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const nextPaymentDate = null;
  const notesArray = JSON.stringify([{ id: "note_1", text: "Test note", createdAt: new Date().toISOString(), author: "Admin" }]);

  console.log("Checking CrmLead column data types...");
  const [cols] = await pool.query("DESCRIBE `CrmLead`");
  cols.forEach((c) => console.log(`  - ${c.Field}: ${c.Type}`));

  try {
    await pool.query(
      `INSERT INTO \`CrmLead\`
       (\`id\`, \`name\`, \`phone\`, \`email\`, \`companyName\`, \`location\`, \`serviceSlug\`, \`serviceTitle\`, \`source\`, \`status\`, \`approxAmount\`, \`fixAmount\`, \`advancePaid\`, \`balanceDue\`, \`paymentStatus\`, \`quotationSent\`, \`nextFollowUp\`, \`nextPaymentDate\`, \`timelineNotes\`, \`createdAt\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))`,
      [
        id,
        name,
        phone,
        email,
        companyName,
        location,
        serviceSlug,
        serviceTitle,
        source,
        status,
        approxAmount,
        fixAmount,
        advancePaid,
        balanceDue,
        paymentStatus,
        quotationSent,
        nextFollowUp,
        nextPaymentDate,
        notesArray,
      ]
    );

    console.log("✅ INSERT SUCCESSFUL! Lead ID:", id);

    // Fetch back
    const [rows] = await pool.query("SELECT * FROM `CrmLead` WHERE `id` = ?", [id]);
    console.log("Fetched Lead:", rows[0]);

    // Clean up test row
    await pool.query("DELETE FROM `CrmLead` WHERE `id` = ?", [id]);
    console.log("Test lead cleaned up.");
  } catch (err) {
    console.error("❌ INSERT FAILED:", err);
  }

  await pool.end();
}

main();
