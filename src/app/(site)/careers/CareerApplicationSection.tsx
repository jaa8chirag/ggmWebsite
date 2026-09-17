"use client";

import { useState } from "react";
import {
  ExternalLink,
  RotateCw,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const GOOGLE_FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdLWMqfKSVfVjgMpcuKcCMTh0DC8IrU8pyzPErBXnDRujnohg/viewform?usp=header";

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdLWMqfKSVfVjgMpcuKcCMTh0DC8IrU8pyzPErBXnDRujnohg/viewform?embedded=true";

interface CareerApplicationSectionProps {
  settingsEmail?: string | null;
  settingsPhone?: string | null;
  settingsPhoneHref?: string | null;
  settingsWhatsapp?: string | null;
}

export default function CareerApplicationSection({
  settingsEmail,
  settingsPhone,
  settingsPhoneHref,
  settingsWhatsapp,
}: CareerApplicationSectionProps) {
  const email = settingsEmail || "info@ggmtechnologies.com";
  const phone = settingsPhone || "+91 9002600880";
  const phoneHref = settingsPhoneHref || "tel:+919002600880";
  const whatsapp = settingsWhatsapp || "+919002600880";

  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "Hello GGM Technologies HR Team! I am interested in exploring career opportunities."
  )}`;

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section id="apply-form" className="mt-24 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-flow/30 bg-flow/10 px-4 py-1.5 font-mono text-xs font-semibold text-flow">
          <FileText size={14} /> Official Application Portal
        </div>

        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl md:text-5xl">
          Submit Your Candidate Profile
        </h2>

        <p className="mt-3 font-body text-base text-muted leading-relaxed">
          Please fill out the official recruitment form below. Provide your contact details, portfolio or LinkedIn link, and attach your updated CV/Resume.
        </p>
      </div>

      {/* Action Strip & Instructions */}
      <div className="mt-8 mx-auto max-w-5xl rounded-3xl border border-chalk/15 bg-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flow/10 text-flow">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-chalk">
                Google Form Secure Submission
              </p>
              <p className="font-body text-xs text-muted">
                Directly submitted to the GGM Technologies HR &amp; Hiring Team.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Direct Open in New Tab Button */}
            <a
              href={GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-flow px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-flow/90 transition-all shadow-sm"
              title="Open Google Form in a new window"
            >
              <span>Open in New Tab</span>
              <ExternalLink size={13} />
            </a>

            {/* Refresh Iframe */}
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1.5 rounded-full border border-chalk/15 bg-ink/40 px-3.5 py-2.5 font-mono text-xs text-muted hover:border-chalk/30 hover:text-chalk transition-all cursor-pointer"
              title="Reload form embed"
            >
              <RotateCw size={13} className={isLoading ? "animate-spin text-flow" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Helpful notice regarding Google Drive upload */}
        <div className="mt-4 rounded-2xl border border-flow/20 bg-flow/5 p-3.5 flex items-start gap-2.5 text-xs text-muted font-body">
          <HelpCircle size={15} className="text-flow shrink-0 mt-0.5" />
          <p>
            <strong className="text-chalk">Sign-in Tip:</strong> Google Forms requires a Google account login whenever file uploads (Resume / CV) are accepted. If you see a login screen or cannot upload inside the iframe on mobile, simply click{" "}
            <a
              href={GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flow underline decoration-flow/40 underline-offset-2 hover:text-chalk"
            >
              Open in New Tab
            </a>{" "}
            to fill out the form directly in your browser.
          </p>
        </div>
      </div>

      {/* Embedded Google Form Container */}
      <div className="mt-6 mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-chalk/15 bg-white shadow-xl">
          {/* Top Browser-like bar */}
          <div className="flex items-center justify-between border-b border-chalk/10 bg-[#f8fafc] px-4 py-2.5 font-mono text-[11px] text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-medium text-chalk/70">
                GGM Technologies Candidate Application Form
              </span>
            </div>
            <a
              href={GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-flow hover:underline"
            >
              <span>Full Screen</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 top-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-10 transition-opacity">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-flow/20 border-t-flow" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                Loading official Google Form...
              </p>
              <p className="mt-1 font-body text-xs text-muted/70">
                Takes only a moment to load
              </p>
            </div>
          )}

          {/* Google Form Iframe */}
          <iframe
            key={iframeKey}
            src={GOOGLE_FORM_EMBED_URL}
            title="GGM Technologies Careers Application Form"
            width="100%"
            height="1150"
            className="w-full border-0 min-h-[950px] md:min-h-[1150px] block"
            onLoad={() => setIsLoading(false)}
          >
            Loading Application Form…
          </iframe>
        </div>
      </div>

      {/* Alternative Application Options (Direct Email & WhatsApp fallback) */}
      <div className="mt-12 mx-auto max-w-5xl rounded-3xl border border-chalk/15 bg-surface/70 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-chalk flex items-center gap-2">
              <Sparkles size={16} className="text-signal" /> Prefer sending your CV directly?
            </h3>
            <p className="font-body text-sm text-muted max-w-xl">
              If you have an unconventional portfolio, executive inquiry, or need to send work samples directly, our HR desk is happy to review your email.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${settingsEmail}?subject=${encodeURIComponent(
                "Job Application — GGM Technologies"
              )}`}
              className="inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-ink/50 px-4 py-2 font-mono text-xs font-semibold text-chalk hover:border-flow hover:text-flow transition-colors"
            >
              <Mail size={13} className="text-flow" />
              <span>{email}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2 font-mono text-xs font-semibold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>HR WhatsApp</span>
            </a>

            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-ink/50 px-4 py-2 font-mono text-xs font-semibold text-chalk hover:border-flow hover:text-flow transition-colors"
            >
              <Phone size={13} className="text-flow" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
