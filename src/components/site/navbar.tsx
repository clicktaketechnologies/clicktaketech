"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Phone } from "lucide-react";
import { NAV_ITEMS, SERVICE_CATEGORIES, type NavView } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type NavbarProps = {
  active: NavView;
  onNavigate: (v: NavView) => void;
};

export function Navbar({ active, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (v: NavView) => {
    onNavigate(v);
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4",
            scrolled ? "glass-strong shadow-deep" : "border border-transparent"
          )}
          onMouseLeave={closeMega}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="group flex items-center gap-2.5 pl-1"
            aria-label="ClickTake home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_0_20px_-2px] shadow-blue-500/50">
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
            <span className="flex flex-col items-start leading-none">
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                ClickTake
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-400">
                Technologies
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.id === "services" ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={openMega}
                >
                  <button
                    onClick={() => handleNav("services")}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                      active === item.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        megaOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active === item.id && item.id !== "services" && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-blue-500/12 ring-1 ring-blue-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+447391653377"
              className="hidden items-center gap-1.5 rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-blue-500/40 hover:bg-card xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-blue-400" />
              +44 7391 653377
            </a>
            <button
              onClick={() => handleNav("contact")}
              className="group hidden items-center gap-1.5 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_-4px] shadow-blue-500/50 transition-all hover:shadow-[0_0_24px_-2px] hover:shadow-pink-500/60 sm:inline-flex"
            >
              Start Your Project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-foreground lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mega menu (desktop) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 top-full z-40 hidden lg:block"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <div className="mx-auto max-w-7xl">
                <div className="mt-2 overflow-hidden rounded-2xl glass-strong shadow-deep">
                  <div className="grid grid-cols-4 gap-0">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        className="border-r border-border/40 p-4 last:border-r-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                            <cat.icon className="h-4 w-4" />
                          </span>
                          <button
                            onClick={() => handleNav("services")}
                            className="text-sm font-semibold text-foreground hover:text-blue-400"
                          >
                            {cat.label}
                          </button>
                        </div>
                        <ul className="mt-3 space-y-0.5">
                          {cat.services.map((s) => (
                            <li key={s.slug}>
                              <button
                                onClick={() => handleNav("services")}
                                className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-blue-500/10 hover:text-foreground"
                              >
                                <s.icon className="h-3.5 w-3.5 shrink-0 text-blue-400/70 group-hover:text-blue-400" />
                                <span className="flex-1">{s.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Mega footer */}
                  <div className="flex items-center justify-between border-t border-border/40 bg-blue-500/5 px-5 py-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">24 services</span> across 4
                      practice areas — one delivery engine.
                    </p>
                    <button
                      onClick={() => handleNav("services")}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                    >
                      Explore all services
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 max-h-[80vh] overflow-y-auto rounded-2xl glass-strong p-2 lg:hidden"
            >
              {/* Services expandable */}
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground"
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    mobileServicesOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="px-2 py-1">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
                          <cat.icon className="h-3.5 w-3.5" />
                          {cat.label}
                        </div>
                        <div className="grid grid-cols-2 gap-0.5">
                          {cat.services.map((s) => (
                            <button
                              key={s.slug}
                              onClick={() => handleNav("services")}
                              className="rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-blue-500/10 hover:text-foreground"
                            >
                              {s.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleNav("services")}
                      className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-400"
                    >
                      Explore all services <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other nav items */}
              {NAV_ITEMS.filter((i) => i.id !== "services").map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? "bg-blue-500/12 text-foreground ring-1 ring-blue-500/30"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </button>
              ))}

              {/* Extra pages */}
              <div className="my-1 border-t border-border/40" />
              {[
                { id: "careers" as NavView, label: "Careers" },
                { id: "cities" as NavView, label: "Cities We Serve" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? "bg-blue-500/12 text-foreground ring-1 ring-blue-500/30"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </button>
              ))}

              <button
                onClick={() => handleNav("contact")}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
