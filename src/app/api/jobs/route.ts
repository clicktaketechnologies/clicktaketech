import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Public endpoint — returns active job openings for the Careers page.
 * Wrapped in try/catch so a missing Job table (e.g. on a fresh Supabase
 * DB where the schema push hasn't completed) returns an empty list
 * instead of a 500. CareersView already falls back to its static JOBS
 * list when `jobs` is empty.
 */
export async function GET() {
  try {
    const jobs = await db.job.findMany({
      where: { active: true },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true, slug: true, title: true, department: true,
        location: true, type: true, description: true, salary: true,
      },
    });
    return NextResponse.json({ ok: true, jobs });
  } catch (err) {
    console.error("[api/jobs] query failed:", err);
    return NextResponse.json({ ok: true, jobs: [] });
  }
}
