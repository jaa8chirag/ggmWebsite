import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

const title = "Digital Marketing Services in Delhi | GGM Technologies";
const description =
  "SEO, PPC & Google Ads, website development, lead generation, social media marketing, and Shopify & WordPress builds from GGM Technologies, New Delhi.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
        <div className="mt-6">
          <Eyebrow>What we do</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
          Services
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-muted">
          Six services, run in the order they actually move a business:
          audit, build, rank, and grow.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="group flex h-full flex-col justify-between transition-colors duration-300 hover:border-flow">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-mono-label text-flow">
                      {service.index}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
                    />
                  </div>
                  <h2 className="mt-6 font-display text-2xl text-chalk">
                    {service.title}
                  </h2>
                  <p className="mt-3 font-body text-sm text-muted">
                    {service.promise}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
