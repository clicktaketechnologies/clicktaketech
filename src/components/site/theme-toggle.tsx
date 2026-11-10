"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ThemeToggle — a sun/moon icon switch for light/dark mode.
 *
 * - Sun icon shown in light mode (click → dark)
 * - Moon icon shown in dark mode (click → light)
 * - Accessible: aria-label changes based on the action available
 * - Persists via next-themes (localStorage key: "theme")
 * - Smooth icon crossfade via framer-motion AnimatePresence
 * - No FOUC: the inline script in layout.tsx sets the .dark class
 *   before paint, so the correct icon shows immediately on load
 *
 * Placed in the footer per the user's requirement.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes resolves the theme on the client only — we need to wait
  // for mount before reading `theme` to avoid SSR hydration mismatch
  // (server doesn't know the user's localStorage preference).
  // The set-state-in-effect pattern is intentional here — it's the
  // documented next-themes approach for preventing hydration mismatches.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-foreground transition-all hover:border-blue-500/40 hover:bg-card"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-track="theme-toggle"
      data-track-theme={isDark ? "dark" : "light"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          // In dark mode → show Moon (clicking switches to light)
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Moon className="h-5 w-5 text-blue-400" />
          </motion.div>
        ) : (
          // In light mode → show Sun (clicking switches to dark)
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Sun className="h-5 w-5 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* While mounting (before theme resolves), show a placeholder
          so the button doesn't shift layout. */}
      {!mounted && (
        <div className="h-5 w-5" />
      )}
    </button>
  );
}
