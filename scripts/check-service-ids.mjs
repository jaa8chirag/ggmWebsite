import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

const srvMatches = [...dump.matchAll(/INSERT INTO `service` \([^)]+\) VALUES \('([^']+)',\s*'([^']+)'/g)];
console.log('Services in dump:');
for (const m of srvMatches) {
  console.log(`id: ${m[1]}, slug: ${m[2]}`);
}

const slMatches = [...dump.matchAll(/INSERT INTO `servicelocation` \([^)]+\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([^,]+),\s*([01])/g)];
console.log(`Total servicelocations in dump: ${slMatches.length}`);
const srvCount = {};
for (const m of slMatches) {
  const sid = m[2];
  const pub = m[5];
  srvCount[sid] = (srvCount[sid] || 0) + 1;
}
console.log('Service Location counts by serviceId:', srvCount);
