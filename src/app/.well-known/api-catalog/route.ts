import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * RFC 9727 API Catalog.
 * Served at /.well-known/api-catalog as application/linkset+json.
 * Declares the location of the OpenAPI service description, the human-readable
 * docs page, and the health/status endpoint for the ClickTake API.
 */
export async function GET() {
  const linkset = {
    linkset: [
      {
        anchor: "https://clicktaketech.com",
        "service-desc": [
          {
            href: "https://clicktaketech.com/api/openapi.json",
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: "https://clicktaketech.com/api/docs",
            type: "text/html",
          },
        ],
        status: [
          {
            href: "https://clicktaketech.com/api/health",
          },
        ],
      },
    ],
  };

  return NextResponse.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
