"use server";

import { revalidatePath } from "next/cache";
import { query, queryOne, parseJson } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import type { CrmLeadModel, CrmLeadStatus, LeadNote } from "@/types";

export interface LeadActionResult {
  success: boolean;
  message?: string;
  error?: string;
  leadId?: string;
}

/**
 * Creates a new manual lead (or from admin portal)
 */
export async function createLeadAction(formData: FormData): Promise<LeadActionResult> {
  try {
    await requireAdmin();

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim() || null;
    const serviceSlug = (formData.get("serviceSlug") as string)?.trim() || "general";
    const serviceTitle = (formData.get("serviceTitle") as string)?.trim() || "General Consultation";
    const source = (formData.get("source") as string)?.trim() || "Manual Lead";
    const status = ((formData.get("status") as string)?.trim() || "NEW") as CrmLeadStatus;
    const initialNoteText = (formData.get("initialNote") as string)?.trim();
    const nextFollowUp = (formData.get("nextFollowUp") as string)?.trim() || null;

    const rawApprox = formData.get("approxAmount");
    const rawFix = formData.get("fixAmount");
    const approxAmount = rawApprox ? (rawApprox as string).trim() : null;
    const fixAmount = rawFix ? (rawFix as string).trim() : null;
    const quotationSent = formData.get("quotationSent") === "true" || formData.get("quotationSent") === "on";

    if (!name || name.length < 2) {
      return { success: false, error: "Client name is required." };
    }

    const cleanPhone = phone ? phone.replace(/[\s\-\(\)]/g, "") : "";
    if (!cleanPhone || cleanPhone.length < 8) {
      return { success: false, error: "Please enter a valid mobile or WhatsApp number." };
    }

    const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const notesArray: LeadNote[] = [];
    if (initialNoteText) {
      notesArray.push({
        id: `note_${Date.now()}_0`,
        text: initialNoteText,
        createdAt: new Date().toISOString(),
        author: "Admin",
      });
    }

    await query(
      `INSERT INTO \`CrmLead\`
       (\`id\`, \`name\`, \`phone\`, \`email\`, \`serviceSlug\`, \`serviceTitle\`, \`source\`, \`status\`, \`approxAmount\`, \`fixAmount\`, \`quotationSent\`, \`nextFollowUp\`, \`timelineNotes\`, \`createdAt\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))`,
      [
        id,
        name,
        phone,
        email,
        serviceSlug,
        serviceTitle,
        source,
        status,
        approxAmount,
        fixAmount,
        quotationSent ? 1 : 0,
        nextFollowUp ? new Date(nextFollowUp) : null,
        JSON.stringify(notesArray),
      ]
    );

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/quotes");

    return {
      success: true,
      message: `Lead for ${name} created successfully!`,
      leadId: id,
    };
  } catch (err: any) {
    console.error("Error creating lead:", err);
    return {
      success: false,
      error: err?.message || "Failed to create lead. Please check input details.",
    };
  }
}

/**
 * Updates lead attributes (amounts, quotation sent, next follow-up, status, client info)
 */
export async function updateLeadAction(
  leadId: string,
  data: {
    name?: string;
    phone?: string;
    email?: string | null;
    serviceSlug?: string;
    serviceTitle?: string;
    source?: string;
    status?: CrmLeadStatus;
    approxAmount?: string | null;
    fixAmount?: string | null;
    quotationSent?: boolean;
    nextFollowUp?: string | null;
  }
): Promise<LeadActionResult> {
  try {
    await requireAdmin();

    const existing = await queryOne<any>("SELECT * FROM `CrmLead` WHERE `id` = ?", [leadId]);
    if (!existing) {
      return { success: false, error: "Lead not found." };
    }

    const name = data.name !== undefined ? data.name.trim() : existing.name;
    const phone = data.phone !== undefined ? data.phone.trim() : existing.phone;
    const email = data.email !== undefined ? data.email : existing.email;
    const serviceSlug = data.serviceSlug !== undefined ? data.serviceSlug : existing.serviceSlug;
    const serviceTitle = data.serviceTitle !== undefined ? data.serviceTitle : existing.serviceTitle;
    const source = data.source !== undefined ? data.source : existing.source;
    const status = data.status !== undefined ? data.status : existing.status;
    const approxAmount = data.approxAmount !== undefined ? data.approxAmount : existing.approxAmount;
    const fixAmount = data.fixAmount !== undefined ? data.fixAmount : existing.fixAmount;
    const quotationSent = data.quotationSent !== undefined ? data.quotationSent : Boolean(existing.quotationSent);
    const nextFollowUp = data.nextFollowUp !== undefined ? data.nextFollowUp : existing.nextFollowUp;

    await query(
      `UPDATE \`CrmLead\`
       SET \`name\` = ?,
           \`phone\` = ?,
           \`email\` = ?,
           \`serviceSlug\` = ?,
           \`serviceTitle\` = ?,
           \`source\` = ?,
           \`status\` = ?,
           \`approxAmount\` = ?,
           \`fixAmount\` = ?,
           \`quotationSent\` = ?,
           \`nextFollowUp\` = ?,
           \`updatedAt\` = NOW(3)
       WHERE \`id\` = ?`,
      [
        name,
        phone,
        email || null,
        serviceSlug,
        serviceTitle,
        source,
        status,
        approxAmount ?? null,
        fixAmount ?? null,
        quotationSent ? 1 : 0,
        nextFollowUp ? new Date(nextFollowUp) : null,
        leadId,
      ]
    );

    // Also sync back to QuoteRequest if connected
    if (existing.quoteRequestId) {
      let quoteStatus = "PENDING";
      if (status === "IN_DISCUSSION" || status === "QUOTATION_SENT" || status === "FOLLOWUP_SCHEDULED") {
        quoteStatus = "CONTACTED";
      } else if (status === "WON") {
        quoteStatus = "CONVERTED";
      } else if (status === "LOST") {
        quoteStatus = "ARCHIVED";
      }

      await query(
        `UPDATE \`QuoteRequest\` SET \`name\` = ?, \`phone\` = ?, \`email\` = ?, \`status\` = ? WHERE \`id\` = ?`,
        [name, phone, email || null, quoteStatus, existing.quoteRequestId]
      );
    }

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/quotes");

    return { success: true, message: "Lead updated successfully!" };
  } catch (err: any) {
    console.error("Error updating lead:", err);
    return { success: false, error: err?.message || "Failed to update lead." };
  }
}

/**
 * Appends a new note to a lead's timeline
 */
export async function addLeadNoteAction(
  leadId: string,
  noteText: string,
  author: string = "Admin"
): Promise<LeadActionResult> {
  try {
    await requireAdmin();

    const trimmed = noteText.trim();
    if (!trimmed) {
      return { success: false, error: "Note text cannot be empty." };
    }

    const lead = await queryOne<any>("SELECT * FROM `CrmLead` WHERE `id` = ?", [leadId]);
    if (!lead) {
      return { success: false, error: "Lead not found." };
    }

    const currentNotes = parseJson<LeadNote[]>(lead.timelineNotes, []);
    const newNote: LeadNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      text: trimmed,
      createdAt: new Date().toISOString(),
      author: author,
    };

    const updatedNotes = [newNote, ...currentNotes];

    await query(
      `UPDATE \`CrmLead\` SET \`timelineNotes\` = ?, \`updatedAt\` = NOW(3) WHERE \`id\` = ?`,
      [JSON.stringify(updatedNotes), leadId]
    );

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/quotes");

    return { success: true, message: "Note added to lead timeline." };
  } catch (err: any) {
    console.error("Error adding lead note:", err);
    return { success: false, error: err?.message || "Failed to add note." };
  }
}

/**
 * Deletes a lead
 */
export async function deleteLeadAction(leadId: string): Promise<LeadActionResult> {
  try {
    await requireAdmin();

    const lead = await queryOne<any>("SELECT * FROM `CrmLead` WHERE `id` = ?", [leadId]);
    if (lead?.quoteRequestId) {
      await query("DELETE FROM `QuoteRequest` WHERE `id` = ?", [lead.quoteRequestId]);
    }
    await query("DELETE FROM `CrmLead` WHERE `id` = ?", [leadId]);

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/quotes");

    return { success: true, message: "Lead deleted." };
  } catch (err: any) {
    console.error("Error deleting lead:", err);
    return { success: false, error: err?.message || "Failed to delete lead." };
  }
}
