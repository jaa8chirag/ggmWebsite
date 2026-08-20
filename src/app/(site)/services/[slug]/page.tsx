import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight, MapPin } from "lucide-react";
import { getServiceBySlug, getServices, getPublishedPosts } from "@/lib/queries";
import { processSteps } from "@/data/process";
import { query } from "@/lib/db";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/home/CtaBand";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema } from "@/lib/schema";

import Image from "next/image";
import FormattedText from "@/components/ui/FormattedText";

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  seo: "/images/services/seo.jpg",
  ppc: "/images/services/ppc.jpg",
  "website-development": "/images/services/web-development.jpg",
  "lead-generation": "/images/services/lead-generation.jpg",
  "social-media-marketing": "/images/services/social-media-marketing.jpg",
  "shopify-wordpress": "/images/services/shopify-wordpress.jpg",
};

// Maps a service to the blog category covering it, for internal linking.
// Only services with matching published posts get a "Related reading" block.
const SERVICE_BLOG_CATEGORY: Record<string, string> = {
  seo: "SEO",
  "website-development": "Web Development",
  "lead-generation": "Lead Generation",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} Services in Delhi | GGM Technologies`;
  return buildMetadata({
    title,
    description: service.description,
    path: `/services/${service.slug}`,
    overrides: service,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const imageSrc =
    service.ogImage ||
    DEFAULT_SERVICE_IMAGES[service.slug] ||
    "/images/services/seo.jpg";

  const [allServices, posts, serviceLocations] = await Promise.all([
    getServices(),
    getPublishedPosts(),
    query<any>(
      `SELECT sl.*, l.name as locationName, l.slug as locationSlug 
       FROM \`ServiceLocation\` sl 
       JOIN \`Location\` l ON sl.locationId = l.id 
       WHERE sl.serviceId = ? AND sl.published = 1 
       ORDER BY l.name ASC`,
      [service.id]
    ).then((rows) => rows.map((r) => ({ ...r, location: { name: r.locationName, slug: r.locationSlug } }))),
  ]);

  const relatedCategory = SERVICE_BLOG_CATEGORY[service.slug];
  const relatedPosts = relatedCategory
    ? posts.filter((p) => p.category === relatedCategory).slice(0, 3)
    : [];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.description,
          path: `/services/${service.slug}`,
          allServiceTitles: allServices.map((s) => s.title),
        })}
      />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}

      <div className="bg-ink text-chalk">
        <section className="mx-auto max-w-[1440px] px-6 pt-32 pb-20 md:px-10 md:pt-40">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="block font-mono text-mono-label text-signal">
                {service.index}
              </span>
              <h1 className="mt-4 font-display text-display-l">
                {service.title}
              </h1>
              <FormattedText
                text={service.promise}
                as="p"
                className="mt-6 max-w-xl font-body text-body-l text-flow"
              />
              <FormattedText
                text={service.description}
                as="p"
                className="mt-4 max-w-xl font-body text-body text-muted leading-relaxed"
              />
              <div className="mt-10">
                <Button href="/contact" variant="signal">
                  Get a free audit
                </Button>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-flow/15 blur-3xl" />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-chalk/20 bg-surface/80 p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
          <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
            What&apos;s included
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm shadow-chalk/5"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-flow" />
                <span className="font-body text-sm">{bullet}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
          <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
            How we run it
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.index}>
                <span className="font-mono text-2xl tabular-nums text-signal">
                  {step.index}
                </span>
                <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                <p className="mt-2 font-body text-sm text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {service.faqs.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Questions
            </h2>
            <div className="mt-6 divide-y divide-chalk/20 border-t border-b border-chalk/20">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg">
                    {faq.question}
                    <span className="shrink-0 font-mono text-muted transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl font-body text-sm text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {serviceLocations.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Where we work
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {serviceLocations.map((sl) => (
                <Link
                  key={sl.id}
                  href={`/services/${service.slug}/${sl.location.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-chalk/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-flow hover:text-flow"
                >
                  <MapPin size={12} />
                  {sl.location.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Related reading
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-chalk/20 bg-surface p-6 shadow-sm shadow-chalk/5 transition-colors hover:border-flow"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg text-chalk">
                      {post.title}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
                    />
                  </span>
                  <p className="mt-2 font-body text-sm text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CtaBand />
    </>
  );
}
