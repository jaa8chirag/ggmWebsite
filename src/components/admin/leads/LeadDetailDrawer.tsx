"use client";

import { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Send,
  DollarSign,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Tag,
  Briefcase,
} from "lucide-react";
import { CrmLeadModel, CrmLeadStatus, LeadNote } from "@/types";
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

export default function LeadDetailDrawer({ lead, onClose }: LeadDetailDrawerProps) {
  const [newNoteText, setNewNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [approxAmount, setApproxAmount] = useState(lead?.approxAmount || "");
  const [fixAmount, setFixAmount] = useState(lead?.fixAmount || "");
  const [quotationSent, setQuotationSent] = useState(lead?.quotationSent || false);
  const [nextFollowUp, setNextFollowUp] = useState(lead?.nextFollowUp || "");
  const [status, setStatus] = useState<CrmLeadStatus>(lead?.status || "NEW");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!lead) return null;

  // Format WhatsApp Link
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for contacting GGM Technologies regarding ${lead.serviceTitle}.`
  )}`;

  async function handleQuickSave() {
    setIsUpdating(true);
    await updateLeadAction(lead!.id, {
      status,
      approxAmount: approxAmount || null,
      fixAmount: fixAmount || null,
      quotationSent,
      nextFollowUp: nextFollowUp || null,
    });
    setIsUpdating(false);
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setIsSubmittingNote(true);

    const res = await addLeadNoteAction(lead!.id, newNoteText.trim(), "Super Admin");
    setIsSubmittingNote(false);
    if (res.success) {
      setNewNoteText("");
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete lead "${lead?.name}"?`)) return;
    setIsDeleting(true);
    await deleteLeadAction(lead!.id);
    setIsDeleting(false);
    onClose();
  }

  // Follow up presets
  function setPresetFollowUp(daysFromNow: number, hour: number = 11) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    d.setHours(hour, 0, 0, 0);
    const isoString = d.toISOString().slice(0, 16); // YYYY-MM-THH:mm
    setNextFollowUp(isoString);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-surface border-l border-chalk/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-chalk/15 px-6 py-5 bg-ink/70">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-flow/20 text-flow border border-flow/30 font-bold font-mono">
                <User size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-lg font-bold text-chalk truncate max-w-[200px]">
                    {lead.name}
                  </h2>
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold border ${STATUS_LABELS[status].color} ${STATUS_LABELS[status].border}`}>
                    {STATUS_LABELS[status].label}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted flex items-center gap-1.5 mt-0.5">
                  <Briefcase size={12} className="text-flow" /> {lead.serviceTitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-ink hover:text-chalk"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Quick Action Contact Bar */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2.5 px-3 font-mono text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 py-2.5 px-3 font-mono text-xs font-semibold text-blue-400 transition-all hover:bg-blue-500/20"
              >
                <Phone size={14} /> Call Lead
              </a>
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 py-2.5 px-3 font-mono text-xs font-semibold text-purple-400 transition-all hover:bg-purple-500/20"
                >
                  <Mail size={14} /> Email
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-2 rounded-xl border border-chalk/10 bg-ink/30 py-2.5 px-3 font-mono text-xs text-muted/40 cursor-not-allowed">
                  <Mail size={14} /> No Email
                </button>
              )}
            </div>

            {/* Lead Metadata Info */}
            <div className="rounded-xl border border-chalk/15 bg-ink/50 p-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center text-muted">
                <span>Mobile Number:</span>
                <span className="font-semibold text-chalk">{lead.phone}</span>
              </div>
              <div className="flex justify-between items-center text-muted">
                <span>Lead Source:</span>
                <span className="rounded-md bg-chalk/10 px-2 py-0.5 text-flow font-semibold">{lead.source}</span>
              </div>
              <div className="flex justify-between items-center text-muted">
                <span>Created Date:</span>
                <span className="text-chalk">{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            {/* Status & Pricing Section */}
            <div className="rounded-xl border border-chalk/20 bg-ink/40 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-flow flex items-center gap-1.5">
                  <Tag size={14} /> Status & Pricing Deal Controls
                </h3>
                <button
                  onClick={handleQuickSave}
                  disabled={isUpdating}
                  className="rounded-lg bg-flow px-3 py-1 font-mono text-xs font-bold text-ink transition-all hover:bg-flow/90 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block font-mono text-[0.7rem] text-muted uppercase tracking-wider mb-1">Pipeline Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CrmLeadStatus)}
                  className="w-full rounded-xl border border-chalk/20 bg-surface px-3.5 py-2 font-body text-sm text-chalk focus:border-flow focus:outline-none"
                >
                  <option value="NEW">New Lead (Fresh Inquiry)</option>
                  <option value="IN_DISCUSSION">In Discussion (Talks Ongoing)</option>
                  <option value="QUOTATION_SENT">Quotation Sent</option>
                  <option value="FOLLOWUP_SCHEDULED">Follow-up Scheduled</option>
                  <option value="WON">Deal Won 🎉</option>
                  <option value="LOST">Deal Lost</option>
                </select>
              </div>

              {/* Amounts Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Approx Amount */}
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

                {/* Fix Amount */}
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

              {/* Quotation Sent Toggle & Next Follow Up */}
              <div className="space-y-3 pt-1 border-t border-chalk/10">
                <div className="flex items-center justify-between">
                  <label className="font-body text-xs text-chalk flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quotationSent}
                      onChange={(e) => setQuotationSent(e.target.checked)}
                      className="h-4 w-4 rounded border-chalk/30 bg-surface text-flow focus:ring-flow"
                    />
                    Quotation Sent to Client?
                  </label>
                  <span className={`px-2 py-0.5 rounded font-mono text-[0.65rem] uppercase font-bold ${quotationSent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-chalk/10 text-muted'}`}>
                    {quotationSent ? "YES - SENT" : "NO"}
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-[0.7rem] text-muted uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Calendar size={12} /> Next Follow-up Date</span>
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
                  <div className="flex items-center gap-2 mt-2 font-mono text-[0.65rem]">
                    <span className="text-muted">Quick Set:</span>
                    <button
                      type="button"
                      onClick={() => setPresetFollowUp(1)}
                      className="rounded bg-ink px-2 py-0.5 text-chalk hover:text-flow border border-chalk/20"
                    >
                      Tomorrow
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
            </div>

            {/* Client Discussion Notes Timeline */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-chalk flex items-center gap-1.5">
                <Clock size={14} className="text-flow" /> Discussion History & Notes ({lead.timelineNotes?.length || 0})
              </h3>

              {/* Add New Note Box */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type discussion details (e.g. Client requested ₹2000 discount, asked for sample portfolio)..."
                    className="w-full rounded-xl border border-chalk/25 bg-ink p-3 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNoteText.trim()}
                    className="absolute right-2.5 bottom-3.5 flex items-center gap-1.5 rounded-lg bg-flow px-3 py-1 font-mono text-xs font-bold text-ink hover:bg-flow/90 disabled:opacity-40"
                  >
                    <Send size={12} /> Add Note
                  </button>
                </div>
              </form>

              {/* Notes Timeline List */}
              <div className="space-y-3 pt-2">
                {lead.timelineNotes && lead.timelineNotes.length > 0 ? (
                  lead.timelineNotes.map((note, index) => (
                    <div
                      key={note.id || index}
                      className="rounded-xl border border-chalk/15 bg-ink/60 p-3.5 space-y-1.5 transition-all hover:border-chalk/30"
                    >
                      <div className="flex items-center justify-between font-mono text-[0.65rem]">
                        <span className="rounded bg-flow/15 px-2 py-0.5 font-bold text-flow border border-flow/30">
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
                  <div className="rounded-xl border border-dashed border-chalk/20 p-6 text-center font-mono text-xs text-muted">
                    No notes recorded yet. Add the first discussion update above.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="border-t border-chalk/15 p-5 bg-ink/80 flex items-center justify-between">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 font-mono text-xs text-rose-400 transition-colors hover:bg-rose-500/20 disabled:opacity-50"
            >
              <Trash2 size={14} /> Delete Lead
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-chalk/15 px-5 py-2 font-mono text-xs uppercase tracking-wider text-chalk hover:bg-chalk/20"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
