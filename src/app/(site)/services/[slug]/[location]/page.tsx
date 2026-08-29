import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getServiceLocation } from "@/lib/queries";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/home/CtaBand";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { serviceLocationSchema, faqSchema } from "@/lib/schema";
import { SERVICE_DETAILS } from "@/data/serviceDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location } = await params;
  const sl = await getServiceLocation(slug, location);
  if (!sl) return {};

  const title = `${sl.service.title} Services in ${sl.location.name} | GGM Technologies`;
  return buildMetadata({
    title,
    description:
      sl.customIntro ??
      `${sl.service.title} for businesses in ${sl.location.name} — ${sl.service.description}`,
    path: `/services/${sl.service.slug}/${sl.location.slug}`,
    overrides: sl,
  });
}

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug, location } = await params;
  const sl = await getServiceLocation(slug, location);
  if (!sl) notFound();

  const { service, location: loc } = sl;
  const details = SERVICE_DETAILS[slug];

  const combinedFaqs = details?.faqs
    ? [
        ...details.faqs,
        ...service.faqs.filter(
          (sf) =>
            !details.faqs.some(
              (df) => df.question.toLowerCase() === sf.question.toLowerCase()
            )
        ),
      ]
    : service.faqs;

  return (
    <>
      <JsonLd
        data={serviceLocationSchema({
          serviceName: service.title,
          locationName: loc.name,
          description: sl.customIntro ?? service.description,
          path: `/services/${service.slug}/${loc.slug}`,
        })}
      />
      {combinedFaqs.length > 0 && <JsonLd data={faqSchema(combinedFaqs)} />}

      <div className="bg-ink text-chalk">
        <section className="mx-auto max-w-[1440px] px-6 pt-32 pb-20 md:px-10 md:pt-40">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
              {
                name: loc.name,
                path: `/services/${service.slug}/${loc.slug}`,
              },
            ]}
          />
          <span className="mt-6 block font-mono text-mono-label text-signal">
            {service.index}
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-display-l">
            {service.title} in {loc.name}
          </h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-muted">
            {sl.customIntro ??
              `${service.promise} Built for ${loc.name} businesses that need to show up locally, not just nationally.`}
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="signal">
              Get a free audit
            </Button>
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

        {combinedFaqs.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
            <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Questions
            </h2>
            <div className="mt-6 divide-y divide-chalk/20 border-t border-b border-chalk/20">
              {combinedFaqs.map((faq) => (
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

        <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
          <Link
            href={`/services/${service.slug}`}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-flow"
          >
            ← See all of {service.title}
          </Link>
        </section>
      </div>

      <CtaBand />
    </>
  );
}
