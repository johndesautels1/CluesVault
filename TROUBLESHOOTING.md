# CluesVault Troubleshooting Guide

## Common Issues & Solutions

---

## 1. Development Server Won't Start

### Symptom
```
npm run dev
Error: Cannot find module 'vite'
```

### Solution
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 2. Build Fails

### Symptom A: Missing Dependencies
```
Error: Cannot find module 'react'
```

### Solution
```bash
npm install
```

### Symptom B: TypeScript Errors
```
error TS2307: Cannot find module './components/AuthModal'
```

### Solution
Check file extensions - should be `.jsx` not `.js`:
```bash
# Verify all files exist
ls src/components/
# Should show: AuthModal.jsx, Toolbar.jsx, etc.
```

---

## 3. Blank Page After Deployment

### Symptom
- Deployment succeeds
- URL loads but shows blank white page
- No errors in build logs

### Diagnosis
```bash
# Open browser DevTools (F12)
# Check Console tab for errors
```

### Solution A: Asset Path Issue
If you see 404 errors for `/assets/...`:

Check `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Should be '/' for Vercel
  // ...
})
```

### Solution B: Build Output Missing
```bash
# Rebuild locally to test
npm run build

# Check dist folder was created
ls dist/
# Should show: index.html, assets/
```

---

## 4. Authentication Loop

### Symptom
- Keeps showing login screen
- Even with correct credentials
- Never gets to app

### Diagnosis
```bash
# Open DevTools (F12) → Application → Local Storage
# Check for 'cluesvault_auth_v2' key
```

### Solution
```javascript
// In DevTools Console
localStorage.clear()
// Refresh page
// Create new credentials
```

### Alternative: Check Browser Settings
- Ensure cookies/localStorage enabled
- Not in private/incognito mode
- No aggressive content blockers

---

## 5. Data Not Persisting

### Symptom
- Create API entries
- Refresh page
- Data disappears

### Diagnosis
```javascript
// DevTools Console
console.log(localStorage.getItem('cluesvault_api_registry_v2'))
// Should show JSON string
```

### Solution A: Browser Storage Disabled
- Enable localStorage in browser settings
- Exit private/incognito mode

### Solution B: Storage Quota Exceeded
```javascript
// Check storage size
let size = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    size += localStorage[key].length + key.length;
  }
}
console.log('Storage size:', size, 'bytes');
// LocalStorage limit is typically 5-10 MB
```

**Fix:** Delete old/unused data:
```javascript
localStorage.removeItem('old_key_name')
```

---

## 6. Modal Won't Close

### Symptom
- Click "Cancel" or "X"
- Modal stays open
- Cannot interact with app

### Solution A: JavaScript Error
```bash
# Check DevTools Console for errors
# Look for React errors
```

### Solution B: Force Close
```javascript
// DevTools Console
document.querySelector('.editor-backdrop').style.display = 'none';
// Refresh page
```

---

## 7. Export Downloads Not Working

### Symptom
- Click export button
- Nothing happens
- No file downloads

### Diagnosis
```bash
# Check DevTools Console
# Look for download blocking errors
```

### Solution A: Browser Blocking Downloads
- Check browser download permissions
- Allow downloads from the site
- Disable popup blocker for site

### Solution B: JavaScript Error
Check console for errors in export functions.

### Solution C: Test Manually
```javascript
// DevTools Console
const data = JSON.parse(localStorage.getItem('cluesvault_api_registry_v2'));
console.log(JSON.stringify(data, null, 2));
// Copy output manually
```

---

## 8. Import JSON Fails

### Symptom
- Select JSON file
- Error: "Error parsing JSON file"
- Data not imported

### Diagnosis
Validate your JSON:
```bash
# Use online validator: https://jsonlint.com/
# Or use command line
cat import.json | python -m json.tool
```

### Common JSON Errors

**Missing Comma:**
```json
{
  "apiId": "test"
  "name": "Test"  ❌ Missing comma
}
```

**Should be:**
```json
{
  "apiId": "test",
  "name": "Test"  ✅
}
```

**Trailing Comma:**
```json
{
  "apiId": "test",
  "name": "Test",  ❌ Trailing comma before }
}
```

**Wrong Quotes:**
```json
{
  "apiId": "test",
  'name': "Test"  ❌ Single quotes
}
```

### Solution
Fix JSON syntax and retry.

---

## 9. Filters Not Working

### Symptom
- Select filter
- All APIs still show
- No filtering occurs

### Diagnosis
```javascript
// DevTools Console - Check React state
// This requires React DevTools extension
```

### Solution
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Win) or Cmd+Shift+R (Mac)
# If still broken, clear localStorage
localStorage.clear()
# Refresh and re-login
```

---

## 10. Search Not Finding Results

### Symptom
- Type in search
- Should show results
- Shows "No APIs match"

### Cause
Search is case-insensitive and looks in:
- Name
- Category  
- Description
- Notes
- Tags
- Products

### Solution
- Ensure correct spelling
- Try broader search terms
- Check if other filters active
- Clear all filters first

---

## 11. Alphabet Navigation Not Working

### Symptom
- Click letter button
- Nothing happens
- Or wrong APIs show

### Solution
```bash
# Refresh page
# If persists, check browser console for errors
```

### Note
- Alphabet filter is based on FIRST character of API name
- Case-insensitive
- "#" shows non-A-Z starts

---

## 12. Mobile Layout Broken

### Symptom
- Cards overlap
- Text unreadable
- Buttons off-screen

### Solution
```bash
# Check viewport meta tag in index.html
# Should have:
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Clear mobile browser cache:**
- Settings → Clear browsing data
- Force refresh

---

## 13. Vercel Deployment Fails

### Symptom A: Build Command Error
```
Error: Command "npm run build" exited with 1
```

### Solution
```bash
# Test build locally first
npm run build

# If local build works, check Vercel logs
# Go to Vercel Dashboard → Deployments → Click failed deployment
# Read detailed logs
```

### Symptom B: Out of Memory
```
Error: JavaScript heap out of memory
```

### Solution
Update `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' vite build"
  }
}
```

### Symptom C: Wrong Node Version
```
Error: The engine "node" is incompatible
```

### Solution
Add to `package.json`:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

## 14. HTTPS Mixed Content Warnings

### Symptom
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, 
but requested an insecure resource 'http://...'
```

### Solution
Ensure ALL URLs in your data use HTTPS:
- Change `http://` to `https://`
- Update any hardcoded URLs
- Check default API data in `src/utils/data.js`

---

## 15. Console Errors in Production

### Symptom
Errors in DevTools Console on live site

### Common Errors & Fixes

**Error:** `Uncaught ReferenceError: process is not defined`
**Fix:** Vite handles this automatically - shouldn't occur

**Error:** `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`
**Fix:** Ad blocker blocking requests - whitelist your domain

**Error:** `ResizeObserver loop limit exceeded`
**Fix:** Harmless React warning - can ignore

---

## 16. Custom Domain Not Working

### Symptom
- Added domain in Vercel
- Domain doesn't load site
- Shows DNS error

### Solution

**Wait for DNS Propagation:**
- Can take 5-60 minutes
- Check status: https://dnschecker.org/

**Verify DNS Settings:**
```
Type: A
Name: @ (or subdomain)
Value: 76.76.21.21

OR

Type: CNAME
Name: subdomain
Value: cname.vercel-dns.com
```

**Check Vercel Dashboard:**
- Settings → Domains
- Should show green checkmark
- If red X, click for instructions

---

## 17. New Credential Fields Not Saving

### Symptom
- Fill in userId, username, etc.
- Save API
- Edit again
- Fields are empty

### Diagnosis
Check if using latest code:
```bash
# Verify APIEditor.jsx has all 24 fields
grep -n "userId" src/components/APIEditor.jsx
# Should show multiple matches
```

### Solution
```bash
# Ensure you have latest code
git pull origin main

# Clear browser cache
# Hard refresh
# Clear localStorage
localStorage.clear()
# Refresh and test again
```

---

## 18. Performance Issues

### Symptom
- Slow loading
- Laggy interactions
- Sluggish filtering

### Solution A: Too Much Data
```javascript
// Check localStorage size
const data = localStorage.getItem('cluesvault_api_registry_v2');
console.log('Data size:', data.length, 'characters');
// If > 1MB, consider cleanup
```

### Solution B: Browser Extensions
- Disable extensions temporarily
- Test in incognito mode
- Compare performance

### Solution C: Clear Browser Cache
```bash
# Settings → Privacy → Clear browsing data
# Select: Cached images and files
# Time range: All time
```

---

## Emergency Reset Procedures

### Nuclear Option 1: Clear All Data
```javascript
// DevTools Console
localStorage.clear()
location.reload()
```

### Nuclear Option 2: Fresh Install
```bash
cd CluesVault
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Nuclear Option 3: Reset Git
```bash
# Get fresh copy from GitHub
git fetch origin
git reset --hard origin/main
npm install
```

---

## Getting Help

### Before Asking for Help

Collect this information:

1. **Error Message:** Full text from console
2. **Browser:** Chrome/Firefox/Safari/Edge + version
3. **Environment:** Local dev or production URL
4. **Steps to Reproduce:** Exact steps that cause issue
5. **Expected vs Actual:** What should happen vs what happens
6. **Screenshots:** If visual issue

### DevTools Information

```javascript
// Run in Console and share output
console.log({
  browser: navigator.userAgent,
  screen: `${window.innerWidth}x${window.innerHeight}`,
  localStorage: Object.keys(localStorage),
  storageSize: JSON.stringify(localStorage).length
})
```

---

## Still Having Issues?

1. Check `TESTING-CHECKLIST.md` for verification steps
2. Review `DEPLOYMENT-GUIDE.md` for deployment steps
3. Check Vercel documentation: https://vercel.com/docs
4. Review React documentation: https://react.dev/

---

**Most issues are fixable in < 5 minutes!**
