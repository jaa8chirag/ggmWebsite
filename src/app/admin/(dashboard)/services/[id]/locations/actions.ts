"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { optionalStr, parseSeoFields } from "@/lib/admin-form";

export async function enableLocation(serviceId: string, locationId: string) {
  await requireAdmin();
  const existing = await queryOne<any>(
    "SELECT `id` FROM `ServiceLocation` WHERE `serviceId` = ? AND `locationId` = ?",
    [serviceId, locationId]
  );
  if (existing) {
    await query("UPDATE `ServiceLocation` SET `published` = 1 WHERE `id` = ?", [existing.id]);
  } else {
    const id = `sl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    await query(
      "INSERT INTO `ServiceLocation` (`id`, `serviceId`, `locationId`, `published`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))",
      [id, serviceId, locationId]
    );
  }
  revalidatePath(`/admin/services/${serviceId}/locations`);
  revalidatePath("/sitemap.xml");
}

export async function disableLocation(serviceId: string, locationId: string) {
  await requireAdmin();
  await query("DELETE FROM `ServiceLocation` WHERE `serviceId` = ? AND `locationId` = ?", [serviceId, locationId]);
  revalidatePath(`/admin/services/${serviceId}/locations`);
  revalidatePath("/sitemap.xml");
}

export async function updateServiceLocation(
  serviceLocationId: string,
  formData: FormData
) {
  await requireAdmin();
  const seo = parseSeoFields(formData);
  const customIntro = optionalStr(formData, "customIntro");

  await query(
    `UPDATE \`ServiceLocation\` SET 
     \`customIntro\` = ?, \`metaTitle\` = ?, \`metaDescription\` = ?, 
     \`ogImage\` = ?, \`canonicalOverride\` = ?, \`noIndex\` = ?
     WHERE \`id\` = ?`,
    [
      customIntro,
      seo.metaTitle,
      seo.metaDescription,
      seo.ogImage,
      seo.canonicalOverride,
      seo.noIndex ? 1 : 0,
      serviceLocationId,
    ]
  );

  const sl = await queryOne<any>(
    `SELECT sl.*, s.slug as serviceSlug, l.slug as locationSlug 
     FROM \`ServiceLocation\` sl
     JOIN \`Service\` s ON sl.serviceId = s.id
     JOIN \`Location\` l ON sl.locationId = l.id
     WHERE sl.id = ?`,
    [serviceLocationId]
  );

  if (sl) {
    revalidatePath(`/admin/services/${sl.serviceId}/locations`);
    revalidatePath(`/services/${sl.serviceSlug}/${sl.locationSlug}`);
    redirect(`/admin/services/${sl.serviceId}/locations`);
  }
}
