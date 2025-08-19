#!/bin/bash

echo "=== PRODUCTION BUILD WITH OPTIMIZATIONS ==="
echo "Building with manual chunking configuration..."

# Clean previous build
rm -rf dist/public

# Build with production config
npx vite build --config vite.config.production.ts

# Build server
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Apply Netlify optimizations
node optimize-netlify.cjs

echo "=== BUILD COMPLETE ==="
echo "Bundle sizes:"
ls -lh dist/public/assets/*.js | awk '{print $5 "\t" $9}' | grep -v chunks
echo ""
echo "Chunk sizes:"
ls -lh dist/public/assets/chunks/*.js 2>/dev/null | awk '{print $5 "\t" $9}'
echo ""
echo "Total gzipped size:"
du -sh dist/public/assets/*.js dist/public/assets/chunks/*.js 2>/dev/null | awk '{sum+=$1} END {print sum "KB total JavaScript"}'