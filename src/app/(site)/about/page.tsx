import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

const title = "About Us — New Delhi Digital Growth Partner | GGM Technologies";
const description =
  "GGM Technologies is a New Delhi digital growth partner running SEO, PPC, web development, and lead generation on accountable numbers.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
        <div className="mt-6">
          <Eyebrow>{settings.aboutEyebrow}</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
          {settings.aboutTitle}
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-muted">
          {settings.aboutIntro}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-chalk/20 pt-14 sm:grid-cols-2">
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Mission
            </p>
            <p className="mt-4 font-display text-2xl text-chalk">
              {settings.mission}
            </p>
          </div>
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Vision
            </p>
            <p className="mt-4 font-display text-2xl text-chalk">
              {settings.vision}
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-chalk/20 pt-14">
          <p className="font-mono text-mono-label uppercase tracking-widest text-muted">
            Why choose us
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {settings.whyChooseUs.map((item) => (
              <div key={item.title}>
                <h2 className="font-display text-xl text-chalk">
                  {item.title}
                </h2>
                <p className="mt-2 font-body text-sm text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-chalk/20 pt-14">
          <p className="font-mono text-mono-label uppercase tracking-widest text-muted">
            Clients we&apos;ve worked with
          </p>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {((settings.clients as string[]) ?? []).map((client: string) => (
              <span key={client} className="font-display text-lg text-muted">
                {client}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-chalk/20 pt-14">
          <p className="font-mono text-mono-label uppercase tracking-widest text-muted">
            Find us
          </p>
          <p className="mt-4 max-w-sm font-body text-body text-chalk">
            {settings.addressLine1}
            <br />
            {settings.addressLine2}
            <br />
            {settings.addressLine3}
          </p>
          <a
            href={settings.phoneHref}
            className="mt-4 inline-block font-mono text-body text-flow"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
