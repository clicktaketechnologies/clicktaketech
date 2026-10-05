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
            value: "ai-train=no, search=yes, ai-input=no",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
