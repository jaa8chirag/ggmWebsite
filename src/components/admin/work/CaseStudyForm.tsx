"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Upload, ExternalLink, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { compressImageFile } from "@/lib/image-compress";

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
  const [liveUrl, setLiveUrl] = useState<string>(values?.canonicalOverride || "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    if (!rawFile.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP, GIF, etc.).");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const file = await compressImageFile(rawFile);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "work");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setCoverImageUrl(data.url);
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
        {/* Client Name */}
        <div>
          <label className={labelClass} htmlFor="client">
            Client / Project Name *
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

        {/* Slug */}
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

        {/* Category */}
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

        {/* =================================================================== */}
        {/* WEBSITE PROJECT IMAGE & SCREENSHOT SECTION                          */}
        {/* =================================================================== */}
        <div className="mt-6 rounded-2xl border border-chalk/20 bg-ink/40 p-4 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-flow flex items-center gap-2">
            <ImageIcon size={16} /> Website Project Cover Screenshot / Image
          </h4>

          {/* Upload Button */}
          <div className="space-y-2">
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

          {/* Or Paste Image URL */}
          <div>
            <label className={labelClass} htmlFor="ogImage">
              Or Image URL Path:
            </label>
            <input
              id="ogImage"
              name="ogImage"
              value={coverImageUrl}
              onChange={(e) => {
                setCoverImageUrl(e.target.value);
                setUploadSuccess(false);
              }}
              placeholder="/uploads/work/my-project.jpg or https://..."
              className={inputClass}
            />
          </div>

          {/* Live Image Preview */}
          {coverImageUrl && (
            <div className="space-y-2 pt-2 border-t border-chalk/10">
              <div className="flex items-center justify-between font-mono text-xs text-muted">
                <span>Image Preview:</span>
                <button
                  type="button"
                  onClick={() => setCoverImageUrl("")}
                  className="text-signal hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X size={12} /> Clear Image
                </button>
              </div>
              <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-chalk/20 bg-ink">
                <Image
                  src={coverImageUrl}
                  alt="Cover Preview"
                  fill
                  className="object-cover object-top"
                  onError={() => {}}
                />
              </div>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* LIVE WEBSITE URL LINK SECTION                                      */}
        {/* =================================================================== */}
        <div className="mt-5 rounded-2xl border border-chalk/20 bg-ink/40 p-4 space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-flow flex items-center gap-2">
            <ExternalLink size={16} /> Live Website Link URL
          </h4>
          <p className="font-mono text-[0.7rem] text-muted">
            Enter the live URL of your completed client website so visitors can visit it directly from the portfolio.
          </p>

          <div className="space-y-2">
            <label className={labelClass} htmlFor="canonicalOverride">
              Live Website URL:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="canonicalOverride"
                name="canonicalOverride"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="e.g. https://northlineinteriors.com"
                className={inputClass}
              />
              {liveUrl && (
                <a
                  href={liveUrl.startsWith("http") ? liveUrl : `https://${liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 rounded-xl border border-chalk/25 bg-surface px-3 py-2.5 font-mono text-xs text-flow hover:bg-flow hover:text-ink transition-colors font-semibold"
                >
                  Test Link <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
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

        {/* Result Label & Variant */}
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

      <SeoFieldset values={values} hideOgImage />

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
