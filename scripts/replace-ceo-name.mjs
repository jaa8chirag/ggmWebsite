import mysql from "mysql2/promise";

async function updateDb(url, name) {
  try {
    const isCloud = url.includes("tidbcloud");
    const conn = await mysql.createConnection(
      isCloud ? { uri: url, ssl: { rejectUnauthorized: false } } : url
    );

    // 1. SiteSettings
    await conn.query(`
      UPDATE SiteSettings 
      SET 
        ceoName = 'Guru Govind Mahesh',
        ceoBio = REPLACE(REPLACE(ceoBio, 'Chirag Kumar', 'Guru Govind Mahesh'), 'Chirag', 'Guru Govind Mahesh')
    `);

    // 2. LegalPage (about-ceo and others)
    await conn.query(`
      UPDATE LegalPage 
      SET 
        title = REPLACE(title, 'Chirag Kumar', 'Guru Govind Mahesh'),
        subtitle = REPLACE(subtitle, 'Chirag Kumar', 'Guru Govind Mahesh'),
        content = REPLACE(REPLACE(content, 'Chirag Kumar', 'Guru Govind Mahesh'), 'Chirag', 'Guru Govind Mahesh'),
        metaTitle = REPLACE(metaTitle, 'Chirag Kumar', 'Guru Govind Mahesh'),
        metaDescription = REPLACE(metaDescription, 'Chirag Kumar', 'Guru Govind Mahesh')
      WHERE slug = 'about-ceo' OR content LIKE '%Chirag%'
    `);

    // 3. QuoteRequest test leads
    await conn.query(`
      UPDATE QuoteRequest
      SET name = 'GGM Verified Lead'
      WHERE name LIKE '%Chirag%'
    `);

    const [settings] = await conn.query('SELECT ceoName, ceoBio FROM SiteSettings');
    console.log(`✓ Updated SiteSettings in ${name}:`);
    console.table(settings);

    const [page] = await conn.query("SELECT slug, title, metaTitle FROM LegalPage WHERE slug = 'about-ceo'");
    console.log(`✓ Updated LegalPage in ${name}:`);
    console.table(page);

    await conn.end();
  } catch (err) {
    console.error(`Error in ${name}:`, err.message);
  }
}

async function main() {
  await updateDb(
    "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    "TiDB Cloud"
  );
  await updateDb(
    "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite",
    "Local MySQL"
  );
}

main().catch(console.error);
