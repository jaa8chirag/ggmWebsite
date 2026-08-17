"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { processSteps } from "@/data/process";
import Eyebrow from "@/components/ui/Eyebrow";
import IsometricScene from "@/components/decor/IsometricScene";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Desktop: pinned accordion + pinned isometric scene */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 font-display text-h2 text-chalk">
              Four steps. No black box.
            </h2>

            <div className="mt-10 space-y-2">
              {processSteps.map((step, i) => {
                const active = i === activeIndex;
                return (
                  <div
                    key={step.index}
                    className={cn(
                      "rounded-2xl border-2 px-5 py-4 transition-colors duration-300",
                      active
                        ? "border-flow bg-surface shadow-md shadow-flow/15"
                        : "border-chalk/25 bg-surface/60 hover:border-chalk/45"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors duration-300",
                          active ? "bg-chalk text-ink" : "text-muted"
                        )}
                      >
                        {step.index}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-xl transition-colors duration-300",
                          active ? "text-chalk" : "text-muted"
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>
                    {active && (
                      <p className="mt-3 pl-12 font-body text-body text-muted">
                        {step.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-32 h-[50vh]">
              <IsometricScene
                activeIndex={activeIndex}
                className="opacity-90"
              />
            </div>
            {processSteps.map((step, i) => (
              <div
                key={step.index}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="h-[50vh]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Mobile: simple static list, no pin/scene */}
        <div className="md:hidden">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-chalk">
            Four steps. No black box.
          </h2>

          <div className="mt-10 space-y-10">
            {processSteps.map((step) => (
              <div key={step.index}>
                <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                  {step.index}
                </span>
                <h3 className="mt-3 font-display text-2xl text-chalk">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-body text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
