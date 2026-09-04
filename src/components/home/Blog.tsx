"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

interface PostData {
  slug: string;
  title: string;
  date: Date;
  category: string;
  ogImage?: string | null;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const defaultBlogImages: Record<string, string> = {
  SEO: "/images/seo-strategy-banner.png",
  "Web Development": "/images/web-development-banner.png",
  "Lead Generation": "/images/lead-generation-banner.png",
};

export default function Blog({ posts }: { posts: PostData[] }) {
  return (
    <section className="border-t border-chalk/20 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow>From the blog</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-h2 text-chalk">
          Notes from inside the campaigns.
        </h2>

        <div className="mt-16 space-y-6">
          {posts.map((post) => {
            const imgSrc = post.ogImage || defaultBlogImages[post.category] || "/images/seo-strategy-banner.png";
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-6 rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md transition-all duration-300 hover:border-flow hover:shadow-xl md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-chalk/20 bg-ink">
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      width={176}
                      height={112}
                      sizes="176px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                      {formatDate(post.date)} · {post.category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl text-chalk transition-colors duration-300 group-hover:text-flow">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-flow font-semibold group-hover:underline">
                  Read Article →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
