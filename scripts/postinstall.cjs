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

// Step 3: Push schema + seed (PostgreSQL only)
if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('🗄️ Pushing schema to Supabase...');
  try {
    execSync('bunx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Schema pushed to Supabase');

    console.log('👤 Seeding admin user...');
    const { PrismaClient } = require('@prisma/client');
    const db = new PrismaClient();

    const adminEmail = (process.env.SUPERADMIN_EMAIL || 'admin@clicktaketech.com').trim().toLowerCase();
    const adminPassword = process.env.SUPERADMIN_PASSWORD || 'clicktake-admin-2026';

    db.user.findUnique({ where: { email: adminEmail } })
      .then(function(existing) {
        if (!existing) {
          return db.user.create({
            data: {
              email: adminEmail,
              name: 'ClickTake Admin',
              password: adminPassword,
              role: 'admin',
              permissions: null,
            },
          }).then(function() {
            console.log('✅ Admin user created! (' + adminEmail + ')');
          });
        } else if (existing.password !== adminPassword) {
          // Keep the DB in sync with env on re-deploy.
          return db.user.update({
            where: { id: existing.id },
            data: { password: adminPassword, role: 'admin', permissions: null },
          }).then(function() {
            console.log('✅ Admin user password re-synced to env value (' + adminEmail + ')');
          });
        } else {
          console.log('✅ Admin user already up to date (' + adminEmail + ')');
        }
      })
      .then(function() { return db.$disconnect(); })
      .catch(function(err) {
        console.log('⚠️ Seed skipped:', err.message);
        return db.$disconnect();
      });
  } catch (err) {
    console.log('⚠️ Database push/seed skipped:', err.message);
  }
} else {
  console.log('ℹ️ Skipping database push (SQLite local dev)');
}
