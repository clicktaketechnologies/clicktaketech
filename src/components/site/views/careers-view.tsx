"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Briefcase, Clock, ChevronDown, CheckCircle2 } from "lucide-react";
import { JOBS, CAREERS_PERKS, type NavView, type Job } from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type LiveJob = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
};

type CareersViewProps = {
  onNavigate: (v: NavView) => void;
  onApply?: (jobSlug: string) => void;
};

/**
 * Normalize a job from the API or the static JOBS list into a single shape
 * the UI can render — with fullDescription (paragraphs) and requirements (list).
 * Live jobs from the API only ship a `description` string, so we split it into
 * paragraphs on newlines and fall back to a single-paragraph array.
 */
function toUiJob(j: LiveJob | Job): {
  slug: string;
  title: string;
  location: string;
  type: string;
  department: string;
  desc: string;
  fullDescription: string[];
  requirements: string[];
} {
  // Live jobs from the API have a `description` field but no fullDescription /
  // requirements — synthesise a sensible shape from the description.
  if ("description" in j && !("fullDescription" in j)) {
    const live = j as LiveJob;
    const paragraphs = (live.description || live.title || "")
      .split(/\n{2,}|\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    return {
      slug: live.slug,
      title: live.title,
      location: live.location,
      type: live.type,
      department: live.department,
      desc:
        live.description && live.description.length > 0
          ? live.description.split(/\.\s/)[0]?.trim() + "."
          : "",
      fullDescription: paragraphs.length > 0 ? paragraphs : [live.description ?? ""],
      requirements: [],
    };
  }
  // Static JOBS already match the full shape.
  const s = j as Job;
  return {
    slug: s.slug,
    title: s.title,
    location: s.location,
    type: s.type,
    department: s.department,
    desc: s.desc,
    fullDescription: s.fullDescription,
    requirements: s.requirements,
  };
}

function JobCard({
  job,
  onApply,
  onNavigate,
}: {
  job: ReturnType<typeof toUiJob>;
  onApply?: (slug: string) => void;
  onNavigate: (v: NavView) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "group rounded-2xl border bg-card/40 transition-all",
        open ? "border-blue-500/40 bg-card/60" : "border-border/50 hover:border-blue-500/40 hover:bg-card/60",
      )}
    >
      {/* Header (always visible) */}
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
            <span className="rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[11px] font-medium text-pink-400">
              {job.department}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.desc}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-blue-400" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-blue-400" /> {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-400" /> Apply within 14 days
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-blue-500/40 hover:bg-background"
              aria-expanded={open}
              aria-controls={`job-desc-${job.slug}`}
            >
              {open ? "Hide details" : "View description"}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-blue-400 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
            </button>
          </CollapsibleTrigger>
          <button
            type="button"
            onClick={() => (onApply ? onApply(job.slug) : onNavigate("contact"))}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-pink-500/60"
          >
            Apply now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expandable detail */}
      <CollapsibleContent id={`job-desc-${job.slug}`} className="CollapsibleContent">
        <div className="border-t border-border/40 px-6 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Job summary chips */}
            <aside className="lg:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Role snapshot
              </h4>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Title</dt>
                  <dd className="text-right font-medium text-foreground">{job.title}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Department</dt>
                  <dd className="text-right font-medium text-foreground">{job.department}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="text-right font-medium text-foreground">{job.location}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="text-right font-medium text-foreground">{job.type}</dd>
                </div>
              </dl>
            </aside>

            {/* Full description + requirements */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                About the role
              </h4>
              <div className="mt-3 space-y-3">
                {job.fullDescription.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {job.requirements.length > 0 && (
                <>
                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What we look for
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-4">
                <p className="flex-1 text-sm text-muted-foreground">
                  Ready to apply? Send your CV, portfolio (or GitHub) and a short
                  note on a project you&apos;re proud of.
                </p>
                <button
                  type="button"
                  onClick={() => (onApply ? onApply(job.slug) : onNavigate("contact"))}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_18px_-4px] hover:shadow-pink-500/60"
                >
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CareersView({ onNavigate, onApply }: CareersViewProps) {
  const [jobs, setJobs] = useState<ReturnType<typeof toUiJob>[]>(
    JOBS.map((j) => toUiJob(j)),
  );

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs.map((j: LiveJob) => toUiJob(j)));
        }
      })
      .catch(() => {
        /* fallback to static JOBS */
      });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Careers · Join ClickTake
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build production software that{" "}
              <span className="text-gradient-brand">millions rely on.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We hire senior-first — engineers with 8+ years who&apos;ve already shipped to
              production. From week one, you&apos;ll work on systems handling 10M+ requests a day,
              with a UK-based account lead and a Pakistan-based tech lead who actually know what
              they&apos;re doing. Four offices (Birmingham, Multan, Austin, Dubai), remote-first,
              AI-native. No busywork, no juniors learning on your budget.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
        </div>
      </section>

      {/* Perks */}
      <Section className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAREERS_PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_0_18px_-4px] shadow-blue-500/50">
                  <perk.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open roles */}
      <Section className="border-t border-border/40">
        <SectionHeading
          eyebrow="Open Positions"
          title={
            <>
              Current <span className="text-gradient-blue">openings.</span>
            </>
          }
          description="Senior-first, with a paid intern program for emerging talent. Every role ships to production — no toy projects, no busywork, no &quot;shadowing&quot; for six months. Click View description for the full role brief and a one-click apply."
        />
        <div className="mt-10 space-y-3">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.04}>
              <JobCard job={job} onApply={onApply} onNavigate={onNavigate} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Don't see your role?"
        description="We&apos;re always looking for senior engineers, designers, and marketers. Send your portfolio — we read every application and reply within 4 business hours."
        ctaLabel="Send your portfolio"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
