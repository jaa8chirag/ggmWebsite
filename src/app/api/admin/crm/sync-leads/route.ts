import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const SYNC_SECRET = "ggm_leads_sync_2026";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== SYNC_SECRET) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const rows = await query<any>("SELECT * FROM `CrmLead` ORDER BY `createdAt` DESC");

    return NextResponse.json({
      success: true,
      count: rows.length,
      leads: rows,
    });
  } catch (error: any) {
    console.error("Error in sync-leads export:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch leads" }, { status: 500 });
  }
}
