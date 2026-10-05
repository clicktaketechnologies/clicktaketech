import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Public endpoint — returns active team members for the Team page.
 * Wrapped in try/catch so a missing TeamMember table (e.g. on a fresh
 * Supabase DB where the schema push hasn't completed) returns an empty
 * list instead of a 500. TeamView already falls back to a static
 * department-based layout when `members` is empty.
 */
export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: {
        id: true, name: true, role: true, department: true,
        bio: true, photo: true, linkedin: true, twitter: true,
      },
    });
    return NextResponse.json({ ok: true, members });
  } catch (err) {
    console.error("[api/team] query failed:", err);
    return NextResponse.json({ ok: true, members: [] });
  }
}
