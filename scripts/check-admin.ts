import { db } from "../src/lib/db";
async function main() {
  const users = await db.user.findMany();
  for (const u of users) {
    console.log(`email: ${u.email} | role: ${u.role} | password: ${u.password} | permissions: ${u.permissions}`);
  }
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
