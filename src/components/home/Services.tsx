"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
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
  "website-development": "/images/services/website-development.jpg",
  "web-development": "/images/services/website-development.jpg",
  seo: "/images/services/seo.jpg",
  ppc: "/images/services/ppc.jpg",
  "lead-generation": "/images/services/lead-generation.jpg",
  "social-media-marketing": "/images/services/social-media-marketing.jpg",
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
      className="group relative flex min-h-[445px] w-[345px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-chalk/15 bg-surface/90 p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-flow hover:shadow-2xl sm:w-[390px] sm:p-4"
    >
      <div>
        {/* Clean Visual Banner Header */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 345px, 390px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Title & Tagline */}
        <div className="mt-4 px-1">
          <h3 className="font-display text-2xl font-bold tracking-tight text-chalk transition-colors duration-300 group-hover:text-flow">
            {title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-2">
            {promise}
          </p>
        </div>
      </div>

      {/* Structured Key Features Checklist */}
      <div className="mt-4 border-t border-chalk/10 pt-3.5 px-1">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/70">
          What&apos;s Included
        </p>
        <ul className="space-y-1.5">
          {bullets.slice(0, 3).map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-muted transition-colors duration-200 group-hover:text-chalk"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-flow/15 text-flow">
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span className="truncate">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Action Link Footer */}
        <div className="mt-3.5 flex items-center justify-between pt-2 text-muted transition-colors duration-200 group-hover:text-flow">
          <span className="font-mono text-xs font-medium uppercase tracking-wider">
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
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
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

  return (
    <section ref={sectionRef} className="relative bg-ink">
      <div className="flex flex-col overflow-hidden md:h-screen md:flex-row md:items-center">
        <div className="shrink-0 px-6 pt-24 pb-10 md:w-[440px] md:px-12 md:py-0 lg:w-[490px] lg:px-16">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[42px] leading-tight text-chalk">
            Six services, one engagement sequence.
          </h2>
          <p className="mt-5 max-w-md font-body text-base text-muted">
            This is the order we actually run projects in — not a menu, a
            sequence. Each service links to what it includes.
          </p>
          <div className="mt-10 hidden h-px w-full bg-chalk/10 md:block">
            <div
              ref={progressRef}
              className="h-full w-0 bg-signal"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          ref={trackContainerRef}
          className="relative hidden flex-1 overflow-hidden md:block md:h-full"
        >
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-center gap-8 pr-20 will-change-transform"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-8 md:hidden">
          {services.map((service) => (
            <div key={service.slug} className="snap-start">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

