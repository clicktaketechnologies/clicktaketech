import { db } from "../src/lib/db";
async function main() {
  const models = ["contactQuery","jobApplication","lead","blogPost","page","pricingTier","teamMember","job","mediaAsset","siteVisit","seoAudit","activityLog","emailTemplate","experiment","securityLog","user","redirect","siteSetting","themeVariable","typographyPreset"] as const;
  for (const m of models) {
    const count = await (db as any)[m].count();
    console.log(`${m}: ${count}`);
  }
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
