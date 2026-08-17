"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { backlinks } from "@/data/backlinks";
import Eyebrow from "@/components/ui/Eyebrow";

// Three.js/R3F is a heavy dependency — code-split it out of the initial
// page chunk so it doesn't add to hydration cost on first load.
const BacklinkField = dynamic(() => import("@/components/three/BacklinkField"), {
  ssr: false,
});

export default function Constellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <div>
          <Eyebrow>{backlinks.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-chalk">
            {backlinks.title}
          </h2>
          <p className="mt-4 max-w-md font-body text-body text-muted">
            {backlinks.description}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-chalk/20 pt-6">
            {backlinks.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-lg text-flow md:text-xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <BacklinkField
          progressRef={progressRef}
          className="aspect-square w-full md:aspect-[4/3]"
        />
      </div>
    </section>
  );
}
