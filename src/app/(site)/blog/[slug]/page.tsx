import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/home/CtaBand";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import TableOfContents from "@/components/blog/TableOfContents";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, faqSchema } from "@/lib/schema";
import { slugify } from "@/lib/utils";

// Reverse of the service->category map in services/[slug]/page.tsx, so a
// blog post can link back to the service it supports.
const BLOG_CATEGORY_SERVICE: Record<string, string> = {
  SEO: "seo",
  "Web Development": "website-development",
  "Lead Generation": "lead-generation",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | GGM Technologies`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    overrides: post,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function estimateReadingMinutes(
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
) {
  const words = post.blocks.reduce((count, block) => {
    if (block.type === "list") {
      const items = (block.items as string[]) ?? [];
      return count + items.join(" ").split(/\s+/).length;
    }
    return count + (block.text ?? "").split(/\s+/).length;
  }, post.excerpt.split(/\s+/).length);
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts();

  const headings = post.blocks
    .filter((block) => block.type === "h2")
    .map((block) => block.text ?? "");

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const relatedServiceSlug = BLOG_CATEGORY_SERVICE[post.category];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.date.toISOString(),
        })}
      />
      {post.faqs.length > 0 && <JsonLd data={faqSchema(post.faqs)} />}

      <div className="bg-ink text-chalk">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 pt-32 pb-20 md:px-10 md:pt-40 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />

            <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-mono-label uppercase tracking-widest text-muted">
              <span className="h-px w-6 bg-signal" aria-hidden="true" />
              {post.category} · {formatDate(post.date)} ·{" "}
              {estimateReadingMinutes(post)} min read
            </p>

            <h1 className="mt-4 font-display text-display-l">{post.title}</h1>

            <p className="mt-6 font-body text-body-l text-muted">
              {post.excerpt}
            </p>

            {post.ogImage && (
              <div className="mt-8 overflow-hidden rounded-2xl border-2 border-chalk/30 shadow-lg">
                <img
                  src={post.ogImage}
                  alt={`${post.title} — GGM Technologies`}
                  className="h-auto w-full max-h-[460px] object-cover"
                />
              </div>
            )}

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
              By {"GGM Technologies"}
            </p>

            <div className="mt-6 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            <div className="mt-16 space-y-6">
              {post.blocks.map((block) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={block.id}
                      id={slugify(block.text ?? "")}
                      className="scroll-mt-32 pt-6 font-display text-2xl text-chalk"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "h3") {
                  return (
                    <h3
                      key={block.id}
                      className="pt-2 font-display text-xl text-chalk"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  const items = (block.items as string[]) ?? [];
                  return (
                    <ul key={block.id} className="space-y-2 pl-1">
                      {items.map((item: string, j: number) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 font-body text-body text-muted"
                        >
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flow"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={block.id} className="font-body text-body text-muted">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {post.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
                  Questions
                </h2>
                <div className="mt-6 divide-y divide-chalk/20 border-t border-b border-chalk/20">
                  {post.faqs.map((faq) => (
                    <details key={faq.question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg">
                        {faq.question}
                        <span className="shrink-0 font-mono text-muted transition-transform duration-300 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 font-body text-sm text-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {relatedServiceSlug && (
              <div className="mt-16 rounded-2xl border border-flow/30 bg-surface p-6 shadow-sm shadow-chalk/5">
                <p className="font-body text-sm text-muted">
                  Need help with {post.category.toLowerCase()}?
                </p>
                <Link
                  href={`/services/${relatedServiceSlug}`}
                  className="mt-2 inline-flex items-center gap-2 font-display text-lg text-chalk transition-colors hover:text-flow"
                >
                  See our {post.category} service
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="font-mono text-mono-label uppercase tracking-widest text-muted">
                  Related posts
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group rounded-2xl border border-chalk/20 bg-surface p-5 shadow-sm shadow-chalk/5 transition-colors hover:border-flow"
                    >
                      <span className="font-display text-base text-chalk">
                        {related.title}
                      </span>
                      <p className="mt-2 font-body text-xs text-muted">
                        {formatDate(related.date)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16">
              <Button href="/contact" variant="signal">
                Get a free audit
              </Button>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
