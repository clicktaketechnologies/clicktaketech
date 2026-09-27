// Auto-switch Prisma provider based on DATABASE_URL
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const dbUrl = process.env.DATABASE_URL || '';

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
