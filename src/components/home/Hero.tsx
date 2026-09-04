"use client";

import { useRef } from "react";
import { Globe, TrendingUp, Target, Users } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Marquee from "@/components/ui/Marquee";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import IsometricScene from "@/components/decor/IsometricScene";

const headlineLines = ["Rank higher.", "Spend smarter.", "Grow faster."];

const serviceStrip = [
  "SEO",
  "PPC",
  "WEB DEV",
  "LEAD GEN",
  "SOCIAL",
  "SHOPIFY",
];

const deliveryItems = [
  {
    label: "Website",
    status: "Shipped",
    icon: Globe,
    accent: "flow" as const,
    anchor: "left-[2%] top-[2%] lg:left-[6%]",
  },
  {
    label: "SEO",
    status: "Climbing",
    icon: TrendingUp,
    accent: "signal" as const,
    anchor: "right-[2%] top-[0%] lg:right-[7%]",
  },
  {
    label: "Ad campaigns",
    status: "Live",
    icon: Target,
    accent: "flow" as const,
    anchor: "left-[6%] top-[28%] lg:left-[12%]",
  },
  {
    label: "Leads",
    status: "Flowing in",
    icon: Users,
    accent: "signal" as const,
    anchor: "right-[5%] top-[24%] lg:right-[11%]",
  },
];

// Fixed initial offsets/rotations per card — scattered like dropped photos,
// settling into place as the user scrolls through the hero.
const deliveryTransforms = [
  { x: 46, y: 70, rotate: -9 },
  { x: -30, y: 90, rotate: 7 },
  { x: 54, y: 60, rotate: 6 },
  { x: -36, y: 76, rotate: -6 },
];

export default function Hero({ eyebrow }: { eyebrow: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(cardRefs.current, { x: 0, y: 0, rotate: 0, opacity: 1 });
        return;
      }

      gsap.to(contentRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Delivery stack: only initialize on desktop screens where cards are visible
      if (window.innerWidth >= 768) {
        const cards = cardRefs.current;
        cards.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, {
            x: deliveryTransforms[i].x,
            y: deliveryTransforms[i].y,
            rotate: deliveryTransforms[i].rotate,
            opacity: 0,
          });
        });

        gsap.to(cards, {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "center top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
    >
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pt-32 pb-4 text-center md:px-10 md:pt-36 md:pb-6"
      >
        <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-chalk/25" />
          ))}
        </div>

        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>

        <RevealText
          as="h1"
          lines={headlineLines}
          className="mt-6 text-center font-display text-display-l text-chalk"
          delay={0.15}
        />

        <p className="mx-auto mt-8 max-w-lg font-body text-body-l text-muted">
          We build SEO, PPC, and web systems that turn search traffic into
          pipeline — measured in rankings and revenue, not vanity metrics.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button href="/contact" variant="signal">
              Get a free audit
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </Magnetic>
        </div>

        <div className="relative mt-8 hidden h-[260px] w-full max-w-4xl md:block">
          <IsometricScene animate className="opacity-90" />

          {deliveryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "absolute flex items-center gap-3 rounded-2xl border-2 border-chalk/30 bg-surface px-4 py-3 text-left shadow-md shadow-chalk/10",
                  item.anchor
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    item.accent === "signal"
                      ? "bg-signal/15 text-signal"
                      : "bg-flow/15 text-flow"
                  )}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {item.label}
                  </p>
                  <p className="font-display text-lg text-chalk">
                    {item.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 hidden flex-col items-center gap-2 md:flex">
          <span className="animate-drift font-mono text-mono-label uppercase tracking-widest text-muted underline decoration-chalk/30 underline-offset-4 motion-reduce:animate-none">
            Scroll to discover
          </span>
        </div>
      </div>

      <div className="relative z-10 border-t-2 border-chalk/30">
        <Marquee items={serviceStrip} className="py-6" />
      </div>
    </section>
  );
}
