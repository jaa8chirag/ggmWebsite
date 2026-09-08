"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface CaseStudyFormValues {
  slug?: string;
  client?: string;
  category?: string;
  summary?: string;
  resultLabel?: string;
  variant?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function CaseStudyForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: CaseStudyFormValues;
}) {
  const [coverImageUrl, setCoverImageUrl] = useState<string>(values?.ogImage || "");

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="client">
            Client / Project Name
          </label>
          <input
            id="client"
            name="client"
            required
            defaultValue={values?.client ?? ""}
            placeholder="e.g. Northline Interiors"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="slug">
            Slug (leave blank to auto-generate)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={values?.slug ?? ""}
            placeholder="e.g. northline-interiors"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="category">
            Category (e.g. SEO · Website Development, PPC · Lead Generation)
          </label>
          <input
            id="category"
            name="category"
            defaultValue={values?.category ?? ""}
            placeholder="e.g. SEO · Website Development"
            className={inputClass}
          />
        </div>

        {/* Cover Image URL */}
        <div className="mt-4">
          <label className={labelClass} htmlFor="ogImage">
            Project Cover Image URL (e.g. /images/work/project.jpg or https://...)
          </label>
          <input
            id="ogImage"
            name="ogImage"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="/images/services/website-development.jpg"
            className={inputClass}
          />
          {coverImageUrl && (
            <div className="mt-3 relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-xl border border-chalk/20 bg-ink">
              <Image
                src={coverImageUrl}
                alt="Cover Preview"
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>
          )}
        </div>

        {/* Live Website Link */}
        <div className="mt-4">
          <label className={labelClass} htmlFor="canonicalOverride">
            Live Website Link URL (optional)
          </label>
          <input
            id="canonicalOverride"
            name="canonicalOverride"
            defaultValue={values?.canonicalOverride ?? ""}
            placeholder="e.g. https://northlineinteriors.com"
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <RichTextEditor
            id="summary"
            name="summary"
            label="Case Study Summary & Results Strategy"
            defaultValue={values?.summary ?? ""}
            rows={4}
            helpText="Brief client project background, solution, and achievements. Markdown supported."
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="resultLabel">
              Result Label Badge (e.g. +312% traffic, 3.9x ROAS)
            </label>
            <input
              id="resultLabel"
              name="resultLabel"
              defaultValue={values?.resultLabel ?? ""}
              placeholder="e.g. +312% Organic Traffic"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="variant">
              Fallback Artwork Theme
            </label>
            <select
              id="variant"
              name="variant"
              defaultValue={values?.variant ?? "interiors"}
              className={`${inputClass} bg-transparent cursor-pointer`}
            >
              <option value="interiors" className="bg-surface">
                Interiors / Design Theme
              </option>
              <option value="fitness" className="bg-surface">
                Fitness / Health Theme
              </option>
              <option value="ecommerce" className="bg-surface">
                Ecommerce / Shopping Theme
              </option>
            </select>
          </div>
        </div>
      </div>

      <SeoFieldset values={values} />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save Case Study
        </Button>
        <Link
          href="/admin/work"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
