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
};

export default nextConfig;
