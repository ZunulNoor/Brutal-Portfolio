import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3F0E8",
          color: "#111111",
          padding: 72,
          border: "16px solid #111111",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: 4,
            color: "#777777",
          }}
        >
          <span>FRONTEND ENGINEER / FULL-STACK</span>
          <span>KARACHI, PK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1 }}>
            ZUN UL NOOR
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              fontSize: 44,
            }}
          >
            <span
              style={{
                background: "#FF9A03",
                padding: "8px 24px",
                border: "4px solid #111111",
                fontWeight: 800,
              }}
            >
              I BUILD DIGITAL SYSTEMS
            </span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#777777" }}>
          React · Next.js · SaaS dashboards · APIs · WordPress · Python
        </div>
      </div>
    ),
    size,
  );
}
