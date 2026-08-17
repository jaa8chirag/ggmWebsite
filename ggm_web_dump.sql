-- ===========================================================================
-- GGM Technologies Website - Complete Database Schema & Seed Dump
-- Target Database Engine: MySQL / MariaDB
-- ===========================================================================

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `Service` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `index` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `promise` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `bullets` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `ogImage` VARCHAR(255) NULL,
    `canonicalOverride` VARCHAR(255) NULL,
    `noIndex` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Service_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ServiceFaq` (
    `id` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answer` TEXT NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `ServiceFaq_serviceId_idx` (`serviceId`),
    CONSTRAINT `ServiceFaq_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Location` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Location_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ServiceLocation` (
    `id` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,
    `customIntro` TEXT NULL,
    `published` TINYINT(1) NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `ogImage` VARCHAR(255) NULL,
    `canonicalOverride` VARCHAR(255) NULL,
    `noIndex` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `ServiceLocation_serviceId_locationId_key` (`serviceId`, `locationId`),
    CONSTRAINT `ServiceLocation_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `ServiceLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `ogImage` VARCHAR(255) NULL,
    `canonicalOverride` VARCHAR(255) NULL,
    `noIndex` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `BlogPost_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BlogBlock` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `type` ENUM('h2', 'h3', 'paragraph', 'list') NOT NULL,
    `text` TEXT NULL,
    `items` JSON NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `BlogBlock_postId_idx` (`postId`),
    CONSTRAINT `BlogBlock_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BlogPost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BlogFaq` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answer` TEXT NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `BlogFaq_postId_idx` (`postId`),
    CONSTRAINT `BlogFaq_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BlogPost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `CaseStudy` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `resultLabel` VARCHAR(191) NOT NULL,
    `variant` ENUM('interiors', 'fitness', 'ecommerce') NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `ogImage` VARCHAR(255) NULL,
    `canonicalOverride` VARCHAR(255) NULL,
    `noIndex` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `CaseStudy_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Product` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` INT NULL,
    `originalPrice` INT NULL,
    `description` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `benefits` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `ogImage` VARCHAR(255) NULL,
    `canonicalOverride` VARCHAR(255) NULL,
    `noIndex` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Product_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ProductSpec` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `ProductSpec_productId_idx` (`productId`),
    CONSTRAINT `ProductSpec_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `quote` TEXT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `published` TINYINT(1) NOT NULL DEFAULT 1,
    `order` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `SiteSettings` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL,
    `eyebrow` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `phoneHref` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `addressLine1` VARCHAR(255) NOT NULL,
    `addressLine2` VARCHAR(255) NOT NULL,
    `addressLine3` VARCHAR(255) NOT NULL,
    `gst` VARCHAR(191) NOT NULL,
    `businessHours` VARCHAR(191) NOT NULL,
    `aboutEyebrow` VARCHAR(191) NOT NULL,
    `aboutTitle` VARCHAR(255) NOT NULL,
    `aboutIntro` TEXT NOT NULL,
    `mission` TEXT NOT NULL,
    `vision` TEXT NOT NULL,
    `clients` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `WhyChooseUs` (
    `id` VARCHAR(191) NOT NULL,
    `settingsId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `WhyChooseUs_settingsId_idx` (`settingsId`),
    CONSTRAINT `WhyChooseUs_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `SiteSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `MetricItem` (
    `id` VARCHAR(191) NOT NULL,
    `settingsId` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `suffix` VARCHAR(50) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `MetricItem_settingsId_idx` (`settingsId`),
    CONSTRAINT `MetricItem_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `SiteSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `AdminUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AdminSession` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `adminUserId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `AdminSession_token_key` (`token`),
    INDEX `AdminSession_adminUserId_idx` (`adminUserId`),
    CONSTRAINT `AdminSession_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================================================
-- SEED DATA INSERTS
-- ===========================================================================

-- Admin User
INSERT INTO `AdminUser` (`id`, `email`, `passwordHash`, `createdAt`) VALUES ('admin_1001', 'admin@ggmtechnologies.com', '$2b$10$pm/bzQU8geM2ExT94IyTPe0B78c2b6jsdTx9NsvI5jy4JrRjTH6ba', CURRENT_TIMESTAMP(3));

-- Services
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1000', 'seo', '01', 'SEO', 'We get you found before your competitors are.', 'Search engine optimization built on a technical audit, keyword-mapped content, and a link profile that actually moves rankings — not just traffic that doesn''t convert.', '["Technical audit & fixes","Keyword & content strategy","High DA link building"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1001', 'srv_1000', 'How long until we see ranking movement?', 'Technical fixes usually show up in Search Console within 2–4 weeks. Competitive keyword rankings typically take 3–6 months, depending on your domain''s starting authority.', 1);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1002', 'srv_1000', 'Do you guarantee page one rankings?', 'No agency can honestly guarantee a specific ranking — Google''s algorithm isn''t ours to control. What we commit to is the work: audits, fixes, content, and links, tracked against agreed targets every month.', 2);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1003', 'srv_1000', 'Will you touch our existing content, or just add new pages?', 'Both. Most sites have more ranking potential in existing pages than in net-new ones. We audit what you have first, then fill genuine content gaps.', 3);
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1001', 'ppc', '02', 'PPC & Google Ads', 'Every rupee of ad spend earns its place.', 'Paid search and Google Ads management focused on cost-per-acquisition, not vanity clicks — structured campaigns, tight negative keyword lists, and landing pages built to convert.', '["Campaign structure & bid strategy","Landing page conversion tuning","Weekly spend & ROAS reporting"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1004', 'srv_1001', 'What''s the minimum ad spend you''ll work with?', 'We generally take on accounts spending ₹50,000/month or more on media, since that''s roughly the floor where structured testing starts producing reliable data.', 4);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1005', 'srv_1001', 'Is management fee separate from ad spend?', 'Yes. Your ad budget goes straight to Google — we never touch it. Our management fee is billed separately and scoped during onboarding.', 5);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1006', 'srv_1001', 'Can you take over an account mid-flight?', 'Regularly. We start with a structural audit of the existing account before changing anything, so we don''t lose data history or reset the learning phase unnecessarily.', 6);
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1002', 'website-development', '03', 'Website Development', 'Fast, conversion-first sites that don''t fight your marketing.', 'Websites designed and built to convert traffic, not just display it — fast, accessible, and structured so your SEO and paid campaigns have somewhere good to land.', '["Custom builds on modern stacks","Core Web Vitals performance","CMS handoff & training"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1007', 'srv_1002', 'Do we own the code and the CMS after launch?', 'Yes, fully. We build on standard stacks and hand over complete ownership — no agency lock-in, no proprietary CMS you can''t leave.', 7);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1008', 'srv_1002', 'How long does a typical build take?', 'A marketing site is usually 4–6 weeks from signed scope to launch. Larger builds with custom functionality run 8–12 weeks.', 8);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1009', 'srv_1002', 'Will the site be built with SEO in mind from day one?', 'Yes — semantic markup, Core Web Vitals, and crawlability are part of the build spec, not an afterthought bolted on later.', 9);
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1003', 'lead-generation', '04', 'Lead Generation', 'A pipeline that fills itself, on repeat.', 'Full-funnel lead generation across search, social, and email — built to hand your sales team qualified leads, not just form fills.', '["Multi-channel funnel design","Landing pages & lead magnets","CRM-ready lead handoff"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1010', 'srv_1003', 'What counts as a ''qualified'' lead in your reporting?', 'We define qualification criteria with you before launch — company size, budget signals, intent indicators — so ''qualified'' means the same thing to your sales team as it does in our reports.', 10);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1011', 'srv_1003', 'Do you build the CRM integration too?', 'We connect lead sources directly into whatever CRM you already run — HubSpot, Zoho, Salesforce, or a spreadsheet if that''s genuinely what you use.', 11);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1012', 'srv_1003', 'Which channels do you actually use for lead gen?', 'It depends on where your buyers are — usually a mix of search, paid social, and email nurture. We don''t default to one channel because it''s easier to manage.', 12);
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1004', 'social-media-marketing', '05', 'Social Media Marketing', 'A presence that builds trust before the first call.', 'Organic and paid social built around your brand voice — consistent content, targeted campaigns, and reporting that ties back to real business outcomes.', '["Content calendars & creative","Paid social campaigns","Community & reputation management"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1013', 'srv_1004', 'Which platforms do you cover?', 'Instagram, Facebook, and LinkedIn as standard — we''ll add others if that''s genuinely where your audience is, rather than defaulting to everything.', 13);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1014', 'srv_1004', 'Who creates the content — you or us?', 'We handle the calendar, copy, and creative direction. If you have in-house photography or footage, we build around it; if not, we source or produce what''s needed.', 14);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1015', 'srv_1004', 'How is success measured beyond likes and followers?', 'Reach and engagement are inputs, not outcomes. We report against the business goal the channel is actually meant to serve — leads, traffic, or brand recall, depending on your objective.', 15);
INSERT INTO `Service` (`id`, `slug`, `index`, `title`, `promise`, `description`, `bullets`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('srv_1005', 'shopify-wordpress', '06', 'Shopify & WordPress', 'Platforms built to be owned, not rented from an agency.', 'Shopify storefronts and WordPress sites built on clean, maintainable foundations — themes, plugins, and integrations you can hand to any developer later.', '["Theme development & customization","Plugin/app ecosystem setup","Speed & security hardening"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1016', 'srv_1005', 'Shopify or WordPress — how do we decide?', 'Shopify for stores selling physical or digital products at any real volume; WordPress for content-led sites and brochure sites. We''ll recommend one during scoping, not push our preference.', 16);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1017', 'srv_1005', 'Can you migrate our existing store or site?', 'Yes — including product catalogs, blog content, and where possible, redirect maps so existing SEO rankings survive the move.', 17);
INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES ('srvfaq_1018', 'srv_1005', 'Do you offer ongoing maintenance after launch?', 'We offer a monthly retainer for updates, security patches, and small changes. It''s optional — the site is yours to maintain independently if you''d rather.', 18);

-- Blog Posts & Content Blocks
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1000', 'ecommerce-website-development-cost-in-india', 'eCommerce Website Development Cost in India: Pricing Breakdown', 'What actually drives the price of an online store — platform, design complexity, integrations — and where budgets typically land.', '2026-06-21 00:00:00.000', 'Web Development', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1001', 'post_1000', 'paragraph', 'Planning an ecommerce website in India presents both excitement and complexity. Development costs are not standardized — they fluctuate based on platform choice, desired features, design requirements, and long-term support needs. Some businesses start with simple templates, while others require custom features from inception. This guide explains real cost factors to help you set an accurate budget.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1002', 'post_1000', 'h2', 'Basic vs. custom eCommerce websites', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1003', 'post_1000', 'paragraph', 'Basic setups can start at roughly ₹5,000 and extend to ₹50,000, with most small businesses spending between ₹50,000 and ₹4,00,000. These stores include essential features: payment options, product pages, shopping carts, mobile responsiveness, and basic branding — enough to launch quickly and test demand.', '[]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1004', 'post_1000', 'paragraph', 'Growing and mid-market stores typically invest ₹4,00,000 to ₹20,00,000; enterprise and marketplace builds start at ₹20,00,000+. That range buys custom design, advanced navigation and filtering, user accounts, automation, and third-party integrations — real engineering effort, not a template tweak.', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1005', 'post_1000', 'h2', 'Ready-made platforms vs. custom development', '[]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1006', 'post_1000', 'paragraph', 'Template-based platforms (Shopify, WooCommerce) cost less upfront and launch faster but limit customization and flexibility. Custom-built stores need a larger initial investment but give you full control over UX, branding, and scalability. Builders are cheaper to start; developers pay off for businesses with specialized requirements.', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1007', 'post_1000', 'h2', 'What actually drives the price', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1008', 'post_1000', 'list', NULL, '["Website complexity — subscriptions, advanced search, loyalty programs, or vendor/marketplace management add real development and testing time","Number of products and categories — larger catalogs need more data handling, migration, and navigation design","Platform choice — Shopify (simple, hosted, monthly fee), WooCommerce (open-source, more setup), Magento (built for scale), or fully custom","Integrations — payment gateways, ERP/CRM connections, shipping rules, and analytics dashboards each add build hours"]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1009', 'post_1000', 'h2', 'Component-wise cost breakdown', '[]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1010', 'post_1000', 'list', NULL, '["Domain: ₹300–₹2,000/year","Hosting: ₹0–₹5,000/month (shared/SaaS) up to ₹30,000–₹3,00,000+/month for managed, scalable infrastructure","Design & UI/UX: ₹5,000–₹50,000 for a template setup, ₹50,000–₹6,00,000 for custom/responsive design","Payment gateway integration: ₹0–₹50,000 setup, plus 1.5%–3% per transaction on an ongoing basis","Security (SSL, firewalls): free to ₹5,000/year for small stores; ₹50,000–₹5,00,000+ for larger compliance needs","SEO & marketing setup: ₹10,000–₹1,00,000 for basic optimization, before paid campaigns"]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1011', 'post_1000', 'h2', 'Ongoing maintenance and annual costs', '[]', 10);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1012', 'post_1000', 'paragraph', 'Post-launch spending continues indefinitely — platform updates, bug fixes, backups, and plugin checks keep a store functional and secure. Small sites typically need ₹5,000–₹20,000 a month in upkeep; larger, complex sites run ₹50,000–₹5,00,000+ a month. Budget for this from day one rather than treating it as optional.', '[]', 11);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1013', 'post_1000', 'h2', 'Hidden charges to ask about upfront', '[]', 12);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1014', 'post_1000', 'list', NULL, '["Third-party integrations — payment, shipping, CRM, chat, and inventory tools each carry setup and sometimes ongoing fees","Platform subscription fees — SaaS plans typically run ₹500–₹10,000 a month and add up over a year","Data migration and testing — moving product data, customer records, and order history from a legacy system is real work, not an afterthought"]', 13);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1015', 'post_1000', 'h2', 'City-wise price variation across India', '[]', 14);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1016', 'post_1000', 'paragraph', 'Tier 1 cities carry a premium: a basic site in Bangalore typically runs ₹1,20,000–₹1,75,000, Mumbai ₹90,000–₹1,60,000, and Delhi-NCR ₹75,000–₹1,60,000, with custom builds reaching several times that. Tier 2 cities like Pune, Chennai, and Kolkata offer meaningfully lower pricing without a real quality drop for most small-business needs.', '[]', 15);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1001', 'post_1000', 'What is the average cost of developing an e-commerce website in India?', 'It varies by business model and scope. Basic small-business builds start around ₹50,000; more polished sites reach ₹4,00,000. Advanced stores with custom features and integrations cost more.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1002', 'post_1000', 'Are there affordable packages for startups?', 'Yes — template-based or simple SaaS setups offer lower-cost packages that let you launch and validate demand before investing in a custom build.', 1);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1003', 'post_1000', 'How do India costs compare to other countries?', 'Ecommerce development in India generally costs less than in many other markets, and the range of platforms — from simple stores to fully custom builds — makes it easier to match a budget to real needs.', 2);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1001', 'what-is-lead-generation-strategy-and-best-practices', 'What Is Lead Generation: Strategy and Best Practices for B2B Marketers', 'A practical rundown of how B2B teams build a pipeline that doesn''t dry up the moment a campaign ends.', '2026-06-15 00:00:00.000', 'Lead Generation', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1017', 'post_1001', 'paragraph', 'Lead generation converts marketing effort into genuine business opportunity. It identifies potential buyers and moves them toward a purchase decision. For B2B companies, it builds awareness, sparks interest, and keeps prospects engaged until they''re ready for a sales conversation.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1018', 'post_1001', 'h2', 'What lead generation actually means', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1019', 'post_1001', 'paragraph', 'You provide something valuable — a guide, a webinar, a free tool — and when a prospect responds, you gain the opening to build a relationship. That usually starts with inbound: someone finds your blog, landing page, or webinar while searching for a solution, exchanges contact details for the resource, and gives you permission to follow up.', '[]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1020', 'post_1001', 'h2', 'How the process works', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1021', 'post_1001', 'list', NULL, '["Generate awareness through content, email, or events","Drive action through form submissions, registrations, or sign-ups","Use marketing automation for timely follow-up","Nurture leads with relevant messaging and offers","Hand qualified prospects to sales once readiness signals appear"]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1022', 'post_1001', 'h2', 'Inbound vs. outbound', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1023', 'post_1001', 'paragraph', 'Inbound attracts prospects through valuable content before any pitch — blogs, webinars, videos, and SEO that surface when buyers are already searching. Outbound initiates contact directly: cold calls, targeted email, direct mail, and paid ads. Outbound works when the message is personalized to the recipient''s role and challenges, not a generic blast.', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1024', 'post_1001', 'h2', 'Common B2B lead generation strategies', '[]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1025', 'post_1001', 'list', NULL, '["Content marketing and lead magnets — case studies, whitepapers, checklists, and free trials","SEO and paid advertising working together — SEO for sustainable long-term reach, paid to accelerate results while rankings build","Social and LinkedIn outreach — educational posts, direct outreach to targets, fast response times","Webinars and events — registration signals real interest, stronger than a passive site visit"]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1026', 'post_1001', 'h2', 'Choosing the right tools', '[]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1027', 'post_1001', 'paragraph', 'A CRM centralizes prospect history so nothing gets duplicated across a team. Email automation platforms send triggered, personalized follow-ups at scale. Analytics and A/B testing replace guesswork — you can''t improve a page, email, or ad you haven''t measured.', '[]', 10);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1028', 'post_1001', 'h2', 'Best practices that actually move the needle', '[]', 11);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1029', 'post_1001', 'list', NULL, '["Qualify and score leads against a clear ideal customer profile — not every form fill deserves equal attention","Nurture at the buyer''s pace; B2B purchases involve research, comparison, and internal approval","Measure ROI past form fills — track which channels produce leads that actually convert to revenue"]', 12);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1004', 'post_1001', 'What is the difference between lead generation and sales?', 'Lead generation fills the pipeline by attracting and qualifying interest through marketing. Sales then engages those opportunities directly and moves them toward a purchase decision.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1005', 'post_1001', 'Why does lead generation matter for online businesses?', 'It converts website visitors into real business opportunities by capturing contact information and enabling strategic follow-up — without it, traffic rarely turns into revenue on its own.', 1);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1006', 'post_1001', 'What best practices should businesses follow?', 'Target the right audience with genuinely valuable content, keep forms short, follow up quickly, measure results, and use lead scoring to prioritize quality over raw volume.', 2);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1002', 'lead-generation-vs-prospecting', 'Lead Generation vs Prospecting', 'Two terms marketing and sales teams use interchangeably — and why mixing them up costs you pipeline.', '2026-06-15 00:00:00.000', 'Lead Generation', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1030', 'post_1002', 'paragraph', 'If you want more customers, you need to know where they actually are in the sales process. Lead generation gets people interested and brings new names into the funnel. Prospecting checks whether someone is genuinely interested and moves them closer to a deal. They''re both essential, and they''re not the same job.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1031', 'post_1002', 'h2', 'Defining lead generation', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1032', 'post_1002', 'paragraph', 'Lead generation means bringing in people who could want what you sell and getting their contact details — usually owned by marketing. Common tactics: content marketing, SEO, paid ads, webinars, and social campaigns, backed by a lead magnet (a whitepaper, tool, or webinar) and a landing page that captures the details. It''s one-to-many: campaigns built to reach a wide group and find who''s interested.', '[]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1033', 'post_1002', 'h2', 'Defining prospecting', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1034', 'post_1002', 'paragraph', 'Prospecting starts once you have names or target accounts. Sales reps reach out directly — outbound email, LinkedIn, referrals, networking, cold calling — not just to make contact, but to start a real conversation and check fit. It''s one-to-one, faster, and more direct than lead generation.', '[]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1035', 'post_1002', 'h2', 'Why the distinction matters', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1036', 'post_1002', 'paragraph', 'Treat every contact the same way and your team wastes time on people who aren''t ready to buy. Clear definitions let marketing focus on lead quality and sales focus on qualification and relationship-building — which makes conversion rates better and forecasting more reliable.', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1037', 'post_1002', 'h2', 'Key differences at a glance', '[]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1038', 'post_1002', 'list', NULL, '["Owner — marketing owns lead generation, sales owns prospecting","Goal — attract and capture interest vs. qualify and advance it","Funnel stage — top of funnel vs. middle, toward opportunity","Methods — SEO, ads, webinars, content vs. calls, emails, LinkedIn, referrals","KPIs — cost per lead and click-through rate vs. response rates and meetings booked"]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1039', 'post_1002', 'h2', 'When to prioritize one over the other', '[]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1040', 'post_1002', 'paragraph', 'Lean into lead generation when entering a new market, launching something new, or when the top of the funnel is thin. Lean into prospecting when you already have a full list of leads, need deals faster, or want specific target accounts. Most of the time it''s not either/or — it''s noticing which stage needs attention right now.', '[]', 10);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1007', 'post_1002', 'How does the conversion process differ between leads and prospects?', 'Leads are early-stage and convert as they receive the right content and nurturing. Prospects have already been vetted and talked to, so they typically move faster and with clearer next steps.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1008', 'post_1002', 'Are there industries where prospecting outperforms lead generation?', 'Yes — in B2B markets with a small target audience and named accounts, direct outreach usually wins new business faster than waiting on broad marketing programs.', 1);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1003', 'google-search-algorithm-updates', 'Google Search Algorithm Updates', 'What changed, what it actually affects, and how we adjust technical SEO work when Google ships an update.', '2026-06-14 00:00:00.000', 'SEO', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1041', 'post_1003', 'paragraph', 'Google updates its search engine continuously to improve result quality. Most changes are invisible, but major updates can shift rankings across entire industries overnight. Understanding the different types helps you tell a real quality problem from routine algorithm noise.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1042', 'post_1003', 'h2', 'Types of updates', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1043', 'post_1003', 'list', NULL, '["Core updates — broad recalibrations of how Google evaluates relevance and quality across the whole web, not targeted at one problem","Spam updates — target link spam, artificial link building, and scaled content abuse via Google''s SpamBrain system","Helpful content updates — reward original, people-first content over material written purely to rank","Product review updates — favor in-depth, experience-based reviews over thin summaries or manufacturer copy"]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1044', 'post_1003', 'h2', 'Recent major updates', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1045', 'post_1003', 'list', NULL, '["August 2024 core update — aimed to surface higher-quality content and reduce low-value SEO pages","December 2024 spam update — strengthened detection of link spam and manipulative tactics","June 2025 core update — reassessed long-term site signals globally, not isolated page issues","Explicit fake content update (July 2024) — targeted deepfakes and non-consensual synthetic media"]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1046', 'post_1003', 'h2', 'How updates affect rankings', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1047', 'post_1003', 'paragraph', 'During a core update, positions shift as Google re-evaluates content against new criteria — a drop doesn''t always mean your content got worse, sometimes a competing page simply satisfies the updated criteria better. Recovery takes sustained work: stronger answers, clearer structure, and removing thin content that existed only to rank, not quick fixes.', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1048', 'post_1003', 'h2', 'What to actually do about it', '[]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1049', 'post_1003', 'list', NULL, '["Compare before/after performance in Search Console to identify which sections were actually affected","Improve content with original insight, updated information, and demonstrated expertise","Review technical health — crawlability, page structure, and internal linking — alongside content quality"]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1050', 'post_1003', 'h2', 'Why SEO still matters with AI Overviews', '[]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1051', 'post_1003', 'paragraph', 'AI Overviews synthesize answers directly on the results page, which changes click patterns, but Google still needs crawlable, well-structured web content to power those answers. Technical health, clear content, and demonstrated trustworthiness matter for both traditional rankings and AI-surfaced results.', '[]', 10);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1009', 'post_1003', 'How do I know if an update affected my site?', 'Check Search Console for timing correlations, page-specific ranking changes, and shifts in impressions and clicks around known update windows. Site-wide drops usually point to algorithm impact; isolated page drops often point to competition or content-specific issues.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1010', 'post_1003', 'What''s the difference between a core update and other updates?', 'Core updates recalibrate quality assessment broadly across many topics. Specialized updates — spam, product reviews, helpful content — target one specific issue at a time.', 1);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1004', '4-steps-of-the-lead-generation-process', 'Which Are the 4 Steps of the Lead Generation Process?', 'Awareness, capture, nurture, conversion — the stages every lead actually moves through before it becomes revenue.', '2026-06-14 00:00:00.000', 'Lead Generation', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1052', 'post_1004', 'paragraph', 'A structured lead generation process moves potential customers through the funnel systematically instead of by guesswork. The four steps: attract, capture, qualify, and nurture toward conversion. Getting this right is what lets marketing and sales work from the same definitions.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1053', 'post_1004', 'h2', 'Step 1 — Attracting potential leads', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1054', 'post_1004', 'paragraph', 'People won''t hand over contact information without first knowing you exist. This stage builds awareness through blog content addressing real pain points, lead magnets, social engagement, focused landing pages, webinars, and targeted advertising — relationship-building before any pitch.', '[]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1055', 'post_1004', 'h2', 'Step 2 — Capturing lead information', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1056', 'post_1004', 'paragraph', 'Once you have attention, capture contact details through forms, landing pages, or gated offers. Ask only for what you genuinely need, match form length to the value of the offer, and keep the data clean — duplicate or stale records quietly waste sales time later.', '[]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1057', 'post_1004', 'h2', 'Step 3 — Qualifying leads', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1058', 'post_1004', 'paragraph', 'Not every captured lead deserves equal attention. A qualified lead shows strong alignment with your ideal customer profile, a specific need your product addresses, and repeated engagement with your content. Lead scoring — points for role, industry, company size, and engagement — helps route the right leads to sales first.', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1059', 'post_1004', 'h2', 'Step 4 — Nurturing and converting', '[]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1060', 'post_1004', 'paragraph', 'Nurturing keeps prospects engaged until they''re ready to buy: emails relevant to what they''ve already downloaded, role-specific messaging, and timely follow-up matched to buying stage. Measure success through conversion rate, email engagement, and sales cycle velocity — not just how many leads you generated.', '[]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1061', 'post_1004', 'h2', 'Common bottlenecks', '[]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1062', 'post_1004', 'list', NULL, '["Traffic that doesn''t convert to form submissions — usually an offer or targeting problem","High lead volume but poor quality — usually a qualification or targeting problem","Qualified leads stalling before purchase — usually a nurturing or follow-up timing problem"]', 10);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1063', 'post_1004', 'paragraph', 'Breaking the funnel into these four stages makes it much easier to see exactly where a specific campaign is actually losing people, instead of guessing at the funnel as a whole.', '[]', 11);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1011', 'post_1004', 'Are the four steps different for B2B and B2C?', 'Yes. B2B typically involves longer sales cycles with slower, multi-stakeholder decisions. B2C prioritizes quick responses and emotional triggers that drive faster purchases.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1012', 'post_1004', 'Why follow all four steps in order?', 'Each step builds on the one before it. Skipping a step — qualifying before you''ve genuinely attracted the right audience, for example — makes it much harder to diagnose what''s actually not working.', 1);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1005', '5-golden-rules-of-a-website', 'What Are the 5 Golden Rules of a Website?', 'The non-negotiables we check for on every build, before design opinions or brand preferences enter the conversation.', '2026-06-14 00:00:00.000', 'Web Development', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1064', 'post_1005', 'paragraph', 'A quality website is more than a digital brochure — it has to communicate value, build trust, and move a visitor toward action. These five principles hold up regardless of industry, and they''re what we check first on every build, before any conversation about design taste.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1065', 'post_1005', 'h2', '1. Prioritize user experience', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1066', 'post_1005', 'paragraph', 'Good UX means a visitor understands what you do and where to click next within seconds — clear menus, content that matches what the page promised, consistent layouts, and touch-friendly design. Ask honestly: does a new visitor find what they need within seconds, or are they hunting?', '[]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1067', 'post_1005', 'h2', '2. Embrace mobile-first, responsive design', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1068', 'post_1005', 'paragraph', 'Most traffic now arrives on a phone. Design for the smallest screen first, then scale up — large tappable buttons, compressed images, simplified menus, and real testing across device sizes rather than assuming a desktop layout will "just work" smaller.', '[]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1069', 'post_1005', 'h2', '3. Optimize speed and performance', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1070', 'post_1005', 'paragraph', 'Visitors don''t wait for a slow site — they leave before they ever see your offer. Compress images, cut unnecessary code and plugins, use caching and a CDN, and choose hosting that holds up under real traffic. Speed is also a ranking factor, so this pays off twice.', '[]', 6);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1071', 'post_1005', 'h2', '4. Maintain consistency and visual hierarchy', '[]', 7);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1072', 'post_1005', 'paragraph', 'Repeated colors, fonts, and layouts across pages prevent visitors from feeling disoriented and reinforce brand identity. Visual hierarchy — spacing, headings, button placement — tells the eye what to look at first, second, and third. Without it, even good content feels cluttered.', '[]', 8);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1073', 'post_1005', 'h2', '5. Guide visitors with clear calls-to-action', '[]', 9);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1074', 'post_1005', 'paragraph', 'Every page needs one obvious next step — book, buy, sign up, or request a quote. Multiple competing CTAs confuse visitors into taking none of them. Position the CTA after you''ve built enough trust (service details, proof, benefits), not before.', '[]', 10);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1075', 'post_1005', 'h2', 'Common mistakes that undo all five', '[]', 11);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1076', 'post_1005', 'list', NULL, '["Overcrowded pages with too many competing messages or links","Mobile treated as an afterthought instead of the primary design target","Inconsistent fonts, colors, or button styles across pages","Unnecessary plugins quietly dragging down load speed"]', 12);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1013', 'post_1005', 'Are the 5 golden rules different for personal vs. business sites?', 'They apply equally to both. Priorities shift, but clarity, speed, mobile usability, consistency, and a clear next step improve every type of site.', 0);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1014', 'post_1005', 'How much do these rules actually affect success?', 'Directly — faster, clearer, more usable sites keep visitors longer and convert more of them, and search engines reward the same fundamentals with better rankings.', 1);
INSERT INTO `BlogPost` (`id`, `slug`, `title`, `excerpt`, `date`, `category`, `status`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('post_1006', '12-popular-types-of-websites-you-can-create', '12 Popular Types of Websites You Can Create', 'From brochure sites to marketplaces — a field guide to picking the right structure for what you''re actually building.', '2026-06-14 00:00:00.000', 'Web Development', 'published', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1077', 'post_1006', 'paragraph', 'Picking the right website format matters more than picking a color scheme. Different sites serve different jobs — selling, building trust, teaching, or bringing a community together — and the strongest builds start from purpose, not aesthetics.', '[]', 0);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1078', 'post_1006', 'h2', 'The 12 types', '[]', 1);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1079', 'post_1006', 'list', NULL, '["E-commerce — direct product sales; success depends on clear product pages, fast search, and simple checkout","Business — explains what you do and why to trust you; strong value proposition and visible contact info","Portfolio — a curated set of work with context on the process and outcome, not everything you''ve ever made","Personal — your story and identity, not just work samples; suits freelancers, speakers, and job seekers","Blog — frequent posting that builds authority over time; readability and structure matter more than volume","Educational — courses, tutoring, or training content; needs intuitive navigation for large amounts of content","Nonprofit — communicates mission, shows impact, and drives donations or volunteer sign-ups through trust","News/magazine — fast-loading, well-organized, frequently updated; speed affects credibility directly","Membership — gates premium content or community behind sign-up; the post-login experience matters as much as the sales page","Event — promotes a specific occasion; visitors want date, location, price, and agenda immediately","Community forum — organizes discussion by topic; value comes from active participation, not the platform itself","Real estate — centralizes listings, photos, and location detail with clear next steps for buyers or renters"]', 2);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1080', 'post_1006', 'h2', 'Choosing the right one', '[]', 3);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1081', 'post_1006', 'paragraph', 'Start with what you want visitors to actually do: buy, read, sign up, learn, donate, or get in touch. That answer usually narrows the format quickly. Small businesses typically start with a business site or an online store; creatives lean toward portfolios; schools and trainers need educational structure; mission-driven groups need a nonprofit format built around trust.', '[]', 4);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1082', 'post_1006', 'h2', 'What stays constant across all 12', '[]', 5);
INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES ('blk_1083', 'post_1006', 'list', NULL, '["Mobile-friendly, readable design regardless of format","One clear primary action per page","Simple, intuitive navigation — especially for content-heavy formats like education or news","Regular updates to keep content current and useful"]', 6);
INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES ('blogfaq_1015', 'post_1006', 'Which website type is best for a small business?', 'A business website is usually the right starting point for generating leads and building trust; if you''re selling products directly, an e-commerce site is worth building from day one instead.', 0);

-- Case Studies
INSERT INTO `CaseStudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('work_1000', 'northline-interiors', 'Northline Interiors', 'SEO · Website Development', 'Rebuilt a slow, unranked WordPress site and ran a 6-month technical + content SEO push into a competitive local market.', '+312% organic traffic', 'interiors', 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `CaseStudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('work_1001', 'vantage-fitness', 'Vantage Fitness', 'PPC · Lead Generation', 'Restructured a fragmented Google Ads account into tightly themed campaigns with conversion-tuned landing pages.', '3.9x ROAS', 'fitness', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `CaseStudy` (`id`, `slug`, `client`, `category`, `summary`, `resultLabel`, `variant`, `order`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('work_1002', 'coastal-goods-co', 'Coastal Goods Co.', 'Shopify · Social Media Marketing', 'Migrated a legacy storefront to Shopify and paired the launch with a paid + organic social campaign.', '2.4x revenue in 90 days', 'ecommerce', 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);

-- Products & Specs
INSERT INTO `Product` (`id`, `slug`, `name`, `category`, `price`, `originalPrice`, `description`, `features`, `benefits`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('prod_1000', 'guest-posting', 'Guest Posting', 'SEO', 5000, 6000, 'Guest posting is one of the most effective off-page SEO strategies to build credibility and drive targeted traffic — manual, high-authority, and niche-relevant placements for long-term SEO success.', '["High-authority backlinks from niche-relevant websites","SEO-optimized, original content creation","Manual outreach and placements","Do-follow link provision","Anchor text and keyword optimization","Detailed reporting with performance metrics"]', '["Improved search rankings","Increased domain authority","Enhanced website traffic","Stronger brand credibility","Sustainable SEO growth"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1001', 'prod_1000', 'Website type', 'Business', 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1002', 'prod_1000', 'Language', 'English', 1);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1003', 'prod_1000', 'Service mode', 'Remote / Online', 2);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1004', 'prod_1000', 'Duration', '5–7 days', 3);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1005', 'prod_1000', 'Word count', '800–1,200 words', 4);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1006', 'prod_1000', 'Website authority', '60+ DA', 5);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1007', 'prod_1000', 'Backlinks', '1 do-follow + 2 no-follow', 6);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1008', 'prod_1000', 'Writer qualification', '5+ years experience', 7);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1009', 'prod_1000', 'Revisions', '2 free revisions', 8);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1010', 'prod_1000', 'Service location', 'Pan India', 9);
INSERT INTO `Product` (`id`, `slug`, `name`, `category`, `price`, `originalPrice`, `description`, `features`, `benefits`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('prod_1001', 'high-da-backlink', 'High DA Backlink', 'SEO', 1999, 2499, 'Increase domain authority, improve Google rankings, and drive organic traffic through quality backlinks from high-authority sites — built using white-hat SEO methods only.', '["Guest posting on authority blogs and niche websites","Contextual, in-content backlinks with relevant anchor text","Industry-specific, niche-relevant link building","Business profile and directory submissions","SEO-optimized article submissions with backlinks","Dofollow backlinks for SEO value","Competitor backlink analysis","Monthly backlink reporting with DA metrics"]', '["Higher search rankings","Increased domain authority","More organic traffic","Improved credibility","Long-term SEO growth"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1011', 'prod_1001', 'Pricing model', 'Project based', 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1012', 'prod_1001', 'Duration', '3 months', 1);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1013', 'prod_1001', 'Team size', '2–5 experts', 2);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1014', 'prod_1001', 'Service location', 'Pan India', 3);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1015', 'prod_1001', 'Delivery', 'Remote', 4);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1016', 'prod_1001', 'Reporting', 'Monthly', 5);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1017', 'prod_1001', 'Industries', 'Education, Automotive, Travel, Hospitality, Ecommerce, Healthcare, Real Estate, IT Services, Finance, Manufacturing', 6);
INSERT INTO `Product` (`id`, `slug`, `name`, `category`, `price`, `originalPrice`, `description`, `features`, `benefits`, `createdAt`, `updatedAt`, `noIndex`) VALUES ('prod_1002', 'web-2-0-backlink', 'Web 2.0 Backlink', 'SEO', NULL, NULL, 'Build high-quality Web 2.0 backlinks to strengthen your SEO — manually constructed Web 2.0 properties on trusted platforms with unique, relevant content that links back to your website.', '["Manual creation of Web 2.0 properties on trusted platforms","Unique, relevant content publication","Natural backlinking to your website","Enhanced website authority and credibility","Improved search engine understanding of website relevance","Long-term SEO growth support"]', '["Stronger website authority","Better search engine visibility","Improved organic rankings","Long-term SEO development"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1018', 'prod_1002', 'Pricing', 'Custom quote', 0);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1019', 'prod_1002', 'Delivery', 'Remote', 1);
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES ('spec_1020', 'prod_1002', 'Service location', 'Pan India', 2);

-- Testimonials
INSERT INTO `Testimonial` (`id`, `quote`, `name`, `role`, `published`, `order`, `createdAt`, `updatedAt`) VALUES ('testi_1000', 'Our cost-per-lead dropped within the first month of handing PPC over to GGM. The reporting is honest — they tell us what isn''t working, not just what is.', 'Riya Jain', 'Lead Manager', 1, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
INSERT INTO `Testimonial` (`id`, `quote`, `name`, `role`, `published`, `order`, `createdAt`, `updatedAt`) VALUES ('testi_1001', 'GGM restructured our Google Ads account from scratch and it finally made sense. We stopped bidding against ourselves and started seeing real ROAS.', 'Swastika Pandey', 'Sales Manager', 1, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
INSERT INTO `Testimonial` (`id`, `quote`, `name`, `role`, `published`, `order`, `createdAt`, `updatedAt`) VALUES ('testi_1002', 'What stood out was how closely they tracked spend versus qualified leads, not just clicks. Our sales team actually wants the leads now.', 'Bhavana Panjabi', 'Lead Manager', 1, 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
INSERT INTO `Testimonial` (`id`, `quote`, `name`, `role`, `published`, `order`, `createdAt`, `updatedAt`) VALUES ('testi_1003', 'We''d burned budget with two agencies before GGM. The difference was structure — clear campaigns, clear numbers, no guessing.', 'Anjali Agarwal', 'Sales Manager', 1, 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Site Settings & Home/About content
INSERT INTO `SiteSettings` (`id`, `name`, `tagline`, `eyebrow`, `phone`, `phoneHref`, `email`, `addressLine1`, `addressLine2`, `addressLine3`, `gst`, `businessHours`, `aboutEyebrow`, `aboutTitle`, `aboutIntro`, `mission`, `vision`, `clients`, `updatedAt`) VALUES ('settings_1001', 'GGM Technologies', 'Rank higher. Spend smarter. Grow faster.', 'New Delhi · Digital Growth Partner', '+91 9002600880', 'tel:+919002600880', 'info@ggmtechnologies.com', '4th Floor, 400-A, 12 Ajit Singh House', 'Yusuf Sarai Commercial Complex, Green Park', 'New Delhi 110016', '07ELUPM2384A1ZV', 'Monday – Sunday: 9:00 AM – 9:00 PM', 'About GGM', 'We treat marketing spend like an investment, not an expense.', 'GGM Technologies is a New Delhi–based digital agency specializing in website development, WordPress, Shopify, SEO, digital marketing, and lead generation solutions that help businesses build a strong online presence and achieve sustainable growth.', 'Empower businesses with innovative website development, lead generation, and PPC marketing solutions that drive measurable growth, enhance brand visibility, and create long-term digital success.', 'Become a globally recognized digital solutions provider, helping businesses of all sizes unlock their full potential through cutting-edge technology, strategic marketing, and performance-driven digital solutions.', '["Northline Interiors","Vantage Fitness","Coastal Goods Co.","Meridian Law Partners","Ashoka Realty Group","Verve Wellness"]', CURRENT_TIMESTAMP(3));
INSERT INTO `WhyChooseUs` (`id`, `settingsId`, `title`, `description`, `order`) VALUES ('why_1000', 'settings_1001', 'Excellent support', 'Prompt communication, expert consultation, and reliable solutions — with assistance always available when you need it.', 0);
INSERT INTO `WhyChooseUs` (`id`, `settingsId`, `title`, `description`, `order`) VALUES ('why_1001', 'settings_1001', 'Expert team', 'Developers, marketers, and digital strategists bringing years of industry experience and innovative thinking to every project.', 1);
INSERT INTO `WhyChooseUs` (`id`, `settingsId`, `title`, `description`, `order`) VALUES ('why_1002', 'settings_1001', 'Faster performance', 'Optimized websites and smart digital strategies that enhance speed, user experience, and business performance.', 2);
INSERT INTO `MetricItem` (`id`, `settingsId`, `value`, `suffix`, `label`, `order`) VALUES ('metric_1000', 'settings_1001', 250, '+', 'Projects delivered', 0);
INSERT INTO `MetricItem` (`id`, `settingsId`, `value`, `suffix`, `label`, `order`) VALUES ('metric_1001', 'settings_1001', 4.8, 'x', 'Avg. ROAS lift', 1);
INSERT INTO `MetricItem` (`id`, `settingsId`, `value`, `suffix`, `label`, `order`) VALUES ('metric_1002', 'settings_1001', 12, '', 'Industries served', 2);
INSERT INTO `MetricItem` (`id`, `settingsId`, `value`, `suffix`, `label`, `order`) VALUES ('metric_1003', 'settings_1001', 45, ' days', 'Avg. time to page one', 3);

-- SEO Analytics & Credentials Settings
CREATE TABLE IF NOT EXISTS `SeoSettings` (
    `id` VARCHAR(191) NOT NULL,
    `ahrefsVerification` VARCHAR(255) NULL,
    `googleVerification` VARCHAR(255) NULL,
    `ahrefsApiKey` VARCHAR(255) NULL,
    `targetDomain` VARCHAR(191) NOT NULL DEFAULT 'ggmtechnologies.com',
    `keywords` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `SeoSettings` (`id`, `targetDomain`, `keywords`, `updatedAt`) VALUES ('seo_settings_1', 'ggmtechnologies.com', '["Digital Marketing Agency in Delhi", "SEO Services Delhi", "Web Development Company Delhi", "Lead Generation Agency Delhi", "PPC Agency Delhi", "Shopify Development Delhi"]', CURRENT_TIMESTAMP(3));

SET FOREIGN_KEY_CHECKS = 1;
