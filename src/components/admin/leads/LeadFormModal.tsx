"use client";

import { useState } from "react";
import { X, User, Phone, Mail, DollarSign, Calendar, FileText, CheckSquare, Tag } from "lucide-react";
import { createLeadAction } from "@/app/actions/lead";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "General Consultation",
  "SEO Services & Optimization",
  "Google Ads & PPC Campaign",
  "Social Media Marketing (SMM)",
  "E-commerce Website Development",
  "Custom Web Application",
  "Guest Posting & Backlinks",
  "Graphic Design & Branding",
  "Mobile App Development",
  "Real Estate Lead Generation",
];

const SOURCE_OPTIONS = [
  "MANUAL",
  "PHONE_CALL",
  "WHATSAPP",
  "REFERRAL",
  "GOOGLE_ADS",
  "META_ADS",
  "OFFLINE",
  "WEBSITE",
];

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await createLeadAction(formData);

    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || "Failed to create lead.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-chalk/20 bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-chalk/15 px-6 py-4 bg-ink/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flow/20 text-flow border border-flow/30">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-chalk">Add Manual Lead</h3>
              <p className="font-mono text-xs text-muted">Create offline call, WhatsApp, or referral lead</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-ink hover:text-chalk"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="rounded-xl border border-signal/40 bg-signal/10 p-3 text-xs font-mono text-signal">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lead Name */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Client / Lead Name *
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-muted" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 pl-9 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Mobile / WhatsApp *
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-muted" />
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="e.g. +91 9876543210"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 pl-9 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-muted" />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. client@example.com"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 pl-9 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Lead Source
              </label>
              <div className="relative">
                <Tag size={16} className="absolute left-3 top-3 text-muted" />
                <select
                  name="source"
                  defaultValue="MANUAL"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 pl-9 font-body text-sm text-chalk focus:border-flow focus:outline-none appearance-none"
                >
                  <option value="MANUAL">Manual Offline Call</option>
                  <option value="WHATSAPP">Direct WhatsApp</option>
                  <option value="PHONE_CALL">Phone Inquiry</option>
                  <option value="REFERRAL">Client Referral</option>
                  <option value="GOOGLE_ADS">Google Ads Campaign</option>
                  <option value="META_ADS">Meta / Instagram Ads</option>
                  <option value="WEBSITE">Website Form</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Title */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Service / Requirement
              </label>
              <select
                name="serviceTitle"
                defaultValue="SEO Services & Optimization"
                className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 font-body text-sm text-chalk focus:border-flow focus:outline-none"
              >
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider">
                Initial Pipeline Status
              </label>
              <select
                name="status"
                defaultValue="NEW"
                className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 font-body text-sm text-chalk focus:border-flow focus:outline-none"
              >
                <option value="NEW">New Lead (Fresh Inquiry)</option>
                <option value="IN_DISCUSSION">In Discussion (Talks Ongoing)</option>
                <option value="QUOTATION_SENT">Quotation Sent</option>
                <option value="FOLLOWUP_SCHEDULED">Follow-up Scheduled</option>
                <option value="WON">Deal Won (Client Onboarded)</option>
                <option value="LOST">Deal Lost</option>
              </select>
            </div>
          </div>

          {/* Pricing Section (Approx vs Fix) */}
          <div className="rounded-xl border border-chalk/15 bg-ink/40 p-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-flow flex items-center gap-2">
              <DollarSign size={14} /> Pricing & Quotation Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Approx Amount */}
              <div>
                <label className="block font-mono text-xs text-muted mb-1 font-medium">
                  Approx Budget / Quoted Estimate (Approx kitna bola hai)
                </label>
                <input
                  type="text"
                  name="approxAmount"
                  placeholder="e.g. ₹25,000 - ₹30,000"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
              </div>

              {/* Fix Amount */}
              <div>
                <label className="block font-mono text-xs text-muted mb-1 font-medium">
                  Agreed Fixed Price (Fix Kitna price hua hai)
                </label>
                <input
                  type="text"
                  name="fixAmount"
                  placeholder="e.g. ₹28,000 Final"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Quotation Sent Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="quotationSentModal"
                  name="quotationSent"
                  value="true"
                  className="h-4 w-4 rounded border-chalk/30 bg-ink text-flow focus:ring-flow"
                />
                <label htmlFor="quotationSentModal" className="font-body text-sm text-chalk cursor-pointer select-none">
                  Quotation PDF / Estimate Sent to Client?
                </label>
              </div>

              {/* Next Follow Up */}
              <div>
                <label className="block font-mono text-xs text-muted mb-1 font-medium flex items-center gap-1.5">
                  <Calendar size={12} /> Next Follow-up Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="nextFollowUp"
                  className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Initial Discussion Notes */}
          <div>
            <label className="block font-mono text-xs text-muted mb-1 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} /> Initial Discussion Notes (Client Discussion Log)
            </label>
            <textarea
              name="initialNote"
              rows={3}
              placeholder="e.g. Client called regarding E-commerce website. Explained project scope and promised quotation by tomorrow evening."
              className="w-full rounded-xl border border-chalk/20 bg-ink p-3 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-chalk/15">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-chalk/25 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:bg-ink hover:text-chalk"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-flow px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 disabled:opacity-50"
            >
              {loading ? "Saving Lead..." : "Save Lead to CRM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
