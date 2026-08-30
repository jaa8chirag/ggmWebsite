import fs from "fs";
import path from "path";

const filePath = path.resolve("src/data/serviceDetails.ts");
let fileText = fs.readFileSync(filePath, "utf8");

const mobileAppDetail = `  "mobile-app-development": {
    slug: "mobile-app-development",
    badge: "NATIVE & CROSS-PLATFORM MOBILE ENGINEERING",
    heroH1: "Mobile Application Development Company in Delhi | iOS & Android Apps",
    heroSubtitle:
      "From scalable Flutter and React Native cross-platform apps to high-performance native Swift and Kotlin engineering. We architect fluid 120Hz mobile applications with bank-grade security, offline-first data sync, and enterprise cloud microservices.",
    overviewParagraphs: [
      "In a mobile-first digital economy, your smartphone application is often the primary touchpoint between your brand and high-value customers. Poor app performance, sluggish screen transitions, battery drain, or clunky checkout flows immediately lead to uninstalls and lost revenue. Building an enterprise-grade mobile application requires rigorous software engineering, meticulous memory management, and human-centric UI/UX design.",
      "At GGM Technologies, we engineer mission-critical mobile solutions for emerging startups, high-growth D2C brands, and established enterprise organizations. Headquartered in South Delhi and serving clients across India and globally, our mobile engineering lab builds bespoke iOS and Android applications utilizing modern native frameworks (SwiftUI and Jetpack Compose) and production-proven cross-platform engines (Flutter and React Native). Every application we ship is tested across hundreds of real physical devices for sub-second launch times, smooth 120Hz scrolling, and robust offline data resilience.",
    ],
    metrics: [
      { value: "4.9 ★", label: "App Store Average", subtext: "Average user review rating across client production apps" },
      { value: "< 0.8s", label: "Cold Launch Time", subtext: "Sub-second application startup and instant splash transitions" },
      { value: "99.9%", label: "Crash-Free Sessions", subtext: "Enterprise telemetry monitored via Sentry and Firebase Crashlytics" },
      { value: "100%", label: "Code Ownership", subtext: "Complete source code, API keys, and IP handed over to client" },
    ],
    pillarsTitle: "Full-Lifecycle Mobile Application Engineering",
    pillarsSubtitle:
      "Six interconnected engineering disciplines powering high-engagement, commercially profitable mobile products.",
    pillars: [
      {
        title: "Native iOS Engineering (Swift & SwiftUI)",
        tagline: "Apple ecosystem mastery with hardware-level optimization.",
        description:
          "We craft bespoke native iOS applications utilizing Apple's modern Swift and SwiftUI frameworks. Our iOS apps leverage CoreData, Apple Pay, WidgetKit, PushKit, and biometric authentication (FaceID/TouchID) for an uncompromising Apple user experience.",
        deliverables: [
          "Modern Swift & SwiftUI architecture with MVVM/Clean Architecture",
          "Apple Pay, StoreKit 2 in-app purchases & subscription funnels",
          "WidgetKit, Live Activities & Dynamic Island integration",
          "Background task processing & push notifications via APNs",
          "TestFlight automated staging & App Store review compliance",
        ],
      },
      {
        title: "Native Android Engineering (Kotlin & Compose)",
        tagline: "High-performance Android apps for the fragmented device landscape.",
        description:
          "We build modern Android applications written in idiomatic Kotlin with Jetpack Compose. Engineered to perform seamlessly across thousands of device form factors, screen resolutions, and Android OS versions from budget devices to flagship hardware.",
        deliverables: [
          "Kotlin Coroutines & Flow for non-blocking asynchronous UI",
          "Jetpack Compose modular design system & dynamic theming",
          "Google Play In-App Billing & Google Pay payment integration",
          "Android Architecture Components (Room, Navigation, WorkManager)",
          "Play Asset Delivery & Play Store compliance management",
        ],
      },
      {
        title: "Cross-Platform Mastery (Flutter & React Native)",
        tagline: "One unified codebase. Native 120Hz performance on iOS & Android.",
        description:
          "For businesses seeking rapid time-to-market without compromising on UI fidelity, our cross-platform engineers build in Flutter (Dart) and React Native (TypeScript). We achieve 95%+ code sharing across platforms while maintaining buttery-smooth 60–120 FPS render pipelines.",
        deliverables: [
          "Unified multi-platform UI with pixel-perfect responsive layouts",
          "Native bridge modules for device hardware (Camera, GPS, Bluetooth)",
          "Riverpod / Bloc (Flutter) and Redux Toolkit / Zustand (React Native)",
          "40% reduction in development, maintenance, and testing costs",
          "Seamless over-the-air (OTA) code updates via CodePush",
        ],
      },
      {
        title: "Cloud Backend Microservices & GraphQL APIs",
        tagline: "Scalable server architectures engineered for millions of concurrent calls.",
        description:
          "A world-class mobile app requires a bulletproof backend. We engineer high-concurrency cloud microservices utilizing Node.js, Next.js, Go, or Python, backed by PostgreSQL, Redis caching, and real-time WebSockets.",
        deliverables: [
          "High-throughput RESTful and GraphQL API design",
          "JWT, OAuth 2.0, and biometric session security",
          "Real-time event streaming via WebSockets & Firebase Pub/Sub",
          "Automated AWS / Google Cloud auto-scaling infrastructure",
          "Zero-downtime database migrations & automated backups",
        ],
      },
      {
        title: "Offline-First Sync & Embedded Database Architecture",
        tagline: "Zero downtime even in low or disconnected network zones.",
        description:
          "Network drops should never interrupt user workflows. We implement offline-first database synchronization utilizing SQLite, Room, WatermelonDB, or MMKV. User actions queue locally and synchronize securely once connectivity resumes.",
        deliverables: [
          "Optimistic UI updates for immediate tactile feedback",
          "Conflict-resolution data synchronization algorithms",
          "High-speed local cache encryption using SQLCipher",
          "Bandwidth-efficient delta sync payload compression",
          "Background data prefetching and image caching",
        ],
      },
      {
        title: "App Store Optimization (ASO) & User Acquisition",
        tagline: "Ranking top of search on Apple App Store & Google Play.",
        description:
          "Great code is useless if users cannot discover your app. We execute comprehensive App Store Optimization (ASO), engineering high-conversion icon sets, screenshot carousels, keyword-rich titles, and automated positive review collection funnels.",
        deliverables: [
          "App Store & Google Play algorithmic keyword mapping",
          "High-CTR icon, preview video, and screenshot A/B testing",
          "Automated in-app review prompts tied to high-delight moments",
          "Deep-linking and attribution tracking via AppsFlyer / Branch",
          "Store listing localization for domestic and global markets",
        ],
      },
    ],
    frameworkTitle: "5-Stage Mobile Engineering Lifecycle",
    frameworkSubtitle:
      "A battle-tested, transparent software development lifecycle from concept to Play Store and App Store feature status.",
    frameworkSteps: [
      {
        step: "01",
        title: "Product Architecture & UX Wireframing",
        duration: "Weeks 1–2",
        description:
          "We analyze user personas, map interactive user journeys, define data entity relationships, and craft high-fidelity interactive wireframes for every single application screen.",
      },
      {
        step: "02",
        title: "UI Design System & Prototype Verification",
        duration: "Weeks 3–4",
        description:
          "Our UI designers craft a bespoke design system in Figma, complete with micro-interactions, dark/light theme tokens, and dynamic animations tested with target users before writing code.",
      },
      {
        step: "03",
        title: "Core Mobile & Backend Sprint Engineering",
        duration: "Weeks 5–9",
        description:
          "Bi-weekly agile development sprints where our mobile developers build features, integrate backend APIs, and provide working staging builds on TestFlight and Google Play Internal Testing.",
      },
      {
        step: "04",
        title: "Automated Testing & Multi-Device Farm QA",
        duration: "Weeks 10–11",
        description:
          "Rigorous stress testing across 50+ real iOS and Android physical devices covering network throttling, memory leaks, battery consumption, OS permissions, and edge cases.",
      },
      {
        step: "05",
        title: "Store Publishing & Launch Acceleration",
        duration: "Week 12",
        description:
          "We manage full submission to Apple App Store and Google Play Console, oversee compliance approval, configure production APNs/FCM push servers, and monitor initial user sessions.",
      },
    ],
    techStackTitle: "Battle-Tested Mobile Engineering Stack",
    techStackSubtitle: "Modern, scalable languages and cloud frameworks with zero proprietary lock-in.",
    techStackCategories: [
      {
        category: "Mobile Engines & Frameworks",
        tools: ["Flutter (Dart)", "React Native", "Swift & SwiftUI", "Kotlin & Jetpack Compose", "TypeScript", "Expo EAS"],
      },
      {
        category: "Backend & Microservices",
        tools: ["Node.js", "Next.js APIs", "GraphQL", "PostgreSQL", "Firebase / Firestore", "Redis", "Docker"],
      },
      {
        category: "State Management & Storage",
        tools: ["Riverpod / Bloc", "Redux Toolkit", "Zustand", "SQLite / Room", "MMKV", "WatermelonDB"],
      },
      {
        category: "Cloud, DevOps & QA",
        tools: ["Fastlane", "GitHub Actions CI/CD", "AWS Amplify / EC2", "Google Cloud", "Sentry", "Firebase Crashlytics"],
      },
    ],
    comparisonTitle: "GGM High-Performance Apps vs. Slow Template Apps",
    comparisonSubtitle:
      "Why growing enterprises invest in custom mobile engineering over cheap outsourced template wrappers.",
    comparisonRows: [
      {
        feature: "Underlying Architecture",
        competitor: "WebView / Cordova template wrappers that feel laggy and unresponsive",
        ggm: "True 120Hz native Swift/Kotlin or high-octane Flutter/React Native builds",
        highlight: true,
      },
      {
        feature: "Launch Speed & Memory",
        competitor: "3–6 second cold launch times with heavy RAM memory leakage",
        ggm: "Sub-second cold app boot with optimized memory allocation & low battery draw",
        highlight: false,
      },
      {
        feature: "Offline Functionality",
        competitor: "Blank screen errors and crashes when mobile connectivity drops",
        ggm: "Resilient offline-first database synchronization with zero data loss",
        highlight: false,
      },
      {
        feature: "Security Standards",
        competitor: "Hardcoded API keys and insecure local storage vulnerable to decompilation",
        ggm: "Biometric login, certificate pinning, and AES-256 encrypted local storage",
        highlight: true,
      },
      {
        feature: "App Store Approval",
        competitor: "Frequent App Store rejections due to guideline violations and low quality",
        ggm: "100% first-pass App Store and Play Store compliance guarantee",
        highlight: false,
      },
      {
        feature: "Code Ownership & IP",
        competitor: "Agency holds source code hostage; proprietary vendor lock-in",
        ggm: "100% intellectual property, Git repositories, and keys transferred to client",
        highlight: false,
      },
    ],
    faqsTitle: "Frequently Asked Questions About Mobile App Development",
    faqs: [
      {
        question: "Should we build native iOS/Android or a cross-platform Flutter/React Native app?",
        answer:
          "For 90% of businesses, cross-platform development (using Flutter or React Native) is the optimal choice. It reduces engineering cost and development time by nearly 40% by maintaining a single codebase that runs with native 120Hz fluid performance on both iOS and Android. Native Swift/Kotlin is recommended for apps requiring intensive 3D graphics, low-level Bluetooth hardware integrations, or specialized OS APIs.",
      },
      {
        question: "Do you handle publishing to Google Play Store and Apple App Store?",
        answer:
          "Yes, 100%. We manage the entire store deployment process, including Apple Developer Program and Google Play Console setup, App Store Optimization (ASO), metadata & screenshot preparation, privacy policy disclosures, and resolving any compliance review feedback until your app is live.",
      },
      {
        question: "Who owns the mobile application source code and intellectual property?",
        answer:
          "You do. Upon project completion and final handover, 100% of the proprietary source code, Git repositories, API documentation, design assets, and cloud deployment credentials are transferred directly to your organization with zero vendor lock-in.",
      },
      {
        question: "How do you handle backend databases, APIs, and cloud infrastructure?",
        answer:
          "We engineer scalable backend microservices using Node.js, Next.js, Python, or Go, coupled with PostgreSQL, MongoDB, or Firebase. We build secure RESTful and GraphQL APIs hosted on AWS, Google Cloud, or DigitalOcean with automated auto-scaling and Redis caching.",
      },
      {
        question: "Do you offer post-launch maintenance, OS updates, and feature additions?",
        answer:
          "Yes. Mobile operating systems (iOS and Android) release major updates annually. We provide comprehensive monthly SLA maintenance retainers covering bug fixes, OS compatibility patches, cloud server monitoring, and ongoing feature rollouts.",
      },
    ],
    metaTitle: "Mobile App Development Company Delhi | iOS & Android | GGM Technologies",
    metaDescription:
      "Leading mobile application development agency in Delhi. Custom native iOS, Android, Flutter, and React Native apps engineered for speed, high conversion, and scalability.",
    focusKeywords: ["mobile app development company Delhi", "iOS app developers India", "Android app development Delhi", "Flutter app agency India", "React Native development company"],
  },`;

const googleAdsenseDetail = `  "google-adsense": {
    slug: "google-adsense",
    badge: "PUBLISHER MONETIZATION & REVENUE OPTIMIZATION",
    heroH1: "Google AdSense Approval & Publisher Monetization Services in Delhi",
    heroSubtitle:
      "Transform your digital traffic into predictable monthly ad revenue. From 100% compliant first-time AdSense approval and policy remediation to header bidding, heatmapped ad placements, and RPM yield maximization.",
    overviewParagraphs: [
      "Monetizing high-traffic websites, editorial publications, blogs, and digital tools through display advertising should be a steady, compounding revenue stream. However, publishers routinely struggle with frustrating account rejections ('Low Value Content' or 'Policy Violations'), sudden ad-serving limits, click-bombing bots, and dismal RPMs that fail to reflect the true value of their traffic.",
      "At GGM Technologies, we treat ad revenue optimization as an applied engineering and programmatic auction science. Serving content publishers, digital media networks, and web tool creators across India and internationally, our monetization specialists audit your site architecture, eliminate compliance red flags, and deploy yield-optimized ad layouts. By balancing Google AdSense with Google Ad Manager (GAM) and programmatic header bidding, we maximize your effective cost per thousand impressions (eCPM) without compromising Core Web Vitals or reader user experience.",
    ],
    metrics: [
      { value: "+48%", label: "Average RPM / CPM Lift", subtext: "Revenue increase achieved through strategic layout heatmapping" },
      { value: "100%", label: "Policy Compliance", subtext: "Zero invalid traffic flags; full adherence to Google Publisher Policies" },
      { value: "< 20ms", label: "Ad Loading Overhead", subtext: "Asynchronous lazy-loading protecting your Core Web Vitals" },
      { value: "24/7", label: "Invalid Traffic Guard", subtext: "Automated Cloudflare WAF protection against malicious click-bombing" },
    ],
    pillarsTitle: "Full-Funnel Publisher Monetization Capabilities",
    pillarsSubtitle:
      "Six strategic services designed to elevate your ad revenue from basic pennies to enterprise yield.",
    pillars: [
      {
        title: "Guaranteed 100% Compliant AdSense Approval",
        tagline: "Fast-track your application through Google's editorial review.",
        description:
          "Google AdSense rejects over 85% of initial publisher applications. We audit your domain's content depth, fix navigation architecture, remove duplicate thin pages, verify required legal compliance pages, and resolve policy flags to secure full AdSense approval.",
        deliverables: [
          "Complete site structure & 'Low Value Content' remediation",
          "Essential legal compliance pages (Privacy Policy, Disclaimers, Contact)",
          "Content depth auditing ensuring 100% original editorial value",
          "AdSense crawler accessibility & robots.txt unblocking",
          "Fast turnaround submission with dedicated compliance support",
        ],
      },
      {
        title: "Ad Placement Heatmapping & High-CTR Architecture",
        tagline: "Positioning ad units where user attention naturally peaks.",
        description:
          "Sticking random ads in sidebars yields terrible viewability and low bids. We analyze visitor scroll depth and eye-tracking heatmaps to engineer high-performing responsive ad placements (in-article native, sticky footer anchors, and high-impact headers) that maximize click-through rate.",
        deliverables: [
          "Scroll-depth and attention heatmapping audit",
          "High-viewability in-article responsive ad insertion",
          "Mobile-friendly sticky anchor ad unit configuration",
          "Native display units matching your site's visual typography",
          "A/B split testing of ad sizes (300x250, 336x280, 728x90, responsive)",
        ],
      },
      {
        title: "RPM & eCPM Yield Maximization Engine",
        tagline: "Competing for the highest-paying advertisers in your commercial vertical.",
        description:
          "Traffic from high-tier geographic locations (US, UK, Canada, Tier-1 India) is worth 5x to 10x more when targeted properly. We optimize your category taxonomies, ad categories, and keyword targeting to attract premium programmatic buyers willing to pay top CPMs.",
        deliverables: [
          "High-CPC keyword and topical category optimization",
          "Ad review center filtering: blocking low-paying spam advertisers",
          "Geo-targeted ad unit serving based on visitor IP",
          "Smart pricing floor optimization in Google Ad Manager",
          "Continuous RPM and page-RPM telemetry monitoring",
        ],
      },
      {
        title: "Header Bidding & Google Ad Manager (GAM) Integration",
        tagline: "Unlocking enterprise programmatic demand beyond AdSense alone.",
        description:
          "For growing publishers with over 50,000 monthly sessions, relying exclusively on AdSense leaves substantial revenue on the table. We deploy Google Ad Manager (GAM) coupled with Prebid.js header bidding to force top global SSPs to bid against AdSense in real time.",
        deliverables: [
          "Google Ad Manager (GAM 360) setup and inventory hierarchy",
          "Client-side and server-side Prebid.js header bidding deployment",
          "Integration with top SSPs (AppNexus, OpenX, PubMatic, Amazon APS)",
          "Unified auction bidding maximizing fill rates and average eCPM",
          "Custom reporting dashboard aggregating multi-demand revenues",
        ],
      },
      {
        title: "Invalid Traffic & Click-Bombing Bot Defense",
        tagline: "Protecting your AdSense account against sudden limits and bans.",
        description:
          "Competitors, scrapers, and malicious bot farms can trigger AdSense's automated 'Invalid Traffic' penalties by click-bombing your ads. We build enterprise Cloudflare WAF firewall rules and ClickJacking shields that identify and block bad bots before they can interact with ad scripts.",
        deliverables: [
          "Cloudflare Enterprise WAF bot management rules",
          "ClickJacking and automated bot scraper rate-limiting",
          "Ad display suppression for suspicious and repetitive IP clusters",
          "Traffic anomaly monitoring and proactive Google reporting",
          "Zero-risk peace of mind for high-volume publishers",
        ],
      },
      {
        title: "Core Web Vitals & Asynchronous Ad Engineering",
        tagline: "Monetizing aggressively without sacrificing Google SEO rankings.",
        description:
          "Third-party ad scripts frequently degrade page speed and trigger Cumulative Layout Shift (CLS) penalties. We engineer asynchronous lazy-loading ad wrappers with fixed placeholder dimensions, ensuring your Core Web Vitals remain in Google's green zone.",
        deliverables: [
          "Intersection Observer API lazy-loading for off-screen ad units",
          "CSS aspect-ratio placeholders eliminating Cumulative Layout Shift (CLS)",
          "Asynchronous script loading minimizing main-thread blocking time",
          "Full Core Web Vitals optimization score preservation",
          "Googlebot-friendly ad cloaking preserving pure editorial indexing",
        ],
      },
    ],
    frameworkTitle: "4-Phase Monetization Engineering Roadmap",
    frameworkSubtitle:
      "A structured pathway from initial compliance audit to maximized monthly programmatic earnings.",
    frameworkSteps: [
      {
        step: "01",
        title: "Site Architecture & Policy Compliance Audit",
        duration: "Days 1–3",
        description:
          "We review your site against Google Publisher Policies, resolving content depth issues, navigation errors, legal page absences, and crawler accessibility roadblocks.",
      },
      {
        step: "02",
        title: "AdSense Approval / Account Restoration",
        duration: "Days 4–7",
        description:
          "We structure and submit your application to Google AdSense, managing communication and verification until full account approval status is granted.",
      },
      {
        step: "03",
        title: "Ad Placement Heatmapping & Unit Deployment",
        duration: "Days 8–10",
        description:
          "We deploy high-yield responsive ad units with fixed CLS dimensions, lazy-loading triggers, and WAF invalid-traffic shields integrated into your CMS.",
      },
      {
        step: "04",
        title: "RPM Optimization & Header Bidding Scaling",
        duration: "Days 11–14",
        description:
          "We monitor live auction telemetry, block low-paying categories, tune pricing floors, and configure Google Ad Manager header bidding for maximum net revenue.",
      },
    ],
    techStackTitle: "Programmatic Monetization & Ad Tech Stack",
    techStackSubtitle: "Enterprise ad servers, header bidding wrappers, and security firewalls.",
    techStackCategories: [
      {
        category: "Ad Networks & Exchanges",
        tools: ["Google AdSense", "Google Ad Manager (GAM)", "Prebid.js", "OpenX", "AppNexus", "Amazon APS"],
      },
      {
        category: "Analytics & Attention Heatmapping",
        tools: ["Google Analytics 4 (GA4)", "Microsoft Clarity", "Hotjar", "Google Publisher Console"],
      },
      {
        category: "Security & Invalid Traffic Shield",
        tools: ["Cloudflare WAF", "Rate Limiting Rules", "ClickJacking Protections", "Bot Management"],
      },
      {
        category: "Performance & Rendering",
        tools: ["Intersection Observer API", "Aspect-Ratio Placeholders", "Asynchronous Ad Wrappers", "Lighthouse"],
      },
    ],
    comparisonTitle: "GGM Strategic Monetization vs. Unoptimized DIY AdSense",
    comparisonSubtitle:
      "Why professional ad engineering yields 40%–80% higher revenue than simply toggling on Google Auto Ads.",
    comparisonRows: [
      {
        feature: "Ad Placement Strategy",
        competitor: "Blindly enables Google Auto Ads, ruining site UX and slowing pages",
        ggm: "Precision heatmapped placements that maximize viewability and preserve speed",
        highlight: true,
      },
      {
        feature: "Average Page RPM",
        competitor: "Low default RPM (₹80–₹180 per 1,000 visitors) due to generic inventory",
        ggm: "Optimized yield (₹280–₹750+ per 1,000 visitors) via high-CPC category mapping",
        highlight: true,
      },
      {
        feature: "Impact on Core Web Vitals",
        competitor: "High Cumulative Layout Shift (CLS) and slow LCP penalizing Google SEO",
        ggm: "Zero CLS placeholders and asynchronous lazy-loading preserving 100% SEO scores",
        highlight: false,
      },
      {
        feature: "Invalid Traffic Protection",
        competitor: "Zero bot defense; constant anxiety over sudden AdSense account bans",
        ggm: "Enterprise Cloudflare WAF bot filters protecting your account 24/7",
        highlight: false,
      },
      {
        feature: "Demand Diversity",
        competitor: "100% locked into AdSense alone; zero bidding competition",
        ggm: "Google Ad Manager + Prebid.js header bidding forcing global SSPs to compete",
        highlight: true,
      },
    ],
    faqsTitle: "Frequently Asked Questions About Google AdSense Services",
    faqs: [
      {
        question: "How do you ensure 100% compliant Google AdSense approval?",
        answer:
          "Google AdSense rejects many applications due to 'Low Value Content', poor site navigation, or missing legal pages. We conduct a complete compliance audit of your website: restructuring content architecture, fixing navigation menus, verifying privacy and disclaimer pages, removing thin content, and optimizing page load speeds so your domain meets Google's strict publisher program policies on first submission.",
      },
      {
        question: "How do you increase AdSense RPM and CPM earnings without annoying visitors?",
        answer:
          "We use strategic ad placement heatmapping and lazy-loading technology. Instead of cluttering the page with intrusive popups, we place high-performing responsive ad units (in-article native ads, sticky anchor units, and high-CTR sidebar placements) that load only as visitors scroll. This maximizes ad viewability scores (over 70%) which prompts Google AdSense to bid significantly higher CPMs.",
      },
      {
        question: "What is invalid traffic protection and how do you prevent AdSense account bans?",
        answer:
          "AdSense accounts frequently face ad-serving limits or bans due to click-bombing, bot traffic, or aggressive ad placements. We configure advanced Cloudflare Web Application Firewalls (WAF), rate-limiting rules, and ClickJacking protection to block malicious scrapers and click bots before they can interact with your ads, keeping your AdSense account in pristine standing.",
      },
      {
        question: "Can you help integrate Google Ad Manager (GAM) and Header Bidding?",
        answer:
          "Yes. For publishers with over 50,000 monthly pageviews, relying solely on AdSense leaves money on the table. We implement Google Ad Manager (GAM) with Prebid.js header bidding, allowing premium global ad networks (AppNexus, OpenX, Amazon Publisher Services) to compete simultaneously with AdSense, typically driving a 25% to 50% increase in net ad yield.",
      },
    ],
    metaTitle: "Google AdSense Approval & Monetization Services in Delhi | GGM Technologies",
    metaDescription:
      "Expert Google AdSense approval and yield monetization services in Delhi. Maximize RPM, implement header bidding, and eliminate invalid click risks with GGM Technologies.",
    focusKeywords: ["Google AdSense approval service Delhi", "AdSense monetization agency India", "increase AdSense RPM", "Google Ad Manager setup Delhi", "AdSense policy fix"],
  },`;

const aliases = `
// Backwards-compatible aliases
SERVICE_DETAILS["shopify"] = SERVICE_DETAILS["shopify-development"];
SERVICE_DETAILS["shopify-wordpress"] = SERVICE_DETAILS["shopify-development"];
SERVICE_DETAILS["wordpress"] = SERVICE_DETAILS["wordpress-development"];
SERVICE_DETAILS["wp"] = SERVICE_DETAILS["wordpress-development"];
SERVICE_DETAILS["mobile-application-development"] = SERVICE_DETAILS["mobile-app-development"];
SERVICE_DETAILS["mobile-app"] = SERVICE_DETAILS["mobile-app-development"];
SERVICE_DETAILS["google-ads"] = SERVICE_DETAILS["google-adsense"];
SERVICE_DETAILS["adsense"] = SERVICE_DETAILS["google-adsense"];
SERVICE_DETAILS["pay-per-click-advertising"] = SERVICE_DETAILS["ppc"];
`;

// Insert the two details right before the closing "};" of SERVICE_DETAILS
const closingIndex = fileText.lastIndexOf("};");
if (closingIndex !== -1) {
  fileText =
    fileText.substring(0, closingIndex) +
    mobileAppDetail + "\n\n" +
    googleAdsenseDetail + "\n" +
    fileText.substring(closingIndex);

  // Replace alias section
  const aliasMarker = "// Backwards-compatible aliases";
  const aliasPos = fileText.indexOf(aliasMarker);
  if (aliasPos !== -1) {
    fileText = fileText.substring(0, aliasPos) + aliases.trim() + "\n";
  } else {
    fileText += "\n" + aliases.trim() + "\n";
  }

  fs.writeFileSync(filePath, fileText, "utf8");
  console.log("Successfully appended mobile-app-development and google-adsense to serviceDetails.ts!");
} else {
  console.error("Could not find closing }; in serviceDetails.ts");
}
