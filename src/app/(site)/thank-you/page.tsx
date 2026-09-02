import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, MessageSquare, ArrowRight, ShieldCheck, Clock, Zap, Home } from "lucide-react";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Thank You | Request Received | GGM Technologies",
  description: "Thank you for reaching out to GGM Technologies. Our senior technical consultant will contact you within 15 minutes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage() {
  const settings = await getSettings();

  return (
    <main className="relative min-h-[90vh] bg-ink flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-flow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-96 w-96 rounded-full bg-signal/15 blur-3xl" />

      {/* Script Hook for Google Ads Conversion & GTM DataLayer */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'conversion',
              conversion_type: 'lead_form_submitted',
              timestamp: new Date().toISOString()
            });
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl w-full">
        <div className="rounded-3xl border-2 border-chalk/20 bg-surface/95 p-8 md:p-12 shadow-2xl backdrop-blur-xl text-center">
          {/* Animated Success Badge */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-500 shadow-inner">
            <CheckCircle2 size={44} className="stroke-[2.5]" />
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-500">
            <Zap size={12} className="fill-emerald-500" />
            Inquiry Successfully Logged
          </span>

          <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-chalk">
            Thank You! Your Request Is Received.
          </h1>

          <p className="mt-4 font-body text-base md:text-lg text-muted max-w-xl mx-auto">
            Our senior consultant is reviewing your requirements and will call you on your provided number within{" "}
            <span className="font-semibold text-signal">15 minutes</span> during operational hours.
          </p>

          {/* Quick Immediate Action Box */}
          <div className="mt-8 rounded-2xl border border-chalk/15 bg-ink/60 p-5 md:p-6 text-left">
            <p className="font-mono text-xs uppercase tracking-widest text-muted text-center md:text-left">
              Need Immediate Assistance or Prefer WhatsApp?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/919696969696?text=${encodeURIComponent(
                  "Hello GGM Technologies, I just submitted an inquiry on your website. I would like to discuss my project directly."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-emerald-600 transition-all"
              >
                <MessageSquare size={16} />
                Chat on WhatsApp Now
              </a>

              {/* Direct Call Button */}
              <a
                href={settings.phoneHref}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-xl border border-flow/40 bg-flow/15 py-3.5 px-5 font-mono text-xs font-bold uppercase tracking-wider text-flow hover:bg-flow hover:text-white transition-all"
              >
                <Phone size={16} />
                Call Directly ({settings.phone})
              </a>
            </div>
          </div>

          {/* 3 Steps - What Happens Next */}
          <div className="mt-10 pt-8 border-t border-chalk/15 text-left">
            <h2 className="font-mono text-xs uppercase tracking-widest text-flow text-center">
              What Happens Next
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-chalk/10 bg-surface p-4">
                <span className="font-mono text-xs font-bold text-signal">01</span>
                <p className="mt-1.5 font-display text-sm font-bold text-chalk">Discovery Call</p>
                <p className="mt-1 text-xs text-muted">
                  A 5-minute technical discovery to understand your target audience and growth goals.
                </p>
              </div>

              <div className="rounded-2xl border border-chalk/10 bg-surface p-4">
                <span className="font-mono text-xs font-bold text-flow">02</span>
                <p className="mt-1.5 font-display text-sm font-bold text-chalk">Custom Proposal</p>
                <p className="mt-1 text-xs text-muted">
                  Clear deliverable scope, ROI timeline, and transparent pricing tailored to your scale.
                </p>
              </div>

              <div className="rounded-2xl border border-chalk/10 bg-surface p-4">
                <span className="font-mono text-xs font-bold text-emerald-500">03</span>
                <p className="mt-1.5 font-display text-sm font-bold text-chalk">Rapid Execution</p>
                <p className="mt-1 text-xs text-muted">
                  Dedicated project director assigned for day-one sprint delivery and reporting.
                </p>
              </div>
            </div>
          </div>

          {/* Return Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-ink px-5 py-2.5 font-mono text-xs font-semibold text-chalk hover:border-flow hover:text-flow transition-all"
            >
              <Home size={14} /> Back to Homepage
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-chalk hover:bg-flow hover:text-white transition-all shadow-md"
            >
              Explore Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
