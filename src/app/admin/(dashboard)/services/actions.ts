"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { str, repeating, repeatingPairs, parseSeoFields } from "@/lib/admin-form";

function parseServiceForm(formData: FormData) {
  const title = str(formData, "title");
  const slugInput = str(formData, "slug");

  return {
    slug: slugify(slugInput || title),
    index: str(formData, "index") || "01",
    title,
    promise: str(formData, "promise"),
    description: str(formData, "description"),
    bullets: repeating(formData, "bullets"),
    faqs: repeatingPairs(formData, "faq"),
    ...parseSeoFields(formData),
  };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = parseServiceForm(formData);
  const id = `srv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await query(
    `INSERT INTO \`Service\` 
     (\`id\`, \`slug\`, \`index\`, \`title\`, \`promise\`, \`description\`, \`bullets\`, \`metaTitle\`, \`metaDescription\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`, \`createdAt\`, \`updatedAt\`) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [
      id,
      data.slug,
      data.index,
      data.title,
      data.promise,
      data.description,
      JSON.stringify(data.bullets),
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
    ]
  );

  for (let i = 0; i < data.faqs.length; i++) {
    const f = data.faqs[i];
    const faqId = `srvfaq_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES (?, ?, ?, ?, ?)",
      [faqId, id, f.a, f.b, i]
    );
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseServiceForm(formData);

  await query(
    `UPDATE \`Service\` SET 
     \`slug\` = ?, \`index\` = ?, \`title\` = ?, \`promise\` = ?, \`description\` = ?, 
     \`bullets\` = ?, \`metaTitle\` = ?, \`metaDescription\` = ?, \`ogImage\` = ?, 
     \`canonicalOverride\` = ?, \`noIndex\` = ?
     WHERE \`id\` = ?`,
    [
      data.slug,
      data.index,
      data.title,
      data.promise,
      data.description,
      JSON.stringify(data.bullets),
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
      id,
    ]
  );

  await query("DELETE FROM `ServiceFaq` WHERE `serviceId` = ?", [id]);
  for (let i = 0; i < data.faqs.length; i++) {
    const f = data.faqs[i];
    const faqId = `srvfaq_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `ServiceFaq` (`id`, `serviceId`, `question`, `answer`, `order`) VALUES (?, ?, ?, ?, ?)",
      [faqId, id, f.a, f.b, i]
    );
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  const service = await queryOne<any>("SELECT `slug` FROM `Service` WHERE `id` = ?", [id]);
  await query("DELETE FROM `Service` WHERE `id` = ?", [id]);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  if (service) {
    revalidatePath(`/services/${service.slug}`);
  }
}
