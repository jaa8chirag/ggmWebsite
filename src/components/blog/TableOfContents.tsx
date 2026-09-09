"use client";

import { useEffect, useState } from "react";

export interface TocHeadingItem {
  id: string;
  text: string;
  level?: "h2" | "h3";
}

interface TableOfContentsProps {
  headings: (string | TocHeadingItem)[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const items: TocHeadingItem[] = headings.map((h) => {
    if (typeof h === "string") {
      return {
        id: h
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        text: h,
        level: "h2",
      };
    }
    return h;
  });

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-chalk/20 bg-surface/90 p-5 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-2 border-b border-chalk/10 pb-3">
        <span className="h-2 w-2 rounded-full bg-flow animate-pulse" />
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-chalk">
          Table of Contents
        </p>
      </div>

      <ol className="mt-4 space-y-1.5 text-xs font-body">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === "h3";

          return (
            <li key={item.id} className={isH3 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    setActiveId(item.id);
                  }
                }}
                className={`group flex items-start gap-2 rounded-lg px-2.5 py-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-flow/15 font-semibold text-flow shadow-sm"
                    : "text-muted hover:bg-chalk/5 hover:text-chalk"
                }`}
              >
                <span
                  className={`mt-1.5 h-1 w-1 shrink-0 rounded-full transition-colors ${
                    isActive ? "bg-flow" : "bg-muted/40 group-hover:bg-chalk"
                  }`}
                />
                <span className="line-clamp-2 leading-relaxed">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
