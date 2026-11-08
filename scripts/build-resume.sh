#!/usr/bin/env bash
# Prints resume/resume.html to public/resume/resume.pdf with headless Chrome,
# using the same fonts as the site, so the PDF carries real, selectable text.
set -euo pipefail
cd "$(dirname "$0")/.."

chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
out="public/resume/resume.pdf"

"$chrome" --headless --disable-gpu --no-pdf-header-footer \
  --allow-file-access-from-files \
  --print-to-pdf="$out" "file://$PWD/resume/resume.html" 2>/dev/null

echo "Wrote $out ($(du -h "$out" | cut -f1))"
