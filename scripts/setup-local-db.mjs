import fs from 'fs';
import mysql from 'mysql2/promise';

async function main() {
  console.log('Connecting to local MySQL (127.0.0.1:3306)...');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Chirag30kum@r',
    database: 'ggmwebsite',
    multipleStatements: true
  });
  console.log('Connected!');

  // Helper to remove CREATE/DROP VIEW
  function stripViews(sql) {
    return sql
      .replace(/DROP VIEW IF EXISTS[\s\S]*?;/gi, '')
      .replace(/CREATE OR REPLACE VIEW[\s\S]*?;/gi, '');
  }

  // 1. Import base 465 locations from import_service_locations.sql
  console.log('1. Importing base 465 locations...');
  let baseSql = fs.readFileSync('import_service_locations.sql', 'utf8');
  baseSql = stripViews(baseSql);
  await conn.query(baseSql);

  // 2. Import 221 new locations + all service mappings from restore_all_685_locations_and_links.sql
  console.log('2. Importing 221 new locations and cross-joining all services...');
  let restoreSql = fs.readFileSync('restore_all_685_locations_and_links.sql', 'utf8');
  restoreSql = stripViews(restoreSql);
  await conn.query(restoreSql);

  // 3. Check counts
  const [[{ locCount }]] = await conn.query('SELECT COUNT(*) as locCount FROM location');
  const [[{ slCount }]] = await conn.query('SELECT COUNT(*) as slCount FROM servicelocation');
  const [[{ blogCount }]] = await conn.query('SELECT COUNT(*) as blogCount FROM blogpost');
  const [[{ svcCount }]] = await conn.query('SELECT COUNT(*) as svcCount FROM service');
  const [[{ productCount }]] = await conn.query('SELECT COUNT(*) as productCount FROM product');

  console.log('🎉 LOCAL DATABASE COMPLETE AND READY!');
  console.log({
    total_locations: locCount,
    total_service_locations: slCount,
    services: svcCount,
    blogs: blogCount,
    products: productCount
  });

  await conn.end();
}

main().catch(err => {
  console.error('Explicit Error:', err.message, err.sqlMessage);
  process.exit(1);
});
