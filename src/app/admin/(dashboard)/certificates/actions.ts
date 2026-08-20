"use server";

import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function createCertificate(formData: FormData) {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const issuer = (formData.get("issuer") as string)?.trim();
  const certificateNo = (formData.get("certificateNo") as string)?.trim();
  const pdfUrl = (formData.get("pdfUrl") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const issueDate = (formData.get("issueDate") as string)?.trim() || null;

  if (!title || !issuer || !certificateNo || !pdfUrl) {
    throw new Error("Title, Issuer, Certificate Number, and PDF URL are required.");
  }

  const id = `cert_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  await query(
    `INSERT INTO \`CertificateDocument\` (\`id\`, \`title\`, \`issuer\`, \`certificateNo\`, \`pdfUrl\`, \`description\`, \`issueDate\`, \`order\`, \`createdAt\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(3))`,
    [id, title, issuer, certificateNo, pdfUrl, description, issueDate]
  );

  revalidatePath("/certifications");
  revalidatePath("/admin/legal");
  revalidatePath("/admin/legal/certifications");
}

export async function deleteCertificate(id: string) {
  await requireAdmin();

  await query("DELETE FROM `CertificateDocument` WHERE `id` = ?", [id]);

  revalidatePath("/certifications");
  revalidatePath("/admin/legal");
  revalidatePath("/admin/legal/certifications");
}
