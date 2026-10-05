import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  datasourceUrl: "postgresql://postgres:TCvdUFlFyHajWzVA@db.uzzeihcrlfqjcuqtlgqw.supabase.co:5432/postgres",
});

async function main() {
  console.log("Pushing schema to Supabase...");
  
  // Create admin user
  await db.user.upsert({
    where: { email: "admin@clicktaketech.com" },
    update: {},
    create: {
      email: "admin@clicktaketech.com",
      name: "ClickTake Admin",
      password: "clicktake-admin-2026",
      role: "admin",
      permissions: null,
    },
  });
  console.log("✓ admin user created");

  console.log("Done! Login: admin@clicktaketech.com / clicktake-admin-2026");
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
