import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
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

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const ext = path.extname(originalName) || ".jpg";
    const base = path.basename(originalName, ext);
    const uniqueFilename = `${base}_${Date.now()}${ext}`;

    // 1. Priority: Vercel Blob Cloud CDN (Permanent, Edge-cached)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobPath = `${folder}/${uniqueFilename}`;
        const blob = await put(blobPath, file, {
          access: "public",
        });

        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: uniqueFilename,
          size: file.size,
        });
      } catch (blobError: any) {
        console.error("Vercel Blob upload failed, trying local fallback:", blobError);
      }
    }

    // 2. Local Environment: Write to public/uploads directory
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

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
      // If filesystem is read-only (e.g. Vercel before token is connected), notify admin to connect Blob
      console.error("Local filesystem write failed (Read-only filesystem detected):", fsError);
      return NextResponse.json(
        {
          error:
            "Vercel Serverless environment requires Vercel Blob. Please connect a Blob store in your Vercel Dashboard under the Storage tab.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
