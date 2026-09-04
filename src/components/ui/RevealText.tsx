"use client";

import { useRef } from "react";
import type { Ref } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

interface RevealTextProps {
  lines: string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}

export default function RevealText({
  lines,
  as = "div",
  className,
  lineClassName,
  stagger = 0.09,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Type-erased to a concrete tag so JSX gives sane prop/ref typing while
  // `as` still picks the real element at runtime.
  const Tag = as as unknown as "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = el.querySelectorAll<HTMLElement>("[data-reveal-line]");
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) {
        gsap.set(targets, { yPercent: 0, opacity: 1 });
        return;
      }

      if (as === "h1") {
        gsap.fromTo(
          targets,
          { opacity: 0.9, y: 4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger,
          }
        );
        return;
      }

      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            data-reveal-line
            className={cn("inline-block", lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
