#!/usr/bin/env bash
# Media stack: the real Research API on synthetic market data, isolated from the research ledger.
#   up     start the synthetic market (8031) and a Research API (8021) on database research__media
#   down   stop both; the media database is kept
#   check  print run counts of the research ledger and the media database
#   reset  drop research__media (only that database) so the next capture starts empty
# Credentials are never stored here: they come from backtest-service's own local config.
set -euo pipefail

LP_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
BS_DIR="${BACKTEST_SERVICE_DIR:-$(cd "$LP_DIR/../backtest-service" && pwd)}"
STATE="$LP_DIR/tmp/media"
PY="$BS_DIR/backend/.venv/bin/python"
export PYTHONPATH="$BS_DIR/research_service:$BS_DIR/backtest_engine:$BS_DIR/trading_core:$BS_DIR/trading_venues"
MARKET_PORT=8031
API_PORT=8021
mkdir -p "$STATE"

# Database URLs for research__media, derived from backtest-service's local config.
media_env() {
  "$PY" - <<'EOF'
from sqlalchemy.engine import make_url
from research_service import config
for key, url in (("RESEARCH_OWNER_DATABASE_URL", config.OWNER_URL), ("RESEARCH_DATABASE_URL", config.RUNTIME_URL)):
    print(f"export {key}='{make_url(url).set(database='research__media').render_as_string(hide_password=False)}'")
EOF
}

run_counts() {
  "$PY" - <<'EOF'
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from research_service import config
for db in ("research", "research__media"):
    url = make_url(config.OWNER_URL).set(database=db)
    try:
        with create_engine(url).connect() as c:
            print(db, c.execute(text("SELECT count(*) FROM research.runs")).scalar())
    except Exception as error:
        print(db, "unavailable:", type(error).__name__)
EOF
}

ensure_db() {
  "$PY" - <<'EOF'
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from research_service import config
admin = create_engine(make_url(config.OWNER_URL).set(database="postgres"), isolation_level="AUTOCOMMIT")
with admin.connect() as c:
    if not c.execute(text("SELECT 1 FROM pg_database WHERE datname = 'research__media'")).scalar():
        c.execute(text('CREATE DATABASE "research__media"'))
owner = create_engine(make_url(config.OWNER_URL).set(database="research__media"), isolation_level="AUTOCOMMIT")
with owner.connect() as c:
    c.execute(text("REVOKE ALL ON DATABASE research__media FROM PUBLIC"))
    c.execute(text("GRANT CONNECT ON DATABASE research__media TO research_runtime"))
    c.execute(text("CREATE SCHEMA IF NOT EXISTS research"))
EOF
  "$PY" -m research_service.migrate
}

owned_pid() { # $1 = name, $2 = expected command fragment
  local file="$STATE/$1.pid"
  [[ -f "$file" ]] || return 1
  local pid; pid="$(cat "$file")"
  [[ -r "/proc/$pid/cmdline" ]] && tr '\0' ' ' <"/proc/$pid/cmdline" | grep -q -- "$2" && echo "$pid"
}

wait_http() {
  for _ in $(seq 1 60); do curl -sf "$1" >/dev/null && return 0; sleep 0.5; done
  echo "not ready: $1" >&2; return 1
}

up() {
  eval "$(media_env)"
  ensure_db
  run_counts >"$STATE/ledger-before.txt"
  if ! owned_pid market synthetic_market.py >/dev/null; then
    setsid python3 "$LP_DIR/scripts/media/synthetic_market.py" --port "$MARKET_PORT" >"$STATE/market.log" 2>&1 </dev/null &
    echo $! >"$STATE/market.pid"
  fi
  wait_http "http://127.0.0.1:$MARKET_PORT/health"
  if ! owned_pid api "port $API_PORT" >/dev/null; then
    pushd "$BS_DIR" >/dev/null
    RESEARCH_MARKET_URL="http://127.0.0.1:$MARKET_PORT" setsid "$PY" -m uvicorn research_service.main:app \
      --host 127.0.0.1 --port "$API_PORT" >"$STATE/api.log" 2>&1 </dev/null &
    echo $! >"$STATE/api.pid"
    popd >/dev/null
  fi
  wait_http "http://127.0.0.1:$API_PORT/health"
  echo "media stack ready: market :$MARKET_PORT, Research API :$API_PORT on research__media"
  cat "$STATE/ledger-before.txt"
}

down() {
  local pid
  for name in api market; do
    if pid="$(owned_pid "$name" "$([[ $name == api ]] && echo "port $API_PORT" || echo synthetic_market.py)")"; then
      kill "$pid" && echo "stopped $name ($pid)"
    fi
    rm -f "$STATE/$name.pid"
  done
  echo "before:"; cat "$STATE/ledger-before.txt" 2>/dev/null || true
  echo "after:"; run_counts
}

reset() {
  if owned_pid api "port $API_PORT" >/dev/null; then echo "stop the stack first: $0 down" >&2; exit 1; fi
  "$PY" - <<'EOF'
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from research_service import config
admin = create_engine(make_url(config.OWNER_URL).set(database="postgres"), isolation_level="AUTOCOMMIT")
with admin.connect() as c:
    c.execute(text('DROP DATABASE IF EXISTS "research__media" WITH (FORCE)'))
print("dropped research__media")
EOF
}

case "${1:-}" in
  up) up ;;
  reset) reset ;;
  down) down ;;
  check) run_counts ;;
  *) echo "usage: $0 up|down|check|reset" >&2; exit 2 ;;
esac
