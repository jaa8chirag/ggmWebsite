"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Phone, User, CheckCircle2, AlertCircle, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { submitQuoteRequest, type QuoteActionResult } from "@/app/actions/quote";

interface QuickQuoteCardProps {
  serviceSlug: string;
  serviceTitle: string;
  className?: string;
}

export default function QuickQuoteCard({
  serviceSlug,
  serviceTitle,
  className = "",
}: QuickQuoteCardProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteActionResult | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());
    formData.append("serviceSlug", serviceSlug);
    formData.append("serviceTitle", serviceTitle);
    formData.append("pageUrl", pageUrl || `/services/${serviceSlug}`);

    try {
      const res = await submitQuoteRequest(formData);
      setResult(res);
      if (res.success) {
        setName("");
        setPhone("");
        router.push("/thank-you");
      }
    } catch (err: any) {
      setResult({
        success: false,
        error: "Network error. Please call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-signal/40 bg-surface/95 p-4 sm:p-5 shadow-xl backdrop-blur-xl transition-all ${className}`}
    >
      {/* Subtle ambient corner glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-signal/15 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-flow/15 blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-signal/20 border border-signal/40 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-signal">
            <Zap size={11} className="fill-signal" />
            Get Quote in 15 Mins
          </span>
          <span className="font-mono text-[10px] text-muted flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Team
          </span>
        </div>

        <h4 className="mt-2 font-display text-base font-bold text-chalk leading-snug">
          Instant Pricing for <span className="text-flow">{serviceTitle}</span>
        </h4>
        <p className="mt-1 font-body text-[11px] text-muted">
          Leave your name &amp; phone. We&apos;ll call with custom scope &amp; price in 15 mins.
        </p>

        {/* Success State */}
        {result?.success ? (
          <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center animate-in fade-in zoom-in duration-200">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-1.5">
              <CheckCircle2 size={18} />
            </div>
            <p className="font-display text-xs font-bold text-chalk">
              Request Received! 🚀
            </p>
            <p className="mt-1 font-body text-[11px] text-chalk/90 leading-tight">
              Our specialist will call you within 15 minutes.
            </p>
            <button
              type="button"
              onClick={() => setResult(null)}
              className="mt-2 text-[10px] font-mono text-muted hover:text-chalk underline cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          /* Form Inputs */
          <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
            {result?.error && (
              <div className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 p-2 font-mono text-[11px] text-red-400">
                <AlertCircle size={13} className="shrink-0" />
                <span>{result.error}</span>
              </div>
            )}

            {/* Compact Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Name */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted">
                  <User size={13} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full rounded-lg border border-chalk/20 bg-ink/70 py-2 pl-8 pr-2.5 font-body text-xs text-chalk placeholder-muted/60 focus:border-signal focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted">
                  <Phone size={13} />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone / WhatsApp *"
                  className="w-full rounded-lg border border-chalk/20 bg-ink/70 py-2 pl-8 pr-2.5 font-body text-xs text-chalk placeholder-muted/60 focus:border-signal focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-signal py-2.5 px-3 font-mono text-xs font-bold uppercase tracking-wider text-chalk shadow-md transition-all hover:bg-flow hover:text-white disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Zap size={13} className="fill-current group-hover:scale-110 transition-transform" />
                  Get Quote in 15 Mins
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Trust Micro Footer */}
            <div className="flex items-center justify-center gap-3 pt-0.5 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-400" /> Free &amp; No Obligation
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-flow" /> 100% Confidential
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
