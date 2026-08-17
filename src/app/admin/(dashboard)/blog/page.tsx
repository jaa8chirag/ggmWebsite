import Link from "next/link";
import { Plus } from "lucide-react";
import { query } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await query<any>("SELECT * FROM `BlogPost` ORDER BY `date` DESC");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Blog</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {posts.length} posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New post
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`${cardClass} flex items-center justify-between`}
          >
            <div>
              <p className="font-mono text-xs text-muted">
                {new Date(post.date).toISOString().slice(0, 10)} · {post.category} ·{" "}
                <span
                  className={
                    post.status === "published" ? "text-flow" : "text-signal"
                  }
                >
                  {post.status}
                </span>
              </p>
              <p className="mt-1 font-display text-lg text-chalk">
                {post.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/blog/${post.id}/edit`}
                className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteBlogPost.bind(null, post.id)}
                label="post"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
