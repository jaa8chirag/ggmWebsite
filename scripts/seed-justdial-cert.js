const mysql = require("mysql2/promise");

async function main() {
  const conn = await mysql.createConnection("mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite");
  try {
    await conn.query("ALTER TABLE CertificateDocument ADD COLUMN imageUrl VARCHAR(500) NULL AFTER pdfUrl");
    console.log("Added imageUrl column");
  } catch (e) {
    console.log("Column check:", e.message);
  }

  await conn.query(
    `INSERT INTO CertificateDocument (id, title, issuer, certificateNo, pdfUrl, imageUrl, description, issueDate, \`order\`, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       issuer = VALUES(issuer),
       certificateNo = VALUES(certificateNo),
       pdfUrl = VALUES(pdfUrl),
       imageUrl = VALUES(imageUrl),
       description = VALUES(description),
       issueDate = VALUES(issueDate),
       \`order\` = VALUES(\`order\`)`,
    [
      "cert_justdial",
      "Justdial Verified Certificate of Trust & Users' Choice",
      "Justdial Limited",
      "JD-TRUST-DL-110016",
      "/uploads/certificates/justdial-verified-certificate.pdf",
      "/uploads/certificates/justdial-certificate-of-trust.png",
      "Official Justdial Certified Trusted Member and Users' Choice 2026 accreditation with 5-star rating for verified Hauz Khas (New Delhi) premises, contact numbers, and trade authenticity.",
      "2026",
      4,
    ]
  );
  console.log("Justdial certificate inserted/updated successfully in local MySQL!");

  const [rows] = await conn.query("SELECT id, title, issuer, certificateNo, pdfUrl, imageUrl FROM CertificateDocument ORDER BY `order` ASC");
  console.log("Current certificates in DB:", rows);
  await conn.end();
}

main().catch(console.error);
