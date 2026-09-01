import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  ArrowUpRight,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PhoneCall,
} from "lucide-react";
import { getServiceBySlug, getServices, getPublishedPosts } from "@/lib/queries";
import { query } from "@/lib/db";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/home/CtaBand";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/schema";
import Image from "next/image";
import FormattedText from "@/components/ui/FormattedText";
import TechStack from "@/components/common/TechStack";
import QuickQuoteCard from "@/components/services/QuickQuoteCard";
import SeoScopeOfWorkSection from "@/components/services/SeoScopeOfWorkSection";
import { SERVICE_DETAILS } from "@/data/serviceDetails";

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  "website-development": "/images/services/website-development.jpg",
  "web-development": "/images/services/website-development.jpg",
  seo: "/images/services/seo.jpg",
  ppc: "/images/services/ppc.jpg",
  "google-adsense": "/images/services/google-adsense.jpg",
  "google-ads": "/images/services/google-adsense.jpg",
  "mobile-app-development": "/images/services/mobile-app-development.jpg",
  "mobile-application-development": "/images/services/mobile-app-development.jpg",
  "lead-generation": "/images/services/lead-generation.jpg",
  "social-media-marketing": "/images/services/social-media-marketing.jpg",
  "shopify-development": "/images/services/shopify-development.jpg",
  "wordpress-development": "/images/services/wordpress-development.jpg",
  "shopify-wordpress": "/images/services/shopify-development.jpg",
};

// Maps a service to the blog category covering it, for internal linking.
const SERVICE_BLOG_CATEGORY: Record<string, string> = {
  seo: "SEO",
  "website-development": "Web Development",
  "lead-generation": "Lead Generation",
  "ppc": "PPC",
  "social-media-marketing": "Social Media",
  "shopify-development": "Web Development",
  "wordpress-development": "Web Development",
  "shopify-wordpress": "Web Development",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const details = SERVICE_DETAILS[slug];

  if (!service && !details) return {};

  const title =
    service?.metaTitle ||
    details?.metaTitle ||
    `${service?.title || "Digital Marketing"} Services in Delhi | GGM Technologies`;
  const description =
    service?.metaDescription ||
    details?.metaDescription ||
    service?.description ||
    "High-performance digital growth services in Delhi by GGM Technologies.";

  return buildMetadata({
    title,
    description,
    path: `/services/${slug}`,
    overrides: service || undefined,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const details = SERVICE_DETAILS[slug];
  const isWebDev =
    service.slug === "website-development" || service.slug === "web-development";
  const isSeo = service.slug === "seo";

  const imageSrc =
    service.ogImage ||
    DEFAULT_SERVICE_IMAGES[service.slug] ||
    "/images/services/seo.jpg";

  const [allServices, posts, serviceLocations] = await Promise.all([
    getServices(),
    getPublishedPosts(),
    query<any>(
      `SELECT sl.*, l.name as locationName, l.slug as locationSlug 
       FROM \`ServiceLocation\` sl 
       JOIN \`Location\` l ON sl.locationId = l.id 
       WHERE sl.serviceId = ? AND sl.published = 1 
       ORDER BY l.name ASC`,
      [service.id]
    )
      .then((rows) =>
        rows.map((r) => ({
          ...r,
          location: { name: r.locationName, slug: r.locationSlug },
        }))
      )
      .catch(() => []),
  ]);

  const relatedCategory = SERVICE_BLOG_CATEGORY[service.slug];
  const relatedPosts = relatedCategory
    ? posts.filter((p) => p.category === relatedCategory).slice(0, 3)
    : [];

  // Combine database FAQs first, followed by rich SEO research FAQs
  const dbFaqs = service.faqs || [];
  const extraFaqs = details?.faqs
    ? details.faqs.filter(
        (df) =>
          !dbFaqs.some(
            (sf) => sf.question.trim().toLowerCase() === df.question.trim().toLowerCase()
          )
      )
    : [];
  const combinedFaqs = [...dbFaqs, ...extraFaqs];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.description || details?.heroSubtitle || service.promise,
          path: `/services/${service.slug}`,
          allServiceTitles: allServices.map((s) => s.title),
        })}
      />
      {combinedFaqs.length > 0 && <JsonLd data={faqSchema(combinedFaqs)} />}

      <div className="bg-ink text-chalk">
        {/* =================================================================== */}
        {/* 1. HERO & STRATEGIC OVERVIEW (FEATURING DATABASE CONTENT)           */}
        {/* =================================================================== */}
        <section className="relative mx-auto max-w-[1440px] px-6 pt-32 pb-12 md:px-10 md:pt-40">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                  {service.index} · {details?.badge || "ENTERPRISE SERVICE"}
                </span>
              </div>

              {/* Main DB Title */}
              <h1 className="mt-4 font-display text-display-l leading-tight text-chalk">
                {service.title}
              </h1>

              {/* Main DB Promise */}
              <FormattedText
                text={service.promise}
                as="p"
                className="mt-5 max-w-2xl font-body text-body-l font-medium text-flow leading-relaxed"
              />

              {/* Main DB Description */}
              <FormattedText
                text={service.description}
                as="p"
                className="mt-4 max-w-2xl font-body text-body text-muted leading-relaxed"
              />

              {/* Deep Market Research Overview */}
              {details?.overviewParagraphs && details.overviewParagraphs.length > 0 && (
                <div className="mt-6 border-l-2 border-flow/40 pl-4 space-y-3 font-body text-sm text-muted/90 leading-relaxed bg-surface/40 p-3 rounded-r-xl">
                  {details.overviewParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact" variant="signal">
                  Get a free audit
                </Button>
                <a
                  href="tel:+919002600880"
                  className="inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-surface/70 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-chalk shadow-sm transition-all hover:border-flow hover:text-flow"
                >
                  <PhoneCall size={14} className="text-flow" />
                  +91 9002600880
                </a>
              </div>
            </div>

            <div className="relative lg:col-span-5 flex flex-col gap-4">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-flow/15 blur-3xl" />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-chalk/20 bg-surface/80 p-2 shadow-xl backdrop-blur-xl">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
              </div>

              {/* Compact 15-Minute Quote Lead Card in Right Corner */}
              <QuickQuoteCard
                serviceSlug={service.slug}
                serviceTitle={service.title}
              />
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. WHAT'S INCLUDED / TECH STACK                                    */}
        {/* =================================================================== */}
        {isWebDev && (
          <TechStack
            className="my-8 border-y border-chalk/10"
            eyebrow="ENGINEERING & PLATFORM ECOSYSTEM"
            title="Website Development Technologies We Master & Build"
            description="From high-conversion eCommerce (WordPress, Shopify, WooCommerce) to mission-critical full-stack applications (Next.js, React, Node.js, Laravel & .NET) — we build fast, scalable, conversion-first digital platforms."
            includeDeliverables={service.bullets}
            deliverablesTitle={`Core Inclusions & Deliverables (Included in ${service.title})`}
          />
        )}

        {isSeo && <SeoScopeOfWorkSection />}

        {!isWebDev && !isSeo && service.bullets && service.bullets.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
            <div className="rounded-3xl border border-chalk/20 bg-surface/70 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-signal" />
                <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted font-bold">
                  Core Inclusions & Deliverables (Included in {service.title})
                </h2>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-chalk/15 bg-surface p-4 shadow-sm"
                  >
                    <Check size={18} className="mt-0.5 shrink-0 text-flow" />
                    <span className="font-body text-sm font-medium text-chalk">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 3. KEY PERFORMANCE BENCHMARKS / IMPACT METRICS                      */}
        {/* =================================================================== */}
        {details?.metrics && details.metrics.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm shadow-chalk/5 transition-all hover:border-flow"
                >
                  <span className="font-mono text-3xl font-bold tracking-tight text-flow md:text-4xl">
                    {metric.value}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-chalk">
                    {metric.label}
                  </h3>
                  <p className="mt-1 font-body text-xs text-muted leading-normal">
                    {metric.subtext}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 4. CORE DELIVERABLE PILLARS (DEEP BREAKDOWN)                        */}
        {/* =================================================================== */}
        {details?.pillars && details.pillars.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                STRATEGIC CAPABILITIES
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details.pillarsTitle}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details.pillarsSubtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {details.pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="flex flex-col justify-between rounded-3xl border border-chalk/20 bg-surface p-7 shadow-sm shadow-chalk/5 transition-all duration-300 hover:-translate-y-1 hover:border-flow hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-signal">
                        0{idx + 1}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-flow/10 text-flow">
                        <Layers size={14} />
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-chalk">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-flow">
                      {pillar.tagline}
                    </p>
                    <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-chalk/10 pt-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted/80">
                      Deliverables Include:
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {pillar.deliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 font-body text-xs text-chalk/90"
                        >
                          <Check
                            size={14}
                            className="mt-0.5 shrink-0 text-flow"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 5. 5-STAGE EXECUTION FRAMEWORK (HOW WE RUN IT)                      */}
        {/* =================================================================== */}
        {details?.frameworkSteps && details.frameworkSteps.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                EXECUTION ROADMAP
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details.frameworkTitle}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details.frameworkSubtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {details.frameworkSteps.map((step, idx) => (
                <div
                  key={step.step || step.stepNumber || idx}
                  className="relative flex flex-col justify-between rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm transition-all hover:border-flow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-signal">
                        {step.step || step.stepNumber}
                      </span>
                      <span className="rounded-full border border-chalk/15 bg-ink px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
                        {step.duration || step.timeline}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold text-chalk">
                      {step.title || step.name}
                    </h3>
                    <p className="mt-2 font-body text-xs text-muted leading-relaxed">
                      {step.summary || step.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-chalk/10 pt-3">
                    <ul className="space-y-1.5 font-body text-[11px] text-muted">
                      {(step.details || step.outputs || []).map((d, dI) => (
                        <li key={dI} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-flow" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 6. ENTERPRISE TECHNOLOGY & TOOLING STACK                            */}
        {/* =================================================================== */}
        {details?.techStackCategories && details.techStackCategories.length > 0 && !isWebDev && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                ENTERPRISE TOOLING
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details.techStackTitle}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details.techStackSubtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {details.techStackCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-flow">
                    <Cpu size={14} />
                    <span>{cat.category}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-lg border border-chalk/15 bg-ink px-3 py-1.5 font-mono text-xs text-chalk/90"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 7. COMPETITIVE COMPARISON MATRIX                                    */}
        {/* =================================================================== */}
        {details?.comparisonRows && details.comparisonRows.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                COMPETITIVE ADVANTAGE
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details.comparisonTitle}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details.comparisonSubtitle}
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-chalk/20 bg-surface shadow-sm">
              <table className="w-full min-w-[650px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-chalk/20 bg-ink/60 font-mono text-xs uppercase tracking-wider text-muted">
                    <th className="p-4 sm:p-5">Strategic Dimension</th>
                    <th className="p-4 sm:p-5 text-flow font-bold">
                      GGM Technologies (Our Approach)
                    </th>
                    <th className="p-4 sm:p-5">Traditional Agency</th>
                    <th className="p-4 sm:p-5">Freelancer / In-house</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-chalk/10 font-body text-sm">
                  {details.comparisonRows.map((row, rI) => (
                    <tr
                      key={rI}
                      className="transition-colors hover:bg-ink/30"
                    >
                      <td className="p-4 sm:p-5 font-semibold text-chalk">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 font-medium text-flow bg-flow/5">
                        <div className="flex items-start gap-2">
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-flow"
                          />
                          <span>{row.ggmApproach || row.ggm}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-muted">
                        <div className="flex items-start gap-2">
                          <XCircle
                            size={16}
                            className="mt-0.5 shrink-0 text-muted/60"
                          />
                          <span>{row.traditionalAgency || row.competitor}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-muted">
                        <div className="flex items-start gap-2">
                          <XCircle
                            size={16}
                            className="mt-0.5 shrink-0 text-muted/60"
                          />
                          <span>{row.freelancer || "Ad-hoc, unmonitored execution"}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 8. TAILORED INDUSTRY SOLUTIONS & USE CASES                          */}
        {/* =================================================================== */}
        {details?.industries && details.industries.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                TAILORED INDUSTRY VERTICALS
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details.industriesTitle}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details.industriesSubtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {details.industries.map((ind) => (
                <div
                  key={ind.industry}
                  className="flex flex-col justify-between rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm transition-all hover:border-flow"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-chalk">
                      {ind.industry}
                    </h3>
                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <span className="font-mono font-semibold uppercase tracking-wider text-signal">
                          The Challenge:
                        </span>
                        <p className="mt-0.5 font-body text-muted">
                          {ind.challenge}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-chalk/10">
                        <span className="font-mono font-semibold uppercase tracking-wider text-flow">
                          Our Execution:
                        </span>
                        <p className="mt-0.5 font-body text-muted">
                          {ind.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-ink p-3 border border-chalk/10">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Measurable Impact
                    </span>
                    <p className="mt-1 font-body text-xs font-semibold text-flow">
                      {ind.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 9. ALL FAQS (DATABASE FAQS + IN-DEPTH RESEARCH FAQS)                */}
        {/* =================================================================== */}
        {combinedFaqs.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
            <div className="max-w-3xl">
              <span className="font-mono text-mono-label font-bold tracking-widest text-signal uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                {details?.faqsTitle || "Questions & Answers"}
              </h2>
              <p className="mt-3 font-body text-body-l text-muted">
                {details?.faqsSubtitle ||
                  "Everything you need to know about deliverables, timelines, and accountability."}
              </p>
            </div>

            <div className="mt-8 divide-y divide-chalk/20 border-t border-b border-chalk/20">
              {combinedFaqs.map((faq, fIdx) => (
                <details key={fIdx} className="group py-6" open={fIdx === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-chalk">
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-chalk/20 font-mono text-sm text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-flow">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl font-body text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 10. WHERE WE WORK (SERVICE LOCATIONS)                               */}
        {/* =================================================================== */}
        {serviceLocations.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Where we work
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {serviceLocations.map((sl) => (
                <Link
                  key={sl.id}
                  href={`/services/${service.slug}/${sl.location.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-chalk/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-flow hover:text-flow"
                >
                  <MapPin size={12} />
                  {sl.location.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* 11. RELATED READING (BLOG POSTS)                                    */}
        {/* =================================================================== */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Related reading
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm shadow-chalk/5 transition-colors hover:border-flow"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg text-chalk">
                      {post.title}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
                    />
                  </span>
                  <p className="mt-2 font-body text-sm text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CtaBand />
    </>
  );
}
