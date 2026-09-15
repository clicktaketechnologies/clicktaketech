"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Loader2,
  PartyPopper,
} from "lucide-react";
import {
  CONTACT_METHODS,
  NEXT_STEPS,
  OFFICES,
  PROJECT_NEEDS,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "@/components/site/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  need: string;
  message: string;
};

const EMPTY: FormState = {
  fullName: "",
  workEmail: "",
  phone: "",
  company: "",
  need: "",
  message: "",
};

export function ContactView() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = (s: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = "Required";
      if (!form.workEmail.trim()) e.workEmail = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail))
        e.workEmail = "Invalid email";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.company.trim()) e.company = "Required";
    }
    if (s === 1) {
      if (!form.need) e.need = "Please select an option";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
      toast({
        title: "Inquiry received",
        description:
          "A senior engineer will review your brief within 4 business hours.",
      });
    } catch (err) {
      toast({
        title: "Could not submit",
        description:
          err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStep(0);
    setDone(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Contact · Free 30-min Consult
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="text-gradient-brand">extraordinary.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Three short steps. Pick a slot. A senior engineer (not a salesperson) joins the call
              with a draft architecture for your use case. Average response time: under 4 hours
              during business days.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Form card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 lg:p-10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white animate-pulse-ring">
                      <PartyPopper className="h-8 w-8" />
                    </span>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                      Inquiry received
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Thanks {form.fullName.split(" ")[0] || "there"} — a senior engineer will
                      review your brief and respond within 4 business hours. We&apos;ll bring a
                      draft architecture and a ballpark estimate to the call.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-7 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                        Tell us about your project
                      </h2>
                      <span className="text-xs text-muted-foreground">
                        Step {step + 1} of 3
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="mt-5 flex items-center gap-2">
                      {[0, 1, 2].map((s) => (
                        <div key={s} className="flex flex-1 items-center gap-2">
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                              s < step && "bg-blue-500 text-white",
                              s === step && "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/40",
                              s > step && "bg-white/5 text-muted-foreground"
                            )}
                          >
                            {s < step ? <Check className="h-4 w-4" /> : s + 1}
                          </div>
                          {s < 2 && (
                            <div
                              className={cn(
                                "h-px flex-1 transition-colors",
                                s < step ? "bg-blue-500" : "bg-border/60"
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Step content */}
                    <div className="mt-8">
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                          <motion.div
                            key="s0"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.25 }}
                            className="grid gap-4 sm:grid-cols-2"
                          >
                            <Field label="Full Name" error={errors.fullName} required>
                              <Input
                                value={form.fullName}
                                onChange={(e) => set("fullName", e.target.value)}
                                placeholder="Jane Doe"
                                className="bg-background/50"
                              />
                            </Field>
                            <Field label="Work Email" error={errors.workEmail} required>
                              <Input
                                type="email"
                                value={form.workEmail}
                                onChange={(e) => set("workEmail", e.target.value)}
                                placeholder="jane@company.com"
                                className="bg-background/50"
                              />
                            </Field>
                            <Field label="Phone / WhatsApp" error={errors.phone} required>
                              <Input
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                placeholder="+44 ..."
                                className="bg-background/50"
                              />
                            </Field>
                            <Field label="Company" error={errors.company} required>
                              <Input
                                value={form.company}
                                onChange={(e) => set("company", e.target.value)}
                                placeholder="Company Ltd"
                                className="bg-background/50"
                              />
                            </Field>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div
                            key="s1"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Label className="text-sm font-medium">
                              What do you need? <span className="text-red-400">*</span>
                            </Label>
                            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                              {PROJECT_NEEDS.map((need) => (
                                <button
                                  key={need}
                                  type="button"
                                  onClick={() => set("need", need)}
                                  className={cn(
                                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                                    form.need === need
                                      ? "border-blue-500/60 bg-blue-500/10 text-foreground ring-1 ring-blue-500/40"
                                      : "border-border/50 bg-background/40 text-muted-foreground hover:border-blue-500/30 hover:text-foreground"
                                  )}
                                >
                                  {need}
                                  {form.need === need && (
                                    <Check className="h-4 w-4 text-blue-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                            {errors.need && (
                              <p className="mt-2 text-xs text-red-400">{errors.need}</p>
                            )}
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="s2"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                          >
                            <Field label="Project details (optional)">
                              <Textarea
                                value={form.message}
                                onChange={(e) => set("message", e.target.value)}
                                placeholder="Tell us about your timeline, budget range, and what success looks like..."
                                rows={5}
                                className="resize-none bg-background/50"
                              />
                            </Field>
                            {/* Summary */}
                            <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Summary
                              </h4>
                              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                                <div className="flex justify-between gap-2">
                                  <dt className="text-muted-foreground">Name</dt>
                                  <dd className="font-medium">{form.fullName || "—"}</dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-muted-foreground">Email</dt>
                                  <dd className="truncate font-medium">
                                    {form.workEmail || "—"}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-muted-foreground">Company</dt>
                                  <dd className="font-medium">{form.company || "—"}</dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-muted-foreground">Need</dt>
                                  <dd className="font-medium text-blue-400">
                                    {form.need || "—"}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={back}
                        disabled={step === 0}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-blue-500/40 hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      {step < 2 ? (
                        <button
                          onClick={next}
                          className="group inline-flex items-center gap-1.5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_24px_-4px] hover:shadow-blue-500/60"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ) : (
                        <button
                          onClick={submit}
                          disabled={submitting}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_24px_-4px] hover:shadow-blue-500/60 disabled:opacity-60"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                            </>
                          ) : (
                            <>
                              Submit inquiry
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Right column: direct contact + next steps */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card/40 p-6">
                <h3 className="text-lg font-semibold">Direct contact</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prefer email? Reach out directly — we read every message.
                </p>
                <div className="mt-5 space-y-3">
                  {CONTACT_METHODS.map((m) => (
                    <a
                      key={m.label}
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all hover:border-blue-500/40 hover:bg-card"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <m.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                        <div className="truncate text-sm font-medium">{m.value}</div>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400" />
                    </a>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-background/40 p-3 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-400" />
                  Remote-first · Global team across 4 offices
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/50 bg-card/40 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Clock className="h-4 w-4 text-blue-400" /> What happens next?
                </h3>
                <ol className="mt-5 space-y-4">
                  {NEXT_STEPS.map((s) => (
                    <li key={s.num} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400 ring-1 ring-blue-500/20">
                        {s.num}
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{s.title}</div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Offices strip */}
      <Section className="border-t border-border/40 pt-0">
        <SectionHeading
          eyebrow="Global Presence"
          title={
            <>
              Four offices, <span className="text-gradient-brand">18-hour workdays.</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
                <div className="text-4xl">{o.flag}</div>
                <h3 className="mt-3 text-base font-semibold">{o.city}</h3>
                <p className="text-xs text-muted-foreground">{o.country}</p>
                <span className="mt-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">
                  {o.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
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
