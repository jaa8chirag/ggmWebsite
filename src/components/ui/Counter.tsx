"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export default function Counter({
  value,
  suffix = "",
  duration = 1.6,
  decimals,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = value.toFixed(dp) + suffix;
        return;
      }

      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = proxy.val.toFixed(dp) + suffix;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {(0).toFixed(dp)}
      {suffix}
    </span>
  );
}
