import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (category && category !== "all") where.category = category;
  const posts = await db.blogPost.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  const { slug, title, category, excerpt, body: postBody, readTime, metaTitle, metaDescription, keywords, status } = body as Record<string, string>;
  if (!slug || !title || !excerpt) {
    return NextResponse.json({ ok: false, error: "slug, title and excerpt are required." }, { status: 422 });
  }
  const existing = await db.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "A post with that slug already exists." }, { status: 409 });
  }
  const post = await db.blogPost.create({
    data: {
      slug,
      title,
      category: category || "General",
      excerpt,
      body: postBody || null,
      readTime: readTime || "5 min",
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
      status: status || "published",
    },
  });
  return NextResponse.json({ ok: true, post });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  const { id, slug, title, category, excerpt, body: postBody, readTime, metaTitle, metaDescription, keywords, status } = body as Record<string, string>;
  if (slug) {
    const conflict = await db.blogPost.findFirst({ where: { slug, NOT: { id } } });
    if (conflict) return NextResponse.json({ ok: false, error: "Slug already in use." }, { status: 409 });
  }
  const post = await db.blogPost.update({
    where: { id },
    data: {
      ...(slug ? { slug } : {}),
      ...(title ? { title } : {}),
      ...(category ? { category } : {}),
      ...(typeof excerpt === "string" ? { excerpt } : {}),
      ...(typeof postBody === "string" ? { body: postBody || null } : {}),
      ...(typeof readTime === "string" ? { readTime } : {}),
      ...(typeof metaTitle === "string" ? { metaTitle: metaTitle || null } : {}),
      ...(typeof metaDescription === "string" ? { metaDescription: metaDescription || null } : {}),
      ...(typeof keywords === "string" ? { keywords: keywords || null } : {}),
      ...(status ? { status } : {}),
    },
  });
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  await db.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
