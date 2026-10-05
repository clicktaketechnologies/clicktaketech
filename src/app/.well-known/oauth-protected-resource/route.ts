import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * RFC 9728 OAuth 2.0 Protected Resource Metadata.
 * Served at /.well-known/oauth-protected-resource.
 * Tells AI agents which authorization server protects the ClickTake API,
 * which scopes are honored, and which bearer transport is expected.
 */
export async function GET() {
  const metadata = {
    resource: "https://clicktaketech.com",
    authorization_servers: ["https://clicktaketech.com"],
    scopes_supported: ["admin:read", "admin:write", "public:read"],
    bearer_methods_supported: ["header"],
    resource_documentation: "https://clicktaketech.com/api/docs",
    agent_auth: {
      register_uri: "https://clicktaketech.com/api/agent/register",
      methods: [
        {
          method: "oauth_client_credentials",
          token_endpoint: "https://clicktaketech.com/api/auth/token",
          scopes: ["admin:read", "admin:write", "public:read"],
          bearer_methods: ["header"],
        },
      ],
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
