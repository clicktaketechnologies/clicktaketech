import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: [
    "*.chatglm.cn",
    "*.space-z.ai",
    "*.z.ai",
    "preview-*.space-z.ai",
  ],
  // Link headers on the homepage for AI agent discovery (RFC 8288, RFC 9727).
  // These are static (same for every homepage request) so they go here
  // instead of middleware — middleware headers get stripped by Vercel's
  // edge cache for prerendered pages.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; connect-src 'self' https://api.cloudinary.com https://api.ahrefs.com wss:; frame-src 'self' https://*.vercel.app; object-src 'none'; base-uri 'self'" },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              `</.well-known/api-catalog>; rel="api-catalog"`,
              `</.well-known/oauth-protected-resource>; rel="describedby"`,
              `</api/openapi.json>; rel="service-desc"; type="application/json"`,
              `</api/docs>; rel="service-doc"; type="text/html"`,
              `</.well-known/agent-card.json>; rel="describedby"; type="application/json"`,
              `</.well-known/oauth-authorization-server>; rel="service-doc"`,
              `</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
              `</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
            ].join(", "),
          },
          {
            key: "Content-Signal",
            value: "ai-train=no, search=yes, ai-input=yes",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
