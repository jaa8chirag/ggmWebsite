import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "work";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try writing to local filesystem (works on local environment)
    try {
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const ext = path.extname(originalName) || ".jpg";
      const base = path.basename(originalName, ext);
      const uniqueFilename = `${base}_${Date.now()}${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, uniqueFilename);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${folder}/${uniqueFilename}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        size: file.size,
      });
    } catch (fsError: any) {
      console.warn("Read-only filesystem detected on Vercel Serverless. Fallback to Data URI Base64:", fsError);

      // 2. Fallback for Vercel Serverless (Read-only filesystem /var/task):
      // Convert image to clean Base64 Data URI string
      const mimeType = file.type || "image/jpeg";
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        filename: file.name,
        size: file.size,
      });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
