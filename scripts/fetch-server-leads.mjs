import mysql from "mysql2/promise";
import dotenv from "dotenv";

import fs from "fs";

if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
}
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}

const SERVER_URL = "https://ggmtechnologies.com/api/admin/crm/sync-leads?secret=ggm_leads_sync_2026";
const DB_URL = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@127.0.0.1:3306/ggmwebsite";

async function main() {
  console.log(`🌐 Fetching leads from production server (${SERVER_URL})...`);
  try {
    const res = await fetch(SERVER_URL);
    if (!res.ok) {
      console.log(`⚠️ Production server responded with status: ${res.status}. (If you haven't deployed the latest commit yet, please deploy first or drop your WHM dump file into ggm-web/leads_dump.sql).`);
      return;
    }
    const data = await res.json();
    if (!data.success || !Array.isArray(data.leads)) {
      console.log("⚠️ Unexpected response format:", data);
      return;
    }

    console.log(`✅ Successfully fetched ${data.leads.length} leads from production server!`);
    const conn = await mysql.createConnection(DB_URL);

    for (const r of data.leads) {
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

    const [count] = await conn.query("SELECT COUNT(*) as c FROM `CrmLead`");
    console.log(`🎉 Sync complete! Total leads in local database: ${count[0].c}`);
    await conn.end();
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

main().catch(console.error);
