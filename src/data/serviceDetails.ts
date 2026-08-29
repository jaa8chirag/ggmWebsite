export interface ServiceMetric {
  value: string;
  label: string;
  subtext: string;
}

export interface ServicePillar {
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface ServiceStep {
  step: string;
  title: string;
  duration: string;
  summary: string;
  details: string[];
}

export interface ComparisonRow {
  feature: string;
  ggmApproach: string;
  traditionalAgency: string;
  freelancer: string;
}

export interface IndustryUseCase {
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetailContent {
  slug: string;
  badge: string;
  heroH1: string;
  heroSubtitle: string;
  overviewParagraphs: string[];
  metrics: ServiceMetric[];
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: ServicePillar[];
  frameworkTitle: string;
  frameworkSubtitle: string;
  frameworkSteps: ServiceStep[];
  techStackTitle: string;
  techStackSubtitle: string;
  techStackCategories: {
    category: string;
    tools: string[];
  }[];
  comparisonTitle: string;
  comparisonSubtitle: string;
  comparisonRows: ComparisonRow[];
  industriesTitle: string;
  industriesSubtitle: string;
  industries: IndustryUseCase[];
  faqsTitle: string;
  faqsSubtitle: string;
  faqs: ServiceFaqItem[];
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetailContent> = {
  seo: {
    slug: "seo",
    badge: "ENGINEERING-LED ORGANIC SEARCH",
    heroH1: "Technical SEO & Search Engine Dominance in Delhi",
    heroSubtitle:
      "We replace speculative SEO with algorithmic precision. From Core Web Vitals and semantic entity graphs to high-authority editorial PR, we build search engines' favorite digital assets.",
    overviewParagraphs: [
      "In 2026, search engine optimization is no longer about keyword stuffing or superficial blog posts. With the introduction of Google's Search Generative Experience (SGE), AI Overviews, and continuous Core Algorithm updates, ranking on page one demands an uncompromising blend of hardcore technical web architecture, deep semantic relevance, and authoritative digital citations.",
      "At GGM Technologies, we treat search optimization as a software engineering and data science discipline. Based in South Delhi and serving ambitious brands across India and globally, our SEO systems diagnose your site's JavaScript hydration bottlenecks, render budgets, and topical depth to engineer sustainable, compounding organic revenue that algorithmic shifts cannot wash away.",
    ],
    metrics: [
      { value: "310%+", label: "Average Organic Lift", subtext: "Measured over 6–12 months across active enterprise retainers" },
      { value: "< 1.2s", label: "Target LCP Performance", subtext: "Optimized Core Web Vitals for maximum crawl efficiency" },
      { value: "94.8%", label: "First-Page Retention", subtext: "Keywords maintaining page-one rankings across Google core updates" },
      { value: "100%", label: "White-Hat Compliance", subtext: "Strict adherence to Google Search Essentials & EEAT protocols" },
    ],
    pillarsTitle: "Full-Funnel Organic Search Capabilities",
    pillarsSubtitle:
      "Six interconnected pillars engineered to capture commercial intent at every stage of the buyer journey.",
    pillars: [
      {
        title: "Technical SEO & Server Architecture",
        tagline: "Unblocking search bots with sub-second crawl efficiency.",
        description:
          "Search engines cannot rank what they cannot efficiently crawl and render. We conduct forensic server log file analysis, fix dynamic JavaScript rendering issues, optimize XML sitemaps, resolve index bloat, and resolve canonical conflicts.",
        deliverables: [
          "Server log file analysis & crawl budget optimization",
          "Core Web Vitals remediation (INP, LCP, CLS)",
          "JavaScript client-side vs. SSR/ISR indexing audits",
          "Robots.txt, canonical tags & XML sitemap architecture",
          "Faceted navigation and parameter indexing control",
        ],
      },
      {
        title: "Semantic Entity Clustering & Topical Authority",
        tagline: "Structuring knowledge graphs search algorithms reward.",
        description:
          "Google does not just match strings; it connects entities. We architect comprehensive topic clusters, Pillar-and-Spoke internal linking hierarchies, and JSON-LD Schema graphs that establish undisputed topical authority in your niche.",
        deliverables: [
          "Entity mapping against Wikidata & Google Knowledge Graph",
          "Topical cluster architecture & internal link sculpting",
          "Commercial & informational search intent gap mapping",
          "Advanced Schema.org microdata (Product, FAQ, Article, Organization)",
          "Competitor semantic footprint & content deficit analysis",
        ],
      },
      {
        title: "Programmatic & Enterprise SEO Scaling",
        tagline: "Automated high-quality landing page generation at scale.",
        description:
          "For marketplaces, real estate, directories, and multi-location enterprises, programmatic SEO unlocks thousands of long-tail commercial queries without duplicating thin content.",
        deliverables: [
          "Dynamic template design with unique structured datasets",
          "Automated metadata, OpenGraph, and internal cross-linking rules",
          "Unique content variable injection to bypass thin content filters",
          "Indexation monitoring across 10,000+ programmatic URLs",
          "Headless CMS integration for dynamic taxonomy management",
        ],
      },
      {
        title: "Local SEO & Google Business Profile Optimization",
        tagline: "Dominating local 3-pack search in Delhi-NCR and across India.",
        description:
          "Hyper-local visibility connects you with nearby high-intent buyers. We optimize Google Business Profiles (GBP), run localized geo-grid rank tracking, clean up NAP citations, and build local review velocity systems.",
        deliverables: [
          "Google Business Profile (GBP) forensic optimization",
          "Geo-grid local rank tracking across 5km–25km radii",
          "NAP citation cleanup and consistency synchronization",
          "Localized landing pages targeting Tier-1 & Tier-2 cities",
          "Reputation management & customer review acceleration",
        ],
      },
      {
        title: "Editorial Digital PR & Authority Acquisition",
        tagline: "Earning tier-one backlinks that actually move competitive needles.",
        description:
          "We reject spammy PBNs and paid link schemes that risk manual Google penalties. Our outreach team earns high-trust editorial citations and journalist mentions from respected publications, industry journals, and authoritative news outlets.",
        deliverables: [
          "Data-driven industry surveys and original research studies",
          "HARO (Help A Reporter Out) & media journalist outreach",
          "Unlinked brand mention reclamation & broken link recovery",
          "Guest editorial placements on niche-relevant publications (DA 50+)",
          "Quarterly toxic backlink auditing and proactive disavowal",
        ],
      },
      {
        title: "E-Commerce Search Engine Optimization",
        tagline: "Turning product categories into consistent revenue drivers.",
        description:
          "E-commerce websites face unique hurdles: pagination, duplicate filter parameters, out-of-stock products, and thin descriptions. We engineer category architectures that maximize organic checkout revenue.",
        deliverables: [
          "Product and collection page on-page optimization",
          "Structured data for rich product snippets, prices & stock status",
          "Faceted filter navigation crawl containment",
          "Out-of-stock product handling and redirect protocols",
          "E-commerce site search query analysis for new keyword discovery",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage SEO Execution Framework",
    frameworkSubtitle:
      "A structured, transparent roadmap from initial forensic discovery to market search leadership.",
    frameworkSteps: [
      {
        step: "01",
        title: "Forensic Technical & Architectural Audit",
        duration: "Weeks 1–2",
        summary: "We inspect your entire digital ecosystem under a technical microscope.",
        details: [
          "Deep site crawl analyzing 120+ technical ranking factors",
          "Server log analysis to check Googlebot crawl behavior",
          "Historical penalty check, algorithmic drops & backlink risk audit",
          "Prioritized action matrix ranked by commercial impact vs effort",
        ],
      },
      {
        step: "02",
        title: "Keyword Intelligence & Entity Hierarchy",
        duration: "Weeks 3–4",
        summary: "Mapping consumer search intent to your revenue-generating services.",
        details: [
          "High-intent transactional and commercial keyword clustering",
          "Competitor content gap analysis to exploit ranking blind spots",
          "Pillar-and-cluster content calendar design with internal link paths",
          "Target URL mapping to eliminate keyword cannibalization",
        ],
      },
      {
        step: "03",
        title: "On-Page, Speed & Schema Implementation",
        duration: "Weeks 5–8",
        summary: "Hardcoding fixes directly into your codebase for maximum search engine resonance.",
        details: [
          "Sub-second Core Web Vitals tuning (INP, LCP, script deferrals)",
          "Meta title, heading, and semantic copy optimization",
          "Custom JSON-LD schema implementation (Organization, Service, FAQ)",
          "Internal link sculpting to pass link equity to key conversion pages",
        ],
      },
      {
        step: "04",
        title: "Digital PR, Authority Building & Content Ship",
        duration: "Months 3+",
        summary: "Consistently compounding your domain trust with editorial citations.",
        details: [
          "Publishing authoritative thought leadership and comprehensive guides",
          "White-hat editorial link acquisition through digital PR campaigns",
          "Ongoing local citation hygiene and citation expansion",
          "Bi-weekly ranking velocity monitoring and indexation checks",
        ],
      },
      {
        step: "05",
        title: "Conversion Optimization & Algorithmic Defense",
        duration: "Continuous",
        summary: "Turning organic visitors into paying customers while insulating against updates.",
        details: [
          "GA4 conversion path and assisted revenue attribution modeling",
          "Heatmap and bounce rate analysis on top-performing landing pages",
          "Pre-emptive quality checks ahead of major Google Core Updates",
          "Executive reporting dashboards showing ROI, pipeline value, and rankings",
        ],
      },
    ],
    techStackTitle: "Enterprise Tooling & Analytical Infrastructure",
    techStackSubtitle:
      "We invest in the industry's most advanced search diagnostic suites to leave nothing to guesswork.",
    techStackCategories: [
      {
        category: "Crawling & Technical Diagnostics",
        tools: ["Screaming Frog SEO Spider", "Sitebulb Enterprise", "Google Search Console", "Chrome DevTools Lighthouse"],
      },
      {
        category: "Competitive & Keyword Intelligence",
        tools: ["Ahrefs Enterprise", "SEMrush", "Keyword Insights AI", "Google Trends", "SurferSEO"],
      },
      {
        category: "Analytics, Telemetry & Server Logs",
        tools: ["Google Analytics 4 (GA4)", "Google Tag Manager", "BigQuery", "Looker Studio", "Loggly / ELK"],
      },
      {
        category: "Structured Data & Performance",
        tools: ["Schema App", "Cloudflare Edge SEO", "WebPageTest", "Next.js SSR Cache", "Pagespeed Insights"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Traditional Agencies",
    comparisonSubtitle:
      "Why India's high-growth enterprises choose our engineering-first search methodology.",
    comparisonRows: [
      {
        feature: "Audit Depth & Execution",
        ggmApproach: "Code-level fixes executed directly via Git pull requests & server configs.",
        traditionalAgency: "Generic 40-page PDF checklist handed to your developer to figure out.",
        freelancer: "Surface-level meta tag updates with no server or code insight.",
      },
      {
        feature: "Link Building Ethics",
        ggmApproach: "100% white-hat editorial PR, original research, and journalist citations.",
        traditionalAgency: "Spammy PBN networks, rented web 2.0 links, and paid link farms.",
        freelancer: "Low-quality directory submissions and Fiverr link bundles.",
      },
      {
        feature: "Reporting & Attribution",
        ggmApproach: "Connected to pipeline revenue, qualified inquiries, and blended CAC.",
        traditionalAgency: "Vanity impressions and non-commercial keyword rank lists.",
        freelancer: "Occasional automated email screenshots without analysis.",
      },
      {
        feature: "Algorithmic Resilience",
        ggmApproach: "Architected around user experience, topical depth, and search essentials.",
        traditionalAgency: "Vulnerable to sudden core updates, spam updates, and de-indexing.",
        freelancer: "High risk of manual actions and Google search penalties.",
      },
    ],
    industriesTitle: "Tailored SEO Architectures for High-Growth Sectors",
    industriesSubtitle:
      "Search strategies customized to the unique buyer journeys and regulations of your industry.",
    industries: [
      {
        industry: "E-Commerce & D2C Brands",
        challenge: "Managing thousands of dynamic product URLs, seasonal stockouts, and intense marketplace competition.",
        solution: "Faceted search indexing controls, high-intent collection page clustering, and product review schema.",
        impact: "340% increase in non-brand organic search revenue with zero cannibalization.",
      },
      {
        industry: "B2B SaaS & Technology",
        challenge: "High customer acquisition costs (CAC) and long multi-stakeholder consideration cycles.",
        solution: "Bottom-of-funnel comparison pages ('vs', 'alternatives'), integration hubs, and technical documentation indexing.",
        impact: "Reduced blended CAC by 42% while driving top-tier enterprise demo requests.",
      },
      {
        industry: "Real Estate & Architecture",
        challenge: "Intense local rivalry for ultra-luxury property search terms across Delhi-NCR.",
        solution: "Hyper-local neighborhood guides, luxury micro-location landing pages, and multi-angle image SEO.",
        impact: "Dominated top 3 positions for 40+ commercial high-ticket property keywords.",
      },
      {
        industry: "Healthcare & Specialized Clinics",
        challenge: "Strict Google YMYL (Your Money Your Life) and EEAT medical validation requirements.",
        solution: "Doctor credentials schema, peer-reviewed medical content structuring, and local clinic map pack dominance.",
        impact: "5x increase in qualified local patient appointment bookings across 6 clinics.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Our SEO Services",
    faqsSubtitle: "Honest, transparent answers about search rankings, timelines, and deliverables.",
    faqs: [
      {
        question: "How long does it take to see tangible ranking and traffic results from SEO?",
        answer:
          "Technical fixes, crawl optimizations, and indexation improvements generally reflect in Google Search Console within 2 to 4 weeks. However, ranking on competitive, high-commercial-intent keywords typically requires 90 to 180 days of continuous topical authority building and digital PR. Unlike paid ads which turn off when spend stops, organic search compounding delivers sustained ROI for years.",
      },
      {
        question: "Do you guarantee #1 rankings on Google?",
        answer:
          "No ethical agency can guarantee an exact #1 position because Google's algorithm incorporates over 200 proprietary ranking factors and updates multiple times daily. What GGM Technologies commits to is an uncompromising, mathematically backed execution framework: fixing all technical bottlenecks, building superior topical content, and acquiring legitimate high-authority backlinks with transparent monthly KPIs.",
      },
      {
        question: "Will you edit our existing website code or just provide recommendations?",
        answer:
          "We do both based on your workflow. If your team prefers, we submit clean, tested code commits and pull requests directly into your Git repository (GitHub, GitLab, Bitbucket) or CMS (WordPress, Shopify, Next.js). If you have an internal development team, we deliver detailed technical pull-request tickets with code snippets and test cases.",
      },
      {
        question: "How do your SEO strategies survive Google Core & Spam Updates?",
        answer:
          "We strictly adhere to Google Search Essentials and Google's EEAT (Experience, Expertise, Authoritativeness, and Trustworthiness) standards. Because we do not use automated link spam, private blog networks (PBNs), or scraped AI content, our client websites consistently gain market share when Google rolls out quality and helpful content updates.",
      },
      {
        question: "How does the rise of AI Overviews and Google SGE impact SEO in 2026?",
        answer:
          "AI Overviews synthesize direct answers from the highest-trust, most structured sources on the web. We optimize your content using semantic schema, clear Q&A data structures, tabular comparisons, and verified entity citations so that your brand is cited as the primary source in Google's AI-generated answer boxes.",
      },
      {
        question: "What is the difference between Local SEO and National/Global SEO?",
        answer:
          "Local SEO focuses on ranking in Google's 3-Pack Map Results and location-specific queries (e.g., 'best interior designer in South Delhi') using Google Business Profile optimization, local citations, and proximity signals. National/Global SEO targets high-volume commercial keywords nationwide or internationally through massive topical authority, technical speed, and enterprise digital PR.",
      },
      {
        question: "What metrics do you include in our monthly SEO performance report?",
        answer:
          "Our reports bypass vanity metrics. We provide live Looker Studio dashboards tracking organic conversion events (inquiries, phone calls, checkouts), commercial keyword ranking movements, organic impression share, Core Web Vitals health, and organic revenue contribution compared to paid channels.",
      },
    ],
    metaTitle: "Technical SEO Services in Delhi | GGM Technologies",
    metaDescription:
      "Enterprise SEO agency in Delhi specializing in technical SEO audits, Core Web Vitals, semantic entity clustering, and high-authority link acquisition.",
    focusKeywords: ["SEO services in Delhi", "technical SEO agency", "local SEO Delhi", "Core Web Vitals", "link building agency India"],
  },

  ppc: {
    slug: "ppc",
    badge: "ALGORITHMIC PERFORMANCE MEDIA",
    heroH1: "PPC & Google Ads Management Agency in Delhi",
    heroSubtitle:
      "Every rupee of media budget must earn its place. We engineer algorithmic bidding strategies, server-side tracking (CAPI), and high-converting landing pages that scale blended ROAS predictably.",
    overviewParagraphs: [
      "Paid advertising without rigorous tracking and conversion rate engineering is the fastest way to burn capital. With rising Cost-Per-Click (CPC) across competitive Indian and global markets, standard search campaigns and automated bidding presets are no longer enough to generate profitable returns.",
      "GGM Technologies operates as a performance-first media buying partner. Based in Delhi, our PPC division manages high-budget Google Ads, Meta Ads (Facebook & Instagram), and LinkedIn campaigns. We combine first-party data telemetry, server-side Conversions API (CAPI), negative keyword sculpting, and relentless ad creative iteration to turn ad spend into predictable revenue.",
    ],
    metrics: [
      { value: "4.8x", label: "Average Blended ROAS", subtext: "Across active e-commerce and high-ticket lead gen campaigns" },
      { value: "-38%", label: "Reduction in CPA", subtext: "Achieved within the first 60 days of account restructuring" },
      { value: "₹10Cr+", label: "Ad Spend Managed", subtext: "Deployed with zero media markups or hidden fees" },
      { value: "99.9%", label: "Tracking Data Accuracy", subtext: "Powered by server-side CAPI and GA4 first-party tracking" },
    ],
    pillarsTitle: "Full-Funnel Paid Advertising Capabilities",
    pillarsSubtitle:
      "Precision targeting and algorithmic optimization engineered for immediate return on investment.",
    pillars: [
      {
        title: "Google Search Ads & High-Intent Capture",
        tagline: "Dominating transactional search queries when buyers are ready to buy.",
        description:
          "We architect tightly structured Single-Theme Ad Groups (STAGs) with exact and phrase match intent, comprehensive negative keyword sculpting, and dynamic responsive search ads (RSAs) to maximize Quality Score and lower your effective CPC.",
        deliverables: [
          "Exhaustive commercial and transactional keyword discovery",
          "Proactive negative keyword sculpting to eliminate wasted budget",
          "Responsive Search Ad (RSA) copywriting with high-CTR hooks",
          "Ad assets optimization (sitelinks, callouts, lead forms, call extensions)",
          "Target CPA & Target ROAS Smart Bidding calibration",
        ],
      },
      {
        title: "Google Performance Max (PMax) Architecture",
        tagline: "Harnessing Google's multi-channel AI with clean first-party signals.",
        description:
          "Performance Max can waste budget on brand cannibalization without proper guardrails. We implement brand exclusions, high-value asset groups, negative keyword lists at the account level, and first-party customer audience signals.",
        deliverables: [
          "Asset group structuring segmented by product margin or customer tier",
          "Brand exclusion lists to prevent paying for organic brand searches",
          "High-definition video, image, and headline asset creation",
          "Audience signal enrichment using CRM and high-LTV customer lists",
          "Channel placement auditing to block low-quality mobile app traffic",
        ],
      },
      {
        title: "Meta Ads (Facebook & Instagram) Scaling",
        tagline: "Creating demand through thumb-stopping creatives and Advantage+ funnels.",
        description:
          "We combine high-tempo creative testing frameworks with Meta's Advantage+ shopping and lead campaigns. Our copywriters and designers build UGC-style hooks, product carousels, and objection-handling video ads that convert cold audiences.",
        deliverables: [
          "Dynamic creative testing (DCT) sprints evaluating hooks & visuals",
          "Advantage+ Shopping & Lead Generation campaign architecture",
          "Custom lookalike and retargeting audience funnels",
          "UGC (User-Generated Content) scripting and visual asset production",
          "Post-click experience synchronization to boost conversion rates",
        ],
      },
      {
        title: "Server-Side Tracking (CAPI) & GA4 Telemetry",
        tagline: "Bypassing iOS ad blockers with resilient first-party data.",
        description:
          "Browser-based tracking loses up to 30% of conversion events due to ad blockers, iOS privacy restrictions, and cookie expiration. We deploy Google Tag Manager Server-Side and Meta Conversions API (CAPI) on custom cloud infrastructure.",
        deliverables: [
          "Server-side Meta Conversions API (CAPI) deployment via Cloudflare/AWS",
          "Google Tag Manager (GTM) enterprise web & server container setup",
          "Google Analytics 4 custom event tracking & conversion modeling",
          "Enhanced Conversions setup with hashed first-party customer parameters",
          "Real-time event match quality (EMQ) scores above 8.5/10",
        ],
      },
      {
        title: "High-Converting Landing Page Engineering (CRO)",
        tagline: "Ensuring high-cost paid clicks convert into closed revenue.",
        description:
          "Sending paid traffic to a slow, generic homepage destroys ad profitability. We design and build dedicated, sub-second Next.js landing pages with clear value propositions, interactive form steps, and social proof elements.",
        deliverables: [
          "Custom Next.js & Tailwind conversion-first landing pages",
          "Multi-step interactive form funnels with instant phone/email validation",
          "Hotjar & Microsoft Clarity session recording and heatmapping",
          "A/B multivariate headline, CTA, and offer testing",
          "Sub-1 second page load speed on mobile cellular connections",
        ],
      },
      {
        title: "B2B LinkedIn & YouTube Media Buying",
        tagline: "Reaching decision-makers, CXOs, and high-ticket B2B buyers.",
        description:
          "For enterprise solutions, high-ticket services, and B2B SaaS, we deploy precision LinkedIn sponsored content, Document Ads, InMail sequences, and high-authority YouTube skippable video ads that command attention.",
        deliverables: [
          "Account-Based Marketing (ABM) targeting by company list and job title",
          "LinkedIn Matched Audiences & CRM contact integration",
          "Lead Gen Forms with auto-fill for frictionless mobile capture",
          "YouTube skippable in-stream ads with strong direct-response CTAs",
          "Cross-platform retargeting sequences closing long sales cycles",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage PPC Execution Framework",
    frameworkSubtitle:
      "How we audit, launch, and scale profitable advertising campaigns within 90 days.",
    frameworkSteps: [
      {
        step: "01",
        title: "Account & Tracking Forensic Audit",
        duration: "Days 1–7",
        summary: "Identifying budget leaks, attribution discrepancies, and historical winners.",
        details: [
          "Forensic audit of search term reports, negative lists, and bid strategies",
          "Verification of GA4, GTM, and pixel conversion triggers",
          "Competitor ad copy and ad spend estimation across spy tools",
          "Building the initial 90-day ROAS and budget allocation roadmap",
        ],
      },
      {
        step: "02",
        title: "Tracking Infrastructure & Server CAPI Build",
        duration: "Days 8–14",
        summary: "Locking in 100% conversion data accuracy before spending media budget.",
        details: [
          "Configuring server-side CAPI and Enhanced Conversions",
          "Setting up CRM webhooks to pass offline conversion values back to Google",
          "Developing customized Looker Studio executive dashboard",
          "Testing end-to-end form fill and transaction attribution events",
        ],
      },
      {
        step: "03",
        title: "Campaign Buildout & Landing Page Launch",
        duration: "Days 15–21",
        summary: "Launching tightly structured campaigns paired with dedicated landing pages.",
        details: [
          "Drafting high-CTR responsive search ads and visual creative batches",
          "Launching mobile-optimized Next.js landing pages with A/B variants",
          "Setting up manual/eCPC bidding guardrails during the algorithm learning phase",
          "Deploying brand defense campaigns and negative keyword barriers",
        ],
      },
      {
        step: "04",
        title: "Algorithmic Smart Bidding Tuning",
        duration: "Weeks 4–8",
        summary: "Feeding clean conversion signals to unlock machine learning scale.",
        details: [
          "Transitioning to Target CPA / Target ROAS once data thresholds are met",
          "Pruning underperforming search terms, placements, and demographic segments",
          "Rotating new ad creative batches based on weekly creative fatigue audits",
          "Reallocating budget to highest-converting campaign assets",
        ],
      },
      {
        step: "05",
        title: "Aggressive Scale & Multi-Channel Expansion",
        duration: "Continuous",
        summary: "Scaling profitable ad spend while maintaining strict marginal ROAS targets.",
        details: [
          "Horizontal scaling across YouTube, Meta, and LinkedIn channels",
          "Implementing value-based bidding (optimizing for revenue, not just lead count)",
          "Conducting ongoing landing page CRO experiments",
          "Weekly tactical syncs and live real-time spend dashboards",
        ],
      },
    ],
    techStackTitle: "Advertising Platforms & Telemetry Stack",
    techStackSubtitle:
      "Enterprise tools we leverage to monitor, automate, and attribute every ad dollar.",
    techStackCategories: [
      {
        category: "Media Buying Platforms",
        tools: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "Microsoft Advertising", "YouTube Ads"],
      },
      {
        category: "Tracking, Attribution & Server CAPI",
        tools: ["Google Tag Manager (Web & Server)", "Meta Conversions API (CAPI)", "Google Analytics 4", "Triple Whale", "Ruler Analytics"],
      },
      {
        category: "Competitive Intelligence & Creative Spy",
        tools: ["SEMrush PPC Toolkit", "SpyFu", "Meta Ad Library", "Foreplay.co", "VidIQ"],
      },
      {
        category: "Landing Page CRO & Behavioral Analytics",
        tools: ["Next.js App Router", "Hotjar", "Microsoft Clarity", "Optimizely", "Unbounce"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Traditional Ad Agencies",
    comparisonSubtitle:
      "The differences that make our paid media engagements transparent and profitable.",
    comparisonRows: [
      {
        feature: "Ad Account Ownership",
        ggmApproach: "100% client-owned. You own all pixel data, campaigns, and billing directly.",
        traditionalAgency: "Agency owns the account; you lose all historical data if you leave.",
        freelancer: "Shared or unorganized personal accounts with zero security.",
      },
      {
        feature: "Media Budget Markup",
        ggmApproach: "0% markup. Every rupee of ad spend goes directly to Google/Meta.",
        traditionalAgency: "Hidden 10–20% markups baked into media invoices.",
        freelancer: "Unpredictable hourly billing with no performance incentive.",
      },
      {
        feature: "Tracking Accuracy",
        ggmApproach: "Server-side CAPI and Enhanced Conversions with 99%+ accuracy.",
        traditionalAgency: "Basic browser pixel prone to 30%+ data loss from ad blockers.",
        freelancer: "Standard copy-paste pixel tag with no custom event validation.",
      },
      {
        feature: "Landing Page Support",
        ggmApproach: "Custom engineered Next.js CRO landing pages included with the retainer.",
        traditionalAgency: "Sends traffic to your existing slow homepage or charges extra fees.",
        freelancer: "No landing page or web development capability.",
      },
    ],
    industriesTitle: "Proven PPC Frameworks Across Industries",
    industriesSubtitle:
      "Campaign architectures engineered for the specific unit economics of your sector.",
    industries: [
      {
        industry: "E-Commerce & Fast-Moving Consumer Goods",
        challenge: "High customer acquisition costs eating into gross margins on Meta and Google.",
        solution: "Segmented Performance Max asset groups, server-side CAPI, and dynamic product catalogs.",
        impact: "Scaled monthly spend to ₹18L while maintaining 4.4x blended ROAS.",
      },
      {
        industry: "High-Ticket Real Estate & Interior Design",
        challenge: "Generic ad clicks resulting in unqualified inquiries and high cost-per-lead.",
        solution: "Strict negative keyword lists, gated qualification form funnels, and verified phone OTP capture.",
        impact: "Lowered qualified CPL by 48% and generated 340+ verified luxury villa leads.",
      },
      {
        industry: "B2B SaaS & Enterprise Software",
        challenge: "Extremely high CPCs on Google search ($30–$80 per click) with long sales cycles.",
        solution: "Account-Based Marketing on LinkedIn combined with high-intent Google search match types.",
        impact: "Generated 64 enterprise demo bookings with Fortune 500 decision-makers.",
      },
      {
        industry: "Healthcare, Hospitals & Multi-Specialty Clinics",
        challenge: "Strict medical advertising policies and patient intent segmentation.",
        solution: "Local search ad extensions, click-to-call campaigns, and direct WhatsApp appointment routing.",
        impact: "Drove 1,200+ verified monthly patient consultations at ₹320 average acquisition cost.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Our PPC & Google Ads Services",
    faqsSubtitle: "Clear answers to your budget, account ownership, and management questions.",
    faqs: [
      {
        question: "Will I retain complete ownership of my Google and Meta ad accounts?",
        answer:
          "Yes, absolutely. We mandate that all ad accounts, pixels, and data assets are created under your company's master email and billing profile. GGM Technologies is granted partner/manager access. If you ever pause services, your campaign history, audiences, and conversion data remain 100% yours.",
      },
      {
        question: "How do you charge for PPC management?",
        answer:
          "We operate on a transparent, flat monthly management retainer with zero percentage markups on your media spend. This completely removes the conflict of interest where agencies recommend spending more money simply to increase their own fees. Your media budget is paid directly to Google and Meta.",
      },
      {
        question: "What is the recommended minimum ad budget to start seeing reliable data?",
        answer:
          "While we can manage campaigns of varying sizes, we generally recommend a minimum ad spend of ₹50,000 to ₹1,00,000 per month (approx. $1,000–$2,500). This provides enough daily impression and click volume for Google and Meta's machine-learning algorithms to exit the initial learning phase and stabilize CPA.",
      },
      {
        question: "How quickly do we start seeing leads or sales from PPC campaigns?",
        answer:
          "Unlike SEO, PPC campaigns can drive immediate traffic within 24 to 48 hours of launch. The first 14 to 21 days are used for algorithmic learning, search term harvesting, and negative keyword pruning. Most accounts achieve optimal, scalable ROAS between days 30 and 60.",
      },
      {
        question: "How do you prevent wasted ad spend and spam leads?",
        answer:
          "We implement four layers of defense: (1) extensive negative keyword lists updated weekly; (2) blocking low-quality mobile display network placements; (3) multi-step landing page forms that verify phone numbers and filter personal email addresses; and (4) IP exclusion rules for competitor click-fraud protection.",
      },
      {
        question: "Should we run Google Search Ads or Performance Max (PMax)?",
        answer:
          "Most successful accounts run both in harmony. High-intent Google Search Ads with exact-match keywords capture buyers actively looking for your specific service. Performance Max acts as an ambient conversion engine across YouTube, Display, Discover, and Gmail, using first-party audience signals with brand search terms excluded.",
      },
      {
        question: "Do you provide custom landing pages, or do we need our own developer?",
        answer:
          "We engineer custom, conversion-optimized Next.js landing pages as part of our PPC retainer. Our design and development team handles copywriting, mobile responsiveness, form integrations, and speed optimization so you don't need to burden your in-house engineers.",
      },
    ],
    metaTitle: "Google Ads & PPC Agency in Delhi | GGM Technologies",
    metaDescription:
      "Performance-driven PPC and Google Ads management agency in Delhi. Scale blended ROAS with algorithmic bidding, server-side CAPI tracking, and custom CRO landing pages.",
    focusKeywords: ["Google Ads agency Delhi", "PPC company Delhi", "Performance marketing agency", "ROAS optimization", "Meta ads agency Delhi"],
  },

  "website-development": {
    slug: "website-development",
    badge: "FULL-STACK NEXT.JS ENGINEERING",
    heroH1: "Custom Web Development & Engineering Agency in Delhi",
    heroSubtitle:
      "We engineer sub-second, conversion-first Next.js web applications built to dominate search rankings and convert traffic into enterprise revenue. Zero bloat, 100% clean code.",
    overviewParagraphs: [
      "In modern digital business, your website is not an online brochure — it is your central revenue engine. A slow, bloated, template-based website directly harms your Google rankings, inflates your paid advertising acquisition costs, and sends high-intent visitors straight to your competitors.",
      "At GGM Technologies, we engineer high-performance web applications using the modern React, Next.js App Router, TypeScript, and Tailwind CSS stack. Located in Delhi and building for global enterprises, we construct digital platforms with 100/100 Core Web Vitals, enterprise security, dynamic CMS integrations, and conversion funnels that perform under massive traffic spikes.",
    ],
    metrics: [
      { value: "< 0.8s", label: "Average Page Load Speed", subtext: "Delivered via Next.js Server Components and global edge CDN" },
      { value: "100/100", label: "Core Web Vitals Benchmark", subtext: "Flawless desktop and mobile Google Lighthouse scores" },
      { value: "+62%", label: "Average Conversion Rate Lift", subtext: "Compared to legacy WordPress or template-based websites" },
      { value: "100%", label: "Full Code & IP Ownership", subtext: "Clean Git repository handoff with zero proprietary lock-in" },
    ],
    pillarsTitle: "Full-Stack Web Engineering Capabilities",
    pillarsSubtitle:
      "Modern web architectures engineered for speed, search engine indexability, and conversion scalability.",
    pillars: [
      {
        title: "Next.js App Router & Server Components Architecture",
        tagline: "Ultra-fast server-rendered web applications with zero client bloat.",
        description:
          "We build on the bleeding edge of Next.js, leveraging React Server Components (RSC), Incremental Static Regeneration (ISR), and Edge Middleware to deliver instantaneous page transitions with minimal JavaScript payloads.",
        deliverables: [
          "Next.js App Router architecture with modular component hierarchy",
          "Server-Side Rendering (SSR) & Static Site Generation (SSG) hybrid setup",
          "TypeScript type-safety across all components, APIs, and data models",
          "Optimized asset pipelines (Next/Image, Next/Font, WebP/AVIF formats)",
          "Zero-latency global deployment on Vercel, AWS, or custom cloud clusters",
        ],
      },
      {
        title: "Conversion-Focused UI/UX Design (Figma to Code)",
        tagline: "Aesthetic digital interfaces designed to direct consumer attention.",
        description:
          "Great code means nothing without compelling visual hierarchy. Our UI/UX designers create tailored wireframes and interactive Figma prototypes that blend sleek typography, dark/light modes, micro-animations, and intuitive user flows.",
        deliverables: [
          "Complete Figma design system with components, tokens, and style guides",
          "Mobile-first responsive layouts tested across 15+ viewport resolutions",
          "Subtle micro-interactions using Framer Motion and GSAP animations",
          "Accessibility compliance (WCAG 2.1 AA) for contrast and screen readers",
          "Frictionless checkout and multi-step lead capture workflows",
        ],
      },
      {
        title: "Headless CMS & Dynamic Content Architecture",
        tagline: "Empowering your marketing team without breaking production code.",
        description:
          "We decouple the content management layer from the frontend. Your marketing team can create blogs, landing pages, and case studies effortlessly via modern headless CMS solutions like Strapi, Sanity, or custom admin dashboards.",
        deliverables: [
          "Custom Headless CMS integration (Sanity, Strapi, Contentful, or MySQL Admin)",
          "Live real-time visual preview workflows for non-technical editors",
          "Programmatic schema generation for dynamic blog and service landing pages",
          "Role-based access control (RBAC) and draft approval workflows",
          "Automated on-demand cache revalidation when content updates",
        ],
      },
      {
        title: "Sub-Second Core Web Vitals Optimization",
        tagline: "Achieving green 100/100 Lighthouse scores that Google algorithms love.",
        description:
          "Page speed is both a direct ranking factor and the single biggest driver of bounce rate. We optimize Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) down to mathematical perfection.",
        deliverables: [
          "Zero layout shift guarantee (CLS < 0.05) through explicit dimension reservations",
          "Sub-1.2 second LCP performance on 4G cellular networks",
          "Script deferral, tree-shaking, and third-party tag optimization",
          "Edge caching, Brotli compression, and CDN HTTP/3 delivery",
          "Continuous performance budget monitoring in CI/CD pipelines",
        ],
      },
      {
        title: "API Integrations & Third-Party Architecture",
        tagline: "Connecting your web application to your enterprise software stack.",
        description:
          "A website must communicate seamlessly with your CRM, payment gateways, ERP, and automation tools. We write robust REST and GraphQL API routes with strict input validation and webhook listeners.",
        deliverables: [
          "Payment gateway integration (Razorpay, Stripe, Cashfree, PayPal)",
          "CRM two-way synchronization (HubSpot, Salesforce, Zoho, LeadSquared)",
          "WhatsApp Business API & automated transactional email delivery (Resend/SendGrid)",
          "Custom database modeling with MySQL, PostgreSQL, and Prisma ORM",
          "Secure webhook handlers with signature verification and retry logic",
        ],
      },
      {
        title: "Enterprise Security & Compliance Hardening",
        tagline: "Bank-grade digital protection for client data and transactions.",
        description:
          "We protect your digital assets against SQL injection, Cross-Site Scripting (XSS), DDoS attacks, and unauthorized access with modern DevSecOps standards.",
        deliverables: [
          "SSL/TLS A+ security rating and automated certificate renewals",
          "Content Security Policy (CSP), HSTS, and secure HTTP header hardening",
          "Bcrypt password hashing and JWT/session token authentication",
          "DDoS mitigation and web application firewall (WAF) via Cloudflare Enterprise",
          "DPDP Act (India) and GDPR cookie consent & privacy compliance",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage Web Engineering Lifecycle",
    frameworkSubtitle:
      "From technical scoping to zero-downtime production deployment in 4 to 8 weeks.",
    frameworkSteps: [
      {
        step: "01",
        title: "Architecture & UX Discovery",
        duration: "Week 1",
        summary: "Defining technical specifications, user personas, and conversion paths.",
        details: [
          "Technical requirement scoping, tech stack selection, and database schema design",
          "Information architecture (IA) mapping and URL hierarchy definition",
          "Low-fidelity wireframing of core conversion pages",
          "SEO URL migration mapping to preserve existing Google rankings",
        ],
      },
      {
        step: "02",
        title: "High-Fidelity UI/UX Design & Prototyping",
        duration: "Weeks 2–3",
        summary: "Crafting modern, bespoke visual designs in Figma for review and sign-off.",
        details: [
          "Interactive Figma prototype with custom typography and color schemes",
          "Desktop, tablet, and mobile responsive design iterations",
          "Micro-animation and interaction design specifications",
          "Client review milestone and final design approval",
        ],
      },
      {
        step: "03",
        title: "Full-Stack Code Engineering",
        duration: "Weeks 4–6",
        summary: "Writing clean, modular Next.js and TypeScript code in an active Git environment.",
        details: [
          "Component development using Next.js App Router and Tailwind CSS",
          "Database implementation, ORM queries, and backend API route construction",
          "CMS integration and dynamic content block binding",
          "Real-time staging deployment URL provided for client progress tracking",
        ],
      },
      {
        step: "04",
        title: "QA, Speed Optimization & Security Testing",
        duration: "Week 7",
        summary: "Rigorously testing speed, cross-browser compatibility, and form integrations.",
        details: [
          "Cross-browser and cross-device testing across iOS, Android, macOS, and Windows",
          "Core Web Vitals tuning to guarantee 90+ Lighthouse scores",
          "End-to-end form fill, payment gateway, and CRM lead routing tests",
          "Full SEO checklist validation (meta tags, sitemaps, robots.txt, canonicals)",
        ],
      },
      {
        step: "05",
        title: "Production Launch & Zero-Downtime Migration",
        duration: "Week 8",
        summary: "Seamless domain DNS switch with ongoing monitoring and team training.",
        details: [
          "Zero-downtime DNS cutover with SSL certificate installation",
          "Server 301 redirect map verification to prevent 404 crawl errors",
          "Search Console sitemap submission and real-time error logging",
          "Full source code Git repository handoff and admin training session",
        ],
      },
    ],
    techStackTitle: "Modern Full-Stack Technology Ecosystem",
    techStackSubtitle:
      "We avoid outdated, vulnerable legacy stacks in favor of high-velocity, modern engineering tools.",
    techStackCategories: [
      {
        category: "Frontend & Web Frameworks",
        tools: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GSAP"],
      },
      {
        category: "Backend, Databases & APIs",
        tools: ["Node.js", "MySQL / MariaDB", "PostgreSQL", "Prisma ORM", "REST / GraphQL", "Next.js Server Actions"],
      },
      {
        category: "Content Management & Headless",
        tools: ["Sanity.io", "Strapi Headless CMS", "Custom Next.js Admin Panel", "Markdown / MDX"],
      },
      {
        category: "DevOps, Hosting & Performance",
        tools: ["Vercel Enterprise", "Cloudflare Edge", "Docker", "AWS Lightsail / S3", "GitHub Actions CI/CD"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Traditional Web Agencies",
    comparisonSubtitle:
      "Why high-performance custom engineering outperforms bloated off-the-shelf themes.",
    comparisonRows: [
      {
        feature: "Underlying Technology",
        ggmApproach: "Custom Next.js, React, and TypeScript engineered from scratch.",
        traditionalAgency: "Bloated ₹2,000 WordPress theme with 40+ unmaintained plugins.",
        freelancer: "Wix, Squarespace, or basic Elementor drag-and-drop templates.",
      },
      {
        feature: "Speed & Core Web Vitals",
        ggmApproach: "Sub-second load times and guaranteed 90–100 Google Lighthouse scores.",
        traditionalAgency: "Heavy 4–8 second load times riddled with CLS and layout shifts.",
        freelancer: "Zero speed optimization; fails basic mobile performance tests.",
      },
      {
        feature: "Code & Platform Ownership",
        ggmApproach: "100% full source code ownership in your private Git repository.",
        traditionalAgency: "Vendor lock-in on proprietary hosting with recurring licensing fees.",
        freelancer: "Incomplete handoff with missing credentials and unorganized assets.",
      },
      {
        feature: "SEO & Semantic Architecture",
        ggmApproach: "Baked into the code: semantic HTML5, clean URLs, and JSON-LD schema.",
        traditionalAgency: "An afterthought; installs a generic SEO plugin and leaves tags empty.",
        freelancer: "Zero technical SEO understanding or schema knowledge.",
      },
    ],
    industriesTitle: "Web Engineering Solutions for Critical Industries",
    industriesSubtitle:
      "Bespoke digital architecture tailored to unique enterprise business logic.",
    industries: [
      {
        industry: "E-Commerce & D2C Marketplaces",
        challenge: "Handling heavy concurrent festive traffic without checkout slowdowns or cart drop-offs.",
        solution: "Sub-second headless Next.js frontend with cached edge delivery and one-click checkout.",
        impact: "Zero downtime during peak flash sale traffic with a 38% increase in mobile checkout completions.",
      },
      {
        industry: "B2B SaaS & Enterprise Tech",
        challenge: "Communicating complex technical software features while capturing enterprise demo requests.",
        solution: "Interactive product demo modals, dark-mode technical UI, and direct HubSpot CRM syncing.",
        impact: "Increased demo request conversion rate from 1.4% to 4.2% within 90 days.",
      },
      {
        industry: "Luxury Architecture & Real Estate",
        challenge: "Displaying ultra-high-resolution portfolio imagery without degrading mobile loading speeds.",
        solution: "Next/Image automated AVIF compression, dynamic project filtering, and smooth GSAP transitions.",
        impact: "Reduced mobile page size by 78% while maintaining crisp 4K visual fidelity.",
      },
      {
        industry: "Corporate & Financial Services",
        challenge: "Strict compliance, SSL security standards, and high-trust corporate positioning.",
        solution: "A+ security rating, encrypted contact capture, and structured corporate governance disclosure hub.",
        impact: "Achieved full regulatory compliance and successfully secured tier-1 enterprise partnerships.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Our Web Development",
    faqsSubtitle: "Clear details regarding our tech stack, timelines, pricing, and code ownership.",
    faqs: [
      {
        question: "Do we fully own the website code and design assets after launch?",
        answer:
          "Yes, 100%. Upon final project milestone completion, we transfer the complete Git repository, production deployment configurations, database schemas, and Figma UI/UX design files directly to your company. There are zero licensing fees or proprietary agency lock-ins.",
      },
      {
        question: "How long does it take to design and engineer a custom website?",
        answer:
          "A custom corporate or marketing web application typically takes 4 to 6 weeks from initial UX wireframing to production deployment. Larger web applications featuring custom portals, e-commerce engines, or multi-language localization run 8 to 12 weeks with structured weekly sprints.",
      },
      {
        question: "Why do you recommend Next.js over traditional WordPress websites?",
        answer:
          "Traditional WordPress sites rely on heavy PHP servers, MySQL database queries for every page load, and dozens of third-party plugins that introduce security vulnerabilities and drag down page speeds. Next.js compiles pages into pre-rendered static assets and server components served via global edge CDNs, delivering sub-second load times, superior Google SEO indexing, and bank-grade security.",
      },
      {
        question: "Can our non-technical team easily update blogs and text without coding?",
        answer:
          "Yes. We integrate modern headless CMS solutions (such as Sanity, Strapi, or our custom intuitive admin panel) that allow your marketing team to edit copy, publish new blog articles, add case studies, and change banners effortlessly with real-time visual previews.",
      },
      {
        question: "Will our existing Google SEO rankings be preserved during the redesign?",
        answer:
          "Yes. Preserving organic search rankings is a core priority of our engineering process. Before touching any code, we crawl your existing site to compile an exhaustive 1-to-1 URL redirect map. All metadata, heading structures, and content depth are preserved or improved to prevent 404 errors and ranking drops.",
      },
      {
        question: "Do you provide ongoing maintenance and technical support after launch?",
        answer:
          "Yes. We offer dedicated monthly maintenance retainers covering security monitoring, server uptime surveillance, continuous Core Web Vitals checks, library updates, and prioritized developer hours for new feature rollouts.",
      },
      {
        question: "Can you integrate our existing CRM, ERP, and payment gateways?",
        answer:
          "Yes. We write custom API integrations for leading payment processors (Razorpay, Stripe, Cashfree), enterprise CRMs (HubSpot, Zoho, Salesforce), and ERP/shipping systems (Shiprocket, SAP, Unicommerce) with automated webhook error logging.",
      },
    ],
    metaTitle: "Web Development Company in Delhi | GGM Technologies",
    metaDescription:
      "Premier web development company in Delhi engineering custom Next.js, React, and TypeScript web applications with sub-second speeds and 100/100 Core Web Vitals.",
    focusKeywords: ["website development company Delhi", "web design agency Delhi", "Next.js development company", "custom web engineering", "e-commerce web development"],
  },

  "lead-generation": {
    slug: "lead-generation",
    badge: "B2B PIPELINE & DEMAND ENGINE",
    heroH1: "B2B & High-Ticket Lead Generation Agency in Delhi",
    heroSubtitle:
      "We replace random outreach with predictable pipeline infrastructure. Fill your sales calendar with verified decision-makers using multi-channel intent funnels, LinkedIn ABM, and automated qualification.",
    overviewParagraphs: [
      "Generating business leads is easy; generating qualified, high-ticket prospects who actually have the budget and authority to buy is the real challenge. Relying on purchased spam lists, cold mass-email blasts, or generic contact forms wastes your sales team's valuable time on unqualified tire-kickers.",
      "GGM Technologies engineers predictable B2B demand generation infrastructure. Based in Delhi and partnering with high-growth enterprises worldwide, our lead generation systems combine high-intent search ads, LinkedIn Account-Based Marketing (ABM), verified data enrichment, and real-time CRM qualification to deliver high-converting sales conversations directly onto your team's calendar.",
    ],
    metrics: [
      { value: "340+", label: "Verified Pipeline Opportunities", subtext: "Generated monthly across our active B2B enterprise partners" },
      { value: "82.4%", label: "Lead Qualification Rate", subtext: "Inquiries matching strict pre-defined Ideal Customer Profile criteria" },
      { value: "< ₹450", label: "Average High-Ticket CPL", subtext: "Achieved across competitive B2B and luxury service categories" },
      { value: "< 2 Mins", label: "Instant Lead Routing Speed", subtext: "Automated WhatsApp and CRM alerts for incoming qualified prospects" },
    ],
    pillarsTitle: "Multi-Channel Lead Generation Capabilities",
    pillarsSubtitle:
      "A complete pipeline ecosystem designed to attract, qualify, and route high-value prospects.",
    pillars: [
      {
        title: "Account-Based Marketing (ABM) & LinkedIn Outreach",
        tagline: "Pinpoint targeting of specific decision-makers and target accounts.",
        description:
          "We identify and engage key decision-makers (Founders, CMOs, CTOs, Procurement Heads) across your target account list using personalized LinkedIn InMail, conversation ads, and account-matched display campaigns.",
        deliverables: [
          "Target account list (TAL) building and Ideal Customer Profile (ICP) definition",
          "Decision-maker data verification via LinkedIn Sales Navigator and Apollo",
          "High-conversion personalized messaging sequences that start conversations",
          "LinkedIn Thought Leader Ads amplifying your executive leadership profile",
          "Direct calendar integration for instant meeting bookings",
        ],
      },
      {
        title: "Multi-Step Interactive Qualification Funnels",
        tagline: "Filtering out tire-kickers before they ever reach your sales team.",
        description:
          "Static contact forms fail to collect intent. We design interactive, conditional logic questionnaires that ask strategic qualification questions (budget, project timeline, company size) and automatically filter out spam.",
        deliverables: [
          "Dynamic conditional-logic forms that adapt based on user answers",
          "OTP mobile phone number and corporate email domain verification",
          "Real-time lead scoring assigning priority points to high-budget buyers",
          "Automated instant redirect to Calendly / HubSpot meeting schedulers",
          "Frictionless UI optimized for high completion rates on mobile devices",
        ],
      },
      {
        title: "High-Intent Search & Paid Social Capture",
        tagline: "Intercepting buyers at the exact moment they search for your solution.",
        description:
          "We deploy hyper-targeted Google Search Ads and Meta Ads targeting commercial-intent search queries. Prospects searching for specific solutions are directed to dedicated, conversion-engineered landing pages.",
        deliverables: [
          "Commercial intent keyword harvesting with negative keyword barriers",
          "Custom direct-response landing pages tailored to specific search terms",
          "Meta Lead Generation ads with pre-filled verified form inputs",
          "A/B testing of value propositions, lead magnets, and case study proofs",
          "Server-side Conversions API integration for real-time attribution",
        ],
      },
      {
        title: "Real-Time CRM & WhatsApp Business Automation",
        tagline: "Contacting qualified leads within 120 seconds to maximize close rates.",
        description:
          "Studies show that responding to a lead within 5 minutes increases conversion odds by 900%. We engineer instant automated WhatsApp notifications, SMS confirmations, and CRM lead creation the moment a form is submitted.",
        deliverables: [
          "Instant webhook syncing into HubSpot, Salesforce, Zoho, or LeadSquared",
          "Official WhatsApp Business API integration sending automated personalized welcome messages",
          "Real-time SMS and email push alerts sent directly to your sales reps",
          "Automated lead assignment based on territory or rep availability",
          "Zapier / Make enterprise automation architecture with zero dropped data",
        ],
      },
      {
        title: "Cold Email Infrastructure & Domain Warmup",
        tagline: "Outbound email campaigns that land in the primary inbox, never spam.",
        description:
          "We configure dedicated secondary domains, implement SPF, DKIM, DMARC, and custom tracking domains, and run algorithmic warmup protocols so that your outbound outreach reaches corporate decision-makers safely.",
        deliverables: [
          "Secondary sending domain setup with strict SPF, DKIM, and DMARC records",
          "Algorithmic email warmup protecting your primary domain's reputation",
          "B2B prospect list cleaning to ensure bounce rates remain below 2%",
          "Non-salesy, problem-first email copy designed for high reply rates",
          "A/B subject line and call-to-action testing across target cohorts",
        ],
      },
      {
        title: "Pipeline Analytics & Closed-Loop Attribution",
        tagline: "Connecting every rupee of lead gen cost to closed contract value.",
        description:
          "We track leads past the initial form fill. Our closed-loop reporting connects CRM sales stages (Discovery, Proposal, Closed-Won) back to the specific marketing campaign, keyword, and creative that generated the deal.",
        deliverables: [
          "Closed-loop revenue attribution connecting marketing spend to closed sales",
          "Customer Acquisition Cost (CAC) and Lifetime Value (LTV) dashboarding",
          "Sales pipeline velocity and conversion bottleneck analysis",
          "Lead source ROI comparison to eliminate underperforming marketing channels",
          "Bi-weekly strategic reviews aligning marketing leads with sales feedback",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage Lead Generation System",
    frameworkSubtitle:
      "A battle-tested methodology for building a scalable B2B client acquisition engine.",
    frameworkSteps: [
      {
        step: "01",
        title: "ICP Architecture & Offer Engineering",
        duration: "Week 1",
        summary: "Defining exactly who you want to close and why they cannot refuse your offer.",
        details: [
          "Deep-dive interviews defining your Ideal Customer Profile (ICP)",
          "Formulating compelling lead magnet offers (audits, calculators, proprietary data)",
          "Competitor positioning and outbound pitch analysis",
          "Setting strict qualification criteria with your sales leadership",
        ],
      },
      {
        step: "02",
        title: "Funnel Build & Technical Infrastructure",
        duration: "Week 2",
        summary: "Building landing pages, multi-step forms, and automated CRM connections.",
        details: [
          "Engineering high-speed Next.js conversion landing pages",
          "Setting up multi-step qualification forms with phone OTP validation",
          "Configuring CRM pipelines, WhatsApp Business API, and automated alerts",
          "Setting up secondary sending domains and email warmup protocols",
        ],
      },
      {
        step: "03",
        title: "Omnichannel Acquisition Activation",
        duration: "Weeks 3–4",
        summary: "Launching paid search, LinkedIn ABM, and targeted outbound campaigns.",
        details: [
          "Activating Google Search Ads on high-intent commercial keywords",
          "Launching LinkedIn Sponsored Content targeting verified job titles",
          "Initiating personalized outbound cold email and LinkedIn sequences",
          "Daily monitoring of lead quality and initial prospect responses",
        ],
      },
      {
        step: "04",
        title: "Real-Time Qualification & Sales Handoff",
        duration: "Weeks 5–8",
        summary: "Routing vetted, high-intent prospects directly onto sales reps' calendars.",
        details: [
          "Filtering incoming inquiries against strict qualification benchmarks",
          "Automatic scheduling of discovery calls on sales reps' calendars",
          "Weekly sales team feedback loops to adjust messaging and targeting criteria",
          "Pruning low-quality keywords and non-responsive audience segments",
        ],
      },
      {
        step: "05",
        title: "Pipeline Scaling & CAC Optimization",
        duration: "Continuous",
        summary: "Doubling down on highest-converting channels to compound monthly revenue.",
        details: [
          "Scaling media spend on campaigns delivering highest Closed-Won revenue",
          "Expanding target account lists into adjacent verticals and Tier-1 cities",
          "Continuous A/B testing of landing page headlines and qualification logic",
          "Executive monthly reporting on pipeline generated vs customer acquisition cost",
        ],
      },
    ],
    techStackTitle: "B2B Lead Generation & Automation Stack",
    techStackSubtitle:
      "Enterprise software we integrate to source, enrich, qualify, and route prospects.",
    techStackCategories: [
      {
        category: "Prospecting & B2B Data Enrichment",
        tools: ["Apollo.io", "LinkedIn Sales Navigator", "ZoomInfo", "Lusha", "Clearbit"],
      },
      {
        category: "CRM & Pipeline Management",
        tools: ["HubSpot CRM", "Zoho CRM", "Salesforce", "LeadSquared", "Pipedrive"],
      },
      {
        category: "Outreach & Email Infrastructure",
        tools: ["Instantly.ai", "Smartlead.ai", "Lemlist", "Google Workspace", "SendGrid"],
      },
      {
        category: "Automation, Messaging & Forms",
        tools: ["WhatsApp Business API", "Zapier Enterprise", "Make.com", "Typeform", "Calendly"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Typical Lead Gen Agencies",
    comparisonSubtitle:
      "Why our verified pipeline model delivers genuine sales opportunities, not just empty contacts.",
    comparisonRows: [
      {
        feature: "Lead Quality Definition",
        ggmApproach: "Pre-vetted against strict budget, title, and timeline criteria before handoff.",
        traditionalAgency: "Counts every casual form submit or spam submission as a 'lead'.",
        freelancer: "Scraped bulk email lists with high bounce rates and zero buying intent.",
      },
      {
        feature: "Response Time & Automation",
        ggmApproach: "Automated instant WhatsApp & CRM routing within 2 minutes of submission.",
        traditionalAgency: "Emails sent to a shared inbox; leads sit untouched for 24–48 hours.",
        freelancer: "Manual weekly spreadsheet export sent every Friday.",
      },
      {
        feature: "Sales Calendar Integration",
        ggmApproach: "Pre-qualified meetings booked directly onto your sales reps' calendars.",
        traditionalAgency: "Hands over a list of names and forces your team to chase them down.",
        freelancer: "Zero calendar booking or sales enablement support.",
      },
      {
        feature: "Revenue Accountability",
        ggmApproach: "We measure success by pipeline value, qualified meetings, and closed deals.",
        traditionalAgency: "Hides behind vanity metrics: impressions, clicks, and gross lead volume.",
        freelancer: "Charges per raw contact name with no accountability for conversion.",
      },
    ],
    industriesTitle: "Lead Generation Engines Tailored for High-Ticket B2B",
    industriesSubtitle:
      "How we customize pipeline acquisition systems for complex sales environments.",
    industries: [
      {
        industry: "Luxury Interior Architecture & Turnkey Construction",
        challenge: "Massive influx of low-budget apartment inquiries wasting senior architects' time.",
        solution: "Multi-step villa/commercial square footage qualification filter with budget pre-requisites.",
        impact: "Generated 340+ verified luxury villa leads with sub-₹450 average cost per qualified inquiry.",
      },
      {
        industry: "Enterprise B2B SaaS & Cloud Platforms",
        challenge: "Targeting CIOs and IT directors across Mid-Market and Enterprise companies.",
        solution: "Account-Based Marketing on LinkedIn paired with high-intent software comparison landing pages.",
        impact: "Booked 85 qualified demo calls resulting in ₹3.2Cr in new annual contract value (ACV).",
      },
      {
        industry: "Corporate Legal & Financial Advisory",
        challenge: "Building trust with CXOs requiring discreet, high-value corporate restructuring counsel.",
        solution: "Thought leadership LinkedIn ad distribution paired with direct confidential consultation booking.",
        impact: "Secured 28 enterprise retainer accounts with average contract size over ₹12L/year.",
      },
      {
        industry: "Commercial Solar & Industrial Equipment",
        challenge: "High ticket sizes (₹50L–₹5Cr) requiring factory owner and CFO buy-in.",
        solution: "Payback ROI calculator landing page with mandatory factory electricity bill upload.",
        impact: "Generated 140+ high-capacity commercial rooftop solar inquiries in 6 months.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Lead Generation",
    faqsSubtitle: "Clear answers on lead definitions, CRM compatibility, and conversion timelines.",
    faqs: [
      {
        question: "What actually defines a 'qualified' lead in your reporting?",
        answer:
          "We establish precise qualification criteria with your executive sales team before launching campaigns. A qualified lead is not just a name and phone number; it is a verified prospect who meets your required industry vertical, minimum company size, decision-making title, and project budget threshold, confirmed via interactive qualification steps.",
      },
      {
        question: "Do you provide replacement for invalid or unresponsive leads?",
        answer:
          "Yes. In our performance engagements, any lead with an invalid phone number, unreachable email, or out-of-scope profile is automatically credited and replaced in our weekly reconciliation reports.",
      },
      {
        question: "Can your lead generation system connect to our existing CRM?",
        answer:
          "Yes. We connect seamlessly with all major enterprise CRMs including HubSpot, Zoho, Salesforce, LeadSquared, and Pipedrive. Leads are enriched and created in your pipeline within seconds of submission, complete with source attribution and answers to all qualification questions.",
      },
      {
        question: "How long does it take to start receiving qualified sales meetings?",
        answer:
          "Our onboarding, ICP definition, and funnel engineering take 10 to 14 days. Once traffic and outbound sequences are activated in week 3, initial qualified inquiries and booked meetings typically begin hitting your team's calendar within 72 hours of campaign launch.",
      },
      {
        question: "Do you handle cold email and LinkedIn outreach directly?",
        answer:
          "Yes. Our team writes the personalized copy, configures and warms up secondary sending domains, cleans prospect lists, and manages the outbound sequence sending. Interested replies are instantly qualified and routed to your sales reps for the discovery call.",
      },
      {
        question: "How do you protect our primary domain reputation during outbound campaigns?",
        answer:
          "We never run outbound cold email campaigns from your primary corporate email domain. We purchase and configure dedicated secondary domains with strict SPF, DKIM, and DMARC authentication and run algorithmic warmups for 14–21 days to ensure your primary domain remains 100% pristine.",
      },
      {
        question: "What is the expected Cost Per Lead (CPL) for our industry?",
        answer:
          "CPL varies by ticket size and target persona. For local high-ticket consumer services (luxury interiors, real estate), qualified CPL generally ranges from ₹350 to ₹900. For enterprise B2B SaaS and corporate advisory targeting CXOs, cost per qualified sales meeting typically falls between ₹3,500 and ₹12,000, representing massive ROI against enterprise contract values.",
      },
    ],
    metaTitle: "B2B Lead Generation Agency in Delhi | GGM Technologies",
    metaDescription:
      "Enterprise B2B lead generation agency in Delhi. Fill your sales calendar with verified decision-makers using multi-channel intent funnels, LinkedIn ABM, and automated qualification.",
    focusKeywords: ["B2B lead generation agency Delhi", "lead generation company India", "high ticket lead generation", "sales pipeline agency", "LinkedIn lead generation"],
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    badge: "CREATIVE STRATEGY & SOCIAL ROI",
    heroH1: "Social Media Marketing & Brand Authority Agency in Delhi",
    heroSubtitle:
      "We turn social media from a vanity exercise into a measurable brand equity and customer acquisition channel. High-fidelity visual production, viral short-form video, and paid amplification.",
    overviewParagraphs: [
      "Posting generic graphic templates with stock photos and random hashtags does not build a brand in 2026. With organic reach throttled across major platforms, winning on social media requires an uncompromising combination of high-concept visual storytelling, short-form video mastery (Reels & Shorts), and strategic paid amplification.",
      "At GGM Technologies, our South Delhi creative studio acts as an extension of your marketing department. We handle creative concepting, studio video production, copywriting, community engagement, and paid social scaling across Instagram, LinkedIn, YouTube, and Facebook to build unshakeable brand authority and drive direct consumer action.",
    ],
    metrics: [
      { value: "4.2M+", label: "Monthly Organic Impressions", subtext: "Generated across active client social channels" },
      { value: "+280%", label: "Average Engagement Lift", subtext: "Achieved within 90 days of short-form video implementation" },
      { value: "100%", label: "Original Content Production", subtext: "Zero stock imagery; custom studio photography and video" },
      { value: "3.6x", label: "Paid Social ROAS", subtext: "Generated through precision retargeting and creative testing" },
    ],
    pillarsTitle: "Full-Service Social Media Capabilities",
    pillarsSubtitle:
      "From high-production creative studio shoots to data-backed paid social performance.",
    pillars: [
      {
        title: "Short-Form Video Production (Reels, Shorts & TikTok)",
        tagline: "Dominating modern social algorithms with thumb-stopping video content.",
        description:
          "Short-form video is the #1 driver of organic reach. Our creative team scripts, shoots, and edits high-tempo vertical video content featuring dynamic typography, engaging hooks, and crisp sound design optimized for algorithmic virality.",
        deliverables: [
          "Concept ideation, scriptwriting, and hook development",
          "On-site and studio video production with 4K cinema cameras and lighting",
          "High-tempo editing with motion graphics, captions, and trending audio",
          "Platform-specific aspect ratio optimization (9:16 vertical video)",
          "Performance analysis tracking 3-second hook retention and completion rates",
        ],
      },
      {
        title: "Brand Narrative & Monthly Editorial Calendars",
        tagline: "Consistent, authoritative posting that builds enduring market trust.",
        description:
          "We develop cohesive content pillars that position your company as the category leader. Every post reinforces your brand guidelines, addresses customer pain points, and moves followers closer to becoming paying clients.",
        deliverables: [
          "Strategic content pillar definition aligned with business objectives",
          "Monthly visual editorial calendars delivered 10 days before publication",
          "Thought leadership carousels and industry educational infographics",
          "Compelling long-form copywriting that sparks meaningful discussions",
          "Cohesive Instagram grid aesthetic and branding typography consistency",
        ],
      },
      {
        title: "B2B LinkedIn Thought Leadership & Founder Branding",
        tagline: "Transforming company executives into respected industry voices.",
        description:
          "People connect with people, not logos. We ghostwrite authentic, data-rich thought leadership content for your founders and executive leadership team to attract enterprise clients, investors, and tier-one talent.",
        deliverables: [
          "Executive profile audit and headline/banner optimization",
          "Weekly thought leadership posts covering industry insights and company milestones",
          "Document carousels breaking down proprietary frameworks and case studies",
          "Targeted engagement strategy with key industry commentators and prospects",
          "Amplification via LinkedIn Thought Leader Ads targeting specific accounts",
        ],
      },
      {
        title: "Paid Social Amplification & Retargeting Funnels",
        tagline: "Putting high-performing creative in front of your ideal buyers.",
        description:
          "We do not leave reach to algorithmic chance. We back your best organic content with targeted paid media budgets, creating multi-stage retargeting funnels that turn casual viewers into qualified inquiries.",
        deliverables: [
          "Audience segmentation based on page engagement and video watch percentages",
          "Dynamic retargeting sequences delivering customer testimonials and case studies",
          "A/B creative testing of hooks, thumbnails, and headline overlays",
          "Lead generation ads capturing in-app inquiries with auto-filled forms",
          "Monthly ad spend reconciliation and Cost Per Engagement reporting",
        ],
      },
      {
        title: "Active Community & Reputation Management",
        tagline: "Nurturing genuine conversations and defending brand reputation in real time.",
        description:
          "Social media is a two-way dialogue. Our community managers actively monitor comments, direct messages, and brand mentions to answer inquiries, handle customer support queries, and spark positive discussions.",
        deliverables: [
          "Daily comment monitoring and proactive response within business hours",
          "Direct Message (DM) triage and routing of sales leads to your team",
          "Crisis management protocols addressing negative reviews constructively",
          "Proactive engagement on target influencer and industry partner posts",
          "Sentiment analysis reporting tracking positive vs negative brand perception",
        ],
      },
      {
        title: "Influencer Collaboration & Creator Seeding",
        tagline: "Leveraging trusted voices to validate your products and services.",
        description:
          "We identify, negotiate with, and manage niche-relevant creators and industry micro-influencers whose audiences mirror your target demographic, ensuring authentic brand endorsements with measurable ROI.",
        deliverables: [
          "Influencer vetting analyzing follower authenticity, fake followers, and engagement rates",
          "Contract negotiation, deliverable scoping, and usage rights management",
          "Creative brief development ensuring brand message accuracy",
          "UTM link and discount code tracking measuring direct influencer revenue",
          "Whitelisting high-performing influencer content for paid ad campaigns",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage Social Media Growth Engine",
    frameworkSubtitle:
      "A systematic process transforming your social presence from static updates to an active acquisition engine.",
    frameworkSteps: [
      {
        step: "01",
        title: "Brand Voice Audit & Competitor Deconstruction",
        duration: "Week 1",
        summary: "Analyzing your visual aesthetic, competitor gaps, and core audience desires.",
        details: [
          "Comprehensive audit of current social metrics, engagement rates, and top posts",
          "Competitor creative tear-down identifying underserved content formats",
          "Defining brand voice, visual style guide, and visual tone of voice",
          "Establishing target audience personas across Instagram, LinkedIn, and YouTube",
        ],
      },
      {
        step: "02",
        title: "Creative Concepting & Content Production",
        duration: "Weeks 2–3",
        summary: "Batch-producing high-fidelity video, carousels, and visual assets.",
        details: [
          "Drafting first 30-day editorial calendar with script outlines",
          "On-site studio video shoot capturing short-form Reels and thought leadership",
          "Graphic design production for infographics, carousels, and story templates",
          "Final client review and approval via collaborative preview dashboard",
        ],
      },
      {
        step: "03",
        title: "Scheduling, Community Launch & Engagement",
        duration: "Week 4",
        summary: "Publishing at peak engagement windows with real-time interaction.",
        details: [
          "Automated cross-platform scheduling timed to peak follower activity",
          "Real-time comment monitoring and active conversation sparking",
          "Stories publishing keeping the brand top-of-mind daily",
          "Testing initial hook variations to identify viral video topics",
        ],
      },
      {
        step: "04",
        title: "Paid Amplification & Retargeting Activation",
        duration: "Month 2",
        summary: "Scaling organic winners through targeted paid social spend.",
        details: [
          "Allocating ad spend to organic posts exhibiting top-decile engagement",
          "Setting up retargeting funnels capturing viewers who watched 50%+ of videos",
          "Launching Lead Gen ads targeting high-intent engaged followers",
          "Reviewing weekly CPA and Cost Per Follower metrics",
        ],
      },
      {
        step: "05",
        title: "Performance Analytics & Creative Iteration",
        duration: "Continuous",
        summary: "Refining creative direction based on mathematical engagement data.",
        details: [
          "Detailed monthly reporting analyzing reach, shares, saves, and website visits",
          "Double down on highest-converting content formats and themes",
          "Quarterly studio production shoots updating visual creative assets",
          "Direct attribution linking social engagement to inbound website revenue",
        ],
      },
    ],
    techStackTitle: "Social Media Production & Analytics Stack",
    techStackSubtitle:
      "Professional software our designers, videographers, and strategists use daily.",
    techStackCategories: [
      {
        category: "Creative Production & Video Editing",
        tools: ["Adobe Premiere Pro", "After Effects", "Photoshop & Illustrator", "CapCut Pro", "Figma Design"],
      },
      {
        category: "Publishing, Scheduling & Collaboration",
        tools: ["Meta Business Suite", "Sprout Social", "Buffer", "Later", "Notion Content Hub"],
      },
      {
        category: "Analytics, Telemetry & Listening",
        tools: ["Hootsuite Analytics", "Brand24 Social Listening", "Google Analytics 4", "Meta Insights", "LinkedIn Analytics"],
      },
      {
        category: "Influencer Vetting & Whitelisting",
        tools: ["Modash", "HypeAuditor", "Meta Brand Collabs Manager", "Upfluence"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Typical Social Media Agencies",
    comparisonSubtitle:
      "Why brands switch from lazy template posters to our revenue-focused creative studio.",
    comparisonRows: [
      {
        feature: "Content Originality",
        ggmApproach: "100% custom short-form video, studio shoots, and bespoke graphic design.",
        traditionalAgency: "Generic Canva templates filled with overused stock photography.",
        freelancer: "Basic image posts copied from competitors with generic captions.",
      },
      {
        feature: "Video Mastery",
        ggmApproach: "High-tempo cinematic Reels & Shorts with custom motion graphics and hooks.",
        traditionalAgency: "Static image carousels with zero video production capability.",
        freelancer: "Unedited phone clips with poor lighting and zero sound design.",
      },
      {
        feature: "Paid Amplification",
        ggmApproach: "Strategic paid social retargeting turning organic reach into paying customers.",
        traditionalAgency: "Clicks the 'Boost Post' button with zero custom audience strategy.",
        freelancer: "Organic only; zero understanding of paid ads or pixel tracking.",
      },
      {
        feature: "Executive Thought Leadership",
        ggmApproach: "High-level ghostwriting and carousel creation for founders on LinkedIn.",
        traditionalAgency: "Ignores LinkedIn or posts generic corporate press releases.",
        freelancer: "Does not possess the business acumen to write for senior executives.",
      },
    ],
    industriesTitle: "Social Media Strategies Built for Specific Verticals",
    industriesSubtitle:
      "Custom storytelling adapted to the visual culture of your industry.",
    industries: [
      {
        industry: "D2C Fashion, Beauty & Lifestyle",
        challenge: "High competition and rapid creative fatigue on Instagram and YouTube.",
        solution: "High-tempo UGC video reviews, influencer styling showcases, and shoppable Instagram catalogs.",
        impact: "Grew organic follower base by 140k while driving a 3.8x ROAS on retargeting ads.",
      },
      {
        industry: "Luxury Architecture & Real Estate",
        challenge: "Conveying exquisite craftsmanship and prestige without appearing commercial.",
        solution: "Cinematic 4K drone property walkthroughs, architect interview Reels, and behind-the-scenes build videos.",
        impact: "Generated 2.4M organic video views and 45 direct high-ticket villa buyer inquiries.",
      },
      {
        industry: "B2B Tech & Professional Advisory",
        challenge: "Making complex software or legal advisory engaging on social channels.",
        solution: "Insight-dense LinkedIn carousels, founder video commentary on industry trends, and employee spotlights.",
        impact: "Positioned CEO as top 1% industry voice with 35k+ executive followers.",
      },
      {
        industry: "Hospitality, Fine Dining & Lifestyle Venues",
        challenge: "Driving foot traffic and table reservations in competitive metro hubs.",
        solution: "Sensory food Reels, cocktail masterclass shorts, and local foodie influencer tasting events.",
        impact: "Increased weekend dinner reservations by 65% within 60 days of campaign launch.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Social Media Marketing",
    faqsSubtitle: "Practical answers about video production, platform focus, and return on investment.",
    faqs: [
      {
        question: "Who is responsible for creating the video content and visuals — your team or ours?",
        answer:
          "We handle the entire creative lifecycle. Our team writes the video scripts, arranges studio and on-site production shoots, directs the filming, records voiceovers, and conducts professional editing with motion graphics and captions. If your in-house team already has raw footage, we can edit and polish that as well.",
      },
      {
        question: "Which social media platforms should my business prioritize?",
        answer:
          "We don't recommend being everywhere at once; we prioritize platforms where your actual buyers spend time. For D2C, lifestyle, and visual services (architecture, food, fashion), Instagram and YouTube Shorts take priority. For B2B companies, SaaS, and professional services, LinkedIn and YouTube dominate.",
      },
      {
        question: "How do you measure the ROI of social media marketing beyond likes and followers?",
        answer:
          "Likes and follower counts are vanity metrics. We measure social media success by tracking website click-throughs via UTM parameters, assisted conversions in GA4, direct message inquiries, lead form fills, and revenue generated from retargeting campaigns.",
      },
      {
        question: "How often will you post content on our social accounts?",
        answer:
          "Quality consistently outperforms quantity. Depending on your chosen retainer package, we typically publish 3 to 5 high-production short-form Reels/videos per week, 2 to 3 educational carousels, and daily interactive Instagram Stories to maintain constant top-of-mind brand recall.",
      },
      {
        question: "Do you include paid advertising in your social media management retainer?",
        answer:
          "Yes. We integrate organic content creation with paid social amplification. We take your top-performing organic posts and deploy targeted retargeting campaigns to capture high-intent users who visited your website or engaged with your videos.",
      },
      {
        question: "How do you handle negative comments or brand crisis situations?",
        answer:
          "We establish clear crisis response protocols during onboarding. Minor customer service queries are addressed professionally within hours based on pre-approved FAQs. Sensitive or critical complaints are immediately escalated to your designated management contact with recommended response copy.",
      },
      {
        question: "Can you manage personal branding for our Founder / CEO on LinkedIn?",
        answer:
          "Yes. Executive founder branding is one of our core specialties. We conduct bi-weekly executive interviews to extract your authentic insights, philosophy, and war stories, translating them into high-engagement LinkedIn posts, carousels, and articles that establish you as an industry authority.",
      },
    ],
    metaTitle: "Social Media Marketing Agency in Delhi | GGM Technologies",
    metaDescription:
      "Premier social media marketing agency in Delhi. Drive real business growth with cinematic short-form video production, LinkedIn thought leadership, and paid social retargeting.",
    focusKeywords: ["social media marketing agency Delhi", "SMM company Delhi", "Instagram marketing agency", "LinkedIn growth agency", "video content production"],
  },

  "shopify-wordpress": {
    slug: "shopify-wordpress",
    badge: "E-COMMERCE & CMS PLATFORM ENGINEERING",
    heroH1: "Shopify & WordPress Development Company in Delhi",
    heroSubtitle:
      "We engineer custom Shopify storefronts and scalable WordPress platforms built to be owned, not rented. Ultra-fast speeds, bespoke Liquid & PHP themes, and seamless third-party app integrations.",
    overviewParagraphs: [
      "Your e-commerce storefront or corporate CMS is the backbone of your digital operation. Too many businesses fall victim to bloated commercial themes, dozens of conflicting plugins, and rigid proprietary platforms that crash during flash sales or trap you in expensive agency maintenance contracts.",
      "GGM Technologies builds clean, maintainable, and high-converting Shopify and WordPress websites. Based in Delhi, our engineering team crafts custom Shopify Liquid themes, headless Shopify storefronts, and tailored WordPress/WooCommerce platforms with sub-second speeds, frictionless checkout, and complete code handoff.",
    ],
    metrics: [
      { value: "< 1.5s", label: "Shopify Speed Score Index", subtext: "Optimized Liquid theme loading 3x faster than industry average" },
      { value: "+32%", label: "Average Checkout Completion Lift", subtext: "Achieved via custom one-page checkout and frictionless UX" },
      { value: "0", label: "Bloated Page Builder Plugins", subtext: "Engineered on clean native Liquid, Gutenberg, or Tailwind code" },
      { value: "100%", label: "Zero-Downtime Data Migrations", subtext: "Flawless catalog, customer, and 301 SEO redirect preservation" },
    ],
    pillarsTitle: "Shopify & WordPress Development Capabilities",
    pillarsSubtitle:
      "Enterprise e-commerce and CMS solutions built for high conversion velocity and effortless maintenance.",
    pillars: [
      {
        title: "Custom Shopify Liquid & Theme Development",
        tagline: "Bespoke Shopify themes with zero bloat and lightning-fast checkout.",
        description:
          "We reject generic multi-purpose Shopify themes packed with unused JavaScript. Our engineers develop custom Shopify themes from scratch using native Liquid, modern CSS, and Alpine.js for instantaneous mobile browsing.",
        deliverables: [
          "Bespoke Shopify theme engineered to your exact Figma brand designs",
          "Custom product page layouts with variant selectors, bundles, and sticky add-to-cart",
          "Mobile-first collection page filtering with AJAX dynamic loading",
          "Shopify Online Store 2.0 (OS 2.0) modular sections for effortless marketing edits",
          "High-speed optimization passing Shopify Speed Index benchmarks with 85+ score",
        ],
      },
      {
        title: "WordPress & WooCommerce Custom Engineering",
        tagline: "High-performance content and commerce platforms tailored to your workflow.",
        description:
          "We build modern WordPress websites utilizing clean custom PHP, native Gutenberg block development, and headless architectures. No sluggish page builders, no security vulnerabilities, and no plugin conflicts.",
        deliverables: [
          "Custom Gutenberg block creation tailored to your company design system",
          "Custom WooCommerce store architecture for physical and digital goods",
          "Advanced Custom Fields (ACF Pro) modeling for structured content management",
          "Object caching (Redis) and database indexing for sub-second query speeds",
          "Hardened WordPress security protocols blocking brute-force and SQL attacks",
        ],
      },
      {
        title: "Frictionless Checkout & Conversion Rate Optimization (CRO)",
        tagline: "Removing friction where it matters most: the final purchase step.",
        description:
          "Cart abandonment silently destroys advertising profitability. We engineer one-page checkout flows, express payment gateways (UPI, Apple Pay, Google Pay), upsell/cross-sell triggers, and automated abandoned cart recovery workflows.",
        deliverables: [
          "Shopify Plus checkout customization with trust badges and progress meters",
          "Express UPI & one-click checkout integration (Razorpay Magic, GoKwik, Stripe)",
          "In-cart dynamic upsells, progress-to-free-shipping bars, and warranty add-ons",
          "Multi-currency, international tax, and automated duties calculation",
          "Automated WhatsApp and SMS abandoned cart recovery sequences",
        ],
      },
      {
        title: "Zero-Data-Loss Platform Migration & SEO Preservation",
        tagline: "Moving platforms without losing historical orders, customers, or Google rankings.",
        description:
          "Migrating from Magento, WooCommerce, or custom platforms to Shopify requires extreme care. We handle full database migrations, customer password mapping, order history imports, and comprehensive 301 redirect architectures.",
        deliverables: [
          "Automated catalog, variant, inventory, and historical order data migration",
          "Customer account and historical purchase record synchronization",
          "Exhaustive 1-to-1 301 URL redirect map preserving all Google SEO rankings",
          "Parallel staging testing ensuring zero downtime during live cutover",
          "Post-migration Search Console indexing validation and error resolution",
        ],
      },
      {
        title: "Third-Party App, ERP & Logistics Integrations",
        tagline: "Connecting your store to your warehouse, accounting, and marketing stack.",
        description:
          "An online store cannot operate in isolation. We connect your store to leading shipping aggregators, enterprise ERPs, inventory management systems, and marketing automation platforms with custom webhook listeners.",
        deliverables: [
          "Shipping & logistics integration (Shiprocket, Delhivery, Bluedart, Pickrr)",
          "ERP and accounting synchronization (Tally, Zoho Books, SAP, Unicommerce)",
          "Klaviyo & WhatsApp automated marketing flows (welcome series, back-in-stock)",
          "Review & UGC platform integration (Judge.me, Yotpo, Loox) with Google rich snippets",
          "Custom private Shopify apps solving unique business operational requirements",
        ],
      },
      {
        title: "Speed Hardening, Security & Core Web Vitals",
        tagline: "Guaranteeing high performance under heavy holiday traffic spikes.",
        description:
          "Slow websites bleed conversions. We audit third-party script execution, lazy-load non-critical assets, configure Cloudflare Edge caching, and eliminate CSS/JS render-blocking bottlenecks.",
        deliverables: [
          "App and plugin audit: pruning unused tracker scripts and bloat",
          "Critical CSS inlining and deferred JavaScript execution",
          "Cloudflare Enterprise CDN caching with WebP image compression",
          "Automated daily off-site cloud backups and malware scanning",
          "Load testing simulating 10,000+ concurrent shoppers during sale events",
        ],
      },
    ],
    frameworkTitle: "Our 5-Stage Store Engineering Process",
    frameworkSubtitle:
      "A structured deployment process delivering an enterprise e-commerce platform in 4 to 8 weeks.",
    frameworkSteps: [
      {
        step: "01",
        title: "Catalog Architecture & UX Scoping",
        duration: "Week 1",
        summary: "Mapping product taxonomies, payment requirements, and user conversion paths.",
        details: [
          "Product catalog, variant, and collection hierarchy structure planning",
          "Payment gateway, logistics provider, and tax configuration scoping",
          "Benchmarking competitor storefronts and checkout UX flows",
          "Compiling the 301 redirect map for all existing search URLs",
        ],
      },
      {
        step: "02",
        title: "Bespoke UI/UX Design (Figma)",
        duration: "Weeks 2–3",
        summary: "Designing high-converting mobile-first product, collection, and cart layouts.",
        details: [
          "Figma design prototypes for homepage, collections, product pages, and cart drawer",
          "Mobile-first responsive design tailored for thumb-friendly shopping",
          "Micro-interactions for add-to-cart, quick view, and filter drawers",
          "Client review and formal design milestone approval",
        ],
      },
      {
        step: "03",
        title: "Liquid / PHP Theme Development",
        duration: "Weeks 4–6",
        summary: "Coding clean, modular themes in native Liquid or Gutenberg code.",
        details: [
          "Developing custom OS 2.0 sections and blocks for drag-and-drop customization",
          "Writing clean Liquid / PHP templates with zero reliance on heavy plugins",
          "Integrating AJAX cart drawers, sticky add-to-cart, and swatch selectors",
          "Live private staging store URL provided for client product upload and review",
        ],
      },
      {
        step: "04",
        title: "App Integration & End-to-End Testing",
        duration: "Week 7",
        summary: "Connecting shipping, payments, and running rigorous live transaction tests.",
        details: [
          "Configuring payment gateways (UPI, Credit Cards, Net Banking, COD)",
          "Connecting shipping APIs (automated AWB generation and label printing)",
          "Testing real ₹1 payment transactions, refunds, and order notification emails",
          "Speed optimization tuning to ensure green Core Web Vitals score",
        ],
      },
      {
        step: "05",
        title: "Zero-Downtime Launch & Admin Handoff",
        duration: "Week 8",
        summary: "Seamless live domain DNS pointing and comprehensive team training.",
        details: [
          "Zero-downtime domain pointing and SSL certificate verification",
          "Executing 301 redirect map and submitting XML sitemaps to Google",
          "Live test purchase validation under production DNS",
          "Recorded video walkthrough and live training for your order fulfillment team",
        ],
      },
    ],
    techStackTitle: "E-Commerce & CMS Technology Stack",
    techStackSubtitle:
      "Enterprise tools we use to engineer, host, and scale modern online stores.",
    techStackCategories: [
      {
        category: "E-Commerce Platforms & Frameworks",
        tools: ["Shopify & Shopify Plus", "Shopify Liquid", "WordPress", "WooCommerce", "Headless Shopify (Next.js)", "Alpine.js"],
      },
      {
        category: "Payment & Checkout Ecosystem",
        tools: ["Razorpay", "Stripe", "Cashfree", "GoKwik", "Shopify Payments", "PayPal"],
      },
      {
        category: "Shipping, ERP & Fulfillment",
        tools: ["Shiprocket", "Delhivery", "Pickrr", "Unicommerce", "Zoho Inventory", "Tally ERP"],
      },
      {
        category: "Marketing Automation & Customer Reviews",
        tools: ["Klaviyo", "Judge.me", "Yotpo", "Gorgias Support", "WhatsApp Business API"],
      },
    ],
    comparisonTitle: "GGM Technologies vs. Typical E-Commerce Agencies",
    comparisonSubtitle:
      "Why leading direct-to-consumer brands trust our custom engineering over generic theme setups.",
    comparisonRows: [
      {
        feature: "Theme Foundation",
        ggmApproach: "100% custom-coded Liquid / Gutenberg theme built for your specific brand.",
        traditionalAgency: "Installs a pirated or pre-made ThemeForest theme loaded with 40+ demo plugins.",
        freelancer: "Free default Shopify theme with basic color tweaks.",
      },
      {
        feature: "Store Loading Speed",
        ggmApproach: "Sub-1.5s load time with 80+ mobile speed score on Google PageSpeed.",
        traditionalAgency: "Sluggish 5–8 second load times causing massive cart drop-offs.",
        freelancer: "Fails basic Core Web Vitals tests with zero speed optimization.",
      },
      {
        feature: "Third-Party App Philosophy",
        ggmApproach: "We code custom features natively to avoid paying $500/mo in recurring app fees.",
        traditionalAgency: "Installs a paid app for every tiny feature, driving up monthly store overhead.",
        freelancer: "Leaves conflicting plugins installed that break mobile checkout.",
      },
      {
        feature: "Post-Launch Independence",
        ggmApproach: "Complete modular admin panel. Your team updates banners and products easily.",
        traditionalAgency: "Forces you onto high-cost monthly retainers for minor text changes.",
        freelancer: "Disappears after launch without providing documentation or training.",
      },
    ],
    industriesTitle: "E-Commerce Solutions Across High-Growth Verticals",
    industriesSubtitle:
      "Storefront architectures tailored to the unique purchase habits of each category.",
    industries: [
      {
        industry: "D2C Apparel, Luxury Fashion & Footwear",
        challenge: "Handling complex sizing options, fabric swatches, high returns, and impulse browsing.",
        solution: "Interactive visual swatch selectors, dynamic size guides, and one-click UPI checkout.",
        impact: "34% reduction in return rates and a 42% increase in mobile conversion rate.",
      },
      {
        industry: "Health, Wellness & Organic Supplements",
        challenge: "Educating skeptical consumers on ingredients while driving high repeat subscription orders.",
        solution: "Ingredient transparency modals, recurring subscription recharge integration, and doctor review badges.",
        impact: "Grew recurring monthly subscription revenue to 48% of total gross sales.",
      },
      {
        industry: "Luxury Home Decor & Furniture",
        challenge: "High average order value (₹15,000–₹1,50,000) requiring high customer confidence before buying.",
        solution: "Room visualizer tool, custom freight shipping calculations, and direct WhatsApp concierge support.",
        impact: "Scaled average order value (AOV) by 28% and processed ₹2.4Cr in monthly online sales.",
      },
      {
        industry: "Industrial B2B & Wholesale Equipment",
        challenge: "Managing custom wholesale pricing tiers, bulk quantity discounts, and GST invoicing.",
        solution: "Shopify B2B wholesale portal with customer-specific pricing, RFQ quote forms, and auto GST invoices.",
        impact: "Onboarded 220+ verified wholesale distributors ordering directly through the platform.",
      },
    ],
    faqsTitle: "Frequently Asked Questions About Shopify & WordPress",
    faqsSubtitle: "Honest guidance on platform selection, migration, pricing, and ownership.",
    faqs: [
      {
        question: "Shopify or WordPress / WooCommerce — which platform should we choose?",
        answer:
          "If your primary focus is selling physical or digital products with high order volume, Shopify is almost always the superior choice due to its bulletproof security, 99.99% server uptime, native checkout optimization, and zero hosting maintenance. If your business is primarily content-led, a corporate service firm, or requires bespoke database logic and no transaction fees, WordPress is the ideal platform.",
      },
      {
        question: "Can you migrate our existing store without losing customer data or SEO rankings?",
        answer:
          "Yes. Migration is one of our core specialties. We run automated database scripts that transfer your complete product catalog, customer accounts, and historical order history. Crucially, we compile a 1-to-1 301 redirect map for all existing URLs, ensuring your hard-earned Google search rankings and backlinks remain 100% intact.",
      },
      {
        question: "Do we have to pay recurring monthly agency fees to run our store?",
        answer:
          "No. We build on standard Shopify and WordPress foundations. Once your store is launched and handed over, you own it completely. You only pay your standard platform/hosting fee (to Shopify or your chosen host). While we offer optional ongoing maintenance packages, you are completely free to manage the store independently.",
      },
      {
        question: "Can you build custom features without installing expensive monthly Shopify apps?",
        answer:
          "Yes. Our developers write native Liquid, JavaScript, and custom CSS to build features like sticky add-to-cart buttons, countdown timers, product bundles, custom swatches, and slide-out carts directly into your theme code, saving you hundreds of dollars in monthly app subscriptions.",
      },
      {
        question: "Which Indian payment gateways do you integrate?",
        answer:
          "We integrate and test all leading Indian payment gateways including Razorpay, Cashfree, PayU, and PhonePe, as well as global processors like Stripe and PayPal. We also integrate one-click checkout solutions like GoKwik and Razorpay Magic Checkout to reduce COD fraud.",
      },
      {
        question: "How do you optimize store loading speeds for mobile shoppers in India?",
        answer:
          "We implement four strict speed protocols: (1) eliminating unused app scripts and render-blocking CSS; (2) lazy-loading images and utilizing modern WebP formats; (3) inlining critical CSS; and (4) utilizing Cloudflare edge caching to deliver sub-1.5 second page load speeds across 4G and 5G mobile networks.",
      },
      {
        question: "Do you train our team on how to manage products and fulfill orders?",
        answer:
          "Yes. Prior to launch, we conduct a live 1-on-1 video training session with your operations and marketing team. We also provide recorded, step-by-step video tutorials covering how to add products, create discount codes, manage inventory, print shipping labels, and process refunds.",
      },
    ],
    metaTitle: "Shopify & WordPress Development Company in Delhi | GGM Technologies",
    metaDescription:
      "Premier Shopify and WordPress development agency in Delhi. Custom Liquid themes, high-speed WooCommerce builds, frictionless checkout, and zero-downtime platform migrations.",
    focusKeywords: ["Shopify development company Delhi", "WordPress development agency Delhi", "WooCommerce experts Delhi", "Shopify Plus agency India", "custom Shopify theme"],
  },
};
