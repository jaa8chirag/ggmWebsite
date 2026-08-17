import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getProductBySlug } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} | GGM Technologies`;
  return buildMetadata({
    title,
    description: product.description,
    path: `/shop/${product.slug}`,
    overrides: product,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    url: absoluteUrl(`/shop/${product.slug}`),
    brand: { "@id": `${SITE_URL}/#organization` },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            url: absoluteUrl(`/shop/${product.slug}`),
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
  };

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <JsonLd data={productSchema} />
        <Breadcrumbs
          items={[
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/shop/${product.slug}` },
          ]}
        />
        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>{product.category}</Eyebrow>
            <h1 className="mt-4 font-display text-display-l text-chalk">
              {product.name}
            </h1>
            <p className="mt-6 max-w-xl font-body text-body-l text-muted">
              {product.description}
            </p>

            <div className="mt-12">
              <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
                What&apos;s included
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl border border-chalk/20 bg-surface p-5 shadow-sm shadow-chalk/5"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-flow" />
                    <span className="font-body text-sm text-chalk">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
                What you get out of it
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {product.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-full border border-flow/30 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-flow"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-chalk/20 bg-surface p-8 shadow-sm shadow-chalk/5">
              <div className="flex items-baseline gap-3 font-mono">
                {product.price ? (
                  <>
                    <span className="text-4xl text-chalk">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-4xl text-chalk">Custom quote</span>
                )}
              </div>

              <Button href="/contact" variant="signal" className="mt-6 w-full">
                {product.price ? "Order this service" : "Request a quote"}
              </Button>

              <dl className="mt-8 space-y-4 border-t border-chalk/20 pt-6">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                      {spec.label}
                    </dt>
                    <dd className="font-body text-sm text-chalk">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
