import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const tiers = await db.pricingTier.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, tiers });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  const { name, tagline, audience, price, cadence, popular, features, notIncluded, cta, status } = body as Record<string, unknown>;
  if (!name || !price) {
    return NextResponse.json({ ok: false, error: "name and price are required." }, { status: 422 });
  }
  const existing = await db.pricingTier.findUnique({ where: { name: String(name) } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "A tier with that name already exists." }, { status: 409 });
  }
  const tier = await db.pricingTier.create({
    data: {
      name: String(name),
      tagline: String(tagline ?? ""),
      audience: String(audience ?? ""),
      price: String(price),
      cadence: String(cadence ?? ""),
      popular: Boolean(popular),
      features: Array.isArray(features) ? (features as string[]).join("\n") : String(features ?? ""),
      notIncluded: Array.isArray(notIncluded) ? (notIncluded as string[]).join("\n") : (notIncluded ? String(notIncluded) : null),
      cta: String(cta ?? "Get started"),
      status: String(status ?? "published"),
    },
  });
  return NextResponse.json({ ok: true, tier });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  const { id, name, tagline, audience, price, cadence, popular, features, notIncluded, cta, status } = body as Record<string, unknown>;
  if (name) {
    const conflict = await db.pricingTier.findFirst({ where: { name: String(name), NOT: { id: String(id) } } });
    if (conflict) return NextResponse.json({ ok: false, error: "Name already in use." }, { status: 409 });
  }
  const tier = await db.pricingTier.update({
    where: { id: String(id) },
    data: {
      ...(name ? { name: String(name) } : {}),
      ...(typeof tagline === "string" ? { tagline } : {}),
      ...(typeof audience === "string" ? { audience } : {}),
      ...(typeof price === "string" ? { price } : {}),
      ...(typeof cadence === "string" ? { cadence } : {}),
      ...(typeof popular === "boolean" ? { popular } : {}),
      ...(typeof features !== "undefined" ? { features: Array.isArray(features) ? (features as string[]).join("\n") : String(features ?? "") } : {}),
      ...(typeof notIncluded !== "undefined" ? { notIncluded: Array.isArray(notIncluded) ? (notIncluded as string[]).join("\n") : (notIncluded ? String(notIncluded) : null) } : {}),
      ...(typeof cta === "string" ? { cta } : {}),
      ...(status ? { status: String(status) } : {}),
    },
  });
  return NextResponse.json({ ok: true, tier });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorizedResponse();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 422 });
  await db.pricingTier.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
