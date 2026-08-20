import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";

const SEED_PAGES = [
  {
    id: "privacy-policy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "How GGM Technologies collects, uses, protects, and governs your business data and personal information.",
    lastUpdated: "August 2026",
    metaTitle: "Privacy Policy | GGM Technologies",
    metaDescription: "Read the GGM Technologies Privacy Policy. Learn how we safeguard your digital marketing data, analytics, and business communication.",
    content: `## 1. Introduction & Overview
At **GGM Technologies**, we respect your privacy and are committed to protecting your personal and business data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our digital marketing services (SEO, PPC, Web Development, Lead Generation), or interact with our client portal.

## 2. Information We Collect
We collect information that you provide directly to us, including:
- **Contact Details:** Name, email address, phone number, and business address.
- **Company Information:** Website URLs, domain analytics access, ad account access, and industry vertical details.
- **Project Requirements:** Briefing forms, target KPIs, marketing budgets, and communication history.
- **Technical & Usage Data:** IP address, browser type, device information, operating system, and on-site behavioral metrics collected via secure analytics cookies.

## 3. How We Use Your Information
We use the collected information for specific, legitimate business purposes:
- Delivering, optimizing, and monitoring digital marketing campaigns and web applications.
- Providing SEO audit reports, keyword rankings, and ad spend return-on-investment analytics.
- Processing invoices, service subscriptions, and contractual agreements.
- Communicating campaign updates, performance milestones, and technical recommendations.
- Ensuring website security, fraud prevention, and compliance with Indian IT laws (Information Technology Act, 2000).

## 4. Data Protection & Confidentiality
All client proprietary data, including analytics, customer lead lists, PPC conversion tracking data, and website source codes, are kept under strict Non-Disclosure Agreement (NDA) protocols. We implement industry-standard 256-bit SSL encryption, restricted role-based database access, and secure cloud storage.

## 5. Third-Party Sharing
We **never** sell, rent, or trade your personal or business information. We only share necessary data with trusted platform partners strictly required for campaign delivery:
- Google Analytics & Google Ads API
- Meta Business Suite & LinkedIn Marketing Solutions
- Cloud hosting providers and transactional email gateways

## 6. Your Rights & Data Requests
You have the right to request a copy of your stored data, rectify inaccurate records, or request complete deletion of your data from our active marketing systems by emailing us at [support@ggmtechnologies.com](mailto:support@ggmtechnologies.com).

## 7. Contact Information
If you have questions regarding this Privacy Policy, please contact:
- **Email:** [support@ggmtechnologies.com](mailto:support@ggmtechnologies.com)
- **Phone:** +91 98765 43210
- **Office:** GGM Technologies, New Delhi, Delhi 110016, India`,
  },
  {
    id: "refund-policy",
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    subtitle: "Clear, transparent terms regarding service deliverables, retainer agreements, and cancellation workflows.",
    lastUpdated: "August 2026",
    metaTitle: "Refund & Cancellation Policy | GGM Technologies",
    metaDescription: "Understand the cancellation and refund terms for GGM Technologies digital marketing retainers, web development sprints, and consulting packages.",
    content: `## 1. Scope & Commitment
**GGM Technologies** operates on data-driven performance and client accountability. Because digital marketing and software engineering involve upfront resource allocation, expert team hours, and third-party tooling subscriptions, we maintain clear guidelines regarding refunds and cancellations.

## 2. Monthly Marketing Retainers (SEO, PPC, Social Media)
- **Notice Period:** Monthly retainer services operate on a month-to-month or quarterly contract. You may cancel your retainer at any time by providing a **15-day written notice** prior to the next billing cycle.
- **Active Billing Cycle:** Fees paid for an ongoing active monthly cycle are non-refundable once campaign setup, audit execution, keyword mapping, or media buying have commenced.
- **Third-Party Ad Spend:** Direct ad spend paid to Google Ads, Meta Ads, or LinkedIn Ads is billed directly by those platforms and is strictly non-refundable by GGM Technologies.

## 3. Web Development & Custom Software Projects
- **Milestone-Based Billing:** Custom website builds, Shopify setups, and web application development are structured around defined deliverable milestones (e.g. Design Prototype $\\rightarrow$ Frontend Development $\\rightarrow$ Backend CMS Integration $\\rightarrow$ Final QA & Launch).
- **Deposit & Discovery Phase:** The initial project kickoff deposit covers architecture design, wireframing, and scope finalization. Once project discovery work has been delivered, the initial deposit is non-refundable.
- **Milestone Approvals:** Once a milestone is formally reviewed and approved by the client, the corresponding milestone invoice is non-refundable.

## 4. One-Time Audit & Strategy Consultations
Fees for one-time deep technical audits, speed optimization sprints, or digital growth roadmaps are non-refundable once the audit document has been delivered to the client.

## 5. Refund Processing Timeline
In exceptional cases where a refund is approved by management due to non-commencement of work:
- Refunds will be processed to the original payment method (Bank Transfer / UPI / Card).
- Processing typically takes **5 to 7 business days** following formal written confirmation.

## 6. How to Request Cancellation
To initiate a cancellation or discuss project adjustments, submit a written request to your dedicated Account Director or email [billing@ggmtechnologies.com](mailto:billing@ggmtechnologies.com).`,
  },
  {
    id: "cookie-policy",
    slug: "cookie-policy",
    title: "Cookie Policy",
    subtitle: "Explanation of cookies, pixels, and tracking technologies used to enhance user experience and analytics.",
    lastUpdated: "August 2026",
    metaTitle: "Cookie Policy | GGM Technologies",
    metaDescription: "Learn how GGM Technologies uses essential, analytical, and marketing cookies to optimize your browsing experience and performance tracking.",
    content: `## 1. What Are Cookies?
Cookies are small text files stored on your computer, tablet, or smartphone when you visit a website. They help websites remember your preferences, keep you securely authenticated in client portals, and analyze traffic patterns.

## 2. Types of Cookies We Use
We use the following categories of cookies on [GGM Technologies](https://ggmtechnologies.com):

### A. Essential & Functional Cookies
These cookies are strictly required for our website and CMS dashboard to operate properly:
- Admin session authentication and security tokens.
- User interface preferences (e.g. form state preservation).

### B. Performance & Analytics Cookies
These cookies help us measure visitor interaction, identify high-traffic pages, and detect layout issues:
- **Google Analytics 4 (GA4):** Anonymized session tracking, page dwell time, and traffic acquisition channels.
- **Core Web Vitals Telemetry:** First Input Delay (FID), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) monitoring.

### C. Marketing & Attribution Cookies
Used to measure the efficacy of our advertising campaigns and deliver relevant digital marketing case studies:
- Google Ads conversion tracking pixel.
- Meta Pixel and LinkedIn Insight Tag.

## 3. Managing Cookie Preferences
You can control or disable cookies at any time through your browser settings:
- **Google Chrome:** Settings $\\rightarrow$ Privacy and Security $\\rightarrow$ Cookies and other site data.
- **Mozilla Firefox:** Preferences $\\rightarrow$ Privacy & Security $\\rightarrow$ Enhanced Tracking Protection.
- **Apple Safari:** Preferences $\\rightarrow$ Privacy $\\rightarrow$ Block all cookies.

Please note that blocking essential cookies may impact the functionality of client portals and interactive forms.

## 4. Updates to This Policy
We may periodically update our Cookie Policy to reflect changes in regulatory requirements or platform upgrades. The latest revision date will always appear at the top of this page.`,
  },
  {
    id: "disclaimer",
    slug: "disclaimer",
    title: "Disclaimer & Terms of Use",
    subtitle: "Legal disclaimers regarding digital marketing forecasts, search engine algorithms, and website content.",
    lastUpdated: "August 2026",
    metaTitle: "Disclaimer & Legal Terms | GGM Technologies",
    metaDescription: "Official disclaimer regarding SEO ranking forecasts, third-party platform algorithms, and marketing results by GGM Technologies.",
    content: `## 1. General Information Disclaimer
All information, articles, case studies, and audit tools published on [GGM Technologies](https://ggmtechnologies.com) are provided for general informational and business strategic guidance. While we endeavor to keep all marketing metrics, case study numbers, and strategies accurate and up to date, we make no warranties regarding completeness or suitability for every business vertical.

## 2. SEO & Search Engine Ranking Disclaimer
- **Search Engine Autonomy:** Google, Bing, and other search engines continually update their core ranking algorithms (e.g. Helpful Content Updates, Core Search Updates, SpamBrain).
- **No Absolute Guarantees:** While GGM Technologies follows strict white-hat SEO best practices and has a proven track record of securing page 1 rankings, no agency can guarantee a permanent #1 position on Google for any keyword. Search rankings depend on search engine discretion, competitor activity, and domain authority factors.

## 3. PPC & Return on Ad Spend (ROAS)
Projected ROAS, cost-per-click (CPC), and lead conversion estimates are based on historical performance benchmarks, keyword auction dynamics, and industry averages. Actual campaign performance may vary based on client landing page conversion rates, sales team follow-up speed, market competition, and seasonal buying trends.

## 4. Third-Party Links & Tools
Our website and blog posts may include hyperlinks to external third-party tools, APIs, industry documentation (e.g. Google Search Central, Schema.org), and client case study websites. GGM Technologies has no control over the content, uptime, or privacy practices of external third-party sites.

## 5. Intellectual Property
All website designs, custom graphics, proprietary audit frameworks, logos, and written content on this site are the intellectual property of **GGM Technologies** and are protected under Indian and international copyright laws. Unauthorized reproduction or scraping is strictly prohibited.

## 6. Jurisdiction & Governing Law
Any disputes arising from the use of this website or our digital marketing agreements shall be governed by and construed in accordance with the laws of **New Delhi, India**, under the exclusive jurisdiction of the courts of New Delhi.`,
  },
  {
    id: "certifications",
    slug: "certifications",
    title: "Certifications & Accreditations",
    subtitle: "Official partner certifications, compliance standards, and verified technical credentials held by GGM Technologies.",
    lastUpdated: "August 2026",
    metaTitle: "Official Certifications & Partner Badges | GGM Technologies",
    metaDescription: "View GGM Technologies official partner certifications, including Google Premier Partner, Meta Certified Media Buying, and ISO quality standards.",
    content: `## 1. Verified Industry Credentials
At **GGM Technologies**, our marketing architects and engineers maintain elite partner certifications directly from global tech leaders. We adhere to rigorous engineering standards, ethical search practices, and enterprise security frameworks.

## 2. Core Accreditations & Partnerships

### 🏆 Google Certified Partner
- **Google Search Ads Certification:** Advanced keyword bidding, Smart Bidding optimization, and search query sculpting.
- **Google Analytics 4 (GA4) Certified:** Server-side tracking, custom funnel modeling, and cross-domain attribution.
- **Google Display & Video 360:** Programmatic brand reach and audience lookalike targeting.

### 🚀 Meta Certified Digital Marketing Associate
- **Meta Certified Media Buying Professional:** Advanced pixel setup, Conversions API (CAPI) implementation, and dynamic catalog ads for eCommerce.
- **Instagram Growth & Omni-channel Reach:** Creative testing, hook rate optimization, and B2B/B2C lead funnels.

### 💻 Enterprise Web & Engineering Standards
- **Shopify Partner:** Custom Liquid theme architecture, headless Shopify, and Checkout Extensibility.
- **WordPress & WooCommerce VIP Development:** High-concurrency caching, database indexing, and custom REST API integrations.
- **W3C & Core Web Vitals Compliance:** 90+ Lighthouse performance scores, semantic HTML5, and WCAG 2.1 accessibility standards.

## 3. Quality Assurance & Ethical Framework
- **Strict White-Hat SEO Compliance:** 100% adherence to Google Search Essentials (formerly Webmaster Guidelines). We never deploy PBNs, automated spam links, or deceptive cloaking.
- **Data Security:** Complete compliance with the Information Technology Act (India) and GDPR principles for international clientele.

## 4. Verification of Credentials
Clients and prospective partners may request official certificate IDs or verification links directly through our compliance team at [compliance@ggmtechnologies.com](mailto:compliance@ggmtechnologies.com).`,
  },
];

async function main() {
  const pool = mysql.createPool(dbUrl);

  console.log("Creating LegalPage table if not exists...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`LegalPage\` (
      \`id\` VARCHAR(191) NOT NULL PRIMARY KEY,
      \`slug\` VARCHAR(191) NOT NULL UNIQUE,
      \`title\` VARCHAR(255) NOT NULL,
      \`subtitle\` TEXT NULL,
      \`content\` LONGTEXT NOT NULL,
      \`lastUpdated\` VARCHAR(100) NOT NULL DEFAULT 'August 2026',
      \`metaTitle\` VARCHAR(255) NULL,
      \`metaDescription\` TEXT NULL,
      \`isPublished\` TINYINT(1) NOT NULL DEFAULT 1,
      \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("Seeding Legal / Policy / Certification records...");
  for (const page of SEED_PAGES) {
    await pool.query(
      `INSERT INTO \`LegalPage\` (id, slug, title, subtitle, content, lastUpdated, metaTitle, metaDescription, isPublished, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(3))
       ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       content = VALUES(content),
       lastUpdated = VALUES(lastUpdated),
       metaTitle = VALUES(metaTitle),
       metaDescription = VALUES(metaDescription),
       updatedAt = NOW(3);`,
      [
        page.id,
        page.slug,
        page.title,
        page.subtitle,
        page.content,
        page.lastUpdated,
        page.metaTitle,
        page.metaDescription,
      ]
    );
    console.log(`✓ Seeded: ${page.title} (/${page.slug})`);
  }

  await pool.end();
  console.log("All legal pages initialized successfully!");
}

main().catch((err) => {
  console.error("Error setting up legal table:", err);
  process.exit(1);
});
