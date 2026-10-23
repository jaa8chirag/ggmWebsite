const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// 96 missing base locations with proper names and regions
const LOCATIONS_TO_INSERT = [
  { slug: 'aali', name: 'Aali', region: 'Bahrain' },
  { slug: 'ad-dakhiliyah', name: 'Ad Dakhiliyah', region: 'Oman' },
  { slug: 'ad-dhahirah', name: 'Ad Dhahirah', region: 'Oman' },
  { slug: 'agar-malwa', name: 'Agar Malwa', region: 'Madhya Pradesh' },
  { slug: 'agara', name: 'Agara', region: 'Karnataka' },
  { slug: 'amman', name: 'Amman', region: 'Jordan' },
  { slug: 'aqaba', name: 'Aqaba', region: 'Jordan' },
  { slug: 'arad', name: 'Arad', region: 'Bahrain' },
  { slug: 'ash-sharqiyah-north', name: 'Ash Sharqiyah North', region: 'Oman' },
  { slug: 'asimah-governorate', name: 'Asimah Governorate', region: 'Kuwait' },
  { slug: 'attiguppe', name: 'Attiguppe', region: 'Karnataka' },
  { slug: 'bagalur', name: 'Bagalur', region: 'Karnataka' },
  { slug: 'balqa', name: 'Balqa', region: 'Jordan' },
  { slug: 'banashankari', name: 'Banashankari', region: 'Karnataka' },
  { slug: 'bangur-nagar', name: 'Bangur Nagar', region: 'Maharashtra' },
  { slug: 'beed', name: 'Beed', region: 'Maharashtra' },
  { slug: 'bidalur-devanahalli', name: 'Bidalur Devanahalli', region: 'Karnataka' },
  { slug: 'busaiteen', name: 'Busaiteen', region: 'Bahrain' },
  { slug: 'cantonment', name: 'Cantonment', region: 'Karnataka' },
  { slug: 'chembur', name: 'Chembur', region: 'Maharashtra' },
  { slug: 'chembur-west', name: 'Chembur West', region: 'Maharashtra' },
  { slug: 'chikkabidarakallu', name: 'Chikkabidarakallu', region: 'Karnataka' },
  { slug: 'cuffe-parade-colaba', name: 'Cuffe Parade Colaba', region: 'Maharashtra' },
  { slug: 'dadar-west', name: 'Dadar West', region: 'Maharashtra' },
  { slug: 'dahisar', name: 'Dahisar', region: 'Maharashtra' },
  { slug: 'dairy-circle', name: 'Dairy Circle', region: 'Karnataka' },
  { slug: 'dasarahalli', name: 'Dasarahalli', region: 'Karnataka' },
  { slug: 'diamond-garden', name: 'Diamond Garden', region: 'Maharashtra' },
  { slug: 'diraz', name: 'Diraz', region: 'Bahrain' },
  { slug: 'doddanekundi', name: 'Doddanekundi', region: 'Karnataka' },
  { slug: 'durrat-al-bahrain', name: 'Durrat Al Bahrain', region: 'Bahrain' },
  { slug: 'gondia', name: 'Gondia', region: 'Maharashtra' },
  { slug: 'gudaibiya', name: 'Gudaibiya', region: 'Bahrain' },
  { slug: 'h-b-r-layout-3rd-block', name: 'HBR Layout 3rd Block', region: 'Karnataka' },
  { slug: 'hamad-town', name: 'Hamad Town', region: 'Bahrain' },
  { slug: 'hawalli-governorate', name: 'Hawalli Governorate', region: 'Kuwait' },
  { slug: 'hingoli', name: 'Hingoli', region: 'Maharashtra' },
  { slug: 'horamavu', name: 'Horamavu', region: 'Karnataka' },
  { slug: 'hosa-road', name: 'Hosa Road', region: 'Karnataka' },
  { slug: 'indiranagar', name: 'Indiranagar', region: 'Karnataka' },
  { slug: 'irbid', name: 'Irbid', region: 'Jordan' },
  { slug: 'jalahalli', name: 'Jalahalli', region: 'Karnataka' },
  { slug: 'jamshedpur', name: 'Jamshedpur', region: 'Jharkhand' },
  { slug: 'jayadeva-hospital-jayanagar', name: 'Jayadeva Hospital Jayanagar', region: 'Karnataka' },
  { slug: 'kadubeesanahalli', name: 'Kadubeesanahalli', region: 'Karnataka' },
  { slug: 'kalyan', name: 'Kalyan', region: 'Maharashtra' },
  { slug: 'kalyan-nagar', name: 'Kalyan Nagar', region: 'Karnataka' },
  { slug: 'kanjurmarg', name: 'Kanjurmarg', region: 'Maharashtra' },
  { slug: 'kasturi-nagar', name: 'Kasturi Nagar', region: 'Karnataka' },
  { slug: 'kasturi-park', name: 'Kasturi Park', region: 'Maharashtra' },
  { slug: 'kengeri', name: 'Kengeri', region: 'Karnataka' },
  { slug: 'kharadi', name: 'Kharadi', region: 'Maharashtra' },
  { slug: 'krishna-rajendra-market', name: 'Krishna Rajendra Market', region: 'Karnataka' },
  { slug: 'krishnarajapuram', name: 'Krishnarajapuram', region: 'Karnataka' },
  { slug: 'kurla-east', name: 'Kurla East', region: 'Maharashtra' },
  { slug: 'kuvempu', name: 'Kuvempu', region: 'Karnataka' },
  { slug: 'latur', name: 'Latur', region: 'Maharashtra' },
  { slug: 'm-g-road', name: 'M.G. Road', region: 'Karnataka' },
  { slug: 'maan', name: "Ma'an", region: 'Jordan' },
  { slug: 'madaba', name: 'Madaba', region: 'Jordan' },
  { slug: 'mafraq', name: 'Mafraq', region: 'Jordan' },
  { slug: 'magarpatta-city', name: 'Magarpatta City', region: 'Maharashtra' },
  { slug: 'mahadevapura', name: 'Mahadevapura', region: 'Karnataka' },
  { slug: 'mahakali-caves', name: 'Mahakali Caves', region: 'Maharashtra' },
  { slug: 'mahalaxmi', name: 'Mahalaxmi', region: 'Maharashtra' },
  { slug: 'malad', name: 'Malad', region: 'Maharashtra' },
  { slug: 'manama', name: 'Manama', region: 'Bahrain' },
  { slug: 'marol-naka', name: 'Marol Naka', region: 'Maharashtra' },
  { slug: 'masjid', name: 'Masjid', region: 'Maharashtra' },
  { slug: 'midc', name: 'MIDC', region: 'Maharashtra' },
  { slug: 'mulund-west', name: 'Mulund West', region: 'Maharashtra' },
  { slug: 'musandam', name: 'Musandam', region: 'Oman' },
  { slug: 'muscat', name: 'Muscat', region: 'Oman' },
  { slug: 'nagpur', name: 'Nagpur', region: 'Maharashtra' },
  { slug: 'nallurahalli', name: 'Nallurahalli', region: 'Karnataka' },
  { slug: 'narendra-nagar', name: 'Narendra Nagar', region: 'Maharashtra' },
  { slug: 'nashik', name: 'Nashik', region: 'Maharashtra' },
  { slug: 'national-college', name: 'National College', region: 'Karnataka' },
  { slug: 'pattandur', name: 'Pattandur', region: 'Karnataka' },
  { slug: 'prem-nagar', name: 'Prem Nagar', region: 'Delhi' },
  { slug: 'riffa', name: 'Riffa', region: 'Bahrain' },
  { slug: 'sakinaka', name: 'Sakinaka', region: 'Maharashtra' },
  { slug: 'samaheej', name: 'Samaheej', region: 'Bahrain' },
  { slug: 'sanad', name: 'Sanad', region: 'Bahrain' },
  { slug: 'sangli', name: 'Sangli', region: 'Maharashtra' },
  { slug: 'science-centre-mumbai', name: 'Science Centre Mumbai', region: 'Maharashtra' },
  { slug: 'shivaji-nagar', name: 'Shivaji Nagar', region: 'Maharashtra' },
  { slug: 'sitra', name: 'Sitra', region: 'Bahrain' },
  { slug: 'trimurthi-nagar', name: 'Trimurthi Nagar', region: 'Maharashtra' },
  { slug: 'vidya-vihar', name: 'Vidya Vihar', region: 'Maharashtra' },
  { slug: 'vimannagar', name: 'Viman Nagar', region: 'Maharashtra' },
  { slug: 'wadala-road', name: 'Wadala Road', region: 'Maharashtra' },
  { slug: 'washim', name: 'Washim', region: 'Maharashtra' },
  { slug: 'whitefield', name: 'Whitefield', region: 'Karnataka' },
  { slug: 'zarqa', name: 'Zarqa', region: 'Jordan' },
  { slug: 'zinj', name: 'Zinj', region: 'Bahrain' }
];

async function restoreLocations() {
  const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL });
  console.log('Connected to database successfully.');

  let insertedLocations = 0;
  for (const loc of LOCATIONS_TO_INSERT) {
    const id = `loc_gsc_${loc.slug.replace(/[^a-z0-9]/g, '_')}`;
    const [res] = await conn.execute(
      `INSERT INTO \`Location\` (\`id\`, \`slug\`, \`name\`, \`region\`, \`isActive\`, \`createdAt\`, \`updatedAt\`)
       VALUES (?, ?, ?, ?, 1, NOW(), NOW())
       ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`region\` = VALUES(\`region\`), \`isActive\` = 1, \`updatedAt\` = NOW()`,
      [id, loc.slug, loc.name, loc.region]
    );
    if (res.affectedRows > 0) insertedLocations++;
  }
  console.log(`Successfully inserted / updated ${insertedLocations} locations.`);

  // Now link ALL locations (including these 96) to ALL services
  console.log('Linking all locations with all services in ServiceLocation...');
  const [linkRes] = await conn.execute(`
    INSERT INTO \`ServiceLocation\` (\`id\`, \`serviceId\`, \`locationId\`, \`published\`, \`createdAt\`, \`updatedAt\`)
    SELECT 
      CONCAT('sl_', SUBSTRING(MD5(CONCAT(s.id, '_', l.id)), 1, 16)) AS \`id\`,
      s.id AS \`serviceId\`,
      l.id AS \`locationId\`,
      1 AS \`published\`,
      NOW() AS \`createdAt\`,
      NOW() AS \`updatedAt\`
    FROM \`Service\` s
    CROSS JOIN \`Location\` l
    WHERE l.isActive = 1
    ON DUPLICATE KEY UPDATE \`published\` = 1
  `);
  console.log('ServiceLocation rows affected / created:', linkRes.affectedRows);

  const [[{ totalLocs }]] = await conn.execute('SELECT COUNT(*) as totalLocs FROM Location WHERE isActive = 1');
  const [[{ totalLinks }]] = await conn.execute('SELECT COUNT(*) as totalLinks FROM ServiceLocation WHERE published = 1');
  console.log(`Total Active Locations: ${totalLocs}`);
  console.log(`Total Published ServiceLocation Pages: ${totalLinks}`);

  await conn.end();
}

restoreLocations().catch(console.error);
