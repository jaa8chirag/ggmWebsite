"use client";

import Link from "next/link";
import { ShieldCheck, Calendar, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SeoFieldset from "@/components/admin/SeoFieldset";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import type { LegalPage } from "@/types";

interface LegalPageFormProps {
  action: (formData: FormData) => void;
  page: LegalPage;
}

export default function LegalPageForm({ action, page }: LegalPageFormProps) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/legal"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-flow transition-colors"
        >
          <ArrowLeft size={14} /> Back to Policies
        </Link>
        <span className="inline-flex items-center gap-1 rounded-full border border-flow/30 bg-flow/10 px-3 py-1 font-mono text-xs text-flow">
          <ShieldCheck size={13} /> /{page.slug}
        </span>
      </div>

      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="title">
            Page Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={page.title}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="subtitle">
            Subtitle / Summary Tagline
          </label>
          <input
            id="subtitle"
            name="subtitle"
            defaultValue={page.subtitle ?? ""}
            placeholder="Short introductory summary"
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="lastUpdated">
              Last Updated Label
            </label>
            <div className="relative">
              <input
                id="lastUpdated"
                name="lastUpdated"
                defaultValue={page.lastUpdated}
                placeholder="August 2026"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">
              URL Slug (Read-only)
            </label>
            <input
              id="slug"
              name="slug"
              readOnly
              value={page.slug}
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
          </div>
        </div>

        {/* Rich Text Editor for Content Body */}
        <div className="mt-6">
          <RichTextEditor
            id="content"
            name="content"
            label="Policy Body & Legal Terms (Rich Text)"
            defaultValue={page.content}
            rows={12}
            helpText="Full legal terms, headings (H2/H3), bullet points, and hyperlinks supported."
          />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            defaultChecked={page.isPublished}
            className="h-4 w-4 rounded border-chalk/30 text-flow focus:ring-flow"
          />
          <label htmlFor="isPublished" className="font-body text-sm text-chalk">
            Published (Visible to public)
          </label>
        </div>
      </div>

      {/* SEO Metadata Fieldset */}
      <SeoFieldset
        values={{
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
        }}
      />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save Changes
        </Button>
        <Link
          href={`/${page.slug}`}
          target="_blank"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk transition-colors"
        >
          Preview Live Page ↗
        </Link>
      </div>
    </form>
  );
}
