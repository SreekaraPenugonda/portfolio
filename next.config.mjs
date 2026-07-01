import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow all local images (no external hostnames needed for this project)
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
        {
          // Content-Security-Policy: allows self + Next.js HMR in dev,
          // Framer Motion inline styles, and Google Fonts.
          // 'unsafe-eval' is only needed for development (Next.js HMR).
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // Scripts: self + inline scripts for theme detection
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            // Styles: self + inline styles (Tailwind + Framer Motion)
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Fonts: Google Fonts
            "font-src 'self' https://fonts.gstatic.com",
            // Images: self + data URIs
            "img-src 'self' data: blob:",
            // Connect: self + external APIs
            "connect-src 'self' https://api.github.com https://alfa-leetcode-api.onrender.com",
            // Frames: none
            "frame-src 'none'",
            // Objects: none
            "object-src 'none'",
            // Base URI: self
            "base-uri 'self'",
            // Form action: self
            "form-action 'self'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
