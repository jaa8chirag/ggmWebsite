import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getServiceLocation } from "@/lib/queries";

export const alt = "GGM Technologies service in your city";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug, location } = await params;
  const sl = await getServiceLocation(slug, location);

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
            fontSize: 52,
            fontWeight: 700,
            color: "#0f1420",
            lineHeight: 1.2,
          }}
        >
          {sl ? `${sl.service.title} in ${sl.location.name}` : "GGM Technologies"}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#0370ba",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          GGM Technologies
        </div>
      </div>
    ),
    { ...size }
  );
}
