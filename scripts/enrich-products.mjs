import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Updating Products with deep, rich text content...");

  const products = [
    {
      slug: "guest-posting",
      name: "Editorial Guest Posting & In-Content PR",
      category: "Off-Page SEO & Authority",
      price: 5000,
      originalPrice: 8500,
      description: `Editorial guest posting is the single most powerful, algorithmic-safe method to build authoritative domain equity and drive high-intent referral visitors to your business. At GGM Technologies, we strictly reject automated submission tools, scraped blog networks, and cheap link farms. 

Our off-page SEO team conducts 100% manual editorial outreach to verified, active digital publications, industry magazines, and authoritative blogs within your specific commercial vertical. Every placement features a professionally crafted, 1,000+ word original editorial article written by subject-matter experts, seamlessly embedding your contextual backlink with naturally sculpted anchor text.

Every publisher website in our network undergoes forensic screening: verified organic Google search traffic exceeding 10,000 monthly visits on Ahrefs, Domain Authority (DA) between 50 and 85+, clean backlink histories with zero past Google penalties, and an Moz Spam Score under 1%. Your permanent dofollow link passes maximum PageRank equity, accelerating your target keywords into Google's top 3 search results.`,
      features: JSON.stringify([
        "100% Manual Editorial Outreach to Verified Niche Publications (DA 50–85+, DR 60+)",
        "Verified Organic Google Search Traffic (>10,000+ monthly visits on Ahrefs/Semrush)",
        "1,000+ Words of Researched, Human-Written Editorial Content with Native Placement",
        "Permanent Contextual Dofollow Link Passing Maximum PageRank & Topical Authority",
        "Natural Anchor Text Sculpting to Prevent Google Algorithmic Penalty Over-Optimization",
        "Clean Moz Spam Score (<1%) & Clean Domain History with Zero Toxic Footprints",
        "Fast Googlebot Indexation within 7 to 14 Days with Cache Verification",
        "Comprehensive White-Label Transparency Report with Live URL, DR/DA, and Organic Traffic Screenshots",
        "365-Day Permanent Placement Guarantee (Free Replacement Warranty if URL Drops)",
        "Official GST Tax Invoice & Dedicated Account Manager for Ongoing Campaign Strategy",
      ]),
      benefits: JSON.stringify([
        "Accelerates competitive money keywords onto Google Page 1 and the Top 3 Search Pack",
        "Increases your website's overall Domain Authority (DA) and Ahrefs Domain Rating (DR)",
        "Builds topical authority and entity relationships within Google's semantic Knowledge Graph",
        "Drives qualified, high-intent referral clicks from actively engaged industry readers",
        "Protects your domain with 100% white-hat editorial compliance adhering strictly to Google Search Essentials",
        "Compounds search visibility and organic revenue month after month with zero maintenance fees",
      ]),
      metaTitle: "Editorial Guest Posting Services Delhi | High DA 50+ Outreach | GGM Technologies",
      metaDescription: "Acquire high-authority editorial guest posts on verified niche publications with 10k+ organic traffic. 100% manual outreach, permanent dofollow links, zero PBNs.",
    },
    {
      slug: "high-da-backlink",
      name: "High DA Authority Backlinks Package",
      category: "Off-Page SEO & Authority",
      price: 1999,
      originalPrice: 3500,
      description: `Domain Authority is the bedrock metric that determines whether your website can compete for lucrative, high-volume transactional keywords. If your competitors have higher authority profiles, even the best on-page content and fastest web designs will struggle to crack Google's top positions.

GGM Technologies' High DA Backlink Package delivers high-impact, contextual authority links from established, high-trust domains (DA 40 to 70+). We execute a balanced, multi-tier authority strategy combining contextual niche article placements, authoritative business resource profiles, editorial resource page mentions, and trusted industry directories.

Every single link is manually placed with precision anchor text planning to ensure your backlink profile mimics a natural, organic growth curve. By diversifying referring subnets, IP classes, and domain extensions, we insulate your domain against core algorithm updates while delivering the raw link equity required to outrank aggressive competitors in Delhi-NCR and across India.`,
      features: JSON.stringify([
        "High-Authority Backlinks from Established Websites with Domain Authority (DA) 40–70+",
        "Contextual In-Content Link Placements Surrounded by Thematically Relevant Copy",
        "Diverse Link Mix: Editorial Mentions, Authoritative Directories, and Resource Portals",
        "Strategic Anchor Text Variety (Exact Match, Partial Match, Branded & Natural LSI)",
        "100% Manual Submission & Outreach with Zero Automated Software or Bots",
        "Multiple C-Class IP Diversity across High-Reputation Global Hosting Providers",
        "Fast Indexation Support with Google Search Console Verification Monitoring",
        "Detailed Excel Audit Report with Live Link URLs, DA, PA, and Moz Spam Scores",
        "180-Day Link Replacement Warranty Guarantee",
        "Full Commercial Compliance with GST Billing for Indian Enterprises",
      ]),
      benefits: JSON.stringify([
        "Substantially increases overall domain trust and algorithmic ranking confidence",
        "Helps new and established websites break through keyword ranking plateaus",
        "Diversifies backlink profile with high-trust referring domains and diverse IP subnets",
        "Powers up secondary pages and product category archives with fresh PageRank flow",
        "Cost-effective authority scaling for businesses seeking maximum ROI on SEO budgets",
      ]),
      metaTitle: "High DA Backlinks Services India | Authority Link Building | GGM Technologies",
      metaDescription: "Boost your website Domain Authority with high-impact, contextual backlinks from DA 40-70+ domains. 100% manual execution, diversified IPs, permanent dofollow value.",
    },
    {
      slug: "web-2-0-backlink",
      name: "Web 2.0 Tiered Authority Network",
      category: "Off-Page SEO & Authority",
      price: 2999,
      originalPrice: 5000,
      description: `Tiered link building is an advanced architectural technique used by elite SEO agencies to funnel massive topical relevance and link power to your primary money pages without exposing your root domain to algorithmic risk.

Our Web 2.0 Tiered Authority service manually architects bespoke, high-authority satellite micro-properties across the world's most trusted Web 2.0 platforms (WordPress.com, Blogger, Medium, Tumblr, Substack, Wix, and GitHub Pages). Each property is engineered from scratch with a custom design theme, dedicated brand profile, about page, and multiple supporting articles to simulate genuine, standalone web entities.

We publish 100% unique, human-edited topical content on each property, interlinking relevant supporting pages before placing a natural, context-rich citation pointing directly to your primary website or tier-1 guest posts. This builds a protective buffer while funneling compounded PageRank equity straight into your search rankings.`,
      features: JSON.stringify([
        "Manually Constructed Web 2.0 Mini-Sites on Tier-1 Platforms (Medium, WordPress, Blogger, Substack)",
        "Unique Custom Branding, Logos, Bios, and Dedicated About & Contact Pages on Each Property",
        "100% Unique, Niche-Relevant Articles (700+ Words Each) per Web 2.0 Entity",
        "Realistic Multi-Post Architecture: Buffer Content Published Before Link Insertion",
        "Strategic Tier-1 & Tier-2 Funneling Passing Maximum Safe Link Velocity",
        "Dofollow Contextual Anchor Links Integrated Naturally into Core Article Body",
        "Full Login Credentials (Usernames & Passwords) Handed Over to Client for Total Ownership",
        "Drip-Feed Publication Strategy Simulating Organic Domain Emergence",
        "Comprehensive Excel Report Detailing Live URLs, Platform Authority, and Target Pages",
      ]),
      benefits: JSON.stringify([
        "Creates a controlled, private satellite ecosystem you permanently own and control",
        "Safely funnels powerful link juice without risking your primary domain's reputation",
        "Supercharges secondary tier-1 guest posts, making existing backlinks 3x more potent",
        "Dominates branded search results with owned satellite properties pushing down negative reviews",
        "Complete asset handoff with 100% login credentials provided upon delivery",
      ]),
      metaTitle: "Web 2.0 Link Building Services | Tiered Authority Networks | GGM Technologies",
      metaDescription: "Manually built, branded Web 2.0 properties on trusted global platforms with unique content. Tiered link architecture engineered for safe, high-velocity PageRank funneling.",
    },
  ];

  for (const p of products) {
    await conn.query(
      `UPDATE Product 
       SET name = ?, category = ?, price = ?, originalPrice = ?, description = ?, features = ?, benefits = ?, metaTitle = ?, metaDescription = ?
       WHERE slug = ?`,
      [
        p.name,
        p.category,
        p.price,
        p.originalPrice,
        p.description,
        p.features,
        p.benefits,
        p.metaTitle,
        p.metaDescription,
        p.slug,
      ]
    );
    console.log(`✓ Updated product: ${p.slug}`);
  }

  await conn.end();
  console.log("All products updated with rich, authoritative content!");
}

main().catch((err) => {
  console.error("Error updating products:", err);
  process.exit(1);
});
