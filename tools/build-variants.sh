#!/usr/bin/env sh
# Regenerates the variant pages from techsparks-scroll.html (the single source of truth).
# Run from the repo root after editing techsparks-scroll.html:  sh tools/build-variants.sh
set -e
sed 's/^const SHOW_PERSON = true;/const SHOW_PERSON = false;/' techsparks-scroll.html > techsparks-scroll-no-person.html
grep -q '^const SHOW_PERSON = false;' techsparks-scroll-no-person.html
echo "built techsparks-scroll-no-person.html"
