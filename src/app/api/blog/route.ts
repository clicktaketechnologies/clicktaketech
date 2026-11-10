/* Vercel deploy trigger */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BLOG_POSTS } from "@/lib/site-data";

export const runtime = "nodejs";

/**
 * GET /api/blog?slug=<slug>
 * Public, unauthenticated blog API. Returns:
 * - If `slug` query param is present: a single blog post (or 404)
 * - If no `slug`: an array of all published posts (DB + static merged)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    try {
      const r = await db.blogPost.findUnique({ where: { slug } });
      if (r) {
        const post = {
          slug: r.slug,
          title: r.title,
          category: r.category,
          excerpt: r.excerpt,
          body: r.body || undefined,
          date: r.publishedAt instanceof Date ? r.publishedAt.toISOString() : String(r.publishedAt),
          readTime: r.readTime,
        };
        return NextResponse.json({ ok: true, post, source: "db" });
      }
    } catch { /* DB unreachable */ }
    const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
    if (staticPost) return NextResponse.json({ ok: true, post: staticPost, source: "static" });
    return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
  }

  // List — merge DB + static (DB takes priority by slug)
  let dbPosts: typeof BLOG_POSTS = [];
  try {
    const rows = await db.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });
    // Map DB rows to the BlogPost shape (DB has extra fields like id, dates)
    dbPosts = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      excerpt: r.excerpt,
      body: r.body || undefined,
      date: r.publishedAt instanceof Date ? r.publishedAt.toISOString() : String(r.publishedAt),
      readTime: r.readTime,
    })) as typeof BLOG_POSTS;
  } catch { /* DB unreachable */ }

  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const staticOnly = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug));
  const allPosts = [...dbPosts, ...staticOnly];

  return NextResponse.json({ ok: true, posts: allPosts, source: dbPosts.length > 0 ? "db" : "static" });
}
