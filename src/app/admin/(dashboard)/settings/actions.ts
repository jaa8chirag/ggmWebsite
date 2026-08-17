"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { str, repeating, repeatingPairs } from "@/lib/admin-form";

function parseMetrics(formData: FormData) {
  const values = formData.getAll("metricValue[]").map(String);
  const suffixes = formData.getAll("metricSuffix[]").map(String);
  const labels = formData.getAll("metricLabel[]").map(String);
  const metrics: { value: number; suffix: string; label: string; order: number }[] = [];
  for (let i = 0; i < values.length; i++) {
    const value = Number(values[i]);
    if (!labels[i]?.trim() || !Number.isFinite(value)) continue;
    metrics.push({
      value,
      suffix: suffixes[i]?.trim() ?? "",
      label: labels[i].trim(),
      order: metrics.length,
    });
  }
  return metrics;
}

export async function updateSettings(id: string, formData: FormData) {
  await requireAdmin();

  const whyChooseUs = repeatingPairs(formData, "why");
  const metrics = parseMetrics(formData);
  const clients = repeating(formData, "clients");

  await query(
    `UPDATE \`SiteSettings\` SET 
     \`name\` = ?, \`tagline\` = ?, \`eyebrow\` = ?, \`phone\` = ?, \`phoneHref\` = ?, 
     \`email\` = ?, \`addressLine1\` = ?, \`addressLine2\` = ?, \`addressLine3\` = ?, 
     \`gst\` = ?, \`businessHours\` = ?, \`aboutEyebrow\` = ?, \`aboutTitle\` = ?, 
     \`aboutIntro\` = ?, \`mission\` = ?, \`vision\` = ?, \`clients\` = ?
     WHERE \`id\` = ?`,
    [
      str(formData, "name"),
      str(formData, "tagline"),
      str(formData, "eyebrow"),
      str(formData, "phone"),
      str(formData, "phoneHref"),
      str(formData, "email"),
      str(formData, "addressLine1"),
      str(formData, "addressLine2"),
      str(formData, "addressLine3"),
      str(formData, "gst"),
      str(formData, "businessHours"),
      str(formData, "aboutEyebrow"),
      str(formData, "aboutTitle"),
      str(formData, "aboutIntro"),
      str(formData, "mission"),
      str(formData, "vision"),
      JSON.stringify(clients),
      id,
    ]
  );

  await query("DELETE FROM `WhyChooseUs` WHERE `settingsId` = ?", [id]);
  for (let i = 0; i < whyChooseUs.length; i++) {
    const w = whyChooseUs[i];
    const whyId = `why_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `WhyChooseUs` (`id`, `settingsId`, `title`, `description`, `order`) VALUES (?, ?, ?, ?, ?)",
      [whyId, id, w.a, w.b, i]
    );
  }

  await query("DELETE FROM `MetricItem` WHERE `settingsId` = ?", [id]);
  for (let i = 0; i < metrics.length; i++) {
    const m = metrics[i];
    const metricId = `metric_${Date.now()}_${i}`;
    await query(
      "INSERT INTO `MetricItem` (`id`, `settingsId`, `value`, `suffix`, `label`, `order`) VALUES (?, ?, ?, ?, ?, ?)",
      [metricId, id, m.value, m.suffix, m.label, i]
    );
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  redirect("/admin/settings");
}
