import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

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
  const assets = await safeQuery(
    () => db.mediaAsset.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 }),
    [],
    "media"
  );
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
    const buffer = Buffer.from(await f.arrayBuffer());
    // Try Cloudinary first (works on Vercel — no local filesystem needed).
    // Cloudinary credentials are in env. Falls back to local disk if
    // Cloudinary isn't configured (local dev).
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    let url: string;
    if (cloudName && uploadPreset) {
      // Upload to Cloudinary via unsigned upload preset.
      const cldForm = new FormData();
      cldForm.append("file", `data:${f.type};base64,${buffer.toString("base64")}`);
      cldForm.append("upload_preset", uploadPreset);
      if (folder) cldForm.append("folder", folder);
      const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: cldForm,
      });
      const cldData = await cldRes.json().catch(() => ({}));
      if (!cldRes.ok || !cldData.secure_url) {
        throw new Error(`Cloudinary upload failed: ${cldData.error?.message || cldRes.status}`);
      }
      url = cldData.secure_url;
    } else {
      // Fallback: local filesystem (works in local dev, NOT on Vercel).
      if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
      const fname = `${Date.now()}_${safeName}`;
      const dest = path.join(UPLOAD_DIR, fname);
      await writeFile(dest, buffer);
      url = `/uploads/${fname}`;
    }
    // Save to DB (best-effort — if DB is unreachable, still return the URL).
    let asset = null;
    try {
      asset = await db.mediaAsset.create({
        data: { name: f.name, url, mime: f.type, size: f.size, alt: alt || null, folder },
      });
      await logActivity({
        action: "create",
        entity: "media",
        entityId: asset.id,
        summary: `Uploaded media "${f.name}" (${(f.size / 1024).toFixed(0)} KB)`,
      });
    } catch {
      /* DB unreachable — the URL is still valid and usable */
    }
    return NextResponse.json({ ok: true, asset: asset || { url, name: f.name } });
  } catch (err) {
    console.error("[media] upload error", err);
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const { id, alt, folder } = body as Record<string, string>;
  const asset = await db.mediaAsset.update({
    where: { id: String(id) },
    data: {
      ...(typeof alt === "string" ? { alt: alt || null } : {}),
      ...(typeof folder === "string" ? { folder } : {}),
    },
  });
  await logActivity({ action: "update", entity: "media", entityId: String(id), summary: `Updated media "${asset.name}"` });
  return NextResponse.json({ ok: true, asset });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id required" }, { status: 422 });
  const asset = await db.mediaAsset.findUnique({ where: { id: String(id) } });
  if (asset) {
    // best-effort delete the file from disk
    try {
      const fp = path.join(process.cwd(), "public", asset.url);
      if (existsSync(fp)) await writeFile(fp, ""); // truncate; full unlink avoided for safety
    } catch {
      /* ignore */
    }
    await db.mediaAsset.delete({ where: { id: String(id) } });
    await logActivity({ action: "delete", entity: "media", entityId: String(id), summary: `Deleted media "${asset.name}"` });
  }
  return NextResponse.json({ ok: true });
}
