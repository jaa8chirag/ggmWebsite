import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("1. Checking and updating CertificateDocument table...");
  
  // Clear any existing imageUrl so no certificate card renders image preview
  await conn.query("UPDATE `CertificateDocument` SET `imageUrl` = NULL");

  // Upsert the new GGM SEO Scope of Work & Specification document
  const id = "cert_seo_sow";
  const title = "GGM SEO Scope of Work & Package Specification";
  const issuer = "GGM Technologies Commercial & Operations Wing";
  const certificateNo = "GGM-SOW-SEO-20K";
  const pdfUrl = "/uploads/certificates/ggm-seo-package-scope-of-work.pdf";
  const description = "Official Scope of Work, SLA delivery metrics, On-Page & Off-Page optimization protocols, and 50-backlink monthly deliverables charter by GGM Technologies (Green Park / Yusuf Sarai, New Delhi).";
  const issueDate = "2026";
  const order = 5;

  const [existing] = await conn.query("SELECT * FROM `CertificateDocument` WHERE `id` = ?", [id]);
  if (existing.length > 0) {
    await conn.query(
      "UPDATE `CertificateDocument` SET `title` = ?, `issuer` = ?, `certificateNo` = ?, `pdfUrl` = ?, `imageUrl` = NULL, `description` = ?, `issueDate` = ?, `order` = ? WHERE `id` = ?",
      [title, issuer, certificateNo, pdfUrl, description, issueDate, order, id]
    );
    console.log("Updated existing cert_seo_sow");
  } else {
    await conn.query(
      "INSERT INTO `CertificateDocument` (`id`, `title`, `issuer`, `certificateNo`, `pdfUrl`, `imageUrl`, `description`, `issueDate`, `order`, `createdAt`) VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?, NOW(3))",
      [id, title, issuer, certificateNo, pdfUrl, description, issueDate, order]
    );
    console.log("Inserted new cert_seo_sow");
  }

  const [certs] = await conn.query("SELECT `id`, `title`, `issuer`, `certificateNo`, `pdfUrl`, `order` FROM `CertificateDocument` ORDER BY `order` ASC");
  console.log("\nCertificates currently active in DB:");
  console.table(certs);

  await conn.end();
}

main().catch((err) => {
  console.error("Error in add-seo-sow-cert:", err);
  process.exit(1);
});
