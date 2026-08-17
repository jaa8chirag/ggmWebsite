"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { str, parseSeoFields } from "@/lib/admin-form";

function parseWorkForm(formData: FormData) {
  const client = str(formData, "client");
  const slugInput = str(formData, "slug");
  const variant = str(formData, "variant");

  return {
    slug: slugify(slugInput || client),
    client,
    category: str(formData, "category"),
    summary: str(formData, "summary"),
    resultLabel: str(formData, "resultLabel"),
    variant: (["interiors", "fitness", "ecommerce"].includes(variant)
      ? variant
      : "interiors") as "interiors" | "fitness" | "ecommerce",
    ...parseSeoFields(formData),
  };
}

export async function createCaseStudy(formData: FormData) {
  await requireAdmin();
  const data = parseWorkForm(formData);
  const countRow = await queryOne<any>("SELECT COUNT(*) as c FROM `CaseStudy`");
  const order = countRow ? Number(countRow.c) : 0;
  const id = `work_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await query(
    `INSERT INTO \`CaseStudy\` 
     (\`id\`, \`slug\`, \`client\`, \`category\`, \`summary\`, \`resultLabel\`, \`variant\`, \`order\`, \`metaTitle\`, \`metaDescription\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`, \`createdAt\`, \`updatedAt\`) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [
      id,
      data.slug,
      data.client,
      data.category,
      data.summary,
      data.resultLabel,
      data.variant,
      order,
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
    ]
  );

  revalidatePath("/admin/work");
  revalidatePath("/work");
  revalidatePath("/");
  redirect("/admin/work");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseWorkForm(formData);

  await query(
    `UPDATE \`CaseStudy\` SET 
     \`slug\` = ?, \`client\` = ?, \`category\` = ?, \`summary\` = ?, 
     \`resultLabel\` = ?, \`variant\` = ?, \`metaTitle\` = ?, \`metaDescription\` = ?, 
     \`ogImage\` = ?, \`canonicalOverride\` = ?, \`noIndex\` = ?
     WHERE \`id\` = ?`,
    [
      data.slug,
      data.client,
      data.category,
      data.summary,
      data.resultLabel,
      data.variant,
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
      id,
    ]
  );

  revalidatePath("/admin/work");
  revalidatePath("/work");
  revalidatePath("/");
  redirect("/admin/work");
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();
  await query("DELETE FROM `CaseStudy` WHERE `id` = ?", [id]);
  revalidatePath("/admin/work");
  revalidatePath("/work");
  revalidatePath("/");
}
