"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { labelClass, inputClass } from "@/components/admin/styles";
import { compressImageFile } from "@/lib/image-compress";

interface SettingsImageUploaderProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | null;
  helpText?: string;
  folder?: string;
  aspectRatio?: "square" | "banner" | "wide";
}

export default function SettingsImageUploader({
  id,
  name,
  label,
  defaultValue = "",
  helpText,
  folder = "settings",
  aspectRatio = "wide",
}: SettingsImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");
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
      formData.append("folder", folder);

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

  const aspectClass =
    aspectRatio === "square"
      ? "h-24 w-24 rounded-2xl"
      : aspectRatio === "banner"
      ? "aspect-[21/9] w-full max-w-lg rounded-2xl"
      : "aspect-[16/9] w-full max-w-md rounded-2xl";

  return (
    <div className="rounded-2xl border border-chalk/20 bg-ink/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-flow flex items-center gap-2">
          <ImageIcon size={16} /> {label}
        </h4>
      </div>

      {helpText && (
        <p className="font-mono text-[0.7rem] text-muted">{helpText}</p>
      )}

      {/* Upload File Input */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-chalk/25 bg-surface px-4 py-2 font-mono text-xs text-chalk hover:border-flow hover:text-flow cursor-pointer transition-colors">
            {isUploading ? (
              <Loader2 size={15} className="animate-spin text-flow" />
            ) : (
              <Upload size={15} className="text-flow" />
            )}
            <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
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
              <CheckCircle2 size={13} /> Uploaded!
            </span>
          )}
        </div>
        {uploadError && (
          <p className="font-mono text-xs text-rose-400 flex items-center gap-1">
            <AlertCircle size={13} /> {uploadError}
          </p>
        )}
      </div>

      {/* URL Input */}
      <div>
        <label className={labelClass} htmlFor={id}>
          Or Image URL Path:
        </label>
        <input
          id={id}
          name={name}
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setUploadSuccess(false);
          }}
          placeholder="/uploads/settings/image.png or https://..."
          className={inputClass}
        />
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="space-y-2 pt-2 border-t border-chalk/10">
          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <span>Live Preview:</span>
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="text-signal hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X size={12} /> Clear
            </button>
          </div>
          <div className={`relative overflow-hidden border border-chalk/20 bg-ink ${aspectClass}`}>
            <Image
              src={imageUrl}
              alt={label}
              fill
              className="object-cover"
              onError={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
