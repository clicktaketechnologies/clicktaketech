import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * MCP (Model Context Protocol) Server Card — SEP-1649.
 * Served at /.well-known/mcp/server-card.json as application/json.
 * Declares the ClickTake MCP server endpoint at /mcp, its capabilities
 * (tools, resources, prompts), and the tool catalogue surfaced to MCP
 * clients.
 */
export async function GET() {
  const card = {
    serverInfo: {
      name: "ClickTake MCP Server",
      version: "1.0.0",
    },
    endpoint: "https://clicktaketech.com/mcp",
    capabilities: {
      tools: true,
      resources: true,
      prompts: true,
    },
    tools: [
      {
        name: "search-services",
        description:
          "Search across ClickTake's 24 services by keyword or category",
      },
      {
        name: "get-pricing",
        description: "Get pricing details for a specific pricing tier",
      },
      {
        name: "book-call",
        description: "Book a free 30-minute scoping call",
      },
      {
        name: "list-jobs",
        description: "List open job positions",
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
