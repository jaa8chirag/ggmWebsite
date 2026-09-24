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

  const fullAddress = [
    settings.addressLine1,
    settings.addressLine2,
    settings.addressLine3,
  ]
    .filter(Boolean)
    .join(", ");

  const GOOGLE_MAPS_PLACE_URL =
    "https://www.google.com/maps/place/GGM+TECHNOLOGIES/@28.5586016,77.1970418,16z/data=!4m10!1m2!2m1!1s4th+Floor,+400-A,+12+Ajit+Singh+House,+Yusuf+Sarai+Commercial+Complex,+Green+Park+,+New+Delhi+110016!3m6!1s0xacd4b1dfe9650407:0x198cc7ca266d7621!8m2!3d28.5586016!4d77.206569!15sCmQ0dGggRmxvb3IsIDQwMC1BLCAxMiBBaml0IFNpbmdoIEhvdXNlLCBZdXN1ZiBTYXJhaSBDb21tZXJjaWFsIENvbXBsZXgsIEdyZWVuIFBhcmsgLCBOZXcgRGVsaGkgMTEwMDE2WmAiXjR0aCBmbG9vciA0MDAgYSAxMiBhaml0IHNpbmdoIGhvdXNlIHl1c3VmIHNhcmFpIGNvbW1lcmNpYWwgY29tcGxleCBncmVlbiBwYXJrIG5ldyBkZWxoaSAxMTAwMTaSARB3ZWJzaXRlX2Rlc2lnbmVy4AEA!16s%2Fg%2F11z30lcyz1";

  const mapQuery = encodeURIComponent(
    `GGM TECHNOLOGIES, ${fullAddress || "4th Floor, 400-A, 12 Ajit Singh House, Yusuf Sarai Commercial Complex, Green Park , New Delhi 110016"}`
  );
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const mapDirectUrl =
    settings.googleBusinessUrl &&
    settings.googleBusinessUrl !== "https://maps.google.com/?cid=ggmtechnologies"
      ? settings.googleBusinessUrl
      : GOOGLE_MAPS_PLACE_URL;

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
              <a
                href={settings.phoneHref}
                className="mt-1 block text-chalk transition-colors hover:text-flow"
              >
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="text-mono-label uppercase tracking-widest text-flow">
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="mt-1 block text-chalk transition-colors hover:text-flow"
              >
                {settings.email}
              </a>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-mono-label uppercase tracking-widest text-flow">
                  Address &amp; Location
                </p>
                <a
                  href={mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-flow hover:underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>
              <p className="mt-1 text-chalk">
                {settings.addressLine1}
                <br />
                {settings.addressLine2}
                <br />
                {settings.addressLine3}
              </p>
              <div className="mt-3 overflow-hidden rounded-xl border border-chalk/15 shadow-md">
                <iframe
                  title="GGM Technologies Office Location"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                />
              </div>
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
