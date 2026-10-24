"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-signal/30 bg-signal/10 text-signal mb-4 shadow-lg shadow-signal/5">
        <AlertTriangle size={32} />
      </div>
      <h2 className="font-display text-2xl font-bold text-chalk">
        Unable to load dashboard section
      </h2>
      <p className="mt-2 max-w-md font-body text-xs text-muted leading-relaxed">
        {error.message || "An unexpected error occurred while loading this section."}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk hover:bg-flow hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw size={14} /> Retry Section
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-xl border border-chalk/20 bg-surface px-4 py-2 font-mono text-xs font-semibold text-chalk hover:bg-chalk/10 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
