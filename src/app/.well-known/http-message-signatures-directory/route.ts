import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Web Bot Auth JWKS (HTTP Message Signatures key directory).
 * Served at /.well-known/http-message-signatures-directory as
 * application/jwk-set+json. Publishes the Ed25519 public key used to verify
 * signed messages from the ClickTake bot.
 *
 * The \`x\` field below is a real 32-byte Ed25519 public key, base64url-encoded
 * (no padding). The corresponding private key is held off-repo and rotated on
 * a multi-year cadence (kid encodes the year + month of issuance).
 */
export async function GET() {
  const jwks = {
    keys: [
      {
        kty: "OKP",
        crv: "Ed25519",
        kid: "clicktake-bot-2026-01",
        use: "sig",
        alg: "EdDSA",
        x: "WEgse5GckwjNexZdNyPcsSlIdat2hvEetPcxlnD81RQ",
      },
    ],
  };

  return NextResponse.json(jwks, {
    headers: {
      "Content-Type": "application/jwk-set+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
