#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [ "$(git branch --show-current)" != "main" ]; then
echo "Abort: run this from main." >&2
exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
echo "Abort: working tree is not clean." >&2
exit 1
fi

git fetch origin

if git show-ref --verify --quiet refs/heads/master; then
git switch master
else
git switch -c master --track origin/master
fi

git pull --ff-only origin master

git checkout main -- index.html style.css script.js timeline.html timeline.js blog.html ideas.html 404.html sitemap.xml robots.txt favicon.svg

echo "Review changes on master now, then commit and push only if you explicitly mean deploy."
