#!/usr/bin/env bash
set -euo pipefail

iterations="${RALPH_ITERATIONS:-1}"

if ! command -v codex >/dev/null 2>&1; then
  echo "codex CLI is required to run the Ralph loop." >&2
  exit 1
fi

for ((i = 1; i <= iterations; i++)); do
  echo "Ralph loop ${i}/${iterations}"
  codex exec --full-auto "$(cat .ralph/PROMPT.md)"
done
