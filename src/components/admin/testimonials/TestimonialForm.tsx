"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { compressImageFile } from "@/lib/image-compress";

export interface TestimonialFormValues {
  quote?: string;
  name?: string;
  role?: string;
  avatar?: string | null;
  published?: boolean;
}

export default function TestimonialForm({
  action,
  values,
}: {
  action: (formData: FormData) => void;
  values?: TestimonialFormValues;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string>(values?.avatar || "");
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
      formData.append("folder", "testimonials");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl(data.url);
        setUploadSuccess(true);
      } else {
        setUploadError(data.error || "Failed to upload client photo.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload client photo.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={action} className="max-w-lg space-y-6">
      <div className={cardClass}>
        <div>
          <RichTextEditor
            id="quote"
            name="quote"
            label="Client Quote / Feedback"
            required
            rows={4}
            defaultValue={values?.quote ?? ""}
            helpText="Client testimonial text. Links and formatting supported."
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={values?.name ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="role">
              Role / Company
            </label>
            <input
              id="role"
              name="role"
              defaultValue={values?.role ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        {/* Client Avatar / Photo Upload */}
        <div className="mt-5 rounded-2xl border border-chalk/20 bg-ink/40 p-4 space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-flow flex items-center gap-2">
            <ImageIcon size={16} /> Client Photo / Avatar Image
          </h4>

          <div className="space-y-2">
            <label className="block font-mono text-[0.7rem] text-muted uppercase">
              Upload Client Photo From Device:
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-chalk/25 bg-surface px-4 py-2 font-mono text-xs text-chalk hover:border-flow hover:text-flow cursor-pointer transition-colors">
                {isUploading ? (
                  <Loader2 size={15} className="animate-spin text-flow" />
                ) : (
                  <Upload size={15} className="text-flow" />
                )}
                <span>{isUploading ? "Uploading..." : "Choose Photo File"}</span>
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
                  <CheckCircle2 size={13} /> Photo Uploaded!
                </span>
              )}
            </div>
            {uploadError && (
              <p className="font-mono text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={13} /> {uploadError}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="avatar">
              Or Photo URL / Path:
            </label>
            <input
              id="avatar"
              name="avatar"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setUploadSuccess(false);
              }}
              placeholder="/uploads/testimonials/client-photo.jpg or https://..."
              className={inputClass}
            />
          </div>

          {avatarUrl && (
            <div className="space-y-2 pt-2 border-t border-chalk/10">
              <div className="flex items-center justify-between font-mono text-xs text-muted">
                <span>Photo Preview:</span>
                <button
                  type="button"
                  onClick={() => setAvatarUrl("")}
                  className="text-signal hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X size={12} /> Clear Photo
                </button>
              </div>
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-chalk/20 bg-ink">
                <Image
                  src={avatarUrl}
                  alt="Client Avatar Preview"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
            </div>
          )}
        </div>

        <label className="mt-4 flex items-center gap-2 font-body text-sm text-chalk">
          <input
            type="checkbox"
            name="published"
            defaultChecked={values?.published ?? true}
            className="h-4 w-4 rounded border-chalk/30"
          />
          Published
        </label>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" variant="signal">
          Save testimonial
        </Button>
        <Link
          href="/admin/testimonials"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-chalk"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
