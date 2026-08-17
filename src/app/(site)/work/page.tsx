import type { Metadata } from "next";
import { getWork } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import WorkIllustration from "@/components/decor/WorkIllustration";
import { buildMetadata } from "@/lib/seo";

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
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
        <div className="mt-6">
          <Eyebrow>Selected work</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
          Work
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-muted">
          A handful of the engagements behind the numbers — different
          industries, different problems, same discipline.
        </p>

        <div className="mt-16 space-y-20 md:space-y-28">
          {work.map((item) => (
            <article
              key={item.slug}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <WorkIllustration variant={item.variant} />
              </div>
              <div>
                <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                  {item.category}
                </span>
                <h2 className="mt-3 font-display text-3xl text-chalk">
                  {item.client}
                </h2>
                <p className="mt-4 max-w-md font-body text-body text-muted">
                  {item.summary}
                </p>
                <span className="mt-6 inline-block rounded-full border border-flow/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-flow">
                  {item.resultLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
