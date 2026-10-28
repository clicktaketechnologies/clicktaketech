"use client";

import { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Users,
  Wifi,
  Server,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section, CtaSection } from "@/components/site/section";
import type { NavView } from "@/lib/site-data";

type PlatformsViewProps = {
  onNavigate: (v: NavView) => void;
};

type Platform = {
  name: string;
  url: string;
  tagline: string;
  description: string;
  /** Lucide icon — used as fallback if the logo image fails to load. */
  icon: LucideIcon;
  gradient: "from-blue-500/15 to-cyan-500/10" | "from-pink-500/15 to-purple-500/10" | "from-green-500/15 to-emerald-500/10" | "from-orange-500/15 to-red-500/10";
  tags: string[];
  stats: string;
  /** Real (or generated) business logo URL — shown in the icon slot. */
  logoUrl: string;
  /** Where the logo came from — shown as a tiny badge under the card title for credibility. */
  logoSource: "live" | "brand";
};

const PLATFORMS: Platform[] = [
  {
    name: "AcademyPro",
    url: "https://ams.clicktaketech.com",
    tagline: "All-in-One Academy Management Platform",
    description:
      "Complete LMS for schools, training centres, and coaching institutes. Student enrolment, course management, attendance, fee tracking, exam scheduling, and parent communication — all in one dashboard.",
    icon: GraduationCap,
    gradient: "from-blue-500/15 to-cyan-500/10",
    tags: ["LMS", "Education", "SaaS"],
    stats: "Course management · Enrolment · Fees · Exams",
    logoUrl: "/platforms/ams-academypro.png",
    logoSource: "brand",
  },
  {
    name: "Employee Management System",
    url: "https://ems.clicktaketech.com",
    tagline: "Modern HR & Workforce Platform",
    description:
      "Enterprise employee management with attendance tracking, project management, payroll, leave management, and performance reviews. Built for teams of 10–10,000 across multiple offices.",
    icon: Users,
    gradient: "from-pink-500/15 to-purple-500/10",
    tags: ["HR Tech", "Enterprise", "SaaS"],
    stats: "Attendance · Projects · Payroll · Leave",
    logoUrl: "/platforms/ems-employee-system.png",
    logoSource: "brand",
  },
  {
    name: "Click Opticx ISP Suite",
    url: "https://wifi.clicktaketech.com",
    tagline: "Enterprise ISP OSS/BSS Management Platform",
    description:
      "Complete ISP management suite for internet service providers — customer management, billing, bandwidth allocation, network monitoring, hotspot management, and support ticketing.",
    icon: Wifi,
    gradient: "from-green-500/15 to-emerald-500/10",
    tags: ["ISP", "Telecom", "OSS/BSS"],
    stats: "Billing · Bandwidth · Hotspot · Support",
    // Real logo fetched from the live platform's Cloudinary CDN (dark variant for dark surfaces).
    logoUrl:
      "https://res.cloudinary.com/dzzuvb4fg/image/upload/w_192,c_limit,q_auto,f_auto/v1791169502/clickopticx/branding/logo-dark-muuo2p2676a247c6.png",
    logoSource: "live",
  },
  {
    name: "Host Lama",
    url: "https://hostlama.clicktaketech.com",
    tagline: "Fast, Secure & Reliable Web Hosting",
    description:
      "Managed web hosting platform with SSD storage, free SSL, cPanel access, one-click installs, and 99.9% uptime guarantee. Shared, VPS, and dedicated hosting plans for businesses of all sizes.",
    icon: Server,
    gradient: "from-orange-500/15 to-red-500/10",
    tags: ["Hosting", "Infrastructure", "cPanel"],
    stats: "SSD Storage · Free SSL · cPanel · 99.9% Uptime",
    // Real logo fetched from the live platform's WordPress media library.
    logoUrl:
      "https://hostlama.clicktaketech.com/wp-content/uploads/2024/01/HOST-Lama-BLUE.png",
    logoSource: "live",
  },
];

/** Renders a platform's real business logo, with a graceful Lucide-icon fallback
 *  if the remote image fails to load (CORS, 404, offline, etc.). */
function PlatformLogo({ platform, size = 56 }: { platform: Platform; size?: number }) {
  const [errored, setErrored] = useState(false);
  const Fallback = platform.icon;

  if (errored) {
    return (
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${platform.gradient}`}
        style={{ width: size, height: size }}
      >
        <Fallback className="h-7 w-7 text-foreground" />
      </div>
    );
  }

  // For wide-aspect logos (Host Lama is 337×67 — very wide), use object-contain so
  // the full wordmark stays visible inside the square frame.
  // For square/round app icons (AcademyPro / EMS / Click Opticx), object-cover
  // fills the frame edge-to-edge for a polished app-store look.
  const aspect =
    platform.name === "Host Lama" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${platform.gradient} p-1.5 ring-1 ring-white/10`}
      style={{ width: size, height: size }}
    >
      <img
        src={platform.logoUrl}
        alt={`${platform.name} logo`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
        className={`h-full w-full ${aspect}`}
      />
    </div>
  );
}

export function PlatformsView({ onNavigate }: PlatformsViewProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-48">
        <div className="absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="absolute -bottom-52 -right-40 h-[40rem] w-[40rem] rounded-full bg-pink-500/6 blur-[130px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <Globe className="h-3.5 w-3.5" /> Our Platforms · Products built & maintained in-house
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Beyond services — we build <span className="text-gradient-brand">our own products.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ClickTake Technologies doesn&apos;t just build for clients — we ship our own SaaS
              products used by real businesses every day. Four platforms, each solving a
              different problem, all maintained by our in-house team. The logos below are
              pulled live from each platform so you always see the current brand.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {["4 Live Platforms", "100% In-House Built", "Production-Ready", "Ongoing Support"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  <Zap className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Platform cards */}
      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.name} delay={i * 0.05}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-blue-500/20 sm:p-8">
                <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${platform.gradient} blur-2xl transition-all duration-500 group-hover:scale-125`} />

                <div className="flex items-start justify-between">
                  <PlatformLogo platform={platform} size={56} />
                  <div className="flex flex-wrap items-center gap-1.5">
                    {platform.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-border/30 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {platform.name}
                  </h2>
                  {platform.logoSource === "live" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400 ring-1 ring-green-500/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                      </span>
                      Live logo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300 ring-1 ring-blue-500/20">
                      Brand mark
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-blue-400">{platform.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {platform.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 text-green-400" />
                  {platform.stats}
                </div>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-blue-500/60"
                >
                  Visit {platform.name} <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why in-house section */}
      <Section className="pt-0">
        <Reveal>
          <div className="rounded-2xl border border-border/50 bg-card/40 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why we build our own products
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every platform we maintain is a live laboratory. We learn from real users, real
              scale, and real production challenges — then apply those lessons to your project.
              When you work with ClickTake, you&apos;re hiring a team that ships and maintains
              its own software, not just code for others.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: TrendingUp, title: "Production-Grade", desc: "All platforms run 24/7 with real users, real traffic, and real SLAs." },
                { icon: Zap, title: "Best Practices", desc: "We use the same stack, patterns, and tooling we recommend for clients." },
                { icon: Shield, title: "Security-First", desc: "Our platforms handle sensitive data — security is designed in, not bolted on." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/40 bg-background/40 p-4">
                  <item.icon className="h-5 w-5 text-blue-400" />
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <CtaSection
        onNavigate={onNavigate}
        title="Want a platform like these?"
        description="Whether you need an LMS, HR system, ISP management suite, or hosting platform — we can build it. Book a free 30-minute scoping call with a senior engineer."
        ctaLabel="Book a free consultation"
        secondaryLabel="View services"
        secondaryView="services"
      />
    </>
  );
}
