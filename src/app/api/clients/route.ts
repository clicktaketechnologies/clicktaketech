import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Public endpoint — returns active client logos for the homepage
 * "Trusted by" strip.
 *
 * Wrapped in try/catch so a missing/empty ClientLogo table (e.g. on a
 * fresh Supabase DB where the schema push hasn't run yet, or a transient
 * connection blip) returns an empty list instead of a 500. The homepage
 * OurClientsSection already handles `clients.length === 0` by hiding
 * itself, so this keeps the homepage resilient instead of surfacing a
 * console error / risking a client-side exception.
 */
export async function GET() {
  try {
    const clients = await db.clientLogo.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: { id: true, name: true, logo: true, website: true, category: true },
    });
    return NextResponse.json({ ok: true, clients });
  } catch (err) {
    console.error("[api/clients] query failed:", err);
    return NextResponse.json({ ok: true, clients: [] });
  }
}
