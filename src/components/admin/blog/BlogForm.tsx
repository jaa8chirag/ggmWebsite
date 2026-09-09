"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Sparkles, CheckCircle2, Upload, Loader2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import BlockEditor, { type InitialBlock } from "./BlockEditor";
import { compressImageFile } from "@/lib/image-compress";

export interface BlogFormValues {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: Date | string;
  category?: string;
  status?: string;
  blocks?: InitialBlock[];
  faqs?: { a: string; b: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

function toDateInputValue(date?: Date | string) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

const PRESET_IMAGES = [
  { label: "SEO & Digital Analytics Banner", url: "/images/seo-strategy-banner.png" },
  { label: "Web Development & Code Banner", url: "/images/web-development-banner.png" },
  { label: "Lead Gen & Growth Banner", url: "/images/lead-generation-banner.png" },
];

export default function BlogForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: BlogFormValues;
}) {
  const [imageUrl, setImageUrl] = useState(values?.ogImage ?? "/images/seo-strategy-banner.png");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    if (!rawFile.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const file = await compressImageFile(rawFile);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
        setUploadSuccess(true);
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className={cardClass}>
        <div>
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
          <label className={labelClass} htmlFor="slug">
            Slug (leave blank to auto-generate)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={values?.slug ?? ""}
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <RichTextEditor
            id="excerpt"
            name="excerpt"
            label="Article Summary / Excerpt"
            defaultValue={values?.excerpt ?? ""}
            rows={3}
            helpText="Short teaser displayed on search previews and cards. Formatting and links supported."
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass} htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              defaultValue={values?.category ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={toDateInputValue(values?.date) || toDateInputValue(new Date())}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={values?.status ?? "draft"}
              className={`${inputClass} bg-transparent`}
            >
              <option value="draft" className="bg-surface">
                Draft
              </option>
              <option value="published" className="bg-surface">
                Published
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Image & On-Page/Off-Page Image Manager Card */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-xl text-chalk">
              <ImageIcon size={18} className="text-flow" /> Featured Image & Social Share Media
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Select or upload a high-resolution image for article header, OpenGraph social cards, and Off-Page SEO link previews.
            </p>
          </div>
          <span className="rounded-full border border-flow/30 bg-flow/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-flow font-semibold">
            SEO Ready
          </span>
        </div>

        {/* Live Image Preview */}
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-chalk/30 bg-ink/70 p-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Article featured image preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
                No image selected
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-4 space-y-2">
          <label className="block font-mono text-[0.7rem] text-muted uppercase">
            Upload Image File From Device:
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-chalk/25 bg-surface px-4 py-2 font-mono text-xs text-chalk hover:border-flow hover:text-flow cursor-pointer transition-colors">
              {isUploading ? (
                <Loader2 size={15} className="animate-spin text-flow" />
              ) : (
                <Upload size={15} className="text-flow" />
              )}
              <span>{isUploading ? "Uploading..." : "Choose Image File"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {uploadSuccess && (
              <span className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                <CheckCircle2 size={13} /> Image Uploaded!
              </span>
            )}
          </div>
          {uploadError && (
            <p className="font-mono text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={13} /> {uploadError}
            </p>
          )}
        </div>

        {/* Preset Image Selector */}
        <div className="mt-4 space-y-2">
          <label className={labelClass}>Or Quick Pick Agency Banners</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PRESET_IMAGES.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  setImageUrl(preset.url);
                  setUploadSuccess(false);
                }}
                className={`flex items-center justify-between rounded-xl border-2 p-3 font-mono text-xs text-left transition-all ${
                  imageUrl === preset.url
                    ? "border-flow bg-flow/10 text-flow font-bold"
                    : "border-chalk/20 bg-ink/40 text-muted hover:border-chalk/40"
                }`}
              >
                <span className="truncate">{preset.label}</span>
                {imageUrl === preset.url && <CheckCircle2 size={14} className="shrink-0 text-flow" />}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Image URL input */}
        <div className="mt-5">
          <label className={labelClass} htmlFor="ogImage">
            Custom Image URL or Path
          </label>
          <input
            id="ogImage"
            name="ogImage"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={inputClass}
            placeholder="/images/seo-strategy-banner.png or https://..."
          />
        </div>
      </div>

      <div className={cardClass}>
        <BlockEditor initial={values?.blocks} />
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

      <SeoFieldset values={{ ...values, ogImage: imageUrl }} hideOgImage />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save post
        </Button>
        <Link
          href="/admin/blog"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
