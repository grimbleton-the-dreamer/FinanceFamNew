#!/bin/bash

# Set the database name
DB_NAME="postgres"

# Initialize the PostgreSQL data directory
initdb -D ${PGDATA}

# Start PostgreSQL in the background
pg_ctl -D ${PGDATA} -l /var/log/postgresql/logfile start

# Wait for PostgreSQL to start
wait_postgresql() {
  while ! pg_isready -q; do
    echo "Waiting for PostgreSQL to start..."
    sleep 1
  done
}
wait_postgresql

# Drop the existing database (connect to template1 to avoid "cannot drop the currently open database" error)
echo "Dropping the existing database (if it exists)..."
psql -U postgres -d template1 -c "DROP DATABASE IF EXISTS ${DB_NAME};" 2>&1 | tee /var/log/postgresql/drop_db.log

# Create a new database
echo "Creating a new database..."
psql -U postgres -d template1 -c "CREATE DATABASE ${DB_NAME};" 2>&1 | tee /var/log/postgresql/create_db.log

# Restore the schema and data from the backup file (use psql for text-format backups)
echo "Restoring schema and data from the backup file..."
psql -U postgres -d ${DB_NAME} -f /data/postgres-backup.sql 2>&1 | tee /var/log/postgresql/restore.log

# Keep PostgreSQL running
tail -f /var/log/postgresql/logfile
