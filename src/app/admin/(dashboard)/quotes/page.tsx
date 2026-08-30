import { getQuotes, getQuoteStats } from "@/lib/queries";
import QuotesTable from "@/components/admin/quotes/QuotesTable";
import { Zap, Clock, MessageSquare, CheckCircle2, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const [quotes, stats] = await Promise.all([
    getQuotes(),
    getQuoteStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal/20 text-signal">
              <Zap size={16} />
            </span>
            <h1 className="font-display text-2xl font-bold text-chalk">
              15-Minute Quotes &amp; Rapid Leads
            </h1>
          </div>
          <p className="mt-1 font-body text-xs text-muted">
            Real-time inquiries captured from service pages with exact source tracking.
          </p>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-chalk/15 bg-surface/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              Total Inquiries
            </span>
            <TrendingUp size={16} className="text-flow" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-chalk">
            {stats.total}
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted">All-time quote requests</p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-signal/30 bg-signal/5 p-5 shadow-sm">
          <div className="flex items-center justify-between text-signal">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              Pending Callback
            </span>
            <Clock size={16} className="text-signal" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-signal">
            {stats.pending}
          </p>
          <p className="mt-1 font-mono text-[10px] text-signal/80">Needs 15-min call</p>
        </div>

        {/* Contacted */}
        <div className="rounded-2xl border border-flow/30 bg-flow/5 p-5 shadow-sm">
          <div className="flex items-center justify-between text-flow">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              Contacted
            </span>
            <MessageSquare size={16} className="text-flow" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-flow">
            {stats.contacted}
          </p>
          <p className="mt-1 font-mono text-[10px] text-flow/80">In communication</p>
        </div>

        {/* Converted */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              Converted Deals
            </span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-emerald-400">
            {stats.converted}
          </p>
          <p className="mt-1 font-mono text-[10px] text-emerald-400/80">Successful clients</p>
        </div>
      </div>

      {/* Main Interactive Table */}
      <QuotesTable initialQuotes={quotes} />
    </div>
  );
}
