-- ==============================================================================
-- GGM Technologies: Add Web Development Packages to Shop
-- 1. WordPress Website Development (₹15,000)
-- 2. Shopify E-Commerce Store (₹25,000)
-- 3. Next.js Custom Web Application (₹35,000)
-- ==============================================================================

-- 1. Insert / Update WordPress Package
INSERT INTO `Product` (
  `id`, `slug`, `name`, `category`, `price`, `originalPrice`,
  `description`, `features`, `benefits`,
  `metaTitle`, `metaDescription`, `ogImage`, `canonicalOverride`, `noIndex`,
  `createdAt`, `updatedAt`
) VALUES (
  'prod_wordpress',
  'wordpress-website-development',
  'WordPress Website Development Package',
  'Web Development',
  15000,
  25000,
  'Complete, high-performance WordPress website engineered for businesses, agencies, and service providers. Includes bespoke Elementor / Gutenberg design, 100% mobile responsiveness, Core Web Vitals speed optimization (< 1.5s load time), on-page SEO setup, lead capture forms, WhatsApp chat integration, and SSL security hardening.',
  '["Custom 5 to 8 Page Responsive WordPress Design (Home, About, Services, Blog, Contact)", "Mobile-First & Tablet Optimized Layout with 100% Cross-Browser Compatibility", "Fast PageSpeed Optimization with Server Caching & WebP Image Compression", "Essential On-Page Technical SEO, Meta Tags & Google Search Console Setup", "Interactive Contact Forms & Direct One-Click WhatsApp Chat Integration", "Free SSL Installation, Security Hardening & Anti-Spam Protection", "User-Friendly Admin Dashboard with Drag-and-Drop Page Builder", "30 Days Complimentary Post-Launch Support & Admin Video Handover"]',
  '["Turnkey website ready to generate leads within 5 to 7 business days", "Easy drag-and-drop CMS allowing your team to update text and photos without coding", "Clean, lightweight architecture ensuring fast Google page rankings", "100% ownership with complete admin credentials and source code handover", "Zero monthly lock-in contracts or recurring agency maintenance fees"]',
  'WordPress Website Development Package (₹15,000) | GGM Technologies',
  'Get a custom, responsive, high-speed WordPress website for just ₹15,000. Mobile-first design, SEO-optimized, contact forms, WhatsApp chat, and 30 days free support.',
  '/images/web-development-banner.png',
  NULL,
  0,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `slug` = VALUES(`slug`),
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `price` = VALUES(`price`),
  `originalPrice` = VALUES(`originalPrice`),
  `description` = VALUES(`description`),
  `features` = VALUES(`features`),
  `benefits` = VALUES(`benefits`),
  `metaTitle` = VALUES(`metaTitle`),
  `metaDescription` = VALUES(`metaDescription`),
  `ogImage` = VALUES(`ogImage`),
  `updatedAt` = NOW(3);

-- Specs for WordPress
DELETE FROM `ProductSpec` WHERE `productId` = 'prod_wordpress';
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES
('spec_prod_wordpress_1', 'prod_wordpress', 'Platform', 'WordPress / WooCommerce', 1),
('spec_prod_wordpress_2', 'prod_wordpress', 'Turnaround Time', '5–7 Days', 2),
('spec_prod_wordpress_3', 'prod_wordpress', 'Pages Included', 'Up to 8 Custom Pages', 3),
('spec_prod_wordpress_4', 'prod_wordpress', 'Design System', 'Elementor Pro / Modern Gutenberg', 4),
('spec_prod_wordpress_5', 'prod_wordpress', 'Mobile Optimization', '100% Mobile & Tablet Responsive', 5),
('spec_prod_wordpress_6', 'prod_wordpress', 'SEO Readiness', 'On-Page Schema & Meta Tags Included', 6),
('spec_prod_wordpress_7', 'prod_wordpress', 'Support & Warranty', '30 Days Free Technical Support', 7),
('spec_prod_wordpress_8', 'prod_wordpress', 'Asset Ownership', '100% Full Admin & Files Handover', 8);


-- 2. Insert / Update Shopify Package
INSERT INTO `Product` (
  `id`, `slug`, `name`, `category`, `price`, `originalPrice`,
  `description`, `features`, `benefits`,
  `metaTitle`, `metaDescription`, `ogImage`, `canonicalOverride`, `noIndex`,
  `createdAt`, `updatedAt`
) VALUES (
  'prod_shopify',
  'shopify-store-development',
  'Shopify E-Commerce Store Package',
  'E-Commerce Development',
  25000,
  38000,
  'Turnkey, high-converting Shopify store designed to launch and scale your D2C brand or retail business. Includes bespoke Online Store 2.0 theme styling, catalog setup up to 50 products, Indian payment gateway integrations (Razorpay, PhonePe, COD, UPI), automated shipping rates, abandoned cart recovery, high-converting product pages, and mobile checkout optimization.',
  '["Shopify Online Store 2.0 Custom Theme Setup & High-End Brand Styling", "Complete Catalog Setup for Up to 50 Products with Variants & High-Res Galleries", "Seamless Payment Gateway Integration (Razorpay, PhonePe, Cards, UPI, NetBanking, COD)", "High-Converting Product Page Architecture (Sticky Buy Button, Trust Badges, Size Charts)", "Automated Abandoned Cart Recovery Flows & Transactional Email Templates", "Shipping & Delivery Integration (Shiprocket, Delhivery, Pincode Verification)", "Complete E-Commerce Technical SEO, Open Graph & Structured Product Schema", "45 Days Priority Post-Launch Technical Support & Store Operations Training"]',
  '["Sub-second mobile checkout engineered to maximize sales conversions", "Launch a fully functional, live eCommerce store in just 7 to 10 days", "Manage inventory, orders, and customer queries effortlessly from your smartphone", "Zero server management hassles with 99.99% Shopify cloud uptime", "Ready for Meta Ads, Google Shopping Ads & Instagram Shop catalog sync"]',
  'Shopify E-Commerce Store Development Package (₹25,000) | GGM Technologies',
  'Launch your D2C online store with our Shopify development package for ₹25,000. Up to 50 products, Razorpay/UPI/COD payment gateway, Shiprocket sync, and fast checkout.',
  '/images/ecommerce-development-banner.png',
  NULL,
  0,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `slug` = VALUES(`slug`),
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `price` = VALUES(`price`),
  `originalPrice` = VALUES(`originalPrice`),
  `description` = VALUES(`description`),
  `features` = VALUES(`features`),
  `benefits` = VALUES(`benefits`),
  `metaTitle` = VALUES(`metaTitle`),
  `metaDescription` = VALUES(`metaDescription`),
  `ogImage` = VALUES(`ogImage`),
  `updatedAt` = NOW(3);

-- Specs for Shopify
DELETE FROM `ProductSpec` WHERE `productId` = 'prod_shopify';
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES
('spec_prod_shopify_1', 'prod_shopify', 'Platform', 'Shopify / Online Store 2.0', 1),
('spec_prod_shopify_2', 'prod_shopify', 'Turnaround Time', '7–10 Days', 2),
('spec_prod_shopify_3', 'prod_shopify', 'Products Setup', 'Up to 50 Products Included', 3),
('spec_prod_shopify_4', 'prod_shopify', 'Payment Gateways', 'Razorpay, PhonePe, UPI & COD', 4),
('spec_prod_shopify_5', 'prod_shopify', 'Logistics Sync', 'Shiprocket / Delhivery Integration', 5),
('spec_prod_shopify_6', 'prod_shopify', 'Mobile Checkout', 'Optimized 1-Click Fast Checkout', 6),
('spec_prod_shopify_7', 'prod_shopify', 'Support & Warranty', '45 Days Dedicated Support', 7),
('spec_prod_shopify_8', 'prod_shopify', 'Handover', '100% Store Staff Training Included', 8);


-- 3. Insert / Update Next.js Package
INSERT INTO `Product` (
  `id`, `slug`, `name`, `category`, `price`, `originalPrice`,
  `description`, `features`, `benefits`,
  `metaTitle`, `metaDescription`, `ogImage`, `canonicalOverride`, `noIndex`,
  `createdAt`, `updatedAt`
) VALUES (
  'prod_nextjs',
  'nextjs-custom-web-development',
  'Next.js Custom Web Application Package',
  'Full Stack & Next.js',
  35000,
  55000,
  'Enterprise-grade bespoke web application engineered with Next.js 15+ (App Router), React 19, TypeScript, and modern styling. Engineered for businesses requiring blazing sub-500ms speeds, 95+ Google PageSpeed score, server-side rendering (SSR) for top-tier SEO dominance, custom API integrations, dynamic animations, and cloud deployment on Vercel or AWS.',
  '["Next.js 15+ App Router & React 19 Full-Stack Architecture with TypeScript", "95+ Google Lighthouse Score Guaranteed across Performance, Accessibility & SEO", "Server-Side Rendering (SSR) & Static Generation (SSG) for Extreme Search Dominance", "Custom Database & Backend API Integration (MySQL / PostgreSQL / Supabase / Prisma)", "Interactive UI with Tailwind CSS & Fluid GSAP / Framer Motion Micro-Animations", "Dynamic Server Components, Edge Routing, and Instant Sub-500ms Page Transitions", "Production CI/CD Cloud Deployment on Vercel, AWS, or Cloudflare with SSL", "60 Days Extended Post-Launch Support with Git Repository & Source Code Handover"]',
  '["Sub-500ms page transitions that give your business an unfair speed advantage", "Highest possible Google Core Web Vitals score for unmatched organic ranking", "Infinite architectural scalability without the security holes or bloat of legacy CMS plugins", "Complete intellectual property ownership with full clean TypeScript source code", "Zero vendor lock-in with self-hostable modern web standard architecture"]',
  'Next.js Custom Web Application Package (₹35,000) | GGM Technologies',
  'Scale with an ultra-fast Next.js full-stack web application for ₹35,000. 95+ Google PageSpeed, SSR for SEO, TypeScript, custom APIs, and Vercel cloud deployment.',
  '/images/web-development-banner.png',
  NULL,
  0,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `slug` = VALUES(`slug`),
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `price` = VALUES(`price`),
  `originalPrice` = VALUES(`originalPrice`),
  `description` = VALUES(`description`),
  `features` = VALUES(`features`),
  `benefits` = VALUES(`benefits`),
  `metaTitle` = VALUES(`metaTitle`),
  `metaDescription` = VALUES(`metaDescription`),
  `ogImage` = VALUES(`ogImage`),
  `updatedAt` = NOW(3);

-- Specs for Next.js
DELETE FROM `ProductSpec` WHERE `productId` = 'prod_nextjs';
INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES
('spec_prod_nextjs_1', 'prod_nextjs', 'Framework', 'Next.js 15+ & React 19 (App Router)', 1),
('spec_prod_nextjs_2', 'prod_nextjs', 'Stack', 'TypeScript, Tailwind CSS, Node.js', 2),
('spec_prod_nextjs_3', 'prod_nextjs', 'Turnaround Time', '10–14 Days', 3),
('spec_prod_nextjs_4', 'prod_nextjs', 'Google PageSpeed', '95+ Guaranteed Mobile & Desktop', 4),
('spec_prod_nextjs_5', 'prod_nextjs', 'Architecture', 'SSR, SSG, Edge Runtime & Dynamic APIs', 5),
('spec_prod_nextjs_6', 'prod_nextjs', 'Database Sync', 'MySQL / PostgreSQL / Supabase Integration', 6),
('spec_prod_nextjs_7', 'prod_nextjs', 'Cloud Hosting', 'Vercel / AWS / Cloudflare Deployment', 7),
('spec_prod_nextjs_8', 'prod_nextjs', 'Support & Warranty', '60 Days Priority Developer Support', 8);

-- Verification
SELECT `id`, `name`, `slug`, `price`, `originalPrice`, `category` 
FROM `Product` 
ORDER BY `price` ASC;
