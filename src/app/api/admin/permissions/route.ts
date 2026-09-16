import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { ALL_PERMISSIONS, ROLE_PRESETS, parsePermissions } from "@/lib/rbac";

export const runtime = "nodejs";

// GET: list all available permissions + role presets + a specific user's permissions
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  let userPerms: string[] | null = null;
  if (userId) {
    const user = await db.user.findUnique({ where: { id: userId }, select: { permissions: true } });
    if (user) {
      const parsed = parsePermissions(user.permissions);
      userPerms = parsed === null ? null : Array.from(parsed);
    }
  }

  return NextResponse.json({
    ok: true,
    permissions: ALL_PERMISSIONS,
    presets: Object.entries(ROLE_PRESETS).map(([key, val]) => ({ key, ...val })),
    userPermissions: userPerms,
  });
}

// PATCH: update a user's permissions
export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.userId) return NextResponse.json({ ok: false, error: "userId required" }, { status: 422 });

  const { userId, permissions, preset } = body as {
    userId: string;
    permissions?: string[];
    preset?: string;
  };

  let finalPerms: string | null;
  if (preset) {
    const presetData = ROLE_PRESETS[preset];
    if (!presetData) return NextResponse.json({ ok: false, error: "Unknown preset" }, { status: 422 });
    finalPerms = presetData.permissions === null ? null : JSON.stringify(presetData.permissions);
  } else if (Array.isArray(permissions)) {
    finalPerms = JSON.stringify(permissions);
  } else {
    return NextResponse.json({ ok: false, error: "Provide either 'permissions' array or 'preset' key" }, { status: 422 });
  }

  const user = await db.user.update({
    where: { id: userId },
    data: { permissions: finalPerms },
    select: { id: true, email: true, name: true, role: true, permissions: true },
  });

  await logActivity({
    action: "update",
    entity: "user",
    entityId: userId,
    summary: `Updated permissions for ${user.email} — ${finalPerms === null ? "all access (super admin)" : `${JSON.parse(finalPerms).length} permissions`}`,
  });

  return NextResponse.json({ ok: true, user });
}
