#!/bin/bash

PSQL_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "database : $PSQL_URL"

function psql_start() {
  psql $PSQL_URL
}

function psql_drop() {
  psql $PSQL_URL -c "DROP SCHEMA IF EXISTS ${DB_SCHEMA} CASCADE;"
}


"$@"
