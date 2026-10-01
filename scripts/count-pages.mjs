import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

function getCount(tableName) {
  const match = content.match(new RegExp(`INSERT INTO \`${tableName}\``, 'g'));
  return match ? match.length : 0;
}

const stats = {
  totalLocationsInDb: getCount('location'),
  serviceLocationMappings: getCount('servicelocation'),
  services: getCount('service'),
  blogPosts: getCount('blogpost'),
  products: getCount('product'),
  caseStudies: getCount('casestudy'),
  legalPages: getCount('legalpage'),
};

console.log(JSON.stringify(stats, null, 2));
