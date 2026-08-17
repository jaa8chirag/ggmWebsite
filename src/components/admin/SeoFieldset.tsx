"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { labelClass, inputClass, cardClass } from "./styles";

export interface SeoValues {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function SeoFieldset({ values }: { values?: SeoValues }) {
  const [title, setTitle] = useState(values?.metaTitle ?? "");
  const [desc, setDesc] = useState(values?.metaDescription ?? "");

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-xl text-chalk">
            <Sparkles size={18} className="text-signal" /> Search Engine Optimization (SEO)
          </p>
          <p className="mt-1 font-body text-xs text-muted">
            Customize search titles, meta descriptions, and Google indexing rules.
          </p>
        </div>
        <span className="rounded-full border border-flow/30 bg-flow/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-flow font-semibold">
          Live Metadata
        </span>
      </div>

      {/* Real-time Google Search Preview Box */}
      <div className="mt-6 rounded-2xl border-2 border-chalk/25 bg-ink/70 p-5 shadow-inner">
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted mb-3">
          <Search size={12} className="text-flow" /> Live Google Search Snippet Preview
        </div>
        <div className="space-y-1">
          <p className="truncate font-mono text-xs text-muted/70">
            https://ggmtechnologies.com › page-slug
          </p>
          <p className="font-display text-lg text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
            {title.trim() || "Default Page Title | GGM Technologies"}
          </p>
          <p className="line-clamp-2 font-body text-xs text-muted">
            {desc.trim() ||
              "Default page description will be served dynamically from database settings if left blank."}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <label className={labelClass} htmlFor="metaTitle">
              Meta Title
            </label>
            <span className="font-mono text-[0.65rem] text-muted">
              {title.length} / 60 chars
            </span>
          </div>
          <input
            id="metaTitle"
            name="metaTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. SEO Services in Delhi NCR | GGM Technologies"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className={labelClass} htmlFor="metaDescription">
              Meta Description
            </label>
            <span className="font-mono text-[0.65rem] text-muted">
              {desc.length} / 155 chars
            </span>
          </div>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Shown in Google search snippet preview above"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="ogImage">
              OG / Social Share Image
            </label>
            <input
              id="ogImage"
              name="ogImage"
              defaultValue={values?.ogImage ?? ""}
              className={inputClass}
              placeholder="/logo/ggm-mark.png"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="canonicalOverride">
              Canonical URL Override
            </label>
            <input
              id="canonicalOverride"
              name="canonicalOverride"
              defaultValue={values?.canonicalOverride ?? ""}
              className={inputClass}
              placeholder="https://ggmtechnologies.com/custom-path"
            />
          </div>
        </div>

        <div className="rounded-xl border border-chalk/20 bg-surface/50 p-4">
          <label className="flex items-center gap-3 font-body text-sm font-medium text-chalk cursor-pointer">
            <input
              type="checkbox"
              name="noIndex"
              defaultChecked={values?.noIndex ?? false}
              className="h-4 w-4 rounded border-2 border-chalk/40 text-signal focus:ring-signal"
            />
            <span>Hide from search engine indexing (<code className="font-mono text-xs text-signal">noindex</code>)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
