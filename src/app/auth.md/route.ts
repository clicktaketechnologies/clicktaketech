export const runtime = "nodejs";

/**
 * /auth.md — Agent Authentication Discovery document.
 * Served at /auth.md as text/markdown. The markdown MUST start with an H1
 * heading containing the literal "auth.md". Points AI agents at the
 * OAuth/OIDC metadata endpoints and explains credential use + scopes.
 * Includes an `agent_auth` block (YAML) per the Auth.md spec so scanners
 * can detect agent registration support.
 */
export async function GET() {
  const markdown = `# auth.md

ClickTake Technologies — Agent Authentication Discovery

## Resource
- Resource identifier: https://clicktaketech.com
- Authorization servers: https://clicktaketech.com

## Supported identity types
- identity_assertion (ID-JAG)
- verified_email
- anonymous

## Registration
- Register URI: https://clicktaketech.com/api/agent/register
- Supported methods: oauth_client_credentials

## Credential use
Agents obtain credentials by registering at the register_uri endpoint. The token endpoint accepts client_credentials grant and returns bearer tokens. Include the token as \`Authorization: Bearer <token>\` on all admin API requests.

## Scopes
- admin:read — read access to admin resources
- admin:write — create/update/delete admin resources
- public:read — read access to public resources

## Metadata endpoints
- OAuth authorization server: https://clicktaketech.com/.well-known/oauth-authorization-server
- OAuth protected resource: https://clicktaketech.com/.well-known/oauth-protected-resource
- OIDC discovery: https://clicktaketech.com/.well-known/openid-configuration
- JWKS: https://clicktaketech.com/.well-known/http-message-signatures-directory

## agent_auth

\`\`\`yaml
agent_auth:
  skill: https://clicktaketech.com/.well-known/agent-skills/auth-registration/SKILL.md
  register_uri: https://clicktaketech.com/api/agent/register
  methods:
    - method: oauth_client_credentials
      authorization_server: https://clicktaketech.com/.well-known/oauth-authorization-server
      token_endpoint: https://clicktaketech.com/api/auth/token
      scopes:
        - admin:read
        - admin:write
        - public:read
      bearer_methods:
        - header
\`\`\`
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
