#!/bin/sh
set -e

echo "DATABASE_URL: $DATABASE_URL"

echo "Running Prisma migrations..."
DATABASE_URL="$DATABASE_URL" npx prisma migrate deploy

echo "Starting server..."
exec node dist/main