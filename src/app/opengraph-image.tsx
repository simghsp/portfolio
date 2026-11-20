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
          backgroundColor: "#050914",
          backgroundImage:
            "radial-gradient(600px 320px at 15% 0%, rgba(59,130,255,0.22), transparent 70%)",
          color: "#eef2fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#3b82ff",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 24, height: 2, background: "#3b82ff" }} />
          Junior Software Developer → Security Engineering
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 28, lineHeight: 1.15 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 30, color: "#94a0bd", marginTop: 20, maxWidth: 900 }}>
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
                border: "1px solid #26355c",
                color: "#94a0bd",
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
