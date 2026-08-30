import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";

const SEED_CERTIFICATES = [
  {
    id: "cert_msme",
    title: "MSME Udyam Registration Certificate",
    issuer: "Ministry of MSME, Govt. of India",
    certificateNo: "UDYAM-DL-08-0098741",
    pdfUrl: "/uploads/certificates/msme-udyam-certificate.pdf",
    description: "Official Micro, Small and Medium Enterprises registration for digital marketing and software engineering services.",
    issueDate: "2024",
    order: 0,
  },
  {
    id: "cert_gst",
    title: "GST Registration Certificate (Form REG-06)",
    issuer: "Goods and Services Tax Network, Govt. of India",
    certificateNo: "07AABCU9603R1ZM",
    pdfUrl: "/uploads/certificates/gst-registration-certificate.pdf",
    description: "Government tax compliance and verified enterprise entity status under Delhi State jurisdiction.",
    issueDate: "2024",
    order: 1,
  },
  {
    id: "cert_google",
    title: "Google Certified Partner & Search Ads Specialist",
    issuer: "Google Partners Academy",
    certificateNo: "GP-ADS-9982314-IN",
    pdfUrl: "/uploads/certificates/google-partner-certificate.pdf",
    description: "Certified proficiency in advanced Search Campaigns, Smart Bidding algorithms, and GA4 telemetry.",
    issueDate: "2025",
    order: 2,
  },
  {
    id: "cert_indiamart",
    title: "IndiaMART TrustSeal Verified Certificate",
    issuer: "IndiaMART InterMESH Limited",
    certificateNo: "IM-TS-884710",
    pdfUrl: "/uploads/certificates/indiamart-trustseal.pdf",
    imageUrl: null,
    description: "Verified supplier credential ensuring authentic business location, domain ownership, and trade legitimacy.",
    issueDate: "2025",
    order: 3,
  },
  {
    id: "cert_justdial",
    title: "Justdial Verified Certificate of Trust & Users' Choice",
    issuer: "Justdial Limited",
    certificateNo: "JD-TRUST-DL-110016",
    pdfUrl: "/uploads/certificates/justdial-verified-certificate.pdf",
    imageUrl: "/uploads/certificates/justdial-certificate-of-trust.png",
    description: "Official Justdial Certified Trusted Member and Users' Choice 2026 accreditation with 5-star rating for verified Hauz Khas (New Delhi) premises, contact numbers, and trade authenticity.",
    issueDate: "2026",
    order: 4,
  },
];

async function main() {
  const pool = mysql.createPool(dbUrl);

  console.log("Creating CertificateDocument table if not exists...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`CertificateDocument\` (
      \`id\` VARCHAR(191) NOT NULL PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`issuer\` VARCHAR(255) NOT NULL,
      \`certificateNo\` VARCHAR(255) NOT NULL,
      \`pdfUrl\` VARCHAR(500) NOT NULL,
      \`imageUrl\` VARCHAR(500) NULL,
      \`description\` TEXT NULL,
      \`issueDate\` VARCHAR(100) NULL,
      \`order\` INT NOT NULL DEFAULT 0,
      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Create sample dummy PDF files in public/uploads/certificates if they don't exist
  const certsDir = path.resolve("public/uploads/certificates");
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
  }

  // Create a minimal valid PDF template for demonstration
  const dummyPdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length 50 >> stream
BT
/F1 24 Tf
100 700 Td
(GGM Technologies Official Certificate) Tj
ET
endstream endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000214 00000 n 
trailer << /Size 5 /Root 1 0 R >>
startxref
314
%%EOF`;

  for (const cert of SEED_CERTIFICATES) {
    const filename = path.basename(cert.pdfUrl);
    const filePath = path.join(certsDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, dummyPdfContent);
      console.log(`Created sample PDF: ${filename}`);
    }

    await pool.query(
      `INSERT INTO \`CertificateDocument\` (id, title, issuer, certificateNo, pdfUrl, imageUrl, description, issueDate, \`order\`, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
       ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       issuer = VALUES(issuer),
       certificateNo = VALUES(certificateNo),
       pdfUrl = VALUES(pdfUrl),
       imageUrl = VALUES(imageUrl),
       description = VALUES(description),
       issueDate = VALUES(issueDate),
       \`order\` = VALUES(\`order\`);`,
      [
        cert.id,
        cert.title,
        cert.issuer,
        cert.certificateNo,
        cert.pdfUrl,
        cert.imageUrl || null,
        cert.description,
        cert.issueDate,
        cert.order,
      ]
    );
    console.log(`✓ Seeded Certificate: ${cert.title}`);
  }

  await pool.end();
  console.log("Certificates setup complete!");
}

main().catch((err) => {
  console.error("Error setting up certificates:", err);
  process.exit(1);
});
