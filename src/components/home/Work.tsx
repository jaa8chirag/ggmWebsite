"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";

interface CaseStudyData {
  slug: string;
  client: string;
  category: string;
  summary: string;
  resultLabel: string;
  variant: "interiors" | "fitness" | "ecommerce";
  ogImage?: string | null;
}

const defaultWorkImages: Record<string, string> = {
  interiors: "/images/lead-generation-banner.png",
  fitness: "/images/seo-strategy-banner.png",
  ecommerce: "/images/web-development-banner.png",
};

export default function Work({ work }: { work: CaseStudyData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(imageRefs.current, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.set(imageRefs.current, { clipPath: "inset(0% 0% 100% 0%)" });
      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.to(img, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 85%", once: true },
        });
      });

      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const skewSetter = gsap.quickSetter(images, "skewY", "deg");
      const clamp = gsap.utils.clamp(-6, 6);
      const proxy = { skew: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-h2 text-chalk">
          Three engagements, three different problems.
        </h2>

        <div className="mt-16 space-y-20 md:space-y-28">
          {work.map((item, i) => {
            const imgSrc = item.ogImage || defaultWorkImages[item.variant] || "/images/lead-generation-banner.png";
            return (
              <article
                key={item.slug}
                className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <div
                  className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-chalk/30 shadow-xl"
                  style={{ willChange: "transform" }}
                >
                  <div
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    className="h-full w-full overflow-hidden"
                  >
                    <img
                      src={imgSrc}
                      alt={`${item.client} case study showcase`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                    {item.category}
                  </span>
                  <h3 className="relative mt-3 block w-fit font-display text-3xl text-chalk">
                    {item.client}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-flow transition-transform duration-500 group-hover:scale-x-100" />
                  </h3>
                  <p className="mt-4 max-w-md font-body text-body text-muted">
                    {item.summary}
                  </p>
                  <span className="mt-6 inline-block translate-y-2 rounded-full border border-flow/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-flow opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.resultLabel}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
