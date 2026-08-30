import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Award,
  HelpCircle,
  Search,
  Lock,
  PhoneCall,
  Check,
} from "lucide-react";
import { getProducts } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

const title = "Off-Page SEO & Authority Link Building Services in Delhi | GGM Technologies";
const description =
  "Enterprise-grade off-page SEO, editorial guest posting, and high DA contextual backlinks. 100% manual outreach to real sites with 10k+ organic traffic. Zero PBNs, guaranteed indexation.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/shop",
});

export default async function ShopPage() {
  const products = await getProducts();

  const trustMetrics = [
    { value: "DA 50–85+", label: "Vetted Domain Authority", sub: "Verified on Moz & Ahrefs DR 60+" },
    { value: "> 10k/mo", label: "Real Organic Traffic", sub: "Zero dead sites or traffic-less blogs" },
    { value: "100%", label: "Manual Editorial Outreach", sub: "Strictly zero PBNs or link farms" },
    { value: "365 Days", label: "Replacement Guarantee", sub: "Permanent placement warranty" },
  ];

  const qualityPillars = [
    {
      title: "Real Authority & True PageRank Passing",
      tagline: "Algorithms evaluate the strength of your endorsers.",
      description:
        "Google's foundational search algorithm is built around link citations as votes of confidence. We acquire contextual in-content backlinks from established digital publications with clean historical backlink profiles, passing raw algorithmic equity that propels your most competitive commercial pages to top search positions.",
    },
    {
      title: "Topical Relevance & Semantic Co-Occurrence",
      tagline: "Context matters just as much as domain metrics.",
      description:
        "A backlink from a high-DA website in an unrelated industry provides minimal ranking value. Our outreach specialists identify and pitch publications that operate within your exact commercial and topical ecosystem, reinforcing your entity authority in Google's Knowledge Graph.",
    },
    {
      title: "Safe, Diversified Anchor Text Sculpting",
      tagline: "Protecting your domain against Google Penguin penalties.",
      description:
        "Over-optimizing exact-match keywords triggers automated algorithmic penalties. We plan a safe, natural anchor text distribution curve incorporating branded citations, partial matches, long-tail phrases, and generic navigational anchors that emulate natural editorial citation patterns.",
    },
    {
      title: "Genuine Human Referral Traffic & Exposure",
      tagline: "Links that real decision-makers read and click.",
      description:
        "Every publication in our portfolio attracts genuine human readers searching for answers in your domain. Beyond pure SEO ranking value, our editorial placements drive direct referral traffic, brand recognition, and qualified business inquiries from engaged industry buyers.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Competitor Gap & Anchor Profile Audit",
      duration: "Days 1–2",
      description:
        "We analyze your top-ranking search competitors to identify missing high-authority referring domains, keyword gap opportunities, and safe anchor text targets.",
    },
    {
      step: "02",
      title: "Niche Publisher Vetting & Filtering",
      duration: "Days 3–5",
      description:
        "We screen potential publishing partners using Ahrefs and Semrush, rejecting any website with declining search traffic, high Moz Spam Scores (>1%), or suspicious link patterns.",
    },
    {
      step: "03",
      title: "1,000+ Word Editorial Content Production",
      duration: "Days 6–9",
      description:
        "Our in-house content team drafts thoroughly researched, engaging editorial articles tailored to the publication's guidelines, naturally embedding your target link and anchor text.",
    },
    {
      step: "04",
      title: "Publication, Indexing & Audit Report",
      duration: "Days 10–14",
      description:
        "Once live, we verify Googlebot indexation, monitor cache status, and deliver an exhaustive white-label audit report containing live URLs, domain metrics, and anchor verification.",
    },
  ];

  const comparisonRows = [
    {
      feature: "Publisher Authenticity",
      ggm: "Real, active digital publications with genuine editorial staff and active readers.",
      cheapVendors: "Private Blog Networks (PBNs) and expired domains disguised as blogs.",
    },
    {
      feature: "Organic Search Traffic",
      ggm: "Verified 10,000+ monthly Google organic visitors confirmed on Ahrefs/Semrush.",
      cheapVendors: "Zero organic traffic; automated spam sites with fake traffic metrics.",
    },
    {
      feature: "Content Quality",
      ggm: "1,000+ words of researched, human-written editorial content written by specialists.",
      cheapVendors: "300-word spun, low-quality AI filler text that search engines de-index.",
    },
    {
      feature: "Link Placement Type",
      ggm: "Permanent, contextual in-content dofollow backlink integrated naturally.",
      cheapVendors: "Footer links, sidebar widgets, or temporary links deleted after 30 days.",
    },
    {
      feature: "Algorithmic Safety",
      ggm: "100% compliant with Google Search Essentials; zero risk of manual penalty.",
      cheapVendors: "High risk of manual spam action or permanent algorithmic ranking drop.",
    },
    {
      feature: "Replacement Guarantee",
      ggm: "Full 365-day placement warranty; free replacement if any link drops.",
      cheapVendors: "No support, no warranty, and vanished vendors after payment.",
    },
  ];

  const shopFaqs = [
    {
      question: "Why should we invest in GGM backlinks instead of buying cheap link packages on freelance platforms?",
      answer:
        "Cheap link packages sold on marketplaces rely on Private Blog Networks (PBNs), automated submission tools, and hacked websites. While they may offer cheap numbers, Google's advanced spam algorithms easily detect these footprint patterns and de-index the domains, often penalizing the websites that bought the links. GGM Technologies executes 100% manual, white-hat editorial outreach to legitimate digital publications with real human traffic (10,000+ monthly Google visits) and clean backlink histories. These are permanent, authentic endorsements that build lasting domain authority.",
    },
    {
      question: "How do you verify the quality and traffic of publisher websites?",
      answer:
        "We apply a rigorous 6-point forensic vetting filter to every publication: (1) Minimum Domain Authority (DA) 40–85+ and Domain Rating (DR) 50+; (2) Verified organic Google search traffic exceeding 10,000 monthly visits on Ahrefs/Semrush; (3) Clean traffic trajectory with zero severe penalty drops; (4) Moz Spam Score strictly under 1%; (5) Clean outbound link profile without casino/gambling/pharma footprints; and (6) Regular editorial publishing cadence by named human authors.",
    },
    {
      question: "Will these backlinks improve our local search rankings in Delhi-NCR and pan-India?",
      answer:
        "Yes. Backlinks act as the primary trust signal in Google's ranking algorithm. High-authority contextual links pass PageRank directly to your target service or product pages, dramatically elevating your site's overall domain trust. This boosts both local 3-pack rankings in Delhi-NCR as well as nationwide organic keyword rankings across Tier-1 and Tier-2 Indian cities.",
    },
    {
      question: "What anchor text distribution strategy should we use?",
      answer:
        "To maximize ranking velocity while ensuring 100% safety against Google Penguin over-optimization filters, we recommend a balanced anchor text mix: 40% Branded Anchors (e.g., 'GGM Technologies'), 30% Partial-Match / LSI Keywords (e.g., 'expert web developers in Delhi'), 20% Naked URLs (e.g., 'ggmtechnologies.com'), and 10% Generic Anchors (e.g., 'click here', 'visit site'). Our technical team audits your existing anchor profile prior to placement and recommends the exact anchor phrasing for optimal results.",
    },
    {
      question: "What is the turnaround time (TAT) from payment to live publication?",
      answer:
        "Standard order fulfillment takes between 10 to 14 business days. This timeframe allows our team to vet niche-relevant publications, craft 1,000+ words of bespoke editorial content, coordinate with external publication editors for approval, publish the piece, and verify Googlebot indexation. High-tier Tier-1 media publications may require up to 18–21 days due to formal editorial review cycles.",
    },
    {
      question: "Do you provide transparent white-label reports and official GST invoices?",
      answer:
        "Yes, absolutely. Upon completion of your order, you receive a detailed, comprehensive Excel/Google Sheets audit report containing the live published URL, target anchor text, destination URL, verified Domain Authority (DA), Domain Rating (DR), and screenshot of organic traffic telemetry. We also issue an official GST tax invoice for Indian corporate tax compliance.",
    },
  ];

  return (
    <div className="bg-ink pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />

        {/* =================================================================== */}
        {/* 1. HERO SECTION & COMPREHENSIVE OVERVIEW                            */}
        {/* =================================================================== */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flow/40 bg-flow/10 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-flow">
              <ShieldCheck size={14} className="text-flow" />
              Enterprise Off-Page SEO &amp; Authority Infrastructure
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold tracking-tight text-chalk sm:text-5xl lg:text-6xl leading-[1.1]">
            High DA Backlinks &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-flow to-signal">
              Editorial Guest Posting
            </span>{" "}
            Services
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 font-body text-base text-muted leading-relaxed">
            <p>
              In Google&apos;s modern search algorithm, technical performance and on-page content establish your eligibility to compete, but <strong className="text-chalk font-semibold">inbound domain authority dictates who wins the top 3 ranking positions</strong>. Without authentic, high-trust citations from respected industry publications, even the most beautifully designed websites remain trapped on page two and beyond.
            </p>
            <p>
              GGM Technologies engineers white-hat, contextual link acquisition campaigns designed for long-term algorithmic dominance. We strictly reject automated software blasts, low-quality web directories, and high-risk Private Blog Networks (PBNs) that trigger search penalties. Instead, our off-page SEO team conducts 100% manual editorial outreach to verified digital publications with genuine organic search traffic, permanent dofollow placements, and contextual relevance to your business vertical.
            </p>
          </div>

          {/* Key Authority Metric Badges */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-chalk/20 bg-surface/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:border-flow/40"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-flow">
                  {metric.value}
                </p>
                <p className="mt-1.5 font-display text-xs sm:text-sm font-semibold text-chalk">
                  {metric.label}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. THE PRODUCTS CATALOG                                            */}
        {/* =================================================================== */}
        <section className="mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-mono-label font-bold uppercase tracking-widest text-signal">
                AUTHORITY PACKAGES
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-chalk">
                Verified Off-Page Link Building Packages
              </h2>
              <p className="mt-1 font-body text-sm text-muted">
                Transparent specifications, clear deliverables, and zero hidden agency margins.
              </p>
            </div>
            <span className="font-mono text-xs text-muted">
              Showing {products.length} verified packages
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const features = Array.isArray(product.features)
                ? product.features
                : [];

              return (
                <div
                  key={product.slug}
                  className="group relative flex flex-col justify-between rounded-3xl border border-chalk/20 bg-surface/90 p-6 sm:p-7 shadow-lg transition-all duration-300 hover:border-flow hover:shadow-xl backdrop-blur-xl"
                >
                  <div>
                    {/* Top Row: Category & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-flow/30 bg-flow/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-flow uppercase tracking-wider">
                        {product.category || "SEO Service"}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                        <CheckCircle2 size={12} /> In Stock &amp; Active
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-display text-xl font-bold text-chalk group-hover:text-flow transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 font-body text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features Preview List */}
                    {features.length > 0 && (
                      <div className="mt-5 border-t border-chalk/10 pt-4 space-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-chalk font-semibold">
                          Key Inclusions:
                        </p>
                        <ul className="space-y-1.5 font-body text-xs text-muted">
                          {features.slice(0, 4).map((f, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <Check size={14} className="mt-0.5 shrink-0 text-flow" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Pricing & Action Button */}
                  <div className="mt-6 border-t border-chalk/10 pt-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted">
                          Package Pricing
                        </span>
                        <div className="flex items-baseline gap-2 font-mono">
                          {product.price ? (
                            <>
                              <span className="font-display text-2xl font-bold text-chalk">
                                ₹{product.price.toLocaleString("en-IN")}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted line-through">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="font-display text-xl font-bold text-chalk">
                              Custom Quote
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-muted">+ GST · One-time fee</span>
                      </div>

                      <Link
                        href={`/shop/${product.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-flow py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-signal group-hover:scale-105"
                      >
                        Order Package
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. WHY LINK QUALITY MATTERS (DEEP DIVE SECTION)                     */}
        {/* =================================================================== */}
        <section className="mt-24 rounded-3xl border border-chalk/20 bg-surface/70 p-8 sm:p-12 backdrop-blur-xl">
          <div className="max-w-3xl">
            <span className="font-mono text-mono-label font-bold uppercase tracking-widest text-signal">
              THE SCIENCE OF OFF-PAGE SEO
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-chalk leading-tight">
              Why Link Quality Dictates Organic Search Dominance
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-muted leading-relaxed">
              Google treats external links as votes of confidence. But in an era of machine learning and spam filtering algorithms (Helpful Content System, SpamBrain), low-quality links are actively ignored or penalized. Here is how our engineering-first link acquisition framework powers genuine search ascendance:
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {qualityPillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="rounded-2xl border border-chalk/15 bg-ink/60 p-6 shadow-sm transition-all hover:border-flow/40"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flow/20 text-flow font-mono text-xs font-bold">
                    0{pIdx + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-chalk">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-flow font-medium">
                  {pillar.tagline}
                </p>
                <p className="mt-3 font-body text-xs sm:text-sm text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. OUR 4-STAGE VETTING & FULFILLMENT FRAMEWORK                      */}
        {/* =================================================================== */}
        <section className="mt-24">
          <div className="max-w-3xl">
            <span className="font-mono text-mono-label font-bold uppercase tracking-widest text-flow">
              EXECUTION ROADMAP
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-chalk leading-tight">
              Our 4-Stage Editorial Vetting &amp; Placement Lifecycle
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-muted leading-relaxed">
              Every single placement undergoes a rigorous 4-stage audit to guarantee high topical relevance, zero spam footprint, and permanent indexation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm transition-all hover:border-flow"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-signal">
                      {step.step}
                    </span>
                    <span className="rounded-full border border-chalk/15 bg-ink px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-chalk">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 font-body text-xs text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-5 border-t border-chalk/10 pt-3 font-mono text-[11px] text-flow flex items-center gap-1">
                  <CheckCircle2 size={12} /> Quality Verified
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. COMPARISON MATRIX: GGM EDITORIAL VS RISKY CHEAP LINK FARMS        */}
        {/* =================================================================== */}
        <section className="mt-24">
          <div className="max-w-3xl">
            <span className="font-mono text-mono-label font-bold uppercase tracking-widest text-signal">
              QUALITY COMPARISON
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-chalk leading-tight">
              GGM White-Hat Editorial Links vs. Risky Marketplace Links
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-muted leading-relaxed">
              Why leading enterprises and growing D2C brands partner with GGM Technologies rather than risking automated cheap link packages.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-chalk/20 bg-surface shadow-sm">
            <table className="w-full min-w-[650px] text-left border-collapse">
              <thead>
                <tr className="border-b border-chalk/20 bg-ink/60 font-mono text-xs uppercase tracking-wider text-muted">
                  <th className="p-4 sm:p-5">Audit Criteria</th>
                  <th className="p-4 sm:p-5 text-flow font-bold">
                    GGM Technologies (Our Standards)
                  </th>
                  <th className="p-4 sm:p-5 text-muted">
                    Cheap Freelance / Marketplace Links
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-chalk/10 font-body text-sm">
                {comparisonRows.map((row, rI) => (
                  <tr key={rI} className="transition-colors hover:bg-ink/30">
                    <td className="p-4 sm:p-5 font-semibold text-chalk">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-medium text-flow bg-flow/5">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-flow" />
                        <span>{row.ggm}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-muted">
                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                        <span>{row.cheapVendors}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. COMPREHENSIVE LINK BUILDING FAQS                                 */}
        {/* =================================================================== */}
        <section className="mt-24">
          <div className="max-w-3xl">
            <span className="font-mono text-mono-label font-bold uppercase tracking-widest text-flow">
              KNOWLEDGE BASE &amp; CLARIFICATIONS
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-chalk leading-tight">
              Frequently Asked Questions About Link Building
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-muted leading-relaxed">
              Clear, transparent answers regarding domain vetting standards, delivery timelines, anchor safety, and commercial terms.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {shopFaqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl border border-chalk/20 bg-surface/80 p-6 shadow-sm backdrop-blur-xl"
              >
                <h3 className="font-display text-base sm:text-lg font-bold text-chalk flex items-start gap-2.5">
                  <HelpCircle size={18} className="mt-1 shrink-0 text-flow" />
                  <span>{faq.question}</span>
                </h3>
                <p className="mt-3 font-body text-xs sm:text-sm text-muted leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 7. CUSTOM HIGH-VOLUME CONSULTATION CTA BAND                         */}
        {/* =================================================================== */}
        <section className="mt-24 overflow-hidden rounded-3xl border border-flow/30 bg-gradient-to-br from-surface via-surface to-flow/10 p-8 sm:p-12 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-signal">
                <Zap size={13} className="fill-signal" />
                Custom Enterprise Campaigns
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-4xl font-bold text-chalk leading-tight">
                Need a High-Volume Monthly Link Building Retainer?
              </h2>
              <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                If your business requires 10 to 50+ editorial placements per month, custom competitor backlink gap audits, or bespoke Tier-1 media placements (Forbes, Entrepreneur, TechCrunch, Economic Times), speak directly with our senior off-page SEO directors.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Button href="/contact" variant="signal" className="px-6 py-3 text-xs uppercase tracking-widest font-mono">
                Request Custom Strategy
              </Button>
              <a
                href="tel:+919002600880"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-chalk/20 bg-surface px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-chalk transition-all hover:border-flow hover:text-flow"
              >
                <PhoneCall size={14} className="text-flow" />
                +91 9002600880
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
