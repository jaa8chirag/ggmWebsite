"use server";

import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface QuoteActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitQuoteRequest(formData: FormData): Promise<QuoteActionResult> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const serviceSlug = (formData.get("serviceSlug") as string)?.trim() || "general";
    const serviceTitle = (formData.get("serviceTitle") as string)?.trim() || "General Consultation";
    const pageUrl = (formData.get("pageUrl") as string)?.trim() || "/";

    if (!name || name.length < 2) {
      return { success: false, error: "Please provide your full name." };
    }

    // Clean phone number
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!cleanPhone || cleanPhone.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleanPhone)) {
      return { success: false, error: "Please enter a valid 10-digit mobile or WhatsApp number." };
    }

    const id = `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await query(
      `INSERT INTO \`QuoteRequest\` (\`id\`, \`name\`, \`phone\`, \`serviceSlug\`, \`serviceTitle\`, \`pageUrl\`, \`status\`, \`createdAt\`)
       VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW(3))`,
      [id, name, phone, serviceSlug, serviceTitle, pageUrl]
    );

    revalidatePath("/admin");
    revalidatePath("/admin/quotes");

    return {
      success: true,
      message: `Thank you, ${name}! Your request for ${serviceTitle} has been received. Our senior consultant will call you within 15 minutes.`,
    };
  } catch (err: any) {
    console.error("Error submitting quote request:", err);
    return {
      success: false,
      error: "Unable to submit your quote request right now. Please call or WhatsApp us directly.",
    };
  }
}

export async function updateQuoteStatusAction(id: string, status: string, notes?: string) {
  await requireAdmin();
  await query(
    `UPDATE \`QuoteRequest\` SET \`status\` = ?, \`notes\` = ? WHERE \`id\` = ?`,
    [status, notes || null, id]
  );
  revalidatePath("/admin");
  revalidatePath("/admin/quotes");
}

export async function deleteQuoteAction(id: string) {
  await requireAdmin();
  await query(`DELETE FROM \`QuoteRequest\` WHERE \`id\` = ?`, [id]);
  revalidatePath("/admin");
  revalidatePath("/admin/quotes");
}
