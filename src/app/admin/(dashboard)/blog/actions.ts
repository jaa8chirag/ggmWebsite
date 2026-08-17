"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { str, repeatingPairs, parseSeoFields } from "@/lib/admin-form";

type BlockType = "h2" | "h3" | "paragraph" | "list";

function parseBlocks(formData: FormData) {
  const types = formData.getAll("blockType[]").map(String) as BlockType[];
  const texts = formData.getAll("blockText[]").map(String);
  const itemsRaw = formData.getAll("blockItems[]").map(String);

  const blocks: { type: BlockType; text: string | null; items: string[]; order: number }[] = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (type === "list") {
      const items = itemsRaw[i]
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (items.length === 0) continue;
      blocks.push({ type, text: null, items, order: blocks.length });
    } else {
      const text = (texts[i] ?? "").trim();
      if (!text) continue;
      blocks.push({ type, text, items: [], order: blocks.length });
    }
  }
  return blocks;
}

function parseBlogForm(formData: FormData) {
  const title = str(formData, "title");
  const slugInput = str(formData, "slug");
  const status = str(formData, "status") === "published" ? "published" : "draft";

  return {
    slug: slugify(slugInput || title),
    title,
    excerpt: str(formData, "excerpt"),
    date: new Date(str(formData, "date") || Date.now()),
    category: str(formData, "category"),
    status: status as "draft" | "published",
    blocks: parseBlocks(formData),
    faqs: repeatingPairs(formData, "faq"),
    ...parseSeoFields(formData),
  };
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const data = parseBlogForm(formData);
  const id = `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await query(
    `INSERT INTO \`BlogPost\` 
     (\`id\`, \`slug\`, \`title\`, \`excerpt\`, \`date\`, \`category\`, \`status\`, \`metaTitle\`, \`metaDescription\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`, \`createdAt\`, \`updatedAt\`) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [
      id,
      data.slug,
      data.title,
      data.excerpt,
      data.date,
      data.category,
      data.status,
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
    ]
  );

  for (let i = 0; i < data.blocks.length; i++) {
    const b = data.blocks[i];
    const blockId = `blk_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES (?, ?, ?, ?, ?, ?)",
      [blockId, id, b.type, b.text, JSON.stringify(b.items), i]
    );
  }

  for (let i = 0; i < data.faqs.length; i++) {
    const f = data.faqs[i];
    const faqId = `blogfaq_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES (?, ?, ?, ?, ?)",
      [faqId, id, f.a, f.b, i]
    );
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseBlogForm(formData);

  await query(
    `UPDATE \`BlogPost\` SET 
     \`slug\` = ?, \`title\` = ?, \`excerpt\` = ?, \`date\` = ?, \`category\` = ?, 
     \`status\` = ?, \`metaTitle\` = ?, \`metaDescription\` = ?, \`ogImage\` = ?, 
     \`canonicalOverride\` = ?, \`noIndex\` = ?
     WHERE \`id\` = ?`,
    [
      data.slug,
      data.title,
      data.excerpt,
      data.date,
      data.category,
      data.status,
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
      id,
    ]
  );

  await query("DELETE FROM `BlogBlock` WHERE `postId` = ?", [id]);
  for (let i = 0; i < data.blocks.length; i++) {
    const b = data.blocks[i];
    const blockId = `blk_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `BlogBlock` (`id`, `postId`, `type`, `text`, `items`, `order`) VALUES (?, ?, ?, ?, ?, ?)",
      [blockId, id, b.type, b.text, JSON.stringify(b.items), i]
    );
  }

  await query("DELETE FROM `BlogFaq` WHERE `postId` = ?", [id]);
  for (let i = 0; i < data.faqs.length; i++) {
    const f = data.faqs[i];
    const faqId = `blogfaq_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `BlogFaq` (`id`, `postId`, `question`, `answer`, `order`) VALUES (?, ?, ?, ?, ?)",
      [faqId, id, f.a, f.b, i]
    );
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const post = await queryOne<any>("SELECT `slug` FROM `BlogPost` WHERE `id` = ?", [id]);
  await query("DELETE FROM `BlogPost` WHERE `id` = ?", [id]);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (post) {
    revalidatePath(`/blog/${post.slug}`);
  }
}
