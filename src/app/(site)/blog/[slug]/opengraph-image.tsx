import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug } from "@/lib/queries";

export const alt = "GGM Technologies blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const logoData = await readFile(
    join(process.cwd(), "public/logo/ggm-mark.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#eef1f7",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={160} height={60} alt="" />
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: "#0f1420",
            lineHeight: 1.2,
          }}
        >
          {post?.title ?? "GGM Technologies"}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#0370ba",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {post ? `${post.category} · GGM Technologies` : "GGM Technologies"}
        </div>
      </div>
    ),
    { ...size }
  );
}
