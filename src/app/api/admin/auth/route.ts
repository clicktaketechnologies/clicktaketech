import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { makeToken, resolveAdminFromToken } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

/**
 * GET /api/admin/auth
 * Verify a persisted `x-admin-token` header is still valid (user exists +
 * password matches). Used by the admin SPA on mount to detect stale tokens
 * left over in localStorage from previous sessions (e.g. before the DB was
 * seeded, or after a password change). Returns the same shape as POST so the
 * client can refresh its in-memory user/permission cache.
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("x-admin-token");
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "No token supplied." },
        { status: 401 }
      );
    }
    const user = await resolveAdminFromToken(token);
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Your session has expired. Please log in again." },
        { status: 401 }
      );
    }
    return NextResponse.json({
      ok: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions, // JSON string or null (super admin)
      },
    });
  } catch (err) {
    console.error("[admin/auth] verify error", err);
    return NextResponse.json(
      { ok: false, error: "Session verification failed." },
      { status: 500 }
    );
  }
}

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
    if (!user || user.password !== password) {
      await logActivity({ action: "login", entity: "user", summary: `Failed login attempt for ${email}` });
      return NextResponse.json(
        { ok: false, error: "Invalid email or password. Double-check the demo credentials shown below the form." },
        { status: 401 }
      );
    }
    await logActivity({ action: "login", entity: "user", entityId: user.id, summary: `${user.email} logged in`, actor: user.email });
    return NextResponse.json({
      ok: true,
      token: makeToken(user.email, user.password),
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions, // JSON string or null (super admin)
      },
    });
  } catch (err) {
    console.error("[admin/auth] error", err);
    return NextResponse.json(
      { ok: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
