import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * OpenID Connect Discovery 1.0 metadata.
 * Served at /.well-known/openid-configuration.
 * Declares the OIDC issuer, authorization/token endpoints, JWKS URI,
 * supported grant types, response types, subject types, and signing algos.
 */
export async function GET() {
  const metadata = {
    issuer: "https://clicktaketech.com",
    authorization_endpoint: "https://clicktaketech.com/api/auth/authorize",
    token_endpoint: "https://clicktaketech.com/api/auth/token",
    jwks_uri: "https://clicktaketech.com/.well-known/http-message-signatures-directory",
    grant_types_supported: ["client_credentials", "authorization_code"],
    response_types_supported: ["code", "token id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
  };

  return NextResponse.json(metadata, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
