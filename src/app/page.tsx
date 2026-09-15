"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Background } from "@/components/site/background";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HomeView } from "@/components/site/views/home-view";
import { ServicesView } from "@/components/site/views/services-view";
import { SolutionsView } from "@/components/site/views/solutions-view";
import { AboutView } from "@/components/site/views/about-view";
import { WorkView } from "@/components/site/views/work-view";
import { ContactView } from "@/components/site/views/contact-view";
import type { NavView } from "@/lib/site-data";

export default function Page() {
  const [view, setView] = useState<NavView>("home");

  // Switch view + scroll to top so each "page" starts at the hero.
  const navigate = (v: NavView) => {
    setView(v);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Keep the document title in sync with the active view.
  useEffect(() => {
    const titles: Record<NavView, string> = {
      home: "ClickTake — AI-Native Software Engineering",
      services: "Services — ClickTake Technologies",
      solutions: "Solutions — ClickTake Technologies",
      about: "About — ClickTake Technologies",
      work: "Case Studies & Portfolio — ClickTake Technologies",
      contact: "Contact — Free 30-min Consult | ClickTake Technologies",
    };
    document.title = titles[view];
  }, [view]);

  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <Navbar active={view} onNavigate={navigate} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "home" && <HomeView onNavigate={navigate} />}
            {view === "services" && <ServicesView onNavigate={navigate} />}
            {view === "solutions" && <SolutionsView onNavigate={navigate} />}
            {view === "about" && <AboutView onNavigate={navigate} />}
            {view === "work" && <WorkView onNavigate={navigate} />}
            {view === "contact" && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
