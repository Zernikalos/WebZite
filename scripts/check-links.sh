#!/usr/bin/env bash
set -euo pipefail

# Broken-link checker for the statically exported site (`out/`).
#
# Usage:
#   bash scripts/check-links.sh        # check internal links only (skip externals)
#   bash scripts/check-links.sh --all  # also check external links
#
# Notes:
# - Requires `out/` to exist; this script does NOT run a build.
# - Serves `out/` locally and crawls it with linkinator.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-4173}"
BASE_URL="http://127.0.0.1:${PORT}"

CHECK_EXTERNALS=0
if [[ "${1:-}" == "--all" ]]; then
  CHECK_EXTERNALS=1
elif [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: bash scripts/check-links.sh [--all]"
  exit 0
elif [[ -n "${1:-}" ]]; then
  echo "Unknown argument: ${1}"
  echo "Usage: bash scripts/check-links.sh [--all]"
  exit 2
fi

cd "${ROOT_DIR}"

if [[ ! -d "out" ]]; then
  echo "[links] Expected ./out to exist, but it does not."
  echo "[links] Run the static export first (e.g. pnpm run build) and re-run this check."
  exit 1
fi

echo "[links] Serving ./out at ${BASE_URL}"

# Start a static server in the background.
# -c-1 disables caching
npx --yes http-server out -p "${PORT}" -c-1 >/dev/null 2>&1 &
SERVER_PID="$!"

cleanup() {
  if kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT INT TERM

# Wait until server is responding.
echo "[links] Waiting for server to be ready..."
for _ in {1..80}; do
  if curl -fsS "${BASE_URL}/" >/dev/null 2>&1; then
    break
  fi
  sleep 0.125
done

if ! curl -fsS "${BASE_URL}/" >/dev/null 2>&1; then
  echo "[links] Server did not become ready at ${BASE_URL}"
  exit 1
fi

echo "[links] Crawling with linkinator"

SKIP_REGEX="mailto:|tel:"
if [[ "${CHECK_EXTERNALS}" -eq 0 ]]; then
  # Skip any http(s) link that doesn't point to our local server.
  SKIP_REGEX="${SKIP_REGEX}|^https?://(?!127\\.0\\.0\\.1:${PORT})"
fi

npx --yes linkinator "${BASE_URL}" \
  --recurse \
  --timeout 10000 \
  --concurrency 50 \
  --skip "${SKIP_REGEX}"

echo "[links] OK"

