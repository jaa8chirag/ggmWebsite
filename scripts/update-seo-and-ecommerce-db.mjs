import mysql from "mysql2/promise";

const ecommerceFaqs = [
  {
    question: "Which eCommerce platforms do you build and support?",
    answer: "We specialize in Shopify, Shopify Plus, WooCommerce, and custom headless Next.js eCommerce architectures tailored for high transaction speed and mobile conversions.",
  },
  {
    question: "Can you migrate our existing store without losing SEO rankings or customer data?",
    answer: "Yes. We execute zero-downtime migrations preserving your complete product catalog, customer records, order history, and 301 URL redirect mapping for full Google ranking retention.",
  },
  {
    question: "Do you integrate Indian payment gateways and shipping aggregators?",
    answer: "Yes, we integrate Razorpay, Cashfree, PayU, Stripe, Shiprocket, Delhivery, and automated WhatsApp order confirmation and abandoned cart recovery systems.",
  },
];

async function updateDb(url, name) {
  try {
    const isCloud = url.includes("tidbcloud");
    const conn = await mysql.createConnection(
      isCloud ? { uri: url, ssl: { rejectUnauthorized: false } } : url
    );

    // 1. Update SEO service
    await conn.query(
      `UPDATE Service 
       SET 
         title = 'SEO (Search Engine Optimization)',
         promise = 'Turn Google, Chat Gpt, Gemini Searches Into Traffic, Leads & Revenue',
         description = 'Your customers are searching. Let’s make sure they find you. Simple SEO that brings more traffic, leads, and sales.',
         metaTitle = 'Best SEO Agency in Delhi | Rank #1 on Google | GGM Technologies',
         metaDescription = 'Simple SEO that brings more traffic, leads, and sales. Turn Google, ChatGPT, and Gemini searches into revenue with GGM Technologies in Delhi.'
       WHERE slug = 'seo' OR id = 'srv_1000'`
    );
    console.log(`✓ Updated SEO service in ${name}`);

    // 2. Update PPC service to E-Commerce
    await conn.query(
      `UPDATE Service 
       SET 
         slug = 'e-commerce',
         title = 'E-Commerce',
         promise = 'Scale your online store into a high-converting revenue engine.',
         description = 'End-to-end eCommerce development, conversion rate optimization, headless storefronts, seamless payment gateways, and multi-channel scaling.',
         bullets = ?,
         ogImage = '/images/services/e-commerce.jpg',
         metaTitle = 'E-Commerce Development & Solutions in Delhi | GGM Technologies',
         metaDescription = 'Scale your online store with high-converting eCommerce solutions, custom Shopify & WooCommerce stores, and headless architectures by GGM Technologies.'
       WHERE slug = 'ppc' OR id = 'srv_1001'`,
      [
        JSON.stringify([
          "Custom Shopify, WooCommerce & Headless Storefronts",
          "Checkout & Conversion Rate Optimization (CRO)",
          "Payment Gateway, Logistics & Inventory Automation",
        ]),
      ]
    );
    console.log(`✓ Updated PPC to E-Commerce in ${name}`);

    // 3. Update FAQs for srv_1001
    await conn.query("DELETE FROM ServiceFaq WHERE serviceId = 'srv_1001'");
    for (let i = 0; i < ecommerceFaqs.length; i++) {
      const faq = ecommerceFaqs[i];
      const id = `faq_ecom_${Date.now()}_${i}`;
      await conn.query(
        "INSERT INTO ServiceFaq (id, serviceId, question, answer, `order`) VALUES (?, 'srv_1001', ?, ?, ?)",
        [id, faq.question, faq.answer, i]
      );
    }
    console.log(`✓ Updated E-Commerce FAQs in ${name}`);

    const [services] = await conn.query("SELECT id, slug, title, promise FROM Service ORDER BY `index` ASC");
    console.log(`\nCurrent Services in ${name}:`);
    console.table(services);

    await conn.end();
  } catch (err) {
    console.error(`Error in ${name}:`, err.message);
  }
}

async function main() {
  await updateDb(
    "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    "TiDB Cloud"
  );
  await updateDb(
    "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite",
    "Local MySQL"
  );
}

main().catch(console.error);
