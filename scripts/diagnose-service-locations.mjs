import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = fs.readFileSync(path.join(__dirname, '..', 'import_service_locations.sql'), 'utf8');

// Parse locations
const locRegex = /INSERT INTO `location` \(`id`, `slug`, `name`, `region`, `isActive`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([01])/g;
const locations = new Map();
let m;
while ((m = locRegex.exec(sql)) !== null) {
  locations.set(m[1], { id: m[1], slug: m[2], name: m[3], region: m[4], isActive: m[5] });
}
console.log('Parsed locations:', locations.size);

// Parse servicelocations
const slRegex = /INSERT INTO `servicelocation` \(`id`, `serviceId`, `locationId`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(?:NULL|'[^']*'),\s*([01])/g;
let slCount = 0;
let publishedCount = 0;
const slList = [];
while ((m = slRegex.exec(sql)) !== null) {
  slCount++;
  if (m[4] === '1') publishedCount++;
  slList.push({ id: m[1], serviceId: m[2], locationId: m[3], published: m[4] });
}
console.log(`Parsed servicelocations: ${slCount}, published: ${publishedCount}`);

// Parse services from ggm_web_dump.sql
const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');
const srvRegex = /INSERT INTO `service` \(`id`, `slug`, `index`, `title`/g;
const srvMap = new Map();
const srvLines = dump.split(/\r?\n/).filter(l => l.startsWith('INSERT INTO `service`'));
for (const line of srvLines) {
  const match = line.match(/VALUES \('([^']+)',\s*'([^']+)'/);
  if (match) srvMap.set(match[1], match[2]);
}
console.log('Services:', Object.fromEntries(srvMap));

// Check matches
let matchedCount = 0;
const sampleUrls = [];
for (const sl of slList) {
  const sSlug = srvMap.get(sl.serviceId);
  const loc = locations.get(sl.locationId);
  if (sSlug && loc && sl.published === '1') {
    matchedCount++;
    if (sampleUrls.length < 10) {
      sampleUrls.push(`/services/${sSlug}/${loc.slug}`);
    }
  }
}
console.log('Valid joined ServiceLocation routes:', matchedCount);
console.log('Sample URLs:', sampleUrls);
