"use client";

import {
  TEAM_STATS,
  DEPARTMENTS,
  HIRING_STAGES,
  TEAM_VALUES,
  type NavView,
} from "@/lib/site-data";
import {
  Reveal,
  Section,
  SectionHeading,
  LocalTrustStrip,
  CtaSection,
} from "@/components/site/section";

type TeamViewProps = {
  onNavigate: (v: NavView) => void;
};

export function TeamView({ onNavigate }: TeamViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              Our Team · 28 People · 4 Offices · One Engineering Org
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              28 people. 4 offices. One engineering team that{" "}
              <span className="text-gradient-brand">actually ships.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Leadership sits in Birmingham, engineering in Multan, business desks in Austin and
              Dubai. That gives us 18-hour workday coverage on every engagement — your UK account
              lead and your Pakistan tech lead hand off twice a day and present a single face to
              you. No agency phone-tag, no junior middle-men, nobody who needs to &quot;check with
              engineering&quot; before answering a question.
            </p>
          </Reveal>
          <LocalTrustStrip className="mt-8 border-t border-border/40 pt-6" />
          {/* Stats */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {TEAM_STATS.map((s) => (
                <div key={s.label} className="bg-card/50 p-5 text-center">
                  <div className="text-2xl font-bold text-gradient-brand sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <Section className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_0_18px_-4px] shadow-blue-500/50">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Departments */}
      <Section className="border-y border-border/40 bg-card/20">
        <SectionHeading
          eyebrow="How the Team Is Structured"
          title={
            <>
              Five departments, <span className="text-gradient-blue">one delivery engine.</span>
            </>
          }
          description="Cross-office pods that coordinate daily via Linear, GitHub, Slack and Notion — so the person who writes the code and the person who scopes the contract are never more than a Slack ping apart."
        />
        <div className="mt-12 space-y-4">
          {DEPARTMENTS.map((dept, i) => (
            <Reveal key={dept.num} delay={i * 0.04}>
              <div className="grid gap-4 rounded-2xl border border-border/50 bg-card/40 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <dept.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{dept.num}</span>
                    <h3 className="text-lg font-semibold">{dept.name}</h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dept.desc}</p>
                </div>
                <div className="text-right sm:pl-6">
                  <div className="text-sm font-semibold text-blue-400">{dept.headcount}</div>
                  <div className="text-xs text-muted-foreground">{dept.location}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Hiring process */}
      <Section>
        <SectionHeading
          eyebrow="How We Hire"
          title={
            <>
              4-stage process, <span className="text-gradient-pink">2–3 week cycle.</span>
            </>
          }
          description="A realistic, paid hiring process — never a LeetCode puzzle, never free spec work. We treat candidates the way we&apos;d want to be treated."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HIRING_STAGES.map((stage, i) => (
            <Reveal key={stage.num} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border/50 bg-card/40 p-6">
                <span className="text-3xl font-bold text-gradient-brand">{stage.num}</span>
                <h3 className="mt-3 text-base font-semibold">{stage.title}</h3>
                <span className="mt-1 inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-400">{stage.duration}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Want to join the team?"
        description="We&apos;re hiring senior engineers, marketers, and designers across all 4 offices. Browse open roles and apply with your portfolio — or read more about how we got here first."
        ctaLabel="View open roles"
        secondaryLabel="About ClickTake"
        secondaryView="about"
      />
    </>
  );
}
