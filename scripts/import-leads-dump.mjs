import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const possibleFiles = [
    "leads_dump.sql",
    "crm_leads.sql",
    "leads.sql",
    "backup.sql",
    "leads.json",
    "crm_leads.json",
  ];

  const targetFile = possibleFiles.find((f) => fs.existsSync(f));

  if (!targetFile) {
    console.log("==================================================================");
    console.log("ℹ️ No leads dump file found in project root.");
    console.log("To import all 73 leads from WHM / phpMyAdmin:");
    console.log("1. Export the `CrmLead` table from WHM / phpMyAdmin (as SQL or JSON).");
    console.log("2. Save it as `leads_dump.sql` (or `crm_leads.sql` / `leads.json`) in the ggm-web folder.");
    console.log("3. Run: node scripts/import-leads-dump.mjs");
    console.log("==================================================================");
    return;
  }

  console.log(`🚀 Found dump file: ${targetFile}. Reading...`);
  const content = fs.readFileSync(targetFile, "utf8");

  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    multipleStatements: true,
  });

  if (targetFile.endsWith(".json")) {
    try {
      const data = JSON.parse(content);
      const rows = Array.isArray(data) ? data : data.rows || data.data || [];
      console.log(`Parsed ${rows.length} rows from JSON. Inserting...`);
      for (const r of rows) {
        await conn.query(
          `INSERT INTO \`CrmLead\` 
           (\`id\`, \`name\`, \`phone\`, \`email\`, \`companyName\`, \`location\`, \`serviceSlug\`, \`serviceTitle\`, \`source\`, \`status\`, \`approxAmount\`, \`fixAmount\`, \`advancePaid\`, \`balanceDue\`, \`paymentStatus\`, \`quotationSent\`, \`nextFollowUp\`, \`nextPaymentDate\`, \`timelineNotes\`, \`createdAt\`, \`updatedAt\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             \`name\` = VALUES(\`name\`),
             \`phone\` = VALUES(\`phone\`),
             \`email\` = VALUES(\`email\`),
             \`companyName\` = VALUES(\`companyName\`),
             \`location\` = VALUES(\`location\`),
             \`status\` = VALUES(\`status\`),
             \`approxAmount\` = VALUES(\`approxAmount\`),
             \`fixAmount\` = VALUES(\`fixAmount\`),
             \`advancePaid\` = VALUES(\`advancePaid\`),
             \`balanceDue\` = VALUES(\`balanceDue\`),
             \`paymentStatus\` = VALUES(\`paymentStatus\`),
             \`quotationSent\` = VALUES(\`quotationSent\`),
             \`nextFollowUp\` = VALUES(\`nextFollowUp\`),
             \`nextPaymentDate\` = VALUES(\`nextPaymentDate\`),
             \`timelineNotes\` = VALUES(\`timelineNotes\`),
             \`updatedAt\` = VALUES(\`updatedAt\`)`,
          [
            r.id,
            r.name,
            r.phone,
            r.email || null,
            r.companyName || null,
            r.location || null,
            r.serviceSlug || "general",
            r.serviceTitle || "General Consultation",
            r.source || "Website Form",
            r.status || "NEW",
            r.approxAmount ? String(r.approxAmount) : null,
            r.fixAmount ? String(r.fixAmount) : null,
            r.advancePaid ? String(r.advancePaid) : null,
            r.balanceDue ? String(r.balanceDue) : null,
            r.paymentStatus || "PENDING",
            r.quotationSent ? 1 : 0,
            r.nextFollowUp ? new Date(r.nextFollowUp) : null,
            r.nextPaymentDate ? new Date(r.nextPaymentDate) : null,
            typeof r.timelineNotes === "string" ? r.timelineNotes : JSON.stringify(r.timelineNotes || []),
            r.createdAt ? new Date(r.createdAt) : new Date(),
            r.updatedAt ? new Date(r.updatedAt) : new Date(),
          ]
        );
      }
    } catch (e) {
      console.error("Failed to parse/insert JSON leads:", e.message);
    }
  } else {
    // SQL file: run queries directly
    console.log("Executing SQL dump...");
    await conn.query(content);
  }

  const [countRes] = await conn.query("SELECT COUNT(*) as count FROM `CrmLead`");
  console.log(`✅ Leads import finished! Total leads in local database: ${countRes[0].count}`);

  await conn.end();
}

main().catch(console.error);
