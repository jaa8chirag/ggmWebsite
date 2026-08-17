"use server";

import { revalidatePath } from "next/cache";
import { query, queryOne, parseJson } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { str } from "@/lib/admin-form";

export interface SeoSettingsRecord {
  id: string;
  ahrefsVerification: string | null;
  googleVerification: string | null;
  ahrefsApiKey: string | null;
  targetDomain: string;
  keywords: string[];
}

export async function getSeoSettings(): Promise<SeoSettingsRecord> {
  const row = await queryOne<any>("SELECT * FROM `SeoSettings` LIMIT 1");
  if (!row) {
    return {
      id: "seo_settings_1",
      ahrefsVerification: "",
      googleVerification: "",
      ahrefsApiKey: "",
      targetDomain: "ggmtechnologies.com",
      keywords: [
        "Digital Marketing Agency in Delhi",
        "SEO Services Delhi",
        "Web Development Company Delhi",
        "Lead Generation Agency Delhi",
        "PPC Agency Delhi",
        "Shopify Development Delhi",
      ],
    };
  }
  return {
    id: row.id,
    ahrefsVerification: row.ahrefsVerification ?? "",
    googleVerification: row.googleVerification ?? "",
    ahrefsApiKey: row.ahrefsApiKey ?? "",
    targetDomain: row.targetDomain ?? "ggmtechnologies.com",
    keywords: parseJson<string[]>(row.keywords, []),
  };
}

export async function saveSeoCredentials(formData: FormData) {
  await requireAdmin();

  const ahrefsVerification = str(formData, "ahrefsVerification");
  const googleVerification = str(formData, "googleVerification");
  const ahrefsApiKey = str(formData, "ahrefsApiKey");
  const targetDomain = str(formData, "targetDomain") || "ggmtechnologies.com";
  const rawKeywords = str(formData, "keywords");
  
  const keywords = rawKeywords
    ? rawKeywords.split("\n").map((k) => k.trim()).filter(Boolean)
    : [
        "Digital Marketing Agency in Delhi",
        "SEO Services Delhi",
        "Web Development Company Delhi",
        "Lead Generation Agency Delhi",
        "PPC Agency Delhi",
        "Shopify Development Delhi",
      ];

  const existing = await queryOne<any>("SELECT `id` FROM `SeoSettings` LIMIT 1");

  if (existing) {
    await query(
      `UPDATE \`SeoSettings\` SET 
       \`ahrefsVerification\` = ?, \`googleVerification\` = ?, 
       \`ahrefsApiKey\` = ?, \`targetDomain\` = ?, \`keywords\` = ? 
       WHERE \`id\` = ?`,
      [
        ahrefsVerification,
        googleVerification,
        ahrefsApiKey,
        targetDomain,
        JSON.stringify(keywords),
        existing.id,
      ]
    );
  } else {
    await query(
      `INSERT INTO \`SeoSettings\` 
       (\`id\`, \`ahrefsVerification\`, \`googleVerification\`, \`ahrefsApiKey\`, \`targetDomain\`, \`keywords\`) 
       VALUES ('seo_settings_1', ?, ?, ?, ?, ?)`,
      [
        ahrefsVerification,
        googleVerification,
        ahrefsApiKey,
        targetDomain,
        JSON.stringify(keywords),
      ]
    );
  }

  revalidatePath("/admin/seo-tools");
  revalidatePath("/");
}
