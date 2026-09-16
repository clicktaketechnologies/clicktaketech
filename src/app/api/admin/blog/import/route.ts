import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

type ParsedPost = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: string;
  status: string;
};

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

/** Parse a CSV string into rows. Handles quoted fields. */
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals: string[] = [];
    let cur = "";
    let inQuote = false;
    for (const ch of lines[i]) {
      if (ch === '"') inQuote = !inQuote;
      else if (ch === "," && !inQuote) { vals.push(cur); cur = ""; }
      else cur += ch;
    }
    vals.push(cur);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = (vals[idx] || "").trim(); });
    rows.push(row);
  }
  return rows;
}

/** Parse a Markdown file into title + body. Uses first # heading or frontmatter. */
function parseMarkdown(text: string): ParsedPost | null {
  let title = "";
  let category = "General";
  let excerpt = "";
  const lines = text.split(/\r?\n/);

  // Frontmatter (--- ... ---)
  if (lines[0]?.trim() === "---") {
    const endIdx = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
    if (endIdx > 0) {
      const fm = lines.slice(1, endIdx);
      for (const line of fm) {
        const m = line.match(/^(\w+):\s*(.+)$/);
        if (m) {
          if (m[1].toLowerCase() === "title") title = m[2].replace(/^["']|["']$/g, "");
          if (m[1].toLowerCase() === "category") category = m[2].replace(/^["']|["']$/g, "");
          if (m[1].toLowerCase() === "excerpt" || m[1].toLowerCase() === "description") excerpt = m[2].replace(/^["']|["']$/g, "");
        }
      }
      lines.splice(0, endIdx + 1);
    }
  }

  // First H1 as title if no frontmatter title
  if (!title) {
    const h1 = lines.find((l) => l.startsWith("# "));
    if (h1) title = h1.replace(/^#\s+/, "");
  }
  if (!title) title = "Untitled Import";

  const body = lines.join("\n").trim();
  if (!excerpt) excerpt = body.slice(0, 160).replace(/[#*`]/g, "") + "...";

  return {
    title,
    slug: slugify(title),
    excerpt,
    body,
    category,
    readTime: `${Math.max(3, Math.ceil(body.split(/\s+/).length / 200))} min`,
    status: "published",
  };
}

/** Parse a JSON file (array of post objects). */
function parseJSON(text: string): ParsedPost[] {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) return [];
  return data.map((item: Record<string, unknown>) => ({
    title: String(item.title || item.name || "Untitled"),
    slug: slugify(String(item.slug || item.title || "untitled")),
    excerpt: String(item.excerpt || item.summary || ""),
    body: String(item.body || item.content || ""),
    category: String(item.category || "General"),
    readTime: String(item.readTime || "5 min"),
    status: String(item.status || "published"),
  }));
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }
  const file = form.get("file");
  const publishMode = typeof form.get("publish") === "string" ? (form.get("publish") as string) : "published";
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 422 });
  }
  const f = file as File;
  const text = await f.text();
  let posts: ParsedPost[] = [];

  const isJSON = f.name.endsWith(".json") || f.type === "application/json";
  const isCSV = f.name.endsWith(".csv") || f.type === "text/csv";
  const isMD = f.name.endsWith(".md") || f.name.endsWith(".markdown") || f.type === "text/markdown";

  try {
    if (isJSON) {
      posts = parseJSON(text);
    } else if (isCSV) {
      const rows = parseCSV(text);
      posts = rows.map((r) => ({
        title: r.title || r.Title || r.name || "Untitled",
        slug: slugify(r.slug || r.title || r.Title || "untitled"),
        excerpt: r.excerpt || r.summary || r.description || "",
        body: r.body || r.content || r.text || "",
        category: r.category || r.Category || "General",
        readTime: r.readTime || r.read_time || "5 min",
        status: publishMode,
      }));
    } else if (isMD) {
      const parsed = parseMarkdown(text);
      if (parsed) { parsed.status = publishMode; posts = [parsed]; }
    } else {
      return NextResponse.json({ ok: false, error: "Unsupported file type. Use .csv, .json, .md, or .markdown" }, { status: 422 });
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: `Parse error: ${err instanceof Error ? err.message : "unknown"}` }, { status: 422 });
  }

  if (posts.length === 0) {
    return NextResponse.json({ ok: false, error: "No posts found in the file" }, { status: 422 });
  }

  // Create posts, skipping slug conflicts
  const created: { title: string; slug: string; status: string }[] = [];
  const skipped: { title: string; reason: string }[] = [];
  for (const p of posts) {
    if (!p.title || !p.slug) { skipped.push({ title: p.title || "?", reason: "Missing title/slug" }); continue; }
    const existing = await db.blogPost.findUnique({ where: { slug: p.slug } });
    if (existing) { skipped.push({ title: p.title, reason: "Slug already exists" }); continue; }
    const post = await db.blogPost.create({
      data: {
        title: p.title, slug: p.slug, excerpt: p.excerpt, body: p.body,
        category: p.category, readTime: p.readTime, status: p.status,
      },
    });
    created.push({ title: post.title, slug: post.slug, status: post.status });
  }

  await logActivity({
    action: "create",
    entity: "blog",
    summary: `Imported ${created.length} blog post(s) from ${f.name} (${skipped.length} skipped)`,
  });

  return NextResponse.json({ ok: true, imported: created.length, skipped: skipped.length, posts: created, skipped });
}
