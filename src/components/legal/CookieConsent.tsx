"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  X,
  Lock,
} from "lucide-react";

interface CookiePreferences {
  essential: boolean;
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
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

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
      {/* 1. Compact Bottom-Right Floating Card */}
      {!showPreferences && (
        <aside
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent card"
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-[380px] animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:right-6"
        >
          <div className="rounded-2xl border border-white/80 bg-surface/95 p-4 sm:p-5 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            {/* Header / Dismiss */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-flow/10 text-flow shadow-sm">
                  <Cookie size={18} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-chalk">
                    Cookie &amp; Privacy Choices
                  </h3>
                  <span className="font-mono text-[10px] text-muted">
                    EU GDPR Compliant
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="rounded-lg p-1 text-muted/70 hover:bg-chalk/10 hover:text-chalk transition-colors"
                aria-label="Dismiss cookie notice"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="mt-2.5 font-body text-xs text-muted leading-relaxed">
              We use cookies to ensure optimal security, analyze traffic, and improve site performance. Learn more in our{" "}
              <Link
                href="/cookie-policy"
                className="font-medium text-flow underline decoration-flow/40 hover:text-signal"
              >
                Cookie Policy
              </Link>
              .
            </p>

            {/* Action Buttons */}
            <div className="mt-3.5 flex items-center justify-between gap-2 pt-2 border-t border-chalk/10">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="flex items-center gap-1 font-mono text-[11px] text-muted hover:text-flow transition-colors"
              >
                <Settings2 size={13} /> Preferences
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="rounded-full border border-chalk/25 bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-chalk/40 hover:text-chalk transition-colors"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-full bg-flow px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-md shadow-flow/20 hover:bg-signal transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Detailed Granular Preferences Modal */}
      {showPreferences && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-chalk/20 bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-chalk/15 bg-ink/40 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-flow/10 text-flow">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h2 id="cookie-modal-title" className="font-display text-base font-bold text-chalk">
                    Cookie Preferences Center
                  </h2>
                  <p className="font-mono text-[10px] text-muted">
                    EU GDPR Article 6 &amp; 7 Consent Management
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="rounded-full p-1.5 text-muted hover:bg-chalk/10 hover:text-chalk transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Granular Cookie Toggles Container */}
            <div className="max-h-[55vh] space-y-3 overflow-y-auto p-5 font-body">
              {/* Category 1: Strictly Necessary */}
              <div className="rounded-xl border border-chalk/15 bg-ink/30 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-flow" />
                    <h3 className="font-display text-sm font-bold text-chalk">
                      1. Strictly Necessary
                    </h3>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-600">
                    Always Active
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
                  Essential for security, authentication, and core page rendering. Cannot be disabled.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="rounded-xl border border-chalk/15 bg-ink/30 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-sm font-bold text-chalk">
                      2. Analytics &amp; Performance
                    </h3>
                    <p className="text-[10px] font-mono text-muted/70">
                      GA4, Core Web Vitals telemetry
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
                    <div className="h-5 w-9 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
                  Anonymized visitor insights and server performance telemetry.
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div className="rounded-xl border border-chalk/15 bg-ink/30 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-sm font-bold text-chalk">
                      3. Marketing &amp; Pixels
                    </h3>
                    <p className="text-[10px] font-mono text-muted/70">
                      Google Ads, Meta Pixel
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
                    <div className="h-5 w-9 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
                  Measures ad campaign performance without personal profiling.
                </p>
              </div>

              {/* Category 4: Functional */}
              <div className="rounded-xl border border-chalk/15 bg-ink/30 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-sm font-bold text-chalk">
                      4. Functional Preferences
                    </h3>
                    <p className="text-[10px] font-mono text-muted/70">
                      Form drafts, layout states
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
                    <div className="h-5 w-9 rounded-full bg-chalk/20 peer-checked:bg-flow peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
                  Preserves inquiry form draft inputs across page navigation.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-chalk/15 bg-ink/40 px-5 py-3.5">
              <Link
                href="/cookie-policy"
                className="font-mono text-[11px] text-muted underline hover:text-flow"
              >
                Policy Details ↗
              </Link>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="rounded-full border border-chalk/20 bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-chalk"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="rounded-full border border-flow/40 bg-flow/15 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-flow hover:bg-flow hover:text-white transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-full bg-flow px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-md hover:bg-signal transition-colors"
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
