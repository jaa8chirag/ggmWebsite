import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

// Parse all existing locations from dump
const existingLocMap = new Map();
const locRegex = /INSERT INTO `location` \(`id`, `slug`, `name`, `region`, `isActive`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([01])/g;
let m;
while ((m = locRegex.exec(dump)) !== null) {
  existingLocMap.set(m[2], { id: m[1], slug: m[2], name: m[3], region: m[4] });
}

// Read all URLs pasted by user
const urlsText = fs.readFileSync(path.join(__dirname, 'user-gsc-urls.txt'), 'utf8');
const urls = urlsText.split(/\r?\n/).filter(l => l.startsWith('https://ggmtechnologies.com/services/'));

const distinctServices = new Set();
const distinctLocationsInUrls = new Set();
const serviceLocationPairs = [];

for (const u of urls) {
  const clean = u.replace('https://ggmtechnologies.com/services/', '');
  const parts = clean.split('/');
  if (parts.length === 2) {
    const sSlug = parts[0];
    const lSlug = parts[1];
    distinctServices.add(sSlug);
    distinctLocationsInUrls.add(lSlug);
    serviceLocationPairs.push({ serviceSlug: sSlug, locationSlug: lSlug });
  } else if (parts.length === 1) {
    distinctServices.add(parts[0]);
  }
}

// Compare locations
const existingFound = [];
const brandNewLocations = [];

for (const loc of distinctLocationsInUrls) {
  if (existingLocMap.has(loc)) {
    existingFound.push(existingLocMap.get(loc));
  } else {
    brandNewLocations.push(loc);
  }
}

console.log('=== ANALYSIS REPORT ===');
console.log(`Total URLs analyzed from GSC: ${urls.length}`);
console.log(`Distinct Services found in URLs (${distinctServices.size}):`, Array.from(distinctServices));
console.log(`Distinct Locations found in GSC URLs: ${distinctLocationsInUrls.size}`);
console.log(`Locations already present in DB: ${existingFound.length}`);
console.log(`Brand NEW locations not in DB: ${brandNewLocations.length}`);
if (brandNewLocations.length > 0) {
  console.log('Brand NEW locations list:', brandNewLocations);
}

// How many total locations exist in DB overall?
console.log(`Total locations in DB overall: ${existingLocMap.size}`);
