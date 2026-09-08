"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, ExternalLink, Layers, RotateCcw, TrendingUp } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import WorkIllustration from "@/components/decor/WorkIllustration";
import { cardClass } from "@/components/admin/styles";
import type { CaseStudy } from "@/types";

interface AdminWorkContainerProps {
  items: CaseStudy[];
  deleteAction: (id: string) => Promise<void>;
}

export default function AdminWorkContainer({
  items,
  deleteAction,
}: AdminWorkContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Unique categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category && item.category.trim()) {
        set.add(item.category.trim());
      }
    });
    return Array.from(set).sort();
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter match
      if (selectedCategory !== "ALL" && item.category?.trim() !== selectedCategory) {
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
  }, [items, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-chalk">Work & Case Studies</h1>
          <p className="mt-1 font-body text-sm text-muted">
            Manage portfolio items, client results, and live project showcases displayed on /work.
          </p>
        </div>
        <Link
          href="/admin/work/new"
          className="flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow transition-colors shadow-lg shadow-signal/20 shrink-0"
        >
          <Plus size={15} /> New Case Study
        </Link>
      </div>

      {/* Toolbar & Filters */}
      <div className="rounded-2xl border border-chalk/15 bg-surface p-4 sm:p-5 shadow-xl space-y-4">
        {/* Top Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-chalk/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-chalk">Case Studies Overview:</span>
            <span className="rounded-full bg-chalk/10 px-2.5 py-1 text-muted">
              Total: <strong className="text-chalk">{items.length}</strong>
            </span>
            <span className="rounded-full bg-flow/15 border border-flow/30 px-2.5 py-1 text-flow">
              Categories: <strong>{categories.length}</strong>
            </span>
            {hasActiveFilters && (
              <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-amber-400 font-semibold">
                Showing: <strong>{filteredItems.length}</strong>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 font-mono text-xs text-signal hover:underline cursor-pointer"
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-7 relative">
            <Search size={15} className="absolute left-3.5 top-3 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, category, or results..."
              className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-5 relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories ({items.length})</option>
              {categories.map((cat) => {
                const count = items.filter((i) => i.category?.trim() === cat).length;
                return (
                  <option key={cat} value={cat}>
                    📁 {cat} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Case Studies List */}
      {filteredItems.length === 0 ? (
        <div className={`${cardClass} p-12 text-center space-y-3`}>
          <Layers size={32} className="mx-auto text-muted/50" />
          <h3 className="font-heading text-base font-bold text-chalk">No case studies found</h3>
          <p className="font-body text-xs text-muted max-w-sm mx-auto">
            No projects match your current search query or filter. Try clearing filters or create a new case study.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-2 rounded-xl border border-flow/40 bg-flow/10 px-4 py-2 font-mono text-xs text-flow hover:bg-flow hover:text-ink transition-colors cursor-pointer"
            >
              Clear Search Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const hasCoverImage = Boolean(item.ogImage);
            const liveUrl = item.canonicalOverride;

            return (
              <div
                key={item.id || item.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-chalk/15 bg-surface p-5 space-y-4 hover:border-flow/40 hover:shadow-xl transition-all"
              >
                <div className="space-y-3">
                  {/* Top Thumbnail / Category */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-ink border border-chalk/10">
                    {hasCoverImage ? (
                      <Image
                        src={item.ogImage!}
                        alt={item.client}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center p-2">
                        <WorkIllustration variant={item.variant} />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-emerald-400 border border-emerald-500/30">
                        <TrendingUp size={10} /> {item.resultLabel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-flow font-semibold block">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-chalk group-hover:text-flow transition-colors mt-0.5">
                      {item.client}
                    </h3>
                    <p className="font-body text-xs text-muted leading-relaxed line-clamp-2 mt-1">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between gap-2 border-t border-chalk/10 pt-3 font-mono text-xs">
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[0.7rem] text-flow hover:underline font-semibold"
                    >
                      <ExternalLink size={11} /> Live Site
                    </a>
                  ) : (
                    <span className="text-[0.65rem] text-muted">/{item.slug}</span>
                  )}

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/work/${item.id}/edit`}
                      className="rounded-lg border border-chalk/15 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-muted hover:border-flow hover:text-flow transition-colors"
                    >
                      Edit
                    </Link>
                    {item.id && (
                      <DeleteButton
                        action={deleteAction.bind(null, item.id)}
                        label="case study"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
