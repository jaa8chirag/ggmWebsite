import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import BlogForm from "@/components/admin/blog/BlogForm";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await queryOne<any>("SELECT * FROM `BlogPost` WHERE `id` = ?", [id]);
  if (!post) notFound();

  const blocks = await query<any>("SELECT * FROM `BlogBlock` WHERE `postId` = ? ORDER BY `order` ASC", [id]);
  const faqs = await query<any>("SELECT * FROM `BlogFaq` WHERE `postId` = ? ORDER BY `order` ASC", [id]);

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {post.title}</h1>
      <div className="mt-8">
        <BlogForm
          action={updateBlogPost.bind(null, post.id)}
          values={{
            ...post,
            date: new Date(post.date).toISOString().slice(0, 10),
            noIndex: Boolean(post.noIndex),
            blocks: blocks.map((b) => ({ ...b, items: parseJson<string[]>(b.items, []) })),
            faqs: faqs.map((f) => ({ a: f.question, b: f.answer })),
          }}
        />
      </div>
    </div>
  );
}
