"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Bot, Cloud, Check, Bell, Lock } from "lucide-react";

interface ComingSoonServiceCardProps {
  title: string;
  badge?: string;
  category: string;
  description: string;
  features: string[];
  iconType: "ai" | "cloud" | "sparkles";
}

export default function ComingSoonServiceCard({
  title,
  badge = "COMING SOON",
  category,
  description,
  features,
  iconType,
}: ComingSoonServiceCardProps) {
  const Icon = iconType === "ai" ? Bot : iconType === "cloud" ? Cloud : Sparkles;

  return (
    <div className="group relative flex min-h-[445px] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-flow/35 bg-surface/85 p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-flow hover:shadow-2xl sm:p-4">
      {/* Background ambient pulse */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-flow/5 via-transparent to-signal/5 opacity-60 transition-opacity group-hover:opacity-100" />

      <div>
        {/* Skeleton Shimmer Image Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-chalk/15 bg-ink p-4 flex flex-col items-center justify-center text-center">
          {/* Shimmer sweep effect */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-chalk/10 to-transparent" />

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flow/30 bg-surface/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-flow shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-flow animate-ping" />
              {badge}
            </span>
          </div>

          {/* Center Glowing Icon */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-flow/30 bg-surface/90 text-flow shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon size={26} strokeWidth={2.2} />
          </div>

          <p className="relative z-10 mt-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/80">
            {category}
          </p>

          {/* Micro Skeleton lines representing in-development wireframe */}
          <div className="mt-2 flex items-center gap-1.5 opacity-60">
            <div className="h-1 w-8 rounded-full bg-chalk/25 animate-pulse" />
            <div className="h-1 w-14 rounded-full bg-flow/35 animate-pulse" />
            <div className="h-1 w-6 rounded-full bg-chalk/25 animate-pulse" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold tracking-tight text-chalk transition-colors duration-300 group-hover:text-flow">
              {title}
            </h2>
          </div>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Features Checklist (Skeleton styled with preview bullets) */}
      <div className="mt-4 border-t border-chalk/10 pt-3.5 px-1">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/70 flex items-center justify-between">
          <span>What&apos;s In Development</span>
          <span className="text-[9px] font-normal text-flow/80">R&amp;D Pipeline</span>
        </p>

        <ul className="space-y-1.5">
          {features.slice(0, 3).map((feat, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-muted/90"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-flow/10 text-flow/80 border border-flow/20">
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Bottom CTA: Notify Me / Request Early Access */}
        <div className="mt-3.5 pt-2 border-t border-chalk/5">
          <Link
            href="/contact?service=other-query"
            className="group/btn flex items-center justify-between font-mono text-xs font-semibold uppercase tracking-wider text-flow hover:text-signal transition-colors py-0.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <Bell size={12} className="text-flow group-hover/btn:animate-bounce" />
              <span>Get Notified at Launch</span>
            </span>
            <span className="font-mono text-sm transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
