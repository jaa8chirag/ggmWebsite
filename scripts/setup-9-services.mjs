import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Setting up 9 services in MySQL...");

  const servicesData = [
    {
      index: "01",
      slug: "website-development",
      title: "Website Development",
      promise: "Sub-second load times. Zero layout shift. Built to rank.",
      description: "Custom web development built on Next.js, React, Node.js, and modern TypeScript — responsive, accessible, secure, and engineered to turn visitors into paying clients.",
      bullets: JSON.stringify([
        "Custom Next.js & React architecture",
        "Sub-second Core Web Vitals performance",
        "Mobile-first responsive design & conversion funnels",
      ]),
      ogImage: "/images/services/website-development.jpg",
    },
    {
      index: "02",
      slug: "seo",
      title: "SEO",
      promise: "We get you found before your competitors are.",
      description: "Search engine optimization built on technical audits, keyword-mapped content, and authoritative editorial backlinks that actually move rankings — not just vanity traffic.",
      bullets: JSON.stringify([
        "Technical audit & Core Web Vitals fixes",
        "Keyword & topical authority content strategy",
        "High DA white-hat editorial link building",
      ]),
      ogImage: "/images/services/seo.jpg",
    },
    {
      index: "03",
      slug: "ppc",
      title: "Pay-Per-Click Advertising (PPC)",
      promise: "Every rupee of ad spend earns its place.",
      description: "Strategic Pay-Per-Click (PPC) campaigns focused on lowest cost-per-acquisition (CPA) and maximum ROAS across Google Search, Display, Remarketing, and Meta Ads.",
      bullets: JSON.stringify([
        "Full-funnel campaign architecture & smart bidding",
        "Negative keyword sculpting & budget optimization",
        "Dedicated conversion-rate-optimized landing pages",
      ]),
      ogImage: "/images/services/ppc.jpg",
    },
    {
      index: "04",
      slug: "google-adsense",
      title: "Google AdSense Service",
      promise: "Turn website traffic into recurring ad revenue.",
      description: "End-to-end Google AdSense monetization, 100% compliant policy approval, high-yield ad placement heatmapping, programmatic header bidding, and RPM maximization.",
      bullets: JSON.stringify([
        "Fast 100% compliant Google AdSense approval",
        "Strategic ad layout heatmapping for maximum CTR",
        "RPM & CPM yield optimization with zero invalid traffic risk",
      ]),
      ogImage: "/images/services/google-adsense.jpg",
    },
    {
      index: "05",
      slug: "mobile-app-development",
      title: "Mobile Application Development",
      promise: "Fluid 120Hz native & cross-platform apps built to scale.",
      description: "High-performance iOS, Android, and cross-platform (Flutter & React Native) mobile applications with intuitive UI/UX, offline sync, robust APIs, and Play Store / App Store launch.",
      bullets: JSON.stringify([
        "Native iOS (Swift) & Android (Kotlin) development",
        "Cross-platform Flutter & React Native mobile engineering",
        "Secure REST/GraphQL backend APIs & App Store deployment",
      ]),
      ogImage: "/images/services/mobile-app-development.jpg",
    },
    {
      index: "06",
      slug: "lead-generation",
      title: "Lead Generation",
      promise: "Qualified pipeline, not just traffic spikes.",
      description: "High-intent multi-channel lead funnels combining targeted search capture, conversational WhatsApp bots, and CRM routing that convert cold visitors into sales-ready prospects.",
      bullets: JSON.stringify([
        "Multi-channel intent-capture landing funnels",
        "Automated WhatsApp & CRM lead distribution",
        "Transparent cost-per-qualified-lead reporting",
      ]),
      ogImage: "/images/services/lead-generation.jpg",
    },
    {
      index: "07",
      slug: "social-media-marketing",
      title: "Social Media Marketing",
      promise: "Consistent brand presence that drives real commercial recall.",
      description: "Strategic social media management across Instagram, LinkedIn, YouTube, and Facebook — bespoke creative direction, organic community growth, and viral content production.",
      bullets: JSON.stringify([
        "Editorial content calendar & creative design",
        "Short-form video production (Reels, Shorts)",
        "Community management & follower-to-lead nurturing",
      ]),
      ogImage: "/images/services/social-media-marketing.jpg",
    },
    {
      index: "08",
      slug: "shopify-development",
      title: "Shopify Development",
      promise: "High-converting storefronts built for scale.",
      description: "Custom Shopify Liquid themes, headless Hydrogen stores, custom app integrations, checkout extensibility, and conversion rate optimization for ambitious D2C brands.",
      bullets: JSON.stringify([
        "Custom Shopify Liquid theme engineering",
        "App integration, ERP & payment gateway setup",
        "Conversion rate & mobile checkout optimization",
      ]),
      ogImage: "/images/services/shopify-development.jpg",
    },
    {
      index: "09",
      slug: "wordpress-development",
      title: "WordPress Development",
      promise: "Fast, secure, custom Gutenberg & WooCommerce sites.",
      description: "Enterprise WordPress and WooCommerce platforms built on lightweight custom code — zero bloated page-builder baggage, sub-second load times, and hardened security.",
      bullets: JSON.stringify([
        "Custom PHP themes & native Gutenberg blocks",
        "WooCommerce high-volume store development",
        "Enterprise security hardening & sub-second speed optimization",
      ]),
      ogImage: "/images/services/wordpress-development.jpg",
    },
  ];

  for (const s of servicesData) {
    const [existing] = await conn.query("SELECT id FROM Service WHERE slug = ?", [s.slug]);
    if (existing.length > 0) {
      await conn.query(
        "UPDATE Service SET `index` = ?, title = ?, promise = ?, description = ?, bullets = ?, ogImage = ? WHERE slug = ?",
        [s.index, s.title, s.promise, s.description, s.bullets, s.ogImage, s.slug]
      );
      console.log(`Updated service: ${s.index}. ${s.title} (${s.slug})`);
    } else {
      const id = `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await conn.query(
        "INSERT INTO Service (id, slug, `index`, title, promise, description, bullets, ogImage, noIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(3), NOW(3))",
        [id, s.slug, s.index, s.title, s.promise, s.description, s.bullets, s.ogImage]
      );
      console.log(`Inserted new service: ${s.index}. ${s.title} (${s.slug})`);
    }
  }

  // Verify all 9 services
  const [rows] = await conn.query("SELECT `index`, slug, title, ogImage FROM Service ORDER BY `index` ASC");
  console.log("\n--- Current 9 Services in MySQL ---");
  console.table(rows);

  await conn.end();
}

main().catch((err) => {
  console.error("Error setting up 9 services:", err);
  process.exit(1);
});
