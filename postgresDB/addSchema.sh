#!/bin/bash

set -e

# Initialize the PostgreSQL data directory
initdb -D ${PGDATA}

# Configure pg_hba.conf to allow connections from Docker network
echo "host all all 172.18.0.0/16 md5" >> ${PGDATA}/pg_hba.conf

# Configure postgresql.conf to listen on all interfaces
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" ${PGDATA}/postgresql.conf

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

# Set the password for the 'postgres' user if it's not already set
echo "Checking and setting password for user 'postgres'..."
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"

# Check if the 'postgres' database exists and create it if it doesn't
if ! psql -U postgres -lqt | cut -d \| -f 1 | grep -qw postgres; then
  echo "Creating the database 'postgres'..."
  createdb -U postgres postgres
else
  echo "Database 'postgres' already exists. Skipping creation."
fi

# Extract the schema from the backup file
echo "Extracting schema from backup..."
pg_restore -f /tmp/schema_new.sql -s /data/postgres-backup.sql 2>&1 | tee /var/log/postgresql/schema_extract.log

# Import the schema into the new database
echo "Importing schema into the database..."
psql --dbname=postgres -U postgres -f /tmp/schema_new.sql 2>&1 | tee /var/log/postgresql/schema_import.log

# Uncomment and use the following lines if you also want to restore data:
# echo "Extracting data from backup..."
# pg_restore -f /tmp/new_data.sql -a /data/postgres-backup.sql 2>&1 | tee /var/log/postgresql/data_extract.log
# echo "Importing data into the database..."
# psql --dbname=postgres -U postgres -f /tmp/new_data.sql 2>&1 | tee /var/log/postgresql/data_import.log

# Keep PostgreSQL running
tail -f /var/log/postgresql/logfile
