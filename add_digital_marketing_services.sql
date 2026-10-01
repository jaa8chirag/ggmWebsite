-- ====================================================================
-- GGM Technologies: Add Digital Marketing Services (10th Core Service)
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Remove legacy test if exists
DELETE FROM `servicelocation` WHERE `serviceId` = 'srv_digital_agency';
DELETE FROM `servicefaq` WHERE `serviceId` = 'srv_digital_agency';
DELETE FROM `service` WHERE `id` = 'srv_digital_agency' OR `slug` = 'digital-agency';

-- 1. Insert Service
INSERT INTO `service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `ogImage`, `metaTitle`, `metaDescription`, `noIndex`, `createdAt`, `updatedAt`)
VALUES (
  'srv_digital_marketing_services',
  'digital-marketing-services',
  '10',
  'Digital Marketing Services',
  'Data-driven multi-channel campaigns that drive real traffic, qualified leads, and predictable revenue.',
  'GGM Technologies delivers full-suite 360° Digital Marketing Services engineered to scale modern businesses. We combine technical SEO, high-ROAS Google Ads, performance Meta campaigns, social media management, content marketing, and conversion rate optimization (CRO) into a cohesive growth engine that consistently lowers customer acquisition costs and out-converts your competition.',
  '[\"Full-funnel SEO, Google Ads & Meta Performance Marketing\",\"Conversion-focused landing pages & automated CRM lead funnels\",\"Transparent 24/7 Looker Studio ROI & revenue attribution reporting\"]',
  '/images/services/digital-marketing-services.jpg',
  'Digital Marketing Services in Delhi & Globally | 360° ROI Growth — GGM Technologies',
  'Accelerate commercial growth with premier Digital Marketing Services by GGM Technologies. Expert SEO, Google Ads, Meta PPC, social media, and conversion funnels.',
  0,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `slug` = VALUES(`slug`),
  `title` = VALUES(`title`),
  `index` = VALUES(`index`),
  `promise` = VALUES(`promise`),
  `description` = VALUES(`description`),
  `bullets` = VALUES(`bullets`),
  `ogImage` = VALUES(`ogImage`),
  `metaTitle` = VALUES(`metaTitle`),
  `metaDescription` = VALUES(`metaDescription`),
  `updatedAt` = NOW(3);

-- 2. Insert FAQs
DELETE FROM `servicefaq` WHERE `serviceId` = 'srv_digital_marketing_services';

INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_1', 'srv_digital_marketing_services', 'What channels are included in your Digital Marketing Services?', 'Our digital marketing services cover the entire buyer journey: Search Engine Optimization (Technical, On-Page, Off-Page, and Generative Engine Optimization), Paid Search (Google Ads, Bing Ads), Paid Social (Meta Ads on Instagram & Facebook, LinkedIn Ads), Content & Copywriting, Social Media Marketing, Conversion Rate Optimization (CRO), and Marketing Automation.', 0);
INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_2', 'srv_digital_marketing_services', 'How do you ensure marketing spend generates actual revenue rather than vanity metrics?', 'We tie every campaign directly to bottom-line business metrics: Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), Customer Lifetime Value (LTV), and pipeline velocity. Rather than reporting impressions and clicks, our 24/7 custom Looker Studio dashboards show verified leads, closed deals, and revenue attribution across all touchpoints.', 1);
INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_3', 'srv_digital_marketing_services', 'How soon can we expect to see results from digital marketing campaigns?', 'Paid advertising channels (Google Search, Shopping, and Meta Ads) begin capturing high-intent leads and generating sales within the first 7 to 14 days of launch. Search engine optimization (SEO) and organic content marketing compound over 3 to 6 months, creating a permanent, zero-marginal-cost customer acquisition engine.', 2);
INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_4', 'srv_digital_marketing_services', 'Do you design dedicated landing pages for ad campaigns?', 'Yes, absolutely. Sending paid ad traffic to generic homepages wastes up to 60% of media budget. We design, code, and deploy custom, sub-second conversion-rate-optimized landing pages with tailored value propositions, social proof, and multi-step forms that maximize conversion rates.', 3);
INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_5', 'srv_digital_marketing_services', 'What is your pricing and retainer structure for digital marketing?', 'We offer flexible, performance-aligned monthly retainer models tailored to your business stage and growth targets. Retainers include a dedicated growth squad (Digital Marketing Strategist, Media Buyer, Copywriter, and Data Analyst) with zero long-term lock-in contracts.', 4);
INSERT INTO `servicefaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('faq_dms_6', 'srv_digital_marketing_services', 'Who retains ownership of ad accounts, creative assets, and marketing data?', 'You retain 100% full ownership of all Google Ads accounts, Meta Business Managers, pixel data, creative designs, and tracking configurations. Everything is built directly inside your company assets with complete transparency.', 5);

-- 3. Link with all Active Locations
INSERT INTO `servicelocation` (`id`, `serviceId`, `locationId`, `published`, `createdAt`, `updatedAt`)
SELECT 
  CONCAT('sl_', SUBSTRING(MD5(CONCAT('srv_digital_marketing_services', '_', l.id)), 1, 16)) AS `id`,
  'srv_digital_marketing_services' AS `serviceId`,
  l.id AS `locationId`,
  1 AS `published`,
  NOW() AS `createdAt`,
  NOW() AS `updatedAt`
FROM `location` l
WHERE l.isActive = 1
ON DUPLICATE KEY UPDATE `published` = 1;

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'digital_marketing_services_setup_complete' AS status, COUNT(*) AS live_locations 
FROM `servicelocation` 
WHERE `serviceId` = 'srv_digital_marketing_services';
