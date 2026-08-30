"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Filter,
  Search,
  Zap,
  Globe,
  Loader2,
} from "lucide-react";
import type { QuoteRequest, QuoteStatus } from "@/types";
import { updateQuoteStatusAction, deleteQuoteAction } from "@/app/actions/quote";

interface QuotesTableProps {
  initialQuotes: QuoteRequest[];
}

export default function QuotesTable({ initialQuotes }: QuotesTableProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = filterStatus === "ALL" || q.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.includes(searchQuery) ||
      q.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: QuoteStatus) => {
    setUpdatingId(id);
    try {
      await updateQuoteStatusAction(id, newStatus);
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
    } catch (err) {
      console.error("Failed to update quote status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote lead?")) return;
    setUpdatingId(id);
    try {
      await deleteQuoteAction(id);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete quote:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const cleanPhoneForWhatsApp = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-signal">
            <Clock size={11} /> Pending
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-flow/40 bg-flow/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-flow">
            <MessageSquare size={11} /> Contacted
          </span>
        );
      case "CONVERTED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
            <CheckCircle2 size={11} /> Converted
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-chalk/20 bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted">
            Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by prospect name, phone, or service..."
            className="w-full rounded-xl border border-chalk/20 bg-surface/80 py-2 pl-10 pr-3 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["ALL", "PENDING", "CONTACTED", "CONVERTED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterStatus === st
                  ? "bg-flow text-white shadow-sm"
                  : "border border-chalk/15 bg-surface text-muted hover:text-chalk"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-3xl border border-chalk/15 bg-surface/80 shadow-md backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-xs text-chalk">
            <thead className="border-b border-chalk/15 bg-surface font-mono text-[11px] uppercase tracking-wider text-muted">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                <th className="py-3.5 px-4 font-semibold">Prospect</th>
                <th className="py-3.5 px-4 font-semibold">Phone &amp; Quick Action</th>
                <th className="py-3.5 px-4 font-semibold">Service Origin</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chalk/10">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center font-mono text-xs text-muted">
                    No quote requests found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => {
                  const dateStr = new Date(q.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-chalk/5 transition-colors duration-150"
                    >
                      {/* Date */}
                      <td className="py-4 px-4 font-mono text-xs text-muted whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Name */}
                      <td className="py-4 px-4">
                        <span className="font-display text-sm font-bold text-chalk">
                          {q.name}
                        </span>
                      </td>

                      {/* Phone & Direct Action Buttons */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-chalk">
                            {q.phone}
                          </span>
                          {/* One-Click Call */}
                          <a
                            href={`tel:${q.phone}`}
                            title={`Call ${q.name}`}
                            className="inline-flex items-center justify-center rounded-lg bg-flow/15 p-1.5 text-flow hover:bg-flow hover:text-white transition-colors"
                          >
                            <Phone size={13} />
                          </a>
                          {/* One-Click WhatsApp */}
                          <a
                            href={`https://wa.me/${cleanPhoneForWhatsApp(q.phone)}?text=${encodeURIComponent(
                              `Hello ${q.name}, thank you for requesting a quote for ${q.serviceTitle} on GGM Technologies. How can our team help you today?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`WhatsApp ${q.name}`}
                            className="inline-flex items-center justify-center rounded-lg bg-emerald-500/15 p-1.5 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                          >
                            <MessageSquare size={13} />
                          </a>
                        </div>
                      </td>

                      {/* Service Origin */}
                      <td className="py-4 px-4">
                        <div>
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-flow">
                            <Zap size={11} className="text-signal" />
                            {q.serviceTitle}
                          </span>
                          {q.pageUrl && (
                            <a
                              href={q.pageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-muted hover:text-chalk truncate max-w-xs"
                              title={q.pageUrl}
                            >
                              <Globe size={10} />
                              <span className="truncate">{q.pageUrl.replace(/^https?:\/\/[^\/]+/, "")}</span>
                              <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={q.status}
                          disabled={updatingId === q.id}
                          onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                          className="rounded-xl border border-chalk/20 bg-surface/90 py-1 px-2.5 font-mono text-xs text-chalk focus:border-flow focus:outline-none cursor-pointer"
                        >
                          <option value="PENDING">⚡ Pending</option>
                          <option value="CONTACTED">💬 Contacted</option>
                          <option value="CONVERTED">🎯 Converted</option>
                          <option value="ARCHIVED">📦 Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(q.id)}
                          disabled={updatingId === q.id}
                          title="Delete Lead"
                          className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        >
                          {updatingId === q.id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
