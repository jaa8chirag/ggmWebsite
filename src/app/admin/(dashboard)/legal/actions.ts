"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function updateLegalPage(id: string, formData: FormData) {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const subtitle = (formData.get("subtitle") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim() || "";
  const lastUpdated = (formData.get("lastUpdated") as string)?.trim() || "August 2026";
  const isPublished = formData.get("isPublished") === "on" ? 1 : 0;
  const metaTitle = (formData.get("metaTitle") as string)?.trim() || null;
  const metaDescription = (formData.get("metaDescription") as string)?.trim() || null;

  if (!title) {
    throw new Error("Title is required");
  }

  await query(
    `UPDATE \`LegalPage\`
     SET \`title\` = ?,
         \`subtitle\` = ?,
         \`content\` = ?,
         \`lastUpdated\` = ?,
         \`isPublished\` = ?,
         \`metaTitle\` = ?,
         \`metaDescription\` = ?,
         \`updatedAt\` = NOW(3)
     WHERE \`id\` = ?`,
    [
      title,
      subtitle,
      content,
      lastUpdated,
      isPublished,
      metaTitle,
      metaDescription,
      id,
    ]
  );

  // Revalidate public routes and admin list
  revalidatePath(`/${id}`);
  revalidatePath("/admin/legal");
  revalidatePath(`/admin/legal/${id}`);

  redirect("/admin/legal");
}
