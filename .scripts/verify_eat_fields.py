"""Verify all 24 service entries have the 4 new fields with correct word counts."""
import re
from pathlib import Path

PATH = Path("/home/z/my-project/src/lib/service-content.ts")
src = PATH.read_text()

# Find every entry block by splitting on top-level slug keys.
# Each block starts with `  "slug": {` and ends at the next `  },\n\n  "next-slug":`
# or final `  },\n};`.
# Simpler approach: regex-match all slug blocks.
slug_re = re.compile(r'^  "([a-z0-9-]+)": \{$', re.MULTILINE)
matches = list(slug_re.finditer(src))
assert len(matches) == 24, f"expected 24 slug entries, found {len(matches)}"

errors = []
warnings = []
for i, m in enumerate(matches):
    slug = m.group(1)
    start = m.end()
    # End: either next slug start - 1, or the closing `};`
    if i + 1 < len(matches):
        end = matches[i + 1].start()
    else:
        end = src.index("};", start)
    block = src[start:end]

    # Check the four new fields exist.
    for field in ["definition", "peopleAlsoAsk", "voiceSearchQueries", "eatSignals"]:
        if f"{field}:" not in block:
            errors.append(f"[{slug}] missing field: {field}")

    # Extract definition text.
    def_m = re.search(r'definition: "([^"]+)",', block)
    if def_m:
        defn = def_m.group(1)
        # Word count: split on whitespace.
        words = len(defn.split())
        if not (40 <= words <= 55):
            errors.append(f"[{slug}] definition has {words} words (need 40-55)")
        # Should start with "What is"
        if not defn.startswith("What is "):
            errors.append(f"[{slug}] definition does not start with 'What is '")
    else:
        errors.append(f"[{slug}] could not extract definition")

    # Extract peopleAlsoAsk answers.
    paa_block = re.search(r"peopleAlsoAsk: \[(.*?)\n    \],", block, re.DOTALL)
    if paa_block:
        answers = re.findall(r'a: "((?:[^"\\]|\\.)*)",', paa_block.group(1))
        if not (4 <= len(answers) <= 5):
            errors.append(f"[{slug}] peopleAlsoAsk has {len(answers)} entries (need 4-5)")
        for j, ans in enumerate(answers):
            wc = len(ans.split())
            if not (25 <= wc <= 45):
                errors.append(f"[{slug}] PAA answer {j+1} has {wc} words (need 25-45)")

    # Extract voiceSearchQueries.
    vs_block = re.search(r"voiceSearchQueries: \[(.*?)\n    \],", block, re.DOTALL)
    if vs_block:
        queries = re.findall(r'"([^"]+)"', vs_block.group(1))
        if not (3 <= len(queries) <= 5):
            errors.append(f"[{slug}] voiceSearchQueries has {len(queries)} entries (need 3-5)")

    # Extract eatSignals.
    eat_block = re.search(r"eatSignals: \[(.*?)\n    \],", block, re.DOTALL)
    if eat_block:
        labels = re.findall(r'label: "([^"]+)"', eat_block.group(1))
        if not (3 <= len(labels) <= 4):
            errors.append(f"[{slug}] eatSignals has {len(labels)} entries (need 3-4)")

# Check for duplicate questions across services (peopleAlsoAsk only).
all_q = []
for m in matches:
    slug = m.group(1)
    start = m.end()
    if i + 1 < len(matches):
        end = matches[i + 1].start()
    else:
        end = src.index("};", start)
    # Re-do per-entry extraction safely (i was the loop index from above)
# (This block is a bit clunky; let me just iterate again cleanly.)

all_paa_qs = []
all_paa_q_slugs = []
for i, m in enumerate(matches):
    slug = m.group(1)
    start = m.end()
    if i + 1 < len(matches):
        end = matches[i + 1].start()
    else:
        end = src.index("};", start)
    block = src[start:end]
    paa_block = re.search(r"peopleAlsoAsk: \[(.*?)\n    \],", block, re.DOTALL)
    if not paa_block:
        continue
    qs = re.findall(r'q: "((?:[^"\\]|\\.)*)"', paa_block.group(1))
    for q in qs:
        all_paa_qs.append(q)
        all_paa_q_slugs.append(slug)

# Also pull faqs qs so we can check no PAA q duplicates an existing faqs q.
all_faqs_qs = []
for i, m in enumerate(matches):
    slug = m.group(1)
    start = m.end()
    if i + 1 < len(matches):
        end = matches[i + 1].start()
    else:
        end = src.index("};", start)
    block = src[start:end]
    faqs_block = re.search(r"faqs: \[(.*?)\n    \],", block, re.DOTALL)
    if not faqs_block:
        continue
    qs = re.findall(r'q: "((?:[^"\\]|\\.)*)"', faqs_block.group(1))
    for q in qs:
        all_faqs_qs.append(q)

# Check duplicates WITHIN peopleAlsoAsk across services.
seen = {}
for q, slug in zip(all_paa_qs, all_paa_q_slugs):
    if q in seen:
        errors.append(f"Duplicate PAA question across services: '{q}' in '{seen[q]}' and '{slug}'")
    else:
        seen[q] = slug

# Check PAA question doesn't duplicate an existing faqs question.
faq_set = set(all_faqs_qs)
for q, slug in zip(all_paa_qs, all_paa_q_slugs):
    if q in faq_set:
        errors.append(f"PAA question duplicates an existing faqs question: '{q}' in '{slug}'")

print(f"Total slugs: {len(matches)}")
print(f"Total PAA questions: {len(all_paa_qs)}")
print(f"Total faqs questions: {len(all_faqs_qs)}")
print()
if errors:
    print("ERRORS:")
    for e in errors:
        print(f"  - {e}")
    raise SystemExit(1)
else:
    print("ALL CHECKS PASSED")
