import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  ArrowRight,
  Clock,
  Award,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import { getLegalPages } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminLegalListPage() {
  const pages = await getLegalPages();

  const aboutSlugs = ["quality-compliance", "about-ceo", "about-the-company", "why-us"];
  const aboutPages = pages.filter((p) => aboutSlugs.includes(p.slug));
  const policyPages = pages.filter((p) => !aboutSlugs.includes(p.slug));

  return (
    <div className="max-w-4xl space-y-10 pb-16">
      <div>
        <h1 className="font-display text-2xl font-bold text-chalk">
          Pages &amp; Governance CMS
        </h1>
        <p className="mt-1 font-body text-sm text-muted">
          Manage and edit all dedicated About Us pages, CEO profile, Quality standards, and official Legal policies with full Rich Text support.
        </p>
      </div>

      {/* 1. About Us & Company Pages */}
      <div>
        <div className="flex items-center justify-between border-b border-chalk/15 pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-signal" />
            <h2 className="font-display text-lg font-bold text-chalk">
              1. About Us &amp; Company Sub-Pages
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            {aboutPages.length} Dedicated Pages
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {aboutPages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-chalk/15 bg-surface p-5 shadow-sm hover:border-flow/40 transition-all"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-chalk">
                    {page.title}
                  </h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600">
                    Live
                  </span>
                </div>
                {page.subtitle && (
                  <p className="mt-1 font-body text-xs text-muted line-clamp-1">
                    {page.subtitle}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted/70">
                  <span className="text-flow">/{page.slug}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {page.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/${page.slug}`}
                  target="_blank"
                  className="rounded-xl border border-chalk/15 px-3 py-1.5 font-mono text-xs text-muted hover:text-chalk transition-colors"
                >
                  View ↗
                </Link>
                <Link
                  href={`/admin/legal/${page.id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-flow px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-signal transition-colors"
                >
                  Edit Rich Text <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Official Certifications & Legal Policies */}
      <div>
        <div className="flex items-center justify-between border-b border-chalk/15 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-flow" />
            <h2 className="font-display text-lg font-bold text-chalk">
              2. Certifications &amp; Legal Policies
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            {policyPages.length} Policies Active
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {policyPages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-chalk/15 bg-surface p-5 shadow-sm hover:border-flow/40 transition-all"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-chalk">
                    {page.title}
                  </h3>
                  {page.slug === "certifications" && (
                    <span className="rounded-full bg-flow/15 border border-flow/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-flow">
                      PDF Upload Enabled
                    </span>
                  )}
                </div>
                {page.subtitle && (
                  <p className="mt-1 font-body text-xs text-muted line-clamp-1">
                    {page.subtitle}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted/70">
                  <span className="text-flow">/{page.slug}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {page.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/${page.slug}`}
                  target="_blank"
                  className="rounded-xl border border-chalk/15 px-3 py-1.5 font-mono text-xs text-muted hover:text-chalk transition-colors"
                >
                  View ↗
                </Link>
                <Link
                  href={`/admin/legal/${page.id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-flow px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-signal transition-colors"
                >
                  Edit Page <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
