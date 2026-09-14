import mysql from "mysql2/promise";

async function updatePost() {
  const conn = await mysql.createConnection({
    uri: "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    ssl: { rejectUnauthorized: false }
  });

  const postId = "post_1789229584768_ikin0";

  // 1. Update BlogPost meta and excerpt
  const cleanExcerpt = "Discover proven strategies to rank your website on AI search engines like ChatGPT, Claude, and Google Gemini. Learn how to optimize for Generative Engine Optimization (GEO), build authority signals, and structure content for high-intent AI citations.";
  const metaTitle = "How to Rank on AI Search Engines: Proven Strategies | GGM Technologies";
  const metaDescription = "Learn proven strategies to rank your website on AI search engines like ChatGPT, Claude, and Gemini. Actionable GEO, crawlability, and content optimization tips.";

  await conn.query(
    "UPDATE `BlogPost` SET `excerpt` = ?, `category` = 'SEO', `metaTitle` = ?, `metaDescription` = ?, `updatedAt` = NOW() WHERE `id` = ?",
    [cleanExcerpt, metaTitle, metaDescription, postId]
  );
  console.log("Updated BlogPost metadata and excerpt.");

  // 2. Define clean structured blocks
  const blocks = [
    {
      type: "h2",
      text: "Introduction",
    },
    {
      type: "paragraph",
      text: "AI search engines are changing how people discover websites, products, and services. Instead of showing only a traditional list of blue links, many AI systems now synthesize direct, comprehensive answers right inside the results. This fundamental shift means your search engine optimization strategy must evolve.",
    },
    {
      type: "paragraph",
      text: "While strong visibility in traditional Google search still matters, it is no longer the entire picture. To get your brand recommended by modern AI assistants, you need clear structure, deep topical authority, and extractable content that generative models can confidently cite and trust.",
    },
    {
      type: "h2",
      text: "Understanding AI Search Engines and Their Impact on Visibility",
    },
    {
      type: "paragraph",
      text: "AI search platforms operate differently from conventional search engines. Instead of matching simple keywords to an index, they combine pre-trained neural knowledge, selective web indexing, and real-time retrieval (RAG) to generate natural language answers. In platforms like Google's AI Overviews and AI Mode, content is favored when it is authoritative, clear, and easy to extract without ambiguity.",
    },
    {
      type: "paragraph",
      text: "So how do AI search engines decide which sources to feature? They prioritize topical authority, relevance to user intent, information freshness, and clean semantic architecture. When your website provides direct answers with strong supporting evidence, your chances of winning prominent AI citations increase dramatically.",
    },
    {
      type: "h3",
      text: "How AI Search Engines (ChatGPT, Claude, Gemini) Work",
    },
    {
      type: "paragraph",
      text: "Different AI engines utilize distinct retrieval mechanisms:",
    },
    {
      type: "list",
      items: [
        "**ChatGPT (OpenAI):** Combines web browsing capabilities with Bing search integration and foundational training data to provide synthesized answers with source citations.",
        "**Perplexity AI:** Heavily focuses on live web search and real-time retrieval, ranking and citing authoritative sources prominently alongside every answer.",
        "**Google Gemini:** Directly integrates with Google's massive web index, powering Google AI Overviews and AI Mode with synthesized summaries drawn from top-ranking pages.",
        "**Claude (Anthropic):** Emphasizes nuanced comprehension, long-context reasoning, and verified, factual accuracy.",
      ],
    },
    {
      type: "paragraph",
      text: "What does this mean for your SEO strategy? You must ensure your pages are easily crawlable, keep your core URLs actively indexed, and structure your copy to deliver concise answers before diving into secondary details. Generative engines favor content they can quote directly without guessing.",
    },
    {
      type: "h2",
      text: "Differences Between AI Search Rankings and Traditional SEO",
    },
    {
      type: "paragraph",
      text: "Traditional SEO focuses on earning keyword rankings and winning clicks from blue-link search engine results pages (SERPs). AI search visibility focuses on getting **cited, summarized, and recommended** inside generated conversational responses. You are not just competing for rank positions—you are competing to be recognized as a trusted source.",
    },
    {
      type: "list",
      items: [
        "**Primary Objective:** Traditional SEO aims for higher SERP rank positions; AI search optimization aims for direct citations and brand mentions inside AI responses.",
        "**User Journey:** Traditional search drives users through search listings; AI search provides the answer directly and links sources for validation.",
        "**Content Preference:** Traditional SEO targets specific keyword densities; AI search favors clear, extractable, answer-ready concepts.",
        "**Authority Signals:** Traditional SEO relies heavily on backlink counts; AI search evaluates overall web consensus, brand mentions, and sentiment across multiple platforms.",
      ],
    },
    {
      type: "h2",
      text: "Why AI Search Optimization Matters for Businesses",
    },
    {
      type: "paragraph",
      text: "For businesses today, AI search is no longer a futuristic concept—it is actively shaping how decision-makers discover solutions, evaluate vendors, and make purchasing decisions. With hundreds of millions of people turning to AI assistants weekly, your online visibility extends well beyond traditional organic search.",
    },
    {
      type: "paragraph",
      text: "When an AI assistant recommends your company as an answer to a commercial query, it carries high implied trust. Visitors arriving from AI citations typically have well-defined intent and higher conversion readiness.",
    },
    {
      type: "list",
      items: [
        "**High-Intent Referral Traffic:** AI users ask detailed, problem-specific questions, making referral traffic from citations exceptionally valuable.",
        "**Brand Authority & Mindshare:** Repeatedly appearing as an authoritative source builds brand recognition across AI platforms.",
        "**Future-Proofing Organic Growth:** As search interfaces become increasingly conversational, websites optimized for answer extraction maintain steady organic reach.",
      ],
    },
    {
      type: "h2",
      text: "Key Ranking Factors for AI Search Engines",
    },
    {
      type: "paragraph",
      text: "Generative Engine Optimization (GEO) builds on core SEO best practices, but places greater emphasis on answer readiness, factual consistency, and entity credibility. The primary factors governing AI search visibility include:",
    },
    {
      type: "h3",
      text: "1. Authority Signals and Web Consensus",
    },
    {
      type: "paragraph",
      text: "Authority is the single strongest predictor of AI citation frequency. Research into ChatGPT citations confirms that domains with high-quality backlink profiles and strong referring domains are cited far more frequently than low-trust sites.",
    },
    {
      type: "paragraph",
      text: "Beyond backlinks, AI models measure **consensus signals**—the degree to which multiple independent, trusted sources agree on your brand's expertise. Natural discussions and positive mentions on platforms like Reddit, Quora, industry forums, and third-party review sites build topical credibility that AI models readily detect.",
    },
    {
      type: "h3",
      text: "2. Content Relevance, Depth, and Freshness",
    },
    {
      type: "paragraph",
      text: "AI engines need reliable material they can summarize without hallucinations. High-value content solves a distinct problem, covers subtopics thoroughly, and aligns directly with conversational search intent. Superficial, thin content gives AI engines little reason to cite your page.",
    },
    {
      type: "paragraph",
      text: "Information freshness is equally critical. Because AI search platforms use real-time retrieval for current events and technical topics, regularly refreshing your cornerstone articles every 2-3 months signals to crawlers that your data remains accurate and dependable.",
    },
    {
      type: "list",
      items: [
        "Deliver complete answers to primary queries and anticipate follow-up questions.",
        "Update statistics, screenshots, and product details on high-performing pages.",
        "Cover related subtopics in-depth to demonstrate comprehensive topical authority.",
      ],
    },
    {
      type: "h3",
      text: "3. Semantic Structure and Schema Markup",
    },
    {
      type: "paragraph",
      text: "To help AI engines extract information efficiently, structure your pages with clear visual and semantic hierarchy. Descriptive H2 and H3 tags, concise paragraphs, and bulleted takeaways make content easy for algorithms to parse.",
    },
    {
      type: "paragraph",
      text: "Structured data (Schema.org JSON-LD) provides machine-readable context. Schemas such as Article, FAQPage, Organization, and Product reinforce entity relationships and clarify authoritativeness.",
    },
    {
      type: "list",
      items: [
        "Include structured JSON-LD schema markup tailored to your page type.",
        "Keep heading tags clear, descriptive, and aligned with common query phrasing.",
        "Organize key facts and comparisons into clean bullet points or structured tables.",
      ],
    },
    {
      type: "h2",
      text: "Building a Website Fit for AI Search Engine Crawlers",
    },
    {
      type: "paragraph",
      text: "Before AI systems can cite your content, their automated bots must be able to crawl, render, and index it without friction. If your most valuable pages are blocked in robots.txt, bogged down by slow server response times, or buried deep in your site architecture, AI engines will pass over them.",
    },
    {
      type: "h3",
      text: "Ensuring Proper Indexing in Google, Bing, and Gemini",
    },
    {
      type: "paragraph",
      text: "To appear in Google AI Overviews and Gemini, your pages must first be indexed cleanly in Google. Regularly review your Google Search Console coverage reports and ensure your XML sitemaps are submitted properly.",
    },
    {
      type: "paragraph",
      text: "Bing indexing is equally essential because major AI platforms (including ChatGPT's browsing mode and Microsoft Copilot) rely directly on Bing's search index. Use Bing Webmaster Tools and implement IndexNow for immediate indexing of new and updated content.",
    },
    {
      type: "h3",
      text: "Optimizing Crawl-Readiness and Technical Performance",
    },
    {
      type: "paragraph",
      text: "A crawl-ready website is fast, technically sound, and logically connected through internal links:",
    },
    {
      type: "list",
      items: [
        "**Fast Server Response & Edge Caching:** Ensure fast Time to First Byte (TTFB) and CDN edge caching to prevent crawler timeouts.",
        "**Mobile-First Responsive Layout:** Optimize Core Web Vitals to deliver a smooth experience across all screen sizes.",
        "**Avoid Client-Side JS Blocks:** Render essential textual content and metadata server-side so AI bots don't miss critical insights.",
        "**Logical Internal Linking:** Link related articles and service pages together so crawlers can easily discover topical clusters.",
      ],
    },
    {
      type: "h2",
      text: "Creating Answer-Driven, High-Quality Content",
    },
    {
      type: "paragraph",
      text: "To capture AI citations, apply the **inverted pyramid writing method**: place the direct, definitive answer within the first one or two sentences beneath each heading. Once the direct answer is stated, expand with deeper context, practical examples, and step-by-step guidance.",
    },
    {
      type: "h3",
      text: "Using FAQ Sections and Question-Led Headings",
    },
    {
      type: "paragraph",
      text: "FAQ sections directly mirror how people ask questions in conversational search interfaces. Incorporating targeted Q&A modules at the end of comprehensive guides significantly increases your likelihood of being extracted as an authoritative answer.",
    },
    {
      type: "list",
      items: [
        "Craft headings that mirror real conversational questions users ask.",
        "Add targeted FAQ sections addressing common customer queries.",
        "State direct, upfront answers before elaborating on technical details.",
      ],
    },
    {
      type: "h3",
      text: "Writing in a Natural, Conversational Tone",
    },
    {
      type: "paragraph",
      text: "AI engines favor natural, human language over dense, robotic prose. Writing in a conversational tone means using clear phrasing, active voice, and concise sentences that address user intent directly without filler words.",
    },
    {
      type: "paragraph",
      text: "Because users frequently submit detailed prompts with specific conditions, content that anticipates real-world scenarios and provides actionable advice is much more likely to be selected for generative summaries.",
    },
    {
      type: "h2",
      text: "Maximizing Authority with Backlinks and Digital PR",
    },
    {
      type: "paragraph",
      text: "Backlinks and brand recognition remain central to AI search visibility. AI algorithms favor entities that appear consistently across recognized industry sources. To build sustainable authority:",
    },
    {
      type: "list",
      items: [
        "**Earn Editorial Backlinks:** Focus on earning links from authoritative, contextually relevant publications in your industry.",
        "**Leverage Digital PR & Expert Commentary:** Provide data-driven insights, quotes, and case studies to journalists and industry bloggers.",
        "**Strengthen Unlinked Brand Mentions:** Foster positive discussions and brand citations across forums, podcasts, and review platforms.",
        "**Showcase First-Hand Experience (E-E-A-T):** Feature verifiable author bios, practical case studies, and transparent business credentials.",
      ],
    },
    {
      type: "h2",
      text: "Conclusion",
    },
    {
      type: "paragraph",
      text: "Ranking your website on AI search engines like ChatGPT, Claude, and Gemini requires an effective blend of strong technical SEO foundations and Generative Engine Optimization (GEO). By structuring content for instant answer extraction, maintaining fresh and comprehensive resources, and establishing undeniable brand authority, you can ensure your business remains visible as search continues to evolve.",
    },
    {
      type: "paragraph",
      text: "Ready to accelerate your search presence? Explore our expert [SEO Services](/services/seo) or get in touch with the [GGM Technologies team](/contact) for a tailored growth strategy.",
    },
  ];

  // 3. Clear old blocks and insert new clean structured blocks
  await conn.query("DELETE FROM `BlogBlock` WHERE `postId` = ?", [postId]);
  console.log("Deleted old blocks.");

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const blockId = `blk_ai_${Date.now()}_${i}`;
    const itemsJson = b.items ? JSON.stringify(b.items) : JSON.stringify([]);
    await conn.query(
      "INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES (?, ?, ?, ?, ?, ?)",
      [blockId, postId, b.type, b.text || null, itemsJson, i]
    );
  }
  console.log(`Inserted ${blocks.length} clean blocks successfully.`);

  await conn.end();
}

updatePost().catch(console.error);
