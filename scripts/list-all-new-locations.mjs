import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

const existingLocMap = new Map();
const locRegex = /INSERT INTO `location` \(`id`, `slug`, `name`, `region`, `isActive`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([01])/g;
let m;
while ((m = locRegex.exec(dump)) !== null) {
  existingLocMap.set(m[2], { id: m[1], slug: m[2], name: m[3], region: m[4] });
}

const urlsText = fs.readFileSync(path.join(__dirname, 'user-gsc-urls.txt'), 'utf8');
const urls = urlsText.split(/\r?\n/).filter(l => l.startsWith('https://ggmtechnologies.com/services/'));

const distinctLocationsInUrls = new Set();
for (const u of urls) {
  const clean = u.replace('https://ggmtechnologies.com/services/', '');
  const parts = clean.split('/');
  if (parts.length === 2) {
    distinctLocationsInUrls.add(parts[1]);
  }
}

const brandNewLocations = [];
for (const loc of distinctLocationsInUrls) {
  if (!existingLocMap.has(loc)) {
    brandNewLocations.push(loc);
  }
}

console.log(`Total new locations: ${brandNewLocations.length}`);
console.log(JSON.stringify(brandNewLocations, null, 2));
