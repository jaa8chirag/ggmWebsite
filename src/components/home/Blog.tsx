"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowUpRight, BookOpen, Sparkles, ChevronRight, User } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

interface PostData {
  slug: string;
  title: string;
  excerpt?: string | null;
  date: Date | string;
  category: string;
  ogImage?: string | null;
}

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || isNaN(d.getTime())) return "Recently Published";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Calculate approximate read time based on title/category length
function getReadTime(category: string, title: string) {
  const length = (category + title).length;
  if (length > 80) return "7 min read";
  if (length > 50) return "5 min read";
  return "4 min read";
}

const defaultBlogImages: Record<string, string> = {
  SEO: "/images/seo-strategy-banner.png",
  "Web Development": "/images/web-development-banner.png",
  "Lead Generation": "/images/lead-generation-banner.png",
  "Digital Marketing": "/images/services/digital-marketing-services.jpg",
  "E-Commerce": "/images/services/e-commerce.jpg",
};

const trendingTopics = [
  { label: "Technical SEO Audits", href: "/blog?category=SEO" },
  { label: "High-ROAS Google Ads", href: "/blog?category=Lead+Generation" },
  { label: "Next.js 16 Web Engineering", href: "/blog?category=Web+Development" },
  { label: "Conversion Rate Optimization (CRO)", href: "/blog" },
  { label: "Shopify Speed & Scale", href: "/blog" },
];

export default function Blog({ posts }: { posts: PostData[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative border-t border-chalk/20 bg-ink py-24 md:py-32 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-flow/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Modern Split Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-chalk/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <Eyebrow>From the blog</Eyebrow>
              <span className="inline-flex items-center gap-1 rounded-full border border-flow/30 bg-flow/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-flow">
                <span className="h-1 w-1 rounded-full bg-flow animate-ping" />
                Updated Weekly
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chalk">
              Notes from inside the campaigns.
            </h2>
            <p className="mt-3 font-body text-base text-muted max-w-xl leading-relaxed">
              Real data, transparent experiments, and engineering playbooks from managing active client campaigns and full-stack architectures.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-chalk/20 bg-surface/90 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-chalk shadow-sm backdrop-blur-md transition-all duration-300 hover:border-flow hover:text-flow hover:shadow-md"
            >
              <span>Explore All Insights</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* 3-Column Magazine Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => {
            const imgSrc =
              post.ogImage ||
              defaultBlogImages[post.category] ||
              "/images/seo-strategy-banner.png";
            const readTime = getReadTime(post.category, post.title);

            return (
              <article
                key={post.slug}
                className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-3xl border border-chalk/15 bg-surface/95 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-flow hover:shadow-2xl"
              >
                <div>
                  {/* High-Definition Banner with Floating Badges */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink"
                  >
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={Boolean(imgSrc.startsWith("data:") || imgSrc.startsWith("http"))}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Category Badge (Glassmorphic) */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-chalk/20 bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-flow backdrop-blur-md shadow-sm">
                        <Sparkles size={10} className="text-signal" />
                        {post.category || "Growth Guide"}
                      </span>
                    </div>

                    {/* Floating Read Time Pill */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full border border-chalk/15 bg-ink/75 px-2 py-0.5 font-mono text-[10px] font-medium text-chalk/90 backdrop-blur-md">
                        <Clock size={10} className="text-muted" />
                        {readTime}
                      </span>
                    </div>
                  </Link>

                  {/* Metadata Row */}
                  <div className="mt-4 flex items-center justify-between px-1 text-muted">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
                      <Calendar size={11} className="text-flow" />
                      {formatDate(post.date)}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-flow/90">
                      Case Study
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 px-1 font-display text-lg sm:text-xl font-bold tracking-tight text-chalk transition-colors duration-300 group-hover:text-flow line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mt-2.5 px-1 font-body text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Bottom Footer Action Bar */}
                <div className="mt-6 border-t border-chalk/10 pt-4 px-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-flow/30 bg-flow/10 text-flow font-mono text-xs font-bold">
                      G
                    </div>
                    <span className="font-mono text-[11px] font-medium text-muted">
                      GGM Research
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-flow transition-colors group-hover:text-signal"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Trending Topics Ribbon */}
        <div className="mt-14 rounded-2xl border border-chalk/10 bg-surface/60 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span>Trending Disciplines:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {trendingTopics.map((topic) => (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="rounded-lg border border-chalk/15 bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-muted hover:border-flow hover:text-flow transition-colors"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface border border-chalk/20 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-chalk shadow-sm"
          >
            <span>Explore All Blog Articles</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
