#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [ "$(git branch --show-current)" != "master" ]; then
echo "Abort: run this from master after deploy_to_master.sh." >&2
exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
echo "Abort: working tree is not clean." >&2
exit 1
fi

echo "About to push master to origin as an explicit deploy."
ALLOW_MASTER_DEPLOY=1 git push origin master
