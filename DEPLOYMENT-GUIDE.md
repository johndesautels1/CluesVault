# Vercel Deployment Guide - CluesVault

## Method 1: Vercel Dashboard (Recommended - Easiest)

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)
- Code pushed to GitHub

### Steps

#### 1. Push to GitHub

If you haven't already:

```bash
# Make deploy script executable
chmod +x deploy-github.sh

# Run deployment script
./deploy-github.sh

# Follow the prompts to add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/CluesVault.git
git push -u origin main
```

#### 2. Import on Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your **CluesVault** repository
5. Vercel auto-detects settings from `vercel.json`:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **"Deploy"**

#### 3. Wait for Deployment

- First deploy takes ~2-3 minutes
- Vercel shows build logs in real-time
- You'll get a live URL like: `https://cluesvault-xyz123.vercel.app`

#### 4. Verify Deployment

✅ Check build completed successfully  
✅ Click the deployment URL  
✅ Test login (create new credentials)  
✅ Test creating an API entry  
✅ Test all filters  
✅ Test export functions  

---

## Method 2: Vercel CLI

### Prerequisites
- Node.js installed
- Terminal access

### Steps

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

Follow the email verification link.

#### 3. Deploy

```bash
# From CluesVault directory
cd /path/to/CluesVault

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### 4. Follow Prompts

```
? Set up and deploy "~/CluesVault"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? CluesVault
? In which directory is your code located? ./
```

Vercel auto-detects everything from `vercel.json`.

#### 5. Get Your URL

After deployment completes:
```
✅ Production: https://cluesvault.vercel.app
```

---

## Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard
2. Select **CluesVault** project
3. Go to **Settings** → **Domains**
4. Click **"Add"**
5. Enter your domain: `vault.cluesnomad.com`
6. Follow DNS instructions

### DNS Settings

If using **Cloudflare**, **GoDaddy**, or your registrar:

**A Record:**
```
Type: A
Name: vault (or @)
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: vault
Value: cname.vercel-dns.com
```

Wait 5-60 minutes for DNS propagation.

---

## Environment Variables (Optional)

CluesVault doesn't need any environment variables because:
- All data stored in browser localStorage
- No backend API calls
- No secrets required

But if you want to add analytics or other features later:

1. Go to **Settings** → **Environment Variables**
2. Add variables
3. Redeploy

---

## Automatic Deployments

Once connected to GitHub:

✅ **Every push to `main`** → Auto-deploys to production  
✅ **Every pull request** → Gets preview deployment  
✅ **Rollback anytime** → Click previous deployment  

---

## Post-Deployment Checklist

After deployment succeeds:

- [ ] Visit deployment URL
- [ ] Test login/signup flow
- [ ] Create test API entry
- [ ] Test search functionality
- [ ] Test product filter
- [ ] Test category filter
- [ ] Test status filter
- [ ] Test A-Z alphabet navigation
- [ ] Edit test API entry
- [ ] Delete test API entry
- [ ] Export JSON
- [ ] Export CSV
- [ ] Export JavaScript
- [ ] Export Python
- [ ] Import JSON file
- [ ] Test on mobile device
- [ ] Test on different browser

---

## Troubleshooting

### Build Fails

**Error:** `Command "npm run build" exited with 1`

**Solution:** Check build logs. Common issues:
- Missing dependencies → Run `npm install` locally first
- Type errors → Run `npx tsc --noEmit` to check
- Syntax errors → Check build logs for line numbers

### Site Loads Blank

**Error:** White screen after deployment

**Solution:**
1. Open browser DevTools (F12) → Console
2. Check for errors
3. Verify `/dist/index.html` exists in deployment
4. Check `vercel.json` rewrites are correct

### localStorage Not Working

**Error:** Data doesn't persist

**Solution:**
- Check browser supports localStorage (all modern browsers do)
- Check browser isn't in private/incognito mode
- Clear browser cache and try again

### Login Loop

**Error:** Keeps showing login screen

**Solution:**
1. Open DevTools → Application → Local Storage
2. Delete `cluesvault_auth_v2` key
3. Refresh page
4. Create new credentials

---

## Monitoring

### Check Deployment Status

```bash
vercel ls
```

### View Logs

```bash
vercel logs [deployment-url]
```

### Check Analytics

Go to Vercel Dashboard → Analytics (free tier included)

---

## Rollback Deployment

If something breaks:

1. Go to Vercel Dashboard
2. Select **CluesVault** project
3. Click **Deployments**
4. Find previous working deployment
5. Click **⋮** → **Promote to Production**

---

## Cost

**Vercel Free Tier includes:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Analytics

**Perfect for CluesVault** - no cost expected.

---

## Next Steps After Deployment

1. Bookmark your production URL
2. Test all features thoroughly
3. Add custom domain (optional)
4. Share with team members
5. Set up GitHub branch protection (optional)

---

**Deployment should take 5-10 minutes total!**
