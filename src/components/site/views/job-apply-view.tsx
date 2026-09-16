"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  Loader2,
  PartyPopper,
  ShieldCheck,
  User,
  Phone,
  GraduationCap,
  Briefcase,
  Settings,
  ClipboardList,
} from "lucide-react";
import { JOBS, type NavView } from "@/lib/site-data";
import { Reveal } from "@/components/site/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Icon3D } from "@/components/site/icon-3d";

type JobApplyViewProps = {
  preselectedJobSlug?: string;
  onNavigate: (v: NavView) => void;
};

// The 7 wizard steps — mirror the onboarding form sections from the PDF.
const STEPS = [
  { id: 0, title: "Identity", icon: User, emoji: "🪪" },
  { id: 1, title: "Contact", icon: Phone, emoji: "📞" },
  { id: 2, title: "Academic", icon: GraduationCap, emoji: "🎓" },
  { id: 3, title: "Employment", icon: Briefcase, emoji: "💼" },
  { id: 4, title: "Logistics", icon: Settings, emoji: "⚙️" },
  { id: 5, title: "Documents", icon: Upload, emoji: "📎" },
  { id: 6, title: "Declarations", icon: ClipboardList, emoji: "✍️" },
];

const FILE_SLOTS = [
  { name: "cv", label: "Updated CV", required: true, hint: "PDF preferred", emoji: "📄" },
  { name: "photo", label: "Candidate Photo", required: true, hint: "Clear, well-lit, no filters", emoji: "🤳" },
  { name: "certificates", label: "Educational Certificates / Transcripts", required: false, hint: "Combined PDF preferred", emoji: "📜" },
  { name: "cnicFront", label: "CNIC / Passport — Front", required: true, hint: "High-res scan", emoji: "🪪" },
  { name: "cnicBack", label: "CNIC / Passport — Back", required: true, hint: "High-res scan", emoji: "🪪" },
] as const;

type FileState = { file: File | null; error?: string };

const EMPTY_FILES: Record<string, FileState> = Object.fromEntries(
  FILE_SLOTS.map((s) => [s.name, { file: null }])
);

export function JobApplyView({ preselectedJobSlug, onNavigate }: JobApplyViewProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const preselectedJob = useMemo(
    () => JOBS.find((j) => j.slug === preselectedJobSlug),
    [preselectedJobSlug]
  );

  const [form, setForm] = useState<Record<string, string>>({
    jobId: preselectedJob?.slug ?? "",
    positionType: preselectedJob?.type === "Internship" ? "Internship" : "Full-Time",
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    mobile: "",
    emergencyContact: "",
    primaryEmail: "",
    skills: "",
    linkedin: "",
    portfolio: "",
    education: "",
    prevExperience: "",
    workHistory: "",
    lastSalary: "",
    reasonForLeaving: "",
    startTime: "",
    dailyHours: "",
    internetType: "",
    joiningDate: "",
    workstation: "",
    mobileDevice: "",
    careerGoal: "",
    employmentTimeline: "",
    shiftType: "",
    availability: "",
    whyClickTake: "",
    prevEmployers: "",
    referralSource: "",
    additionalComments: "",
    termsAccepted: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, FileState>>(EMPTY_FILES);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = "Required";
      if (!form.email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
      if (!form.gender) e.gender = "Required";
      if (!form.dob.trim()) e.dob = "Required";
      if (!form.address.trim()) e.address = "Required";
    }
    if (s === 1) {
      if (!form.mobile.trim()) e.mobile = "Required";
      if (!form.emergencyContact.trim()) e.emergencyContact = "Required";
    }
    if (s === 2) {
      if (!form.jobId) e.jobId = "Select a position";
      if (!form.positionType) e.positionType = "Required";
      if (!form.skills.trim()) e.skills = "List your core skills";
      if (!form.education.trim()) e.education = "Required";
    }
    if (s === 5) {
      const fe: Record<string, string> = {};
      for (const slot of FILE_SLOTS) {
        if (slot.required && !files[slot.name].file) {
          fe[slot.name] = "This document is required.";
        }
      }
      if (Object.keys(fe).length) {
        setFiles((prev) => {
          const next = { ...prev };
          for (const [k, v] of Object.entries(fe)) next[k] = { ...next[k], error: v };
          return next;
        });
        return false;
      }
    }
    if (s === 6) {
      if (form.termsAccepted !== "yes") e.termsAccepted = "You must accept the terms to submit.";
    }
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onFileChange = (name: string, f: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [name]: { file: f, error: f ? undefined : prev[name].error },
    }));
  };

  const submit = async () => {
    if (!validateStep(STEPS.length - 1)) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      // text fields
      for (const [k, v] of Object.entries(form)) fd.append(k, v);
      // files
      for (const slot of FILE_SLOTS) {
        const f = files[slot.name].file;
        if (f) fd.append(slot.name, f, f.name);
      }

      const res = await fetch("/api/job-apply", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data?.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors }));
          if (data.errors.jobId) setStep(2);
        }
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
      toast({
        title: "Application received",
        description: `We'll review your documents and respond within 4 business hours.`,
      });
    } catch (err) {
      toast({
        title: "Could not submit",
        description:
          err instanceof Error ? err.message : "Please try again or email hr@clicktaketech.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm((f) => ({
      ...Object.fromEntries(Object.keys(f).map((k) => [k, ""])),
      positionType: "Internship",
    }));
    setFiles(EMPTY_FILES);
    setErrors({});
    setStep(0);
    setDone(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Intern Onboarding &amp; Identity Verification
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Apply to join <span className="text-gradient-brand">ClickTake.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Complete every field accurately. All uploaded documents must be 100% authentic —
              fake, digitally altered, or blurred documents result in immediate disqualification
              and a permanent ban from all future ClickTake opportunities.
            </p>
          </Reveal>
          {preselectedJob && (
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
                <Icon3D emoji="🎯" size="md" variant="brand" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-400">
                    Applying for
                  </div>
                  <div className="text-base font-semibold">{preselectedJob.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {preselectedJob.location} · {preselectedJob.type} · {preselectedJob.department}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white animate-pulse-ring">
                  <PartyPopper className="h-8 w-8" />
                </span>
                <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                  Application received
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Thanks — our HR team will rigorously verify your documents and respond within 4
                  business hours. Keep an eye on your inbox (and spam folder) for{" "}
                  <span className="text-blue-400">hr@clicktaketech.com</span>.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onNavigate("careers")}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                  >
                    Back to open roles
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Submit another application
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Stepper */}
                <div className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-2">
                  {STEPS.map((s) => (
                    <div key={s.id} className="flex flex-1 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (s.id < step) setStep(s.id);
                        }}
                        disabled={s.id > step}
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                          s.id < step && "bg-brand-gradient text-white",
                          s.id === step && "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/40",
                          s.id > step && "bg-white/5 text-muted-foreground"
                        )}
                      >
                        {s.id < step ? <Check className="h-4 w-4" /> : s.id + 1}
                      </button>
                      <span
                        className={cn(
                          "hidden text-xs font-medium sm:block",
                          s.id === step ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                      {s.id < STEPS.length - 1 && (
                        <div
                          className={cn(
                            "h-px flex-1 transition-colors",
                            s.id < step ? "bg-blue-500" : "bg-border/60"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form card */}
                <div className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22 }}
                    >
                      {step === 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Full Legal Name (as on CNIC/Passport)" error={errors.fullName} required>
                            <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jane Doe" className="bg-background/50" />
                          </Field>
                          <Field label="Email" error={errors.email} required>
                            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" className="bg-background/50" />
                          </Field>
                          <Field label="Gender" error={errors.gender} required>
                            <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
                              <option value="">Select…</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </Field>
                          <Field label="Date of Birth (DD/MM/YYYY)" error={errors.dob} required>
                            <Input value={form.dob} onChange={(e) => set("dob", e.target.value)} placeholder="07/01/2019" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Current Residential Address" error={errors.address} required>
                              <Textarea value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Full address" rows={2} className="resize-none bg-background/50" />
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Mobile Number (WhatsApp preferred)" error={errors.mobile} required>
                            <Input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+44 …" className="bg-background/50" />
                          </Field>
                          <Field label="Primary Email Address" error={errors.primaryEmail}>
                            <Input type="email" value={form.primaryEmail} onChange={(e) => set("primaryEmail", e.target.value)} placeholder="(defaults to email above)" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Emergency Contact (name + number)" error={errors.emergencyContact} required>
                              <Input value={form.emergencyContact} onChange={(e) => set("emergencyContact", e.target.value)} placeholder="John Doe — +44 7…" className="bg-background/50" />
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field label="Interested Position" error={errors.jobId} required>
                              <select value={form.jobId} onChange={(e) => set("jobId", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
                                <option value="">Select a role…</option>
                                {JOBS.map((j) => (
                                  <option key={j.slug} value={j.slug}>
                                    {j.title} — {j.location}
                                  </option>
                                ))}
                                <option value="general">General application (no specific role)</option>
                              </select>
                            </Field>
                          </div>
                          <Field label="Position Type" error={errors.positionType} required>
                            <div className="flex gap-2">
                              {["Internship", "Full-Time"].map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => set("positionType", p)}
                                  className={cn(
                                    "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                                    form.positionType === p
                                      ? "border-blue-500/60 bg-blue-500/10 text-foreground ring-1 ring-blue-500/40"
                                      : "border-border/50 bg-background/40 text-muted-foreground hover:border-blue-500/30"
                                  )}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </Field>
                          <Field label="Highest Education (incl. institution)" error={errors.education} required>
                            <Input value={form.education} onChange={(e) => set("education", e.target.value)} placeholder="BSc Computer Science — University of …" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Primary Skills &amp; Expertise" error={errors.skills} required>
                              <Textarea value={form.skills} onChange={(e) => set("skills", e.target.value)} placeholder="React, TypeScript, Python, Figma, SEO…" rows={3} className="resize-none bg-background/50" />
                            </Field>
                          </div>
                          <Field label="LinkedIn Profile Link" error={errors.linkedin}>
                            <Input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" className="bg-background/50" />
                          </Field>
                          <Field label="Portfolio Link (GitHub / Behance / Website)" error={errors.portfolio}>
                            <Input value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="https://…" className="bg-background/50" />
                          </Field>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Previous Work Experience (total years/months)" error={errors.prevExperience}>
                            <Input value={form.prevExperience} onChange={(e) => set("prevExperience", e.target.value)} placeholder="3 years 2 months" className="bg-background/50" />
                          </Field>
                          <Field label="Last Drawn Salary / Stipend" error={errors.lastSalary}>
                            <Input value={form.lastSalary} onChange={(e) => set("lastSalary", e.target.value)} placeholder="N/A if not applicable" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Work History Details (companies, roles, responsibilities)" error={errors.workHistory}>
                              <Textarea value={form.workHistory} onChange={(e) => set("workHistory", e.target.value)} rows={4} placeholder="Acme Corp — Frontend Engineer (2022-2024)…" className="resize-none bg-background/50" />
                            </Field>
                          </div>
                          <div className="sm:col-span-2">
                            <Field label="Reason for Leaving Previous Role" error={errors.reasonForLeaving}>
                              <Input value={form.reasonForLeaving} onChange={(e) => set("reasonForLeaving", e.target.value)} placeholder="Career growth / relocation…" className="bg-background/50" />
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Preferred Daily Start Time (fixed shift)" error={errors.startTime}>
                            <Input value={form.startTime} onChange={(e) => set("startTime", e.target.value)} placeholder="8:30 a.m." className="bg-background/50" />
                          </Field>
                          <Field label="Total Daily Working Hours (commitment)" error={errors.dailyHours}>
                            <Input value={form.dailyHours} onChange={(e) => set("dailyHours", e.target.value)} placeholder="8 hours/day" className="bg-background/50" />
                          </Field>
                          <Field label="Internet Connectivity (type &amp; speed)" error={errors.internetType}>
                            <Input value={form.internetType} onChange={(e) => set("internetType", e.target.value)} placeholder="Fiber, 50 Mbps" className="bg-background/50" />
                          </Field>
                          <Field label="Earliest Possible Joining Date" error={errors.joiningDate}>
                            <Input value={form.joiningDate} onChange={(e) => set("joiningDate", e.target.value)} placeholder="07/01/2026" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Workstation / Laptop Specs (brand, model, CPU, RAM)" error={errors.workstation}>
                              <Input value={form.workstation} onChange={(e) => set("workstation", e.target.value)} placeholder="Dell XPS 15 — i7, 16GB RAM" className="bg-background/50" />
                            </Field>
                          </div>
                          <Field label="Mobile Device Model (brand + model)" error={errors.mobileDevice}>
                            <Input value={form.mobileDevice} onChange={(e) => set("mobileDevice", e.target.value)} placeholder="iPhone 14 / Samsung S23" className="bg-background/50" />
                          </Field>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            High-resolution scans of original documents. Digitally altered, blurred,
                            or fake documents will result in immediate disqualification.
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {FILE_SLOTS.map((slot) => (
                              <FileDrop
                                key={slot.name}
                                label={slot.label}
                                hint={slot.hint}
                                required={slot.required}
                                emoji={slot.emoji}
                                state={files[slot.name]}
                                onChange={(f) => onFileChange(slot.name, f)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 6 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Career Goal — next 12 months" error={errors.careerGoal}>
                            <select value={form.careerGoal} onChange={(e) => set("careerGoal", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
                              <option value="">Select…</option>
                              <option>I want to Learn More</option>
                              <option>Grow My Skill</option>
                              <option>Hands on Practice</option>
                              <option>Earning main goal</option>
                              <option>Other</option>
                            </select>
                          </Field>
                          <Field label="Employment Timeline (summary of durations)" error={errors.employmentTimeline}>
                            <Input value={form.employmentTimeline} onChange={(e) => set("employmentTimeline", e.target.value)} placeholder="Jan 2026 – Dec 2026" className="bg-background/50" />
                          </Field>
                          <Field label="Daily Shift Preference" error={errors.shiftType}>
                            <select value={form.shiftType} onChange={(e) => set("shiftType", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
                              <option value="">Select…</option>
                              <option>Fixed Time</option>
                              <option>Flexible</option>
                            </select>
                          </Field>
                          <Field label="General Availability (constraints)" error={errors.availability}>
                            <Input value={form.availability} onChange={(e) => set("availability", e.target.value)} placeholder="Weekends only / no night shifts…" className="bg-background/50" />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Why ClickTake Technologies?" error={errors.whyClickTake}>
                              <Textarea value={form.whyClickTake} onChange={(e) => set("whyClickTake", e.target.value)} rows={3} placeholder="What motivates you to join us?" className="resize-none bg-background/50" />
                            </Field>
                          </div>
                          <Field label="Previous Employers (names + role overview)" error={errors.prevEmployers}>
                            <Textarea value={form.prevEmployers} onChange={(e) => set("prevEmployers", e.target.value)} rows={2} className="resize-none bg-background/50" />
                          </Field>
                          <Field label="Referral Source" error={errors.referralSource}>
                            <select value={form.referralSource} onChange={(e) => set("referralSource", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
                              <option value="">Select…</option>
                              <option>Google</option>
                              <option>Facebook</option>
                              <option>LinkedIn</option>
                              <option>Bing</option>
                              <option>Friend or Family</option>
                              <option>Sports Gala</option>
                              <option>Other</option>
                            </select>
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Additional Comments" error={errors.additionalComments}>
                              <Textarea value={form.additionalComments} onChange={(e) => set("additionalComments", e.target.value)} rows={3} className="resize-none bg-background/50" />
                            </Field>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-4">
                              <input
                                type="checkbox"
                                checked={form.termsAccepted === "yes"}
                                onChange={(e) => set("termsAccepted", e.target.checked ? "yes" : "")}
                                className="mt-0.5 h-4 w-4 accent-blue-500"
                              />
                              <span className="text-sm text-muted-foreground">
                                I confirm I have read and understood the company rules, and that all
                                information and documents I&apos;ve provided are 100% authentic. I
                                understand submission of fake or altered documents results in
                                immediate disqualification and a permanent ban.
                              </span>
                            </label>
                            {errors.termsAccepted && (
                              <p className="mt-1 text-xs text-red-400">{errors.termsAccepted}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={step === 0}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={next}
                        className="group inline-flex items-center gap-1.5 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_-4px] hover:shadow-blue-500/60"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        onClick={submit}
                        disabled={submitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_-4px] hover:shadow-blue-500/60 disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                          </>
                        ) : (
                          <>
                            Submit application
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Support footer */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Need help? Email{" "}
                  <a href="mailto:hr@clicktaketech.com" className="text-blue-400 hover:underline">
                    hr@clicktaketech.com
                  </a>{" "}
                  · WhatsApp{" "}
                  <a href="https://wa.me/447391653377" className="text-blue-400 hover:underline">
                    +44 7391 653377
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function FileDrop({
  label,
  hint,
  required,
  emoji,
  state,
  onChange,
}: {
  label: string;
  hint: string;
  required?: boolean;
  emoji: string;
  state: FileState;
  onChange: (f: File | null) => void;
}) {
  return (
    <div>
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <div className="mt-1.5">
        {state.file ? (
          <div className="flex items-center gap-3 rounded-xl border border-blue-500/40 bg-blue-500/5 p-3">
            <Icon3D emoji={emoji} size="sm" variant="brand" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{state.file.name}</div>
              <div className="text-xs text-muted-foreground">
                {(state.file.size / 1024).toFixed(0)} KB · {state.file.type || "file"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/15 hover:text-red-400"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition-colors",
              state.error
                ? "border-red-500/50 bg-red-500/5"
                : "border-border/60 bg-background/40 hover:border-blue-500/50 hover:bg-blue-500/5"
            )}
          >
            <Icon3D emoji={emoji} size="sm" variant="neutral" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Upload className="h-3.5 w-3.5 text-blue-400" />
                Click to upload
              </div>
              <div className="text-xs text-muted-foreground">{hint}</div>
            </div>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
      </div>
      {state.error && <p className="mt-1 text-xs text-red-400">{state.error}</p>}
    </div>
  );
}
