"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Calendar,
  Phone,
  Copy,
  Check,
  FileText,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";
import { CrmLeadModel, CrmLeadStatus, CrmStats, PaymentStatus } from "@/types";
import { updateLeadAction, addLeadNoteAction } from "@/app/actions/lead";
import LeadFormModal from "./LeadFormModal";
import LeadDetailDrawer from "./LeadDetailDrawer";

interface LeadsCrmContainerProps {
  initialLeads: CrmLeadModel[];
  stats: CrmStats;
}

const STATUS_FILTERS: { id: CrmLeadStatus | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Leads" },
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

const PAYMENT_BADGES: Record<PaymentStatus, { label: string; bg: string; text: string }> = {
  PENDING: { label: "Pending", bg: "bg-rose-500/15", text: "text-rose-400" },
  PARTIAL: { label: "Partial", bg: "bg-amber-500/15", text: "text-amber-400" },
  FULLY_PAID: { label: "Paid", bg: "bg-emerald-500/15", text: "text-emerald-400" },
};

const STATUS_PRIORITY: Record<string, number> = {
  NEW: 1,
  HOT_DEAL: 2,
  IN_DISCUSSION: 3,
  WON: 4,
  LOST: 5,
};

const ITEMS_PER_PAGE = 10;

export default function LeadsCrmContainer({ initialLeads, stats }: LeadsCrmContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CrmLeadStatus | "ALL">("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CrmLeadModel | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const handleCopyPhone = (leadId: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(phone);
      setCopiedPhoneId(leadId);
      setTimeout(() => setCopiedPhoneId(null), 2000);
    } catch (err) {}
  };

  // Filter & Sort logic (Status priority: NEW -> HOT_DEAL -> IN_DISCUSSION -> WON -> LOST, then newest first)
  const processedLeads = useMemo(() => {
    const filtered = initialLeads.filter((lead) => {
      const matchesFilter = selectedFilter === "ALL" || lead.status === selectedFilter;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !queryLower ||
        lead.name.toLowerCase().includes(queryLower) ||
        lead.phone.toLowerCase().includes(queryLower) ||
        (lead.email && lead.email.toLowerCase().includes(queryLower)) ||
        (lead.companyName && lead.companyName.toLowerCase().includes(queryLower)) ||
        (lead.location && lead.location.toLowerCase().includes(queryLower)) ||
        lead.serviceTitle.toLowerCase().includes(queryLower);

      return matchesFilter && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const priorityA = STATUS_PRIORITY[a.status] ?? 99;
      const priorityB = STATUS_PRIORITY[b.status] ?? 99;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [initialLeads, selectedFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(processedLeads.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedLeads = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return processedLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedLeads, safeCurrentPage]);

  async function handleQuickStatusChange(leadId: string, newStatus: CrmLeadStatus) {
    await updateLeadAction(leadId, { status: newStatus });
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn min-w-0">
      {/* Header & Main Actions */}
      <div className="flex flex-col gap-3.5 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-flow/15 text-flow border border-flow/30 shadow-md">
            <Users size={22} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-chalk truncate">Lead Management CRM</h1>
            <p className="font-mono text-[0.7rem] sm:text-xs text-muted truncate">
              Pipeline tracking, follow-up priority queue & advance payment management
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-flow px-4 py-2.5 sm:px-5 sm:py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 shadow-lg shadow-flow/20 shrink-0 self-stretch sm:self-auto cursor-pointer"
        >
          <Plus size={16} /> Add Manual Lead
        </button>
      </div>

      {/* KPI Stats Bar - 4 clean columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-1">
          <p className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-muted font-semibold">Total Leads</p>
          <p className="font-heading text-xl sm:text-2xl font-bold text-chalk">{stats.totalLeads}</p>
          <span className="font-mono text-[0.65rem] text-flow block truncate">Website + Manual</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-1">
          <p className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-muted font-semibold">Pipeline Value</p>
          <p className="font-heading text-xl sm:text-2xl font-bold text-flow">{stats.totalPipelineValue}</p>
          <span className="font-mono text-[0.65rem] text-muted block truncate">Active deals</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4 space-y-1">
          <p className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-emerald-400 font-semibold">Advance</p>
          <p className="font-heading text-xl sm:text-2xl font-bold text-emerald-400">{stats.totalAdvanceCollected}</p>
          <span className="font-mono text-[0.65rem] text-emerald-400/80 block truncate">Collected</span>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4 space-y-1">
          <p className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-amber-400 font-semibold">Balance</p>
          <p className="font-heading text-xl sm:text-2xl font-bold text-amber-400">{stats.totalBalancePending}</p>
          <span className="font-mono text-[0.65rem] text-amber-400/80 block truncate">Pending</span>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3.5 border-b border-chalk/15 pb-4 min-w-0">
        {/* Status Tabs - Wrap cleanly so every tab is 100% visible and never hidden */}
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {STATUS_FILTERS.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  setCurrentPage(1);
                }}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-flow text-ink shadow-md font-bold"
                    : "bg-surface text-muted border border-chalk/15 hover:border-chalk/30 hover:text-chalk"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full xl:w-80 min-w-[240px] shrink-0">
          <Search size={15} className="absolute left-3.5 top-2.5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search leads by name, phone, email, service..."
            className="w-full rounded-xl border border-chalk/20 bg-surface px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content Area - Clean Tabular View */}
      {processedLeads.length > 0 ? (
        <div className="rounded-2xl border border-chalk/15 bg-surface shadow-xl overflow-hidden min-w-0">
          {/* Tablet / Mobile Horizontal Scroll Hint */}
          <div className="flex xl:hidden items-center justify-between px-4 py-2 bg-ink/70 border-b border-chalk/10 font-mono text-[0.65rem] text-muted">
            <span className="flex items-center gap-1.5 text-flow/90 font-medium">
              <span>⇄</span> Swipe horizontally to view all columns
            </span>
          </div>

            <div className="overflow-x-auto w-full [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[840px] text-left font-body text-xs border-collapse">
                <thead>
                  <tr className="border-b border-chalk/15 bg-ink/70 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    <th className="py-3.5 px-4 font-semibold min-w-[220px]">Client Details</th>
                    <th className="py-3.5 px-4 font-semibold min-w-[140px]">Service</th>
                    <th className="py-3.5 px-4 font-semibold min-w-[155px]">Pipeline Status</th>
                    <th className="py-3.5 px-4 font-semibold min-w-[140px]">Pricing & Advance</th>
                    <th className="py-3.5 px-4 font-semibold min-w-[125px]">Next Payment</th>
                    <th className="py-3.5 px-4 font-semibold text-right min-w-[90px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-chalk/10">
                  {paginatedLeads.map((lead) => {
                    const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                    const payBadge = PAYMENT_BADGES[lead.paymentStatus] || PAYMENT_BADGES.PENDING;

                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding ${lead.serviceTitle}...`)}`;

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-ink/50 transition-colors group cursor-pointer"
                        onClick={() => {
                          const sel = typeof window !== "undefined" ? window.getSelection()?.toString() : "";
                          if (sel && sel.trim().length > 0) return;
                          setSelectedLead(lead);
                        }}
                      >
                        {/* Client Info */}
                        <td 
                          className="py-3.5 px-4"
                          onClick={(e) => {
                            const target = e.target as HTMLElement;
                            if (target.closest("button") || target.closest("a") || target.closest(".contact-details-box")) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          <div className="space-y-1.5">
                            <span className="font-heading font-bold text-chalk text-sm group-hover:text-flow transition-colors select-text">
                              {lead.name}
                            </span>
                            <div 
                              className="contact-details-box flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-muted select-text"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* 1-Click Copy Phone Badge */}
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyPhone(lead.id, lead.phone, e)}
                                  title="Click to copy phone number"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-surface/90 border border-chalk/15 px-2 py-0.5 text-chalk font-mono font-semibold text-xs hover:border-flow hover:text-flow transition-all cursor-pointer group/copy select-all"
                                >
                                  <Phone size={11} className="text-flow" />
                                  <span className="select-all">{lead.phone}</span>
                                  {copiedPhoneId === lead.id ? (
                                    <span className="text-[0.65rem] text-emerald-400 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-1 py-0.2 rounded">
                                      <Check size={10} /> Copied!
                                    </span>
                                  ) : (
                                    <Copy size={11} className="text-muted group-hover/copy:text-flow transition-colors" />
                                  )}
                                </button>

                                {/* Direct WhatsApp Chat */}
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  title="Chat on WhatsApp"
                                  className="rounded-lg p-1 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                                >
                                  <MessageSquare size={12} />
                                </a>
                              </div>

                              {lead.email && <span className="truncate max-w-[130px] text-chalk/90 select-all">{lead.email}</span>}
                              {lead.companyName && <span className="text-amber-400 font-semibold select-all">{lead.companyName}</span>}
                              {lead.location && <span className="text-cyan-400 select-all">📍 {lead.location}</span>}
                              <span className="rounded bg-chalk/10 px-1.5 py-0.2 text-flow">{lead.source}</span>
                            </div>
                          </div>
                        </td>

                        {/* Service Title */}
                        <td className="py-3.5 px-4 font-mono font-semibold text-chalk">
                          <div className="truncate max-w-[150px]">{lead.serviceTitle}</div>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleQuickStatusChange(lead.id, e.target.value as CrmLeadStatus)}
                            className={`rounded-xl px-2.5 py-1 font-mono text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border} bg-surface focus:outline-none cursor-pointer`}
                          >
                            <option value="NEW">New Lead</option>
                            <option value="HOT_DEAL">Hot Deal 🔥</option>
                            <option value="IN_DISCUSSION">In Discussion</option>
                            <option value="WON">Deal Won 🎉</option>
                            <option value="LOST">Deal Lost</option>
                          </select>
                        </td>

                        {/* Pricing Breakdown (Fix, Approx, Advance, Balance) */}
                        <td className="py-3.5 px-4 font-mono text-xs">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 font-semibold text-chalk">
                              <span>Fix: {lead.fixAmount || lead.approxAmount || "Not set"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[0.65rem]">
                              <span className="text-emerald-400">Paid: {lead.advancePaid || "₹0"}</span>
                              <span className="text-amber-400">Bal: {lead.balanceDue || "₹0"}</span>
                            </div>
                          </div>
                        </td>

                        {/* Next Payment Date */}
                        <td className="py-3.5 px-4 font-mono text-xs">
                          {lead.nextPaymentDate ? (
                            <div className="text-amber-400 font-semibold">
                              {new Date(lead.nextPaymentDate).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          ) : (
                            <span className="text-muted/50">—</span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-xl border border-flow/40 bg-flow/10 px-3 py-1.5 font-mono text-xs font-bold text-flow transition-colors hover:bg-flow hover:text-ink cursor-pointer"
                            >
                              Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-chalk/20 p-8 sm:p-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface mx-auto text-muted">
            <Users size={24} />
          </div>
          <h3 className="font-heading text-base font-bold text-chalk">No leads found</h3>
          <p className="font-mono text-xs text-muted max-w-sm mx-auto">
            No leads match your current search query or filter status. Try changing filters or add a manual lead.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {processedLeads.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-chalk/15 bg-surface px-4 sm:px-6 py-3.5 sm:py-4 shadow-xl">
          <div className="font-mono text-xs text-muted text-center sm:text-left">
            Showing <span className="font-bold text-chalk">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
            <span className="font-bold text-chalk">
              {Math.min(safeCurrentPage * ITEMS_PER_PAGE, processedLeads.length)}
            </span>{" "}
            of <span className="font-bold text-flow">{processedLeads.length}</span> leads
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className="flex items-center gap-1.5 rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-mono text-xs text-chalk transition-all hover:bg-chalk/10 hover:border-flow/40 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <div className="flex items-center gap-1 font-mono text-xs px-2.5">
              <span className="text-flow font-bold">{safeCurrentPage}</span>
              <span className="text-muted">/</span>
              <span className="text-chalk">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage >= totalPages}
              className="flex items-center gap-1.5 rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-mono text-xs text-chalk transition-all hover:bg-chalk/10 hover:border-flow/40 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Manual Lead Modal */}
      <LeadFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Lead Detail & Timeline Drawer */}
      <LeadDetailDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
