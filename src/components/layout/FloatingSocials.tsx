"use client";

import { MessageCircle, Phone } from "lucide-react";

interface FloatingSocialsProps {
  phoneHref?: string;
  whatsapp?: string | null;
}

export default function FloatingSocials({
  phoneHref = "tel:+919002600880",
  whatsapp = "+919002600880",
}: FloatingSocialsProps) {
  const cleanNumber = (whatsapp || "+919002600880").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello GGM Technologies! I would like to inquire about digital marketing & SEO services.")}`;

  return (
    <aside aria-label="Quick contact links" className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Call Button */}
      <a
        href={phoneHref}
        aria-label="Direct Phone Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-flow text-white shadow-xl shadow-flow/30 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <MessageCircle size={22} />
      </a>
    </aside>
  );
}
