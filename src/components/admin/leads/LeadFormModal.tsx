"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Phone, Mail, DollarSign, Calendar, FileText, Tag, CreditCard, Building2, MapPin, ChevronDown, ChevronUp, Zap } from "lucide-react";
import CountryCodeSelect from "@/components/ui/CountryCodeSelect";
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

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const rawPhone = (formData.get("phone") as string)?.trim() || "";
    if (rawPhone && !rawPhone.startsWith("+")) {
      formData.set("phone", `${countryCode} ${rawPhone}`);
    }

    const res = await createLeadAction(formData);

    setLoading(false);
    if (res.success) {
      router.refresh();
      onClose();
    } else {
      setError(res.error || "Failed to create lead.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-full sm:max-w-lg lg:max-w-xl overflow-hidden rounded-2xl border border-chalk/20 bg-surface shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-chalk/15 px-4 sm:px-6 py-3.5 bg-ink/70 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flow/20 text-flow border border-flow/40 shadow-inner">
              <Zap size={20} className="fill-flow/20" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-base sm:text-lg font-bold text-chalk truncate">Quick Add Lead</h3>
              <p className="font-mono text-[0.7rem] text-muted truncate">Takes only 5 seconds • Fast &amp; Simple</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-ink hover:text-chalk cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {error && (
            <div className="rounded-xl border border-signal/40 bg-signal/10 p-3 text-xs font-mono text-signal">
              {error}
            </div>
          )}

          {/* Core 3 Essential Fields */}
          <div className="space-y-4">
            {/* Client Name */}
            <div>
              <label className="block font-mono text-xs text-chalk mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <User size={13} className="text-flow" /> Client / Lead Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                autoFocus
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-chalk/20 bg-ink px-4 py-2.5 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:ring-1 focus:ring-flow/50 focus:outline-none"
              />
            </div>

            {/* Mobile / WhatsApp */}
            <div>
              <label className="block font-mono text-xs text-chalk mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-400" /> WhatsApp / Mobile Number <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center rounded-xl border border-chalk/20 bg-ink overflow-hidden focus-within:border-flow focus-within:ring-1 focus-within:ring-flow/50">
                <CountryCodeSelect
                  selectedCode={countryCode}
                  onChange={setCountryCode}
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="9876543210"
                  className="w-full bg-transparent px-3.5 py-2.5 font-body text-sm text-chalk placeholder-muted/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Service Title */}
            <div>
              <label className="block font-mono text-xs text-chalk mb-1.5 font-bold uppercase tracking-wider">
                Service / Requirement
              </label>
              <select
                name="serviceTitle"
                defaultValue="SEO Services & Optimization"
                className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2.5 font-body text-sm text-chalk focus:border-flow focus:ring-1 focus:ring-flow/50 focus:outline-none cursor-pointer"
              >
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Note */}
            <div>
              <label className="block font-mono text-xs text-muted mb-1.5 font-semibold flex items-center gap-1.5">
                <FileText size={13} className="text-muted" /> Discussion Note (Optional)
              </label>
              <input
                type="text"
                name="initialNote"
                placeholder="e.g. Wants e-commerce site next month. Call after 5 PM."
                className="w-full rounded-xl border border-chalk/20 bg-ink px-3.5 py-2 font-body text-sm text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Toggle for Advance Details */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-chalk/15 bg-ink/40 hover:bg-ink hover:border-chalk/30 transition-all font-mono text-xs font-semibold text-flow cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <CreditCard size={15} />
                {showAdvanced ? "Hide Extra Details" : "+ Add Budget, Advance Payment or Company (Optional)"}
              </span>
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Collapsible Advanced Section */}
          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t border-chalk/15 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email */}
                <div>
                  <label className="block font-mono text-[0.7rem] text-muted mb-1 font-semibold uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="client@gmail.com"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block font-mono text-[0.7rem] text-muted mb-1 font-semibold uppercase tracking-wider">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Apex Traders"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-mono text-[0.7rem] text-muted mb-1 font-semibold uppercase tracking-wider">
                    City / Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Delhi NCR, Mumbai"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                  />
                </div>

                {/* Lead Source */}
                <div>
                  <label className="block font-mono text-[0.7rem] text-muted mb-1 font-semibold uppercase tracking-wider">
                    Lead Source
                  </label>
                  <select
                    name="source"
                    defaultValue="MANUAL"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none cursor-pointer"
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

              {/* Status & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[0.7rem] text-muted mb-1 font-semibold uppercase tracking-wider">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    defaultValue="NEW"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none cursor-pointer"
                  >
                    <option value="NEW">New Lead (Fresh)</option>
                    <option value="HOT_DEAL">Hot Deal 🔥</option>
                    <option value="IN_DISCUSSION">In Discussion</option>
                    <option value="WON">Deal Won 🎉</option>
                    <option value="LOST">Lost</option>
                  </select>
                </div>

                {/* Next Follow Up */}
                <div>
                  <label className="block font-mono text-[0.7rem] text-cyan-400 mb-1 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} /> Next Follow-up Date
                  </label>
                  <input
                    type="datetime-local"
                    name="nextFollowUp"
                    className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                  />
                </div>
              </div>

              {/* Finance Box */}
              <div className="rounded-xl border border-chalk/15 bg-ink/60 p-3.5 space-y-3">
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-flow">
                  💰 Payment &amp; Advance Tracking
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-[0.65rem] text-muted mb-1">Fixed Deal Amount</label>
                    <input
                      type="text"
                      name="fixAmount"
                      placeholder="e.g. ₹25,000"
                      className="w-full rounded-lg border border-chalk/20 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.65rem] text-emerald-400 mb-1 font-semibold">Advance Received</label>
                    <input
                      type="text"
                      name="advancePaid"
                      placeholder="e.g. ₹10,000"
                      className="w-full rounded-lg border border-emerald-500/30 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block font-mono text-[0.65rem] text-amber-400 mb-1 font-semibold">Balance Due</label>
                    <input
                      type="text"
                      name="balanceDue"
                      placeholder="e.g. ₹15,000"
                      className="w-full rounded-lg border border-amber-500/30 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-chalk/15">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-chalk/25 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:bg-ink hover:text-chalk cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-flow px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 shadow-md shadow-flow/20 disabled:opacity-50 cursor-pointer"
            >
              <Zap size={14} className="fill-ink" />
              {loading ? "Saving..." : "Save Lead Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
