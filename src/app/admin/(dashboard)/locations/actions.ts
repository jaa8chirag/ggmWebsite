"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { str, optionalStr, bool } from "@/lib/admin-form";

function parseLocationForm(formData: FormData) {
  const name = str(formData, "name");
  const slugInput = str(formData, "slug");
  return {
    name,
    slug: slugify(slugInput || name),
    region: optionalStr(formData, "region"),
    isActive: bool(formData, "isActive"),
  };
}

export async function createLocation(formData: FormData) {
  await requireAdmin();
  const data = parseLocationForm(formData);
  const id = `loc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  await query(
    "INSERT INTO `Location` (`id`, `slug`, `name`, `region`, `isActive`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))",
    [id, data.slug, data.name, data.region, data.isActive ? 1 : 0]
  );
  revalidatePath("/admin/locations");
  revalidatePath("/sitemap.xml");
  redirect("/admin/locations");
}

export async function updateLocation(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseLocationForm(formData);
  await query(
    "UPDATE `Location` SET `slug` = ?, `name` = ?, `region` = ?, `isActive` = ? WHERE `id` = ?",
    [data.slug, data.name, data.region, data.isActive ? 1 : 0, id]
  );
  revalidatePath("/admin/locations");
  revalidatePath("/sitemap.xml");
  redirect("/admin/locations");
}

export async function deleteLocation(id: string) {
  await requireAdmin();
  await query("DELETE FROM `Location` WHERE `id` = ?", [id]);
  revalidatePath("/admin/locations");
  revalidatePath("/sitemap.xml");
}
