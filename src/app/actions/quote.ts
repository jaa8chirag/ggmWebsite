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
    const email = (formData.get("email") as string)?.trim() || null;
    const message = (formData.get("message") as string)?.trim() || null;
    const serviceSlug = (formData.get("serviceSlug") as string)?.trim() || "general";
    const serviceTitle = (formData.get("serviceTitle") as string)?.trim() || "General Consultation";
    const pageUrl = (formData.get("pageUrl") as string)?.trim() || "/";

    if (!name || name.length < 2) {
      return { success: false, error: "Please provide your full name." };
    }

    // Clean phone number
    const cleanPhone = phone ? phone.replace(/[\s\-\(\)]/g, "") : "";
    if (!cleanPhone || cleanPhone.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleanPhone)) {
      return { success: false, error: "Please enter a valid 10-digit mobile or WhatsApp number." };
    }

    const id = `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await query(
      `INSERT INTO \`QuoteRequest\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`serviceSlug\`, \`serviceTitle\`, \`message\`, \`pageUrl\`, \`status\`, \`createdAt\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', NOW(3))`,
      [id, name, phone, email, serviceSlug, serviceTitle, message, pageUrl]
    );

    // Also auto-sync directly into CrmLead CRM table
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const initialNotes = message
      ? JSON.stringify([{ id: `note_1`, text: `Website Form Message: ${message}`, createdAt: new Date().toISOString(), author: "Website Form" }])
      : JSON.stringify([]);

    await query(
      `INSERT INTO \`CrmLead\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`serviceSlug\`, \`serviceTitle\`, \`source\`, \`status\`, \`timelineNotes\`, \`quoteRequestId\`, \`createdAt\`, \`updatedAt\`)
       VALUES (?, ?, ?, ?, ?, ?, 'WEBSITE', 'NEW', ?, ?, NOW(3), NOW(3))`,
      [leadId, name, phone, email, serviceSlug, serviceTitle, initialNotes, id]
    );

    revalidatePath("/admin");
    revalidatePath("/admin/quotes");
    revalidatePath("/admin/leads");

    return {
      success: true,
      message: `Thank you, ${name}! Your request for ${serviceTitle} has been received. Our team will contact you within 15 minutes.`,
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
