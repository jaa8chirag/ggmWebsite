import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getSettings } from "@/lib/queries";

export const alt = "GGM Technologies — New Delhi Digital Growth Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Image() {
  const settings = await getSettings();
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eef1f7",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={240} height={90} alt="" />
        <div
          style={{
            marginTop: 44,
            fontSize: 58,
            fontWeight: 700,
            color: "#0f1420",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Rank higher. Spend smarter. Grow faster.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#0370ba",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {settings.eyebrow}
        </div>
      </div>
    ),
    { ...size }
  );
}
