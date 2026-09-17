"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobRole {
  id: string;
  title: string;
  department: "SEO & Growth" | "Web & Tech" | "Creative & Content" | "Business Dev";
  location: string;
  type: string;
  experience: string;
  openings: number;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

const ROLES: JobRole[] = [
  {
    id: "seo-specialist",
    title: "Senior / Mid SEO Specialist",
    department: "SEO & Growth",
    location: "New Delhi (Dwarka) / Hybrid",
    type: "Full-Time",
    experience: "1 - 4 Years",
    openings: 2,
    overview:
      "Take charge of technical SEO audits, algorithmic ranking strategies, on-page optimization, and high-intent backlink strategies across national and international client portfolios.",
    responsibilities: [
      "Conduct in-depth technical audits, Core Web Vitals diagnostics, and crawl budget optimizations.",
      "Formulate data-backed keyword maps, content gap analyses, and schema markup strategies.",
      "Execute safe, 100% white-hat authority-building and digital PR campaigns.",
      "Track, analyze, and present client performance metrics via GSC, GA4, and Ahrefs/Semrush.",
    ],
    requirements: [
      "Proven track record of improving organic rankings and traffic in competitive niches.",
      "Deep understanding of Google Search Essentials, algorithm updates, and rendering pipelines.",
      "Proficiency with Ahrefs, Semrush, Screaming Frog, Google Search Console, and GA4.",
      "Strong analytical mindset and ability to communicate technical SEO findings clearly.",
    ],
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Web Developer (Next.js / TypeScript)",
    department: "Web & Tech",
    location: "New Delhi (Dwarka) / Hybrid",
    type: "Full-Time",
    experience: "1 - 3 Years",
    openings: 2,
    overview:
      "Architect and ship high-performance web applications, headless commerce portals, and modern client platforms built on Next.js, React, Node.js, and modern CSS.",
    responsibilities: [
      "Develop responsive, visually stunning web experiences prioritizing speed, Core Web Vitals, and SEO.",
      "Integrate REST and GraphQL APIs, headless CMS systems, payment gateways, and database models.",
      "Maintain clean code, component architecture, and automated build pipelines.",
      "Collaborate closely with SEO analysts and UI designers to deliver conversion-ready web assets.",
    ],
    requirements: [
      "Hands-on experience with Next.js (App Router), React, TypeScript, and Tailwind CSS.",
      "Solid understanding of backend concepts, SQL/PostgreSQL/MySQL, and REST APIs.",
      "Obsession with performance: sub-second load times, layout stability, and accessibility.",
      "Familiarity with Git, modern deployment flows (Vercel / cloud), and testing.",
    ],
  },
  {
    id: "performance-marketer",
    title: "Performance Marketer (Google & Meta Ads)",
    department: "SEO & Growth",
    location: "New Delhi (Dwarka)",
    type: "Full-Time",
    experience: "1 - 3 Years",
    openings: 1,
    overview:
      "Manage high-ROI paid ad campaigns across Google Ads (Search, Display, Performance Max) and Meta Ads Manager to generate qualified B2B and e-commerce leads.",
    responsibilities: [
      "Structure, launch, and optimize Google Ads search, shopping, and retargeting funnels.",
      "A/B test ad creatives, landing pages, copy angles, and bidding strategies.",
      "Manage conversion tracking, GA4 events, Meta Pixel, and Server-Side GTM setups.",
      "Produce transparent weekly client ROAS and CPA reports.",
    ],
    requirements: [
      "Demonstrated experience managing Google Ads budgets with positive ROAS.",
      "Proficiency with Google Tag Manager, conversion setup, and attribution modeling.",
      "Strong copywriting instinct for ad hooks, headlines, and call-to-actions.",
      "Data-driven mindset with sharp problem-solving capabilities.",
    ],
  },
  {
    id: "content-strategist",
    title: "Content Strategist & Copywriter",
    department: "Creative & Content",
    location: "New Delhi (Dwarka) / Hybrid",
    type: "Full-Time",
    experience: "1 - 3 Years",
    openings: 2,
    overview:
      "Craft compelling, research-backed website copy, long-form editorial content, case studies, and ad scripts that educate searchers and convert traffic into buyers.",
    responsibilities: [
      "Write high-ranking, helpful editorial articles aligned with Google's E-E-A-T guidelines.",
      "Develop engaging copy for landing pages, service brochures, and marketing collateral.",
      "Coordinate with SEO team to optimize topical authority clusters and internal linking.",
      "Proofread, edit, and ensure brand voice consistency across all deliverables.",
    ],
    requirements: [
      "Impeccable English written communication, grammar, and research skills.",
      "Ability to distill complex technical subjects into clear, engaging, reader-friendly prose.",
      "Understanding of search intent, heading hierarchy, and meta tag writing.",
      "Portfolio of published articles, blog posts, or commercial copywriting.",
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX & Visual Designer",
    department: "Creative & Content",
    location: "New Delhi (Dwarka) / Hybrid",
    type: "Full-Time / Contract",
    experience: "1 - 3 Years",
    openings: 1,
    overview:
      "Design modern, high-converting digital interfaces, web design systems, interactive prototypes, and promotional brand graphics for client web properties.",
    responsibilities: [
      "Design clean, responsive website interfaces, wireframes, and design systems in Figma.",
      "Partner with developers to ensure pixel-perfect, accessible component implementations.",
      "Create branded marketing assets, infographics, and social presentation assets.",
      "Iterate on user feedback, usability heuristics, and conversion optimization data.",
    ],
    requirements: [
      "Strong portfolio showcasing modern UI/UX design, typography, and layout sense.",
      "Deep proficiency in Figma, design systems, auto-layout, and interactive components.",
      "Understanding of responsive web grids, mobile-first design, and developer handoff.",
      "Creative flair with high attention to visual detail and micro-interactions.",
    ],
  },
  {
    id: "bde-specialist",
    title: "Business Development & Client Success Associate",
    department: "Business Dev",
    location: "New Delhi (Dwarka)",
    type: "Full-Time",
    experience: "1 - 3 Years",
    openings: 2,
    overview:
      "Drive prospective outreach, qualify inbound enterprise leads, manage consultative sales discussions, and ensure client satisfaction across active contracts.",
    responsibilities: [
      "Engage with inbound leads seeking SEO, website development, and digital marketing services.",
      "Conduct consultative discovery calls, understand client business goals, and present proposals.",
      "Coordinate with technical teams to prepare tailored audits and strategic scopes of work.",
      "Foster long-term client relationships and identify upsell/retention opportunities.",
    ],
    requirements: [
      "Excellent interpersonal, negotiation, and verbal communication skills.",
      "Working knowledge of digital marketing concepts (SEO, PPC, Web Development).",
      "Goal-oriented attitude with dedication to customer service excellence.",
      "Prior experience in an IT agency or digital marketing sales environment preferred.",
    ],
  },
];

const DEPARTMENTS = [
  "All Roles",
  "SEO & Growth",
  "Web & Tech",
  "Creative & Content",
  "Business Dev",
] as const;

export default function OpenPositions() {
  const [selectedDept, setSelectedDept] = useState<string>("All Roles");
  const [expandedId, setExpandedId] = useState<string | null>("seo-specialist");

  const filteredRoles =
    selectedDept === "All Roles"
      ? ROLES
      : ROLES.filter((role) => role.department === selectedDept);

  const scrollToApplication = (roleTitle: string) => {
    const el = document.getElementById("apply-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="open-positions" className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-chalk/15 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-flow/30 bg-flow/10 px-3 py-1 font-mono text-xs font-semibold text-flow">
            <Sparkles size={13} /> Current Openings ({ROLES.length} Active Profiles)
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
            Explore Opportunities at GGM
          </h2>
          <p className="mt-2 font-body text-base text-muted max-w-xl">
            Choose a department below to find your fit. Don’t see your exact role? You can still submit an open application through the form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer",
                selectedDept === dept
                  ? "bg-flow text-white shadow-sm"
                  : "border border-chalk/15 bg-surface text-muted hover:border-chalk/30 hover:text-chalk"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Role Cards List */}
      <div className="mt-8 space-y-5">
        {filteredRoles.map((role) => {
          const isExpanded = expandedId === role.id;

          return (
            <div
              key={role.id}
              className={cn(
                "rounded-3xl border transition-all duration-200 bg-surface/90 shadow-sm backdrop-blur-sm",
                isExpanded
                  ? "border-flow/40 ring-1 ring-flow/20"
                  : "border-chalk/15 hover:border-chalk/30"
              )}
            >
              {/* Card Summary Header */}
              <div
                className="p-6 md:p-8 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : role.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full border border-flow/25 bg-flow/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-flow">
                        {role.department}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-chalk/10 bg-ink/40 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        <MapPin size={11} className="text-flow" /> {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-chalk/10 bg-ink/40 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        <Clock size={11} className="text-signal" /> {role.type}
                      </span>
                      <span className="rounded-full border border-chalk/10 bg-ink/40 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        Exp: {role.experience}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-chalk flex items-center gap-3">
                      {role.title}
                      {role.openings > 1 && (
                        <span className="text-xs font-mono font-medium rounded-md bg-signal/15 text-signal px-2 py-0.5">
                          {role.openings} Openings
                        </span>
                      )}
                    </h3>

                    <p className="font-body text-sm text-muted max-w-3xl leading-relaxed">
                      {role.overview}
                    </p>
                  </div>

                  {/* Actions & Toggle */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToApplication(role.title);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-chalk hover:bg-flow hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      Apply Now <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label={isExpanded ? "Collapse role details" : "Expand role details"}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/15 bg-ink/30 text-muted hover:text-chalk transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details Area */}
              {isExpanded && (
                <div className="border-t border-chalk/10 bg-ink/30 px-6 py-6 md:px-8 md:py-8 rounded-b-3xl animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Key Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                        <Briefcase size={14} className="text-flow" /> Key Responsibilities
                      </h4>
                      <ul className="space-y-2 font-body text-sm text-muted">
                        {role.responsibilities.map((res, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-flow shrink-0 mt-1" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Qualifications & Skills */}
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                        <Sparkles size={14} className="text-signal" /> What We Look For
                      </h4>
                      <ul className="space-y-2 font-body text-sm text-muted">
                        {role.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-signal shrink-0 mt-1" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quick Application Prompt Inside Expanded Card */}
                  <div className="mt-6 pt-5 border-t border-chalk/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-xs text-muted">
                      Ready to apply for <strong className="text-chalk">{role.title}</strong>? Submit your details through the form below.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToApplication(role.title)}
                      className="inline-flex items-center gap-2 rounded-full border border-flow/40 bg-flow/10 px-4 py-2 font-mono text-xs font-semibold text-flow hover:bg-flow hover:text-white transition-all cursor-pointer"
                    >
                      Jump to Application Form <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
