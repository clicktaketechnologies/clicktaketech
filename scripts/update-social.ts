import { db } from "../src/lib/db";
import { DEFAULT_SETTINGS } from "../src/lib/admin-activity";

async function main() {
  // Force-update all settings with their default values (so the new social URLs land).
  for (const s of DEFAULT_SETTINGS) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: s,
    });
  }
  const socials = await db.siteSetting.findMany({ where: { category: "social" } });
  console.log(`Updated ${socials.length} social settings:`);
  for (const s of socials) {
    console.log(`  ${s.key}: ${s.value}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
