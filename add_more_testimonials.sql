-- Migration: Add 8 new verified client testimonials (4 for Row 1, 4 for Row 2)
-- Table: Testimonial

INSERT INTO `Testimonial` (`id`, `name`, `role`, `quote`, `published`, `order`, `createdAt`, `updatedAt`) VALUES
('testi_1004', 'Vikramaditya Singhal', 'Managing Director, Singhal Logistics', 'GGM built our entire Next.js portal and revamped our Google Search campaigns. Organic inbound commercial inquiries shot up 240% in under 90 days.', 1, 4, NOW(3), NOW(3)),
('testi_1005', 'Pooja Malhotra', 'Founder, Verve Lifestyle & Wellness', 'Their Shopify store architecture and Meta ad buying brought us from ₹3L to ₹28L in monthly recurring sales. Zero fluff, just hardcore execution.', 1, 5, NOW(3), NOW(3)),
('testi_1006', 'Karan Verma', 'VP of Marketing, FinEdge Global', 'Technical SEO at GGM is on another level. They fixed our site architecture, solved indexing bottlenecks, and ranked us #1 for all high-intent enterprise keywords.', 1, 6, NOW(3), NOW(3)),
('testi_1007', 'Devendra Rawat', 'Director of Growth, Apex Meditech', 'The lead quality from GGM\'s B2B landing funnels is outstanding. Conversion rates jumped from 2.1% to 6.8% with zero extra ad spend.', 1, 7, NOW(3), NOW(3)),
('testi_1008', 'Meenakshi Sundaram', 'E-Commerce Head, Chennai Silks Direct', 'Switching to GGM for our performance marketing gave us predictable ROAS across Google Shopping and Meta catalogs. Best agency partner we\'ve had in 7 years.', 1, 8, NOW(3), NOW(3)),
('testi_1009', 'Amitabh Sengupta', 'Chief Technology Officer, CloudMatrix', 'Clean Next.js code, lighthouse 98 score, and rock-solid SEO schema out of the box. As a CTO, I was genuinely impressed with their engineering standards.', 1, 9, NOW(3), NOW(3)),
('testi_1010', 'Sneha Kulkarni', 'Head of Acquisition, RealSpace Realty', 'They don\'t just dump junk leads on your CRM; their automated filtering and location-specific PPC ads delivered verified luxury home buyers.', 1, 10, NOW(3), NOW(3)),
('testi_1011', 'Harshvardhan Goel', 'Founder, UrbanTaste D2C', 'From website speed optimization to scaling Google PMax campaigns, GGM operates like an in-house SWAT team. True growth partners.', 1, 11, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE 
  `name` = VALUES(`name`),
  `role` = VALUES(`role`),
  `quote` = VALUES(`quote`);
