"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Background } from "@/components/site/background";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatBot } from "@/components/site/chatbot";
import { HomeView } from "@/components/site/views/home-view";
import { ServicesView } from "@/components/site/views/services-view";
import { SolutionsView } from "@/components/site/views/solutions-view";
import { CaseStudiesView } from "@/components/site/views/case-studies-view";
import { PortfolioView } from "@/components/site/views/portfolio-view";
import { BlogView } from "@/components/site/views/blog-view";
import { PricingView } from "@/components/site/views/pricing-view";
import { AboutView } from "@/components/site/views/about-view";
import { TeamView } from "@/components/site/views/team-view";
import { CareersView } from "@/components/site/views/careers-view";
import { CitiesView } from "@/components/site/views/cities-view";
import { ConnectView } from "@/components/site/views/connect-view";
import { ContactView } from "@/components/site/views/contact-view";
import { LegalView } from "@/components/site/views/legal-view";
import { ServiceDetailView } from "@/components/site/views/service-detail-view";
import type { NavView } from "@/lib/site-data";
import { getServiceContent } from "@/lib/service-content";

export default function Page() {
  const [view, setView] = useState<NavView>("home");
  const [serviceSlug, setServiceSlug] = useState<string>("");

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
      "legal-privacy": "Privacy Policy | ClickTake Technologies",
      "legal-terms": "Terms of Service | ClickTake Technologies",
      "legal-cookies": "Cookie Policy | ClickTake Technologies",
    };
    document.title = titles[view];
  }, [view, serviceSlug]);

  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <Navbar active={view} onNavigate={navigate} onNavigateService={navigateService} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view === "service-detail" ? `service-${serviceSlug}` : view}
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
            {view === "careers" && <CareersView onNavigate={navigate} />}
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
    </div>
  );
}
