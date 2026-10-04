import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}

const dbUrl = process.env.DATABASE_URL || 'mysql://root:Chirag30kum%40r@127.0.0.1:3306/ggmwebsite';

const newTestimonials = [
  {
    id: 'testi_1004',
    name: 'Vikramaditya Singhal',
    role: 'Managing Director, Singhal Logistics',
    quote: 'GGM built our entire Next.js portal and revamped our Google Search campaigns. Organic inbound commercial inquiries shot up 240% in under 90 days.',
    order: 4
  },
  {
    id: 'testi_1005',
    name: 'Pooja Malhotra',
    role: 'Founder, Verve Lifestyle & Wellness',
    quote: 'Their Shopify store architecture and Meta ad buying brought us from ₹3L to ₹28L in monthly recurring sales. Zero fluff, just hardcore execution.',
    order: 5
  },
  {
    id: 'testi_1006',
    name: 'Karan Verma',
    role: 'VP of Marketing, FinEdge Global',
    quote: 'Technical SEO at GGM is on another level. They fixed our site architecture, solved indexing bottlenecks, and ranked us #1 for all high-intent enterprise keywords.',
    order: 6
  },
  {
    id: 'testi_1007',
    name: 'Devendra Rawat',
    role: 'Director of Growth, Apex Meditech',
    quote: "The lead quality from GGM's B2B landing funnels is outstanding. Conversion rates jumped from 2.1% to 6.8% with zero extra ad spend.",
    order: 7
  },
  {
    id: 'testi_1008',
    name: 'Meenakshi Sundaram',
    role: 'E-Commerce Head, Chennai Silks Direct',
    quote: "Switching to GGM for our performance marketing gave us predictable ROAS across Google Shopping and Meta catalogs. Best agency partner we've had in 7 years.",
    order: 8
  },
  {
    id: 'testi_1009',
    name: 'Amitabh Sengupta',
    role: 'Chief Technology Officer, CloudMatrix',
    quote: 'Clean Next.js code, lighthouse 98 score, and rock-solid SEO schema out of the box. As a CTO, I was genuinely impressed with their engineering standards.',
    order: 9
  },
  {
    id: 'testi_1010',
    name: 'Sneha Kulkarni',
    role: 'Head of Acquisition, RealSpace Realty',
    quote: "They don't just dump junk leads on your CRM; their automated filtering and location-specific PPC ads delivered verified luxury home buyers.",
    order: 10
  },
  {
    id: 'testi_1011',
    name: 'Harshvardhan Goel',
    role: 'Founder, UrbanTaste D2C',
    quote: 'From website speed optimization to scaling Google PMax campaigns, GGM operates like an in-house SWAT team. True growth partners.',
    order: 11
  }
];

async function main() {
  const conn = await mysql.createConnection(dbUrl);

  for (const t of newTestimonials) {
    await conn.query(
      'INSERT INTO Testimonial (id, name, role, quote, published, `order`, createdAt, updatedAt) VALUES (?, ?, ?, ?, 1, ?, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), quote=VALUES(quote)',
      [t.id, t.name, t.role, t.quote, t.order]
    );
  }

  const [count] = await conn.query('SELECT COUNT(*) as cnt FROM Testimonial');
  console.log('Total testimonials in DB now:', count[0].cnt);

  const [rows] = await conn.query('SELECT id, name, role FROM Testimonial');
  console.log(rows);

  await conn.end();
}

main().catch(console.error);
