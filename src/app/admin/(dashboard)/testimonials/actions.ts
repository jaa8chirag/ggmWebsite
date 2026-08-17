"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { str, bool } from "@/lib/admin-form";

function parseTestimonialForm(formData: FormData) {
  return {
    quote: str(formData, "quote"),
    name: str(formData, "name"),
    role: str(formData, "role"),
    published: bool(formData, "published"),
  };
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const data = parseTestimonialForm(formData);
  const countRow = await queryOne<any>("SELECT COUNT(*) as c FROM `Testimonial`");
  const order = countRow ? Number(countRow.c) : 0;
  const id = `testi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await query(
    "INSERT INTO `Testimonial` (`id`, `quote`, `name`, `role`, `published`, `order`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))",
    [id, data.quote, data.name, data.role, data.published ? 1 : 0, order]
  );

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseTestimonialForm(formData);

  await query(
    "UPDATE `Testimonial` SET `quote` = ?, `name` = ?, `role` = ?, `published` = ? WHERE `id` = ?",
    [data.quote, data.name, data.role, data.published ? 1 : 0, id]
  );

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await query("DELETE FROM `Testimonial` WHERE `id` = ?", [id]);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
