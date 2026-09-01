"use client";

import { useState, useMemo } from "react";
import {
  CheckCircle2,
  Search,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  MapPin,
  Sparkles,
} from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

export interface ScopeCategory {
  id: string;
  name: string;
  count: number;
  icon: any;
  color: string;
  badgeBg: string;
  description: string;
  items: {
    title: string;
    description: string;
    tag: string;
  }[];
}

export const SEO_SCOPE_CATEGORIES: ScopeCategory[] = [
  {
    id: "initial-analysis",
    name: "Initial Audit & Analysis",
    count: 10,
    icon: Search,
    color: "#0370BA",
    badgeBg: "rgba(3, 112, 186, 0.12)",
    description: "Deep structural, architectural, and competitive intelligence diagnostics before touching code.",
    items: [
      { title: "Website Structure Suggestion", description: "Architecture recommendations for crawl depth, silo structure, and UX navigation hierarchy.", tag: "Architecture" },
      { title: "Depth Website Analysis", description: "Comprehensive full-domain diagnostic covering indexation, crawl efficiency, and HTTP headers.", tag: "Audit" },
      { title: "Project Competitor Analysis", description: "Reverse-engineering top 3-5 ranking competitors for keyword gaps and backlink footprints.", tag: "Competitor" },
      { title: "Duplicate Content Check", description: "Detecting thin, duplicate, and cannibalizing content clusters across all indexed URLs.", tag: "Content" },
      { title: "Keyword Analysis", description: "Mapping commercial and transactional search queries to high-intent buyer stages.", tag: "Research" },
      { title: "Baseline Ranking Check", description: "Establishing pre-campaign benchmark rank positions across Google desktop and mobile.", tag: "Benchmark" },
      { title: "Keyword URL Mapping", description: "Assigning primary and secondary semantic target entities to designated landing pages.", tag: "Strategy" },
      { title: "Broken Links Check", description: "Locating 404 dead ends, redirect chains, and internal crawl budget waste.", tag: "Health" },
      { title: "Google Penalty Check", description: "Forensic check for manual actions, algorithmic suppression (Helpful Content / Spam updates).", tag: "Compliance" },
      { title: "Initial Rank Report", description: "Comprehensive baseline executive ranking and visibility index report.", tag: "Reporting" },
    ],
  },
  {
    id: "on-page",
    name: "On-Page Optimization",
    count: 28,
    icon: Zap,
    color: "#FE911A",
    badgeBg: "rgba(254, 145, 26, 0.12)",
    description: "Technical search engine signals, DOM structure, semantic code hygiene, and Core Web Vitals.",
    items: [
      { title: "Canonicalization", description: "Eliminating duplicate URL variations and defining rel=canonical rules.", tag: "Technical" },
      { title: "Header Tags Optimization", description: "Structuring clean H1, H2, H3 hierarchy with semantic entity keywords.", tag: "Content" },
      { title: "Internal Link Structuring & Optimization", description: "Contextual anchor text sculpturing and topic cluster cross-linking.", tag: "Linking" },
      { title: "Existing Content Optimization", description: "Upgrading legacy copy for EEAT, topical depth, and search intent satisfaction.", tag: "Content" },
      { title: "Robots.Txt Creation/Analysis", description: "Directing search bots, preventing crawl budget leaks, and protecting private routes.", tag: "Crawling" },
      { title: "XML Sitemap Creation & Analysis", description: "Validating dynamic indexation feeds submitted directly to Google and Bing.", tag: "Indexing" },
      { title: "Google Webmaster Tools Setup (GSC)", description: "Configuring Google Search Console properties, DNS verification, and geo-targeting.", tag: "Setup" },
      { title: "Google Analytics 4 Setup (GA4)", description: "Configuring property tracking, data streams, and privacy-compliant event telemetry.", tag: "Analytics" },
      { title: "Page Speed Optimization Analysis", description: "Comprehensive Google Lighthouse and Core Web Vitals diagnostic.", tag: "Performance" },
      { title: "Fresh Web Content Suggestions", description: "Strategic editorial calendar recommendations based on rising search queries.", tag: "Strategy" },
      { title: "Google Analytics Setup with Conversion Tracking", description: "Form submissions, phone call clicks, and WhatsApp lead capture event measurement.", tag: "Conversion" },
      { title: "Title & Meta Tags Optimization", description: "High-CTR meta titles and persuasive OpenGraph descriptions written for click appeal.", tag: "Metadata" },
      { title: "Image Alt Tag Optimization", description: "Descriptive alt text for image accessibility and Google Image search visibility.", tag: "Accessibility" },
      { title: "Bing Webmaster Tools Setup", description: "IndexNow API integration and Bing crawler configuration.", tag: "Multi-Engine" },
      { title: "HTML Site Map Creation", description: "Human-navigable footer taxonomy map for visitor discoverability and crawler fallback.", tag: "Navigation" },
      { title: "Website Page Load Optimization", description: "Script minification, deferred JavaScript hydration, and server caching.", tag: "Performance" },
      { title: "Pagination Tags on Site", description: "Proper rel=next/prev handling and clean faceted taxonomy control.", tag: "Taxonomy" },
      { title: "Proper URL Structure Analysis", description: "Clean, lowercase, hyphens-only URL naming conventions free of ID parameters.", tag: "Structure" },
      { title: "Resolve Webmaster Crawl Errors", description: "Fixing 5xx server drops, soft 404s, and blocked resource warnings.", tag: "Crawlability" },
      { title: "No Follow on External Links", description: "Preserving internal page rank equity by auditing external hyperlink rel attributes.", tag: "Link Equity" },
      { title: "Footer Optimization", description: "Semantic footer layout with verified business schema and NAP consistency.", tag: "Layout" },
      { title: "Website Usability Analysis", description: "Mobile touch target spacing, viewport readability, and UX friction audits.", tag: "UX" },
      { title: "HTML Code Cleanup & Optimization", description: "Purging inline CSS bloat, nested table tags, and deprecated scripts.", tag: "Clean Code" },
      { title: "Header Status, Meta Robots & Google Cache Checks", description: "Verifying 200 OK headers, index/follow directives, and Google render snapshots.", tag: "Indexing" },
      { title: "Check Mobility & Touch Target Issues", description: "Resolving Google Mobile Usability warnings and viewport sizing defects.", tag: "Mobile" },
      { title: "Check AMP Pages Issues", description: "Auditing Accelerated Mobile Pages validation if active.", tag: "Mobile" },
      { title: "URL Parameter Handling", description: "Configuring faceted search parameters to prevent duplicate content index bloat.", tag: "Parameters" },
      { title: "Custom 404 Page", description: "Branded error page guiding lost visitors back to primary service funnels.", tag: "UX" },
    ],
  },
  {
    id: "off-page",
    name: "Off-Page Optimization",
    count: 17,
    icon: Layers,
    color: "#10B981",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    description: "High-authority brand mentions, white-hat editorial citations, and digital PR amplification.",
    items: [
      { title: "Blog Submission", description: "Publishing informative industry articles on vetted high-authority web portals.", tag: "Authority" },
      { title: "Article Submission", description: "In-depth thought leadership distribution to editorial publishing networks.", tag: "Editorial" },
      { title: "Blog Promotion", description: "Syndication across niche publisher communities to drive contextual referral traffic.", tag: "Outreach" },
      { title: "Company Profile Listing", description: "Establishing verified corporate profiles across top Tier-1 business databases.", tag: "Citations" },
      { title: "Classified Submissions", description: "High-intent geo-targeted commercial classified advertisements.", tag: "Local" },
      { title: "Article Promotion", description: "Content syndication expanding link equity and social reach.", tag: "Promotion" },
      { title: "Social Bookmarking", description: "Curating resource links on Reddit, Mix, and niche curation platforms.", tag: "Bookmarking" },
      { title: "PDF / Doc Submission", description: "Uploading whitepapers, case studies, and corporate briefs to Scribd and SlideShare.", tag: "Rich Media" },
      { title: "Image Submissions", description: "Distributing branded diagrams and infographics to Pinterest, Flickr, and Behance.", tag: "Visual" },
      { title: "Press Release Promotion", description: "Corporate milestone announcements distributed across Google News syndicated outlets.", tag: "PR" },
      { title: "Press Release Submission", description: "Writing and distributing AP-style press releases for enterprise brand authority.", tag: "PR" },
      { title: "Infographic Promotion", description: "Outreach pitching high-value visual graphics to industry bloggers and editors.", tag: "Visual PR" },
      { title: "Infographic Distribution", description: "Placing visual assets across visual indexing portals for passive backlinks.", tag: "Distribution" },
      { title: "PPT Promotion", description: "Promoting presentation slide decks for commercial B2B audience discovery.", tag: "B2B" },
      { title: "PPT Submission", description: "Uploading keynote slide decks to SlideShare and AuthorStream.", tag: "Media" },
      { title: "Blog Commenting", description: "Participating in relevant niche industry discussions with contextual links.", tag: "Community" },
      { title: "Q & A Submissions", description: "Answering targeted consumer questions on Quora, StackExchange, and niche forums.", tag: "Community" },
    ],
  },
  {
    id: "local-seo",
    name: "Local Search Optimization",
    count: 6,
    icon: MapPin,
    color: "#8B5CF6",
    badgeBg: "rgba(139, 92, 246, 0.12)",
    description: "Google Maps 3-Pack rankings, localized search intent, and Google Business Profile supremacy.",
    items: [
      { title: "Google My Business Setup & Verification", description: "Complete GBP optimization with primary categories, attributes, and photo updates.", tag: "GBP" },
      { title: "Local Business Directory", description: "Consistent NAP (Name, Address, Phone) citations on Justdial, Sulekha, and IndiaMART.", tag: "Directories" },
      { title: "Customer Reviews / Ratings Submissions", description: "Automated review generation funnels gathering 5-star Google reviews.", tag: "Reputation" },
      { title: "Contact Address in Footer", description: "Structured LocalBusiness schema microdata matching exact physical address.", tag: "Schema" },
      { title: "Google+ / Search Console Site Verification", description: "Official domain property ownership authentication with Google ecosystem.", tag: "Verification" },
      { title: "Google Embedded Map", description: "Interactive Google Maps API embed enhancing localized geographic relevance.", tag: "Maps" },
    ],
  },
  {
    id: "reporting",
    name: "Reporting & Telemetry",
    count: 3,
    icon: BarChart3,
    color: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.12)",
    description: "100% transparent weekly and monthly performance tracking delivered directly to stakeholders.",
    items: [
      { title: "Weekly / Monthly Search Engine Rank Report", description: "Keyword movement telemetry tracking rank progress across desktop and mobile.", tag: "Rank Tracking" },
      { title: "SEO Activity Reports", description: "Itemized audit log detailing every on-page change, link acquired, and task executed.", tag: "Activity Log" },
      { title: "Google Analytics Performance Report", description: "Conversion metrics, organic traffic growth, goal completions, and user session trends.", tag: "Analytics" },
    ],
  },
];

export default function SeoScopeOfWorkSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalDeliverables = useMemo(() => {
    return SEO_SCOPE_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
  }, []);

  const filteredCategories = useMemo(() => {
    return SEO_SCOPE_CATEGORIES.map((cat) => {
      const filteredItems = cat.items.filter((item) => {
        const matchesCat = activeCategory === "all" || activeCategory === cat.id;
        const matchesQuery =
          searchQuery.trim() === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tag.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      });
      return { ...cat, items: filteredItems };
    }).filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative overflow-hidden border-t border-chalk/10 bg-ink/70 py-20 lg:py-24">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-flow/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#0370ba]/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header Band */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-chalk/10">
          <div className="max-w-3xl">
            <Eyebrow className="text-[#0370ba]">
              OFFICIAL SCOPE OF WORK &amp; DELIVERABLES CHARTER
            </Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl lg:text-5xl">
              Complete {totalDeliverables}-Point SEO Deliverables Matrix
            </h2>
            <p className="mt-4 font-body text-base text-muted sm:text-lg leading-relaxed">
              Every GGM Technologies SEO campaign is executed against this rigorous, verified
              checklist — covering forensic technical audits, sub-second on-page remediation,
              white-hat editorial outreach, and localized Google Maps supremacy.
            </p>
          </div>

          {/* SOW Document Download CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/uploads/certificates/ggm-seo-package-scope-of-work.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-chalk/20 bg-surface/80 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-chalk transition-all duration-200 hover:border-flow hover:bg-surface hover:text-flow"
            >
              <ExternalLink size={14} /> View Official SOW (PDF)
            </a>
            <a
              href="/uploads/certificates/ggm-seo-package-scope-of-work.pdf"
              download="GGM-SEO-Package-Scope-Of-Work.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-flow px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-flow/25 transition-all duration-200 hover:bg-flow/90 hover:scale-[1.02]"
            >
              <Download size={14} /> Download Charter
            </a>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "all"
                  ? "bg-flow text-white shadow-md shadow-flow/20"
                  : "border border-chalk/15 bg-surface/40 text-muted hover:border-chalk/30 hover:text-chalk"
              }`}
            >
              All Deliverables ({totalDeliverables})
            </button>
            {SEO_SCOPE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "border text-white shadow-sm"
                    : "border border-chalk/15 bg-surface/40 text-muted hover:border-chalk/30 hover:text-chalk"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: cat.color, borderColor: cat.color }
                    : undefined
                }
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search 64+ deliverables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-chalk/15 bg-surface/60 py-2 pl-10 pr-4 font-body text-xs text-chalk placeholder-muted/60 focus:border-flow focus:outline-none focus:ring-1 focus:ring-flow"
            />
          </div>
        </div>

        {/* Deliverables Grid by Category */}
        <div className="mt-12 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-chalk/10 bg-surface/30 p-12 text-center">
              <p className="font-body text-muted">
                No deliverables found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="rounded-3xl border border-chalk/10 bg-surface/20 p-6 md:p-8 backdrop-blur-sm"
                >
                  {/* Category Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-chalk/10">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                        style={{
                          backgroundColor: cat.badgeBg,
                          borderColor: `${cat.color}33`,
                          color: cat.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-chalk">
                          {cat.name}
                        </h3>
                        <p className="font-body text-xs text-muted">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className="self-start sm:self-center font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: cat.badgeBg,
                        borderColor: `${cat.color}40`,
                        color: cat.color,
                      }}
                    >
                      {cat.items.length} Tasks Included
                    </span>
                  </div>

                  {/* Checklist Items Grid */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col justify-between rounded-2xl border border-chalk/10 bg-surface/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-chalk/25 hover:bg-surface/80"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                size={15}
                                className="shrink-0 text-emerald-400 transition-transform group-hover:scale-110"
                              />
                              <h4 className="font-display text-sm font-semibold text-chalk group-hover:text-flow transition-colors">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <p className="pl-6 font-body text-xs text-muted/90 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-3 pl-6">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70 bg-chalk/5 px-2 py-0.5 rounded border border-chalk/10">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="mt-12 rounded-2xl border border-flow/20 bg-flow/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flow/15 text-flow">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-chalk">
                100% White-Hat &amp; Google Search Essentials Compliant
              </h4>
              <p className="mt-1 font-body text-sm text-muted">
                Every single item in our Scope of Work adheres to Google Search Essentials and EEAT guidelines.
                Zero automated PBNs, zero link farms, zero spam.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-chalk text-ink font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-chalk/90 transition-colors"
          >
            <Sparkles size={14} /> Request Custom Audit
          </a>
        </div>
      </div>
    </section>
  );
}
