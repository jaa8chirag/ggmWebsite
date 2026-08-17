"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";

interface ServiceCardData {
  slug: string;
  index: string;
  title: string;
  promise: string;
  bullets: string[];
}

function ServiceCard({
  slug,
  index,
  title,
  promise,
  bullets,
}: ServiceCardData) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex min-h-[420px] w-[320px] shrink-0 flex-col justify-between rounded-2xl border-2 border-chalk/30 bg-surface p-8 shadow-md shadow-chalk/10 transition-colors duration-300 hover:border-flow hover:shadow-lg sm:w-[360px]"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="font-mono text-mono-label text-flow">
            {index}
          </span>
          <ArrowUpRight
            size={18}
            className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flow"
          />
        </div>
        <h3 className="mt-6 font-display text-2xl text-chalk">{title}</h3>
        <p className="mt-3 font-body text-sm text-muted">{promise}</p>
      </div>

      <ul className="mt-8 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 font-mono text-xs uppercase tracking-wide text-muted"
          >
            <Check size={14} className="mt-0.5 shrink-0 text-flow" />
            {bullet}
          </li>
        ))}
      </ul>
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
        <div className="shrink-0 px-6 pt-24 pb-10 md:w-[380px] md:px-10 md:py-0 lg:w-[420px] lg:px-16">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-chalk">
            Six services, one engagement sequence.
          </h2>
          <p className="mt-4 max-w-sm font-body text-body text-muted">
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
            className="absolute inset-y-0 left-0 flex items-center gap-6 pr-16 will-change-transform"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:hidden">
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
