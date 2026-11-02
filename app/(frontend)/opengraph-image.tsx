import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Grand River Labs — Digital marketing leadership. Without the full-time hire.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const [fraunces, brandMark] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/brand-mark.png")),
  ]);
  const brandMarkSrc = `data:image/png;base64,${brandMark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #f8fcfb 0%, #d8f2f4 100%)",
          color: "#075752",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={brandMarkSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 40, color: "#102f2f" }}>Grand River Labs</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          <div>Digital marketing leadership.</div>
          <div>Without the full-time hire.</div>
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 8,
            borderRadius: 4,
            background: "#057a72",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    },
  );
}
