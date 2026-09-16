import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===== Admin button color standards =====
// Consistent colors across the entire admin panel for instant recognition.
export const adminBtn = {
  // Actions
  edit: "rounded-lg bg-green-500/10 p-2 text-green-400 hover:bg-green-500/20",
  delete: "rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20",
  create: "rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20",
  save: "rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white",
  cancel: "rounded-xl border border-border/60 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground",
  toggle: "rounded-lg bg-amber-500/10 p-2 text-amber-400 hover:bg-amber-500/20",
  view: "rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20",
  primary: "rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white",
  // Status badges
  badgeActive: "rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400",
  badgeDraft: "rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400",
  badgeNew: "rounded-full bg-pink-500/15 px-2 py-0.5 text-[10px] font-medium text-pink-400",
  badgeLive: "rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-400",
  badgeHidden: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
} as const;
