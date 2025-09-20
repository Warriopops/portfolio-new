#!/usr/bin/env bash
set -euo pipefail
cd /home/maxoux/docker/thomas
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)  # change branch if needed
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "Change detected, pulling..."
  git reset --hard origin/main
  echo "Building production dist"
  docker compose up -d --build
  echo "Done !"
fi
