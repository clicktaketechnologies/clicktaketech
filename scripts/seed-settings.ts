import { db } from "../src/lib/db";
import { DEFAULT_SETTINGS } from "../src/lib/admin-activity";

async function main() {
  for (const s of DEFAULT_SETTINGS) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  const count = await db.siteSetting.count();
  console.log(`seeded ${count} site settings`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
