import type { Metadata } from "next";
import { getWork } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaBand from "@/components/home/CtaBand";
import { buildMetadata } from "@/lib/seo";
import WorkGrid from "@/components/work/WorkGrid";

import { Award, TrendingUp, Zap, ShieldCheck } from "lucide-react";

const title = "Our Work & Case Studies | GGM Technologies";
const description =
  "SEO, PPC, and web development case studies from GGM Technologies — real engagements, real results.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/work",
});

export default async function WorkPage() {
  const work = await getWork();

  return (
    <>
      <div className="bg-ink pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />

          {/* Hero Header */}
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-chalk/10 pb-12">
            <div className="max-w-3xl space-y-4">
              <Eyebrow>Selected Work & Case Studies</Eyebrow>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-display-l text-chalk tracking-tight">
                Engineered For Impact. <br />
                <span className="text-flow">Built To Scale.</span>
              </h1>
              <p className="font-body text-base sm:text-body-l text-muted max-w-2xl leading-relaxed">
                Explore real client transformations across Next.js engineering, Shopify stores, WordPress portals, SEO compounding, and multi-channel performance marketing.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
              <div className="rounded-2xl border border-chalk/15 bg-surface/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-flow mb-1">
                  <Award size={15} />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">Delivered</span>
                </div>
                <div className="font-heading text-xl font-bold text-chalk">150+</div>
                <div className="font-mono text-[0.65rem] text-muted">Projects Shipped</div>
              </div>

              <div className="rounded-2xl border border-chalk/15 bg-surface/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <TrendingUp size={15} />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">Growth</span>
                </div>
                <div className="font-heading text-xl font-bold text-chalk">3.8x</div>
                <div className="font-mono text-[0.65rem] text-muted">Avg Client ROAS</div>
              </div>

              <div className="rounded-2xl border border-chalk/15 bg-surface/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-signal mb-1">
                  <Zap size={15} />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">Speed</span>
                </div>
                <div className="font-heading text-xl font-bold text-chalk">98+</div>
                <div className="font-mono text-[0.65rem] text-muted">Core Web Vitals</div>
              </div>

              <div className="rounded-2xl border border-chalk/15 bg-surface/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                  <ShieldCheck size={15} />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">Proof</span>
                </div>
                <div className="font-heading text-xl font-bold text-chalk">100%</div>
                <div className="font-mono text-[0.65rem] text-muted">Verified Outcomes</div>
              </div>
            </div>
          </div>

          <WorkGrid initialWork={work} />
        </div>
      </div>
      <CtaBand />
    </>
  );
}
