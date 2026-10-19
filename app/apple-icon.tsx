import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#F3F0E8",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: 2,
          }}
        >
          ZN
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 30,
            background: "#FF9A03",
          }}
        />
      </div>
    ),
    size,
  );
}
