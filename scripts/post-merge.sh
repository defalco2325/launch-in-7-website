#!/bin/bash
set -euo pipefail

# Reconcile dependencies from merged task branches without prompting.
npm install --no-audit --no-fund

# Catch incompatible merges before the running workflow is restarted.
npm run check
npm run build