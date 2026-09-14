import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (tag) {
    revalidateTag(tag, { expire: 0 });
  }
  if (path) {
    revalidatePath(path);
  }

  // Default fallback
  if (!tag && !path) {
    revalidateTag("posts", { expire: 0 });
    revalidatePath("/blog");
    revalidatePath("/blog/how-to-rank-on-ai-search-engines-proven-strategies");
  }

  return NextResponse.json({
    revalidated: true,
    tag: tag || "posts",
    path: path || "/blog",
    now: Date.now(),
  });
}
