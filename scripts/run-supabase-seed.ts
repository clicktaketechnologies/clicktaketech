// Runs the supabase-setup.sql file against the Supabase pooler connection.
// Uses Prisma client $executeRawUnsafe (which works through Supavisor,
// unlike prisma db push which uses the schema engine).
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const POOLER_URL = "postgresql://postgres.uzzeihcrlfqjcuqtlgqw:TCvdUFlFyHajWzVA@aws-0-eu-central-1.pooler.supabase.com:5432/postgres";

const db = new PrismaClient({ datasourceUrl: POOLER_URL });

async function main() {
  console.log("Connecting to Supabase via session pooler...");
  const sql = readFileSync("supabase-setup.sql", "utf-8");

  // Split into individual statements (split on semicolons that end a line,
  // being careful not to split inside strings).
  const statements: string[] = [];
  let current = "";
  let inString = false;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    current += ch;
    if (ch === "'") {
      // toggle string state (handle '' as escaped quote)
      if (sql[i + 1] === "'") { current += sql[i + 1]; i++; continue; }
      inString = !inString;
    }
    if (ch === ";" && !inString) {
      const stmt = current.trim();
      if (stmt && !stmt.startsWith("--")) {
        // strip leading comment lines
        const lines = stmt.split("\n").filter((l) => !l.trim().startsWith("--"));
        const clean = lines.join("\n").trim();
        if (clean) statements.push(clean);
      }
      current = "";
    }
  }

  console.log(`Parsed ${statements.length} SQL statements`);

  let ok = 0;
  let failed = 0;
  const errors: string[] = [];
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await db.$executeRawUnsafe(stmt);
      ok++;
      if (ok % 10 === 0) console.log(`  ${ok}/${statements.length} done...`);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      // "already exists" is fine (idempotent)
      if (/already exists|duplicate key|ON CONFLICT/i.test(stmt + msg)) {
        // still count as ok for idempotent inserts
      } else {
        errors.push(`Stmt ${i + 1} FAILED: ${msg.substring(0, 150)} | SQL: ${stmt.substring(0, 80)}...`);
      }
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Successful: ${ok}`);
  console.log(`Failed: ${failed}`);
  if (errors.length > 0) {
    console.log(`\nErrors (first 10):`);
    errors.slice(0, 10).forEach((e) => console.log("  " + e));
  }

  // Verify by counting rows in key tables
  console.log("\n=== VERIFICATION ===");
  for (const table of ["User", "Page", "BlogPost", "PricingTier", "TeamMember", "Job", "ClientLogo", "SiteSetting"]) {
    try {
      const count = await db.$queryRawUnsafe(`SELECT count(*)::int as c FROM "${table}"`);
      console.log(`  ${table}: ${JSON.stringify(count)} rows`);
    } catch (e) {
      console.log(`  ${table}: query failed`);
    }
  }
}

main()
  .catch((e) => { console.error("FATAL:", e); process.exit(1); })
  .finally(() => db.$disconnect());
