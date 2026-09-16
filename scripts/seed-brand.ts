import { db } from "../src/lib/db";

const THEME_VARS = [
  { key: "--color-primary", value: "#136DFF", category: "color" },
  { key: "--color-accent", value: "#FF53A9", category: "color" },
  { key: "--color-background", value: "#0a0e1a", category: "color" },
  { key: "--color-foreground", value: "#f8fafc", category: "color" },
  { key: "--color-card", value: "#141828", category: "color" },
  { key: "--color-border", value: "rgba(255,255,255,0.1)", category: "color" },
  { key: "--radius", value: "0.75rem", category: "radius" },
  { key: "--font-sans", value: "Geist, system-ui, sans-serif", category: "font" },
  { key: "--font-mono", value: "Geist Mono, monospace", category: "font" },
];

const TYPO_PRESETS = [
  { name: "Default", fontFamily: "Geist, system-ui, sans-serif", headingScale: "1.25", bodySize: "16px", lineHeight: "1.6", active: true },
  { name: "Editorial", fontFamily: "Georgia, serif", headingScale: "1.333", bodySize: "18px", lineHeight: "1.7", active: false },
  { name: "Modern Sans", fontFamily: "Inter, system-ui, sans-serif", headingScale: "1.2", bodySize: "15px", lineHeight: "1.55", active: false },
];

async function main() {
  for (const v of THEME_VARS) {
    await db.themeVariable.upsert({ where: { key: v.key }, update: {}, create: v });
  }
  for (const t of TYPO_PRESETS) {
    await db.typographyPreset.upsert({ where: { name: t.name }, update: {}, create: t });
  }
  console.log(`✓ seeded ${THEME_VARS.length} theme vars + ${TYPO_PRESETS.length} typography presets`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
