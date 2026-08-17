import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProducts } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

const title = "Guest Posting & Backlink Services | GGM Technologies";
const description =
  "High DA backlinks, Web 2.0 backlinks, and guest posting — off-page SEO services from GGM Technologies.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/shop",
});

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
        <div className="mt-6">
          <Eyebrow>Off-page SEO</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
          Shop
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-muted">
          Backlink and guest posting services, sold the way we&apos;d want to
          buy them — clear specs, clear pricing, no guessing.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`}>
              <Card className="group flex h-full flex-col justify-between transition-colors duration-300 hover:border-flow">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-mono-label uppercase tracking-widest text-flow">
                      {product.category}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
                    />
                  </div>
                  <h2 className="mt-6 font-display text-2xl text-chalk">
                    {product.name}
                  </h2>
                  <p className="mt-3 font-body text-sm text-muted">
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 flex items-baseline gap-3 font-mono">
                  {product.price ? (
                    <>
                      <span className="text-2xl text-chalk">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-2xl text-chalk">Custom quote</span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
