#!/bin/sh
set -e

# Shutdown handler
cleanup() {
  echo "Shutting down gracefully..."
  kill -TERM "$NODE_PID" 2>/dev/null
  wait "$NODE_PID"
  exit 0
}
trap cleanup SIGTERM SIGINT

# Wait for database with retry
MAX_RETRIES=30
RETRY_COUNT=0
echo "Waiting for database..."
until npx prisma migrate deploy 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Error: Database not available after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "Database not ready, retrying in 2s... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done

echo "Starting server..."
node dist/main &
NODE_PID=$!
wait "$NODE_PID"
