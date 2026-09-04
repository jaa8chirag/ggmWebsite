import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

const title = "SEO, PPC & Digital Marketing Blog | GGM Technologies";
const description =
  "SEO, PPC, and link-building notes from the team running campaigns at GGM Technologies.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/blog",
});

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="bg-ink py-32 text-chalk md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
        <p className="mt-6 flex items-center gap-3 font-mono text-mono-label uppercase tracking-widest text-muted">
          <span className="h-px w-6 bg-signal" aria-hidden="true" />
          From the blog
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-display-l">
          Notes from inside the campaigns.
        </h1>

        <div className="mt-16 divide-y divide-chalk/20 border-t border-b border-chalk/20">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between hover:bg-surface/50 px-4 rounded-2xl transition-all"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {post.ogImage && (
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-chalk/20 bg-surface">
                    <Image
                      src={post.ogImage}
                      alt={post.title}
                      width={176}
                      height={112}
                      sizes="176px"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div>
                  <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                    {formatDate(post.date)} · {post.category}
                  </span>
                  <h2 className="mt-1 font-display text-2xl transition-colors duration-300 group-hover:text-signal">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-xl font-body text-sm text-muted line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-flow font-semibold group-hover:underline">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
