import { db } from "../src/lib/db";

const SAMPLE_CLIENTS = [
  { name: "DibNow", logo: "", website: "https://dibnow.com", category: "saas", order: 1 },
  { name: "Panel — Employee Management", logo: "", website: "", category: "saas", order: 2 },
  { name: "LogiTrack", logo: "", website: "", category: "saas", order: 3 },
  { name: "ClickOpticX", logo: "", website: "", category: "saas", order: 4 },
  { name: "Mearns Gadget Repair", logo: "", website: "", category: "repair", order: 5 },
  { name: "Gadget Doctor LS", logo: "", website: "", category: "repair", order: 6 },
  { name: "Academy Portal", logo: "", website: "", category: "education", order: 7 },
  { name: "LearnHub", logo: "", website: "", category: "education", order: 8 },
];

async function main() {
  for (const c of SAMPLE_CLIENTS) {
    await db.clientLogo.upsert({
      where: { id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {},
      create: { ...c, id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), active: true },
    });
  }
  const count = await db.clientLogo.count();
  console.log(`seeded ${count} client logos`);
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
