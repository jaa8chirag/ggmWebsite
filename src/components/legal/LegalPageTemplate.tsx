import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle2,
  Download,
  ExternalLink,
  Award,
  Eye,
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FormattedText from "@/components/ui/FormattedText";
import Button from "@/components/ui/Button";
import type { LegalPage, CertificateDocument } from "@/types";

interface LegalPageTemplateProps {
  page: LegalPage;
  certificates?: CertificateDocument[];
}

export default function LegalPageTemplate({
  page,
  certificates = [],
}: LegalPageTemplateProps) {
  return (
    <div className="bg-ink text-chalk min-h-screen py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Breadcrumbs
          items={[
            { name: page.title, path: `/${page.slug}` },
          ]}
        />

        {/* Page Header Hero */}
        <div className="mt-8 border-b border-chalk/15 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flow/30 bg-flow/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-flow">
              <ShieldCheck size={14} /> Official Policy &amp; Credentials
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <Clock size={13} /> Last Updated: {page.lastUpdated}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-chalk sm:text-5xl md:text-6xl">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="mt-4 max-w-3xl font-body text-lg text-muted leading-relaxed">
              {page.subtitle}
            </p>
          )}
        </div>

        {/* 2-Column Content Layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main Article Rich Content */}
          <article className="min-w-0 space-y-10">
            {/* Verified Certificates & Downloadable PDFs Grid */}
            {certificates.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-flow" />
                  <h2 className="font-display text-2xl font-bold text-chalk">
                    Official Verified Certificates &amp; Licenses
                  </h2>
                </div>
                <p className="font-body text-sm text-muted">
                  Click below to view or download official PDF credentials for Government MSME registration, GST compliance, and partner accreditations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex flex-col justify-between rounded-3xl border border-chalk/15 bg-surface/80 p-6 shadow-sm hover:border-flow/40 transition-all backdrop-blur-xl"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full border border-flow/30 bg-flow/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-flow">
                            <ShieldCheck size={11} /> Verified
                          </span>
                          {cert.issueDate && (
                            <span className="font-mono text-[11px] text-muted">
                              {cert.issueDate}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-4 font-display text-lg font-bold text-chalk leading-snug">
                          {cert.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-muted">
                          Issued by: <strong className="text-chalk">{cert.issuer}</strong>
                        </p>
                        <p className="mt-1 font-mono text-xs text-flow">
                          Reg No: {cert.certificateNo}
                        </p>

                        {cert.description && (
                          <p className="mt-3 font-body text-xs text-muted leading-relaxed">
                            {cert.description}
                          </p>
                        )}

                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-chalk/10 pt-4">
                        {/* View Document in Browser */}
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-flow/40 bg-flow/10 py-2.5 px-3 font-mono text-xs font-semibold text-flow hover:bg-flow hover:text-white transition-all shadow-sm cursor-pointer"
                          title={`View ${cert.title}`}
                        >
                          <Eye size={14} />
                          <span>View PDF</span>
                        </a>

                        {/* Direct Download PDF */}
                        <a
                          href={cert.pdfUrl}
                          download
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-flow py-2.5 px-3 font-mono text-xs font-semibold text-white hover:bg-signal transition-all shadow-sm cursor-pointer"
                          title={`Download ${cert.title}`}
                        >
                          <Download size={14} />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rich Text Policy Body */}
            <div className="rounded-3xl border border-chalk/15 bg-surface/60 p-6 sm:p-10 shadow-sm backdrop-blur-xl">
              <FormattedText
                text={page.content}
                className="font-body text-body text-muted leading-relaxed"
              />
            </div>

            {/* Bottom Trust Seal */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-flow/20 bg-flow/5 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-flow shrink-0" />
                <div>
                  <p className="font-display text-base font-bold text-chalk">
                    Verified Digital Governance
                  </p>
                  <p className="font-body text-xs text-muted">
                    Maintained &amp; enforced by GGM Technologies Legal &amp; Compliance Team.
                  </p>
                </div>
              </div>
              <Button href="/contact" variant="signal" className="shrink-0 text-xs px-4 py-2">
                Questions? Contact Us
              </Button>
            </div>
          </article>

          {/* Sticky Sidebar with Navigation to other legal policies */}
          <aside className="space-y-6">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-2xl border border-chalk/15 bg-surface p-6 shadow-sm">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-flow flex items-center gap-1.5">
                  <FileText size={14} /> Legal &amp; Governance
                </h3>
                <ul className="mt-4 space-y-2 font-body text-sm">
                  {[
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Refund & Cancellation", href: "/refund-policy" },
                    { label: "Cookie Policy", href: "/cookie-policy" },
                    { label: "Disclaimer & Terms", href: "/disclaimer" },
                    { label: "Certifications & Badges", href: "/certifications" },
                  ].map((item) => {
                    const isCurrent = item.href === `/${page.slug}`;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                            isCurrent
                              ? "bg-flow/15 font-bold text-flow border border-flow/25"
                              : "text-muted hover:bg-chalk/5 hover:text-chalk"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight size={12} className={isCurrent ? "text-flow" : "opacity-40"} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Direct Support Card */}
              <div className="rounded-2xl border border-chalk/15 bg-surface p-6">
                <p className="font-display text-base font-bold text-chalk">
                  Need Legal Clarification?
                </p>
                <p className="mt-2 font-body text-xs text-muted">
                  Reach out directly to our compliance officers regarding NDAs, data protection, or partner accreditations.
                </p>
                <div className="mt-4 space-y-1 font-mono text-xs text-muted">
                  <p>Email: legal@ggmtechnologies.com</p>
                  <p>Location: New Delhi, India</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
