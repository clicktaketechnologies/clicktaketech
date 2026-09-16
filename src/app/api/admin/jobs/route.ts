import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const jobs = await db.job.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ ok: true, jobs });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.slug) return NextResponse.json({ ok: false, error: "title and slug required" }, { status: 422 });
  const existing = await db.job.findUnique({ where: { slug: String(body.slug) } });
  if (existing) return NextResponse.json({ ok: false, error: "slug already exists" }, { status: 409 });
  const j = await db.job.create({
    data: {
      slug: String(body.slug), title: String(body.title),
      department: String(body.department || "General"),
      location: String(body.location || "Remote"),
      type: String(body.type || "Full-time"),
      description: String(body.description || ""),
      requirements: body.requirements || null,
      salary: body.salary || null,
      active: body.active !== false,
    },
  });
  await logActivity({ action: "create", entity: "job", entityId: j.id, summary: `Posted job "${j.title}"` });
  return NextResponse.json({ ok: true, job: j });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, slug, title, department, location, type, description, requirements, salary, active } = body as Record<string, unknown>;
  if (slug) {
    const conflict = await db.job.findFirst({ where: { slug: String(slug), NOT: { id: String(id) } } });
    if (conflict) return NextResponse.json({ ok: false, error: "slug already in use" }, { status: 409 });
  }
  const j = await db.job.update({
    where: { id: String(id) },
    data: {
      ...(slug ? { slug: String(slug) } : {}),
      ...(title ? { title: String(title) } : {}),
      ...(department ? { department: String(department) } : {}),
      ...(location ? { location: String(location) } : {}),
      ...(type ? { type: String(type) } : {}),
      ...(typeof description === "string" ? { description } : {}),
      ...(typeof requirements === "string" ? { requirements: requirements || null } : {}),
      ...(typeof salary === "string" ? { salary: salary || null } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
    },
  });
  await logActivity({ action: "update", entity: "job", entityId: String(id), summary: `Updated job "${j.title}"` });
  return NextResponse.json({ ok: true, job: j });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const j = await db.job.delete({ where: { id } });
  await logActivity({ action: "delete", entity: "job", entityId: id, summary: `Deleted job "${j.title}"` });
  return NextResponse.json({ ok: true });
}
