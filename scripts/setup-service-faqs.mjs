import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("Adding FAQs for Mobile App Development and Google AdSense in MySQL...");

  // Get service IDs
  const [appRows] = await conn.query("SELECT id FROM Service WHERE slug = 'mobile-app-development'");
  const [adsenseRows] = await conn.query("SELECT id FROM Service WHERE slug = 'google-adsense'");

  if (appRows.length > 0) {
    const appId = appRows[0].id;
    await conn.query("DELETE FROM ServiceFaq WHERE serviceId = ?", [appId]);

    const appFaqs = [
      {
        question: "Should we build native iOS/Android or a cross-platform Flutter/React Native app?",
        answer: "For 90% of businesses, cross-platform development (using Flutter or React Native) is the optimal choice. It reduces engineering cost and development time by nearly 40% by maintaining a single codebase that runs with native 120Hz fluid performance on both iOS and Android. Native Swift/Kotlin is recommended for apps requiring intensive 3D graphics, low-level Bluetooth hardware integrations, or specialized OS APIs.",
      },
      {
        question: "Do you handle publishing to Google Play Store and Apple App Store?",
        answer: "Yes, 100%. We manage the entire store deployment process, including Apple Developer Program and Google Play Console setup, App Store Optimization (ASO), metadata & screenshot preparation, privacy policy disclosures, and resolving any compliance review feedback until your app is live.",
      },
      {
        question: "Who owns the mobile application source code and intellectual property?",
        answer: "You do. Upon project completion and final handover, 100% of the proprietary source code, Git repositories, API documentation, design assets, and cloud deployment credentials are transferred directly to your organization with zero vendor lock-in.",
      },
      {
        question: "How do you handle backend databases, APIs, and cloud infrastructure?",
        answer: "We engineer scalable backend microservices using Node.js, Next.js, Python, or Go, coupled with PostgreSQL, MongoDB, or Firebase. We build secure RESTful and GraphQL APIs hosted on AWS, Google Cloud, or DigitalOcean with automated auto-scaling and Redis caching.",
      },
      {
        question: "Do you offer post-launch maintenance, OS updates, and feature additions?",
        answer: "Yes. Mobile operating systems (iOS and Android) release major updates annually. We provide comprehensive monthly SLA maintenance retainers covering bug fixes, OS compatibility patches, cloud server monitoring, and ongoing feature rollouts.",
      },
    ];

    for (let i = 0; i < appFaqs.length; i++) {
      const f = appFaqs[i];
      const id = `faq_app_${Date.now()}_${i}`;
      await conn.query(
        "INSERT INTO ServiceFaq (id, serviceId, question, answer, `order`) VALUES (?, ?, ?, ?, ?)",
        [id, appId, f.question, f.answer, i]
      );
    }
    console.log("Inserted FAQs for mobile-app-development");
  }

  if (adsenseRows.length > 0) {
    const adsenseId = adsenseRows[0].id;
    await conn.query("DELETE FROM ServiceFaq WHERE serviceId = ?", [adsenseId]);

    const adsenseFaqs = [
      {
        question: "How do you ensure 100% compliant Google AdSense approval?",
        answer: "Google AdSense rejects many applications due to 'Low Value Content', poor site navigation, or missing legal pages. We conduct a complete compliance audit of your website: restructuring content architecture, fixing navigation menus, verifying privacy and disclaimer pages, removing thin content, and optimizing page load speeds so your domain meets Google's strict publisher program policies on first submission.",
      },
      {
        question: "How do you increase AdSense RPM and CPM earnings without annoying visitors?",
        answer: "We use strategic ad placement heatmapping and lazy-loading technology. Instead of cluttering the page with intrusive popups, we place high-performing responsive ad units (in-article native ads, sticky anchor units, and high-CTR sidebar placements) that load only as visitors scroll. This maximizes ad viewability scores (over 70%) which prompts Google AdSense to bid significantly higher CPMs.",
      },
      {
        question: "What is invalid traffic protection and how do you prevent AdSense account bans?",
        answer: "AdSense accounts frequently face ad-serving limits or bans due to click-bombing, bot traffic, or aggressive ad placements. We configure advanced Cloudflare Web Application Firewalls (WAF), rate-limiting rules, and ClickJacking protection to block malicious scrapers and click bots before they can interact with your ads, keeping your AdSense account in pristine standing.",
      },
      {
        question: "Can you help integrate Google Ad Manager (GAM) and Header Bidding?",
        answer: "Yes. For publishers with over 50,000 monthly pageviews, relying solely on AdSense leaves money on the table. We implement Google Ad Manager (GAM) with Prebid.js header bidding, allowing premium global ad networks (AppNexus, OpenX, Amazon Publisher Services) to compete simultaneously with AdSense, typically driving a 25% to 50% increase in net ad yield.",
      },
    ];

    for (let i = 0; i < adsenseFaqs.length; i++) {
      const f = adsenseFaqs[i];
      const id = `faq_ads_${Date.now()}_${i}`;
      await conn.query(
        "INSERT INTO ServiceFaq (id, serviceId, question, answer, `order`) VALUES (?, ?, ?, ?, ?)",
        [id, adsenseId, f.question, f.answer, i]
      );
    }
    console.log("Inserted FAQs for google-adsense");
  }

  await conn.end();
}

main().catch((err) => {
  console.error("Error in setup-service-faqs:", err);
  process.exit(1);
});
