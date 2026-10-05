export const runtime = "nodejs";

/**
 * /auth.md — Agent Authentication Discovery document.
 * Served at /auth.md as text/markdown. The markdown MUST start with an H1
 * heading containing the literal "auth.md".
 *
 * This document is SELF-CONTAINED — it documents the complete agent
 * registration + authentication flow without relying on an external
 * skill URL. The agent_auth metadata is in YAML frontmatter.
 */
export async function GET() {
  const markdown = `---
agent_auth:
  register_uri: https://clicktaketech.com/api/agent/register
  methods:
    - method: oauth_client_credentials
      token_endpoint: https://clicktaketech.com/api/auth/token
      scopes:
        - admin:read
        - admin:write
        - public:read
      bearer_methods:
        - header
resource: https://clicktaketech.com
authorization_servers:
  - https://clicktaketech.com
scopes_supported:
  - admin:read
  - admin:write
  - public:read
bearer_methods_supported:
  - header
---

# auth.md

ClickTake Technologies — Agent Authentication Discovery

## Audience

This document is for AI agents that need to programmatically register and authenticate with the ClickTake Technologies admin API.

## Resource

- Resource identifier: https://clicktaketech.com
- Authorization servers: https://clicktaketech.com

## Registration

- **Register URI:** https://clicktaketech.com/api/agent/register
- **Supported method:** OAuth 2.0 client_credentials grant

## Complete registration flow

1. POST to https://clicktaketech.com/api/agent/register with a JSON body describing the agent (name, callback URL). Receive client_id and client_secret.
2. POST to https://clicktaketech.com/api/auth/token with grant_type=client_credentials, client_id, client_secret. Receive an access_token.
3. Use the access_token as \`Authorization: Bearer <token>\` on all admin API requests.

## Example

\`\`\`
# Step 1: Register
curl -X POST https://clicktaketech.com/api/agent/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"my-agent","callback":"https://example.com/callback"}'

# Step 2: Get token
curl -X POST https://clicktaketech.com/api/auth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=ID&client_secret=SECRET"

# Step 3: Use token
curl https://clicktaketech.com/api/admin/pages \\
  -H "Authorization: Bearer TOKEN"
\`\`\`

## Scopes

- admin:read — read access to admin resources
- admin:write — create/update/delete admin resources
- public:read — read access to public resources

## Supported identity types

- identity_assertion (ID-JAG)
- verified_email
- anonymous

## Metadata endpoints

- OAuth authorization server: https://clicktaketech.com/.well-known/oauth-authorization-server
- OAuth protected resource: https://clicktaketech.com/.well-known/oauth-protected-resource
- OIDC discovery: https://clicktaketech.com/.well-known/openid-configuration
- JWKS: https://clicktaketech.com/.well-known/http-message-signatures-directory
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
