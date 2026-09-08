import type { Metadata } from "next";
import { getWork } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaBand from "@/components/home/CtaBand";
import { buildMetadata } from "@/lib/seo";
import WorkGrid from "@/components/work/WorkGrid";

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
      <div className="bg-ink py-32 md:py-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
          <div className="mt-6">
            <Eyebrow>Selected Work & Case Studies</Eyebrow>
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
            Proven Client Results
          </h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-muted">
            A handful of the engagements behind our numbers — different industries, custom software & SEO strategies, real financial growth.
          </p>

          <WorkGrid initialWork={work} />
        </div>
      </div>
      <CtaBand />
    </>
  );
}
