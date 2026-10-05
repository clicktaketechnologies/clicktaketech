"use client";

import { useEffect } from "react";

/**
 * WebMCP (Web Machine Context Protocol) client component.
 *
 * Exposes site tools to AI agents running in the browser via
 * navigator.modelContext.registerTool(). This is the browser-side
 * equivalent of MCP — it lets on-device AI models (like Chrome's
 * built-in AI) discover and call your site's key actions without
 * a server-side MCP endpoint.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 * Chrome blog: https://developer.chrome.com/blog/webmcp-epp
 *
 * The API is detected by loading the page in a browser — the script
 * runs on page load and registers tools. If the browser doesn't support
 * WebMCP yet, this is a no-op.
 *
 * Tools exposed:
 *   - search-services — search across ClickTake's 24 services
 *   - get-pricing — get pricing details for a tier
 *   - list-jobs — list open job positions
 *   - navigate — navigate to a site section
 */

// Minimal type for the WebMCP API (not yet in TS lib).
type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>, signal?: AbortSignal) => Promise<Record<string, unknown>>;
};

type WebMCPNavigator = Navigator & {
  modelContext?: {
    registerTool: (tool: WebMCPTool, signal?: AbortSignal) => Promise<void> | void;
  };
};

export function WebMCPTools() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = navigator as WebMCPNavigator;
    if (!nav.modelContext?.registerTool) return; // browser doesn't support WebMCP

    const controller = new AbortController();
    const { signal } = controller;

    const register = async () => {
      try {
        await nav.modelContext!.registerTool({
          name: "search-services",
          description: "Search across ClickTake Technologies' 24 services (software, AI, digital marketing) by keyword. Returns matching service names, slugs, and descriptions.",
          inputSchema: {
            type: "object" as const,
            properties: {
              query: {
                type: "string",
                description: "Search query — a service name, keyword, or business need (e.g. 'web design', 'AI chatbot', 'SEO')",
              },
            },
            required: ["query"],
          },
          execute: async (input) => {
            const q = String(input.query || "").toLowerCase();
            // Fetch services from the public API
            try {
              const res = await fetch("/api/services");
              const data = await res.json().catch(() => ({}));
              const services = (data.services || []).filter((s: { title: string; desc: string }) =>
                s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
              ).slice(0, 10);
              return { ok: true, count: services.length, services };
            } catch {
              return { ok: false, error: "Could not reach the services API" };
            }
          },
        }, signal);

        await nav.modelContext!.registerTool({
          name: "get-pricing",
          description: "Get transparent pricing details for ClickTake Technologies' service tiers (Starter, Growth, Scale, Custom).",
          inputSchema: {
            type: "object" as const,
            properties: {
              tier: {
                type: "string",
                description: "Optional tier name to filter (e.g. 'Starter', 'Growth', 'Scale', 'Custom'). Omit to list all.",
              },
            },
          },
          execute: async (input) => {
            try {
              const res = await fetch("/api/pricing");
              const data = await res.json().catch(() => ({}));
              let tiers = data.tiers || [];
              if (input.tier) {
                tiers = tiers.filter((t: { name: string }) =>
                  t.name.toLowerCase().includes(String(input.tier).toLowerCase())
                );
              }
              return { ok: true, count: tiers.length, tiers };
            } catch {
              return { ok: false, error: "Could not reach the pricing API" };
            }
          },
        }, signal)

        await nav.modelContext!.registerTool({
          name: "list-jobs",
          description: "List open job positions at ClickTake Technologies across 4 offices (Birmingham, London, Dubai, Multan).",
          inputSchema: {
            type: "object" as const,
            properties: {
              department: {
                type: "string",
                description: "Optional department filter (e.g. 'Web & Software', 'AI & Automation', 'Digital Marketing', 'Creative & Brand')",
              },
            },
          },
          execute: async (input) => {
            try {
              const res = await fetch("/api/jobs");
              const data = await res.json().catch(() => ({}));
              let jobs = data.jobs || [];
              if (input.department) {
                jobs = jobs.filter((j: { department: string }) =>
                  j.department.toLowerCase().includes(String(input.department).toLowerCase())
                );
              }
              return { ok: true, count: jobs.length, jobs };
            } catch {
              return { ok: false, error: "Could not reach the jobs API" };
            }
          },
        }, signal)

        await nav.modelContext!.registerTool({
          name: "navigate",
          description: "Navigate the ClickTake site to a section (services, pricing, about, team, careers, contact, blog, portfolio).",
          inputSchema: {
            type: "object" as const,
            properties: {
              section: {
                type: "string",
                description: "Section to navigate to: services, pricing, about, team, careers, contact, blog, portfolio, case-studies",
              },
            },
            required: ["section"],
          },
          execute: async (input) => {
            const section = String(input.section || "").toLowerCase();
            const valid = ["services", "pricing", "about", "team", "careers", "contact", "blog", "portfolio", "case-studies"];
            if (!valid.includes(section)) {
              return { ok: false, error: `Invalid section. Valid: ${valid.join(", ")}` };
            }
            window.location.hash = "";
            window.location.pathname = `/${section === "home" ? "" : section}`;
            return { ok: true, navigatedTo: section };
          },
        }, signal)
      } catch {
        // Registration failed (browser may not fully support WebMCP) — no-op
      }
    };

    register();

    return () => {
      controller.abort(); // unregister all tools on unmount
    };
  }, []);

  // This component renders nothing — it's purely a side-effect for WebMCP
  return null;
}
