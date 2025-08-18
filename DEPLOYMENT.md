# Deployment Guide for Launch in 7

## Issue Fixed

The deployment was failing because the build system was placing `index.html` in `dist/public/` but Replit's static deployment expects it at the root of the `dist` folder.

## Solution Applied

Created deployment scripts that automatically fix the build structure by moving files from `dist/public/` to `dist/` root after the build completes.

## How to Deploy

### Option 1: Use the Automated Build Script (Recommended)

```bash
node build-for-deployment.js
```

This script will:
1. Run the complete build process (frontend + backend)
2. Automatically fix the deployment structure
3. Verify that all required files are in place
4. Show you the final dist directory structure

### Option 2: Manual Build + Fix

If you prefer to run each step manually:

```bash
# Step 1: Run standard build
npm run build

# Step 2: Fix deployment structure
node fix-deployment.js
```

## Deployment Type Recommendation

**Use Autoscale Deployment** (not Static) because this is a full-stack application with:
- Express.js backend server
- React frontend
- API endpoints for lead generation
- Database integration capability

## Expected Final Structure

After running the deployment build, your `dist` folder should contain:

```
dist/
├── index.html          # Frontend entry point (moved from dist/public/)
├── index.js            # Backend server bundle
├── assets/             # Static assets (CSS, JS, images)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── favicon.ico         # App favicon
```

## Verification

The build script will automatically verify that:
- ✅ `index.html` exists at `dist/index.html`
- ✅ `index.js` (server bundle) exists at `dist/index.js`
- ✅ All static assets are properly organized

## Troubleshooting

If deployment still fails:

1. **Check file structure**: Ensure `index.html` is at `dist/index.html` (not in a subfolder)
2. **Use Autoscale**: Make sure you're using Autoscale deployment, not Static
3. **Re-run build**: Try running `node build-for-deployment.js` again

## Files Created for Deployment Fix

- `build-for-deployment.js` - Complete build script with structure fix
- `fix-deployment.js` - Standalone script to fix existing build
- `DEPLOYMENT.md` - This deployment guide