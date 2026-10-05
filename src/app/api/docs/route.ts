export const runtime = "nodejs";

/**
 * Simple human-readable API documentation page.
 * Served at /api/docs as text/html. Lists the public + admin endpoints
 * declared in /api/openapi.json so engineers and AI agents can browse them
 * without rendering the full OpenAPI spec.
 */
export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ClickTake API Docs</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #0f172a; }
      h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
      p.lede { color: #475569; margin-top: 0; }
      ul { list-style: disc; padding-left: 1.25rem; }
      li { margin: 0.25rem 0; }
      code { background: #f1f5f9; padding: 0.1rem 0.35rem; border-radius: 0.25rem; font-size: 0.9em; }
      a { color: #2563eb; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .tag { display: inline-block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.1rem 0.4rem; border-radius: 999px; margin-left: 0.4rem; vertical-align: middle; }
      .public { background: #dcfce7; color: #166534; }
      .admin { background: #fee2e2; color: #991b1b; }
      .system { background: #e0e7ff; color: #3730a3; }
      .meta { margin-top: 2rem; font-size: 0.85rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
    </style>
  </head>
  <body>
    <h1>ClickTake API</h1>
    <p class="lede">Public and admin endpoints for ClickTake Technologies. Admin routes require a bearer JWT issued via the OAuth client_credentials grant.</p>
    <h2>Endpoints</h2>
    <ul>
      <li><code>GET /api/clients</code> — List client logos <span class="tag public">public</span></li>
      <li><code>GET /api/team</code> — List team members <span class="tag public">public</span></li>
      <li><code>GET /api/jobs</code> — List open jobs <span class="tag public">public</span></li>
      <li><code>POST /api/contact</code> — Submit a contact form <span class="tag public">public</span></li>
      <li><code>GET /api/admin/pages</code> — List pages <span class="tag admin">admin</span></li>
      <li><code>GET /api/admin/blog</code> — List blog posts <span class="tag admin">admin</span></li>
      <li><code>GET /api/admin/pricing</code> — List pricing tiers <span class="tag admin">admin</span></li>
      <li><code>GET /api/health</code> — Health check <span class="tag system">system</span></li>
    </ul>
    <h2>Machine-readable specs</h2>
    <ul>
      <li><a href="/api/openapi.json">OpenAPI 3.0 spec</a> (<code>application/json</code>)</li>
      <li><a href="/.well-known/api-catalog">RFC 9727 API Catalog</a> (<code>application/linkset+json</code>)</li>
      <li><a href="/.well-known/oauth-authorization-server">OAuth Authorization Server metadata</a></li>
      <li><a href="/.well-known/oauth-protected-resource">OAuth Protected Resource metadata</a></li>
      <li><a href="/.well-known/openid-configuration">OIDC Discovery</a></li>
      <li><a href="/.well-known/agent-card.json">A2A Agent Card</a></li>
      <li><a href="/.well-known/mcp/server-card.json">MCP Server Card</a></li>
      <li><a href="/auth.md">auth.md</a> — Agent Authentication Discovery</li>
    </ul>
    <p class="meta">ClickTake Technologies &middot; <a href="https://clicktaketech.com">clicktaketech.com</a></p>
  </body>
</html>
`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
