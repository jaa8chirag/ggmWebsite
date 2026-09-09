"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Sparkles, CheckCircle2, Upload, Loader2, AlertCircle, X } from "lucide-react";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import SeoFieldset from "@/components/admin/SeoFieldset";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { compressImageFile } from "@/lib/image-compress";

export interface ProductFormValues {
  slug?: string;
  name?: string;
  category?: string;
  price?: number | null;
  originalPrice?: number | null;
  description?: string;
  features?: string[];
  benefits?: string[];
  specs?: { a: string; b: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export default function ProductForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: ProductFormValues;
}) {
  const [imageUrl, setImageUrl] = useState(values?.ogImage ?? "");
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
      formData.append("folder", "shop");

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
          <label className={labelClass} htmlFor="name">
            Product name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={values?.name ?? ""}
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

        <div className="mt-4">
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

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="price">
              Price (₹, leave blank for &quot;Custom quote&quot;)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={values?.price ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="originalPrice">
              Original price (₹, optional strike-through)
            </label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              defaultValue={values?.originalPrice ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <RichTextEditor
            id="description"
            name="description"
            label="Product Full Description"
            defaultValue={values?.description ?? ""}
            rows={5}
            helpText="Detailed breakdown of features, specifications, and links."
          />
        </div>
      </div>

      {/* Featured Product Image Section */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-xl text-chalk">
              <ImageIcon size={18} className="text-flow" /> Product Image & Cover Artwork
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Upload or paste an image URL for the product card, shop showcase, and social share previews.
            </p>
          </div>
          <span className="rounded-full border border-flow/30 bg-flow/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-flow font-semibold">
            Product Media
          </span>
        </div>

        {/* Upload Button */}
        <div className="mt-6 space-y-2">
          <label className="block font-mono text-[0.7rem] text-muted uppercase">
            Upload Custom Image From Device:
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

        {/* Custom Image URL Input */}
        <div className="mt-4">
          <label className={labelClass} htmlFor="ogImage">
            Or Image URL Path:
          </label>
          <input
            id="ogImage"
            name="ogImage"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setUploadSuccess(false);
            }}
            className={inputClass}
            placeholder="/uploads/shop/my-product.jpg or https://..."
          />
        </div>

        {/* Live Image Preview */}
        {imageUrl && (
          <div className="mt-4 space-y-2 pt-2 border-t border-chalk/10">
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span>Image Preview:</span>
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="text-signal hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X size={12} /> Clear Image
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-chalk/20 bg-ink">
              <img
                src={imageUrl}
                alt="Product Preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="features"
          label="What's included"
          initial={values?.features}
        />
      </div>

      <div className={cardClass}>
        <RepeatingText
          name="benefits"
          label="Benefits"
          initial={values?.benefits}
        />
      </div>

      <div className={cardClass}>
        <RepeatingPairs
          name="spec"
          label="Specs"
          aLabel="Label"
          bLabel="Value"
          bMultiline={false}
          initial={values?.specs}
        />
      </div>

      <SeoFieldset values={{ ...values, ogImage: imageUrl }} hideOgImage />

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save product
        </Button>
        <Link
          href="/admin/shop"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
