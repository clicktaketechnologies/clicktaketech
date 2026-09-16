import { db } from "../src/lib/db";
import { JOBS, DEPARTMENTS } from "../src/lib/site-data";

async function main() {
  // Seed team members from departments (3 leadership placeholders + existing structure)
  const teamMembers = [
    { name: "Sarah Mitchell", role: "Founder & CEO", department: "Leadership", bio: "Founded ClickTake in 2019. 15+ years in software engineering and AI.", order: 1 },
    { name: "James O'Connor", role: "CTO", department: "Leadership", bio: "Leads the engineering practice. Ex-AWS, ex-fintech.", order: 2 },
    { name: "Aisha Khan", role: "Head of Growth", department: "Marketing", bio: "Drives SEO, paid, and content strategy across all clients.", order: 3 },
    { name: "Aisha Al-Mansoori", role: "MENA Director", department: "Operations", bio: "Heads the Dubai office and MENA client relationships.", order: 4 },
    { name: "David Chen", role: "Lead AI Engineer", department: "Development", bio: "Ships multi-agent systems and RAG pipelines to production.", order: 5 },
    { name: "Maria Santos", role: "Creative Director", department: "Creative", bio: "Leads brand identity and web design across all engagements.", order: 6 },
  ];
  for (const m of teamMembers) {
    await db.teamMember.upsert({
      where: { id: m.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { ...m, id: m.name.toLowerCase().replace(/\s+/g, "-"), active: true },
    });
  }
  console.log(`✓ seeded ${teamMembers.length} team members`);

  // Seed jobs from existing JOBS data
  for (const j of JOBS) {
    await db.job.upsert({
      where: { slug: j.slug },
      update: {},
      create: {
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        description: j.desc,
        active: true,
      },
    });
  }
  console.log(`✓ seeded ${JOBS.length} jobs`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
