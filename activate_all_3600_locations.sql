-- ====================================================================
-- GGM Technologies: Link All Services with All Locations (3,600+ Pages)
-- Matches Google Search Console Discovered Pages: 3,633 Pages
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Ensure Table structure exists
CREATE TABLE IF NOT EXISTS `servicelocation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customIntro` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `metaTitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metaDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ogImage` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `canonicalOverride` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noIndex` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ServiceLocation_serviceId_locationId_key` (`serviceId`,`locationId`),
  KEY `ServiceLocation_locationId_fkey` (`locationId`),
  CONSTRAINT `ServiceLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ServiceLocation_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bulk Insert all Service x Location combinations (preserving existing custom data)
INSERT INTO `servicelocation` (`id`, `serviceId`, `locationId`, `published`, `createdAt`, `updatedAt`)
SELECT 
  CONCAT('sl_', SUBSTRING(MD5(CONCAT(s.id, '_', l.id)), 1, 16)) AS `id`,
  s.id AS `serviceId`,
  l.id AS `locationId`,
  1 AS `published`,
  NOW() AS `createdAt`,
  NOW() AS `updatedAt`
FROM `service` s
CROSS JOIN `location` l
WHERE l.isActive = 1
ON DUPLICATE KEY UPDATE 
  `published` = 1;

-- 3. Case-Insensitive Compatibility Views
CREATE OR REPLACE VIEW `Location` AS SELECT * FROM `location`;
CREATE OR REPLACE VIEW `ServiceLocation` AS SELECT * FROM `servicelocation`;
CREATE OR REPLACE VIEW `Service` AS SELECT * FROM `service`;
CREATE OR REPLACE VIEW `ServiceFaq` AS SELECT * FROM `servicefaq`;

SET FOREIGN_KEY_CHECKS = 1;

-- 4. Verify Total Result Count
SELECT 
  (SELECT COUNT(*) FROM `location`) AS `total_locations`,
  (SELECT COUNT(*) FROM `service`) AS `total_services`,
  (SELECT COUNT(*) FROM `servicelocation` WHERE `published` = 1) AS `total_live_service_locations`;
