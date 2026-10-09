import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env" });
}

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@127.0.0.1:3306/ggmwebsite";

const products = [
  {
    id: "prod_wordpress",
    slug: "wordpress-website-development",
    name: "WordPress Website Development Package",
    category: "Web Development",
    price: 15000,
    originalPrice: 25000,
    description: `Complete, high-performance WordPress website engineered for businesses, agencies, and service providers. Includes bespoke Elementor / Gutenberg design, 100% mobile responsiveness, Core Web Vitals speed optimization (< 1.5s load time), on-page SEO setup, lead capture forms, WhatsApp chat integration, and SSL security hardening.`,
    features: [
      "Custom 5 to 8 Page Responsive WordPress Design (Home, About, Services, Blog, Contact)",
      "Mobile-First & Tablet Optimized Layout with 100% Cross-Browser Compatibility",
      "Fast PageSpeed Optimization with Server Caching & WebP Image Compression",
      "Essential On-Page Technical SEO, Meta Tags & Google Search Console Setup",
      "Interactive Contact Forms & Direct One-Click WhatsApp Chat Integration",
      "Free SSL Installation, Security Hardening & Anti-Spam Protection",
      "User-Friendly Admin Dashboard with Drag-and-Drop Page Builder",
      "30 Days Complimentary Post-Launch Support & Admin Video Handover"
    ],
    benefits: [
      "Turnkey website ready to generate leads within 5 to 7 business days",
      "Easy drag-and-drop CMS allowing your team to update text and photos without coding",
      "Clean, lightweight architecture ensuring fast Google page rankings",
      "100% ownership with complete admin credentials and source code handover",
      "Zero monthly lock-in contracts or recurring agency maintenance fees"
    ],
    specs: [
      { label: "Platform", value: "WordPress / WooCommerce" },
      { label: "Turnaround Time", value: "5–7 Days" },
      { label: "Pages Included", value: "Up to 8 Custom Pages" },
      { label: "Design System", value: "Elementor Pro / Modern Gutenberg" },
      { label: "Mobile Optimization", value: "100% Mobile & Tablet Responsive" },
      { label: "SEO Readiness", value: "On-Page Schema & Meta Tags Included" },
      { label: "Support & Warranty", value: "30 Days Free Technical Support" },
      { label: "Asset Ownership", value: "100% Full Admin & Files Handover" }
    ],
    metaTitle: "WordPress Website Development Package (₹15,000) | GGM Technologies",
    metaDescription: "Get a custom, responsive, high-speed WordPress website for just ₹15,000. Mobile-first design, SEO-optimized, contact forms, WhatsApp chat, and 30 days free support.",
    ogImage: "/images/web-development-banner.png",
    noIndex: false
  },
  {
    id: "prod_shopify",
    slug: "shopify-store-development",
    name: "Shopify E-Commerce Store Package",
    category: "E-Commerce Development",
    price: 25000,
    originalPrice: 38000,
    description: `Turnkey, high-converting Shopify store designed to launch and scale your D2C brand or retail business. Includes bespoke Online Store 2.0 theme styling, catalog setup up to 50 products, Indian payment gateway integrations (Razorpay, PhonePe, COD, UPI), automated shipping rates, abandoned cart recovery, high-converting product pages, and mobile checkout optimization.`,
    features: [
      "Shopify Online Store 2.0 Custom Theme Setup & High-End Brand Styling",
      "Complete Catalog Setup for Up to 50 Products with Variants & High-Res Galleries",
      "Seamless Payment Gateway Integration (Razorpay, PhonePe, Cards, UPI, NetBanking, COD)",
      "High-Converting Product Page Architecture (Sticky Buy Button, Trust Badges, Size Charts)",
      "Automated Abandoned Cart Recovery Flows & Transactional Email Templates",
      "Shipping & Delivery Integration (Shiprocket, Delhivery, Pincode Verification)",
      "Complete E-Commerce Technical SEO, Open Graph & Structured Product Schema",
      "45 Days Priority Post-Launch Technical Support & Store Operations Training"
    ],
    benefits: [
      "Sub-second mobile checkout engineered to maximize sales conversions",
      "Launch a fully functional, live eCommerce store in just 7 to 10 days",
      "Manage inventory, orders, and customer queries effortlessly from your smartphone",
      "Zero server management hassles with 99.99% Shopify cloud uptime",
      "Ready for Meta Ads, Google Shopping Ads & Instagram Shop catalog sync"
    ],
    specs: [
      { label: "Platform", value: "Shopify / Shopify Plus" },
      { label: "Turnaround Time", value: "7–10 Days" },
      { label: "Products Setup", value: "Up to 50 Products Included" },
      { label: "Payment Gateways", value: "Razorpay, PhonePe, UPI & COD" },
      { label: "Logistics Sync", value: "Shiprocket / Delhivery Integration" },
      { label: "Mobile Checkout", value: "Optimized 1-Click Fast Checkout" },
      { label: "Support & Warranty", value: "45 Days Dedicated Support" },
      { label: "Handover", value: "100% Store Staff Training Included" }
    ],
    metaTitle: "Shopify E-Commerce Store Development Package (₹25,000) | GGM Technologies",
    metaDescription: "Launch your D2C online store with our Shopify development package for ₹25,000. Up to 50 products, Razorpay/UPI/COD payment gateway, Shiprocket sync, and fast checkout.",
    ogImage: "/images/ecommerce-development-banner.png",
    noIndex: false
  },
  {
    id: "prod_nextjs",
    slug: "nextjs-custom-web-development",
    name: "Next.js Custom Web Application Package",
    category: "Full Stack & Next.js",
    price: 35000,
    originalPrice: 55000,
    description: `Enterprise-grade bespoke web application engineered with Next.js 15+ (App Router), React 19, TypeScript, and modern styling. Engineered for businesses requiring blazing sub-500ms speeds, 95+ Google PageSpeed score, server-side rendering (SSR) for top-tier SEO dominance, custom API integrations, dynamic animations, and cloud deployment on Vercel or AWS.`,
    features: [
      "Next.js 15+ App Router & React 19 Full-Stack Architecture with TypeScript",
      "95+ Google Lighthouse Score Guaranteed across Performance, Accessibility & SEO",
      "Server-Side Rendering (SSR) & Static Generation (SSG) for Extreme Search Dominance",
      "Custom Database & Backend API Integration (MySQL / PostgreSQL / Supabase / Prisma)",
      "Interactive UI with Tailwind CSS & Fluid GSAP / Framer Motion Micro-Animations",
      "Dynamic Server Components, Edge Routing, and Instant Sub-500ms Page Transitions",
      "Production CI/CD Cloud Deployment on Vercel, AWS, or Cloudflare with SSL",
      "60 Days Extended Post-Launch Support with Git Repository & Source Code Handover"
    ],
    benefits: [
      "Sub-500ms page transitions that give your business an unfair speed advantage",
      "Highest possible Google Core Web Vitals score for unmatched organic ranking",
      "Infinite architectural scalability without the security holes or bloat of legacy CMS plugins",
      "Complete intellectual property ownership with full clean TypeScript source code",
      "Zero vendor lock-in with self-hostable modern web standard architecture"
    ],
    specs: [
      { label: "Framework", value: "Next.js 15+ & React 19 (App Router)" },
      { label: "Stack", value: "TypeScript, Tailwind CSS, Node.js" },
      { label: "Turnaround Time", value: "10–14 Days" },
      { label: "Google PageSpeed", value: "95+ Guaranteed Mobile & Desktop" },
      { label: "Architecture", value: "SSR, SSG, Edge Runtime & Dynamic APIs" },
      { label: "Database Sync", value: "MySQL / PostgreSQL / Supabase Integration" },
      { label: "Cloud Hosting", value: "Vercel / AWS / Cloudflare Deployment" },
      { label: "Support & Warranty", value: "60 Days Priority Developer Support" }
    ],
    metaTitle: "Next.js Custom Web Application Package (₹35,000) | GGM Technologies",
    metaDescription: "Scale with an ultra-fast Next.js full-stack web application for ₹35,000. 95+ Google PageSpeed, SSR for SEO, TypeScript, custom APIs, and Vercel cloud deployment.",
    ogImage: "/images/web-development-banner.png",
    noIndex: false
  }
];

async function run() {
  console.log("Connecting to:", dbUrl.replace(/:[^:@]+@/, ":***@"));
  const conn = await mysql.createConnection(dbUrl);

  for (const p of products) {
    console.log(`Upserting product: ${p.name} (₹${p.price})`);
    await conn.query(
      `INSERT INTO Product (id, slug, name, category, price, originalPrice, description, features, benefits, metaTitle, metaDescription, ogImage, noIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         slug = VALUES(slug),
         name = VALUES(name),
         category = VALUES(category),
         price = VALUES(price),
         originalPrice = VALUES(originalPrice),
         description = VALUES(description),
         features = VALUES(features),
         benefits = VALUES(benefits),
         metaTitle = VALUES(metaTitle),
         metaDescription = VALUES(metaDescription),
         ogImage = VALUES(ogImage),
         noIndex = VALUES(noIndex)`,
      [
        p.id,
        p.slug,
        p.name,
        p.category,
        p.price,
        p.originalPrice,
        p.description,
        JSON.stringify(p.features),
        JSON.stringify(p.benefits),
        p.metaTitle,
        p.metaDescription,
        p.ogImage,
        p.noIndex ? 1 : 0
      ]
    );

    // Delete existing specs for this product and re-insert
    await conn.query("DELETE FROM ProductSpec WHERE productId = ?", [p.id]);

    for (let i = 0; i < p.specs.length; i++) {
      const s = p.specs[i];
      const specId = `spec_${p.id}_${i + 1}`;
      await conn.query(
        "INSERT INTO ProductSpec (id, productId, label, value, `order`) VALUES (?, ?, ?, ?, ?)",
        [specId, p.id, s.label, s.value, i + 1]
      );
    }
  }

  const [allProducts] = await conn.query("SELECT id, name, slug, price, originalPrice FROM Product");
  console.log("All products now in DB:", allProducts);
  await conn.end();
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
