"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/nav";
import Magnetic from "@/components/ui/Magnetic";
import Button from "@/components/ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: "top -40",
      end: 999999,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => trigger.kill();
  }, []);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      if (menuOpen) {
        gsap.set(overlay, { display: "flex" });
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          linksRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.1,
          }
        );
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav
          className={cn(
            "mx-auto flex max-w-[1200px] items-center justify-between rounded-full border bg-surface/80 px-5 py-2.5 backdrop-blur-xl transition-shadow duration-300 md:px-6",
            scrolled
              ? "border-chalk/15 shadow-lg shadow-chalk/10"
              : "border-chalk/10 shadow-sm shadow-chalk/5"
          )}
        >
          <Link href="/" className="flex items-center" aria-label="GGM Technologies — home">
            <Image
              src="/logo/ggm-mark.png"
              alt="GGM Technologies"
              width={140}
              height={52}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[14px] font-medium uppercase tracking-wider text-chalk transition-colors hover:text-flow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Magnetic>
              <Button href="/contact" variant="signal" className="px-5 py-2.5">
                Start a project
              </Button>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="text-chalk md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-8 bg-ink md:hidden"
        style={{ opacity: 0 }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            ref={(el) => {
              linksRef.current[i] = el;
            }}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl text-chalk"
          >
            {link.label}
          </Link>
        ))}
        <Button href="/contact" variant="signal" className="mt-4">
          Start a project
        </Button>
      </div>
    </>
  );
}
