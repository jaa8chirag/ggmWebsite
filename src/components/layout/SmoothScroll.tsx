"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 768) return;

    // Ultra-responsive, zero-lag scroll engine:
    // Native 120Hz/60Hz wheel & touch (0ms latency), smooth programmatic anchor links
    const lenis = new Lenis({
      duration: 0.4,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: false, // 100% native hardware-accelerated wheel scroll: NO drag, NO delay, NO rubber-banding!
      syncTouch: false,   // 100% native mobile inertia: buttery-smooth 120Hz on phones
    });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
