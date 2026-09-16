import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const audits = await db.seoAudit.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, url: true, score: true, titleLen: true, descLen: true, h1Count: true, hasCanonical: true, hasOg: true, hasJsonLd: true, issues: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, audits });
}
