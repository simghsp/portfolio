import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#06080d",
          backgroundImage:
            "radial-gradient(600px 320px at 15% 0%, rgba(77,214,224,0.25), transparent 70%)",
          color: "#e8ecf4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#4dd6e0",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 24, height: 2, background: "#4dd6e0" }} />
          Full-Stack → Security Engineering
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 28, lineHeight: 1.15 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 30, color: "#8b93a7", marginTop: 20, maxWidth: 900 }}>
          Full-Stack Developer building toward Security Engineering
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 44 }}>
          {["TypeScript", "Node.js", "PostgreSQL", "JWT / RBAC", "API Security"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 20,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid #2a3348",
                color: "#8b93a7",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
