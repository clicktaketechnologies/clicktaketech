import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ClickTake Technologies — AI-Native Software Engineering",
    short_name: "ClickTake",
    description:
      "AI-native software engineering firm shipping production-grade autonomous agents, multi-tenant SaaS platforms, cloud architecture, digital marketing & creative services across 4 continents.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e1a",
    theme_color: "#136DFF",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo-dark.png", sizes: "192x192", type: "image/png" },
      { src: "/logo-dark.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["business", "developer", "productivity", "technology"],
  };
}
