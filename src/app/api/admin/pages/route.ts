import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { safeQuery } from "@/lib/admin-safe-query";
import { getSeedPages } from "@/lib/admin-seed-data";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // published | draft | all
  const category = searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (category && category !== "all") where.category = category;
  // Fall back to seed data when the DB is unreachable so the admin panel
  // shows real content instead of a blank dashboard.
  const seedFallback = getSeedPages().filter((p) =>
    (!status || status === "all" || p.status === status) &&
    (!category || category === "all" || p.category === category)
  );
  const pages = await safeQuery(
    () => db.page.findMany({ where, orderBy: { updatedAt: "desc" } }),
    seedFallback,
    "pages"
  );
  return NextResponse.json({ ok: true, pages });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  const { slug, title, category, hero, overview, body: pageBody, metaTitle, metaDescription, keywords, status } = body as Record<string, string>;
  if (!slug || !title) {
    return NextResponse.json({ ok: false, error: "slug and title are required." }, { status: 422 });
  }
  const existing = await db.page.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "A page with that slug already exists." }, { status: 409 });
  }
  const page = await db.page.create({
    data: {
      slug,
      title,
      category: category || "custom",
      status: status || "published",
      hero: hero || null,
      overview: overview || null,
      body: pageBody || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
    },
  });
  return NextResponse.json({ ok: true, page });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  const { id, slug, title, category, hero, overview, body: pageBody, metaTitle, metaDescription, keywords, status } = body as Record<string, string>;
  // If slug is changing, ensure uniqueness.
  if (slug) {
    const conflict = await db.page.findFirst({ where: { slug, NOT: { id } } });
    if (conflict) return NextResponse.json({ ok: false, error: "Slug already in use." }, { status: 409 });
  }
  const page = await db.page.update({
    where: { id: String(id) },
    data: {
      ...(slug ? { slug } : {}),
      ...(title ? { title } : {}),
      ...(category ? { category } : {}),
      ...(typeof hero === "string" ? { hero: hero || null } : {}),
      ...(typeof overview === "string" ? { overview: overview || null } : {}),
      ...(typeof pageBody === "string" ? { body: pageBody || null } : {}),
      ...(typeof metaTitle === "string" ? { metaTitle: metaTitle || null } : {}),
      ...(typeof metaDescription === "string" ? { metaDescription: metaDescription || null } : {}),
      ...(typeof keywords === "string" ? { keywords: keywords || null } : {}),
      ...(status ? { status } : {}),
    },
  });
  return NextResponse.json({ ok: true, page });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  await db.page.delete({ where: { id: String(id) } });
  return NextResponse.json({ ok: true });
}
