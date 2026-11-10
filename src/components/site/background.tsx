"use client";

export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base background — uses CSS variable (light or dark depending on theme) */}
      <div className="absolute inset-0 bg-background" />
      {/* Grid — uses --grid-line variable (subtle dark lines on light, white lines on dark) */}
      <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      {/* Blue glow top-left — works in both modes (subtle colored blur) */}
      <div className="absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full bg-blue-500/15 blur-[120px] animate-float-slow dark:bg-blue-500/15" />
      {/* Pink glow bottom-right */}
      <div
        className="absolute -bottom-52 -right-40 h-[40rem] w-[40rem] rounded-full bg-pink-500/12 blur-[130px] animate-float-slow dark:bg-pink-500/12"
        style={{ animationDelay: "2.5s" }}
      />
      {/* Center subtle blue */}
      <div className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-400/5 blur-[100px]" />
      {/* Top vignette — only in dark mode (adds depth to dark backgrounds;
          would look like a gray stain on light backgrounds) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent dark:block hidden" />
    </div>
  );
}
