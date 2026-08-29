"use client";

import { useState } from "react";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Server,
  Database,
  Globe,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

export type TechCategory = "all" | "cms-ecommerce" | "frontend" | "backend" | "database";

export interface TechnologyItem {
  name: string;
  category: "cms-ecommerce" | "frontend" | "backend" | "database";
  categoryLabel: string;
  isProminent: boolean;
  role: string;
  description: string;
  highlights: string[];
  color: string;
  badgeBg: string;
}

export const ALL_TECHNOLOGIES: TechnologyItem[] = [
  // 9 PROMINENT FLAGSHIPS FIRST
  {
    name: "WordPress",
    category: "cms-ecommerce",
    categoryLabel: "CMS & Editorial",
    isProminent: true,
    role: "Custom Enterprise CMS",
    description: "Bespoke theme architectures, custom Gutenberg blocks, ACF Pro, and headless WordPress setups built for extreme speed and security.",
    highlights: ["Custom Block Themes", "Headless WP & GraphQL", "Database Index Optimization", "Zero Agency Lock-In"],
    color: "#21759B",
    badgeBg: "rgba(33, 117, 155, 0.12)",
  },
  {
    name: "Shopify",
    category: "cms-ecommerce",
    categoryLabel: "D2C & eCommerce",
    isProminent: true,
    role: "Shopify Plus & Liquid Engineering",
    description: "Custom Shopify Liquid themes, Hydrogen headless storefronts, app integrations, and conversion-optimized checkout funnels.",
    highlights: ["Shopify Plus Development", "Custom Liquid Themes", "Checkout Extensibility", "ERP & WMS Integrations"],
    color: "#95BF47",
    badgeBg: "rgba(149, 191, 71, 0.12)",
  },
  {
    name: "WooCommerce",
    category: "cms-ecommerce",
    categoryLabel: "Scalable eCommerce",
    isProminent: true,
    role: "High-Volume Commerce",
    description: "Scalable online stores with custom payment gateways, subscription workflows, multi-currency routing, and headless checkout speed.",
    highlights: ["High-Volume Database Tuning", "Custom Payment Gateways", "Automated Inventory Sync", "Sub-second Page Speeds"],
    color: "#96588A",
    badgeBg: "rgba(150, 88, 138, 0.12)",
  },
  {
    name: "PHP",
    category: "backend",
    categoryLabel: "Core Web Engine",
    isProminent: true,
    role: "Modern Object-Oriented Backend",
    description: "Modern PHP 8.3+ development powering ultra-reliable enterprise portals, legacy code modernizations, and high-concurrency microservices.",
    highlights: ["PHP 8.3 JIT Performance", "Object-Oriented Architecture", "Secure Authentication Systems", "High Concurrency Processing"],
    color: "#777BB4",
    badgeBg: "rgba(119, 123, 180, 0.12)",
  },
  {
    name: "Laravel",
    category: "backend",
    categoryLabel: "Backend Framework",
    isProminent: true,
    role: "Enterprise Web Applications",
    description: "Clean MVC architecture, robust REST/GraphQL APIs, background queues, and automated workflows engineered for serious scale.",
    highlights: ["RESTful & GraphQL APIs", "Queues & Redis Caching", "Role-Based Access Control", "Microservices Architecture"],
    color: "#FF2D20",
    badgeBg: "rgba(255, 45, 32, 0.12)",
  },
  {
    name: "React.js",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    isProminent: true,
    role: "Interactive Client Interfaces",
    description: "High-performance reactive interfaces, modular component libraries, client-side state engines, and rich browser dashboards.",
    highlights: ["Modular UI Components", "Redux / Zustand State", "Complex Data Visualizations", "High-FPS Micro-interactions"],
    color: "#087EA4",
    badgeBg: "rgba(8, 126, 164, 0.12)",
  },
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Modern Web Architecture",
    isProminent: true,
    role: "Production App Router & SSR",
    description: "Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), sub-second page transitions, and perfect 100/100 Core Web Vitals.",
    highlights: ["Server Components & SSR", "Sub-second LCP & INP", "Automated SEO Metadata", "Edge Network Rendering"],
    color: "#000000",
    badgeBg: "rgba(15, 20, 32, 0.10)",
  },
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Runtime & Microservices",
    isProminent: true,
    role: "High-Throughput Backends",
    description: "Non-blocking event-driven architectures, custom REST APIs, real-time WebSocket telemetry, and serverless microservices.",
    highlights: ["Event-Driven Asynchrony", "Real-Time WebSockets", "Serverless Functions", "Express & Fastify Stacks"],
    color: "#339933",
    badgeBg: "rgba(51, 153, 51, 0.12)",
  },
  {
    name: ".NET",
    category: "backend",
    categoryLabel: "Enterprise Platform",
    isProminent: true,
    role: "Mission-Critical Systems",
    description: "Enterprise C# and ASP.NET Core applications built for banking-grade security, enterprise compliance, and heavy transaction volumes.",
    highlights: ["ASP.NET Core Performance", "Enterprise ISO Compliance", "Cross-Platform C# Runtime", "High-Security Cryptography"],
    color: "#512BD4",
    badgeBg: "rgba(81, 43, 212, 0.12)",
  },

  // ADDITIONAL ECOSYSTEM TECHNOLOGIES
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Type Safety",
    isProminent: false,
    role: "Zero-Defect Codebases",
    description: "Strict compile-time type validation preventing production runtime regressions across our frontend and full-stack code.",
    highlights: ["Static Type Safety", "Self-Documenting Code", "Refactoring Reliability"],
    color: "#3178C6",
    badgeBg: "rgba(49, 120, 198, 0.10)",
  },
  {
    name: "JavaScript",
    category: "frontend",
    categoryLabel: "Core Web Language",
    isProminent: false,
    role: "Dynamic Web Engineering",
    description: "Modern ES6+ JavaScript engineered with clean execution loops, async patterns, and lightweight bundle footprints.",
    highlights: ["Modern ES6+ Standards", "DOM Optimization", "Zero-Dependency Micro-libs"],
    color: "#D4B830",
    badgeBg: "rgba(212, 184, 48, 0.12)",
  },
  {
    name: "HTML5",
    category: "frontend",
    categoryLabel: "Semantic Markup",
    isProminent: false,
    role: "SEO & Accessibility Foundation",
    description: "100% semantic HTML structures adhering to W3C standards, ARIA accessibility, and Google bot indexing requirements.",
    highlights: ["Semantic Tagging", "WCAG 2.1 AA Accessibility", "SEO Crawler Clarity"],
    color: "#E34F26",
    badgeBg: "rgba(227, 79, 38, 0.10)",
  },
  {
    name: "CSS3",
    category: "frontend",
    categoryLabel: "Modern Styling",
    isProminent: false,
    role: "Fluid Layouts & GPU Acceleration",
    description: "Modern CSS Grid, Flexbox, responsive fluid typography, and GPU-accelerated micro-animations without layout thrashing.",
    highlights: ["Fluid Responsive Grid", "GPU Hardware Acceleration", "Subtle Micro-animations"],
    color: "#1572B6",
    badgeBg: "rgba(21, 114, 182, 0.10)",
  },
  {
    name: "Angular",
    category: "frontend",
    categoryLabel: "Enterprise Frontend",
    isProminent: false,
    role: "Structured SPA Development",
    description: "Two-way data binding, dependency injection, and scalable architecture for complex corporate enterprise web portals.",
    highlights: ["Enterprise Architecture", "Strict Dependency Injection", "Comprehensive CLI"],
    color: "#DD0031",
    badgeBg: "rgba(221, 0, 49, 0.10)",
  },
  {
    name: "Vue.js",
    category: "frontend",
    categoryLabel: "Progressive Framework",
    isProminent: false,
    role: "Lightweight Reactive SPAs",
    description: "Progressive JavaScript framework for fast UI implementations, component-driven microfrontends, and Nuxt.js SSR.",
    highlights: ["Reactivity Engine", "Nuxt.js Full-Stack", "Lightweight Bundle Size"],
    color: "#4FC08D",
    badgeBg: "rgba(79, 192, 141, 0.10)",
  },
  {
    name: "Python",
    category: "backend",
    categoryLabel: "Data & Backend",
    isProminent: false,
    role: "Data Pipelines & Automation",
    description: "Custom scraping pipelines, data aggregation engines, algorithmic scoring scripts, and automated marketing workflows.",
    highlights: ["Automated Data Pipelines", "SEO Auditing Scripts", "AI & ML Model Integrations"],
    color: "#3776AB",
    badgeBg: "rgba(55, 118, 171, 0.10)",
  },
  {
    name: "Django",
    category: "backend",
    categoryLabel: "Python Framework",
    isProminent: false,
    role: "Secure Rapid Web Portals",
    description: "Batteries-included framework offering built-in CSRF/SQLi protection, high-efficiency ORM, and rapid dashboard prototyping.",
    highlights: ["Built-In Security Suite", "Django REST Framework", "Scalable Relational ORM"],
    color: "#092E20",
    badgeBg: "rgba(9, 46, 32, 0.12)",
  },
  {
    name: "MySQL",
    category: "database",
    categoryLabel: "Relational Database",
    isProminent: false,
    role: "ACID Relational Storage",
    description: "Clustered MySQL relational storage configured for high concurrency, complex join queries, and reliable automated backups.",
    highlights: ["ACID Compliance", "Query Index Tuning", "Automated Failover & Backups"],
    color: "#4479A1",
    badgeBg: "rgba(68, 121, 161, 0.10)",
  },
  {
    name: "MongoDB",
    category: "database",
    categoryLabel: "Document NoSQL",
    isProminent: false,
    role: "High-Velocity Unstructured Data",
    description: "Document-oriented NoSQL database for rapid schema iteration, catalog scaling, user tracking, and real-time event logs.",
    highlights: ["Flexible JSON Schema", "Horizontal Sharding", "Aggregated Analytics"],
    color: "#47A248",
    badgeBg: "rgba(71, 162, 72, 0.10)",
  },
  {
    name: "Magento",
    category: "cms-ecommerce",
    categoryLabel: "Enterprise Commerce",
    isProminent: false,
    role: "B2B & Massive Catalog Stores",
    description: "Heavy-duty Adobe Commerce/Magento builds supporting 100,000+ SKUs, tiered B2B pricing, and multi-warehouse logistics.",
    highlights: ["Multi-Storefront Management", "Tiered Wholesale Pricing", "Complex ERP Integration"],
    color: "#EE672F",
    badgeBg: "rgba(238, 103, 47, 0.10)",
  },
  {
    name: "Webflow",
    category: "cms-ecommerce",
    categoryLabel: "Visual CMS",
    isProminent: false,
    role: "Rapid Design-Led Marketing Sites",
    description: "Production-grade Webflow builds with clean semantic code, custom JavaScript interactions, and client-friendly visual editing.",
    highlights: ["Pixel-Perfect Figma Conversion", "Client-First CMS Structure", "No-Code Marketing Agility"],
    color: "#4353FF",
    badgeBg: "rgba(67, 83, 255, 0.10)",
  },
];

export default function TechStack({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TechCategory>("all");

  const filteredTechnologies =
    activeTab === "all"
      ? ALL_TECHNOLOGIES
      : ALL_TECHNOLOGIES.filter((t) => t.category === activeTab);

  const prominentTechnologies = ALL_TECHNOLOGIES.filter((t) => t.isProminent);

  return (
    <section className={`relative overflow-hidden bg-ink py-20 md:py-28 ${className}`}>
      {/* Decorative gradient blur background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-flow/10 blur-[130px] rounded-full" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Eyebrow>ENGINEERING &amp; PLATFORM ECOSYSTEM</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-chalk leading-tight">
            Technologies We Build, Master &amp; Scale
          </h2>
          <p className="mt-4 font-body text-body-l text-muted leading-relaxed">
            From high-conversion eCommerce (<strong>WordPress</strong>, <strong>Shopify</strong>, <strong>WooCommerce</strong>) to mission-critical full-stack applications (<strong>Next.js</strong>, <strong>React</strong>, <strong>Node.js</strong>, <strong>Laravel</strong> &amp; <strong>.NET</strong>) — we architect custom solutions with clean code, sub-second latency, and scalable infrastructure.
          </p>
        </div>

        {/* PROMINENT CORE 9 TECHNOLOGIES (FLAGSHIP DISPLAY) */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal/15 text-signal">
              <Sparkles size={13} />
            </span>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-chalk">
              Primary Competencies &amp; Flagship Frameworks (9 Core Stacks)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {prominentTechnologies.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col justify-between rounded-3xl border border-chalk/15 bg-surface/95 p-6 shadow-md shadow-chalk/5 transition-all duration-300 hover:-translate-y-1 hover:border-flow hover:shadow-xl backdrop-blur-sm"
              >
                <div>
                  {/* Top Bar: Icon/Badge + Category */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl font-mono text-base font-bold text-white shadow-sm"
                        style={{ backgroundColor: tech.color }}
                      >
                        {tech.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-bold text-chalk group-hover:text-flow transition-colors">
                          {tech.name}
                        </h4>
                        <span className="font-mono text-[11px] font-semibold text-flow">
                          {tech.role}
                        </span>
                      </div>
                    </div>

                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-chalk/80 border border-chalk/10"
                      style={{ backgroundColor: tech.badgeBg }}
                    >
                      Core Stack
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 font-body text-xs text-muted leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="mt-5 border-t border-chalk/10 pt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted/70 mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-1.5">
                    {tech.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 font-mono text-xs text-chalk/90">
                        <CheckCircle2 size={12} className="text-flow shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FULL 21 TECHNOLOGIES FILTERABLE EXPLORER */}
        <div className="mt-16 rounded-3xl border border-chalk/15 bg-surface/70 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-chalk/10 pb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-chalk">
                Full Technology Ecosystem (21 Technologies)
              </h3>
              <p className="mt-1 font-body text-xs text-muted">
                Filter by architecture domain or explore our entire engineering toolkit.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Technologies (21)" },
                { id: "cms-ecommerce", label: "CMS & eCommerce" },
                { id: "frontend", label: "Frontend & UI" },
                { id: "backend", label: "Backend & APIs" },
                { id: "database", label: "Databases" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TechCategory)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-flow text-white shadow-sm scale-105"
                      : "border border-chalk/15 bg-surface text-muted hover:border-flow hover:text-chalk"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {filteredTechnologies.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col justify-between rounded-2xl border border-chalk/10 bg-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:border-flow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.isProminent && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-signal bg-signal/10 px-1.5 py-0.5 rounded-full">
                        Flagship
                      </span>
                    )}
                  </div>
                  <h5 className="font-display text-base font-bold text-chalk group-hover:text-flow transition-colors">
                    {tech.name}
                  </h5>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">
                    {tech.categoryLabel}
                  </p>
                </div>
                <p className="mt-3 font-body text-[11px] text-muted/80 line-clamp-2 leading-tight">
                  {tech.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTINUOUS SMOOTH MARQUEE TICKER */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-chalk/10 bg-surface/50 py-4">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
            {[...ALL_TECHNOLOGIES, ...ALL_TECHNOLOGIES].map((tech, idx) => (
              <div key={`${tech.name}-${idx}`} className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-chalk/90">
                  {tech.name}
                </span>
                <span className="text-chalk/20 text-xs">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner below tech stack */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-flow/20 bg-gradient-to-r from-flow/10 via-surface to-signal/10 p-6 md:p-8">
          <div>
            <h4 className="font-display text-xl font-bold text-chalk">
              Have a specific tech stack or legacy architecture in mind?
            </h4>
            <p className="mt-1 font-body text-xs text-muted max-w-xl">
              We audit, refactor, and build scalable solutions across any modern framework. Get a free technical review with our lead software engineers.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-chalk shadow-md transition-colors hover:bg-flow hover:text-white"
          >
            Discuss Your Tech Stack
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
