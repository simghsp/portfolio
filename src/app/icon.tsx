import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050914",
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#3b82ff", fontSize: 20, fontWeight: 700 }}>S</span>
      </div>
    ),
    { ...size }
  );
}
