import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

// Allowed document upload slots — matches the onboarding form in the PDF.
const FILE_FIELDS = [
  "cv",
  "photo",
  "certificates",
  "cnicFront",
  "cnicBack",
] as const;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB per file

const UPLOAD_ROOT = path.join(
  process.cwd(),
  "upload",
  "applications"
);

function sanitizeFileName(name: string): string {
  // Keep only safe chars; collapse spaces/dots.
  return name
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 80);
}

function requireString(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form data. Please submit a multipart form." },
      { status: 400 }
    );
  }

  // ---- Required text fields ----
  const fullName = requireString(form.get("fullName"));
  const email = requireString(form.get("email"));
  const mobile = requireString(form.get("mobile"));
  const jobId = requireString(form.get("jobId"));
  const positionType = requireString(form.get("positionType")); // Internship | Full-Time

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Full legal name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (!mobile) errors.mobile = "Mobile number is required.";
  if (!jobId) errors.jobId = "Please select a position to apply for.";
  if (!positionType)
    errors.positionType = "Please choose Internship or Full-Time.";

  // ---- File validation ----
  const fileErrors: Record<string, string> = {};
  const savedFiles: Record<string, { originalName: string; savedAs: string; size: number }> = {};

  for (const field of FILE_FIELDS) {
    const file = form.get(field);
    if (!file || typeof file === "string") {
      // CV and photo are mandatory per the onboarding form; others optional.
      if (field === "cv" || field === "photo" || field === "cnicFront" || field === "cnicBack") {
        fileErrors[field] = "This document is required.";
      }
      continue;
    }
    const f = file as File;
    if (!ALLOWED_MIME.has(f.type)) {
      fileErrors[field] = "Unsupported file type. Use PDF, PNG, JPG or WEBP.";
      continue;
    }
    if (f.size > MAX_FILE_BYTES) {
      fileErrors[field] = "File too large (max 8 MB).";
      continue;
    }
    savedFiles[field] = {
      originalName: f.name,
      savedAs: "",
      size: f.size,
    };
  }

  const allErrors = { ...errors, ...fileErrors };
  if (Object.keys(allErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        errors: allErrors,
      },
      { status: 422 }
    );
  }

  // ---- Persist uploaded files to disk ----
  // Folder: upload/applications/<timestamp>_<sanitised-name>/
  const folderName = `${Date.now()}_${sanitizeFileName(fullName)}`;
  const folderPath = path.join(UPLOAD_ROOT, folderName);
  try {
    if (!existsSync(UPLOAD_ROOT)) await mkdir(UPLOAD_ROOT, { recursive: true });
    await mkdir(folderPath, { recursive: true });

    for (const field of FILE_FIELDS) {
      const meta = savedFiles[field];
      if (!meta) continue;
      const file = form.get(field) as File;
      const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".jpg");
      const savedAs = `${field}${ext}`;
      const dest = path.join(folderPath, savedAs);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(dest, buffer);
      meta.savedAs = savedAs;
    }
  } catch (err) {
    console.error("[job-apply] file save error", err);
    return NextResponse.json(
      { ok: false, error: "Could not save uploaded files. Please try again." },
      { status: 500 }
    );
  }

  // ---- Capture the full application record (text fields) ----
  const record: Record<string, string> = {
    jobId,
    positionType,
    fullName,
    email,
    mobile,
    gender: requireString(form.get("gender")),
    dob: requireString(form.get("dob")),
    address: requireString(form.get("address")),
    emergencyContact: requireString(form.get("emergencyContact")),
    primaryEmail: requireString(form.get("primaryEmail")) || email,
    skills: requireString(form.get("skills")),
    linkedin: requireString(form.get("linkedin")),
    portfolio: requireString(form.get("portfolio")),
    education: requireString(form.get("education")),
    prevExperience: requireString(form.get("prevExperience")),
    workHistory: requireString(form.get("workHistory")),
    lastSalary: requireString(form.get("lastSalary")),
    reasonForLeaving: requireString(form.get("reasonForLeaving")),
    startTime: requireString(form.get("startTime")),
    dailyHours: requireString(form.get("dailyHours")),
    internetType: requireString(form.get("internetType")),
    joiningDate: requireString(form.get("joiningDate")),
    workstation: requireString(form.get("workstation")),
    mobileDevice: requireString(form.get("mobileDevice")),
    careerGoal: requireString(form.get("careerGoal")),
    employmentTimeline: requireString(form.get("employmentTimeline")),
    shiftType: requireString(form.get("shiftType")),
    availability: requireString(form.get("availability")),
    whyClickTake: requireString(form.get("whyClickTake")),
    prevEmployers: requireString(form.get("prevEmployers")),
    referralSource: requireString(form.get("referralSource")),
    additionalComments: requireString(form.get("additionalComments")),
    termsAccepted: requireString(form.get("termsAccepted")),
    submittedAt: new Date().toISOString(),
    filesFolder: folderName,
    files: Object.entries(savedFiles)
      .map(([k, v]) => `${k}:${v.originalName}→${v.savedAs}(${v.size}b)`)
      .join(" | "),
  };

  console.log("[job-apply] new application", record);

  return NextResponse.json({
    ok: true,
    message: `Application received. We'll review your documents and respond within 4 business hours.`,
    applicationId: folderName,
    position: jobId,
    applicantName: fullName,
    email,
  });
}
