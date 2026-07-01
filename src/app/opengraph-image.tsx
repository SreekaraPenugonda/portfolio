import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sreekara Penugonda — Software Engineer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(161,161,170,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <p
          style={{
            fontSize: 20,
            color: "#a1a1aa",
            marginBottom: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </p>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          SREEKARA PENUGONDA
        </h1>

        <p
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginBottom: 40,
            maxWidth: 700,
          }}
        >
          Software Engineer &amp; Builder · Full-Stack Developer
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {["TypeScript", "Next.js", "AWS", "Python", "React"].map((tech) => (
            <span
              key={tech}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 16,
                color: "#d4d4d8",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <p
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 18,
            color: "#71717a",
          }}
        >
          sreekara.dev
        </p>
      </div>
    ),
    { ...size }
  );
}
