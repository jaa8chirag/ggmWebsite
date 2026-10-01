import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlContent = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');
const lines = sqlContent.split(/\r?\n/);

let locStart = -1, locEnd = -1, slStart = -1, slEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Table structure for `location`')) locStart = i - 1; // include divider comment
  if (lines[i].includes('Table structure for `product`')) locEnd = i - 1;
  if (lines[i].includes('Table structure for `servicelocation`')) slStart = i - 1;
  if (lines[i].includes('Table structure for `sitesettings`')) slEnd = i - 1;
}

console.log({ locStart, locEnd, slStart, slEnd });

const locLines = lines.slice(locStart, locEnd).join('\n');
const slLines = lines.slice(slStart, slEnd).join('\n');

const outSql = `-- ========================================================
-- GGM Technologies: Location & Service-Location Data Import
-- Contains: 465 Locations + 171 Service-Location Mappings
-- ========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Location Table & Data
${locLines}

-- 2. ServiceLocation Table & Data
${slLines}

-- 3. Case-Insensitive Compatibility Views (For Linux MariaDB / MySQL)
-- In case your Linux server has lower_case_table_names = 0:
DROP VIEW IF EXISTS \`Location\`;
DROP VIEW IF EXISTS \`ServiceLocation\`;
DROP VIEW IF EXISTS \`Service\`;
DROP VIEW IF EXISTS \`ServiceFaq\`;

CREATE OR REPLACE VIEW \`Location\` AS SELECT * FROM \`location\`;
CREATE OR REPLACE VIEW \`ServiceLocation\` AS SELECT * FROM \`servicelocation\`;
CREATE OR REPLACE VIEW \`Service\` AS SELECT * FROM \`service\`;
CREATE OR REPLACE VIEW \`ServiceFaq\` AS SELECT * FROM \`servicefaq\`;

SET FOREIGN_KEY_CHECKS = 1;

-- Verification Queries
SELECT 'location_count' AS \`metric\`, COUNT(*) AS \`count\` FROM \`location\`
UNION ALL
SELECT 'servicelocation_count' AS \`metric\`, COUNT(*) AS \`count\` FROM \`servicelocation\`;
`;

fs.writeFileSync(path.join(__dirname, '..', 'import_service_locations.sql'), outSql, 'utf8');
console.log('Successfully generated import_service_locations.sql');
