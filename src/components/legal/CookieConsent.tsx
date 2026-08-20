"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  Check,
  X,
  Lock,
  ChevronRight,
  Info,
} from "lucide-react";

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
}

const STORAGE_KEY = "ggm_cookie_consent_v1";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState<{
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }>({
    analytics: true,
    marketing: false,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already made a decision
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay to ensure smooth initial page load
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if localStorage is unavailable
      setIsVisible(true);
    }
  }, []);

  // Listen for custom trigger to reopen cookie preferences from footer/links
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenSettings);
  }, []);

  const saveConsent = (prefs: {
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }) => {
    const consentRecord: CookiePreferences = {
      essential: true,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      functional: prefs.functional,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentRecord));
      // Dispatch custom event for tag manager / analytics script gating
      window.dispatchEvent(
        new CustomEvent("ggm_consent_updated", { detail: consentRecord })
      );
    } catch (e) {
      console.error("Failed to persist cookie consent", e);
    }

    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Main Bottom Consent Banner (Glassmorphic & Non-intrusive) */}
      {!showPreferences && (
        <aside
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
          className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/80 bg-surface/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Info Column */}
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flow/10 text-flow shadow-sm">
                  <Cookie size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-chalk">
                      EU Cookie &amp; Privacy Consent
                    </h3>
                    <span className="rounded-full border border-flow/30 bg-flow/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-flow">
                      GDPR / ePrivacy Compliant
                    </span>
                  </div>
                  <p className="mt-2 font-body text-xs sm:text-sm text-muted leading-relaxed">
                    We use cookies and telemetry tools to secure our website, optimize performance, and analyze visitor traffic in accordance with EU GDPR norms. You can choose which categories to allow or adjust your choices at any time. Read our{" "}
                    <Link
                      href="/cookie-policy"
                      className="font-medium text-flow underline decoration-flow/40 hover:text-signal"
                    >
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-flow underline decoration-flow/40 hover:text-signal"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center gap-1.5 rounded-full border border-chalk/20 bg-ink/40 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-chalk transition-colors hover:border-flow hover:text-flow"
                >
                  <Settings2 size={14} /> Preferences
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="rounded-full border border-chalk/25 bg-surface px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-chalk/40 hover:text-chalk"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-full bg-flow px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-flow/20 transition-all hover:bg-signal"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Detailed Granular Preferences Modal (EU Norms Specifics) */}
      {showPreferences && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-chalk/20 bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-chalk/15 bg-ink/40 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flow/10 text-flow">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 id="cookie-modal-title" className="font-display text-lg font-bold text-chalk">
                    Cookie Preferences Center
                  </h2>
                  <p className="font-mono text-[11px] text-muted">
                    EU GDPR Article 6 &amp; 7 Compliant Consent Management
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="rounded-full p-2 text-muted hover:bg-chalk/10 hover:text-chalk transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Granular Cookie Toggles Container */}
            <div className="max-h-[60vh] space-y-4 overflow-y-auto p-6 font-body">
              {/* Category 1: Strictly Necessary (Locked ON) */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/30 p-4.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Lock size={16} className="text-flow" />
                    <h3 className="font-display text-base font-bold text-chalk">
                      1. Strictly Necessary &amp; Security Cookies
                    </h3>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                    Always Active
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  These cookies are essential for the website to function securely. They enable core services such as admin CSRF protection, secure authentication, and layout stability. These cannot be switched off under EU regulations.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/30 p-4.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-chalk">
                      2. Analytics &amp; Performance Cookies
                    </h3>
                    <p className="text-[11px] font-mono text-muted/70">
                      Google Analytics 4 (GA4), Core Web Vitals telemetry
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                      }
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Allows us to aggregate anonymized visitor statistics, identify high-traffic services, and optimize server response times. No direct personal identifiers are stored.
                </p>
              </div>

              {/* Category 3: Marketing & Conversion Pixels */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/30 p-4.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-chalk">
                      3. Marketing &amp; Retargeting Cookies
                    </h3>
                    <p className="text-[11px] font-mono text-muted/70">
                      Google Ads Conversion, Meta Pixel, LinkedIn Insight
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                      }
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Used to evaluate advertising ROI and display tailored digital growth case studies. If disabled, ads shown will be non-personalized.
                </p>
              </div>

              {/* Category 4: Functional & User Preferences */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/30 p-4.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-chalk">
                      4. Functional &amp; Experience Cookies
                    </h3>
                    <p className="text-[11px] font-mono text-muted/70">
                      Form drafts, local UI state preservation
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences((p) => ({ ...p, functional: e.target.checked }))
                      }
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Enables enhanced interactive features, preserving form inputs across navigation so you do not lose audit inquiries.
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-chalk/15 bg-ink/40 px-6 py-4">
              <Link
                href="/cookie-policy"
                className="font-mono text-xs text-muted underline decoration-chalk/30 hover:text-flow"
              >
                Read Full Cookie Policy ↗
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="rounded-full border border-chalk/20 bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-chalk"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="rounded-full border border-flow/40 bg-flow/15 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-flow hover:bg-flow hover:text-white transition-colors"
                >
                  Save Choices
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-full bg-flow px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-signal transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
