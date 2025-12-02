# Netlify Build Fix Instructions

## The Problem
Netlify is failing to build because Rollup's optional native dependency (`@rollup/rollup-linux-x64-gnu`) is not being installed. This happens with Node.js 22.x due to npm's handling of optional dependencies.

## The Solution Applied

### 1. Node Version Pinning
- Added `engines` field to `package.json` to pin Node to 18.x
- Created `.nvmrc` file with `18`
- Created `.node-version` file with `18`
- Configured `netlify.toml` with `NODE_VERSION = "18"`

### 2. Netlify Configuration
The `netlify.toml` file now includes:
- Node version 18 specification
- Build command: `npm install && npm run build`
- SPA redirect rules

## Steps to Deploy

### Step 1: Commit All Changes
```bash
git add .
git commit -m "Fix Netlify build: Pin Node.js to 18.x"
git push
```

### Step 2: Clear Netlify Cache and Redeploy
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Build & deploy**
3. Click **Clear cache and trigger deploy**
4. Or go to **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

### Step 3: Verify Build Settings in Netlify
1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Verify:
   - Build command: `npm install && npm run build` (or let netlify.toml handle it)
   - Publish directory: `dist`
   - Node version: Should auto-detect 18 from `.nvmrc`

### Alternative: Manual Node Version Setting
If automatic detection doesn't work:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add environment variable:
   - Key: `NODE_VERSION`
   - Value: `18`

## Why This Works

- **Node 18.x** uses npm version that properly handles optional dependencies
- **Optional dependencies** for Rollup are automatically installed
- **No MODULE_NOT_FOUND** errors occur

## If It Still Fails

If the build still fails after clearing cache:

1. **Check the build logs** to see which Node version is being used
2. **Manually set Node version** in Netlify dashboard (Environment variables)
3. **Try using npm ci** instead: Change build command to `npm ci && npm run build`

## Files Changed

- ✅ `package.json` - Added engines field
- ✅ `netlify.toml` - Created with Node 18 config
- ✅ `.nvmrc` - Node version file
- ✅ `.node-version` - Alternative Node version file

All files are ready. Just commit, push, clear cache, and redeploy!

