"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Background } from "@/components/site/background";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatBot } from "@/components/site/chatbot";
import { WebMCPTools } from "@/components/site/webmcp-tools";
import { HomeView } from "@/components/site/views/home-view";
import { ServicesView } from "@/components/site/views/services-view";
import { PricingView } from "@/components/site/views/pricing-view";
import { AboutView } from "@/components/site/views/about-view";
import { ContactView } from "@/components/site/views/contact-view";
import { BlogView } from "@/components/site/views/blog-view";
import type { NavView } from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";
import { CITIES } from "@/lib/site-data";

// Eager-load the 6 most important views (HomeView, ServicesView, PricingView,
// AboutView, ContactView, BlogView) so their H1 is in the SSR HTML for SEO.
// The rest are lazy-loaded to keep the initial JS bundle small.
const SolutionsView = dynamic(() => import("@/components/site/views/solutions-view").then(m => ({ default: m.SolutionsView })), { loading: () => null });
const CaseStudiesView = dynamic(() => import("@/components/site/views/case-studies-view").then(m => ({ default: m.CaseStudiesView })), { loading: () => null });
const PortfolioView = dynamic(() => import("@/components/site/views/portfolio-view").then(m => ({ default: m.PortfolioView })), { loading: () => null });
const TeamView = dynamic(() => import("@/components/site/views/team-view").then(m => ({ default: m.TeamView })), { loading: () => null });
const CareersView = dynamic(() => import("@/components/site/views/careers-view").then(m => ({ default: m.CareersView })), { loading: () => null });
const CitiesView = dynamic(() => import("@/components/site/views/cities-view").then(m => ({ default: m.CitiesView })), { loading: () => null });
const ConnectView = dynamic(() => import("@/components/site/views/connect-view").then(m => ({ default: m.ConnectView })), { loading: () => null });
const LegalView = dynamic(() => import("@/components/site/views/legal-view").then(m => ({ default: m.LegalView })), { loading: () => null });
const ServiceDetailView = dynamic(() => import("@/components/site/views/service-detail-view").then(m => ({ default: m.ServiceDetailView })), { loading: () => null });
const JobApplyView = dynamic(() => import("@/components/site/views/job-apply-view").then(m => ({ default: m.JobApplyView })), { loading: () => null });
const AdminView = dynamic(() => import("@/components/site/views/admin-view").then(m => ({ default: m.AdminView })), { loading: () => null });

function pathToView(path: string): { view: NavView; serviceSlug: string; jobSlug: string } {
  const p = path.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (!p || p === "") return { view: "home", serviceSlug: "", jobSlug: "" };
  if (p === "services") return { view: "services", serviceSlug: "", jobSlug: "" };
  if (p === "solutions") return { view: "solutions", serviceSlug: "", jobSlug: "" };
  if (p === "case-studies") return { view: "case-studies", serviceSlug: "", jobSlug: "" };
  if (p === "portfolio") return { view: "portfolio", serviceSlug: "", jobSlug: "" };
  if (p === "blog") return { view: "blog", serviceSlug: "", jobSlug: "" };
  if (p === "pricing") return { view: "pricing", serviceSlug: "", jobSlug: "" };
  if (p === "about") return { view: "about", serviceSlug: "", jobSlug: "" };
  if (p === "team") return { view: "team", serviceSlug: "", jobSlug: "" };
  if (p === "careers") return { view: "careers", serviceSlug: "", jobSlug: "" };
  if (p === "cities") return { view: "cities", serviceSlug: "", jobSlug: "" };
  if (p === "connect") return { view: "connect", serviceSlug: "", jobSlug: "" };
  if (p === "contact") return { view: "contact", serviceSlug: "", jobSlug: "" };
  if (p === "legal-privacy") return { view: "legal-privacy", serviceSlug: "", jobSlug: "" };
  if (p === "legal-terms") return { view: "legal-terms", serviceSlug: "", jobSlug: "" };
  if (p === "legal-cookies") return { view: "legal-cookies", serviceSlug: "", jobSlug: "" };
  if (p === "job-apply") return { view: "job-apply", serviceSlug: "", jobSlug: "" };
  if (p === "admin") return { view: "admin", serviceSlug: "", jobSlug: "" };
  const content = getServiceContent(p);
  if (content) return { view: "service-detail", serviceSlug: p, jobSlug: "" };
  // City slugs → show cities view
  if (CITIES.some(c => c.slug === p)) return { view: "cities", serviceSlug: "", jobSlug: "" };
  return { view: "home", serviceSlug: "", jobSlug: "" };
}

const PATH_TITLES: Record<string, string> = {
  "": "ClickTake Technologies — AI-Native Software Engineering & Digital Agency",
  services: "Services — 24 Services across 4 Practices | ClickTake Technologies",
  solutions: "Solutions — By Audience & Industry | ClickTake Technologies",
  "case-studies": "Case Studies — Real Engagements, Real Metrics | ClickTake Technologies",
  portfolio: "Portfolio — 12 Live Client Sites | ClickTake Technologies",
  blog: "Blog — SEO · Web Dev · AI · Marketing | ClickTake Technologies",
  pricing: "Pricing — Starter · Growth · Scale · Custom | ClickTake Technologies",
  about: "About — AI Digital Agency | ClickTake Technologies",
  team: "Our Team — 28 People Across 4 Offices | ClickTake Technologies",
  careers: "Careers — Join ClickTake Technologies",
  cities: "Cities We Serve — 13 Cities, 4 Countries | ClickTake Technologies",
  connect: "Connect — Direct Contact & Social | ClickTake Technologies",
  contact: "Contact — Free 30-min Consult | ClickTake Technologies",
  "legal-privacy": "Privacy Policy | ClickTake Technologies",
  "legal-terms": "Terms of Service | ClickTake Technologies",
  "legal-cookies": "Cookie Policy | ClickTake Technologies",
};

export default function SpaApp() {
  const pathname = usePathname();
  const initial = pathToView(pathname || "/");
  const [view, setView] = useState<NavView>(initial.view);
  const [serviceSlug, setServiceSlug] = useState<string>(initial.serviceSlug);
  const [jobSlug, setJobSlug] = useState<string>(initial.jobSlug);

  useEffect(() => {
    const { view: v, serviceSlug: s, jobSlug: j } = pathToView(pathname || "/");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setView(v);
    setServiceSlug(s);
    setJobSlug(j);
  }, [pathname]);

  const navigate = (v: NavView) => {
    setView(v);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigateService = (slug: string) => {
    setServiceSlug(slug);
    setView("service-detail");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const applyJob = (slug: string) => {
    setJobSlug(slug);
    setView("job-apply");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkHash = () => {
      const h = window.location.hash.replace("#", "").toLowerCase();
      if (h === "admin") setView("admin");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    if (view === "service-detail") {
      document.title = getServiceContent(serviceSlug)?.metaTitle ?? "Service | ClickTake Technologies";
    } else if (view === "job-apply") {
      document.title = "Apply to Join ClickTake — Intern Onboarding & Identity Verification";
    } else if (view === "admin") {
      document.title = "Admin Panel — ClickTake Technologies";
    } else {
      const path = (view === "home" ? "" : view).toString();
      document.title = PATH_TITLES[path] ?? "ClickTake Technologies";
    }
  }, [view, serviceSlug]);

  if (view === "admin") {
    return (
      <div className="min-h-screen bg-background">
        <AdminView onNavigate={navigate} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <Navbar active={view} onNavigate={navigate} onNavigateService={navigateService} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view === "service-detail" ? `service-${serviceSlug}` : view === "job-apply" ? `job-${jobSlug}` : view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "home" && <HomeView onNavigate={navigate} />}
            {view === "services" && (<ServicesView onNavigate={navigate} onNavigateService={navigateService} />)}
            {view === "solutions" && <SolutionsView onNavigate={navigate} />}
            {view === "case-studies" && <CaseStudiesView onNavigate={navigate} />}
            {view === "portfolio" && <PortfolioView onNavigate={navigate} />}
            {view === "blog" && <BlogView onNavigate={navigate} />}
            {view === "pricing" && <PricingView onNavigate={navigate} />}
            {view === "about" && <AboutView onNavigate={navigate} />}
            {view === "team" && <TeamView onNavigate={navigate} />}
            {view === "careers" && (<CareersView onNavigate={navigate} onApply={applyJob} />)}
            {view === "cities" && <CitiesView onNavigate={navigate} />}
            {view === "connect" && <ConnectView onNavigate={navigate} />}
            {view === "contact" && <ContactView />}
            {view === "service-detail" && (<ServiceDetailView slug={serviceSlug} onNavigate={navigate} onNavigateService={navigateService} />)}
            {view === "job-apply" && (<JobApplyView preselectedJobSlug={jobSlug} onNavigate={navigate} />)}
            {view === "legal-privacy" && <LegalView docId="legal-privacy" onNavigate={navigate} />}
            {view === "legal-terms" && <LegalView docId="legal-terms" onNavigate={navigate} />}
            {view === "legal-cookies" && <LegalView docId="legal-cookies" onNavigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={navigate} />
      <ChatBot />
      <WebMCPTools />
    </div>
  );
}
