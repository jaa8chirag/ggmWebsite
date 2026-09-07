"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  DollarSign,
  CheckCircle,
  Clock,
  Phone,
  Tag,
  AlertCircle,
  FileText,
  Briefcase,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { CrmLeadModel, CrmLeadStatus, CrmStats } from "@/types";
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
  FOLLOWUP_SCHEDULED: { label: "Follow-up Scheduled", bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/30" },
  WON: { label: "Deal Won 🎉", bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  LOST: { label: "Deal Lost", bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
};

export default function LeadsCrmContainer({ initialLeads, stats }: LeadsCrmContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CrmLeadStatus | "ALL">("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CrmLeadModel | null>(null);

  // Filter leads by status and search query
  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      const matchesFilter = selectedFilter === "ALL" || lead.status === selectedFilter;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !queryLower ||
        lead.name.toLowerCase().includes(queryLower) ||
        lead.phone.toLowerCase().includes(queryLower) ||
        (lead.email && lead.email.toLowerCase().includes(queryLower)) ||
        lead.serviceTitle.toLowerCase().includes(queryLower);

      return matchesFilter && matchesSearch;
    });
  }, [initialLeads, selectedFilter, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flow/15 text-flow border border-flow/30">
              <Users size={22} />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-chalk">Lead Management CRM</h1>
              <p className="font-mono text-xs text-muted">
                Track, convert, and manage client inquiries, quotations & follow-ups
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-flow px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-flow/90 shadow-lg shadow-flow/20"
        >
          <Plus size={16} /> Add Manual Lead
        </button>
      </div>

      {/* KPI Stats Widgets */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-chalk/15 bg-surface p-4 space-y-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Total Leads</p>
          <p className="font-heading text-2xl font-bold text-chalk">{stats.totalLeads}</p>
          <span className="font-mono text-[0.65rem] text-flow">Synced across all forms</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-4 space-y-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Follow-ups Due Today</p>
          <p className="font-heading text-2xl font-bold text-amber-400">{stats.dueTodayCount}</p>
          <span className="font-mono text-[0.65rem] text-amber-400/80">Pending action</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-4 space-y-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Quotations Sent</p>
          <p className="font-heading text-2xl font-bold text-purple-400">{stats.quotationsSentCount}</p>
          <span className="font-mono text-[0.65rem] text-purple-400/80">Active proposals</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-4 space-y-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Pipeline Value</p>
          <p className="font-heading text-2xl font-bold text-flow">{stats.totalPipelineValue}</p>
          <span className="font-mono text-[0.65rem] text-muted">Est. deal pipeline</span>
        </div>

        <div className="rounded-2xl border border-chalk/15 bg-surface p-4 space-y-1 col-span-2 lg:col-span-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted font-semibold">Total Revenue Won</p>
          <p className="font-heading text-2xl font-bold text-emerald-400">{stats.totalWonValue}</p>
          <span className="font-mono text-[0.65rem] text-emerald-400/80">Converted deals</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-chalk/15 pb-4">
        {/* Status Filter Tabs */}
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

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-3 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, service..."
            className="w-full rounded-xl border border-chalk/20 bg-surface px-3.5 py-2 pl-9 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
          />
        </div>
      </div>

      {/* Lead Cards List */}
      {filteredLeads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLeads.map((lead) => {
            const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
            const isFollowUpDue = lead.nextFollowUp && new Date(lead.nextFollowUp) <= new Date();

            return (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="group relative rounded-2xl border border-chalk/15 bg-surface p-5 space-y-4 transition-all duration-200 hover:border-flow/40 hover:shadow-xl hover:shadow-flow/5 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Card Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
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

                  {/* Phone & Source */}
                  <div className="flex items-center justify-between font-mono text-xs text-muted border-t border-chalk/10 pt-2.5">
                    <span className="flex items-center gap-1.5 text-chalk font-semibold">
                      <Phone size={13} className="text-muted" /> {lead.phone}
                    </span>
                    <span className="rounded bg-chalk/10 px-2 py-0.5 text-[0.65rem] uppercase font-bold text-flow">
                      {lead.source}
                    </span>
                  </div>

                  {/* Pricing Badges (Approx & Fix) */}
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-chalk/10 bg-ink/40 p-2.5 font-mono text-xs">
                    <div>
                      <span className="text-[0.65rem] text-muted block">Approx Budget:</span>
                      <span className="font-bold text-chalk">{lead.approxAmount || "Not set"}</span>
                    </div>
                    <div>
                      <span className="text-[0.65rem] text-muted block">Fix Price:</span>
                      <span className="font-bold text-flow">{lead.fixAmount || "Not set"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="space-y-2.5 pt-2 border-t border-chalk/10">
                  {/* Quotation & Follow up alerts */}
                  <div className="flex items-center justify-between font-mono text-[0.7rem]">
                    <span className="flex items-center gap-1 text-muted">
                      Quotation:{" "}
                      <strong className={lead.quotationSent ? "text-emerald-400" : "text-amber-400/80"}>
                        {lead.quotationSent ? "SENT" : "PENDING"}
                      </strong>
                    </span>

                    {lead.nextFollowUp && (
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded font-semibold ${
                          isFollowUpDue
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : "bg-chalk/10 text-cyan-400"
                        }`}
                      >
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
