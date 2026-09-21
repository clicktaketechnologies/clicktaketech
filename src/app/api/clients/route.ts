import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const clients = await db.clientLogo.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { id: true, name: true, logo: true, website: true, category: true },
  });
  return NextResponse.json({ ok: true, clients });
}
