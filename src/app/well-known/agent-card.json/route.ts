import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * A2A (Agent-to-Agent) Agent Card.
 * Served at /.well-known/agent-card.json as application/json.
 * Declares the ClickTake Assistant agent — a JSON-RPC service over HTTP
 * that helps visitors pick from 24 services, look up pricing, book scoping
 * calls, browse the portfolio, and view open roles.
 */
export async function GET() {
  const card = {
    name: "ClickTake Assistant",
    version: "1.0.0",
    description:
      "AI assistant for ClickTake Technologies — helps find the right service, get pricing, and book a free scoping call across 24 software, AI, and digital marketing services.",
    supportedInterfaces: {
      service: {
        url: "https://clicktaketech.com/api/a2a",
        transport: "jsonrpc",
      },
    },
    capabilities: {
      streaming: false,
      pushNotifications: false,
    },
    skills: [
      {
        id: "service-finder",
        name: "Service Finder",
        description:
          "Find the best ClickTake service for a specific business need",
      },
      {
        id: "pricing",
        name: "Pricing Lookup",
        description: "Get transparent pricing for ClickTake's 4 pricing tiers",
      },
      {
        id: "project-scoping",
        name: "Project Scoping",
        description: "Book a free 30-minute scoping call with a senior engineer",
      },
      {
        id: "portfolio",
        name: "Portfolio",
        description: "Browse 12+ live client projects",
      },
      {
        id: "careers",
        name: "Careers",
        description: "View 5 open positions across 4 offices",
      },
    ],
  };

  return NextResponse.json(card, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
