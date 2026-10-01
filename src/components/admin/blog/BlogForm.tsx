"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Upload,
  Loader2,
  AlertCircle,
  X,
  HelpCircle,
  Heading2,
  Heading3,
  AlignLeft,
  List,
  Check,
} from "lucide-react";
import Button from "@/components/ui/Button";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import BlockEditor, { type InitialBlock } from "./BlockEditor";
import { compressImageFile } from "@/lib/image-compress";
import { parseFullArticle, ParsedArticle } from "@/lib/blogParser";

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
  // Form Field States
  const [title, setTitle] = useState(values?.title ?? "");
  const [slug, setSlug] = useState(values?.slug ?? "");
  const [excerpt, setExcerpt] = useState(values?.excerpt ?? "");
  const [category, setCategory] = useState(values?.category ?? "Web Development");
  const [blocks, setBlocks] = useState<InitialBlock[] | undefined>(values?.blocks);
  const [faqs, setFaqs] = useState<{ a: string; b: string }[] | undefined>(values?.faqs);

  const [blocksKey, setBlocksKey] = useState(0);
  const [faqsKey, setFaqsKey] = useState(0);
  const [excerptKey, setExcerptKey] = useState(0);

  // Image Upload State
  const [imageUrl, setImageUrl] = useState(values?.ogImage ?? "/images/seo-strategy-banner.png");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Scalenut / AI Smart Importer Modal State
  const [showImporter, setShowImporter] = useState(false);
  const [importerText, setImporterText] = useState("");
  const importerHtmlRef = useRef<string>("");
  const [importNotification, setImportNotification] = useState<string | null>(null);

  // Real-time article analysis inside importer
  const detectedArticle: ParsedArticle = useMemo(() => {
    if (!importerText.trim() && !importerHtmlRef.current.trim()) {
      return { title: "", slug: "", excerpt: "", category: "Web Development", blocks: [], faqs: [] };
    }
    return parseFullArticle(importerText, importerHtmlRef.current);
  }, [importerText]);

  const h2Count = detectedArticle.blocks.filter((b) => b.type === "h2").length;
  const h3Count = detectedArticle.blocks.filter((b) => b.type === "h3").length;
  const pCount = detectedArticle.blocks.filter((b) => b.type === "paragraph").length;
  const listCount = detectedArticle.blocks.filter((b) => b.type === "list").length;

  const handleApplyFullArticle = (article: ParsedArticle) => {
    if (article.title) setTitle(article.title);
    if (article.slug) setSlug(article.slug);
    if (article.excerpt) {
      setExcerpt(article.excerpt);
      setExcerptKey((k) => k + 1);
    }
    if (article.category) setCategory(article.category);
    if (article.blocks.length > 0) {
      setBlocks(article.blocks);
      setBlocksKey((k) => k + 1);
    }
    if (article.faqs.length > 0) {
      setFaqs(article.faqs);
      setFaqsKey((k) => k + 1);
    }

    setImportNotification(`Successfully populated "${article.title}" with ${article.blocks.length} blocks and ${article.faqs.length} FAQs!`);
    setShowImporter(false);
    setImporterText("");
    importerHtmlRef.current = "";

    setTimeout(() => {
      setImportNotification(null);
    }, 6000);
  };

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
      {/* ⚡ One-Click Scalenut / AI Smart Importer Card */}
      <div className="rounded-2xl border-2 border-flow/40 bg-gradient-to-r from-flow/15 via-surface to-signal/15 p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-chalk flex items-center gap-2">
            <Sparkles size={18} className="text-signal animate-pulse" />
            1-Click Article Import (Scalenut / AI)
          </h3>
          <p className="font-body text-xs text-muted mt-1">
            Copy your full article from <strong>Scalenut</strong>, ChatGPT, or Google Docs. Automatically extracts Title, Slug, Headings, Lists, and FAQs!
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowImporter(true)}
          className="rounded-xl bg-flow px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:bg-signal transition-all shadow-lg hover:scale-105 cursor-pointer shrink-0"
        >
          ⚡ Quick Paste Scalenut
        </button>
      </div>

      {/* Success Notification Banner */}
      {importNotification && (
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/40 p-3.5 flex items-center gap-3 text-emerald-300 font-body text-xs animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{importNotification}</span>
        </div>
      )}

      {/* Importer Modal */}
      {showImporter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-flow/40 bg-surface p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-chalk/10 pb-3">
              <div>
                <h4 className="font-display text-base font-bold text-chalk flex items-center gap-2">
                  <Sparkles size={18} className="text-signal" />
                  Import Article from Scalenut / AI Content Creator
                </h4>
                <p className="font-body text-xs text-muted mt-0.5">
                  Paste your full text or HTML below. Everything will be parsed and mapped to the blog form automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowImporter(false)}
                className="text-muted hover:text-signal p-1 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <textarea
              value={importerText}
              onChange={(e) => setImporterText(e.target.value)}
              onPaste={(e) => {
                const html = e.clipboardData.getData("text/html");
                if (html && html.trim()) {
                  importerHtmlRef.current = html;
                }
              }}
              rows={12}
              placeholder="Click here and press Ctrl+V to paste your entire article from Scalenut, ChatGPT, Claude, or Google Docs...

It will automatically extract:
• Title (e.g. How Much Does a Server Cost for Your Business in 2027?)
• Slug & Category
• Summary Excerpt
• All H2 and H3 Headings
• Bullet Lists & Key Highlights
• Tables & Pricing
• FAQs and Answers"
              className={`${inputClass} font-mono text-xs`}
            />

            {/* Live Detection Summary */}
            {detectedArticle.title && (
              <div className="rounded-xl border border-flow/20 bg-flow/5 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-flow/15 pb-2.5">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                      Detected Article Title:
                    </span>
                    <h5 className="font-display text-sm font-bold text-chalk mt-0.5">
                      {detectedArticle.title}
                    </h5>
                    <p className="font-mono text-[11px] text-flow mt-0.5">
                      Slug: /{detectedArticle.slug} · Category: {detectedArticle.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 shrink-0">
                    Ready to Import
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="rounded-md bg-flow/15 px-2 py-0.5 text-flow font-bold flex items-center gap-1">
                    <Heading2 size={12} /> {h2Count} H2 Headings
                  </span>
                  <span className="rounded-md bg-flow/15 px-2 py-0.5 text-flow font-bold flex items-center gap-1">
                    <Heading3 size={12} /> {h3Count} H3 Sub-headings
                  </span>
                  <span className="rounded-md bg-chalk/10 px-2 py-0.5 text-chalk font-semibold flex items-center gap-1">
                    <AlignLeft size={12} /> {pCount} Paragraphs
                  </span>
                  {listCount > 0 && (
                    <span className="rounded-md bg-signal/15 px-2 py-0.5 text-signal font-semibold flex items-center gap-1">
                      <List size={12} /> {listCount} Bullet Lists
                    </span>
                  )}
                  {detectedArticle.faqs.length > 0 && (
                    <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 text-emerald-400 font-bold flex items-center gap-1">
                      <HelpCircle size={12} /> {detectedArticle.faqs.length} FAQs
                    </span>
                  )}
                </div>

                {detectedArticle.excerpt && (
                  <div className="border-t border-flow/15 pt-2 text-xs text-muted">
                    <span className="font-mono text-[10px] uppercase font-bold text-chalk/70">
                      Summary Excerpt Preview:
                    </span>
                    <p className="mt-1 line-clamp-2 italic">
                      &quot;{detectedArticle.excerpt}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-chalk/10">
              <button
                type="button"
                onClick={() => {
                  setImporterText("");
                  importerHtmlRef.current = "";
                }}
                className="font-mono text-xs text-muted hover:text-signal transition-colors cursor-pointer"
              >
                Clear
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImporter(false)}
                  className="rounded-lg border border-chalk/20 px-4 py-2 font-mono text-xs text-muted hover:text-chalk cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!detectedArticle.title && detectedArticle.blocks.length === 0}
                  onClick={() => handleApplyFullArticle(detectedArticle)}
                  className="rounded-xl bg-signal px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk hover:bg-signal/90 transition-all shadow-md disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles size={14} />
                  🚀 Populate Everything into Blog Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Metadata Card */}
      <div className={cardClass}>
        <div>
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="Article Title..."
          />
        </div>

        <div className="mt-4">
          <label className={labelClass} htmlFor="slug">
            Slug (leave blank to auto-generate)
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClass}
            placeholder="how-much-does-a-server-cost-for-your-business-in-2027"
          />
        </div>

        <div className="mt-5">
          <RichTextEditor
            key={`excerpt-${excerptKey}`}
            id="excerpt"
            name="excerpt"
            label="Article Summary / Excerpt"
            defaultValue={excerpt}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

      {/* Content Blocks Card with Quick Paste */}
      <div className={cardClass}>
        <BlockEditor
          key={`blocks-${blocksKey}`}
          initial={blocks}
          onImportFullArticle={handleApplyFullArticle}
        />
      </div>

      {/* FAQs Card */}
      <div className={cardClass}>
        <RepeatingPairs
          key={`faqs-${faqsKey}`}
          name="faq"
          label="FAQs"
          aLabel="Question"
          bLabel="Answer"
          initial={faqs}
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
