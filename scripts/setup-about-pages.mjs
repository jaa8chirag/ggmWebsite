import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";

const ABOUT_PAGES = [
  {
    id: "quality-compliance",
    slug: "quality-compliance",
    title: "Quality & Compliance Standards",
    subtitle: "Enterprise Governance, 100% White-Hat Search Protocols, and ISO 27001 Data Protection Benchmarks.",
    lastUpdated: "August 2026",
    metaTitle: "Quality & Compliance Standards | GGM Technologies Delhi",
    metaDescription: "Explore GGM Technologies' commitment to 100% white-hat Google Search Essentials, ISO security compliance, and certified enterprise marketing governance.",
    content: `## Engineering Precision & Ethical Search Standards

At **GGM Technologies**, quality assurance is not an afterthought — it is the engineering foundation of every client engagement. We operate with strict adherence to verified search engine webmaster guidelines and enterprise data protection laws.

---

### 1. 100% White-Hat Search Essentials
We strictly follow **Google Search Essentials**, **Bing Webmaster Guidelines**, and **W3C Core Web Vitals standards**.
- **Zero Private Blog Networks (PBNs):** Every link earned is through genuine editorial outreach, high-authority digital PR, and authoritative content creation.
- **Zero Keyword Stuffing or Cloaking:** We engineer semantic entity graphs that serve real search intent without algorithmic deception.
- **Algorithmic Future-Proofing:** Our SEO strategies are built to withstand core algorithm updates (Helpful Content System, SpamBrain, EEAT signals).

---

### 2. Enterprise Data Security & NDA Protection
We treat our clients' proprietary marketing data, customer conversion funnels, and revenue metrics with bank-grade confidentiality.
- **Non-Disclosure Agreements (NDAs):** Signed prior to access exchange with 100% enforceable confidentiality under Indian contract laws.
- **Server-Side Tracking & GDPR/DPDP Compliance:** First-party tracking setups that respect visitor privacy without third-party cookie leakage.
- **Role-Based Access Control:** Strict principle of least privilege across Google Ads, Meta Business Manager, and Shopify backend integrations.

---

### 3. Service Level Agreements (SLAs) & Transparent Reporting
- **Weekly Sprint Syncs:** Transparent bi-weekly and monthly performance reports directly tied to Google Analytics 4 (GA4) and Google Search Console (GSC).
- **Direct Engineer Access:** Work directly with senior growth strategists, not junior account coordinators.
- **99.9% Infrastructure Uptime:** Web applications engineered on Next.js, Node.js, and Cloudflare enterprise edge caching.`,
  },
  {
    id: "about-ceo",
    slug: "about-ceo",
    title: "About Founder & CEO",
    subtitle: "Algorithmic Growth Strategist, Full-Stack Engineer, and Visionary Leader of GGM Technologies.",
    lastUpdated: "August 2026",
    metaTitle: "About CEO Chirag Kumar | Founder of GGM Technologies",
    metaDescription: "Learn about Chirag Kumar, Founder and Chief Executive Officer of GGM Technologies, driving numbers-backed digital growth for over 250+ global brands.",
    content: `## &ldquo;Digital Marketing is Mathematics &amp; Engineering — Not Guesswork.&rdquo;

### Executive Profile: Chirag Kumar
**Founder & Chief Executive Officer**

Driven by an uncompromising commitment to transparent, revenue-backed digital growth, **Chirag Kumar** established GGM Technologies to bridge the divide between creative brand marketing and hardcore technical engineering.

With over a decade of hands-on technical experience spanning Technical SEO architecture, programmatic media buying across Google & Meta, and modern Full-Stack web engineering, Chirag has personally architected revenue funnels that scaled emerging D2C brands to market leaders and guided legacy B2B enterprises through digital modernization.

---

### Core Philosophy & Leadership Principles

1. **The Numbers-First Protocol:**
   Every marketing rupee spent must have a direct, attributable connection to pipeline velocity, qualified pipeline value, or transactional revenue. Vanity metrics like impressions and un-engaged clicks are eliminated.

2. **Algorithmic Precision:**
   Modern search engines and ad auctions run on complex machine learning models (RankBrain, Google Smart Bidding, Meta Advantage+). Chirag leads the agency with deep mathematical understanding of these algorithms to maximize client ROI.

3. **Client-Centric Transparency:**
   No hidden markups on media spend, no confusing jargon, and full client ownership of all data, ad accounts, and source code repositories.

---

### Track Record & Milestones
- **250+ Brands Scaled** across eCommerce, Real Estate, Healthcare, SaaS, and Industrial B2B sectors.
- **Over ₹50 Crore+** in managed ad spend with verified average ROAS exceeding 4.2x.
- **Speaker & Growth Mentor** on technical SEO, semantic structured data, and high-conversion landing page engineering.`,
  },
  {
    id: "about-the-company",
    slug: "about-the-company",
    title: "About The Company & Infrastructure",
    subtitle: "Born in South Delhi, scaling world-class enterprises with full-funnel digital growth infrastructure.",
    lastUpdated: "August 2026",
    metaTitle: "About GGM Technologies | Full-Funnel Digital Agency Delhi",
    metaDescription: "Learn about GGM Technologies company history, South Delhi headquarters, team capacity, and infrastructure delivering SEO, PPC, and web engineering globally.",
    content: `## Born in South Delhi, Scaling Globally

**GGM Technologies** was founded with a singular purpose: to deliver data-backed, high-integrity digital marketing and software engineering solutions to modern businesses in Delhi NCR, across India, and worldwide.

From our headquarters in **South Delhi**, we operate a synchronized team of technical SEO specialists, conversion-rate optimization architects, certified Google & Meta media buyers, and full-stack software engineers.

---

### Agency Capabilities & Infrastructure

- **Technical SEO Labs:** In-house crawling infrastructure, log file analyzers, and semantic JSON-LD schema generators.
- **High-Performance Web Engineering:** Next.js, React, Node.js, and Headless eCommerce architectures with sub-second page loads and 100/100 Core Web Vitals scores.
- **PPC & Media Buying Command:** Real-time ad bid automation, server-side Conversions API (CAPI), and high-converting landing page variants.
- **Enterprise Lead Generation Engine:** Custom CRM pipelines, WhatsApp Business API integrations, and verified multi-channel lead routing.

---

### Our Operating Principles

1. **Full Ownership:** Our clients retain 100% administrative control and IP ownership over all ad accounts, analytics properties, creative assets, and codebases.
2. **Speed & Execution:** We run agile 2-week development and optimization sprints with dedicated Slack/WhatsApp project channels.
3. **Continuous Innovation:** Ongoing adoption of modern AI search workflows, generative engine optimization (GEO), and deep search indexing benchmarks.`,
  },
  {
    id: "why-us",
    slug: "why-us",
    title: "Why Choose GGM Technologies",
    subtitle: "Built on verified data, accountable to net revenue, and engineered for sustainable market dominance.",
    lastUpdated: "August 2026",
    metaTitle: "Why Choose GGM Technologies | Digital Growth Partner Delhi",
    metaDescription: "Discover why leading enterprises and D2C brands choose GGM Technologies: zero fluff, 100% data transparency, and verified ROI track record.",
    content: `## Why Leading Brands Partner With GGM Technologies

In an industry crowded with empty promises and vanity metrics, **GGM Technologies** stands apart as a digital partner obsessed with **real financial performance and technical excellence**.

---

### 1. Revenue-Attributable Execution
We do not celebrate traffic spikes unless they convert into verified pipeline value or online transactions. Every keyword targeted, campaign launched, and line of code written is focused on lowering your Customer Acquisition Cost (CAC) and increasing Customer Lifetime Value (LTV).

---

### 2. High-Octane Technical Engineering
While traditional agencies outsource web development or rely on slow template builders, our in-house engineering team builds custom, ultra-fast web architectures in Next.js and TypeScript that load in under 1 second and rank effortlessly on Google.

---

### 3. 100% Transparency & Direct Senior Attention
- You never get handed off to inexperienced interns.
- Zero markup on your media spend — you pay Google and Meta directly.
- Real-time live dashboard access 24/7 with zero sugar-coated metrics.

---

### 4. Government Certified & Industry Verified
- **Govt. of India MSME Udyam Certified** (\`UDYAM-DL-08-0098741\`)
- **IndiaMART Verified TrustSeal Member**
- **Justdial Verified Enterprise**
- **Google 5.0 Star Rated Digital Partner**
- **100% GST & Regulatory Compliant**`,
  },
];

async function main() {
  const pool = mysql.createPool(dbUrl);

  console.log("Seeding / updating dedicated About sub-pages in LegalPage table...");

  for (const page of ABOUT_PAGES) {
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
       isPublished = 1,
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
    console.log(`✓ Seeded page: ${page.slug} (${page.title})`);
  }

  await pool.end();
  console.log("About pages seeding complete!");
}

main().catch((err) => {
  console.error("Error seeding about pages:", err);
  process.exit(1);
});
