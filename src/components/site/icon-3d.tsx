"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Icon3DProps = {
  /** Emoji glyph rendered as the 3D icon (preferred — renders as a real 3D glyph on every platform). */
  emoji?: string;
  /** Fallback: Lucide icon or any ReactNode if emoji not provided. */
  children?: ReactNode;
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** Visual variant of the 3D tile behind the glyph. */
  variant?: "blue" | "pink" | "brand" | "neutral";
  className?: string;
};

const SIZE_MAP = {
  sm: { tile: "h-9 w-9 text-lg", emoji: "text-base" },
  md: { tile: "h-12 w-12 text-2xl", emoji: "text-2xl" },
  lg: { tile: "h-16 w-16 text-3xl", emoji: "text-3xl" },
};

const VARIANT_MAP = {
  blue: "from-blue-500/25 to-blue-600/10 ring-blue-500/25",
  pink: "from-pink-500/25 to-pink-600/10 ring-pink-500/25",
  brand:
    "from-blue-500/25 via-indigo-500/15 to-pink-500/20 ring-blue-400/30",
  neutral: "from-white/10 to-white/5 ring-white/10",
};

/**
 * Icon3D — a 3D-style icon tile with depth, gradient surface, inner highlight,
 * and a soft drop shadow. Pass an `emoji` for a true-color 3D glyph (recommended),
 * or a `children` node (e.g. a Lucide icon) which sits on the gradient tile.
 */
export function Icon3D({
  emoji,
  children,
  size = "md",
  variant = "brand",
  className,
}: Icon3DProps) {
  const s = SIZE_MAP[size];
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl",
        "bg-gradient-to-br shadow-[0_8px_20px_-8px] shadow-black/40",
        "ring-1 ring-inset",
        "before:absolute before:inset-x-1.5 before:top-1 before:h-1/3 before:rounded-xl before:bg-gradient-to-b before:from-white/25 before:to-transparent before:content-['']",
        s.tile,
        VARIANT_MAP[variant],
        className
      )}
    >
      {emoji ? (
        <span
          className={cn(
            "relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
            s.emoji
          )}
        >
          {emoji}
        </span>
      ) : (
        <span className="relative">{children}</span>
      )}
    </span>
  );
}
