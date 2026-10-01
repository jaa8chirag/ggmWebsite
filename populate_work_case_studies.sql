-- ====================================================================
-- GGM Technologies: Populate Real Case Studies & Work Showcase
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `casestudy` WHERE 1=1;

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1000', 'vivek-patel', 'Mr. Vivek Patel', 'Shopify Development · Vivek Patel Studio', 'The primary objective is to design and develop a modern, premium, and conversion-focused Shopify website for Vivek Patel Studio that reflects the brand’s identity, showcases its products and collections in an engaging manner, and provides customers with a smooth and user-friendly shopping experience.', '+312% Organic Growth', 'interiors', 0, NOW(3), NOW(3), '/images/uploads/work/vivek-patel_1789056701864.jpg', 'https://vivekpatelstudio.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1001', 'vantage-fitness', 'Vantage Fitness', 'PPC · Performance Lead Gen', 'Restructured a fragmented Google Ads account into tightly themed campaigns with conversion-tuned landing pages, driving massive qualified client acquisition.', '3.9x Blended ROAS', 'fitness', 1, NOW(3), NOW(3), '/images/lead-generation-banner.png', NULL, 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1002', 'orn-properties', 'Miss. Bhavana Panjabi', 'WordPress Web Development · ORN Properties', 'Designed and developed a modern, responsive WordPress website for ORN Properties, a real estate consultancy. The website features property listings, advanced property search, property categories, service highlights, and lead generation sections.', '98+ Core Web Vitals Score', 'ecommerce', 2, NOW(3), NOW(3), '/images/uploads/work/orn-properties_1789056701970.jpg', 'https://ornproperties.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788954548356_mnya9', 'porous-materials-inc', 'Porous Materials Inc', 'Next.js Custom Development · PMIAPP', 'Engineered a high-performance Next.js enterprise platform for Porous Materials Inc to showcase complex technical machinery, improve global technical brand visibility, and streamline B2B inquiries across desktop and mobile.', 'Sub-Second Global Load Time', 'interiors', 3, NOW(3), NOW(3), '/images/uploads/work/porous-materials-inc_1789056702066.jpg', 'https://pmi-website-pied.vercel.app/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788954890643_7af2e', 'arvind-rai', 'Mr. Arvind Rai', 'Next.js Web Application · Astrologer Arvind Rai', 'Designed and developed a modern, SEO-friendly consultation portal with Next.js for Astrologer Arvind Rai. Features fast server-side rendering, online booking appointments, client testimonials, and educational astrology blogs.', 'Instant Online Booking Engine', 'interiors', 4, NOW(3), NOW(3), '/images/uploads/work/arvind-rai_1789056702172.jpg', 'https://arvindrai.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788955330688_7svkn', 'nisha', 'Miss Nisha', 'Next.js Travel Portal · Pakyong', 'Built a visually captivating, ultra-fast travel and exploration portal on Next.js for Pakyong. Engineered for seamless destination discovery, dynamic itinerary browsing, and high-intent tourist lead capture.', '100% Mobile Responsive UX', 'interiors', 5, NOW(3), NOW(3), '/images/uploads/work/nisha_1789056702275.jpg', 'https://pakyong.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788955619768_qolog', 'aditya', 'Mr. Aditya Singh', 'Next.js Enterprise · Orchid Company', 'Developed a modern, corporate digital presence utilizing Next.js for Orchid Company. Built with custom interactive modules, enterprise-grade architecture, and fast load speeds across all screen sizes.', 'Enterprise-Grade Performance', 'interiors', 6, NOW(3), NOW(3), '/images/uploads/work/aditya_1789056702375.jpg', 'https://orchidcompany.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788956192551_amlf4', 'anurag', 'Mr. Anurag Aman', 'WordPress Creative Studio · Kalakaar Design', 'Crafted a bespoke creative studio website for Kalakaar Design Studios. Combines engaging visual showcases, fluid gallery micro-interactions, and conversion-optimized inquiry forms.', 'High-Engagement Visual Portfolio', 'interiors', 7, NOW(3), NOW(3), '/images/uploads/work/anurag_1789056702472.jpg', 'https://kalakaardesignstudios.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788956623722_28qtj', 'guru-govind-mahesh', 'Mr. Guru Govind Mahesh', 'WordPress Corporate Platform', 'Delivered a clean, authoritative corporate website with tailored typography, custom contact touchpoints, and solid search engine foundation for Guru Govind Mahesh.', 'Authority & Trust Driven Design', 'interiors', 8, NOW(3), NOW(3), '/images/uploads/work/guru-govind-mahesh_1789056702568.jpg', 'https://gurugovindmaheesh.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788957275268_vjhiw', 'abhishek', 'Mr. Abhishek Singh', 'WordPress Development Service', 'Constructed an intuitive, high-speed WordPress solution featuring streamlined navigation, clear service presentations, and mobile-first responsiveness.', 'Optimized Customer Funnel', 'interiors', 9, NOW(3), NOW(3), '/images/uploads/work/abhishek_1789056702665.jpg', NULL, 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

INSERT INTO `casestudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `ogImage`, `canonicalOverride`, `noIndex`)
VALUES ('work_1788963019486_y1io4', 'mukesh', 'Mr. Mukesh', 'Web Development · Oviz Consulting', 'Architected a full corporate advisory website for Oviz Consulting. Includes structured service verticals, consultant expertise highlights, and lead qualification workflows.', 'B2B Lead Pipeline Activated', 'interiors', 10, NOW(3), NOW(3), '/images/uploads/work/mukesh_1789056702765.jpg', 'https://oviz.ggmtechnologies.com/', 0)
ON DUPLICATE KEY UPDATE
  `client` = VALUES(`client`),
  `category` = VALUES(`category`),
  `summary` = VALUES(`summary`),
  `resultLabel` = VALUES(`resultLabel`),
  `variant` = VALUES(`variant`),
  `order` = VALUES(`order`),
  `ogImage` = VALUES(`ogImage`),
  `canonicalOverride` = VALUES(`canonicalOverride`),
  `updatedAt` = NOW(3);

