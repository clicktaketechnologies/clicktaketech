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
  // base64url — safe in headers, NOT secure storage. Do not put secrets in here
  // beyond what the user already typed into the login form.
  return Buffer.from(`${email}:${password}`, "utf-8").toString("base64");
}

export async function requireAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("x-admin-token");
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, password] = decoded.split(":");
    if (!email || !password) return false;
    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.password !== password || user.role !== "admin") return false;
    return true;
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return Response.json(
    { ok: false, error: "Unauthorized. Please log in to the admin panel." },
    { status: 401 }
  );
}
