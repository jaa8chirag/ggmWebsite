"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Users,
  Plus,
  Search,
  Calendar,
  Clock,
  Phone,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  LayoutGrid,
  Table as TableIcon,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Send,
  Building2,
  MapPin,
  Mail,
  DollarSign,
  CreditCard,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  X,
  Bell,
  CalendarClock,
  ArrowUpDown,
} from "lucide-react";
import { CrmLeadModel, CrmLeadStatus, CrmStats, PaymentStatus, LeadNote } from "@/types";
import { updateLeadAction, addLeadNoteAction, deleteLeadAction } from "@/app/actions/lead";
import LeadFormModal from "./LeadFormModal";

interface LeadsCrmContainerProps {
  initialLeads: CrmLeadModel[];
  stats: CrmStats;
}

const STATUS_FILTERS: { id: CrmLeadStatus | "ALL" | "DUE_TODAY"; label: string }[] = [
  { id: "ALL", label: "All Chats" },
  { id: "DUE_TODAY", label: "⏰ Follow-ups Due" },
  { id: "NEW", label: "New Leads" },
  { id: "HOT_DEAL", label: "Hot Deals 🔥" },
  { id: "IN_DISCUSSION", label: "In Discussion" },
  { id: "WON", label: "Deals Won 🎉" },
  { id: "LOST", label: "Lost" },
];

const STATUS_BADGES: Record<CrmLeadStatus, { label: string; bg: string; text: string; border: string }> = {
  NEW: { label: "New Lead", bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/30" },
  HOT_DEAL: { label: "Hot Deal 🔥", bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30" },
  IN_DISCUSSION: { label: "In Discussion", bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30" },
  QUOTATION_SENT: { label: "Quotation Sent", bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30" },
  FOLLOWUP_SCHEDULED: { label: "Follow-up Set", bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/30" },
  WON: { label: "Deal Won 🎉", bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  LOST: { label: "Deal Lost", bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
};

function formatLeadTime(dateStr?: string | Date | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function getFollowUpBadgeInfo(dateStr?: string | null): { text: string; color: string; isDue: boolean } | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;

  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dateFormatted = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  if (diffMs < 0) {
    // Overdue
    const overdueHrs = Math.abs(diffHours);
    return {
      text: overdueHrs > 24 ? `Overdue (${dateFormatted})` : `Overdue by ${Math.max(1, overdueHrs)}h`,
      color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      isDue: true,
    };
  }

  // Today
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return {
      text: `Today at ${timeStr}`,
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      isDue: true,
    };
  }

  // Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  if (d.toDateString() === tomorrow.toDateString()) {
    return {
      text: `Tomorrow at ${timeStr}`,
      color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      isDue: false,
    };
  }

  return {
    text: `${dateFormatted} at ${timeStr}`,
    color: "bg-chalk/10 text-muted border-chalk/15",
    isDue: false,
  };
}

export default function LeadsCrmContainer({ initialLeads, stats }: LeadsCrmContainerProps) {
  const [leads, setLeads] = useState<CrmLeadModel[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [selectedFilter, setSelectedFilter] = useState<CrmLeadStatus | "ALL" | "DUE_TODAY">("ALL");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(
    initialLeads.length > 0 ? initialLeads[0].id : null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  // Active Lead Details State
  const activeLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || (leads.length > 0 ? leads[0] : null);
  }, [leads, selectedLeadId]);

  // Note composer state
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const notesContainerRef = useRef<HTMLDivElement>(null);

  // Quick follow-up state
  const [customFollowUpDate, setCustomFollowUpDate] = useState("");
  const [isSavingFollowUp, setIsSavingFollowUp] = useState(false);

  // Keep state in sync with initialLeads
  useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads]);

  // Scroll to bottom of notes when activeLead changes
  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [activeLead?.id, activeLead?.timelineNotes]);

  const handleCopyPhone = (leadId: string, phone: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      navigator.clipboard.writeText(phone);
      setCopiedPhoneId(leadId);
      setTimeout(() => setCopiedPhoneId(null), 2000);
    } catch (err) {}
  };

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    const list = leads.filter((lead) => {
      // Filter logic
      let matchesFilter = true;
      if (selectedFilter === "DUE_TODAY") {
        if (!lead.nextFollowUp || lead.status === "WON" || lead.status === "LOST") return false;
        const now = new Date();
        const fDate = new Date(lead.nextFollowUp);
        matchesFilter = fDate.toDateString() === now.toDateString() || fDate.getTime() < now.getTime();
      } else if (selectedFilter !== "ALL") {
        matchesFilter = lead.status === selectedFilter;
      }

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.companyName && lead.companyName.toLowerCase().includes(q)) ||
        (lead.location && lead.location.toLowerCase().includes(q)) ||
        lead.serviceTitle.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });

    return [...list].sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "NEWEST" ? timeB - timeA : timeA - timeB;
    });
  }, [leads, selectedFilter, searchQuery, sortOrder]);

  // Follow-ups due count
  const followUpsDueCount = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    return leads.filter((l) => {
      if (!l.nextFollowUp || l.status === "WON" || l.status === "LOST") return false;
      const fDate = new Date(l.nextFollowUp).toISOString().split("T")[0];
      return fDate <= todayStr;
    }).length;
  }, [leads]);

  // Status Change Handler
  async function handleQuickStatusChange(leadId: string, newStatus: CrmLeadStatus) {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    await updateLeadAction(leadId, { status: newStatus });
  }

  // Quick Note Submission
  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNoteText.trim() || !activeLead || isAddingNote) return;

    const text = newNoteText.trim();
    setNewNoteText("");
    setIsAddingNote(true);

    const tempNote: LeadNote = {
      id: `temp_${Date.now()}`,
      text: text,
      createdAt: new Date().toISOString(),
      author: "Admin",
    };

    setLeads((prev) =>
      prev.map((l) =>
        l.id === activeLead.id
          ? { ...l, timelineNotes: [...(l.timelineNotes || []), tempNote] }
          : l
      )
    );

    const res = await addLeadNoteAction(activeLead.id, text, "Admin");
    setIsAddingNote(false);

    if (res.success && res.notes) {
      setLeads((prev) =>
        prev.map((l) => (l.id === activeLead.id ? { ...l, timelineNotes: res.notes || [] } : l))
      );
    }
  }

  // Advance Follow-up Quick Presets
  async function applyFollowUpPreset(preset: "1hr" | "tomorrow" | "2days" | "nextweek" | "clear") {
    if (!activeLead) return;
    setIsSavingFollowUp(true);

    let nextDate: Date | null = new Date();
    if (preset === "1hr") {
      nextDate = new Date(Date.now() + 60 * 60 * 1000);
    } else if (preset === "tomorrow") {
      nextDate.setDate(nextDate.getDate() + 1);
      nextDate.setHours(11, 0, 0, 0);
    } else if (preset === "2days") {
      nextDate.setDate(nextDate.getDate() + 2);
      nextDate.setHours(11, 0, 0, 0);
    } else if (preset === "nextweek") {
      const daysUntilMonday = (1 + 7 - nextDate.getDay()) % 7 || 7;
      nextDate.setDate(nextDate.getDate() + daysUntilMonday);
      nextDate.setHours(11, 0, 0, 0);
    } else if (preset === "clear") {
      nextDate = null;
    }

    const isoStr = nextDate ? nextDate.toISOString() : null;

    setLeads((prev) =>
      prev.map((l) => (l.id === activeLead.id ? { ...l, nextFollowUp: isoStr } : l))
    );

    await updateLeadAction(activeLead.id, { nextFollowUp: isoStr });
    setIsSavingFollowUp(false);
  }

  async function handleCustomFollowUpSubmit() {
    if (!activeLead || !customFollowUpDate) return;
    setIsSavingFollowUp(true);
    const isoStr = new Date(customFollowUpDate).toISOString();

    setLeads((prev) =>
      prev.map((l) => (l.id === activeLead.id ? { ...l, nextFollowUp: isoStr } : l))
    );

    await updateLeadAction(activeLead.id, { nextFollowUp: isoStr });
    setCustomFollowUpDate("");
    setIsSavingFollowUp(false);
  }

  // Active Lead Phone & WhatsApp URLs
  const activeCleanPhone = activeLead ? activeLead.phone.replace(/[^0-9]/g, "") : "";
  const activeWaPhone = activeCleanPhone.length === 10 ? `91${activeCleanPhone}` : activeCleanPhone;
  const activeWaUrl = activeLead
    ? `https://wa.me/${activeWaPhone}?text=${encodeURIComponent(
        `Hello ${activeLead.name} ji! Thank you for contacting GGM Technologies regarding ${activeLead.serviceTitle}. How can we assist you with your project today?`
      )}`
    : "#";
  const activeCallUrl = activeLead ? `tel:${activeLead.phone.replace(/\s+/g, "")}` : "#";

  return (
    <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-ink min-w-0 animate-fadeIn">
      {/* =================================================================== */}
      {/* LEFT PANEL: LEAD / CHAT LIST (WhatsApp Sidebar)                     */}
      {/* =================================================================== */}
      <div
        className={`w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 border-r border-chalk/15 bg-ink/40 flex flex-col h-full ${
          selectedLeadId && "hidden lg:flex"
        }`}
      >
        {/* Search Box & Controls Header */}
        <div className="p-3 border-b border-chalk/15 space-y-2 bg-surface/80 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-base font-bold text-chalk">
                Leads CRM
              </h2>
              <span className="font-mono text-xs text-muted">({leads.length})</span>
              {followUpsDueCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 font-mono text-[0.65rem] font-bold animate-pulse">
                  <Bell size={10} /> {followUpsDueCount} Due
                </span>
              )}
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 rounded-lg bg-flow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:bg-flow/90 transition-all cursor-pointer shadow-sm"
            >
              <Plus size={14} /> <span>New Lead</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone, service..."
                className="w-full rounded-xl border border-chalk/20 bg-ink px-3 py-1.5 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-muted hover:text-chalk"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Newest / Oldest Toggle */}
            <button
              onClick={() => setSortOrder((prev) => (prev === "NEWEST" ? "OLDEST" : "NEWEST"))}
              title={sortOrder === "NEWEST" ? "Sorting: Newest First (Click to switch to Oldest)" : "Sorting: Oldest First (Click to switch to Newest)"}
              className={`flex items-center gap-1.5 shrink-0 rounded-xl border px-2.5 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${
                sortOrder === "NEWEST"
                  ? "border-chalk/20 bg-ink text-chalk hover:border-flow/50 hover:text-flow"
                  : "border-flow/50 bg-flow/15 text-flow shadow-sm shadow-flow/10"
              }`}
            >
              <ArrowUpDown size={13} className={sortOrder === "OLDEST" ? "text-flow" : "text-muted"} />
              <span className="text-[0.68rem] uppercase tracking-wider font-bold">
                {sortOrder === "NEWEST" ? "Newest" : "Oldest"}
              </span>
            </button>
          </div>

          {/* Filter Tabs Scrollable */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {STATUS_FILTERS.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1 font-mono text-[0.7rem] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-flow text-ink shadow-sm"
                        : "bg-ink border border-chalk/15 text-muted hover:text-chalk hover:border-chalk/30"
                    }`}
                  >
                    {tab.label}
                    {tab.id === "DUE_TODAY" && followUpsDueCount > 0 && (
                      <span className="ml-1 px-1 rounded-full bg-rose-500 text-white text-[0.6rem]">
                        {followUpsDueCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leads Chat List */}
          <div className="flex-1 overflow-y-auto divide-y divide-chalk/10">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => {
                const isSelected = activeLead?.id === lead.id;
                const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                const followUpBadge = getFollowUpBadgeInfo(lead.nextFollowUp);
                const lastNote =
                  lead.timelineNotes && lead.timelineNotes.length > 0
                    ? lead.timelineNotes[lead.timelineNotes.length - 1].text
                    : null;

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? "bg-flow/15 border-l-4 border-l-flow"
                        : "hover:bg-ink/60 border-l-4 border-l-transparent"
                    }`}
                  >
                    {/* Client Initial Avatar */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading font-bold text-sm border ${
                        isSelected
                          ? "bg-flow text-ink border-flow shadow-md shadow-flow/20"
                          : "bg-surface border-chalk/20 text-chalk"
                      }`}
                    >
                      {lead.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Chat Item Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4
                          className={`font-heading font-bold text-sm truncate ${
                            isSelected ? "text-flow" : "text-chalk"
                          }`}
                        >
                          {lead.name}
                        </h4>
                        <span className="font-mono text-[0.65rem] text-muted shrink-0">
                          {formatLeadTime(lead.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-muted truncate">
                          {lead.serviceTitle}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[0.65rem] font-bold border shrink-0 ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </span>
                      </div>

                      {/* Last Message Preview or Follow-up */}
                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <p className="font-body text-[0.7rem] text-muted/80 truncate">
                          {lastNote ? `💬 ${lastNote}` : `📞 ${lead.phone}`}
                        </p>
                        {followUpBadge && (
                          <span
                            className={`rounded px-1.5 py-0.2 font-mono text-[0.6rem] font-bold border shrink-0 ${followUpBadge.color}`}
                          >
                            {followUpBadge.text}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center space-y-2 text-muted">
                <Users size={28} className="mx-auto opacity-40" />
                <p className="font-mono text-xs">No leads found in this view</p>
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT PANEL: ACTIVE LEAD WORKSPACE & CHAT REMARKS                   */}
        {/* =================================================================== */}
        <div
          className={`flex-1 flex flex-col h-full bg-surface ${
            !selectedLeadId && "hidden lg:flex"
          }`}
        >
          {activeLead ? (
            <>
              {/* WhatsApp-Style Top Bar */}
              <div className="p-3.5 sm:px-5 border-b border-chalk/15 bg-ink/70 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setSelectedLeadId(null)}
                    className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-chalk/20 text-muted hover:text-chalk"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flow/20 text-flow border border-flow/40 font-heading font-bold text-sm">
                    {activeLead.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-base font-bold text-chalk truncate">
                        {activeLead.name}
                      </h2>
                      <span className="font-mono text-[0.65rem] text-flow bg-flow/10 px-1.5 py-0.5 rounded">
                        {activeLead.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span>{activeLead.phone}</span>
                      <button
                        onClick={() => handleCopyPhone(activeLead.id, activeLead.phone)}
                        className="hover:text-flow transition-colors cursor-pointer"
                        title="Copy Phone"
                      >
                        {copiedPhoneId === activeLead.id ? (
                          <Check size={12} className="text-emerald-400" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                      {activeLead.location && <span>• 📍 {activeLead.location}</span>}
                    </div>
                  </div>
                </div>

                {/* 1-Click WhatsApp & Call Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-ink px-3.5 py-2 font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                    title="Direct WhatsApp"
                  >
                    <MessageSquare size={14} className="fill-ink" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>

                  <a
                    href={activeCallUrl}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500 border border-blue-500/40 text-blue-400 hover:text-ink px-3 py-2 font-mono text-xs font-bold transition-all"
                    title="Direct Call"
                  >
                    <Phone size={14} />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                </div>
              </div>

              {/* Status Bar (1-Tap Status Switcher) */}
              <div className="px-4 py-2 border-b border-chalk/10 bg-ink/40 flex items-center justify-between gap-2 overflow-x-auto [scrollbar-width:none]">
                <span className="font-mono text-[0.65rem] text-muted uppercase font-bold shrink-0">
                  Pipeline Status:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleQuickStatusChange(activeLead.id, "NEW")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLead.status === "NEW"
                        ? "bg-blue-500 text-ink shadow-sm"
                        : "bg-surface border border-chalk/15 text-muted hover:text-chalk"
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(activeLead.id, "HOT_DEAL")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLead.status === "HOT_DEAL"
                        ? "bg-orange-500 text-ink shadow-sm"
                        : "bg-surface border border-chalk/15 text-muted hover:text-chalk"
                    }`}
                  >
                    Hot Deal 🔥
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(activeLead.id, "IN_DISCUSSION")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLead.status === "IN_DISCUSSION"
                        ? "bg-yellow-500 text-ink shadow-sm"
                        : "bg-surface border border-chalk/15 text-muted hover:text-chalk"
                    }`}
                  >
                    In Talk
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(activeLead.id, "WON")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLead.status === "WON"
                        ? "bg-emerald-500 text-ink shadow-sm"
                        : "bg-surface border border-chalk/15 text-muted hover:text-chalk"
                    }`}
                  >
                    Won 🎉
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(activeLead.id, "LOST")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLead.status === "LOST"
                        ? "bg-rose-500 text-ink shadow-sm"
                        : "bg-surface border border-chalk/15 text-muted hover:text-chalk"
                    }`}
                  >
                    Lost
                  </button>
                </div>
              </div>

              {/* Scrollable Body: Follow-up & Remarks Timeline */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {/* ------------------------------------------------------------- */}
                {/* 1. ADVANCED FOLLOW-UP PLANNER                                */}
                {/* ------------------------------------------------------------- */}
                <div className="rounded-2xl border border-flow/30 bg-flow/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={16} className="text-flow" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                        Smart Follow-up Scheduler
                      </span>
                    </div>

                    {activeLead.nextFollowUp ? (
                      <div className="flex items-center gap-2">
                        {(() => {
                          const fb = getFollowUpBadgeInfo(activeLead.nextFollowUp);
                          return (
                            fb && (
                              <span
                                className={`rounded-lg px-2.5 py-0.5 font-mono text-xs font-bold border ${fb.color}`}
                              >
                                🔔 {fb.text}
                              </span>
                            )
                          );
                        })()}
                        <button
                          onClick={() => applyFollowUpPreset("clear")}
                          className="font-mono text-[0.65rem] text-rose-400 hover:underline cursor-pointer"
                          title="Mark Follow-up as Completed"
                        >
                          Mark Done
                        </button>
                      </div>
                    ) : (
                      <span className="font-mono text-[0.65rem] text-muted">No follow-up set</span>
                    )}
                  </div>

                  {/* 1-Click Quick Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-mono text-[0.65rem] text-muted">Quick Set:</span>
                    <button
                      type="button"
                      disabled={isSavingFollowUp}
                      onClick={() => applyFollowUpPreset("1hr")}
                      className="rounded-lg bg-surface border border-chalk/20 px-2.5 py-1 font-mono text-[0.7rem] font-bold text-chalk hover:border-flow hover:text-flow transition-all cursor-pointer"
                    >
                      ⚡ +1 Hour
                    </button>
                    <button
                      type="button"
                      disabled={isSavingFollowUp}
                      onClick={() => applyFollowUpPreset("tomorrow")}
                      className="rounded-lg bg-surface border border-chalk/20 px-2.5 py-1 font-mono text-[0.7rem] font-bold text-chalk hover:border-flow hover:text-flow transition-all cursor-pointer"
                    >
                      🌅 Tomorrow 11 AM
                    </button>
                    <button
                      type="button"
                      disabled={isSavingFollowUp}
                      onClick={() => applyFollowUpPreset("2days")}
                      className="rounded-lg bg-surface border border-chalk/20 px-2.5 py-1 font-mono text-[0.7rem] font-bold text-chalk hover:border-flow hover:text-flow transition-all cursor-pointer"
                    >
                      📅 In 2 Days
                    </button>
                    <button
                      type="button"
                      disabled={isSavingFollowUp}
                      onClick={() => applyFollowUpPreset("nextweek")}
                      className="rounded-lg bg-surface border border-chalk/20 px-2.5 py-1 font-mono text-[0.7rem] font-bold text-chalk hover:border-flow hover:text-flow transition-all cursor-pointer"
                    >
                      🗓️ Next Monday
                    </button>
                  </div>

                  {/* Custom DateTime Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="datetime-local"
                      value={customFollowUpDate}
                      onChange={(e) => setCustomFollowUpDate(e.target.value)}
                      className="rounded-xl border border-chalk/20 bg-ink px-3 py-1.5 font-mono text-xs text-chalk focus:border-flow focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={!customFollowUpDate || isSavingFollowUp}
                      onClick={handleCustomFollowUpSubmit}
                      className="rounded-xl bg-flow px-3 py-1.5 font-mono text-xs font-bold text-ink hover:bg-flow/90 disabled:opacity-40 cursor-pointer"
                    >
                      Save Date
                    </button>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 2. DEAL & PAYMENT OVERVIEW                                    */}
                {/* ------------------------------------------------------------- */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="rounded-xl border border-chalk/15 bg-ink/60 p-3">
                    <span className="block font-mono text-[0.65rem] text-muted uppercase">Service / Req</span>
                    <span className="font-heading font-bold text-xs text-chalk truncate block mt-0.5">
                      {activeLead.serviceTitle}
                    </span>
                  </div>
                  <div className="rounded-xl border border-chalk/15 bg-ink/60 p-3">
                    <span className="block font-mono text-[0.65rem] text-muted uppercase">Deal Value</span>
                    <span className="font-heading font-bold text-xs text-flow truncate block mt-0.5">
                      {activeLead.fixAmount || activeLead.approxAmount || "Not set"}
                    </span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <span className="block font-mono text-[0.65rem] text-emerald-400 uppercase font-semibold">Advance</span>
                    <span className="font-heading font-bold text-xs text-emerald-400 truncate block mt-0.5">
                      {activeLead.advancePaid || "₹0"}
                    </span>
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <span className="block font-mono text-[0.65rem] text-amber-400 uppercase font-semibold">Balance Due</span>
                    <span className="font-heading font-bold text-xs text-amber-400 truncate block mt-0.5">
                      {activeLead.balanceDue || "₹0"}
                    </span>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 3. TIMELINE & REMARKS THREAD (WhatsApp Bubble Style)           */}
                {/* ------------------------------------------------------------- */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                      💬 Client Inquiries &amp; Remarks Thread
                    </span>
                    <span className="font-mono text-[0.65rem] text-muted">
                      {activeLead.timelineNotes?.length || 0} messages
                    </span>
                  </div>

                  {/* Notes Chat Container */}
                  <div
                    ref={notesContainerRef}
                    className="rounded-2xl border border-chalk/15 bg-ink/50 p-4 space-y-3 max-h-[320px] overflow-y-auto"
                  >
                    {activeLead.timelineNotes && activeLead.timelineNotes.length > 0 ? (
                      activeLead.timelineNotes.map((note, index) => {
                        const isWebsite = note.author?.toLowerCase().includes("website");
                        return (
                          <div
                            key={note.id || index}
                            className={`flex flex-col ${isWebsite ? "items-start" : "items-end"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl p-3 shadow-md text-xs font-body ${
                                isWebsite
                                  ? "bg-surface border border-chalk/15 text-chalk rounded-tl-sm"
                                  : "bg-flow/15 border border-flow/30 text-chalk rounded-tr-sm"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] mb-1 opacity-75">
                                <span className={isWebsite ? "text-cyan-400 font-bold" : "text-flow font-bold"}>
                                  {note.author || "Admin"}
                                </span>
                                <span>{formatLeadTime(note.createdAt)}</span>
                              </div>
                              <p className="leading-relaxed whitespace-pre-wrap">{note.text}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-6 text-center text-muted font-mono text-xs">
                        No discussion notes yet. Type a note below to record client remarks.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* 4. WHATSAPP-STYLE BOTTOM NOTE COMPOSER                       */}
              {/* ------------------------------------------------------------- */}
              <form
                onSubmit={handleAddNote}
                className="p-3 border-t border-chalk/15 bg-ink/80 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type discussion note or client update... (Press Enter to save)"
                  className="flex-1 rounded-xl border border-chalk/20 bg-surface px-4 py-2.5 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim() || isAddingNote}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flow text-ink hover:bg-flow/90 disabled:opacity-40 transition-all cursor-pointer shadow-md"
                  title="Send Note"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 text-muted">
              <MessageSquare size={40} className="text-flow/40" />
              <h3 className="font-heading font-bold text-base text-chalk">Select a lead</h3>
              <p className="font-mono text-xs max-w-xs">
                Pick any inquiry or client from the left list to view complete communication history and actions.
              </p>
            </div>
          )}
        </div>

      {/* Manual Quick Add Modal */}
      <LeadFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
