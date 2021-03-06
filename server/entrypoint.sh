#!/bin/bash
# Docker entrypoint script.

echo "entrypoint sh"
# Wait until Postgres is ready
echo "$(date) - running entrypoint.sh"

while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER; do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z $(psql -Atqc "\list $PGDATABASE") ]]; then
  echo "Database $PGDATABASE does not exist. Creating..."
  mix ecto.create
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $PGDATABASE created."
fi

exec mix phx.server
