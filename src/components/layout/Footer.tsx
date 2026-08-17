import Image from "next/image";
import Link from "next/link";
import { getServices, getProducts, getSettings } from "@/lib/queries";

export default async function Footer() {
  const [services, products, settings] = await Promise.all([
    getServices(),
    getProducts(),
    getSettings(),
  ]);

  return (
    <footer className="border-t border-chalk/20 bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo/ggm-mark.png"
                alt=""
                width={120}
                height={45}
                className="h-7 w-auto"
              />
              <p className="font-display text-xl text-chalk">{settings.name}</p>
            </div>
            <p className="mt-4 max-w-xs font-body text-sm text-muted">
              A New Delhi digital growth partner — SEO, PPC, web development,
              and lead generation built on real numbers.
            </p>
          </div>

          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Services
            </p>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-body text-sm text-muted transition-colors hover:text-chalk"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Shop
            </p>
            <ul className="mt-4 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="font-body text-sm text-muted transition-colors hover:text-chalk"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Contact
            </p>
            <ul className="mt-4 space-y-3 font-body text-sm text-muted">
              <li>
                <a
                  href={settings.phoneHref}
                  className="transition-colors hover:text-chalk"
                >
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-chalk"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                {settings.addressLine1}
                <br />
                {settings.addressLine2}
                <br />
                {settings.addressLine3}
              </li>
              <li>{settings.businessHours}</li>
              <li className="font-mono text-xs text-muted/70">
                GST {settings.gst}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-chalk/20 pt-8 font-mono text-xs uppercase tracking-widest text-muted/70 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <p>Rank higher. Spend smarter. Grow faster.</p>
        </div>
      </div>
    </footer>
  );
}
