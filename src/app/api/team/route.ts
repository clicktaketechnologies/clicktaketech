import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const members = await db.teamMember.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true, name: true, role: true, department: true,
      bio: true, photo: true, linkedin: true, twitter: true,
    },
  });
  return NextResponse.json({ ok: true, members });
}
