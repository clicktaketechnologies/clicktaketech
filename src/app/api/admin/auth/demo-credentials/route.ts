import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/admin/auth/demo-credentials
 * Public endpoint that returns the currently-configured super-admin
 * credentials (email + password) from env, so the LoginGate can display
 * the REAL credentials the server will accept — not a hardcoded string
 * that goes stale whenever someone updates .env. This is safe in this CMS
 * context because the credentials are already shown on the login form for
 * the convenience of the demo admin.
 *
 * Returns 404 if env super-admin is not configured (so the LoginGate
 * falls back to its inline hint instead of showing misleading data).
 */
export async function GET() {
  const email = process.env.SUPERADMIN_EMAIL?.trim();
  const password = process.env.SUPERADMIN_PASSWORD;
  if (!email || !password) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    email,
    password,
  });
}
