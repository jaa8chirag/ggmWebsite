"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type LineTone = "muted" | "flow" | "signal";

interface CodeLine {
  width: number;
  tone: LineTone;
}

interface Cluster {
  top: string;
  left: string;
  width: number;
  delay: number;
  lines: CodeLine[];
}

// Fixed, deterministic layout — no Math.random at render time. Reads like
// scattered code-editor panes quietly "typing" in the background.
const clusters: Cluster[] = [
  {
    top: "10%",
    left: "56%",
    width: 220,
    delay: 0,
    lines: [
      { width: 70, tone: "signal" },
      { width: 92, tone: "muted" },
      { width: 55, tone: "flow" },
      { width: 80, tone: "muted" },
    ],
  },
  {
    top: "24%",
    left: "8%",
    width: 180,
    delay: 1.6,
    lines: [
      { width: 60, tone: "muted" },
      { width: 88, tone: "flow" },
      { width: 45, tone: "muted" },
    ],
  },
  {
    top: "52%",
    left: "68%",
    width: 240,
    delay: 0.8,
    lines: [
      { width: 85, tone: "muted" },
      { width: 65, tone: "signal" },
      { width: 95, tone: "muted" },
      { width: 50, tone: "flow" },
      { width: 75, tone: "muted" },
    ],
  },
  {
    top: "68%",
    left: "14%",
    width: 200,
    delay: 2.4,
    lines: [
      { width: 90, tone: "flow" },
      { width: 58, tone: "muted" },
      { width: 72, tone: "muted" },
    ],
  },
  {
    top: "78%",
    left: "62%",
    width: 190,
    delay: 3.2,
    lines: [
      { width: 68, tone: "muted" },
      { width: 88, tone: "signal" },
      { width: 48, tone: "muted" },
    ],
  },
];

const toneClass: Record<LineTone, string> = {
  muted: "bg-chalk/45",
  flow: "bg-flow/85",
  signal: "bg-signal/85",
};

export default function DeveloperBackground({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const clusterEls =
        containerRef.current?.querySelectorAll<HTMLElement>(
          "[data-cluster]"
        ) ?? [];

      if (reduced) {
        clusterEls.forEach((el) => {
          const lines = el.querySelectorAll<HTMLElement>("[data-line]");
          gsap.set(lines, { scaleX: 1, opacity: 1 });
        });
        return;
      }

      clusterEls.forEach((el, i) => {
        const lines = el.querySelectorAll<HTMLElement>("[data-line]");
        gsap.set(lines, { scaleX: 0, opacity: 0, transformOrigin: "left" });

        const tl = gsap.timeline({
          repeat: -1,
          delay: clusters[i].delay,
          defaults: { ease: "power2.out" },
        });

        tl.to(lines, {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.18,
        })
          .to({}, { duration: 1.6 })
          .to(lines, {
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
          })
          .set(lines, { scaleX: 0 })
          .to({}, { duration: 0.4 });

        timelinesRef.current.push(tl);
      });

      const el = containerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          timelinesRef.current.forEach((tl) =>
            entry.isIntersecting ? tl.play() : tl.pause()
          );
        },
        { threshold: 0 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn("hidden overflow-hidden md:block", className)}
      aria-hidden="true"
    >
      {clusters.map((cluster, i) => (
        <div
          key={i}
          data-cluster
          className="absolute flex flex-col gap-2.5 rounded-xl border-2 border-chalk/30 bg-surface/85 p-3 shadow-md shadow-chalk/10 backdrop-blur-[2px]"
          style={{ top: cluster.top, left: cluster.left, width: cluster.width }}
        >
          {cluster.lines.map((line, j) => (
            <div
              key={j}
              data-line
              className={cn("h-2 rounded-full", toneClass[line.tone])}
              style={{ width: `${line.width}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
