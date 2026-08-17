import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { getServices } from "@/lib/queries";

export const metadata = {
  title: "Page not found — GGM Technologies",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const services = await getServices();

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-display-l text-chalk">
          That page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-muted">
          The link might be broken, or the page may have moved. Here&apos;s
          where you probably meant to go.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/" variant="signal">
            Back to home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>

        <div className="mt-20 border-t border-chalk/20 pt-10">
          <p className="font-mono text-mono-label uppercase tracking-widest text-muted">
            Or browse our services
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="font-body text-body text-chalk transition-colors hover:text-flow"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
