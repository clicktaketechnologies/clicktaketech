import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * OpenAPI 3.0 specification.
 * Served at /api/openapi.json as application/json. Declares the public +
 * admin API surface for ClickTake Technologies. Admin routes require a
 * bearer JWT obtained via the OAuth client_credentials grant.
 */
export async function GET() {
  const spec = {
    openapi: "3.0.3",
    info: {
      title: "ClickTake API",
      version: "1.0.0",
      description: "Public + admin API for ClickTake Technologies",
    },
    servers: [{ url: "https://clicktaketech.com" }],
    paths: {
      "/api/clients": {
        get: { summary: "List client logos", tags: ["public"] },
      },
      "/api/team": {
        get: { summary: "List team members", tags: ["public"] },
      },
      "/api/jobs": {
        get: { summary: "List open jobs", tags: ["public"] },
      },
      "/api/contact": {
        post: { summary: "Submit a contact form", tags: ["public"] },
      },
      "/api/admin/pages": {
        get: {
          summary: "List pages",
          tags: ["admin"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/api/admin/blog": {
        get: {
          summary: "List blog posts",
          tags: ["admin"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/api/admin/pricing": {
        get: {
          summary: "List pricing tiers",
          tags: ["admin"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/api/health": {
        get: { summary: "Health check", tags: ["system"] },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };

  return NextResponse.json(spec, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
