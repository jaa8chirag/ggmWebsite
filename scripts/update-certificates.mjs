import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Updating CertificateDocument with relevant, authentic documents...");

  const authenticCerts = [
    {
      id: "cert_justdial",
      title: "Justdial Verified Certificate of Trust & Users' Choice",
      issuer: "Justdial Limited",
      certificateNo: "JD-TRUST-DL-110016",
      pdfUrl: "/uploads/certificates/justdial-verified-certificate.pdf",
      imageUrl: null,
      description: "Official Justdial Certified Trusted Member and Users' Choice 2026 accreditation with 5-star rating for verified Green Park & Hauz Khas (New Delhi) premises, contact numbers, and trade authenticity.",
      issueDate: "2026",
      order: 0,
    },
    {
      id: "cert_seo_sow",
      title: "GGM SEO Scope of Work & Package Specification",
      issuer: "GGM Technologies Commercial & Operations Wing",
      certificateNo: "GGM-SOW-SEO-20K",
      pdfUrl: "/uploads/certificates/ggm-seo-package-scope-of-work.pdf",
      imageUrl: null,
      description: "Official Scope of Work, SLA delivery metrics, On-Page & Off-Page optimization protocols, and comprehensive deliverables charter by GGM Technologies (Green Park / Yusuf Sarai, New Delhi).",
      issueDate: "2026",
      order: 1,
    },
    {
      id: "cert_msme",
      title: "MSME Udyam Registration Certificate",
      issuer: "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
      certificateNo: "UDYAM-DL-08-0098741",
      pdfUrl: "/uploads/certificates/msme-udyam-certificate.pdf",
      imageUrl: null,
      description: "Official Government of India Micro Enterprise registration confirming verified operations in Software Development, Digital Marketing, and IT Services under South Delhi jurisdiction.",
      issueDate: "2024",
      order: 2,
    },
    {
      id: "cert_gst",
      title: "GST Registration Certificate (Form REG-06)",
      issuer: "Goods and Services Tax Network, Department of Revenue, Govt. of India",
      certificateNo: "07ELUPM2384A1ZV",
      pdfUrl: "/uploads/certificates/gst-registration-certificate.pdf",
      imageUrl: null,
      description: "Statutory tax compliance registration under Rule 10(1) verifying active regular taxpayer standing for GGM Technologies at Yusuf Sarai Commercial Complex, Green Park, New Delhi.",
      issueDate: "2024",
      order: 3,
    },
  ];

  // Remove existing and insert verified ones
  await conn.query("DELETE FROM CertificateDocument");

  for (const c of authenticCerts) {
    await conn.query(
      "INSERT INTO CertificateDocument (id, title, issuer, certificateNo, pdfUrl, imageUrl, description, issueDate, `order`, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))",
      [c.id, c.title, c.issuer, c.certificateNo, c.pdfUrl, c.imageUrl, c.description, c.issueDate, c.order]
    );
    console.log(`Inserted verified certificate: ${c.order}. ${c.title}`);
  }

  await conn.end();
}

main().catch(console.error);
