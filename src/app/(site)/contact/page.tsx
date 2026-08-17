import type { Metadata } from "next";
import { getSettings, getServices } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

const title = "Contact Us | GGM Technologies";
const description =
  "Get a free audit or start a project with GGM Technologies — SEO, PPC, and web development in New Delhi.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);

  return (
    <div className="bg-ink py-32 md:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-6">
            <Eyebrow>Let&apos;s talk</Eyebrow>
          </div>
          <h1 className="mt-4 font-display text-display-l text-chalk">
            Start a project
          </h1>
          <p className="mt-6 max-w-md font-body text-body-l text-muted">
            Tell us what you&apos;re trying to grow. We&apos;ll reply with
            next steps, not a sales script.
          </p>

          <div className="mt-14 space-y-6 border-t border-chalk/20 pt-10 font-mono text-sm text-muted">
            <div>
              <p className="text-mono-label uppercase tracking-widest text-flow">
                Phone
              </p>
              <a href={settings.phoneHref} className="mt-1 block text-chalk">
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="text-mono-label uppercase tracking-widest text-flow">
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="mt-1 block text-chalk"
              >
                {settings.email}
              </a>
            </div>
            <div>
              <p className="text-mono-label uppercase tracking-widest text-flow">
                Address
              </p>
              <p className="mt-1 text-chalk">
                {settings.addressLine1}
                <br />
                {settings.addressLine2}
                <br />
                {settings.addressLine3}
              </p>
            </div>
            <div>
              <p className="text-mono-label uppercase tracking-widest text-flow">
                Hours
              </p>
              <p className="mt-1 text-chalk">{settings.businessHours}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted">
            <p>Quick response</p>
            <p>Professional consultation</p>
            <p>Customized solutions</p>
            <p>Transparent communication</p>
          </div>
        </div>

        <ContactForm services={services} />
      </div>
    </div>
  );
}
