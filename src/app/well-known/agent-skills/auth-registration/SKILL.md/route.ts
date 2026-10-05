export const runtime = "nodejs";

/**
 * auth.md Agent Registration SKILL.md.
 * Served at /.well-known/agent-skills/auth-registration/SKILL.md as
 * text/markdown. Documents how AI agents register and authenticate with the
 * ClickTake admin API via OAuth 2.0 client credentials.
 */
export async function GET() {
  const markdown = `# auth.md Agent Registration Skill

## Description
AI agents can register and authenticate with the ClickTake admin API using OAuth 2.0 client credentials.

## Registration
- Register URI: https://clicktaketech.com/api/agent/register
- Methods: OAuth 2.0 client_credentials grant

## Authentication
1. Register at the register_uri endpoint to obtain client credentials
2. Request an access token from the token_endpoint using client_credentials grant
3. Include the bearer token in the Authorization header on all admin API requests
4. Supported scopes: admin:read, admin:write, public:read

## Endpoints
- Authorization server metadata: https://clicktaketech.com/.well-known/oauth-authorization-server
- Protected resource metadata: https://clicktaketech.com/.well-known/oauth-protected-resource
- JWKS: https://clicktaketech.com/.well-known/http-message-signatures-directory
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
