import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import { DB_POSTS } from "@/data/dbSeedData";
import BlogForm from "@/components/admin/blog/BlogForm";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let post = await queryOne<any>("SELECT * FROM `BlogPost` WHERE `id` = ? OR `slug` = ?", [id, id]);

  if (!post) {
    const seedMatch = DB_POSTS.find((p) => p.id === id || p.slug === id);
    if (seedMatch) {
      post = { ...seedMatch };
    }
  }

  if (!post) notFound();

  const targetId = post.id || id;
  const blocks = await query<any>("SELECT * FROM `BlogBlock` WHERE `postId` = ? ORDER BY `order` ASC", [targetId]);
  const faqs = await query<any>("SELECT * FROM `BlogFaq` WHERE `postId` = ? ORDER BY `order` ASC", [targetId]);

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {post.title}</h1>
      <div className="mt-8">
        <BlogForm
          action={updateBlogPost.bind(null, targetId)}
          values={{
            ...post,
            date: new Date(post.date).toISOString().slice(0, 10),
            noIndex: Boolean(post.noIndex),
            blocks: (blocks && blocks.length > 0) ? blocks.map((b) => ({ ...b, items: parseJson<string[]>(b.items, []) })) : [],
            faqs: (faqs && faqs.length > 0) ? faqs.map((f) => ({ a: f.question, b: f.answer })) : [],
          }}
        />
      </div>
    </div>
  );
}
