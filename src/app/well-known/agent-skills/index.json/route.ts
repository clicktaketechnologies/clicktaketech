import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Agent Skills Discovery Index v0.2.0.
 * Served at /.well-known/agent-skills/index.json as application/json.
 * Enumerates the SKILL.md documents ClickTake publishes so AI agents can
 * discover how to respect Content-Signal directives and how to register +
 * authenticate against the admin API.
 */
export async function GET() {
  const index = {
    $schema:
      "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "content-signals",
        type: "skill-md",
        description:
          "Declares site-wide preferences for AI training, search indexing, and AI input usage via Content-Signal directives in robots.txt",
        url: "https://clicktaketech.com/.well-known/agent-skills/content-signals/SKILL.md",
        digest: "sha256:placeholder",
      },
      {
        name: "auth-registration",
        type: "skill-md",
        description:
          "Explains how AI agents register and authenticate with the ClickTake admin API using OAuth 2.0 client credentials",
        url: "https://clicktaketech.com/.well-known/agent-skills/auth-registration/SKILL.md",
        digest: "sha256:placeholder2",
      },
    ],
  };

  return NextResponse.json(index, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
