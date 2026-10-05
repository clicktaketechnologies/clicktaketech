// Auto-runs during Vercel build:
// 1. Switches Prisma provider based on DATABASE_URL
// 2. Generates Prisma client
// 3. Pushes schema to database (if PostgreSQL)
// 4. Seeds admin user if none exists

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const dbUrl = process.env.DATABASE_URL || '';

// Step 1: Switch provider
let schema = fs.readFileSync(schemaPath, 'utf8');
if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('🔒 DATABASE_URL is PostgreSQL — switching provider to postgresql');
  schema = schema.replace(/provider = "sqlite"/, 'provider = "postgresql"');
} else {
  console.log('📦 DATABASE_URL is SQLite — keeping provider as sqlite');
  schema = schema.replace(/provider = "postgresql"/, 'provider = "sqlite"');
}
fs.writeFileSync(schemaPath, schema);
console.log('✅ Prisma schema updated');

// Step 2: Generate Prisma client
console.log('📦 Generating Prisma client...');
execSync('bunx prisma generate', { stdio: 'inherit' });

// Step 3: Push schema to database (PostgreSQL only)
if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('🗄️ Pushing schema to Supabase...');
  try {
    execSync('bunx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Schema pushed to Supabase');
    
    // Step 4: Seed admin user
    console.log('👤 Seeding admin user...');
    const { PrismaClient } = require('@prisma/client');
    const db = new PrismaClient();
    
    const existing = await db.user.findUnique({ where: { email: 'admin@clicktaketech.com' } });
    if (!existing) {
      await db.user.create({
        data: {
          email: 'admin@clicktaketech.com',
          name: 'ClickTake Admin',
          password: 'clicktake-admin-2026',
          role: 'admin',
          permissions: null,
        },
      });
      console.log('✅ Admin user created!');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    await db.$disconnect();
  } catch (err) {
    console.log('⚠️ Database push/seed skipped:', err.message);
    console.log('   Run manually: bunx prisma db push --accept-data-loss');
  }
} else {
  console.log('ℹ️ Skipping database push (SQLite local dev)');
}
