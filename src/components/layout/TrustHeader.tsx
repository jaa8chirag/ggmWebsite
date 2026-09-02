"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Star,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import type { SiteSettingsModel } from "@/types";

interface TrustHeaderProps {
  settings: SiteSettingsModel;
}

export default function TrustHeader({ settings }: TrustHeaderProps) {
  const cleanWhatsapp = (settings.whatsapp || "+919002600880").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello GGM Technologies! I would like to inquire about digital marketing & SEO services.")}`;

  return (
    <div className="border-b border-chalk/10 bg-surface/95 text-chalk backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-1.5 font-mono text-[11px] sm:px-6">
        {/* Left: 5 Official Registrations & Trust Badges */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5">
          {/* 1. MSME Udyam */}
          <Link
            href="/certifications"
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-flow hover:underline"
            title="Govt. of India MSME Registration"
          >
            <ShieldCheck size={13} className="text-flow shrink-0" />
            <span>MSME Udyam:</span>
            <span className="font-normal text-muted hidden md:inline">
              {settings.msme ?? "UDYAM-DL-08-0098741"}
            </span>
          </Link>

          <span className="h-3 w-px bg-chalk/20 shrink-0" />

          {/* 2. IndiaMART TrustSeal */}
          <Link
            href="/certifications"
            className="inline-flex shrink-0 items-center gap-1 text-muted hover:text-chalk transition-colors"
            title="IndiaMART Verified TrustSeal"
          >
            <Award size={12} className="text-signal shrink-0" />
            <span>IndiaMART TrustSeal</span>
          </Link>

          <span className="h-3 w-px bg-chalk/20 shrink-0" />

          {/* 3. Justdial Trust Seal */}
          <Link
            href="/certifications"
            className="inline-flex shrink-0 items-center gap-1 text-muted hover:text-chalk transition-colors"
            title="Justdial Verified Enterprise"
          >
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
            <span>Justdial Verified</span>
          </Link>

          <span className="h-3 w-px bg-chalk/20 shrink-0" />

          {/* 4. Google My Business */}
          <a
            href={settings.googleBusinessUrl || "https://maps.google.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-muted hover:text-flow transition-colors"
            title="Google Verified Business 5.0 Star Rating"
          >
            <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
            <span>Google 5.0 ★</span>
          </a>

          <span className="h-3 w-px bg-chalk/20 shrink-0" />

          {/* 5. GST Registration */}
          <Link
            href="/certifications"
            className="inline-flex shrink-0 items-center gap-1 text-muted hover:text-chalk transition-colors"
            title="Official GSTIN Registered Entity"
          >
            <FileCheck size={12} className="text-flow shrink-0" />
            <span>GST: <span className="text-chalk">{settings.gst}</span></span>
          </Link>
        </div>

        {/* Right: Quick Direct Contact & Instant Connect */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <MessageCircle size={13} className="text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <span className="h-3 w-px bg-chalk/20" />

          <a
            href={settings.phoneHref}
            className="flex items-center gap-1 font-medium text-chalk hover:text-flow transition-colors"
          >
            <Phone size={12} className="text-flow" />
            <span>{settings.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
