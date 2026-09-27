import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Lightweight admin session check.
 * The admin panel posts email+password to /api/admin/auth which returns a
 * base64 token (email:password). The browser stores it in localStorage and
 * sends it back via the `x-admin-token` header on every admin API call.
 *
 * This is intentionally simple (no JWT lib, no httpOnly cookie) to fit the
 * existing SPA + localStorage architecture. Replace with NextAuth + httpOnly
 * cookies before going to production.
 */

export function makeToken(email: string, password: string): string {
  // base64 (standard, not url-safe) — safe in HTTP headers. NOT secure
  // storage. Do not put secrets in here beyond what the user already typed
  // into the login form. Replace with NextAuth + httpOnly cookies before
  // production.
  return Buffer.from(`${email}:${password}`, "utf-8").toString("base64");
}

/**
 * Decode an `x-admin-token` header back into `{ email, password }`.
 * Uses the FIRST colon as the separator so passwords (or emails) that
 * legitimately contain colons don't break decoding. Returns null if the
 * token is malformed or empty.
 */
export function decodeToken(token: string): { email: string; password: string } | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const sep = decoded.indexOf(":");
    if (sep <= 0 || sep === decoded.length - 1) return null;
    const email = decoded.slice(0, sep);
    const password = decoded.slice(sep + 1);
    if (!email || !password) return null;
    return { email, password };
  } catch {
    return null;
  }
}

export async function requireAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("x-admin-token");
  if (!token) return false;
  try {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    const user = await db.user.findUnique({ where: { email: decoded.email } });
    if (!user || user.password !== decoded.password) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve the user represented by an `x-admin-token` header, or null.
 * Used by the GET /api/admin/auth verify endpoint so the client can
 * confirm a persisted token is still valid (e.g. after a password change
 * or a DB re-seed) without re-submitting the login form.
 */
export async function resolveAdminFromToken(
  token: string
): Promise<{ id: string; email: string; name: string | null; role: string; permissions: string | null } | null> {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return null;
    const user = await db.user.findUnique({ where: { email: decoded.email } });
    if (!user || user.password !== decoded.password) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    };
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return Response.json(
    { ok: false, error: "Unauthorized. Please log in to the admin panel." },
    { status: 401 }
  );
}
