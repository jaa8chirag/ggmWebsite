import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import {
  WhatsAppIcon,
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { getSettings } from "@/lib/queries";
import CookiePreferencesTrigger from "@/components/legal/CookiePreferencesTrigger";

export default async function Footer() {
  const settings = await getSettings();

  const cleanWhatsapp = (settings.whatsapp || "+919002600880").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello GGM Technologies! I would like to inquire about digital marketing & SEO services.")}`;

  const socialLinks = [
    { label: "WhatsApp", href: whatsappUrl, icon: WhatsAppIcon, color: "hover:text-[#25D366] hover:border-[#25D366]/40" },
    { label: "LinkedIn", href: settings.linkedin || "https://linkedin.com", icon: LinkedInIcon, color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
    { label: "Facebook", href: settings.facebook || "https://facebook.com", icon: FacebookIcon, color: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
    { label: "Instagram", href: settings.instagram || "https://instagram.com", icon: InstagramIcon, color: "hover:text-[#E4405F] hover:border-[#E4405F]/40" },
    { label: "Twitter / X", href: settings.twitter || "https://x.com", icon: TwitterIcon, color: "hover:text-chalk hover:border-chalk/40" },
    { label: "YouTube", href: settings.youtube || "https://youtube.com", icon: YouTubeIcon, color: "hover:text-[#FF0000] hover:border-[#FF0000]/40" },
    { label: "Direct Call", href: settings.phoneHref || `tel:${settings.phone || "+919002600880"}`, icon: Phone, color: "hover:text-flow hover:border-flow/40" },
  ];

  const flagshipServices = [
    { title: "Website Development", href: "/services/website-development-services" },
    { title: "Digital Marketing", href: "/services/digital-marketing-services" },
    { title: "SEO & Growth", href: "/services/seo" },
    { title: "E-Commerce & Shopify", href: "/services/shopify-website-development" },
    { title: "Google Ads & PPC", href: "/services/google-adsense" },
    { title: "Mobile App Dev", href: "/services/mobile-app-development" },
  ];

  const companyLinks = [
    { title: "About Company", href: "/about" },
    { title: "Case Studies & Work", href: "/work" },
    { title: "Careers", href: "/careers" },
    { title: "Quality & Compliance", href: "/quality-compliance" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Refund Policy", href: "/refund-policy" },
    { title: "Cookie Policy", href: "/cookie-policy" },
    { title: "Terms & Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer className="border-t border-chalk/15 bg-ink text-chalk">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-10 py-12 md:py-16">
        {/* Main Grid: Brand on top (or left on desktop), Services and Company side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/ggm-logo.png"
                alt={settings.name || "GGM Technologies"}
                width={150}
                height={55}
                className="h-9 w-auto object-contain"
                priority={false}
              />
            </Link>

            <p className="font-body text-sm text-muted max-w-md leading-relaxed">
              New Delhi&apos;s data-driven digital growth partner. We combine technical SEO,
              high-ROAS PPC, custom Next.js engineering, and conversion funnels to deliver predictable revenue.
            </p>

            {/* Quick Touchpoints Chips - Tap friendly on Mobile */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={settings.phoneHref || `tel:${settings.phone || "+919002600880"}`}
                className="inline-flex items-center gap-2 rounded-xl border border-chalk/15 bg-surface/70 px-3 py-2 font-mono text-xs text-chalk hover:border-flow hover:text-flow transition-colors shadow-sm"
              >
                <Phone size={13} className="text-flow shrink-0" />
                <span>{settings.phone || "+91 90026 00880"}</span>
              </a>

              <a
                href={`mailto:${settings.email || "info@ggmtechnologies.com"}`}
                className="inline-flex items-center gap-2 rounded-xl border border-chalk/15 bg-surface/70 px-3 py-2 font-mono text-xs text-chalk hover:border-flow hover:text-flow transition-colors shadow-sm"
              >
                <Mail size={13} className="text-flow shrink-0" />
                <span>{settings.email || "info@ggmtechnologies.com"}</span>
              </a>

              <div className="inline-flex items-center gap-1.5 rounded-xl border border-chalk/10 bg-surface/40 px-3 py-2 font-mono text-xs text-muted">
                <MapPin size={13} className="text-muted/80 shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>

            {/* Social Media Link Bar */}
            <div className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted/70 mb-2.5">
                Connect With Us
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
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
                      className={`flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-chalk/15 bg-surface/80 text-muted transition-all duration-200 hover:scale-105 ${s.color}`}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side-by-Side Columns for Core Services & Company Legal */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-6 sm:gap-10 pt-6 lg:pt-0 border-t border-chalk/10 lg:border-t-0">
            {/* Core Services Column */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-flow font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flow" />
                Core Services
              </p>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {flagshipServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      prefetch={false}
                      className="group inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted hover:text-chalk transition-colors py-0.5"
                    >
                      <span>{s.title}</span>
                      <ArrowUpRight size={10} className="hidden sm:inline-block opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-flow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal Column */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-flow font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flow" />
                Company &amp; Legal
              </p>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="group inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted hover:text-chalk transition-colors py-0.5"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-6 border-t border-chalk/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted/70 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} {settings.name || "GGM Technologies"}. All rights reserved.
            </p>
            {settings.msme && (
              <span className="inline-flex items-center gap-1 text-[11px] text-flow/80">
                <ShieldCheck size={13} /> Govt. MSME: {settings.msme}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <CookiePreferencesTrigger />
          </div>
        </div>
      </div>
    </footer>
  );
}
