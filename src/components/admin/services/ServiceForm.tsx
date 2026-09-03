"use client";

import { useState } from "react";
import Link from "next/link";
import { Image as ImageIcon, CheckCircle2, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";

export interface ServiceFormValues {
  slug?: string;
  index?: string;
  title?: string;
  promise?: string;
  description?: string;
  bullets?: string[];
  faqs?: { a: string; b: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

const SERVICE_PRESET_IMAGES = [
  { label: "Web Development", url: "/images/services/web-development.jpg" },
  { label: "SEO & Rankings", url: "/images/services/seo.jpg" },
  { label: "E-Commerce", url: "/images/services/e-commerce.jpg" },
  { label: "PPC & Google Ads", url: "/images/services/ppc.jpg" },
  { label: "Lead Generation", url: "/images/services/lead-generation.jpg" },
  { label: "Social Media Marketing", url: "/images/services/social-media-marketing.jpg" },
  { label: "Shopify Development", url: "/images/services/shopify-wordpress.jpg" },
  { label: "WordPress Development", url: "/images/services/shopify-wordpress.jpg" },
];

export default function ServiceForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: ServiceFormValues;
}) {
  const [imageUrl, setImageUrl] = useState(
    values?.ogImage ?? "/images/services/seo.jpg"
  );

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="index">
              Index (e.g. 01)
            </label>
            <input
              id="index"
              name="index"
              defaultValue={values?.index ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">
              Slug (leave blank to auto-generate)
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={values?.slug ?? ""}
              placeholder="seo"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={values?.title ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="promise">
            Promise (short tagline)
          </label>
          <input
            id="promise"
            name="promise"
            defaultValue={values?.promise ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <RichTextEditor
            id="description"
            name="description"
            label="Service Full Description"
            defaultValue={values?.description ?? ""}
            rows={5}
            helpText="Detailed overview of what the service delivers. Hyperlinks, bold, lists, and formatting supported."
          />
        </div>
      </div>

      {/* Featured Service Card Image & Visual Manager */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-xl text-chalk">
              <ImageIcon size={18} className="text-flow" /> Service Card & Banner Image
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Select or paste a high-resolution image to show on the &ldquo;What We Do&rdquo; cards, service pages, and SEO previews.
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-flow/30 bg-flow/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-flow font-semibold">
            <Sparkles size={12} /> High-Tech UI
          </span>
        </div>

        {/* Live Image Preview */}
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-chalk/30 bg-ink/80 p-3 shadow-inner">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface border border-chalk/10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Service visual banner preview"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
                No image selected
              </div>
            )}
          </div>
        </div>

        {/* Preset Image Selector */}
        <div className="mt-4 space-y-2">
          <label className={labelClass}>Quick Pick Service Visuals</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_PRESET_IMAGES.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => setImageUrl(preset.url)}
                className={`flex items-center justify-between rounded-xl border-2 p-3 font-mono text-xs text-left transition-all ${
                  imageUrl === preset.url
                    ? "border-flow bg-flow/10 text-flow font-bold"
                    : "border-chalk/20 bg-ink/40 text-muted hover:border-chalk/40 hover:text-chalk"
                }`}
              >
                <span className="truncate">{preset.label}</span>
                {imageUrl === preset.url && (
                  <CheckCircle2 size={14} className="shrink-0 text-flow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Image URL input */}
        <div className="mt-5">
          <label className={labelClass} htmlFor="ogImage">
            Image URL or Path
          </label>
          <input
            id="ogImage"
            name="ogImage"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={inputClass}
            placeholder="/images/services/seo.jpg or https://..."
          />
        </div>
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="bullets"
          label="What's included (bullets)"
          initial={values?.bullets}
        />
      </div>

      <div className={cardClass}>
        <RepeatingPairs
          name="faq"
          label="FAQs"
          aLabel="Question"
          bLabel="Answer"
          initial={values?.faqs}
        />
      </div>

      <SeoFieldset values={{ ...values, ogImage: imageUrl }} />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save service
        </Button>
        <Link
          href="/admin/services"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

