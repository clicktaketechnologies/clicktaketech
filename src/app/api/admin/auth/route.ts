import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { makeToken, resolveAdminFromToken } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

/**
 * GET /api/admin/auth
 * Verify a persisted `x-admin-token` header is still valid (user exists +
 * password matches env super-admin OR DB row). Used by the admin SPA on
 * mount to detect stale tokens left over in localStorage from previous
 * sessions (e.g. before the DB was seeded, or after a password change).
 * Returns the same shape as POST so the client can refresh its in-memory
 * user/permission cache.
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("x-admin-token");
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "No token supplied.", _v: "auth-fix-v2" },
        { status: 401 }
      );
    }
    const user = await resolveAdminFromToken(token);
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Your session has expired. Please log in again.", _v: "auth-fix-v2", _envSet: !!(process.env.SUPERADMIN_EMAIL && process.env.SUPERADMIN_PASSWORD) },
        { status: 401 }
      );
    }
    return NextResponse.json({
      ok: true,
      token,
      _v: "auth-fix-v2",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (err) {
    console.error("[admin/auth] verify error", err);
    return NextResponse.json(
      { ok: false, error: "Session verification failed.", _v: "auth-fix-v2" },
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

    // ENV super-admin short-circuit + DB sync. If the submitted email
    // matches SUPERADMIN_EMAIL env, we treat SUPERADMIN_PASSWORD env as the
    // authoritative password AND keep the DB row in sync (so persisted
    // tokens and the DB-based fallback paths all agree). This is what makes
    // changing the password in .env actually take effect without a manual
    // re-seed.
    const envEmail = process.env.SUPERADMIN_EMAIL?.trim().toLowerCase();
    const envPass = process.env.SUPERADMIN_PASSWORD;
    if (envEmail && envPass && email === envEmail) {
      // Sync the DB row to the env password (best-effort).
      try {
        const existing = await db.user.findUnique({ where: { email: envEmail } });
        if (!existing) {
          await db.user.create({
            data: {
              email: envEmail,
              name: "ClickTake Admin",
              password: envPass,
              role: "admin",
              permissions: null,
            },
          });
        } else if (existing.password !== envPass) {
          await db.user.update({
            where: { id: existing.id },
            data: { password: envPass, role: "admin", permissions: null },
          });
        }
      } catch (e) {
        console.error("[admin/auth] DB sync error", e);
      }

      if (password === envPass) {
        await logActivity({
          action: "login",
          entity: "user",
          entityId: envEmail,
          summary: `${envEmail} logged in (env super-admin)`,
          actor: envEmail,
        });
        // Issue the token from the env password so requireAdmin (which also
        // checks env) will accept it on subsequent requests.
        return NextResponse.json({
          ok: true,
          token: makeToken(envEmail, envPass),
          user: {
            email: envEmail,
            name: "ClickTake Admin",
            role: "admin",
            permissions: null,
          },
        });
      }
      // Env email matched but password didn't — fall through to the
      // generic "invalid credentials" 401 below so we don't leak which
      // email is the configured super-admin.
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      await logActivity({ action: "login", entity: "user", summary: `Failed login attempt for ${email}` });
      return NextResponse.json(
        { ok: false, error: "Invalid email or password. Use the credentials shown below the form." },
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
