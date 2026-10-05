import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Lightweight admin session check.
 * The admin panel posts email+password to /api/admin/auth which returns a
 * base64 token (email:password). The browser stores it in localStorage and
 * sends it back via the `x-admin-token` header on every admin API call.
 *
 * Credentials resolution order (so changing `.env` actually takes effect
 * without needing to manually re-seed the DB):
 *   1. ENV super-admin — if `SUPERADMIN_EMAIL` + `SUPERADMIN_PASSWORD` are
 *      set in the environment, those credentials are ALWAYS authoritative
 *      for that email. We also keep the DB row in sync so the existing
 *      DB-based code paths and persisted tokens keep working.
 *   2. DB lookup — any other user (editors, etc.) is resolved from the
 *      `User` table by email + plaintext password comparison.
 *
 * This is intentionally simple (no JWT lib, no httpOnly cookie) to fit the
 * existing SPA + localStorage architecture. Replace with NextAuth +
 * httpOnly cookies before going to production.
 */

/** Read the configured super-admin credentials from env (or return null). */
function getEnvSuperAdmin(): { email: string; password: string } | null {
  const email = process.env.SUPERADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPERADMIN_PASSWORD;
  if (!email || !password) return null;
  return { email, password };
}

/** Normalise an email for comparison (trim + lowercase). */
function norm(email: string): string {
  return email.trim().toLowerCase();
}

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

/**
 * Resolve credentials either against the env super-admin or the DB.
 * Returns a minimal user shape on success, or null on failure.
 */
async function resolveCredentials(
  email: string,
  password: string
): Promise<{ id: string; email: string; name: string | null; role: string; permissions: string | null } | null> {
  const envSuper = getEnvSuperAdmin();
  // 1) ENV super-admin short-circuit — the env is the source of truth for
  //    the configured super-admin. This means changing SUPERADMIN_PASSWORD
  //    in .env takes effect on the very next login attempt, no re-seed
  //    required.
  if (envSuper && norm(email) === envSuper.email && password === envSuper.password) {
    // Best-effort: make sure the DB row matches the env so persisted tokens
    // (base64(email:password)) and the DB-based fallback paths all agree.
    // ALL DB access here is wrapped — if the User table doesn't exist yet
    // (e.g. a fresh Supabase DB where the postinstall schema-push didn't
    // complete), we still authenticate via env and return fallback values.
    let dbRow: { id: string; name: string | null; role: string; permissions: string | null } | null = null;
    try {
      const existing = await db.user.findUnique({ where: { email: envSuper.email } });
      if (existing && existing.password !== envSuper.password) {
        await db.user.update({
          where: { id: existing.id },
          data: { password: envSuper.password, role: "admin", permissions: null },
        });
        dbRow = { id: existing.id, name: existing.name, role: existing.role, permissions: existing.permissions };
      } else if (existing) {
        dbRow = { id: existing.id, name: existing.name, role: existing.role, permissions: existing.permissions };
      } else {
        const created = await db.user.create({
          data: {
            email: envSuper.email,
            name: "ClickTake Admin",
            password: envSuper.password,
            role: "admin",
            permissions: null,
          },
        });
        dbRow = { id: created.id, name: created.name, role: created.role, permissions: created.permissions };
      }
    } catch {
      /* DB unavailable (table missing / connection error) — env match is
         enough to authenticate. Return fallback values below. */
    }
    return {
      id: dbRow?.id ?? "super-admin",
      email: envSuper.email,
      name: dbRow?.name ?? "ClickTake Admin",
      role: dbRow?.role ?? "admin",
      permissions: dbRow?.permissions ?? null,
    };
  }
  // 2) DB fallback — any other user (editor, viewer, etc.).
  // Let Prisma infer the return type (includes the `password` field we need
  // to compare) instead of annotating a narrow type that omits it.
  let user: { id: string; email: string; name: string | null; role: string; password: string; permissions: string | null } | null = null;
  try {
    user = await db.user.findUnique({ where: { email: norm(email) } });
  } catch {
    return null; // DB unavailable and not an env super-admin → reject
  }
  if (!user || user.password !== password) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
  };
}

export async function requireAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("x-admin-token");
  if (!token) return false;
  try {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    const user = await resolveCredentials(decoded.email, decoded.password);
    return user !== null;
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
    return await resolveCredentials(decoded.email, decoded.password);
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
