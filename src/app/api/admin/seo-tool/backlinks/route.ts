import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const backlinks = await db.backlink.findMany({ orderBy: { lastSeen: "desc" }, take: 200 });
  return NextResponse.json({ ok: true, backlinks });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.sourceUrl || !body?.targetUrl) return NextResponse.json({ ok: false, error: "sourceUrl and targetUrl required" }, { status: 422 });
  const bl = await db.backlink.create({
    data: {
      sourceUrl: String(body.sourceUrl),
      targetUrl: String(body.targetUrl),
      anchorText: body.anchorText || null,
      domainRating: Number(body.domainRating) || 0,
      dofollow: body.dofollow !== false,
      status: "active",
    },
  });
  return NextResponse.json({ ok: true, backlink: bl });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  await db.backlink.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
