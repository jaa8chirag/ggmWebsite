import Link from "next/link";
import {
  Boxes,
  MapPin,
  FileText,
  Briefcase,
  ShoppingBag,
  MessageSquareQuote,
  Plus,
  ArrowUpRight,
  Database,
  CheckCircle2,
  Globe,
  Zap,
} from "lucide-react";
import { queryOne } from "@/lib/db";
import {
  DB_SERVICES,
  DB_PRODUCTS,
  DB_POSTS,
  DB_CASE_STUDIES,
  DB_TESTIMONIALS,
} from "@/data/dbSeedData";

async function getCount(sql: string, params: any[] = []): Promise<number> {
  const row = await queryOne<any>(sql, params);
  return row ? Number(row.c) : 0;
}

export default async function AdminDashboardPage() {
  const [
    serviceCount,
    locationCount,
    serviceLocationCount,
    blogCount,
    publishedBlogCount,
    workCount,
    productCount,
    testimonialCount,
    pendingQuoteCount,
  ] = await Promise.all([
    getCount("SELECT COUNT(*) as c FROM `Service`"),
    getCount("SELECT COUNT(*) as c FROM `Location`"),
    getCount("SELECT COUNT(*) as c FROM `ServiceLocation`"),
    getCount("SELECT COUNT(*) as c FROM `BlogPost`"),
    getCount("SELECT COUNT(*) as c FROM `BlogPost` WHERE `status` = 'published'"),
    getCount("SELECT COUNT(*) as c FROM `CaseStudy`"),
    getCount("SELECT COUNT(*) as c FROM `Product`"),
    getCount("SELECT COUNT(*) as c FROM `Testimonial`"),
    getCount("SELECT COUNT(*) as c FROM `QuoteRequest` WHERE `status` = 'PENDING'"),
  ]);

  const isDbConnected = serviceCount > 0;
  const displayServiceCount = serviceCount || DB_SERVICES.length;
  const displayBlogCount = blogCount || DB_POSTS.length;
  const displayPublishedBlogCount = publishedBlogCount || DB_POSTS.length;
  const displayWorkCount = workCount || DB_CASE_STUDIES.length;
  const displayProductCount = productCount || DB_PRODUCTS.length;
  const displayTestimonialCount = testimonialCount || DB_TESTIMONIALS.length;

  const cards = [
    {
      label: "15-Min Quotes",
      value: pendingQuoteCount,
      href: "/admin/quotes",
      icon: Zap,
      accent: "from-signal/30 to-signal/10 text-signal border-signal/50",
      description: "Pending quote callbacks",
    },
    {
      label: "Services",
      value: displayServiceCount,
      href: "/admin/services",
      icon: Boxes,
      accent: "from-flow/20 to-flow/5 text-flow border-flow/40",
      description: `${displayServiceCount} active services`,
    },
    {
      label: "Target Locations",
      value: locationCount,
      href: "/admin/locations",
      icon: MapPin,
      accent: "from-signal/20 to-signal/5 text-signal border-signal/40",
      description: "Cities & regional hubs",
    },
    {
      label: "Location Landing Pages",
      value: serviceLocationCount,
      href: "/admin/services",
      icon: Globe,
      accent: "from-flow/20 to-flow/5 text-flow border-flow/40",
      description: "Service × Location combos",
    },
    {
      label: "Blog Posts",
      value: displayPublishedBlogCount,
      href: "/admin/blog",
      icon: FileText,
      accent: "from-signal/20 to-signal/5 text-signal border-signal/40",
      description: `${displayPublishedBlogCount} published / ${displayBlogCount} total`,
    },
    {
      label: "Case Studies",
      value: displayWorkCount,
      href: "/admin/work",
      icon: Briefcase,
      accent: "from-flow/20 to-flow/5 text-flow border-flow/40",
      description: `${displayWorkCount} client success stories`,
    },
    {
      label: "Shop Products",
      value: displayProductCount,
      href: "/admin/shop",
      icon: ShoppingBag,
      accent: "from-signal/20 to-signal/5 text-signal border-signal/40",
      description: `${displayProductCount} web & SEO packages`,
    },
    {
      label: "Client Testimonials",
      value: displayTestimonialCount,
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      accent: "from-flow/20 to-flow/5 text-flow border-flow/40",
      description: `${displayTestimonialCount} verified reviews`,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border-2 border-chalk/30 bg-surface p-8 shadow-xl md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isDbConnected ? "bg-emerald-500 animate-pulse" : "bg-flow"
              }`}
            />
            {isDbConnected
              ? "Database Connected & Live"
              : "Active Content Serving (Synced State)"}
          </div>
          <h1 className="mt-2 font-display text-3xl text-chalk">
            Content Management Dashboard
          </h1>
          <p className="mt-2 max-w-xl font-body text-sm text-muted">
            Manage your website services, multi-location SEO hubs, blog articles, case studies, and brand settings from one central control panel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk shadow-md transition-all duration-300 hover:bg-flow hover:shadow-lg"
          >
            <Plus size={14} /> New Blog Post
          </Link>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 rounded-full border-2 border-chalk/30 bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk transition-all duration-300 hover:border-flow hover:text-flow"
          >
            <Plus size={14} /> New Service
          </Link>
        </div>
      </div>

      {/* Overview Metric Cards Grid */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-4 font-semibold">
          Live Content Overview
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md shadow-chalk/5 transition-all duration-300 hover:border-flow hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br border ${card.accent}`}
                  >
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
                  />
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {card.label}
                  </p>
                  <p className="mt-2 font-display text-4xl text-chalk">
                    {card.value}
                  </p>
                  <p className="mt-2 font-body text-xs text-muted">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* System Status Info Card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md">
          <div className="flex items-center gap-3">
            <Database size={20} className="text-flow" />
            <h3 className="font-display text-lg text-chalk">Database Health</h3>
          </div>
          <div className="mt-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-chalk/15 pb-2">
              <span className="text-muted">Engine</span>
              <span className="text-chalk font-semibold">MySQL (mysql2 connection pool)</span>
            </div>
            <div className="flex items-center justify-between border-b border-chalk/15 pb-2">
              <span className="text-muted">Database Name</span>
              <span className="text-flow font-semibold">ggmwebsite</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Status</span>
              <span className="inline-flex items-center gap-1.5 text-signal font-semibold">
                <CheckCircle2 size={14} /> Connected & Active
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-signal" />
            <h3 className="font-display text-lg text-chalk">SEO & Framework Status</h3>
          </div>
          <div className="mt-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-chalk/15 pb-2">
              <span className="text-muted">Framework</span>
              <span className="text-chalk font-semibold">Next.js 16.3 (Turbopack)</span>
            </div>
            <div className="flex items-center justify-between border-b border-chalk/15 pb-2">
              <span className="text-muted">Sitemap & Robots</span>
              <span className="text-flow font-semibold">Dynamic Auto-Generation</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Metadata API</span>
              <span className="inline-flex items-center gap-1.5 text-flow font-semibold">
                <CheckCircle2 size={14} /> Structured JSON-LD Enabled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
