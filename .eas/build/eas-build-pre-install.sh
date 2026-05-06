#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${GOOGLE_SERVICES_JSON:-}" ]]; then
  echo "$GOOGLE_SERVICES_JSON" | base64 -d > "$EAS_BUILD_WORKINGDIR/google-services.json"
  echo "google-services.json gerado com sucesso."
fi
