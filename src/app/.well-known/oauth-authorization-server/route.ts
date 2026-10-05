import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * RFC 8414 OAuth 2.0 Authorization Server Metadata.
 * Served at /.well-known/oauth-authorization-server.
 * Declares the authorization endpoints, token endpoint, JWKS URI, dynamic
 * client registration endpoint, supported grant types, and agent-specific
 * auth hints (skill + register_uri) for AI agents.
 */
export async function GET() {
  const metadata = {
    issuer: "https://clicktaketech.com",
    authorization_endpoint: "https://clicktaketech.com/api/auth/authorize",
    token_endpoint: "https://clicktaketech.com/api/auth/token",
    jwks_uri: "https://clicktaketech.com/.well-known/http-message-signatures-directory",
    registration_endpoint: "https://clicktaketech.com/api/agent/register",
    grant_types_supported: ["client_credentials", "authorization_code"],
    response_types_supported: ["code", "token"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
    ],
    revocation_endpoint: "https://clicktaketech.com/api/auth/revoke",
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
