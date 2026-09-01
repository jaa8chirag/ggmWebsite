import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import {
  WhatsAppIcon,
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { getServices, getProducts, getSettings } from "@/lib/queries";
import CookiePreferencesTrigger from "@/components/legal/CookiePreferencesTrigger";

export default async function Footer() {
  const [services, products, settings] = await Promise.all([
    getServices(),
    getProducts(),
    getSettings(),
  ]);

  const cleanWhatsapp = (settings.whatsapp || "+919876543210").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello GGM Technologies! I would like to inquire about digital marketing & SEO services.")}`;

  const socialLinks = [
    { label: "WhatsApp", href: whatsappUrl, icon: WhatsAppIcon, color: "hover:text-[#25D366]" },
    { label: "LinkedIn", href: settings.linkedin || "https://linkedin.com", icon: LinkedInIcon, color: "hover:text-[#0A66C2]" },
    { label: "Facebook", href: settings.facebook || "https://facebook.com", icon: FacebookIcon, color: "hover:text-[#1877F2]" },
    { label: "Instagram", href: settings.instagram || "https://instagram.com", icon: InstagramIcon, color: "hover:text-[#E4405F]" },
    { label: "Twitter / X", href: settings.twitter || "https://x.com", icon: TwitterIcon, color: "hover:text-chalk" },
    { label: "YouTube", href: settings.youtube || "https://youtube.com", icon: YouTubeIcon, color: "hover:text-[#FF0000]" },
    { label: "Direct Call", href: settings.phoneHref, icon: Phone, color: "hover:text-flow" },
  ];

  return (
    <footer className="border-t border-chalk/20 bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-8">
          {/* Brand & Bio */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo/ggm-logo.png"
                alt={settings.name}
                width={150}
                height={55}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-sm font-body text-sm text-muted">
              A New Delhi digital growth partner — SEO, PPC, web development,
              and lead generation built on real numbers.
            </p>

            {/* Social Media Link Bar */}
            <div className="mt-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted/70">
                Connect With Us
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      aria-label={s.label}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-chalk/15 bg-surface text-muted transition-all duration-200 hover:scale-110 hover:border-chalk/30 ${s.color}`}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Trust Seals Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-1.5 rounded-full border border-flow/30 bg-flow/10 px-3 py-1 font-mono text-[11px] font-semibold text-flow transition-colors hover:bg-flow hover:text-white"
              >
                <ShieldCheck size={12} /> MSME &amp; Partner Certifications
              </Link>
            </div>
          </div>

          {/* Services Column (Curated 5 Flagships Per User Specification) */}
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { title: "Website Development Service", href: "/services/website-development" },
                { title: "Mobile Application", href: "/services/mobile-app-development" },
                { title: "SEO", href: "/services/seo" },
                { title: "Google AdSense Service", href: "/services/google-adsense" },
                { title: "Shopify", href: "/services/shopify-development" },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-body text-sm text-muted transition-colors hover:text-chalk"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Policies Column */}
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Governance
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/certifications"
                  className="font-body text-sm text-muted transition-colors hover:text-chalk"
                >
                  Certifications &amp; Accreditations
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="font-body text-sm text-muted transition-colors hover:text-chalk"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="font-body text-sm text-muted transition-colors hover:text-chalk"
                >
                  Refund &amp; Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="font-body text-sm text-muted transition-colors hover:text-chalk"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="font-body text-sm text-muted transition-colors hover:text-chalk"
                >
                  Disclaimer &amp; Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-muted">
              <li>
                <a
                  href={settings.phoneHref}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-chalk"
                >
                  <Phone size={13} className="text-flow" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-chalk"
                >
                  <Mail size={13} className="text-flow" />
                  {settings.email}
                </a>
              </li>
              <li className="leading-snug">
                <span className="inline-flex items-start gap-1.5">
                  <MapPin size={13} className="text-flow shrink-0 mt-1" />
                  <span>
                    {settings.addressLine1}
                    <br />
                    {settings.addressLine2}
                    <br />
                    {settings.addressLine3}
                  </span>
                </span>
              </li>
              <li>{settings.businessHours}</li>
              <li className="font-mono text-xs text-muted/70">
                GSTIN: {settings.gst}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-chalk/15 pt-4 font-mono text-xs uppercase tracking-wider text-muted/70 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-chalk transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-chalk transition-colors">
              Refund &amp; Returns
            </Link>
            <Link href="/cookie-policy" className="hover:text-chalk transition-colors">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-chalk transition-colors">
              Disclaimer
            </Link>
            <span className="text-chalk/20">|</span>
            <CookiePreferencesTrigger />
          </div>
        </div>
      </div>
    </footer>
  );
}
