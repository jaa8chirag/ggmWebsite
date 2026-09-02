import mysql from "mysql2/promise";

const certData = {
  id: "cert_indiamart",
  title: "IndiaMART TrustSEAL Verified Certificate of Trust",
  issuer: "IndiaMART InterMESH Ltd.",
  certificateNo: "IM-TRUSTSEAL-07ELUPM",
  pdfUrl: "/uploads/certificates/indiamart-trustseal-certificate.pdf",
  imageUrl: null,
  description: "Official IndiaMART TrustSEAL Certificate of Trust verifying GGM Technologies, Proprietor Guru Govind Maheesh, statutory GSTIN 07ELUPM2384A1ZV, and commercial premises at Yusuf Sarai Commercial Complex, Green Park, New Delhi.",
  issueDate: "2024",
  order: 2,
};

async function updateDb(url, name) {
  try {
    const isCloud = url.includes("tidbcloud");
    const conn = await mysql.createConnection(
      isCloud ? { uri: url, ssl: { rejectUnauthorized: false } } : url
    );
    // Delete cert_seo_sow or update order 2
    await conn.query("DELETE FROM `CertificateDocument` WHERE `id` = 'cert_seo_sow' OR `id` = 'cert_indiamart' OR `order` = 2");
    await conn.query(
      "INSERT INTO `CertificateDocument` (`id`, `title`, `issuer`, `certificateNo`, `pdfUrl`, `imageUrl`, `description`, `issueDate`, `order`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))",
      [
        certData.id,
        certData.title,
        certData.issuer,
        certData.certificateNo,
        certData.pdfUrl,
        certData.imageUrl,
        certData.description,
        certData.issueDate,
        certData.order,
      ]
    );
    const [rows] = await conn.query("SELECT `order`, title, issuer, pdfUrl FROM `CertificateDocument` ORDER BY `order` ASC");
    console.log(`✓ Updated certificates in ${name}:`);
    console.table(rows);
    await conn.end();
  } catch (err) {
    console.error(`Error updating ${name}:`, err.message);
  }
}

async function main() {
  // 1. TiDB Cloud
  await updateDb(
    "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    "TiDB Cloud"
  );

  // 2. Local MySQL
  await updateDb(
    "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite",
    "Local MySQL"
  );
}

main().catch(console.error);
