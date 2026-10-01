import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

// Parse existing locations
const existingLocMap = new Map();
const locRegex = /INSERT INTO `location` \(`id`, `slug`, `name`, `region`, `isActive`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([01])/g;
let m;
while ((m = locRegex.exec(dump)) !== null) {
  existingLocMap.set(m[2], { id: m[1], slug: m[2], name: m[3], region: m[4] });
}

// Read URLs pasted by user
const urlsText = fs.readFileSync(path.join(__dirname, 'user-gsc-urls.txt'), 'utf8');
const urls = urlsText.split(/\r?\n/).filter(l => l.startsWith('https://ggmtechnologies.com/services/'));

const distinctLocationsInUrls = new Set();
const userPairs = [];

for (const u of urls) {
  const clean = u.replace('https://ggmtechnologies.com/services/', '');
  const parts = clean.split('/');
  if (parts.length === 2) {
    distinctLocationsInUrls.add(parts[1]);
    userPairs.push({ serviceSlug: parts[0], locationSlug: parts[1] });
  }
}

// Format Name helper
function formatName(slug) {
  const overrides = {
    'iit-bombay': 'IIT Bombay',
    'bkc-mumbai': 'BKC Mumbai',
    'cbd-belapur': 'CBD Belapur',
    'chhatrapati-shivaji-maharaj-terminus': 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    'chhatrapati-sambhaji-nagar': 'Chhatrapati Sambhaji Nagar',
    'dlf-phase-1': 'DLF Phase 1',
    'dlf-phase-3': 'DLF Phase 3',
    'dlf-city-phase-2': 'DLF City Phase 2',
    'dlf-city-phase-3': 'DLF City Phase 3',
    'dwarka-sector-11': 'Dwarka Sector 11',
    'dwarka-sector-12': 'Dwarka Sector 12',
    'dwarka-sector-14': 'Dwarka Sector 14',
    'dwarka-sector-8': 'Dwarka Sector 8',
    'dwarka-sector-9': 'Dwarka Sector 9',
    'dwarka-sector-20': 'Dwarka Sector 20',
    'mg-road-gurgaon': 'MG Road Gurgaon',
    'noida-sector-101': 'Noida Sector 101',
    'noida-sector-137': 'Noida Sector 137',
    'noida-sector-143': 'Noida Sector 143',
    'noida-sector-144': 'Noida Sector 144',
    'noida-sector-147': 'Noida Sector 147',
    'noida-sector-52': 'Noida Sector 52',
    'noida-sector-59': 'Noida Sector 59',
    'noida-sector-76': 'Noida Sector 76',
    'noida-sector-81': 'Noida Sector 81',
    'noida-sector-83': 'Noida Sector 83',
    'nsez-noida': 'NSEZ Noida',
    'sector-22-gurgaon': 'Sector 22 Gurgaon',
    'sector-54-chowk-gurgaon': 'Sector 54 Chowk Gurgaon',
    'sector-55-gurgaon': 'Sector 55 Gurgaon',
    'south-city-1-gurgaon': 'South City 1 Gurgaon',
    'south-city-2-gurgaon': 'South City 2 Gurgaon',
    'sohna-road-gurgaon': 'Sohna Road Gurgaon',
    'btm-layout': 'BTM Layout',
    'hsr-layout': 'HSR Layout',
    'hrbr-layout': 'HRBR Layout',
    'jp-nagar': 'JP Nagar',
    'jp-nagar-4th-phase': 'JP Nagar 4th Phase',
    'kr-puram': 'KR Puram',
    'seepz': 'SEEPZ Andheri',
    'iim-bangalore': 'IIM Bangalore',
    'esic': 'ESIC Hospital',
    'sg-highway': 'SG Highway',
  };

  if (overrides[slug]) return overrides[slug];

  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// Region guesser helper
function guessRegion(slug) {
  const uae = ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'bur-dubai', 'deira', 'jumeirah', 'zabeel', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain', 'jebel-ali', 'al-awir', 'al-wajeha-al-bahriah', 'hadaeq-mohammed-bin-rashid', 'madinat-al-maktoum', 'madinat-al-qudra', 'mushrif', 'nakhlat-deira', 'ras-al-khor'];
  if (uae.includes(slug)) return 'United Arab Emirates';
  if (slug === 'poland') return 'Europe';
  if (slug === 'mexico') return 'North America';

  const karnataka = ['bengaluru', 'bellandur', 'btm-layout', 'cubbon-park', 'hebbal', 'hsr-layout', 'jayanagar', 'kr-puram', 'marathahalli', 'peenya', 'rajajinagar', 'yelahanka', 'yeshwanthpur', 'agrahara-dasarahalli', 'bettahalasuru', 'benniganahalli-bangalore', 'bommasandra', 'bommanahalli', 'byappanahalli', 'challaghatta', 'chickpete', 'deepanjali-nagar', 'devarabeesanahalli', 'doddajala', 'doddakallasandra', 'garudacharpalya', 'goraguntepalya', 'hebbagodi', 'hongasandra', 'hoodi', 'hope-farm-circle', 'hosahalli-nelamangala', 'hrbr-layout', 'hulimavu', 'huskur', 'iblur-village', 'iim-bangalore', 'jakkur-layout', 'jnana-jyothi-nagar-jnana-bharathi', 'kadugodi', 'kadugondanahalli', 'kalena-agrahara', 'karthik-nagar', 'kempapura', 'kodigehalli', 'konanakunte', 'konappana-agrahara', 'kudlu-gate', 'kundalahalli', 'lalbagh-road', 'lalji-nagar-lakkasandra', 'langford-town', 'madavara', 'magadi-road', 'mahalakshmi-layout', 'manjunatha-nagar', 'mysore-road', 'nagawara', 'nayandahalli', 'pattanagere', 'pottery-town', 'rashtriya-military-school', 'rashtriya-vidyalaya', 'sampige-road', 'sandal-soap-factory', 'seethappa-layout', 'silk-board', 'singasandra', 'south-end-circle', 'srirampuram', 'swami-vivekananda-vidyashala-banashankari-1st-stage', 'tannery-road', 'tavarekere-main-road-btm-layout', 'thalaghattapura', 'trinity', 'vajarahalli', 'venkateshpura', 'vidhana-soudha', 'vijayanagar', 'vivekananda-nagar-banashankari-3rd-stage', 'yelachenahalli'];
  if (karnataka.includes(slug)) return 'Karnataka';

  const maharashtra = ['mumbai-central', 'mumbai-city', 'andheri', 'bandra', 'borivali', 'cbd-belapur', 'churchgate', 'dadar', 'jogeshwari', 'kurla', 'malad-west', 'mira-road', 'mulund', 'nerul', 'panvel', 'powai-lake', 'prabhadevi', 'santacruz', 'santa-cruz', 'thane', 'vashi', 'vile-parle', 'worli', 'pune', 'hadapsar', 'hinjewadi', 'kalyani-nagar', 'koregaonpark', 'aundh', 'nagpur', 'akola', 'amravati', 'dhule', 'solapur', 'kolhapur', 'satara', 'ratnagiri', 'sindhudurg', 'ahilyanagar', 'ahmednagar', 'anand-nagar-dahisar', 'bhandara', 'bhandup-west', 'bhayandar', 'bkc-mumbai', 'buldhana', 'chandrapur', 'charni-road', 'chhatrapati-sambhaji-nagar', 'chhatrapati-shivaji-maharaj-terminus', 'chunabhatti', 'cotton-green', 'dharampeth', 'dockyard-road', 'eksar', 'gadchiroli', 'girgaon-mumbai', 'goregaon', 'govandi', 'grant-road', 'hutatma-chowk-mumbai', 'ic-colony', 'iit-bombay', 'jalgaon', 'jalna', 'kalbadevi', 'kamraj-nagar', 'kanjurmarg-mumbai', 'khandeshwar', 'khar-road', 'khira-nagar', 'kings-circle', 'koradi-road', 'mahavir-nagar', 'mandala-mankhurd', 'manewada', 'mankhurd', 'marine-lines', 'matunga-road', 'nahur', 'nandurbar', 'nanavati-hospital', 'nibm-road', 'osmanabad', 'palghar', 'parbhani', 'rambaug-powai', 'reay-road', 'sandhurst-road', 'saraswat-nagar', 'seepz', 'shimpoli', 'shitladevi', 'shivaji-chowk', 'shivaji-park', 'siddharth-colony', 'siddhivinayak', 'sion', 'swami-samarth-nagar', 'swami-vivekananda', 'vidhan-bhavan-nariman-point', 'vidyanagari', 'wardha', 'wardha-road-nagpur', 'yavatmal'];
  if (maharashtra.includes(slug)) return 'Maharashtra';

  const gujarat = ['chhotaudepur', 'dahod', 'dangs', 'gandhinagar', 'kheda', 'mahisagar', 'narmada', 'panch-mahals', 'patan', 'porbandar', 'rajkot', 'sabar-kantha', 'surat', 'surendranagar', 'tapi', 'vadodara', 'valsad', 'vav-tharad', 'science-city-road', 'sg-highway', 'sindhu-bhavan-road', 'thaltej', 'prahlad-nagar', 'satellite-city', 'chandkheda', 'ambli-bopal-road', 'central-ahmedabad', 'morbi', 'navsari', 'mahesana', 'kachchh', 'jamnagar', 'junagadh', 'bharuch', 'bhavnagar', 'botad', 'amreli', 'anand', 'arvalli', 'banas-kantha'];
  if (gujarat.includes(slug)) return 'Gujarat';

  const up = ['ayodhya', 'agra', 'aligarh', 'allahabad', 'amethi', 'amroha', 'auraiya', 'azamgarh', 'badaun', 'budaun', 'baghpat', 'bahraich', 'ballia', 'balrampur', 'banaras', 'banda', 'bara-banki', 'bareilly', 'basti', 'bhadohi', 'bijnor', 'bulandshahr', 'chandauli', 'chitrakoot', 'deoria', 'etah', 'etawah', 'farrukhabad', 'fatehpur', 'firozabad', 'gautam-buddha-nagar', 'ghaziabad', 'ghazipur', 'gonda', 'gorakhpur', 'greater-noida', 'alpha-1-greater-noida', 'delta-1-greater-noida', 'pari-chowk-greater-noida', 'knowledge-park-ii', 'hapur', 'hardoi', 'hathras', 'jaunpur', 'jhansi', 'kannauj', 'kanpur', 'kanpur-dehat', 'civil-lines-kanpur', 'kakadeo-kanpur', 'indiranagar-kanpur', 'saket-nagar-kanpur', 'tilak-nagar-kanpur', 'kheri', 'kushinagar', 'lalitpur', 'lucknow', 'gomti-nagar-extension', 'hazratganj-lucknow', 'jankipuram', 'mahanagar', 'amar-shaheed-path', 'mahoba', 'mainpuri', 'mathura', 'mau', 'meerut', 'mirzapur', 'moradabad', 'muzaffarnagar', 'pilibhit', 'pratapgarh', 'prayagraj', 'civil-lines-prayagraj', 'george-town', 'katra-prayagraj', 'rae-bareli', 'rampur', 'saharanpur', 'sambhal', 'sant-kabir-nagar', 'shahjahanpur', 'shamli', 'shravasti', 'siddharthnagar', 'sitapur', 'sonbhadra', 'sultanpur', 'unnao', 'varanasi', 'assi-ghat', 'harhua', 'lanka', 'mahmoorganj', 'nadesar', 'ravindrapuri', 'sunderpur', 'varanasi-cantonment'];
  if (up.includes(slug)) return 'Uttar Pradesh';

  const delhiNcr = ['faridabad', 'old-faridabad', 'gurgaon', 'gurugram', 'huda-city-centre', 'iffco-chowk', 'guru-dronacharya', 'moulsari-avenue-gurgaon', 'millennium-city-centre-gurugram', 'golf-course', 'golf-course-road', 'golf-course-extension', 'nirvana-country', 'sushant-lok-1-gurgaon', 'gurgaon-sector-23', 'gurgaon-sector-57', 'gurgaon-sector-82', 'palam-vihar', 'badli-industrial-area', 'bawana-industrial-area', 'gt-karnal-road-industrial-area', 'kirti-nagar-industrial-area', 'mayapuri-industrial-area', 'mundka-industrial-area', 'narela-industrial-area', 'okhla-industrial-area', 'patparganj-industrial-area', 'akshardham', 'anand-vihar', 'arjan-garh', 'barakhamba-road', 'basai-darapur', 'belvedere-towers', 'bhikaji-cama-place', 'botanical-garden', 'central-delhi', 'central-secretariat', 'chanakyapuri', 'chandni-chowk', 'chawri-bazar', 'chhatarpur', 'chirag-delhi', 'civil-lines', 'connaught-place', 'dabri-mor', 'delhi-cantt', 'delhi-gate', 'dhaula-kuan', 'dilli-haat-ina', 'don-bosco', 'dwarka', 'dwarka-court', 'dwarka-mor', 'east-azad-nagar', 'east-delhi', 'ghitorni', 'gokulpuri', 'golf-links', 'govindpuri', 'green-park', 'gtb-nagar', 'hauz-khas', 'hazrat-nizamuddin', 'hindon-river', 'indraprastha', 'ip-extension', 'ito', 'jaffrabad', 'jahangirpuri', 'jamia-millia-islamia', 'janakpuri', 'janakpuri-east', 'jangpura', 'janpath', 'jhandewalan', 'jhil-mil', 'johri-enclave', 'jor-bagh', 'kailash-colony', 'kalindi-kunj', 'kalkaji-mandir', 'kanhaiya-nagar', 'karkar-duma', 'karkardooma', 'karkarduma-court', 'kashmere-gate', 'kashmiri-gate', 'keshav-puram', 'khan-market', 'kirti-nagar', 'kohat-enclave', 'krishna-nagar', 'krishna-park', 'lok-kalyan-marg', 'maharaja-surajmal-stadium', 'mahipalpur', 'malviya-nagar', 'mandawali', 'mandi-house', 'mansarovar-park', 'maujpur', 'maya-puri', 'mayur-vihar-extension', 'mayur-vihar-phase-1', 'mayur-vihar-pocket-1', 'model-town', 'mohan-estate', 'mohan-nagar', 'moolchand', 'moti-bagh', 'moti-nagar', 'mukherjee-nagar', 'munirka', 'nangloi', 'naraina-vihar', 'nehru-enclave', 'nehru-place', 'netaji-subash-place', 'new-ashok-nagar', 'new-delhi', 'new-friends-colony-delhi', 'nirmal-vihar', 'nirman-vihar', 'nizamuddin-west', 'noida', 'noida-city-centre', 'noida-electronic-city', 'noida-sector-15', 'noida-sector-146', 'noida-sector-148', 'noida-sector-16', 'noida-sector-18', 'noida-sector-61', 'noida-sector-62', 'north-delhi', 'north-east-delhi', 'north-west-delhi', 'okhla', 'okhla-bird-sanctuary', 'okhla-vihar', 'old-delhi', 'old-rajinder-nagar', 'palam', 'panchsheel-park', 'paschim-vihar', 'patel-chowk', 'patel-nagar', 'peera-garhi', 'pitam-pura', 'pitampura', 'pratap-nagar', 'preet-vihar', 'prithviraj-road', 'pul-bangash', 'punjabi-bagh', 'punjabi-bagh-west', 'qutub-minar', 'raj-bagh', 'rajdhani-park', 'rajendra-nagar', 'rajiv-chowk', 'rajouri-garden', 'ramesh-nagar', 'rithala', 'rk-ashram-marg', 'rk-puram', 'rohini', 'rohini-east', 'rohini-west', 'saket-delhi', 'sarita-vihar', 'sarojini-nagar', 'seelampur', 'shadipur', 'shaheed-nagar', 'shahdara', 'shalimar-bagh', 'shankar-vihar', 'shanti-niketan', 'shastri-nagar', 'shastri-park', 'shiv-vihar', 'shivaji-stadium', 'shri-ram-ashram', 'shyam-park', 'sikanderpur', 'sikandarpur', 'south-delhi', 'south-extension', 'south-west-delhi', 'subhash-nagar', 'sundar-nagar', 'surya-nagar', 'tilak-nagar', 'tis-hazari', 'tughlakabad', 'udyog-bhawan', 'uttam-nagar', 'vaishali', 'vasant-kunj', 'vidhan-sabha', 'vikaspuri', 'vishwavidyalaya', 'west-delhi', 'yamuna-bank'];
  if (delhiNcr.includes(slug)) return 'Delhi-NCR';

  const bihar = ['arrah', 'begusarai', 'bettiah', 'bhagalpur', 'bhojpur', 'bihar-sharif', 'buxar', 'gaya', 'muzaffarpur', 'patna', 'purnia', 'rajatalab', 'samastipur', 'sasaram', 'sitamarhi'];
  if (bihar.includes(slug)) return 'Bihar';

  return 'India';
}

// Generate SQL
let sql = `-- ====================================================================
-- GGM Technologies: Complete Master Restore (685 Locations + All Mappings)
-- Restores all URLs discovered by Google Search Console
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert/Update all 221 Brand New Locations
`;

let newLocCount = 0;
for (const slug of distinctLocationsInUrls) {
  if (!existingLocMap.has(slug)) {
    newLocCount++;
    const id = `loc_${Date.now()}_${newLocCount}`;
    const name = formatName(slug).replace(/'/g, "''");
    const region = guessRegion(slug).replace(/'/g, "''");
    sql += `INSERT INTO \`location\` (\`id\`, \`slug\`, \`name\`, \`region\`, \`isActive\`, \`createdAt\`, \`updatedAt\`) VALUES ('${id}', '${slug}', '${name}', '${region}', 1, NOW(), NOW()) ON DUPLICATE KEY UPDATE \`isActive\` = 1;\n`;
  }
}

sql += `\n-- 2. Link all Services with all Active Locations (Covers 100% GSC URLs)
INSERT INTO \`servicelocation\` (\`id\`, \`serviceId\`, \`locationId\`, \`published\`, \`createdAt\`, \`updatedAt\`)
SELECT 
  CONCAT('sl_', SUBSTRING(MD5(CONCAT(s.id, '_', l.id)), 1, 16)) AS \`id\`,
  s.id AS \`serviceId\`,
  l.id AS \`locationId\`,
  1 AS \`published\`,
  NOW() AS \`createdAt\`,
  NOW() AS \`updatedAt\`
FROM \`service\` s
CROSS JOIN \`location\` l
WHERE l.isActive = 1
ON DUPLICATE KEY UPDATE 
  \`published\` = 1;

-- 3. Compatibility Views for Linux MariaDB
CREATE OR REPLACE VIEW \`Location\` AS SELECT * FROM \`location\`;
CREATE OR REPLACE VIEW \`ServiceLocation\` AS SELECT * FROM \`servicelocation\`;
CREATE OR REPLACE VIEW \`Service\` AS SELECT * FROM \`service\`;
CREATE OR REPLACE VIEW \`ServiceFaq\` AS SELECT * FROM \`servicefaq\`;

SET FOREIGN_KEY_CHECKS = 1;

-- 4. Verification Check
SELECT 
  (SELECT COUNT(*) FROM \`location\`) AS \`total_locations\`,
  (SELECT COUNT(*) FROM \`service\`) AS \`total_services\`,
  (SELECT COUNT(*) FROM \`servicelocation\` WHERE \`published\` = 1) AS \`total_live_service_locations\`;
`;

fs.writeFileSync(path.join(__dirname, '..', 'restore_all_685_locations_and_links.sql'), sql, 'utf8');
console.log(`Successfully generated restore_all_685_locations_and_links.sql with ${newLocCount} new locations!`);
