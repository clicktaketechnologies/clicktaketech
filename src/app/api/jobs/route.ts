import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const jobs = await db.job.findMany({
    where: { active: true },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true, slug: true, title: true, department: true,
      location: true, type: true, description: true, salary: true,
    },
  });
  return NextResponse.json({ ok: true, jobs });
}
