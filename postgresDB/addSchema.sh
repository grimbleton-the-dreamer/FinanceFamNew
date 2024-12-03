#!/bin/bash

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

# Create the Postgres database named "postgres" with the "template_postgis" template
createdb postgres

# Extract the schema and data from the backup file
pg_restore -f /tmp/schema_new.sql -s /data/postgres-backup.sql 2>&1 | tee /var/log/postgresql/schema_extract.log
#Edit and replace below for data
#pg_restore -f /tmp/new_data.sql -a /data/postgres-backup.sql 2>&1 | tee /var/log/postgresql/data_extract.log

# Import the schema and data into the new database
psql --dbname=postgres -f /tmp/schema_new.sql 2>&1 | tee /var/log/postgresql/schema_import.log
#psql --dbname=postgres -f /tmp/new_data.sql 2>&1 | tee /var/log/postgresql/data_import.log

# Keep PostgreSQL running
tail -f /var/log/postgresql/logfile