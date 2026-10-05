export const runtime = "nodejs";

/**
 * Content Signals SKILL.md.
 * Served at /.well-known/agent-skills/content-signals/SKILL.md as
 * text/markdown. Documents how ClickTake publishes Content-Signal directives
 * in robots.txt so AI agents can respect training / indexing / RAG
 * preferences.
 */
export async function GET() {
  const markdown = `# Content Signals Skill

## Description
ClickTake Technologies publishes Content-Signal directives in robots.txt to declare preferences for how AI agents may use the site's content.

## Signals
- \`ai-train=no\` — content may NOT be used for AI model training
- \`search=yes\` — search engine indexing is allowed
- \`ai-input=no\` — content may NOT be used as AI input (retrieval-augmented generation)

## Location
The Content-Signal header is published at:
https://clicktaketech.com/robots.txt

## Usage
Agents SHOULD respect these signals when crawling or consuming content from clicktaketech.com.
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
