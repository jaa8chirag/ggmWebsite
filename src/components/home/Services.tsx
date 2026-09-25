"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";

export interface ServiceCardData {
  slug: string;
  index: string;
  title: string;
  promise: string;
  bullets: string[];
  ogImage?: string | null;
}

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  "website-development-services": "/images/services/website-development.jpg",
  "website-development": "/images/services/website-development.jpg",
  "web-development": "/images/services/website-development.jpg",
  seo: "/images/services/seo.jpg",
  "e-commerce-Development": "/images/services/e-commerce.jpg",
  "e-commerce-development": "/images/services/e-commerce.jpg",
  "e-commerce": "/images/services/e-commerce.jpg",
  ecommerce: "/images/services/e-commerce.jpg",
  ppc: "/images/services/ppc.jpg",
  "google-adsense": "/images/services/google-adsense.jpg",
  "google-ads": "/images/services/google-adsense.jpg",
  "mobile-app-development": "/images/services/mobile-app-development.jpg",
  "mobile-application-development": "/images/services/mobile-app-development.jpg",
  "lead-generation": "/images/services/lead-generation.jpg",
  "social-media-marketing": "/images/services/social-media-marketing.jpg",
  "shopify-website-development": "/images/services/shopify-development.jpg",
  "shopify-development": "/images/services/shopify-development.jpg",
  "wordpress-development": "/images/services/wordpress-development.jpg",
  "shopify-wordpress": "/images/services/shopify-development.jpg",
};

export function ServiceCard({
  slug,
  title,
  promise,
  bullets,
  ogImage,
}: ServiceCardData) {
  const imageSrc = ogImage || DEFAULT_SERVICE_IMAGES[slug] || "/images/services/seo.jpg";

  return (
    <Link
      href={`/services/${slug}`}
      prefetch={false}
      className="group relative flex min-h-[415px] sm:min-h-[435px] lg:min-h-[450px] w-[290px] sm:w-[330px] md:w-[325px] lg:w-[360px] xl:w-[380px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-chalk/20 bg-surface/95 p-3.5 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-flow hover:shadow-2xl transform-gpu select-none"
    >
      <div>
        {/* Clean Visual Banner Header */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized={Boolean(imageSrc?.startsWith("data:") || imageSrc?.startsWith("http"))}
            sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, 380px"
            className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Title & Tagline */}
        <div className="mt-3.5 sm:mt-4 px-1">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-chalk transition-colors duration-300 group-hover:text-flow line-clamp-1">
            {title}
          </h3>
          <p className="mt-1.5 sm:mt-2 font-body text-xs sm:text-sm leading-relaxed text-muted line-clamp-2">
            {promise}
          </p>
        </div>
      </div>

      {/* Structured Key Features Checklist */}
      <div className="mt-3.5 sm:mt-4 border-t border-chalk/10 pt-3 px-1">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/70">
          What&apos;s Included
        </p>
        <ul className="space-y-1.5">
          {bullets.slice(0, 3).map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 font-mono text-[0.7rem] sm:text-xs uppercase tracking-wide text-muted transition-colors duration-200 group-hover:text-chalk"
            >
              <span className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center rounded-full bg-flow/15 text-flow">
                <Check size={10} strokeWidth={2.5} />
              </span>
              <span className="truncate">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Action Link Footer */}
        <div className="mt-3 flex items-center justify-between pt-2 text-muted transition-colors duration-200 group-hover:text-flow">
          <span className="font-mono text-[0.7rem] sm:text-xs font-medium uppercase tracking-wider">
            Explore Details
          </span>
          <span className="font-mono text-sm transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Services({ services }: { services: ServiceCardData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getDistance = () =>
            (trackRef.current?.scrollWidth ?? 0) -
            (trackContainerRef.current?.clientWidth ?? 0);

          gsap.to(trackRef.current, {
            x: () => -getDistance(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              id: "services-scroll",
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 0.3,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) {
                  progressRef.current.style.width = `${self.progress * 100}%`;
                }
              },
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleScrollNext = () => {
    if (typeof window === "undefined") return;

    if (window.innerWidth < 768) {
      if (mobileTrackRef.current) {
        mobileTrackRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
      return;
    }

    const st = ScrollTrigger.getById("services-scroll");
    if (st) {
      const totalDist = st.end - st.start;
      const step = totalDist / Math.max(1, services.length - 1);
      const current = window.scrollY;

      if (current < st.start) {
        window.scrollTo({ top: st.start + step, behavior: "smooth" });
      } else {
        const nextPos = Math.min(st.end, current + step);
        window.scrollTo({ top: nextPos, behavior: "smooth" });
      }
    }
  };

  const handleScrollPrev = () => {
    if (typeof window === "undefined") return;

    if (window.innerWidth < 768) {
      if (mobileTrackRef.current) {
        mobileTrackRef.current.scrollBy({ left: -320, behavior: "smooth" });
      }
      return;
    }

    const st = ScrollTrigger.getById("services-scroll");
    if (st) {
      const totalDist = st.end - st.start;
      const step = totalDist / Math.max(1, services.length - 1);
      const current = window.scrollY;

      if (current > st.end) {
        window.scrollTo({ top: st.end - step, behavior: "smooth" });
      } else {
        const prevPos = Math.max(st.start, current - step);
        window.scrollTo({ top: prevPos, behavior: "smooth" });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = touchStartXRef.current - currentX;
    if (Math.abs(diffX) > 12) {
      window.scrollBy({ top: diffX * 1.2, behavior: "auto" });
      touchStartXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  return (
    <section ref={sectionRef} className="relative bg-ink">
      <div className="flex flex-col overflow-hidden md:h-screen md:flex-row md:items-center">
        {/* Left Informational Sidebar - Compact & optimized for iPad Mini & iPad Pro */}
        <div className="shrink-0 px-6 pt-20 pb-8 md:w-[265px] md:px-5 md:py-0 lg:w-[325px] lg:px-7 xl:w-[390px] xl:px-12 2xl:w-[450px] 2xl:px-16 z-10">
          <div className="flex items-center justify-between">
            <Eyebrow>What we do</Eyebrow>
            {/* Mobile navigation arrows */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={handleScrollPrev}
                aria-label="Previous service"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-chalk/20 bg-surface/90 text-chalk hover:border-flow hover:text-flow active:scale-95 cursor-pointer"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleScrollNext}
                aria-label="Next service"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-chalk/20 bg-surface/90 text-chalk hover:border-flow hover:text-flow active:scale-95 cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight text-chalk">
            Six services, one roadmap.
          </h2>

          <p className="mt-2.5 sm:mt-3 font-body text-xs sm:text-sm text-muted leading-relaxed max-w-[240px] lg:max-w-xs">
            Our execution sequence to build and scale your brand. Each service connects seamlessly into the next.
          </p>

          {/* Progress Indicator & Arrow Buttons for Tablet & Desktop */}
          <div className="mt-6 md:mt-8 space-y-3.5">
            <div className="hidden h-1 w-full max-w-[180px] bg-chalk/10 rounded-full overflow-hidden md:block">
              <div
                ref={progressRef}
                className="h-full w-0 bg-signal transition-all duration-75"
                aria-hidden="true"
              />
            </div>

            {/* Desktop & Tablet Arrow Navigation Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleScrollPrev}
                  aria-label="Previous service"
                  className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-chalk/20 bg-surface/90 text-chalk transition-all duration-200 hover:border-flow hover:bg-flow hover:text-ink active:scale-95 shadow-md cursor-pointer group"
                >
                  <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollNext}
                  aria-label="Next service"
                  className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-chalk/20 bg-surface/90 text-chalk transition-all duration-200 hover:border-flow hover:bg-flow hover:text-ink active:scale-95 shadow-md cursor-pointer group"
                >
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted flex items-center gap-1 select-none">
                <span>⇄</span> Slide cards
              </span>
            </div>
          </div>
        </div>

        {/* Desktop & Tablet Track Container */}
        <div
          ref={trackContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative hidden flex-1 overflow-hidden md:block md:h-full select-none"
        >
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-center gap-5 sm:gap-6 lg:gap-8 pr-16 lg:pr-24 will-change-transform transform-gpu"
            style={{ transform: "translateZ(0)" }}
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>

        {/* Mobile Track Container */}
        <div
          ref={mobileTrackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-8 md:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {services.map((service) => (
            <div key={service.slug} className="snap-start shrink-0">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
