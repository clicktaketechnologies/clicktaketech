"use client";

import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { OFFICES, TECH_STACK, type NavView } from "@/lib/site-data";

type FooterProps = {
  onNavigate: (v: NavView) => void;
};

const footerNav: { title: string; links: { label: string; view: NavView }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Digital Marketing", view: "services" },
      { label: "Web & Software", view: "services" },
      { label: "AI & Automation", view: "services" },
      { label: "Creative & Brand", view: "services" },
      { label: "SEO Services", view: "services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Startups", view: "solutions" },
      { label: "Local Businesses", view: "solutions" },
      { label: "E-commerce", view: "solutions" },
      { label: "UK Businesses", view: "solutions" },
      { label: "Agencies", view: "solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", view: "about" },
      { label: "Case Studies", view: "work" },
      { label: "Portfolio", view: "work" },
      { label: "Careers", view: "careers" },
      { label: "Resources", view: "resources" },
      { label: "Contact", view: "contact" },
    ],
  },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/30">
      {/* Tech stack marquee */}
      <div className="overflow-hidden border-b border-border/40 py-4">
        <div className="flex w-max animate-marquee items-center gap-3">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M4 7h16M4 12h10M4 17h7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 14l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-base font-bold tracking-tight">ClickTake</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-native software engineering firm shipping production-grade autonomous agents,
              multi-tenant SaaS platforms, cloud architecture, digital marketing & creative
              services for enterprises across 4 continents. 120+ production deployments shipped
              since 2019.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href="mailto:info@clicktaketech.com"
                className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-blue-400"
              >
                <Mail className="h-4 w-4" />
                info@clicktaketech.com
              </a>
              <a
                href="tel:+447391653377"
                className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-blue-400"
              >
                <Phone className="h-4 w-4" />
                +44 7391 653377
              </a>
              <a
                href="https://wa.link/iqz8eg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-blue-400"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        onNavigate(link.view);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-sm text-muted-foreground transition-colors hover:text-blue-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices */}
        <div className="mt-10 grid gap-3 border-t border-border/40 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o) => (
            <div key={o.city} className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div>
                <div className="text-sm font-medium">
                  {o.flag} {o.city}
                </div>
                <div className="text-xs text-muted-foreground">{o.country}</div>
                <div className="text-xs text-blue-400/70">{o.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ClickTake Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <button className="transition-colors hover:text-foreground">Privacy</button>
            <button className="transition-colors hover:text-foreground">Terms</button>
            <button className="transition-colors hover:text-foreground">Cookies</button>
            <span className="text-blue-400/70">Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
