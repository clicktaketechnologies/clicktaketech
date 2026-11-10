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
      const post = await db.blogPost.findUnique({ where: { slug } });
      if (post) return NextResponse.json({ ok: true, post, source: "db" });
    } catch { /* DB unreachable */ }
    const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
    if (staticPost) return NextResponse.json({ ok: true, post: staticPost, source: "static" });
    return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
  }

  // List — merge DB + static (DB takes priority by slug)
  let dbPosts: typeof BLOG_POSTS = [];
  try {
    dbPosts = await db.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    }) as typeof BLOG_POSTS;
  } catch { /* DB unreachable */ }

  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const staticOnly = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug));
  const allPosts = [...dbPosts, ...staticOnly];

  return NextResponse.json({ ok: true, posts: allPosts, source: dbPosts.length > 0 ? "db" : "static" });
}
