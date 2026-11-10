"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FloatingWhatsApp — a fixed-position WhatsApp CTA button that appears on
 * all commercial pages (hidden on /admin and /job-apply).
 *
 * Audit Priority 3: "Improve enquiry conversion" — the contact page had
 * only 1 click from 175 impressions (0.57% CTR). A floating WhatsApp button
 * gives users an alternative conversion path that doesn't require navigating
 * to the contact form.
 *
 * The button includes:
 *   - A pulse animation to draw attention without being annoying
 *   - A data-track attribute for analytics separation (commercial vs recruitment)
 *   - A dismissable tooltip bubble with a compelling value proposition
 *   - Mobile-safe positioning (respects bottom safe area)
 *
 * The tooltip auto-shows after 3 seconds (once per session via sessionStorage)
 * and auto-hides after 8 seconds if not clicked.
 */

const WHATSAPP_URL = "https://wa.me/447391653377";
const WHATSAPP_NUMBER = "+44 7391 653377";
const TOOLTIP_SHOWN_KEY = "ct_wa_tooltip_shown";

export function FloatingWhatsApp({ currentView }: { currentView: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Hooks must be called before any early return (React rules-of-hooks).
  useEffect(() => {
    // Only show the auto-tooltip once per session
    const alreadyShown = typeof window !== "undefined" && sessionStorage.getItem(TOOLTIP_SHOWN_KEY);
    if (alreadyShown) return;

    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 11000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Hide on admin + job-apply pages (those are internal/recruitment, not commercial)
  const hiddenViews = ["admin", "job-apply"];
  if (hiddenViews.includes(currentView) || dismissed) return null;

  const handleTooltipClose = () => {
    setShowTooltip(false);
    if (typeof window !== "undefined") sessionStorage.setItem(TOOLTIP_SHOWN_KEY, "1");
  };

  const handleClick = () => {
    // Mark tooltip as shown so it doesn't reappear next page
    if (typeof window !== "undefined") sessionStorage.setItem(TOOLTIP_SHOWN_KEY, "1");
    setShowTooltip(false);
    // The actual navigation happens via the <a> tag's href
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-64 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[0_8px_30px_-8px] shadow-black/40 backdrop-blur-xl"
          >
            <button
              onClick={handleTooltipClose}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm font-semibold text-foreground">
              Questions about your project?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Chat with a senior engineer on WhatsApp — typically replies within 4 business hours.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-600"
              data-track="whatsapp-floating-tooltip"
              data-track-source="floating-tooltip"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Start WhatsApp chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_4px_20px_-4px] shadow-green-500/50 transition-all hover:scale-105 hover:bg-green-600"
        aria-label={`Chat on WhatsApp — ${WHATSAPP_NUMBER}`}
        data-track="whatsapp-floating"
        data-track-source="floating-button"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500/30" style={{ animationDuration: "3s" }} />
        <MessageCircle className="relative h-7 w-7" />
        {/* Phone number tooltip on hover (desktop) */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100 hidden sm:block">
          {WHATSAPP_NUMBER}
        </span>
      </a>
    </div>
  );
}
