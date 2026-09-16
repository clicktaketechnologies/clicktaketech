#!/usr/bin/env python3
"""
Insert service-specific `atAGlance` arrays into /home/z/my-project/src/lib/service-content.ts.

For each of the 24 service slugs, we locate the entry by its `slug: "<slug>",` line,
then find the FIRST occurrence of the pattern:

    ],
  },

AFTER that slug line (which is the close of the `eatSignals` array + close of the
entry object) and insert the atAGlance array between them so the result becomes:

    eatSignals: [
      ...
    ],
    atAGlance: [
      { label: "...", value: "..." },
      { label: "...", value: "..." },
      { label: "...", value: "..." },
      { label: "...", value: "..." },
    ],
  },
"""
from pathlib import Path
import sys

SERVICE_FILE = Path("/home/z/my-project/src/lib/service-content.ts")

# slug -> list of (label, value) tuples (exactly 4 per service, hand-tailored)
AT_A_GLANCE = {
    "ppc-paid-ads": [
        ("Platforms", "Google · Meta · LinkedIn · TikTok"),
        ("Min. ad spend", "£5k/mo Google · £3k/mo Meta"),
        ("Pricing model", "Fixed monthly retainer"),
        ("First results", "~30 days to meaningful CPA"),
    ],
    "content-strategy-seo": [
        ("Pillar strategy", "Topic clusters + hub pages"),
        ("Editorial cadence", "4–8 articles/mo"),
        ("Writer pool", "UK-native SME specialists"),
        ("Briefing depth", "SERP-led outlines"),
    ],
    "conversion-rate-optimization": [
        ("Test framework", "A/B + multivariate"),
        ("Min. sessions", "5k/mo per variant"),
        ("Testing cadence", "2–4 live tests/mo"),
        ("Lift benchmark", "+15% CVR in 90 days"),
    ],
    "seo-services": [
        ("SEO scope", "Technical · On-page · Off-page"),
        ("Local pack target", "Top 3 in your area"),
        ("Core Web Vitals", "90+ Lighthouse baseline"),
        ("Reporting cadence", "Monthly + live dashboard"),
    ],
    "social-media-marketing": [
        ("Channels", "Instagram · LinkedIn · TikTok · X"),
        ("Content mix", "Reels · carousels · text"),
        ("Posting cadence", "3–5 posts/week"),
        ("Reporting", "Reach · saves · DMs"),
    ],
    "seo-web-design-services": [
        ("Build approach", "Index-first architecture"),
        ("Page speed", "Lighthouse 90+"),
        ("Schema markup", "Product · FAQ · LocalBusiness"),
        ("Migration safety", "301-mapped, zero traffic loss"),
    ],
    "full-stack-web-development": [
        ("Stack", "Next.js · Node · Postgres"),
        ("Delivery", "2-week sprints · demos"),
        ("Code ownership", "GitHub repo, full access"),
        ("Time to MVP", "~6–10 weeks"),
    ],
    "saas-platform-engineering": [
        ("Architecture", "Multi-tenant · API-first"),
        ("Scaling target", "10M+ req/day"),
        ("Infra", "AWS · GCP · Vercel"),
        ("CI/CD", "Trunk-based · auto-deploy"),
    ],
    "auth-identity": [
        ("Protocols", "OAuth 2.0 · OIDC · SAML"),
        ("MFA", "TOTP · WebAuthn · SMS"),
        ("Directory sync", "SCIM to Okta · Entra"),
        ("Compliance", "SOC 2 · GDPR ready"),
    ],
    "python-backend-apis": [
        ("Framework", "FastAPI · Django · Flask"),
        ("API style", "REST · GraphQL · gRPC"),
        ("Async", "ASGI + asyncio-native"),
        ("Throughput", "120ms p99 at scale"),
    ],
    "wordpress-web-design-services": [
        ("Build type", "Custom + headless options"),
        ("Page builder", "ACF blocks (no bloat)"),
        ("Performance", "Lighthouse 90+"),
        ("CMS", "WordPress + WooCommerce"),
    ],
    "ecommerce-web-design-services": [
        ("Platforms", "Shopify · WooCommerce · BigCommerce"),
        ("Conversion focus", "PDP · cart · checkout CRO"),
        ("Payments", "Stripe · PayPal · Klarna"),
        ("Catalog size", "Up to 50k SKUs"),
    ],
    "custom-llm-solutions": [
        ("Models", "OpenAI · Anthropic · Llama · Mistral"),
        ("Retrieval", "RAG over 18M+ docs"),
        ("Hosting", "Private VPC · on-prem option"),
        ("Eval suite", "Golden + adversarial sets"),
    ],
    "ai-chatbots-assistants": [
        ("Channels", "Site · WhatsApp · Slack"),
        ("Capabilities", "Tool-use · Memory · Handoff"),
        ("Models", "OpenAI · Anthropic · custom"),
        ("Time to live", "~4 weeks to production"),
    ],
    "prompt-engineering": [
        ("Target models", "GPT · Claude · Gemini · Llama"),
        ("Techniques", "Few-shot · CoT · ReAct"),
        ("Testing", "Regression + A/B prompts"),
        ("Output", "Versioned prompt library"),
    ],
    "computer-vision-nlp": [
        ("CV tasks", "Detection · OCR · segmentation"),
        ("NLP tasks", "NER · sentiment · classification"),
        ("Frameworks", "PyTorch · ONNX · OpenCV"),
        ("Edge deploy", "Jetson · mobile · browser"),
    ],
    "ai-automation": [
        ("Tools", "n8n · Zapier · Make + custom"),
        ("Integrations", "HubSpot · Slack · Xero"),
        ("Trigger types", "Webhook · cron · event-driven"),
        ("Savings", "10–40 hrs/mo reclaimed"),
    ],
    "ai-agent-development": [
        ("Patterns", "Planner · ReAct · multi-agent"),
        ("Tool calls", "Schema-validated · sandboxed"),
        ("Human-in-loop", "Approve high-risk actions"),
        ("Observability", "Traces · replays · cost logs"),
    ],
    "graphic-design": [
        ("Assets", "Logo · brand · social · print"),
        ("Source files", "Figma · AI · PDF"),
        ("Revisions", "Unlimited within scope"),
        ("Turnaround", "3–5 days per asset"),
    ],
    "professional-web-design-services": [
        ("Aesthetic", "Conversion-led · brand-true"),
        ("Design tool", "Figma to developer handoff"),
        ("Iterations", "2 concept rounds included"),
        ("Output", "Pixel-perfect, dev-ready"),
    ],
    "b2b-video-production": [
        ("Deliverables", "Brand film · case study · ads"),
        ("Shoot format", "4K · multi-cam · drone"),
        ("Variants", "16:9 · 9:16 · 1:1 cuts"),
        ("Turnaround", "~3 weeks per film"),
    ],
    "web-design-services": [
        ("Approach", "Discovery-led · mobile-first"),
        ("Tech", "Next.js · Tailwind · CMS"),
        ("Pages", "5–15 typical scope"),
        ("Launch", "~6 weeks to live"),
    ],
    "small-business-web-design-services": [
        ("Built for", "SMEs · trades · local services"),
        ("Package", "3–5 pages + lead capture"),
        ("Budget range", "From £2.5k fixed"),
        ("Time to live", "~2 weeks"),
    ],
    "responsive-web-design-services": [
        ("Breakpoints", "360 · 768 · 1024 · 1440+"),
        ("Testing", "Real device lab + BrowserStack"),
        ("Frameworks", "Tailwind · CSS Grid · Container queries"),
        ("Audit", "Lighthouse 90+ on mobile"),
    ],
}

assert len(AT_A_GLANCE) == 24, f"expected 24 slugs, got {len(AT_A_GLANCE)}"
for slug, facts in AT_A_GLANCE.items():
    assert len(facts) == 4, f"{slug} must have exactly 4 facts, got {len(facts)}"


def fmt_block(slug: str, facts):
    lines = [f"    atAGlance: ["]
    for label, value in facts:
        lines.append(f'      {{ label: "{label}", value: "{value}" }},')
    lines.append("    ],")
    return "\n".join(lines)


def main():
    src = SERVICE_FILE.read_text()
    out_parts = []
    edits_applied = 0
    cursor = 0
    # Build a list of (slug, slug_line_pos) for each entry.
    # We anchor on the unique line `    slug: "<slug>",` (4-space indent inside the entry body).
    for slug, facts in AT_A_GLANCE.items():
        anchor = f'    slug: "{slug}",'
        idx = src.find(anchor, cursor)
        if idx == -1:
            # Allow first-occurrence fallback (shouldn't be needed since entries are in order).
            idx = src.find(anchor)
        if idx == -1:
            raise SystemExit(f"ERROR: could not locate slug anchor for {slug!r}")
        # Find the next occurrence of `    ],\n  },` AFTER the slug anchor.
        close_pattern = "    ],\n  },"
        close_idx = src.find(close_pattern, idx)
        if close_idx == -1:
            raise SystemExit(f"ERROR: could not locate entry close for {slug!r}")
        # The insert point is right after `    ],\n` (i.e. before the `  },` line).
        # close_idx points to the `    ],` line. The `    ],\n` ends at close_idx + len("    ],\n").
        insert_at = close_idx + len("    ],\n")
        # Append everything up to and including the `    ],\n` to out_parts.
        out_parts.append(src[cursor:insert_at])
        # Append the atAGlance block.
        out_parts.append(fmt_block(slug, facts) + "\n")
        cursor = insert_at
        edits_applied += 1
    # Append the remainder of the file.
    out_parts.append(src[cursor:])

    new_src = "".join(out_parts)
    SERVICE_FILE.write_text(new_src)
    print(f"Applied {edits_applied} atAGlance insertions.")
    print(f"New file length: {len(new_src.splitlines())} lines.")

    # Validation: ensure atAGlance appears exactly 24 times.
    n = new_src.count("atAGlance:")
    print(f"Occurrences of 'atAGlance:': {n}")
    assert n == 24, f"expected 24 atAGlance blocks, found {n}"
    print("OK — all 24 entries have atAGlance.")


if __name__ == "__main__":
    main()
