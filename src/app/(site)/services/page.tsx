import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { getServices } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
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

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  seo: "/images/services/seo.jpg",
  ppc: "/images/services/ppc.jpg",
  "website-development": "/images/services/web-development.jpg",
  "lead-generation": "/images/services/lead-generation.jpg",
  "social-media-marketing": "/images/services/social-media-marketing.jpg",
  "shopify-wordpress": "/images/services/shopify-wordpress.jpg",
};

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

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const imageSrc =
              service.ogImage ||
              DEFAULT_SERVICE_IMAGES[service.slug] ||
              "/images/services/seo.jpg";

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex min-h-[445px] flex-col justify-between overflow-hidden rounded-3xl border border-chalk/15 bg-surface/90 p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-flow hover:shadow-2xl sm:p-4"
              >
                <div>
                  {/* Clean Image Banner Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-4 px-1">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-chalk transition-colors duration-300 group-hover:text-flow">
                      {service.title}
                    </h2>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-2">
                      {service.promise}
                    </p>
                  </div>
                </div>

                {/* Features Checklist & Link */}
                <div className="mt-4 border-t border-chalk/10 pt-3.5 px-1">
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/70">
                    What&apos;s Included
                  </p>
                  <ul className="space-y-1.5">
                    {service.bullets.slice(0, 3).map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-muted transition-colors duration-200 group-hover:text-chalk"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-flow/15 text-flow">
                          <Check size={11} strokeWidth={2.5} />
                        </span>
                        <span className="truncate">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex items-center justify-between pt-2 text-muted transition-colors duration-200 group-hover:text-flow">
                    <span className="font-mono text-xs font-medium uppercase tracking-wider">
                      Explore Service
                    </span>
                    <span className="font-mono text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

