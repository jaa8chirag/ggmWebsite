"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Calendar,
  MessageSquare,
  DollarSign,
  Clock,
  Phone,
  Tag,
  AlertCircle,
  FileText,
  Briefcase,
  ChevronRight,
  LayoutList,
  LayoutGrid,
  ArrowUpDown,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Send,
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
  { id: "IN_DISCUSSION", label: "In Discussion" },
  { id: "QUOTATION_SENT", label: "Quotation Sent" },
  { id: "FOLLOWUP_SCHEDULED", label: "Follow-up Set" },
  { id: "WON", label: "Deals Won 🎉" },
  { id: "LOST", label: "Lost" },
];

const STATUS_BADGES: Record<CrmLeadStatus, { label: string; bg: string; text: string; border: string }> = {
  NEW: { label: "New Lead", bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/30" },
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

type SortMode = "FOLLOWUP_PRIORITY" | "NEWEST" | "PAYMENT_DUE" | "HIGHEST_PRICE";

export default function LeadsCrmContainer({ initialLeads, stats }: LeadsCrmContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CrmLeadStatus | "ALL">("ALL");
  const [sortMode, setSortMode] = useState<SortMode>("FOLLOWUP_PRIORITY");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list"); // Default to list view
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CrmLeadModel | null>(null);

  // Filter & Priority Sort logic
  const processedLeads = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

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
      if (sortMode === "FOLLOWUP_PRIORITY") {
        // Priority ranking: Overdue & Due Today first, then upcoming, then unscheduled
        const getPriorityScore = (l: CrmLeadModel) => {
          if (!l.nextFollowUp || l.status === "WON" || l.status === "LOST") return 9999999999999;
          const dt = new Date(l.nextFollowUp).getTime();
          return dt; // Earliest timestamp first
        };
        return getPriorityScore(a) - getPriorityScore(b);
      }

      if (sortMode === "PAYMENT_DUE") {
        const getPayScore = (l: CrmLeadModel) => {
          if (!l.nextPaymentDate) return 9999999999999;
          return new Date(l.nextPaymentDate).getTime();
        };
        return getPayScore(a) - getPayScore(b);
      }

      if (sortMode === "HIGHEST_PRICE") {
        const getPrice = (l: CrmLeadModel) => {
          const num = l.fixAmount || l.approxAmount || "0";
          const match = num.match(/\d[\d,]*/);
          return match ? parseInt(match[0].replace(/,/g, ""), 10) || 0 : 0;
        };
        return getPrice(b) - getPrice(a);
      }

      // Default NEWEST
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [initialLeads, selectedFilter, searchQuery, sortMode]);

  async function handleQuickStatusChange(leadId: string, newStatus: CrmLeadStatus) {
    await updateLeadAction(leadId, { status: newStatus });
  }

  // Get Follow Up urgency badge for a lead
  function getFollowUpBadge(nextFollowUp?: string | null, status?: CrmLeadStatus) {
    if (!nextFollowUp || status === "WON" || status === "LOST") return null;

    const followUpDate = new Date(nextFollowUp);
    const now = new Date();
    const isToday = followUpDate.toDateString() === now.toDateString();
    const isOverdue = followUpDate < now && !isToday;

    if (isOverdue) {
      return (
        <span className="flex items-center gap-1 rounded-md bg-rose-500/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-rose-400 border border-rose-500/40 animate-pulse">
          <AlertTriangle size={11} /> OVERDUE
        </span>
      );
    }
    if (isToday) {
      return (
        <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-amber-400 border border-amber-500/40">
          <Clock size={11} /> DUE TODAY
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-cyan-400 border border-cyan-500/30">
        <Calendar size={11} /> UPCOMING
      </span>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Main Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-flow/15 text-flow border border-flow/30 shadow-md">
            <Users size={24} />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-chalk">Lead Management CRM</h1>
            <p className="font-mono text-xs text-muted">
              Pipeline tracking, follow-up priority queue & advance payment management
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-flow px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 shadow-lg shadow-flow/20"
        >
          <Plus size={16} /> Add Manual Lead
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-6">
        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Total Leads</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-chalk">{stats.totalLeads}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-flow">Website + Manual</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Due Today</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-amber-400">{stats.dueTodayCount}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-amber-400/80">Follow-up call</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Quotations</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-purple-400">{stats.quotationsSentCount}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-purple-400/80">Sent active</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Pipeline Value</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-flow">{stats.totalPipelineValue}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-muted">Active deals</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-emerald-400 font-semibold">Advance</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-emerald-400">{stats.totalAdvanceCollected}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-emerald-400/80">Collected</span>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4 space-y-0.5">
          <p className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-amber-400 font-semibold">Balance</p>
          <p className="font-heading text-lg sm:text-2xl font-bold text-amber-400">{stats.totalBalancePending}</p>
          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-amber-400/80">Pending</span>
        </div>
      </div>

      {/* Filter Tabs, Sort & View Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-chalk/15 pb-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {STATUS_FILTERS.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-flow text-ink shadow-md"
                    : "bg-surface text-muted border border-chalk/15 hover:border-chalk/30 hover:text-chalk"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-3 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone, service..."
              className="w-full rounded-xl border border-chalk/20 bg-surface px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
            />
          </div>

          {/* Priority Sort Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-chalk/20 bg-surface px-3 py-1.5 font-mono text-xs text-chalk">
            <ArrowUpDown size={14} className="text-flow" />
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer"
            >
              <option value="FOLLOWUP_PRIORITY">Follow-up Priority Queue</option>
              <option value="NEWEST">Newest First</option>
              <option value="PAYMENT_DUE">Next Payment Due Date</option>
              <option value="HIGHEST_PRICE">Highest Deal Value</option>
            </select>
          </div>

          {/* List / Grid View Switcher */}
          <div className="flex items-center rounded-xl border border-chalk/20 bg-surface p-1">
            <button
              onClick={() => setViewMode("list")}
              title="List View"
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "list" ? "bg-flow text-ink" : "text-muted hover:text-chalk"
              }`}
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid Card View"
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "grid" ? "bg-flow text-ink" : "text-muted hover:text-chalk"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {processedLeads.length > 0 ? (
        viewMode === "list" ? (
          /* TABULAR LIST VIEW (User requested primary list view) */
          <div className="overflow-x-auto rounded-2xl border border-chalk/15 bg-surface shadow-xl">
            <table className="w-full text-left font-body text-xs border-collapse">
              <thead>
                <tr className="border-b border-chalk/15 bg-ink/70 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                  <th className="py-3.5 px-4 font-semibold">Priority & Client</th>
                  <th className="py-3.5 px-4 font-semibold">Service</th>
                  <th className="py-3.5 px-4 font-semibold">Pipeline Status</th>
                  <th className="py-3.5 px-4 font-semibold">Pricing & Advance</th>
                  <th className="py-3.5 px-4 font-semibold">Quotation</th>
                  <th className="py-3.5 px-4 font-semibold">Next Follow-up</th>
                  <th className="py-3.5 px-4 font-semibold">Next Payment</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-chalk/10">
                {processedLeads.map((lead) => {
                  const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                  const payBadge = PAYMENT_BADGES[lead.paymentStatus] || PAYMENT_BADGES.PENDING;
                  const urgencyBadge = getFollowUpBadge(lead.nextFollowUp, lead.status);

                  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding ${lead.serviceTitle}...`)}`;

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-ink/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Client Info & Priority Badge */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {urgencyBadge}
                            <span className="font-heading font-bold text-chalk text-sm group-hover:text-flow transition-colors">
                              {lead.name}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[0.7rem] text-muted">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                            >
                              <Phone size={11} /> {lead.phone}
                            </a>
                            {lead.email && <span className="truncate max-w-[130px] text-chalk/90">{lead.email}</span>}
                            {lead.companyName && <span className="text-amber-400 font-semibold">{lead.companyName}</span>}
                            {lead.location && <span className="text-cyan-400">📍 {lead.location}</span>}
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
                          <option value="IN_DISCUSSION">In Discussion</option>
                          <option value="QUOTATION_SENT">Quotation Sent</option>
                          <option value="FOLLOWUP_SCHEDULED">Follow-up Set</option>
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

                      {/* Quotation Sent Badge */}
                      <td className="py-3.5 px-4 font-mono text-xs">
                        <span
                          className={`px-2 py-0.5 rounded text-[0.65rem] uppercase font-bold ${
                            lead.quotationSent
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-chalk/10 text-muted"
                          }`}
                        >
                          {lead.quotationSent ? "YES SENT" : "PENDING"}
                        </span>
                      </td>

                      {/* Next Follow Up Date */}
                      <td className="py-3.5 px-4 font-mono text-xs">
                        {lead.nextFollowUp ? (
                          <div className="text-chalk">
                            {new Date(lead.nextFollowUp).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        ) : (
                          <span className="text-muted/50">—</span>
                        )}
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
                            className="rounded-xl border border-flow/40 bg-flow/10 px-3 py-1.5 font-mono text-xs font-bold text-flow transition-colors hover:bg-flow hover:text-ink"
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
        ) : (
          /* GRID CARD VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processedLeads.map((lead) => {
              const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
              const urgencyBadge = getFollowUpBadge(lead.nextFollowUp, lead.status);

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="group relative rounded-2xl border border-chalk/15 bg-surface p-5 space-y-4 transition-all duration-200 hover:border-flow/40 hover:shadow-xl hover:shadow-flow/5 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">{urgencyBadge}</div>
                        <h3 className="font-heading text-base font-bold text-chalk group-hover:text-flow transition-colors">
                          {lead.name}
                        </h3>
                        <p className="font-mono text-xs text-muted flex items-center gap-1 mt-0.5">
                          <Briefcase size={12} className="text-flow" /> {lead.serviceTitle}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs text-muted border-t border-chalk/10 pt-2.5">
                      <span className="flex items-center gap-1.5 text-chalk font-semibold">
                        <Phone size={13} className="text-muted" /> {lead.phone}
                      </span>
                      <span className="rounded bg-chalk/10 px-2 py-0.5 text-[0.65rem] uppercase font-bold text-flow">
                        {lead.source}
                      </span>
                    </div>

                    {/* Financial Amounts Breakdown */}
                    <div className="grid grid-cols-2 gap-2 rounded-xl border border-chalk/10 bg-ink/40 p-2.5 font-mono text-xs">
                      <div>
                        <span className="text-[0.65rem] text-muted block">Fixed Price:</span>
                        <span className="font-bold text-flow">{lead.fixAmount || lead.approxAmount || "Not set"}</span>
                      </div>
                      <div>
                        <span className="text-[0.65rem] text-muted block">Advance / Bal:</span>
                        <span className="font-bold text-emerald-400">{lead.advancePaid || "₹0"}</span>
                        <span className="text-amber-400 font-bold ml-1">({lead.balanceDue || "₹0"})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-chalk/10">
                    <div className="flex items-center justify-between font-mono text-[0.7rem]">
                      <span className="text-muted">
                        Quotation:{" "}
                        <strong className={lead.quotationSent ? "text-emerald-400" : "text-amber-400/80"}>
                          {lead.quotationSent ? "SENT" : "PENDING"}
                        </strong>
                      </span>

                      {lead.nextFollowUp && (
                        <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                          <Calendar size={11} />
                          {new Date(lead.nextFollowUp).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs pt-1">
                      <span className="text-muted text-[0.65rem] flex items-center gap-1">
                        <FileText size={11} /> {lead.timelineNotes?.length || 0} discussion notes
                      </span>

                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs font-bold text-flow group-hover:translate-x-1 transition-transform"
                      >
                        Manage Lead <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-dashed border-chalk/20 p-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface mx-auto text-muted">
            <Users size={24} />
          </div>
          <h3 className="font-heading text-base font-bold text-chalk">No leads found</h3>
          <p className="font-mono text-xs text-muted max-w-sm mx-auto">
            No leads match your current search query or filter status. Try changing filters or add a manual lead.
          </p>
        </div>
      )}

      {/* Manual Lead Modal */}
      <LeadFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Lead Detail & Timeline Drawer */}
      <LeadDetailDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
