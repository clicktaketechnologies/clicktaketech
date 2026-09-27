#!/bin/bash
# Auto-switches Prisma provider based on DATABASE_URL
# SQLite for local dev, PostgreSQL for Vercel/Supabase production

SCHEMA="prisma/schema.prisma"

if echo "$DATABASE_URL" | grep -q "^postgresql://" || echo "$DATABASE_URL" | grep -q "^postgres://"; then
  echo "🔒 DATABASE_URL is PostgreSQL — switching schema provider to postgresql"
  sed -i 's/provider = "sqlite"/provider = "postgresql"/' "$SCHEMA"
else
  echo "📦 DATABASE_URL is SQLite — keeping schema provider as sqlite"
  sed -i 's/provider = "postgresql"/provider = "sqlite"/' "$SCHEMA"
fi

# Regenerate Prisma client
bunx prisma generate
