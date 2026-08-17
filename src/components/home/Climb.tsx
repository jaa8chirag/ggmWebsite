"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { climb } from "@/data/climb";
import { cn } from "@/lib/utils";

const ROW_HEIGHT = 88;
const ROW_GAP = 16;
const ROW_STEP = ROW_HEIGHT + ROW_GAP;

// Which slot (0 = top) a row sits in, given which service is currently active.
// The active row always takes slot 0; every other row keeps its original
// relative order, filling the remaining slots.
function getSlot(rowIndex: number, activeIndex: number, total: number) {
  if (rowIndex === activeIndex) return 0;
  let slot = 1;
  for (let i = 0; i < total; i++) {
    if (i === activeIndex) continue;
    if (i === rowIndex) return slot;
    slot++;
  }
  return slot;
}

interface ClimbService {
  slug: string;
  title: string;
  promise: string;
}

export default function Climb({ services }: { services: ClimbService[] }) {
  const climbServices = useMemo(
    () =>
      services.map((service) => ({
        slug: service.slug,
        title: `GGM Technologies — ${service.title}`,
        url: "ggmtechnologies.com",
        meta: service.promise,
      })),
    [services]
  );
  const rowCount = climbServices.length;
  const stackHeight = rowCount * ROW_HEIGHT + (rowCount - 1) * ROW_GAP;

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rankRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  // Only the scroll-driven "climbed from #47" story earns the delta chip —
  // picking a service from the dropdown has no climb to show, so it's hidden.
  const [showDelta, setShowDelta] = useState(false);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!dropdownOpen) return;

    const onClick = (e: MouseEvent) => {
      if (!searchBarRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  useGSAP(
    () => {
      const rows = rowRefs.current;

      gsap.set(rows, {
        y: (i: number) => i * ROW_STEP,
        opacity: 0,
        filter: "blur(0px)",
        boxShadow: "0 0 0px 0 rgba(255,61,129,0)",
      });
      gsap.set(
        supportRef.current?.querySelectorAll("[data-support-item]") ?? [],
        { opacity: 0, y: 16 }
      );
      gsap.set(progressRef.current, { height: "0%" });
      gsap.set(queryRef.current, { clipPath: "inset(0 100% 0 0)" });
      if (rankRef.current) rankRef.current.textContent = String(climb.rankStart);

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isCompact:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isCompact, isReduced } = context.conditions as {
            isDesktop: boolean;
            isCompact: boolean;
            isReduced: boolean;
          };

          const settle = () => {
            gsap.set(rows, {
              y: (i: number) => (i === 0 ? 0 : i * ROW_STEP),
              opacity: (i: number) => (i === 0 ? 1 : 0.55),
            });
            setShowDelta(true);
            const items =
              supportRef.current?.querySelectorAll("[data-support-item]") ??
              [];
            gsap.set(items, { opacity: 1, y: 0 });
            gsap.set(progressRef.current, { height: "100%" });
            gsap.set(queryRef.current, { clipPath: "inset(0 0% 0 0)" });
            gsap.set(caretRef.current, { opacity: 0 });
            if (rankRef.current)
              rankRef.current.textContent = String(climb.rankEnd);
            setIsInteractive(true);
          };

          if (isReduced || isCompact) {
            settle();
            if (isCompact) {
              gsap.from(contentRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
                  once: true,
                },
              });
            }
            return;
          }

          if (isDesktop) {
            const rankProxy = { value: climb.rankStart };
            const otherRows = rows.filter((_, i) => i !== 0);

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
              defaults: { ease: "none" },
            });

            tl.to(rows, { opacity: 1, stagger: 1.2, ease: "power2.out" }, 0);
            tl.to(queryRef.current, { clipPath: "inset(0 0% 0 0)" }, 0);
            tl.to(caretRef.current, { opacity: 0, duration: 3 }, 12);

            tl.to(
              otherRows,
              {
                y: (i: number) => (i + 1) * ROW_STEP,
                opacity: 0.55,
                filter: "blur(0.5px)",
                duration: 60,
                ease: "power2.inOut",
              },
              15
            );
            tl.to(rows[0], { y: 0, duration: 60, ease: "power2.inOut" }, 15);
            tl.to(
              rankProxy,
              {
                value: climb.rankEnd,
                duration: 60,
                ease: "power2.inOut",
                onUpdate: () => {
                  if (rankRef.current) {
                    rankRef.current.textContent = String(
                      Math.round(rankProxy.value)
                    );
                  }
                },
              },
              15
            );

            tl.to(
              rows[0],
              { boxShadow: "0 0 40px 0 rgba(255,61,129,0.45)", duration: 15 },
              75
            );
            tl.call(() => setShowDelta(true), [], 75);

            tl.to(
              supportRef.current?.querySelectorAll("[data-support-item]") ??
                [],
              { opacity: 1, y: 0, duration: 10, stagger: 1.5, ease: "power2.out" },
              90
            );

            tl.fromTo(
              progressRef.current,
              { height: "0%" },
              { height: "100%", duration: 100 },
              0
            );

            tl.call(() => setIsInteractive(true), [], 95);
          }
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setDropdownOpen(false);

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const slot = getSlot(i, index, rowCount);
      gsap.to(row, {
        y: slot * ROW_STEP,
        opacity: i === index ? 1 : 0.55,
        filter: i === index ? "blur(0px)" : "blur(0.5px)",
        boxShadow:
          i === index
            ? "0 0 40px 0 rgba(255,61,129,0.45)"
            : "0 0 0px 0 rgba(255,61,129,0)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    });

    setShowDelta(false);
    if (rankRef.current) rankRef.current.textContent = String(climb.rankEnd);
  };

  return (
    <section ref={sectionRef} className="relative bg-surface">
      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-10"
      >
        <h2 className="sr-only">
          Where GGM Technologies&apos; own services rank
        </h2>
        <div ref={searchBarRef} className="relative mx-auto w-full max-w-xl">
          <button
            type="button"
            onClick={() => isInteractive && setDropdownOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className={cn(
              "flex w-full items-center gap-3 rounded-full border-2 border-chalk/30 bg-ink px-5 py-3 text-left shadow-md transition-colors",
              isInteractive && "cursor-pointer hover:border-flow"
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 text-muted"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <div className="flex flex-1 items-center whitespace-nowrap font-mono text-sm text-chalk">
              <span ref={queryRef} className="inline-block">
                {climb.searchQuery}
              </span>
              <span
                ref={caretRef}
                className="ml-0.5 inline-block h-4 w-[2px] bg-flow"
                aria-hidden="true"
              />
            </div>
            {isInteractive && (
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-muted transition-transform duration-300",
                  dropdownOpen && "rotate-180"
                )}
              />
            )}
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border-2 border-chalk/30 bg-ink shadow-xl"
            >
              {climbServices.map((service, i) => (
                <li key={service.slug} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    className={cn(
                      "flex w-full items-center justify-between px-5 py-3 text-left font-body text-sm transition-colors hover:bg-surface",
                      i === activeIndex ? "text-flow" : "text-chalk"
                    )}
                  >
                    {service.title.replace("GGM Technologies — ", "")}
                    {i === activeIndex && (
                      <span className="font-mono text-xs text-flow">
                        showing
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
          <div className="relative" style={{ height: stackHeight }}>
            {climbServices.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={cn(
                  "absolute inset-x-0 top-0 flex items-center gap-4 rounded-xl border-2 px-5 transition-colors duration-300 shadow-sm",
                  i === activeIndex
                    ? "border-signal bg-surface shadow-md shadow-signal/15"
                    : "border-chalk/25 bg-surface/90 hover:border-chalk/45"
                )}
                style={{ height: ROW_HEIGHT }}
              >
                <span
                  className={cn(
                    "w-6 shrink-0 font-mono text-xs",
                    i === activeIndex ? "text-signal" : "text-muted/60"
                  )}
                >
                  {i === activeIndex ? "★" : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate font-body text-sm",
                      i === activeIndex ? "text-chalk" : "text-muted"
                    )}
                  >
                    {service.title}
                  </p>
                  <p className="mt-1 flex items-baseline gap-2 overflow-hidden">
                    <span
                      className={cn(
                        "shrink-0 font-mono text-xs",
                        i === activeIndex ? "text-flow" : "text-muted/50"
                      )}
                    >
                      {service.url}
                    </span>
                    <span className="truncate font-body text-xs text-muted/40">
                      {service.meta}
                    </span>
                  </p>
                </div>
                {i === activeIndex && showDelta && (
                  <span className="shrink-0 font-mono text-xs tabular-nums text-signal">
                    +{climb.rankStart - climb.rankEnd}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden flex-col items-center gap-4 md:flex">
            <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
              Rank
            </span>
            <span
              ref={rankRef}
              className="font-mono text-6xl tabular-nums text-chalk"
            >
              {climb.rankStart}
            </span>
            <div className="relative h-40 w-px bg-chalk/10">
              <div
                ref={progressRef}
                className="absolute bottom-0 left-0 w-full bg-flow"
              />
            </div>
          </div>
        </div>

        <div
          ref={supportRef}
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {climb.supportingItems.map((item) => (
            <p
              key={item}
              data-support-item
              className="border-t border-chalk/20 pt-3 font-mono text-xs uppercase tracking-widest text-muted"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
