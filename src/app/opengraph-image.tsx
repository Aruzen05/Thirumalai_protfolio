import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/profile";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.roles.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const [first] = site.name.split(" ");
  const photo = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "src/assets/og-photo.jpg")).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#0f1115" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 56px 64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#5b3fe0", fontWeight: 700, letterSpacing: "4px" }}>
            SOFTWARE · SECURITY · AI
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.05 }}>
              Hi, I&apos;m&nbsp;<span style={{ color: "#5b3fe0" }}>{first}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 32, color: "#3b4150", lineHeight: 1.35 }}>
              {site.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6b7183" }}>
            MSc Cybersecurity · IEEE published ·&nbsp;<span style={{ color: "#5b3fe0" }}>{new URL(site.url).hostname}</span>
          </div>
        </div>
        <div style={{ display: "flex", width: 430, height: "100%", background: "#efebfe", padding: 28 }}>
          <img src={photo} width={374} height={574} style={{ objectFit: "cover", borderRadius: 24 }} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
