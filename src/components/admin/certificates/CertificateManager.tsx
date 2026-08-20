"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  Plus,
  ShieldCheck,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { createCertificate, deleteCertificate } from "@/app/admin/(dashboard)/certificates/actions";
import type { CertificateDocument } from "@/types";

interface CertificateManagerProps {
  initialCertificates: CertificateDocument[];
}

export default function CertificateManager({
  initialCertificates,
}: CertificateManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Please upload a valid PDF document (.pdf)");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "certificates");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed");
      }

      setUploadedPdfUrl(json.url);
      setUploadSuccess(`Uploaded "${file.name}" successfully!`);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload PDF");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Certificates List */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-flow" />
            <h3 className="font-display text-lg font-bold text-chalk">
              Official Certificates &amp; Verification PDFs
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 rounded-full border border-flow/40 bg-flow/15 px-3.5 py-1.5 font-mono text-xs font-semibold text-flow hover:bg-flow hover:text-white transition-colors"
          >
            <Plus size={14} /> {showAddForm ? "Hide Form" : "Upload New Certificate"}
          </button>
        </div>

        <p className="mt-1 font-body text-xs text-muted">
          Manage Government MSME certificates, GST registration forms, ISO badges, and Google Partner credentials.
        </p>

        {/* Certificate Cards */}
        <div className="mt-6 space-y-4">
          {initialCertificates.length === 0 ? (
            <p className="font-mono text-xs text-muted/60 py-4 text-center">
              No certificates uploaded yet. Click &quot;Upload New Certificate&quot; above.
            </p>
          ) : (
            initialCertificates.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-chalk/15 bg-ink/40 p-4 hover:border-chalk/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flow/10 text-flow">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-chalk">
                      {cert.title}
                    </h4>
                    <p className="font-mono text-xs text-muted/80">
                      Issuer: <span className="text-flow">{cert.issuer}</span> · No:{" "}
                      <span className="text-chalk">{cert.certificateNo}</span>
                      {cert.issueDate && ` · (${cert.issueDate})`}
                    </p>
                    {cert.description && (
                      <p className="mt-1 font-body text-xs text-muted line-clamp-1">
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-xl border border-chalk/20 bg-surface px-3 py-1.5 font-mono text-xs text-muted hover:text-flow hover:border-flow/40 transition-colors"
                  >
                    <ExternalLink size={12} /> View PDF
                  </a>

                  <form action={deleteCertificate.bind(null, cert.id)}>
                    <button
                      type="submit"
                      title="Delete Certificate"
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add New Certificate Form */}
      {showAddForm && (
        <form
          action={async (formData: FormData) => {
            await createCertificate(formData);
            setShowAddForm(false);
            setUploadedPdfUrl("");
            setUploadSuccess("");
          }}
          className={`${cardClass} border-flow/40 bg-surface shadow-xl space-y-4`}
        >
          <div className="flex items-center gap-2 border-b border-chalk/15 pb-3">
            <Plus size={16} className="text-flow" />
            <h4 className="font-display text-base font-bold text-chalk">
              Add New Official Certificate &amp; Upload PDF
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="cert-title">
                Certificate Title *
              </label>
              <input
                id="cert-title"
                name="title"
                required
                placeholder="e.g. ISO 9001:2015 Quality Certificate"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cert-issuer">
                Issuing Organization / Govt. Dept *
              </label>
              <input
                id="cert-issuer"
                name="issuer"
                required
                placeholder="e.g. Ministry of MSME / Google"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="cert-no">
                Registration / Certificate No. *
              </label>
              <input
                id="cert-no"
                name="certificateNo"
                required
                placeholder="e.g. UDYAM-DL-08-0098741"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cert-year">
                Issue Year / Validity
              </label>
              <input
                id="cert-year"
                name="issueDate"
                placeholder="e.g. 2026 - Present"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="cert-desc">
              Description / Credential Scope
            </label>
            <input
              id="cert-desc"
              name="description"
              placeholder="Short note about what this certification verifies"
              className={inputClass}
            />
          </div>

          {/* PDF File Uploader Box */}
          <div className="rounded-2xl border-2 border-dashed border-flow/30 bg-flow/5 p-5 text-center">
            <label
              htmlFor="pdf-file-input"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flow/15 text-flow mb-2">
                {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
              </div>
              <p className="font-display text-sm font-bold text-chalk">
                Click to Upload Certificate PDF
              </p>
              <p className="font-mono text-xs text-muted mt-1">
                Supports official .PDF files up to 25MB
              </p>
              <input
                id="pdf-file-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>

            {uploadSuccess && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 font-mono text-xs text-emerald-400">
                <CheckCircle size={13} /> {uploadSuccess}
              </div>
            )}

            {uploadError && (
              <p className="mt-2 font-mono text-xs text-red-400">
                {uploadError}
              </p>
            )}
          </div>

          {/* PDF URL Input (Auto-filled by Uploader or manual input) */}
          <div>
            <label className={labelClass} htmlFor="cert-pdfUrl">
              PDF Document Path / URL *
            </label>
            <input
              id="cert-pdfUrl"
              name="pdfUrl"
              required
              value={uploadedPdfUrl}
              onChange={(e) => setUploadedPdfUrl(e.target.value)}
              placeholder="/uploads/certificates/my-certificate.pdf"
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="signal" disabled={isUploading || !uploadedPdfUrl}>
              Save Certificate &amp; Publish
            </Button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-full border border-chalk/20 px-4 py-2 font-mono text-xs uppercase text-muted hover:text-chalk"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
