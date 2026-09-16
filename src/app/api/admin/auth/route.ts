import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { makeToken } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { email?: string; password?: string }
      | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required." },
        { status: 400 }
      );
    }
    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.password !== password || user.role !== "admin") {
      await logActivity({ action: "login", entity: "user", summary: `Failed login attempt for ${email}` });
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }
    await logActivity({ action: "login", entity: "user", entityId: user.id, summary: `${user.email} logged in`, actor: user.email });
    return NextResponse.json({
      ok: true,
      token: makeToken(user.email, user.password),
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("[admin/auth] error", err);
    return NextResponse.json(
      { ok: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
