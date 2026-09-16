import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
  "video/mp4",
]);
const MAX_BYTES = 12 * 1024 * 1024;

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");
  const where: Record<string, unknown> = {};
  if (folder && folder !== "all") where.folder = folder;
  const assets = await db.mediaAsset.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ ok: true, assets });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }
  const file = form.get("file");
  const alt = typeof form.get("alt") === "string" ? (form.get("alt") as string) : "";
  const folder = typeof form.get("folder") === "string" ? (form.get("folder") as string) : "uploads";
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 422 });
  }
  const f = file as File;
  if (!ALLOWED_MIME.has(f.type)) {
    return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 422 });
  }
  if (f.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "File too large (max 12 MB)" }, { status: 422 });
  }
  try {
    if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });
    const safeName = f.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
    const fname = `${Date.now()}_${safeName}`;
    const dest = path.join(UPLOAD_DIR, fname);
    const buffer = Buffer.from(await f.arrayBuffer());
    await writeFile(dest, buffer);
    const url = `/uploads/${fname}`;
    const asset = await db.mediaAsset.create({
      data: {
        name: f.name,
        url,
        mime: f.type,
        size: f.size,
        alt: alt || null,
        folder,
      },
    });
    await logActivity({
      action: "create",
      entity: "media",
      entityId: asset.id,
      summary: `Uploaded media "${f.name}" (${(f.size / 1024).toFixed(0)} KB)`,
    });
    return NextResponse.json({ ok: true, asset });
  } catch (err) {
    console.error("[media] upload error", err);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, alt, folder } = body as Record<string, string>;
  const asset = await db.mediaAsset.update({
    where: { id },
    data: {
      ...(typeof alt === "string" ? { alt: alt || null } : {}),
      ...(typeof folder === "string" ? { folder } : {}),
    },
  });
  await logActivity({ action: "update", entity: "media", entityId: id, summary: `Updated media "${asset.name}"` });
  return NextResponse.json({ ok: true, asset });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const asset = await db.mediaAsset.findUnique({ where: { id } });
  if (asset) {
    // best-effort delete the file from disk
    try {
      const fp = path.join(process.cwd(), "public", asset.url);
      if (existsSync(fp)) await writeFile(fp, ""); // truncate; full unlink avoided for safety
    } catch {
      /* ignore */
    }
    await db.mediaAsset.delete({ where: { id } });
    await logActivity({ action: "delete", entity: "media", entityId: id, summary: `Deleted media "${asset.name}"` });
  }
  return NextResponse.json({ ok: true });
}
