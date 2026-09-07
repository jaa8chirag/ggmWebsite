"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Send,
  DollarSign,
  Clock,
  Trash2,
  Tag,
  Briefcase,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  MapPin,
} from "lucide-react";
import { CrmLeadModel, CrmLeadStatus, PaymentStatus, LeadNote } from "@/types";
import { updateLeadAction, addLeadNoteAction, deleteLeadAction } from "@/app/actions/lead";

interface LeadDetailDrawerProps {
  lead: CrmLeadModel | null;
  onClose: () => void;
}

const STATUS_LABELS: Record<CrmLeadStatus, { label: string; color: string; border: string }> = {
  NEW: { label: "New Lead", color: "bg-blue-500/20 text-blue-400", border: "border-blue-500/30" },
  IN_DISCUSSION: { label: "In Discussion", color: "bg-yellow-500/20 text-yellow-400", border: "border-yellow-500/30" },
  QUOTATION_SENT: { label: "Quotation Sent", color: "bg-purple-500/20 text-purple-400", border: "border-purple-500/30" },
  FOLLOWUP_SCHEDULED: { label: "Follow-up Set", color: "bg-cyan-500/20 text-cyan-400", border: "border-cyan-500/30" },
  WON: { label: "Deal Won 🎉", color: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30" },
  LOST: { label: "Deal Lost", color: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30" },
};

const PAYMENT_LABELS: Record<PaymentStatus, { label: string; bg: string; text: string }> = {
  PENDING: { label: "Pending", bg: "bg-rose-500/20", text: "text-rose-400" },
  PARTIAL: { label: "Partial Advance", bg: "bg-amber-500/20", text: "text-amber-400" },
  FULLY_PAID: { label: "Fully Paid 🎉", bg: "bg-emerald-500/20", text: "text-emerald-400" },
};

export default function LeadDetailDrawer({ lead, onClose }: LeadDetailDrawerProps) {
  const router = useRouter();
  const [newNoteText, setNewNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Form states initialized on lead change
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<CrmLeadStatus>("NEW");
  const [approxAmount, setApproxAmount] = useState("");
  const [fixAmount, setFixAmount] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");
  const [balanceDue, setBalanceDue] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PENDING");
  const [quotationSent, setQuotationSent] = useState(false);
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [timelineNotes, setTimelineNotes] = useState<LeadNote[]>([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (lead) {
      setEmail(lead.email || "");
      setCompanyName(lead.companyName || "");
      setLocation(lead.location || "");
      setStatus(lead.status || "NEW");
      setApproxAmount(lead.approxAmount || "");
      setFixAmount(lead.fixAmount || "");
      setAdvancePaid(lead.advancePaid || "");
      setBalanceDue(lead.balanceDue || "");
      setPaymentStatus(lead.paymentStatus || "PENDING");
      setQuotationSent(lead.quotationSent || false);
      setNextFollowUp(lead.nextFollowUp || "");
      setNextPaymentDate(lead.nextPaymentDate || "");
      setTimelineNotes(lead.timelineNotes || []);
    }
  }, [lead]);

  if (!lead) return null;

  // Format WhatsApp Link
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for contacting GGM Technologies regarding ${lead.serviceTitle}.`
  )}`;

  async function handleSaveLead() {
    setIsUpdating(true);
    await updateLeadAction(lead!.id, {
      name: lead!.name,
      phone: lead!.phone,
      email: email || null,
      companyName: companyName || null,
      location: location || null,
      status,
      approxAmount: approxAmount || null,
      fixAmount: fixAmount || null,
      advancePaid: advancePaid || null,
      balanceDue: balanceDue || null,
      paymentStatus,
      quotationSent,
      nextFollowUp: nextFollowUp || null,
      nextPaymentDate: nextPaymentDate || null,
    });
    setIsUpdating(false);
    router.refresh();
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    const text = newNoteText.trim();
    if (!text) return;
    setIsSubmittingNote(true);

    // Optimistic UI update so note appears instantly below!
    const tempNote: LeadNote = {
      id: `temp_${Date.now()}`,
      text: text,
      createdAt: new Date().toISOString(),
      author: "Admin",
    };
    setTimelineNotes([tempNote, ...timelineNotes]);
    setNewNoteText("");

    const res = await addLeadNoteAction(lead!.id, text, "Admin");
    setIsSubmittingNote(false);
    if (res.success && res.notes) {
      setTimelineNotes(res.notes);
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete lead "${lead?.name}"?`)) return;
    setIsDeleting(true);
    await deleteLeadAction(lead!.id);
    setIsDeleting(false);
    router.refresh();
    onClose();
  }

  function setPresetFollowUp(daysFromNow: number, hour: number = 11) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    d.setHours(hour, 0, 0, 0);
    setNextFollowUp(d.toISOString().slice(0, 16));
  }

  function setPresetPaymentDate(daysFromNow: number) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    d.setHours(12, 0, 0, 0);
    setNextPaymentDate(d.toISOString().slice(0, 16));
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6">
        {/* Expanded Drawer Width to max-w-4xl */}
        <div className="w-screen max-w-full lg:max-w-4xl bg-surface border-l border-chalk/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-chalk/15 px-4 py-4 sm:px-8 sm:py-5 bg-ink/80">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flow/20 text-flow border border-flow/30 font-bold font-mono">
                <User size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-heading text-xl font-bold text-chalk truncate max-w-xs">
                    {lead.name}
                  </h2>
                  <span className={`rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider font-semibold border ${STATUS_LABELS[status].color} ${STATUS_LABELS[status].border}`}>
                    {STATUS_LABELS[status].label}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase font-bold ${PAYMENT_LABELS[paymentStatus].bg} ${PAYMENT_LABELS[paymentStatus].text}`}>
                    {PAYMENT_LABELS[paymentStatus].label}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted flex items-center gap-2 mt-1">
                  <Briefcase size={13} className="text-flow" /> {lead.serviceTitle}
                  <span className="text-chalk/30">•</span>
                  <Tag size={13} className="text-muted" /> Source: <strong className="text-chalk">{lead.source}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveLead}
                disabled={isUpdating}
                className="rounded-xl bg-flow px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 disabled:opacity-50 shadow-md shadow-flow/20"
              >
                {isUpdating ? "Saving..." : "Save All Changes"}
              </button>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-muted transition-colors hover:bg-ink hover:text-chalk"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Body Content - 2 Column Layout */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* LEFT COLUMN: Controls, Pricing & Payments (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 border-r border-chalk/10 pr-0 lg:pr-6">

              {/* Client Contact & Company Details */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/40 p-4 space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-chalk flex items-center gap-2">
                  <User size={14} className="text-flow" /> Client Details & Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {/* Mail ID */}
                  <div>
                    <label className="block text-[0.65rem] text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Mail size={11} /> Mail ID
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@company.com"
                      className="w-full rounded-xl border border-chalk/20 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[0.65rem] text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Building2 size={11} /> Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Ltd."
                      className="w-full rounded-xl border border-chalk/20 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[0.65rem] text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin size={11} /> Location / City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Delhi NCR"
                      className="w-full rounded-xl border border-chalk/20 bg-surface px-2.5 py-1.5 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pipeline Status Selector */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/40 p-4 space-y-2">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                  Pipeline Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CrmLeadStatus)}
                  className="w-full rounded-xl border border-chalk/20 bg-surface px-4 py-2.5 font-body text-sm font-semibold text-chalk focus:border-flow focus:outline-none"
                >
                  <option value="NEW">New Lead (Fresh Inquiry)</option>
                  <option value="IN_DISCUSSION">In Discussion (Talks Ongoing)</option>
                  <option value="QUOTATION_SENT">Quotation Sent</option>
                  <option value="FOLLOWUP_SCHEDULED">Follow-up Scheduled</option>
                  <option value="WON">Deal Won 🎉 (Client Onboarded)</option>
                  <option value="LOST">Deal Lost</option>
                </select>
              </div>

              {/* Pricing & Quotation Details */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/40 p-4 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-flow flex items-center gap-2">
                  <DollarSign size={14} /> Pricing & Quotation Controls
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[0.7rem] text-muted uppercase tracking-wider mb-1">
                      Approx Budget / Estimate
                    </label>
                    <input
                      type="text"
                      value={approxAmount}
                      onChange={(e) => setApproxAmount(e.target.value)}
                      placeholder="e.g. ₹25,000"
                      className="w-full rounded-xl border border-chalk/20 bg-surface px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                    />
                    <span className="font-mono text-[0.65rem] text-muted/70 mt-0.5 block">Approx kitna bola hai</span>
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] text-flow font-semibold uppercase tracking-wider mb-1">
                      Fixed Agreed Price
                    </label>
                    <input
                      type="text"
                      value={fixAmount}
                      onChange={(e) => setFixAmount(e.target.value)}
                      placeholder="e.g. ₹28,000"
                      className="w-full rounded-xl border border-flow/40 bg-surface px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                    />
                    <span className="font-mono text-[0.65rem] text-muted/70 mt-0.5 block">Fix price final</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-chalk/10">
                  <label className="font-body text-xs text-chalk flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quotationSent}
                      onChange={(e) => setQuotationSent(e.target.checked)}
                      className="h-4 w-4 rounded border-chalk/30 bg-surface text-flow focus:ring-flow"
                    />
                    Quotation Sent to Client?
                  </label>
                  <span className={`px-2.5 py-1 rounded font-mono text-[0.65rem] uppercase font-bold ${quotationSent ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-chalk/10 text-muted'}`}>
                    {quotationSent ? "YES - SENT" : "NO - PENDING"}
                  </span>
                </div>
              </div>

              {/* Advanced Payment Tracker */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-2">
                    <CreditCard size={15} /> Payment & Advance Tracker
                  </h3>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                    className="rounded-lg border border-emerald-500/40 bg-surface px-3 py-1 font-mono text-xs font-bold text-emerald-400 focus:outline-none"
                  >
                    <option value="PENDING">Pending (No Payment)</option>
                    <option value="PARTIAL">Partial Advance</option>
                    <option value="FULLY_PAID">Fully Paid 🎉</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[0.7rem] text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
                      Advance Paid by Client
                    </label>
                    <input
                      type="text"
                      value={advancePaid}
                      onChange={(e) => setAdvancePaid(e.target.value)}
                      placeholder="e.g. ₹10,000"
                      className="w-full rounded-xl border border-emerald-500/30 bg-surface px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[0.7rem] text-amber-400 uppercase tracking-wider mb-1 font-semibold">
                      Balance Pending / Remaining
                    </label>
                    <input
                      type="text"
                      value={balanceDue}
                      onChange={(e) => setBalanceDue(e.target.value)}
                      placeholder="e.g. ₹18,000"
                      className="w-full rounded-xl border border-amber-500/30 bg-surface px-3 py-2 font-body text-xs text-chalk placeholder-muted/50 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Next Payment Collection Scheduler */}
                <div className="pt-2 border-t border-chalk/10">
                  <label className="block font-mono text-[0.7rem] text-muted uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <Calendar size={12} /> Next Payment Collection Date ("Agla paisa kab lena hai")
                    </span>
                    {nextPaymentDate && (
                      <button
                        type="button"
                        onClick={() => setNextPaymentDate("")}
                        className="text-rose-400 hover:underline text-[0.65rem]"
                      >
                        Clear Date
                      </button>
                    )}
                  </label>
                  <input
                    type="datetime-local"
                    value={nextPaymentDate ? new Date(nextPaymentDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setNextPaymentDate(e.target.value)}
                    className="w-full rounded-xl border border-amber-500/30 bg-surface px-3 py-2 font-body text-xs text-chalk focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 mt-2 font-mono text-[0.65rem]">
                    <span className="text-muted">Quick Set:</span>
                    <button
                      type="button"
                      onClick={() => setPresetPaymentDate(3)}
                      className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-amber-400 border border-chalk/20"
                    >
                      In 3 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetPaymentDate(7)}
                      className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-amber-400 border border-chalk/20"
                    >
                      In 7 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetPaymentDate(15)}
                      className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-amber-400 border border-chalk/20"
                    >
                      In 15 Days
                    </button>
                  </div>
                </div>
              </div>

              {/* Call Follow-up Scheduler */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/40 p-4 space-y-3">
                <label className="block font-mono text-[0.7rem] text-muted uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-flow font-semibold">
                    <Calendar size={13} /> Next Call / Discussion Follow-up Date
                  </span>
                  {nextFollowUp && (
                    <button
                      type="button"
                      onClick={() => setNextFollowUp("")}
                      className="text-rose-400 hover:underline text-[0.65rem]"
                    >
                      Clear Date
                    </button>
                  )}
                </label>
                <input
                  type="datetime-local"
                  value={nextFollowUp ? new Date(nextFollowUp).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full rounded-xl border border-chalk/20 bg-surface px-3 py-2 font-body text-xs text-chalk focus:border-flow focus:outline-none"
                />
                <div className="flex items-center gap-2 font-mono text-[0.65rem]">
                  <span className="text-muted">Quick Set:</span>
                  <button
                    type="button"
                    onClick={() => setPresetFollowUp(1)}
                    className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-flow border border-chalk/20"
                  >
                    Tomorrow 11 AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetFollowUp(3)}
                    className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-flow border border-chalk/20"
                  >
                    In 3 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetFollowUp(7)}
                    className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-flow border border-chalk/20"
                  >
                    Next Week
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Client Discussion Notes & History Timeline (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-chalk flex items-center gap-2">
                  <Clock size={15} className="text-flow" /> Discussion History & Notes ({timelineNotes.length})
                </h3>
              </div>

              {/* Add New Note Logger */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Log client talk (e.g. Client agreed on ₹28k fixed price, promised ₹10k advance payment by Friday)..."
                    className="w-full rounded-2xl border border-chalk/25 bg-ink p-3.5 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNoteText.trim()}
                    className="absolute right-3 bottom-3.5 flex items-center gap-1.5 rounded-xl bg-flow px-3.5 py-1.5 font-mono text-xs font-bold text-ink hover:bg-flow/90 disabled:opacity-40 shadow"
                  >
                    <Send size={12} /> Add Note
                  </button>
                </div>
              </form>

              {/* Scrollable Notes List */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {timelineNotes && timelineNotes.length > 0 ? (
                  timelineNotes.map((note, index) => (
                    <div
                      key={note.id || index}
                      className="rounded-2xl border border-chalk/15 bg-ink/60 p-4 space-y-2 transition-all hover:border-chalk/30"
                    >
                      <div className="flex items-center justify-between font-mono text-[0.65rem]">
                        <span className="rounded-md bg-flow/15 px-2 py-0.5 font-bold text-flow border border-flow/30">
                          {note.author || "Admin"}
                        </span>
                        <span className="text-muted/70">
                          {new Date(note.createdAt).toLocaleString("en-IN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="font-body text-xs text-chalk whitespace-pre-wrap leading-relaxed">
                        {note.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-chalk/20 p-8 text-center font-mono text-xs text-muted">
                    No discussion notes recorded yet. Add the first note above.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="border-t border-chalk/15 px-8 py-4 bg-ink/90 flex items-center justify-between">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 font-mono text-xs text-rose-400 transition-colors hover:bg-rose-500/20 disabled:opacity-50"
            >
              <Trash2 size={15} /> Delete Lead
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-chalk/20 px-5 py-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-chalk"
              >
                Close
              </button>
              <button
                onClick={handleSaveLead}
                disabled={isUpdating}
                className="rounded-xl bg-flow px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
