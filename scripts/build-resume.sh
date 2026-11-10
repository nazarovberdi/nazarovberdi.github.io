#!/usr/bin/env bash
# Prints resume/resume.html to PDF with headless Chrome, using the same fonts as
# the site, so the PDF carries real, selectable text. Two versions:
#   public/resume/resume.pdf          published on the site: no phone, no internal figures
#   resume/private/resume-private.pdf  for sending directly; gitignored, never published
set -euo pipefail
cd "$(dirname "$0")/.."

chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
source="file://$PWD/resume/resume.html"

print() {
  "$chrome" --headless --disable-gpu --no-pdf-header-footer \
    --allow-file-access-from-files \
    --print-to-pdf="$2" "$1" 2>/dev/null
  echo "Wrote $2 ($(du -h "$2" | cut -f1))"
}

mkdir -p resume/private
print "$source" public/resume/resume.pdf
print "$source?private" resume/private/resume-private.pdf
