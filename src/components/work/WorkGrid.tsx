"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ExternalLink, ArrowRight, Sparkles, X, Check, TrendingUp, Layers, Award } from "lucide-react";
import FormattedText from "@/components/ui/FormattedText";
import WorkIllustration from "@/components/decor/WorkIllustration";
import type { CaseStudy } from "@/types";

interface WorkGridProps {
  initialWork: CaseStudy[];
}

const CATEGORY_TABS = [
  { id: "ALL", label: "All Projects" },
  { id: "SEO", label: "SEO & Growth" },
  { id: "WEB", label: "Web Development" },
  { id: "PPC", label: "PPC & Lead Gen" },
  { id: "ECOMMERCE", label: "Shopify & E-Commerce" },
];

export default function WorkGrid({ initialWork }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalItem, setActiveModalItem] = useState<CaseStudy | null>(null);

  // Filtered projects
  const filteredWork = useMemo(() => {
    return initialWork.filter((item) => {
      // Category filter match
      if (selectedCategory !== "ALL") {
        const catUpper = item.category.toUpperCase();
        if (selectedCategory === "SEO" && !catUpper.includes("SEO")) return false;
        if (
          selectedCategory === "WEB" &&
          !catUpper.includes("WEB") &&
          !catUpper.includes("DEVELOPMENT")
        )
          return false;
        if (
          selectedCategory === "PPC" &&
          !catUpper.includes("PPC") &&
          !catUpper.includes("LEAD") &&
          !catUpper.includes("ADS")
        )
          return false;
        if (
          selectedCategory === "ECOMMERCE" &&
          !catUpper.includes("ECOMMERCE") &&
          !catUpper.includes("SHOPIFY")
        )
          return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesClient = item.client.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesResult = item.resultLabel.toLowerCase().includes(q);
        if (!matchesClient && !matchesCat && !matchesSummary && !matchesResult) return false;
      }

      return true;
    });
  }, [initialWork, selectedCategory, searchQuery]);

  return (
    <div className="mt-12 space-y-10">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-chalk/15 bg-surface/80 p-4 sm:p-5 shadow-xl backdrop-blur-xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-xl px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-flow text-ink shadow-md shadow-flow/20 font-bold"
                    : "bg-ink/60 text-muted border border-chalk/15 hover:border-chalk/30 hover:text-chalk"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-3 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, client or result..."
            className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredWork.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-chalk/20 p-16 text-center space-y-4">
          <Layers size={36} className="mx-auto text-muted/50" />
          <h3 className="font-heading text-lg font-bold text-chalk">No case studies found</h3>
          <p className="font-body text-sm text-muted max-w-sm mx-auto">
            No projects match your current filter. Try resetting search or select &quot;All Projects&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="mt-2 rounded-xl bg-flow px-5 py-2.5 font-mono text-xs font-bold text-ink uppercase tracking-wider hover:bg-flow/90 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWork.map((item) => {
            const hasCoverImage = Boolean(item.ogImage);
            const liveUrl = item.canonicalOverride;

            return (
              <div
                key={item.slug || item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-chalk/15 bg-surface/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-flow/40 hover:shadow-2xl hover:shadow-flow/10"
              >
                {/* Top Media Showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                  {hasCoverImage ? (
                    <Image
                      src={item.ogImage!}
                      alt={item.client}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full p-4 flex items-center justify-center bg-gradient-to-br from-ink via-surface to-ink">
                      <WorkIllustration variant={item.variant} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                  {/* Result Badge floating on top */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-ink/80 backdrop-blur-md px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider font-semibold text-chalk border border-chalk/20">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 backdrop-blur-md px-3 py-1 font-mono text-[0.7rem] font-bold text-emerald-400 border border-emerald-500/40 shadow-lg">
                      <TrendingUp size={12} /> {item.resultLabel}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-chalk group-hover:text-flow transition-colors">
                      {item.client}
                    </h3>
                    <FormattedText
                      text={item.summary}
                      as="p"
                      className="font-body text-xs text-muted leading-relaxed line-clamp-3"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-chalk/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="flex items-center gap-1.5 font-mono text-xs font-bold text-flow hover:underline cursor-pointer"
                    >
                      <span>View Breakdown</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg border border-chalk/20 px-2.5 py-1 font-mono text-[0.65rem] text-muted uppercase tracking-wider hover:border-flow hover:text-flow transition-colors"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal Drawer */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-chalk/20 bg-surface shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-chalk/15 pb-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-signal">
                  {activeModalItem.category}
                </span>
                <h2 className="mt-1 font-heading text-2xl font-bold text-chalk">
                  {activeModalItem.client}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="rounded-full p-2 text-muted transition-colors hover:bg-ink hover:text-chalk cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Highlight Banner */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 font-mono text-xs">
              <span className="text-emerald-300 font-semibold flex items-center gap-2">
                <Award size={18} className="text-emerald-400" /> Key Impact Delivered:
              </span>
              <span className="font-bold text-sm text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                {activeModalItem.resultLabel}
              </span>
            </div>

            {/* Cover Image if available */}
            {activeModalItem.ogImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-chalk/15">
                <Image
                  src={activeModalItem.ogImage}
                  alt={activeModalItem.client}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            {/* Project Summary / Details */}
            <div className="space-y-3 font-body text-sm text-muted leading-relaxed">
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-chalk flex items-center gap-2">
                <Sparkles size={14} className="text-flow" /> Case Study Overview & Strategy
              </h4>
              <FormattedText text={activeModalItem.summary} as="div" className="bg-ink/50 p-4 rounded-2xl border border-chalk/10" />
            </div>

            {/* Strategic Deliverables List */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-chalk">
                Key Strategic Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="flex items-center gap-2 rounded-xl border border-chalk/15 bg-ink p-3 text-chalk">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Custom Performance Funnel</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-chalk/15 bg-ink p-3 text-chalk">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Conversion Rate Optimization</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-chalk/15 bg-ink p-3 text-chalk">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>High-Intent Audience Targeting</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-chalk/15 bg-ink p-3 text-chalk">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Transparent KPI Tracking</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-chalk/15">
              {activeModalItem.canonicalOverride ? (
                <a
                  href={activeModalItem.canonicalOverride}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs font-semibold text-flow hover:underline"
                >
                  <ExternalLink size={14} /> Visit Client Website ({activeModalItem.client})
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">GGM Verified Client Case Study</span>
              )}

              <Link
                href="/contact"
                onClick={() => setActiveModalItem(null)}
                className="w-full sm:w-auto rounded-xl bg-signal px-6 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-chalk transition-all hover:bg-flow hover:text-ink shadow-lg shadow-signal/20"
              >
                Get Similar Results For Your Brand ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
