import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type ContactPayload = {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  need?: string;
  message?: string;
};

function isString(v: unknown): v is string {
  return typeof v === "string";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as ContactPayload | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const fullName = isString(body.fullName) ? body.fullName.trim() : "";
    const workEmail = isString(body.workEmail) ? body.workEmail.trim() : "";
    const phone = isString(body.phone) ? body.phone.trim() : "";
    const company = isString(body.company) ? body.company.trim() : "";
    const need = isString(body.need) ? body.need.trim() : "";
    const message = isString(body.message) ? body.message.trim() : "";

    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = "Full name is required.";
    if (!workEmail) {
      errors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      errors.workEmail = "Please enter a valid email address.";
    }
    if (!company) errors.company = "Company is required.";
    if (!need) errors.need = "Please select what you need.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, error: "Please fix the highlighted fields." },
        { status: 422 }
      );
    }

    // Persist to the CMS so the admin panel can list/manage it.
    try {
      await db.contactQuery.create({
        data: {
          name: fullName,
          email: workEmail,
          phone: phone || null,
          company: company || null,
          need: need || null,
          message: message || null,
          source: "contact",
          status: "new",
        },
      });
    } catch (dbErr) {
      // Non-fatal — the inquiry still succeeds even if DB write fails.
      console.error("[contact] db write failed", dbErr);
    }

    // Auto-create a Lead in the CRM pipeline so contact form submissions
    // appear in the Lead CRM tab automatically.
    try {
      await db.lead.create({
        data: {
          name: fullName,
          email: workEmail,
          phone: phone || null,
          company: company || null,
          source: "website",
          stage: "new",
          value: null,
          notes: message ? `${need ? `[${need}] ` : ""}${message}` : need || null,
          tags: need || null,
          owner: null,
        },
      });
    } catch (dbErr) {
      // Non-fatal.
      console.error("[contact] lead creation failed", dbErr);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thanks — a senior engineer will review your brief within 4 business hours.",
      inquiry: { fullName, workEmail, company, need },
    });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
