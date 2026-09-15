import { NextRequest, NextResponse } from "next/server";

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

    // In a production deployment this would persist to the database and/or
    // dispatch an email/Slack notification. Here we log and return success.
    console.log("[contact] new inquiry", {
      fullName,
      workEmail,
      phone,
      company,
      need,
      message,
      at: new Date().toISOString(),
    });

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
