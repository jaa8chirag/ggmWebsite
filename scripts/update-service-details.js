const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/serviceDetails.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define shopify-development and wordpress-development data structures
const shopifyAndWordpressBlock = `  "shopify-development": {
    slug: "shopify-development",
    badge: "SHOPIFY & SHOPIFY PLUS ENGINEERING",
    heroH1: "Shopify Development Company in Delhi | High-Conversion D2C Stores",
    heroSubtitle:
      "We architect bespoke Shopify storefronts, custom Liquid OS 2.0 themes, and high-velocity Shopify Plus platforms engineered for sub-second speeds, frictionless checkout, and rapid D2C scale.",
    overviewParagraphs: [
      "In the hyper-competitive world of e-commerce, your storefront is your flagship retail destination. Generic themes downloaded from marketplaces come weighed down with thousands of lines of unused JavaScript, broken app snippets, and rigid templates that cripple mobile loading speeds and cause prospective shoppers to bounce before your products even load.",
      "GGM Technologies is a premier Shopify development agency based in Delhi. We build bespoke, lightning-fast Shopify and Shopify Plus storefronts tailored specifically to your brand aesthetics and commercial objectives. From custom Liquid theme engineering and Checkout Extensibility to high-volume app and logistics integrations, we engineer e-commerce platforms that convert clicks into profitable revenue.",
    ],
    metrics: [
      { value: "< 1.2s", label: "Shopify Speed Index", subtext: "Native Liquid theme optimized for sub-second mobile page loads" },
      { value: "+38%", label: "Average Checkout Lift", subtext: "Achieved through one-page checkout, Express UPI, and frictionless UX" },
      { value: "0", label: "Bloated App Subscriptions", subtext: "Engineered with native Liquid code to save recurring monthly costs" },
      { value: "100%", label: "Zero-Downtime Migration", subtext: "Flawless catalog, customer, order history, and SEO URL preservation" },
    ],
    pillarsTitle: "Full-Lifecycle Shopify Engineering Capabilities",
    pillarsSubtitle:
      "From bespoke theme design to enterprise Shopify Plus infrastructure, our team delivers high-velocity e-commerce solutions.",
    pillars: [
      {
        title: "Bespoke Shopify Liquid & OS 2.0 Theme Development",
        tagline: "Tailor-made themes built with clean code and zero theme bloat.",
        description:
          "We engineer custom Shopify themes from the ground up using native Liquid, modular Online Store 2.0 JSON templates, and lightweight Alpine.js. Your marketing team receives drag-and-drop flexibility without sacrificing website performance.",
        deliverables: [
          "Figma-to-Shopify pixel-perfect custom theme engineering",
          "Dynamic product pages with custom swatches, size guides, and sticky add-to-cart",
          "AJAX instant search, drawer cart, and dynamic mobile collection filters",
          "Reusable OS 2.0 sections allowing your team to build landing pages in minutes",
          "85+ Mobile Google PageSpeed and Shopify Speed Index optimization",
        ],
      },
      {
        title: "Shopify Plus Enterprise Architecture & Custom Checkout",
        tagline: "Enterprise scaling for high-volume D2C brands handling thousands of orders.",
        description:
          "For high-growth brands on Shopify Plus, we unlock advanced features including custom Checkout Extensibility, Shopify Functions, B2B wholesale portals, multi-store architecture, and custom automated scripting.",
        deliverables: [
          "Checkout Extensibility customization with trust badges and progress bars",
          "Custom Shopify Functions for tiered volume discounts and bundle logic",
          "Shopify B2B portal setup with custom wholesale price lists and payment terms",
          "Multi-currency, international localization, and automated tax calculations",
          "Shopify Flow automation for fraud filtering, inventory triggers, and VIP tagging",
        ],
      },
      {
        title: "Frictionless Indian Payment Gateways & Express Checkout",
        tagline: "Eliminate cart abandonment with instant UPI and one-click buying.",
        description:
          "Cart abandonment silently eats away at your advertising ROAS. We integrate ultra-fast checkout solutions and verified Indian payment processors to streamline every purchase into a 2-tap transaction.",
        deliverables: [
          "Direct integration of Razorpay, Cashfree, PayU, and PhonePe gateways",
          "Express 1-click checkout options (GoKwik, Razorpay Magic, Fastrr)",
          "COD fraud protection and address verification mechanisms",
          "In-cart dynamic free-shipping meters and cross-sell recommendations",
          "Automated WhatsApp & SMS abandoned checkout recovery sequences",
        ],
      },
      {
        title: "Logistics, ERP & Marketing Stack Integrations",
        tagline: "Flawless end-to-end synchronization with your warehouse and supply chain.",
        description:
          "Your storefront needs to communicate seamlessly with your warehouse, accounting, and marketing tech stack. We integrate shipping aggregators, inventory ERPs, and automated retention engines with rock-solid webhooks.",
        deliverables: [
          "Automated shipping and tracking sync (Shiprocket, Delhivery, Bluedart, Pickrr)",
          "ERP and accounting integration (Unicommerce, Vinculum, Tally, Zoho Books)",
          "Klaviyo, Omnisend & WhatsApp retention marketing flows (Welcome series, Back-in-Stock)",
          "Review platform integration (Judge.me, Loox, Yotpo) with Google Rich Snippets",
          "Custom private Shopify apps built using Node.js and Shopify GraphQL APIs",
        ],
      },
      {
        title: "Zero-Downtime Platform Migration to Shopify",
        tagline: "Migrate from WooCommerce, Magento, or custom stacks without losing SEO.",
        description:
          "Switching platforms is high-stakes. We perform complete database migrations of products, customers, and order history while executing meticulous 301 redirect mapping so your organic Google search rankings remain intact.",
        deliverables: [
          "Complete catalog migration including variants, meta fields, and high-res imagery",
          "Customer account and historical order migration with password reset flows",
          "Comprehensive 1-to-1 301 URL redirect map preserving all organic Google SEO rankings",
          "Parallel sandbox environment testing prior to live DNS cutover",
          "Post-migration Google Search Console indexing and technical health monitoring",
        ],
      },
      {
        title: "Ongoing Shopify Maintenance, CRO & Speed Retainers",
        tagline: "Dedicated Shopify engineering team keeping your store fast, secure, and profitable.",
        description:
          "We offer proactive technical support, app auditing, conversion rate optimization experiments, and flash-sale preparation so your store is always operating at peak efficiency.",
        deliverables: [
          "Pre-sale load testing ensuring 100% uptime during Diwali/Black Friday flash sales",
          "Continuous speed audits and removal of orphan scripts left by uninstalled apps",
          "Monthly A/B conversion testing on product pages and cart flows",
          "Regular theme updates and compatibility maintenance with Shopify core releases",
          "Dedicated Slack channel with priority SLA response for critical issues",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage Shopify Development Process",
    frameworkSubtitle: "A proven, transparent engineering roadmap from Figma prototype to profitable live launch.",
    frameworkSteps: [
      {
        stepNumber: "01",
        name: "Discovery & UX Wireframing",
        timeline: "Week 1",
        description:
          "We analyze your brand guidelines, product catalog structure, competitors, and target demographics to produce high-conversion wireframes and interactive Figma prototypes.",
        outputs: ["Conversion-focused UI/UX design", "Catalog & taxonomy architecture", "Technical specification doc"],
      },
      {
        stepNumber: "02",
        name: "Custom Liquid Theme Development",
        timeline: "Weeks 2–3",
        description:
          "Our developers code your bespoke theme using clean Liquid and OS 2.0 modular blocks, ensuring sub-second response times and complete responsive optimization across mobile devices.",
        outputs: ["Production-ready Liquid theme code", "Custom PDP and collection filters", "Dynamic cart drawer & swatches"],
      },
      {
        stepNumber: "03",
        name: "Integrations & Logistics Setup",
        timeline: "Week 4",
        description:
          "We configure payment gateways, shipping aggregators (Shiprocket/Delhivery), analytics pixels, WhatsApp notifications, and accounting sync with verified webhooks.",
        outputs: ["Razorpay/UPI checkout live testing", "Shiprocket auto-sync enabled", "Meta CAPI & GA4 telemetry verified"],
      },
      {
        stepNumber: "04",
        name: "Speed, CRO & Rigorous QA Testing",
        timeline: "Week 5",
        description:
          "We test real transactions across iOS, Android, Chrome, and Safari, validate speed benchmarks on Google PageSpeed, and stress-test checkout under simulated traffic spikes.",
        outputs: ["Cross-browser QA pass report", "Google PageSpeed 85+ verification", "Zero console errors or broken links"],
      },
      {
        stepNumber: "05",
        name: "Live Launch & Operations Handover",
        timeline: "Week 6",
        description:
          "We execute zero-downtime DNS cutover, verify Google Search Console sitemaps, and conduct 1-on-1 video training with your team on product and inventory management.",
        outputs: ["Zero-downtime DNS switch", "Live transaction confirmation", "Recorded admin video training tutorials"],
      },
    ],
    comparisonTitle: "GGM Custom Shopify Engineering vs. Generic Agency Themes",
    comparisonSubtitle: "Why bespoke Shopify code drives 3x higher revenue than pre-made commercial templates.",
    comparisonHeaders: ["Engineering Feature", "Generic Agency / Purchased Theme", "GGM Custom Shopify Build"],
    comparisonRows: [
      {
        feature: "Mobile Loading Speed",
        competitor: "3.5s - 6.0s (Loaded with unused vendor JS & CSS bloat)",
        ggm: "Sub-1.2s (Lightweight custom Liquid with zero dead code)",
        highlight: true,
      },
      {
        feature: "App Dependency & Cost",
        competitor: "Requires 12+ paid apps for basic timers, swatches, and cart drawers",
        ggm: "Native Liquid code for swatches, bundles, and sticky carts (Saves $300+/mo)",
        highlight: true,
      },
      {
        feature: "Checkout Flow",
        competitor: "Standard multi-step checkout with high abandonment rate",
        ggm: "Frictionless one-page checkout with express 1-click UPI & COD validation",
        highlight: false,
      },
      {
        feature: "Platform Migration",
        competitor: "Manual CSV exports leading to broken customer records and lost SEO",
        ggm: "Automated database migration with 100% 301 redirect Google SEO preservation",
        highlight: false,
      },
      {
        feature: "Code Handoff & Ownership",
        competitor: "Locked into proprietary themes or agency hosting retainers",
        ggm: "100% complete source code ownership with no vendor lock-in",
        highlight: false,
      },
    ],
    faqsTitle: "Frequently Asked Questions About Shopify Development",
    faqs: [
      {
        question: "Why should we build a custom Shopify theme instead of buying a $300 theme from the Shopify Theme Store?",
        answer:
          "Commercial themes are built to cater to thousands of different businesses, which means they are overloaded with hundreds of features, scripts, and layouts that your store will never use. This bloat slows down your store significantly, increasing mobile bounce rates and damaging Google rankings. A custom GGM Shopify theme contains only the clean code your brand needs, resulting in sub-1.2 second load times, higher checkout conversion rates, and exact alignment with your brand vision.",
      },
      {
        question: "Can you build custom features without requiring expensive monthly app subscriptions?",
        answer:
          "Yes. Our engineers write native Liquid, modern JavaScript, and custom CSS to build features like sticky add-to-cart buttons, countdown timers, product bundles, custom color swatches, and slide-out carts directly into your theme codebase, saving your business hundreds of dollars in recurring monthly app fees.",
      },
      {
        question: "Which Indian payment gateways do you integrate?",
        answer:
          "We integrate and test all leading Indian payment gateways including Razorpay, Cashfree, PayU, and PhonePe, as well as global processors like Stripe and PayPal. We also configure 1-click express checkout solutions like GoKwik and Razorpay Magic Checkout to reduce COD returns (RTO).",
      },
      {
        question: "How do you ensure zero loss of Google SEO rankings during platform migration?",
        answer:
          "Before taking down your old website, we crawl your entire domain to catalog every indexed URL. We then create a comprehensive 1-to-1 301 redirect map on Shopify, ensuring every historical link seamlessly passes link equity to the corresponding new Shopify page. We also configure canonical tags, microdata schemas, and submit fresh sitemaps to Google Search Console on launch day.",
      },
      {
        question: "Do you train our team on how to manage products and orders?",
        answer:
          "Yes. Prior to launch, we conduct live 1-on-1 video training sessions with your operations and marketing team. We also provide recorded, step-by-step video tutorials covering how to add products, create discount codes, manage inventory, print shipping labels, and process customer refunds.",
      },
    ],
    metaTitle: "Shopify Development Company in Delhi | Shopify Plus Experts | GGM Technologies",
    metaDescription:
      "Premier Shopify and Shopify Plus development agency in Delhi. Custom Liquid themes, sub-second speed optimization, frictionless checkout, and zero-downtime platform migrations.",
    focusKeywords: ["Shopify development company Delhi", "Shopify Plus agency India", "custom Shopify theme", "Shopify store setup Delhi", "Shopify speed optimization"],
  },

  "wordpress-development": {
    slug: "wordpress-development",
    badge: "ENTERPRISE WORDPRESS & WOOCOMMERCE ARCHITECTURE",
    heroH1: "WordPress Development Company in Delhi | Custom Themes & Scalable CMS",
    heroSubtitle:
      "We engineer modern, secure WordPress websites and high-volume WooCommerce platforms using clean bespoke PHP, native Gutenberg blocks, and headless WP REST APIs. Zero bloat, sub-second speeds, and enterprise security.",
    overviewParagraphs: [
      "WordPress powers over 40% of the web, but the majority of WordPress sites suffer from the same agency mistakes: bloated drag-and-drop page builders, dozens of vulnerable plugins, and sluggish shared hosting setups that buckle under traffic surges.",
      "At GGM Technologies, we engineer enterprise-grade WordPress platforms built for speed, security, and effortless editorial control. Based in Delhi, our software engineers develop custom PHP themes, native Gutenberg custom blocks, high-concurrency WooCommerce stores, and decoupled headless architectures that load in under 1 second and pass all Google Core Web Vitals with flying colors.",
    ],
    metrics: [
      { value: "< 0.9s", label: "Core Web Vitals LCP", subtext: "Sub-second Largest Contentful Paint on mobile networks" },
      { value: "98/100", label: "Google PageSpeed Score", subtext: "Clean native PHP and minimal JavaScript footprint" },
      { value: "10k+", label: "Concurrent Visitors Handled", subtext: "Optimized with Redis object caching and Nginx reverse proxy" },
      { value: "100%", label: "Bank-Grade Security", subtext: "Hardened against brute-force, SQL injection, and XSS attacks" },
    ],
    pillarsTitle: "Enterprise WordPress & WooCommerce Capabilities",
    pillarsSubtitle:
      "Clean code architecture designed for high scalability, impenetrable security, and intuitive content management.",
    pillars: [
      {
        title: "Bespoke PHP Theme Development (No Page Builders)",
        tagline: "Tailored WordPress code engineered for extreme speed and longevity.",
        description:
          "We strictly avoid sluggish page builders like Elementor or Divi that bloat DOM trees and load megabytes of unused styles. We write clean, modern PHP themes structured around semantic HTML5 and lightweight Tailwind CSS.",
        deliverables: [
          "Bespoke WordPress theme tailored to your exact Figma UI/UX designs",
          "Advanced Custom Fields (ACF Pro) modeling for structured content management",
          "Custom post types, taxonomies, and relational data architecture",
          "Micro-animations and dynamic client interactions using vanilla JavaScript",
          "Zero plugin dependencies for core layout rendering and typography",
        ],
      },
      {
        title: "Native Gutenberg Custom Block Development",
        tagline: "Empower your marketing team with a bespoke block design system.",
        description:
          "We develop custom React-powered Gutenberg blocks tailored specifically to your design system. Your content editors can build rich, on-brand landing pages effortlessly without any fear of breaking the site layout.",
        deliverables: [
          "Custom Gutenberg blocks matching your brand components (heros, carousels, pricing)",
          "Restricted editing permissions preventing accidental styling inconsistencies",
          "Dynamic server-side rendered blocks with instant live admin preview",
          "Global theme style synchronization and typography presets",
          "Comprehensive editorial guidelines and recorded admin walkthroughs",
        ],
      },
      {
        title: "High-Volume WooCommerce Storefront Engineering",
        tagline: "Scalable e-commerce engineered for massive catalogs and rapid checkout.",
        description:
          "WooCommerce offers complete data sovereignty and zero transaction fees. We optimize WooCommerce for enterprise scale with database indexing, custom checkout funnels, and optimized cart caching.",
        deliverables: [
          "Custom WooCommerce store architecture for physical, digital, or subscription goods",
          "Database query indexing preventing slowdowns across 50,000+ SKU catalogs",
          "Express Indian payment gateway integration (Razorpay, Cashfree, UPI, Stripe)",
          "B2B wholesale pricing tiers, tax exemption rules, and custom invoicing",
          "Automated stock synchronization with warehouse ERPs and inventory software",
        ],
      },
      {
        title: "Headless WordPress & Decoupled Next.js Frontends",
        tagline: "Combine the world's best CMS with the speed of Next.js.",
        description:
          "For organizations requiring ultra-fast global performance and maximum security, we decouple WordPress into a headless CMS backend while serving your pages via high-speed Next.js or React frontends.",
        deliverables: [
          "WP REST API and WPGraphQL integration for lightning-fast data fetching",
          "Modern Next.js App Router frontend with Incremental Static Regeneration (ISR)",
          "Completely severed public frontend preventing direct attacks on WordPress admin",
          "Sub-500ms global response times powered by Vercel edge networks",
          "Omni-channel content distribution across web, mobile apps, and digital signage",
        ],
      },
      {
        title: "Redis Object Caching & Enterprise Speed Optimization",
        tagline: "Handling thousands of concurrent users with zero database strain.",
        description:
          "We configure server-level caching layers including Redis object caching, Nginx fastcgi micro-caching, and Cloudflare enterprise edge caching to serve static pages in milliseconds.",
        deliverables: [
          "Redis server-side object caching eliminating redundant MySQL queries",
          "Nginx FastCGI micro-caching delivering raw HTML in under 50 milliseconds",
          "Image compression and WebP/AVIF automated generation via CDN",
          "Critical CSS inlining and deferred JavaScript execution for 95+ PageSpeed score",
          "PHP 8.3 OPcache optimization reducing server memory usage by 40%",
        ],
      },
      {
        title: "Bank-Grade Security Hardening & Malware Defense",
        tagline: "Bulletproof defense against brute-force attacks and zero-day vulnerabilities.",
        description:
          "We harden your WordPress installation using multi-layer defense mechanisms: customized login endpoints, Web Application Firewalls (WAF), two-factor authentication, and continuous automated file integrity monitoring.",
        deliverables: [
          "Custom obfuscated login URLs blocking automated brute-force bots",
          "Cloudflare Enterprise WAF rules filtering malicious bots and SQL injection attempts",
          "Restricted XML-RPC and REST API endpoints preventing DDoS amplification",
          "Automated daily off-site encrypted backups to AWS S3 / Cloud Storage",
          "Mandatory Two-Factor Authentication (2FA) for all administrative accounts",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage WordPress Engineering Lifecycle",
    frameworkSubtitle: "A disciplined, transparent development process delivering secure, scalable platforms on time.",
    frameworkSteps: [
      {
        stepNumber: "01",
        name: "Content Architecture & Data Modeling",
        timeline: "Week 1",
        description:
          "We audit your content hierarchy, design relational data models with ACF Pro, and establish database schema guidelines to ensure future scalability.",
        outputs: ["Content taxonomy map", "Custom post type schema", "ACF Pro field group specification"],
      },
      {
        stepNumber: "02",
        name: "Custom Theme & Block Development",
        timeline: "Weeks 2–3",
        description:
          "Our developers code your bespoke theme and custom Gutenberg blocks using modern PHP and React, ensuring lightweight performance and semantic HTML5 markup.",
        outputs: ["Bespoke WordPress theme code", "Custom Gutenberg blocks", "Responsive mobile layouts"],
      },
      {
        stepNumber: "03",
        name: "WooCommerce & API Integrations",
        timeline: "Week 4",
        description:
          "We integrate payment gateways, CRM routing, ERP synchronization, and automated transactional email flows using verified REST APIs.",
        outputs: ["Razorpay/UPI checkout live", "CRM & lead webhook synchronization", "Transactional SMTP setup"],
      },
      {
        stepNumber: "04",
        name: "Caching, Security & Speed Hardening",
        timeline: "Week 5",
        description:
          "We configure Redis object caching, Cloudflare CDN rules, and security firewalls, followed by exhaustive cross-browser and load testing.",
        outputs: ["Redis cache active", "Google PageSpeed 95+ pass", "Security audit & malware scan report"],
      },
      {
        stepNumber: "05",
        name: "Deployment & Administrative Handover",
        timeline: "Week 6",
        description:
          "We execute zero-downtime server migration, submit XML sitemaps to Google Search Console, and provide comprehensive video training for your marketing team.",
        outputs: ["Live production deployment", "SSL & DNS verification", "Recorded CMS video tutorials"],
      },
    ],
    comparisonTitle: "GGM Custom WordPress vs. Off-The-Shelf Theme Builds",
    comparisonSubtitle: "Why custom WordPress architecture outperforms marketplace templates across every metric.",
    comparisonHeaders: ["Engineering Feature", "Marketplace Theme / Page Builder", "GGM Custom WordPress Build"],
    comparisonRows: [
      {
        feature: "Page Load Speed",
        competitor: "4.5s - 8.0s (Hundreds of CSS & JS files loaded on every page)",
        ggm: "Sub-0.9s (Clean semantic PHP with minimal scoped CSS)",
        highlight: true,
      },
      {
        feature: "Security & Vulnerabilities",
        competitor: "Dependent on 25+ third-party plugins with frequent security breaches",
        ggm: "Zero-bloat architecture with hardened endpoints and WAF protection",
        highlight: true,
      },
      {
        feature: "Content Editing Experience",
        competitor: "Laggy visual builder interface that frequently breaks styling",
        ggm: "Intuitive native Gutenberg custom blocks tailored to your design system",
        highlight: false,
      },
      {
        feature: "SEO & Core Web Vitals",
        competitor: "Fails Google Core Web Vitals (high CLS and LCP penalties)",
        ggm: "100% Core Web Vitals pass rate with perfect semantic heading structure",
        highlight: false,
      },
      {
        feature: "Code Maintenance",
        competitor: "Theme updates frequently crash existing layouts or plugin compatibility",
        ggm: "Clean modular codebase owned 100% by your team with zero vendor lock-in",
        highlight: false,
      },
    ],
    faqsTitle: "Frequently Asked Questions About WordPress Development",
    faqs: [
      {
        question: "Why do you avoid page builders like Elementor, Divi, or WPBakery?",
        answer:
          "While visual page builders make initial design easy for amateur developers, they generate massive amounts of nested code, bloated JavaScript files, and redundant CSS that cripple website loading times. They also lock your business into proprietary ecosystems that frequently crash when WordPress updates. We build with clean custom PHP and native Gutenberg blocks, delivering sub-second speeds, zero lock-in, and intuitive drag-and-drop editing for your marketing team.",
      },
      {
        question: "Is WordPress secure for enterprise businesses?",
        answer:
          "Yes, provided it is engineered correctly. The vast majority of WordPress hacks occur on sites using cheap shared hosting, outdated themes, or unvetted third-party plugins. By eliminating commercial plugin bloat, implementing Cloudflare Enterprise firewalls, moving login endpoints, enforcing 2FA, and leveraging Redis object caching, our WordPress builds meet bank-grade security standards.",
      },
      {
        question: "Can WooCommerce handle large catalogs and high order volumes?",
        answer:
          "Absolutely. When configured with proper database indexing, Redis object caching, and modern hosting infrastructure (such as AWS, DigitalOcean, or Kinsta), WooCommerce easily handles catalogs exceeding 50,000 products and thousands of concurrent shoppers during flash sales with zero performance degradation.",
      },
      {
        question: "What is Headless WordPress and does my company need it?",
        answer:
          "Headless WordPress uses WordPress solely as a content management database backend while serving the public website through a high-performance Next.js or React frontend. This offers sub-500ms speeds, superior security (since the WordPress admin is completely severed from the public domain), and maximum developer flexibility. We recommend headless builds for large enterprise sites with high global traffic.",
      },
      {
        question: "Will you provide ongoing maintenance and security monitoring?",
        answer:
          "Yes. We offer optional ongoing WordPress maintenance retainers that include weekly core and security updates, automated daily off-site cloud backups, continuous 24/7 uptime monitoring, malware scanning, and dedicated monthly development hours for new feature rollouts.",
      },
    ],
    metaTitle: "WordPress & WooCommerce Development Company in Delhi | GGM Technologies",
    metaDescription:
      "Enterprise WordPress development and WooCommerce engineering in Delhi. Bespoke PHP themes, custom Gutenberg blocks, sub-second speed optimization, and hardened security.",
    focusKeywords: ["WordPress development company Delhi", "WooCommerce agency India", "custom WordPress theme Delhi", "enterprise WordPress developers", "WordPress speed optimization"],
  },`;

// Replace the existing shopify-wordpress entry with shopify-development and wordpress-development, and add aliases
const targetStr = '  "shopify-wordpress": {';
if (content.includes(targetStr)) {
  // Find where shopify-wordpress starts and replace it
  content = content.replace(targetStr, shopifyAndWordpressBlock + '\n\n  "shopify-wordpress": {\n    // Backwards-compatible alias\n    slug: "shopify-development",');
  
  // Also add alias exports at the end before closing
  const aliasCode = `
// Backwards-compatible aliases
SERVICE_DETAILS["shopify"] = SERVICE_DETAILS["shopify-development"];
SERVICE_DETAILS["shopify-wordpress"] = SERVICE_DETAILS["shopify-development"];
SERVICE_DETAILS["wordpress"] = SERVICE_DETAILS["wordpress-development"];
SERVICE_DETAILS["wp"] = SERVICE_DETAILS["wordpress-development"];
`;
  content = content.replace(/};\s*$/, aliasCode + '};\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated serviceDetails.ts with separated Shopify and WordPress services!');
} else {
  console.error('Could not find target shopify-wordpress in serviceDetails.ts');
}
