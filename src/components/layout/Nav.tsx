"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";
import Button from "@/components/ui/Button";

const aboutDropdownItems = [
  {
    label: "About Us (Overview)",
    href: "/about",
    description: "Agency overview, mission & vision",
    icon: Users,
  },
  {
    label: "Quality & Compliance",
    href: "/quality-compliance",
    description: "100% White-Hat SEO & ISO standards",
    icon: ShieldCheck,
  },
  {
    label: "About CEO",
    href: "/about-ceo",
    description: "Founder leadership & algorithmic philosophy",
    icon: Award,
  },
  {
    label: "About The Company",
    href: "/about-the-company",
    description: "Infrastructure, headquarters & history",
    icon: Building2,
  },
  {
    label: "Why Us",
    href: "/why-us",
    description: "Why leading brands choose GGM Technologies",
    icon: TrendingUp,
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAboutDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200); // 200ms grace period so dropdown does not close prematurely
  };

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
          linksRef.current.filter(Boolean),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
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

  const isAboutActive =
    pathname === "/about" ||
    pathname === "/quality-compliance" ||
    pathname === "/about-ceo" ||
    pathname === "/about-the-company" ||
    pathname === "/why-us";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 transform-gpu will-change-transform">
        <nav
          className={cn(
            "mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 md:px-6 transform-gpu",
            scrolled
              ? "border-white/90 bg-white/80 shadow-[0_10px_30px_rgba(3,112,186,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
              : "border-white/80 bg-white/60 shadow-[0_8px_24px_rgba(3,112,186,0.06)]"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center" aria-label="GGM Technologies — home">
            <Image
              src="/logo/ggm-logo.png"
              alt="GGM Technologies"
              width={160}
              height={60}
              className="h-9 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {/* 1. Services */}
            <li>
              <Link
                href="/services"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname.startsWith("/services")
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Services
              </Link>
            </li>

            {/* 2. Work */}
            <li>
              <Link
                href="/work"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname.startsWith("/work")
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Work
              </Link>
            </li>

            {/* 3. Shop */}
            <li>
              <Link
                href="/shop"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname.startsWith("/shop")
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Shop
              </Link>
            </li>

            {/* 4. ABOUT US (Reliable Hover & Click Dropdown with Bridge) */}
            <li
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200 cursor-pointer",
                  isAboutActive || aboutDropdownOpen
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                <span>About Us</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    aboutDropdownOpen ? "rotate-180 text-flow" : "opacity-70"
                  )}
                />
              </button>

              {/* Desktop Dropdown Menu with Hover-Bridge */}
              {aboutDropdownOpen && (
                <div
                  className="absolute left-1/2 top-full pt-2 -translate-x-1/2 w-84 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="rounded-3xl border border-white/80 bg-surface/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-3xl">
                    <div className="px-3 py-2 border-b border-chalk/10">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-flow font-semibold">
                        GGM Technologies Profile &amp; Leadership
                      </p>
                    </div>
                    <div className="mt-1.5 space-y-1">
                      {aboutDropdownItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setAboutDropdownOpen(false)}
                            className={cn(
                              "group flex items-start gap-3 rounded-2xl p-2.5 transition-all",
                              isCurrent
                                ? "bg-flow/15 border border-flow/25 text-flow font-bold"
                                : "hover:bg-flow/10 hover:border-flow/20 text-chalk"
                            )}
                          >
                            <div className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                              isCurrent ? "bg-flow text-white" : "bg-flow/10 text-flow group-hover:bg-flow group-hover:text-white"
                            )}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="font-display text-xs font-bold transition-colors">
                                {item.label}
                              </p>
                              <p className="font-body text-[11px] text-muted line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* 5. Certifications */}
            <li>
              <Link
                href="/certifications"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname.startsWith("/certifications")
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Certifications
              </Link>
            </li>

            {/* 6. Blog */}
            <li>
              <Link
                href="/blog"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname.startsWith("/blog")
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Blog
              </Link>
            </li>

            {/* 7. Contact */}
            <li>
              <Link
                href="/contact"
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[14px] uppercase tracking-wider transition-all duration-200",
                  pathname === "/contact"
                    ? "border border-flow/25 bg-flow/15 font-bold text-flow shadow-sm"
                    : "font-medium text-chalk hover:bg-white/70 hover:text-flow hover:shadow-sm"
                )}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Action */}
          <div className="hidden lg:block">
            <Magnetic>
              <Button href="/contact" variant="signal" className="px-5 py-2.5 shadow-sm">
                Start a project
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/45 text-chalk backdrop-blur-md transition-colors hover:bg-white/75 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-between overflow-y-auto border border-white/60 bg-surface/95 px-6 py-28 backdrop-blur-3xl lg:hidden"
        style={{ opacity: 0 }}
      >
        <div className="space-y-3">
          <Link
            ref={(el) => {
              linksRef.current[0] = el;
            }}
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Services
          </Link>

          <Link
            ref={(el) => {
              linksRef.current[1] = el;
            }}
            href="/work"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Work
          </Link>

          <Link
            ref={(el) => {
              linksRef.current[2] = el;
            }}
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Shop
          </Link>

          {/* Mobile Accordion for About Us */}
          <div
            ref={(el) => {
              linksRef.current[3] = el;
            }}
            className="rounded-2xl bg-ink/20 p-4 border border-chalk/10"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="font-display text-2xl text-chalk hover:text-flow flex items-center justify-between w-full text-left"
              >
                <span>About Us Hub</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    mobileAboutOpen && "rotate-180 text-flow"
                  )}
                />
              </button>
            </div>

            {/* Mobile Sub-Links */}
            {mobileAboutOpen && (
              <div className="mt-3 space-y-2 border-t border-chalk/10 pt-3">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 font-body text-sm text-muted hover:bg-flow/10 hover:text-chalk"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} className="text-flow" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            ref={(el) => {
              linksRef.current[4] = el;
            }}
            href="/certifications"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Certifications
          </Link>

          <Link
            ref={(el) => {
              linksRef.current[5] = el;
            }}
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Blog
          </Link>

          <Link
            ref={(el) => {
              linksRef.current[6] = el;
            }}
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-5 py-2 font-display text-2xl text-chalk hover:text-flow"
          >
            Contact
          </Link>
        </div>

        <div className="mt-8 border-t border-chalk/15 pt-6">
          <Button href="/contact" variant="signal" className="w-full shadow-lg">
            Start a project
          </Button>
        </div>
      </div>
    </>
  );
}
