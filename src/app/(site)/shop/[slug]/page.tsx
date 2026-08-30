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
import FormattedText from "@/components/ui/FormattedText";

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
            <FormattedText
              text={product.description}
              as="p"
              className="mt-6 max-w-xl font-body text-body-l text-muted leading-relaxed"
            />

            <div className="mt-12">
              <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
                What&apos;s included in this package
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
                Strategic SEO &amp; Commercial Benefits
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {product.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-full border border-flow/40 bg-flow/10 px-4 py-2 font-mono text-xs font-semibold text-flow"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* In-Depth Fulfillment & Quality Standards */}
            <div className="mt-16 rounded-3xl border border-chalk/15 bg-surface/70 p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-chalk">
                Strict Vetting &amp; Algorithmic Safety Guarantee
              </h3>
              <div className="mt-4 space-y-3 font-body text-sm text-muted leading-relaxed">
                <p>
                  Every domain in our publishing ecosystem is manually vetted by our senior SEO analysts using enterprise telemetry from Ahrefs, Semrush, and Moz. We maintain zero tolerance for private blog networks (PBNs), link farms, or domains with artificial traffic spikes.
                </p>
                <p>
                  Before publishing, our content team conducts in-depth competitor gap analysis to identify optimal anchor text phrasing. This ensures that your link delivers maximum topical authority while strictly adhering to Google Search Essentials and avoiding over-optimization filters.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-chalk">
                <div className="rounded-xl border border-chalk/10 bg-ink/60 p-3 text-center">
                  <p className="text-flow font-bold">100%</p>
                  <p className="text-[11px] text-muted mt-1">Manual Outreach</p>
                </div>
                <div className="rounded-xl border border-chalk/10 bg-ink/60 p-3 text-center">
                  <p className="text-flow font-bold">&lt; 1%</p>
                  <p className="text-[11px] text-muted mt-1">Spam Score</p>
                </div>
                <div className="rounded-xl border border-chalk/10 bg-ink/60 p-3 text-center">
                  <p className="text-flow font-bold">Dofollow</p>
                  <p className="text-[11px] text-muted mt-1">Contextual Link</p>
                </div>
                <div className="rounded-xl border border-chalk/10 bg-ink/60 p-3 text-center">
                  <p className="text-flow font-bold">365 Days</p>
                  <p className="text-[11px] text-muted mt-1">Warranty</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border border-chalk/20 bg-surface p-8 shadow-xl">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal bg-signal/15 border border-signal/30 px-2.5 py-1 rounded-full">
                Fixed Price · 100% Guaranteed
              </span>

              <div className="mt-4 flex items-baseline gap-3 font-mono">
                {product.price ? (
                  <>
                    <span className="text-4xl font-bold text-chalk">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold text-chalk">Custom quote</span>
                )}
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted">+ GST · One-time fee per placement</p>

              <Button href="/contact" variant="signal" className="mt-6 w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold">
                {product.price ? "Order This Package Now" : "Request Custom Quote"}
              </Button>

              {/* Direct WhatsApp / Call Support */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-muted">
                <a href="tel:+919002600880" className="hover:text-flow transition-colors">
                  📞 Call: +91 9002600880
                </a>
                <span>·</span>
                <a
                  href="https://wa.me/919002600880?text=Hi%20GGM%20Technologies,%20I%20want%20to%20order%20the%20backlink%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  💬 WhatsApp
                </a>
              </div>

              {product.specs && product.specs.length > 0 && (
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
              )}

              {/* Trust Badge */}
              <div className="mt-6 border-t border-chalk/10 pt-4 text-center font-mono text-[11px] text-muted">
                <p>🔒 100% White-Hat Google Compliance</p>
                <p className="mt-1">📄 Official GST Tax Invoice Provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
