# Netlify Deployment Fix - Step by Step

## ⚠️ Current Issue
Build is failing on Netlify with: `MODULE_NOT_FOUND` for `@rollup/rollup-linux-x64-gnu`

## ✅ Fixes Applied

### Files Created/Updated:

1. **`package.json`** ✅
   - Added `engines: { "node": "18.x" }`

2. **`netlify.toml`** ✅
   - Set Node version to 18
   - Build command includes `--include=optional` flag

3. **`.nvmrc`** ✅
   - Contains: `18`

4. **`.node-version`** ✅
   - Contains: `18`

## 🚀 Deployment Steps

### Step 1: Commit and Push
```bash
git add package.json netlify.toml .nvmrc .node-version
git commit -m "Fix Netlify build: Configure Node 18 and optional dependencies"
git push origin main
```

### Step 2: Clear Netlify Cache (CRITICAL!)
1. Go to **Netlify Dashboard** → Your site
2. Click **Site settings** (gear icon)
3. Go to **Build & deploy** → **Build settings**
4. Scroll down and click **Clear cache and trigger deploy**
   
   OR
   
5. Go to **Deploys** tab
6. Click **Trigger deploy** → **Clear cache and deploy site**

### Step 3: Verify Build Settings
In Netlify Dashboard → Site settings → Build & deploy:

- **Build command:** `npm install --include=optional && npm run build`
- **Publish directory:** `dist`
- **Node version:** Should auto-detect from `.nvmrc` (18)

If Node version doesn't auto-detect:
- Go to **Environment variables**
- Add: `NODE_VERSION` = `18`

## 🔍 Verify It's Working

After deployment, check:
1. Build logs show: `Now using node v18.x.x`
2. No `MODULE_NOT_FOUND` errors
3. Build completes successfully
4. Site deploys correctly

## 📋 Alternative: Manual Node Version Setup

If automatic detection fails:

1. Go to Netlify Dashboard → Site settings
2. **Build & deploy** → **Environment**
3. Click **Add variable**
4. Key: `NODE_VERSION`
5. Value: `18`
6. Click **Save**
7. Trigger new deployment

## ❓ Still Not Working?

If build still fails:

1. **Check build logs** - Look for Node version being used
2. **Verify all files committed** - All config files must be in repo
3. **Try `npm ci`** - Update `netlify.toml` command to:
   ```
   command = "npm ci --include=optional && npm run build"
   ```

## 📁 All Files Ready

✅ `package.json` - Node 18 specified  
✅ `netlify.toml` - Build config ready  
✅ `.nvmrc` - Node version file  
✅ `.node-version` - Alternative version file  

**Your portfolio is ready to deploy!** 🎉

