import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { logActivity } from "@/lib/admin-activity";
import { safeQuery } from "@/lib/admin-safe-query";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const products = await safeQuery(
    () => db.product.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] }),
    [],
    "products"
  );
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.name) return NextResponse.json({ ok: false, error: "name is required" }, { status: 422 });
  try {
    const product = await db.product.create({
      data: {
        name: String(body.name),
        logo: String(body.logo || ""),
        description: String(body.description || ""),
        buttonText: String(body.buttonText || "Visit Site"),
        url: String(body.url || ""),
        order: Number(body.order) || 0,
        active: body.active !== false,
      },
    });
    try { await logActivity({ action: "create", entity: "product", entityId: product.id, summary: `Created product: ${body.name}` }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    console.error("[products] POST error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not create product.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  const { id, name, logo, description, buttonText, url, order, active } = body as Record<string, unknown>;
  try {
    const product = await db.product.update({
      where: { id: String(id) },
      data: {
        ...(name ? { name: String(name) } : {}),
        ...(typeof logo === "string" ? { logo } : {}),
        ...(typeof description === "string" ? { description } : {}),
        ...(typeof buttonText === "string" ? { buttonText } : {}),
        ...(typeof url === "string" ? { url } : {}),
        ...(typeof order === "number" ? { order } : {}),
        ...(typeof active === "boolean" ? { active } : {}),
      },
    });
    try { await logActivity({ action: "update", entity: "product", entityId: product.id, summary: `Updated product: ${product.name}` }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    console.error("[products] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not update product.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  try {
    await db.product.delete({ where: { id: String(id) } });
    try { await logActivity({ action: "delete", entity: "product", entityId: String(id), summary: "Deleted product" }); } catch { /* ignore */ }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[products] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Database error — could not delete product.", detail: err instanceof Error ? err.message : String(err) }, { status: 503 });
  }
}
