import mysql from "mysql2/promise";

async function updateCertificates(url, name) {
  try {
    const isCloud = url.includes("tidbcloud");
    const conn = await mysql.createConnection(
      isCloud ? { uri: url, ssl: { rejectUnauthorized: false } } : url
    );

    await conn.query(
      "UPDATE `CertificateDocument` SET `title` = ?, `issuer` = ?, `description` = ? WHERE `id` = 'cert_google'",
      [
        "Google My Business Verified Business Certificate",
        "Google LLC",
        "Official Google Verified Business Certification confirming GGM Technologies verified digital enterprise identity, local search authority, and operational excellence in New Delhi.",
      ]
    );

    await conn.query(
      "UPDATE `CertificateDocument` SET `title` = ?, `issuer` = ?, `description` = ? WHERE `id` = 'cert_msme'",
      [
        "MSME Udyam Registration Certificate",
        "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
        "Official Government of India MSME Udyam Registration Certificate validating GGM Technologies as a recognized enterprise for software, SEO, and digital media consulting.",
      ]
    );

    await conn.query(
      "UPDATE `CertificateDocument` SET `title` = ?, `issuer` = ?, `certificateNo` = ?, `description` = ? WHERE `id` = 'cert_gst'",
      [
        "GST Registration Certificate (Form REG-06)",
        "Goods and Services Tax Network, Department of Revenue, Govt. of India",
        "07ELUPM2384A1ZV",
        "Statutory Government of India GST Registration Certificate (Form GST REG-06) issued to Proprietor Guru Govind Maheesh for GGM Technologies at Yusuf Sarai Commercial Complex, Green Park, New Delhi.",
      ]
    );

    const [rows] = await conn.query("SELECT * FROM `CertificateDocument`");
    console.log(`✓ Updated certificates in ${name}:`);
    console.table(rows.map(r => ({ order: r.order, id: r.id, title: r.title, pdfUrl: r.pdfUrl })));
    await conn.end();
  } catch (err) {
    console.error(`Error in ${name}:`, err.message);
  }
}

async function main() {
  await updateCertificates(
    "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    "TiDB Cloud"
  );
  await updateCertificates(
    "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite",
    "Local MySQL"
  );
}

main().catch(console.error);
