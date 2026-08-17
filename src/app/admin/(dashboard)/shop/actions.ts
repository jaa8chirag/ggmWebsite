"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { str, num, repeating, repeatingPairs, parseSeoFields } from "@/lib/admin-form";

function parseProductForm(formData: FormData) {
  const name = str(formData, "name");
  const slugInput = str(formData, "slug");

  return {
    slug: slugify(slugInput || name),
    name,
    category: str(formData, "category"),
    price: num(formData, "price"),
    originalPrice: num(formData, "originalPrice"),
    description: str(formData, "description"),
    features: repeating(formData, "features"),
    benefits: repeating(formData, "benefits"),
    specs: repeatingPairs(formData, "spec"),
    ...parseSeoFields(formData),
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);
  const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await query(
    `INSERT INTO \`Product\` 
     (\`id\`, \`slug\`, \`name\`, \`category\`, \`price\`, \`originalPrice\`, \`description\`, \`features\`, \`benefits\`, \`metaTitle\`, \`metaDescription\`, \`ogImage\`, \`canonicalOverride\`, \`noIndex\`, \`createdAt\`, \`updatedAt\`) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [
      id,
      data.slug,
      data.name,
      data.category,
      data.price,
      data.originalPrice,
      data.description,
      JSON.stringify(data.features),
      JSON.stringify(data.benefits),
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
    ]
  );

  for (let i = 0; i < data.specs.length; i++) {
    const s = data.specs[i];
    const specId = `spec_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES (?, ?, ?, ?, ?)",
      [specId, id, s.a, s.b, i]
    );
  }

  revalidatePath("/admin/shop");
  revalidatePath("/shop");
  redirect("/admin/shop");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);

  await query(
    `UPDATE \`Product\` SET 
     \`slug\` = ?, \`name\` = ?, \`category\` = ?, \`price\` = ?, \`originalPrice\` = ?, 
     \`description\` = ?, \`features\` = ?, \`benefits\` = ?, \`metaTitle\` = ?, 
     \`metaDescription\` = ?, \`ogImage\` = ?, \`canonicalOverride\` = ?, \`noIndex\` = ?
     WHERE \`id\` = ?`,
    [
      data.slug,
      data.name,
      data.category,
      data.price,
      data.originalPrice,
      data.description,
      JSON.stringify(data.features),
      JSON.stringify(data.benefits),
      data.metaTitle,
      data.metaDescription,
      data.ogImage,
      data.canonicalOverride,
      data.noIndex ? 1 : 0,
      id,
    ]
  );

  await query("DELETE FROM `ProductSpec` WHERE `productId` = ?", [id]);
  for (let i = 0; i < data.specs.length; i++) {
    const s = data.specs[i];
    const specId = `spec_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `ProductSpec` (`id`, `productId`, `label`, `value`, `order`) VALUES (?, ?, ?, ?, ?)",
      [specId, id, s.a, s.b, i]
    );
  }

  revalidatePath("/admin/shop");
  revalidatePath("/shop");
  revalidatePath(`/shop/${data.slug}`);
  redirect("/admin/shop");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const product = await queryOne<any>("SELECT `slug` FROM `Product` WHERE `id` = ?", [id]);
  await query("DELETE FROM `Product` WHERE `id` = ?", [id]);
  revalidatePath("/admin/shop");
  revalidatePath("/shop");
  if (product) {
    revalidatePath(`/shop/${product.slug}`);
  }
}
