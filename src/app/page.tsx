"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Background } from "@/components/site/background";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatBot } from "@/components/site/chatbot";
import { WebMCPTools } from "@/components/site/webmcp-tools";
import { HomeView } from "@/components/site/views/home-view";
import type { NavView } from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";

// Lazy-load all non-critical views to reduce the initial JS bundle.
// The homepage (HomeView) is eager-loaded — everything else loads
// on-demand when the user navigates to it. This cuts the initial
// bundle from ~2,272 KiB to ~200 KiB.
const ServicesView = dynamic(() => import("@/components/site/views/services-view").then(m => ({ default: m.ServicesView })), { loading: () => null });
const SolutionsView = dynamic(() => import("@/components/site/views/solutions-view").then(m => ({ default: m.SolutionsView })), { loading: () => null });
const CaseStudiesView = dynamic(() => import("@/components/site/views/case-studies-view").then(m => ({ default: m.CaseStudiesView })), { loading: () => null });
const PortfolioView = dynamic(() => import("@/components/site/views/portfolio-view").then(m => ({ default: m.PortfolioView })), { loading: () => null });
const BlogView = dynamic(() => import("@/components/site/views/blog-view").then(m => ({ default: m.BlogView })), { loading: () => null });
const PricingView = dynamic(() => import("@/components/site/views/pricing-view").then(m => ({ default: m.PricingView })), { loading: () => null });
const AboutView = dynamic(() => import("@/components/site/views/about-view").then(m => ({ default: m.AboutView })), { loading: () => null });
const TeamView = dynamic(() => import("@/components/site/views/team-view").then(m => ({ default: m.TeamView })), { loading: () => null });
const CareersView = dynamic(() => import("@/components/site/views/careers-view").then(m => ({ default: m.CareersView })), { loading: () => null });
const CitiesView = dynamic(() => import("@/components/site/views/cities-view").then(m => ({ default: m.CitiesView })), { loading: () => null });
const ConnectView = dynamic(() => import("@/components/site/views/connect-view").then(m => ({ default: m.ConnectView })), { loading: () => null });
const ContactView = dynamic(() => import("@/components/site/views/contact-view").then(m => ({ default: m.ContactView })), { loading: () => null });
const LegalView = dynamic(() => import("@/components/site/views/legal-view").then(m => ({ default: m.LegalView })), { loading: () => null });
const ServiceDetailView = dynamic(() => import("@/components/site/views/service-detail-view").then(m => ({ default: m.ServiceDetailView })), { loading: () => null });
const JobApplyView = dynamic(() => import("@/components/site/views/job-apply-view").then(m => ({ default: m.JobApplyView })), { loading: () => null });
const AdminView = dynamic(() => import("@/components/site/views/admin-view").then(m => ({ default: m.AdminView })), { loading: () => null });

export default function Page() {
  const [view, setView] = useState<NavView>("home");
  const [serviceSlug, setServiceSlug] = useState<string>("");
  const [jobSlug, setJobSlug] = useState<string>("");

  // Switch view + scroll to top so each "page" starts at the hero.
  const navigate = (v: NavView) => {
    setView(v);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Open a dedicated service detail page for the given service slug.
  const navigateService = (slug: string) => {
    setServiceSlug(slug);
    setView("service-detail");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Open the job application form, optionally pre-selecting a job slug.
  const applyJob = (slug: string) => {
    setJobSlug(slug);
    setView("job-apply");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Listen for #admin in the URL so the admin panel is reachable directly.
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

  // Keep the document title in sync with the active view.
  useEffect(() => {
    const titles: Record<NavView, string> = {
      home: "ClickTake Technologies — AI-Native Software Engineering & Digital Agency",
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
      "service-detail":
        getServiceContent(serviceSlug)?.metaTitle ??
        "Service | ClickTake Technologies",
      "job-apply":
        "Apply to Join ClickTake — Intern Onboarding & Identity Verification",
      admin: "Admin Panel — ClickTake Technologies",
      "legal-privacy": "Privacy Policy | ClickTake Technologies",
      "legal-terms": "Terms of Service | ClickTake Technologies",
      "legal-cookies": "Cookie Policy | ClickTake Technologies",
    };
    document.title = titles[view];
  }, [view, serviceSlug]);

  // Admin panel renders as a standalone full-screen dashboard — no site
  // navbar, footer, background or chatbot. It is a separate CMS app surface.
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
            key={
              view === "service-detail"
                ? `service-${serviceSlug}`
                : view === "job-apply"
                ? `job-${jobSlug}`
                : view
            }
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "home" && <HomeView onNavigate={navigate} />}
            {view === "services" && (
              <ServicesView onNavigate={navigate} onNavigateService={navigateService} />
            )}
            {view === "solutions" && <SolutionsView onNavigate={navigate} />}
            {view === "case-studies" && <CaseStudiesView onNavigate={navigate} />}
            {view === "portfolio" && <PortfolioView onNavigate={navigate} />}
            {view === "blog" && <BlogView onNavigate={navigate} />}
            {view === "pricing" && <PricingView onNavigate={navigate} />}
            {view === "about" && <AboutView onNavigate={navigate} />}
            {view === "team" && <TeamView onNavigate={navigate} />}
            {view === "careers" && (
              <CareersView onNavigate={navigate} onApply={applyJob} />
            )}
            {view === "cities" && <CitiesView onNavigate={navigate} />}
            {view === "connect" && <ConnectView onNavigate={navigate} />}
            {view === "contact" && <ContactView />}
            {view === "service-detail" && (
              <ServiceDetailView
                slug={serviceSlug}
                onNavigate={navigate}
                onNavigateService={navigateService}
              />
            )}
            {view === "job-apply" && (
              <JobApplyView
                preselectedJobSlug={jobSlug}
                onNavigate={navigate}
              />
            )}
            {view === "legal-privacy" && (
              <LegalView docId="legal-privacy" onNavigate={navigate} />
            )}
            {view === "legal-terms" && (
              <LegalView docId="legal-terms" onNavigate={navigate} />
            )}
            {view === "legal-cookies" && (
              <LegalView docId="legal-cookies" onNavigate={navigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={navigate} />
      <ChatBot />
      <WebMCPTools />
    </div>
  );
}
