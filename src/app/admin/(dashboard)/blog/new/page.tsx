import BlogForm from "@/components/admin/blog/BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New blog post</h1>
      <div className="mt-8">
        <BlogForm action={createBlogPost} />
      </div>
    </div>
  );
}
