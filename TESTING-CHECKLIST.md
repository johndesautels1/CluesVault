# CluesVault Testing Checklist

## Pre-Deployment Testing (Local)

Run these tests BEFORE deploying to verify everything works:

### Environment Setup

```bash
cd /path/to/CluesVault
npm install
npm run dev
```

Expected: Server starts on http://localhost:3000

---

## 1. Authentication System

### First-Time Setup
- [ ] Page loads with auth modal overlay
- [ ] Modal shows: "First-time setup: choose an email and password"
- [ ] Enter email: `test@cluesvault.com`
- [ ] Enter password: `TestPass123!`
- [ ] Click "Continue"
- [ ] Modal disappears
- [ ] App interface appears

### Return User Login
- [ ] Refresh page (F5)
- [ ] Auth modal appears again
- [ ] Modal shows: "Enter your CluesVault email and password"
- [ ] Enter SAME email: `test@cluesvault.com`
- [ ] Enter SAME password: `TestPass123!`
- [ ] Click "Continue"
- [ ] Successfully logs in

### Invalid Credentials
- [ ] Refresh page
- [ ] Enter wrong email or password
- [ ] Error message appears: "Invalid email or password."
- [ ] Cannot access app

### Reset Auth (DevTools)
- [ ] Open DevTools (F12) → Console
- [ ] Run: `localStorage.clear()`
- [ ] Refresh page
- [ ] Shows first-time setup again

**✅ Authentication PASS if all checks complete**

---

## 2. Default Data Loading

After successful login:

- [ ] 16 API cards display
- [ ] APIs shown: OpenAI, Typeform, OpenRouteService, Weather.com, D-ID, HeyGen, Zapier, Make.com, Google Sheets, QuickChart, Calendly, Stripe, Uber, Wix, Google Docs, Gmail
- [ ] Each card shows:
  - [ ] Name
  - [ ] Status pill (color-coded)
  - [ ] Description
  - [ ] Products (chips)
  - [ ] Category
  - [ ] Base URL
  - [ ] Auth method
  - [ ] Links (Docs, Login)

**✅ Default Data PASS if all 16 APIs display correctly**

---

## 3. Search Functionality

- [ ] Type in search box: `openai`
- [ ] Only OpenAI card shows
- [ ] Clear search
- [ ] All 16 cards return
- [ ] Type: `payment`
- [ ] Stripe card shows
- [ ] Type: `CLUES Core`
- [ ] Multiple cards show (any using CLUES Core)
- [ ] Type: `xyz123notfound`
- [ ] Message: "No APIs match your filters"

**✅ Search PASS if filtering works correctly**

---

## 4. Filter by Product

- [ ] Select "Filter by product" dropdown
- [ ] Select "CLUES Core"
- [ ] Only APIs with CLUES Core tag show
- [ ] Count matches (should be 8-10)
- [ ] Change to "Olivia-Chatbot"
- [ ] Different set appears
- [ ] Select "(empty)" to clear
- [ ] All APIs return

**✅ Product Filter PASS**

---

## 5. Filter by Category

- [ ] Select "Filter by category" dropdown
- [ ] Select "LLM / AI"
- [ ] Only OpenAI shows
- [ ] Select "Payments"
- [ ] Only Stripe shows
- [ ] Select "Automation"
- [ ] Zapier and Make.com show
- [ ] Clear filter
- [ ] All return

**✅ Category Filter PASS**

---

## 6. Filter by Status

- [ ] Select "Filter by status" dropdown
- [ ] Select "Active"
- [ ] Only active APIs show (green pills)
- [ ] Select "Testing"
- [ ] Only testing APIs show (orange pills)
- [ ] Select "Planning"
- [ ] Planning APIs show (gray pills)
- [ ] Clear filter

**✅ Status Filter PASS**

---

## 7. Alphabet Navigation

- [ ] Click "O" button
- [ ] Only APIs starting with O show (OpenAI, OpenRouteService)
- [ ] Click "S"
- [ ] Stripe shows
- [ ] Click "G"
- [ ] Google Sheets, Google Docs, Gmail show
- [ ] Click same letter again
- [ ] Filter clears, all return
- [ ] Click "#"
- [ ] Any APIs not starting A-Z show

**✅ Alphabet Nav PASS**

---

## 8. Combined Filters

- [ ] Set Product: "CLUES Core"
- [ ] Set Category: "LLM / AI"
- [ ] Set Status: "Active"
- [ ] Type search: "open"
- [ ] Click "O"
- [ ] Should show only OpenAI (matches all filters)
- [ ] Clear all filters

**✅ Combined Filters PASS**

---

## 9. Create New API

### Open Editor
- [ ] Click "+ New API" button
- [ ] Modal appears with title "New API"
- [ ] All fields empty except status="active"

### Fill Basic Info
- [ ] API Name: `Test API Service`
- [ ] Status: `Testing`
- [ ] Products: Check "CLUES Core" and "Olivia-Chatbot"
- [ ] Category: `Testing / QA`
- [ ] Description: `This is a test API for verification purposes`

### Fill API Config
- [ ] Base URL: `https://api.testservice.com/v1`
- [ ] Docs URL: `https://docs.testservice.com`
- [ ] Auth Method: `Bearer Token`
- [ ] Env Prod: `TEST_API_KEY`
- [ ] Env Dev: `TEST_API_KEY_DEV`

### Fill Account Info
- [ ] Account Email: `test@example.com`
- [ ] Login URL: `https://testservice.com/login`
- [ ] Account Password: `stored in 1Password`

### Fill NEW Credential Fields
- [ ] User ID: `user_12345`
- [ ] Username: `testuser`
- [ ] Personal Code: `CUST-67890`
- [ ] Passcode: `9876`
- [ ] Login Credentials: `Use test credentials from password manager`

### Fill Tokens
- [ ] API Key: `test_key_abc123xyz`
- [ ] Token Portal: `https://testservice.com/tokens`
- [ ] Last Rotated: Select today's date
- [ ] Secret Location: `1Password > Testing > Test API`

### Fill Additional
- [ ] Tags: `test, qa, verification`
- [ ] Notes: `Created for testing purposes - delete after verification`

### Save
- [ ] Click "Save API"
- [ ] Modal closes
- [ ] New "Test API Service" card appears
- [ ] Status shows orange "TESTING" pill
- [ ] Products show CLUES Core + Olivia chips
- [ ] Category shows "Testing / QA"

**✅ Create API PASS if new card appears with all data**

---

## 10. Edit Existing API

- [ ] Find "Test API Service" card
- [ ] Click "Edit" button
- [ ] Modal opens with all previously entered data
- [ ] Verify ALL 24 fields populated correctly:

**Original 19 Fields:**
1. [ ] API ID (auto-generated)
2. [ ] Name: `Test API Service`
3. [ ] Status: `Testing`
4. [ ] Products: CLUES Core, Olivia checked
5. [ ] Category: `Testing / QA`
6. [ ] Description: (full text)
7. [ ] Base URL: `https://api.testservice.com/v1`
8. [ ] Docs URL: `https://docs.testservice.com`
9. [ ] Auth Method: `Bearer Token`
10. [ ] Env Prod: `TEST_API_KEY`
11. [ ] Env Dev: `TEST_API_KEY_DEV`
12. [ ] Account Email: `test@example.com`
13. [ ] Login URL: `https://testservice.com/login`
14. [ ] Account Password: `stored in 1Password`
15. [ ] API Key: `test_key_abc123xyz`
16. [ ] Token Portal: `https://testservice.com/tokens`
17. [ ] Last Rotated: (selected date)
18. [ ] Secret Location: `1Password > Testing > Test API`
19. [ ] Tags: `test, qa, verification`
20. [ ] Notes: (full text)

**New 5 Credential Fields:**
21. [ ] User ID: `user_12345`
22. [ ] Username: `testuser`
23. [ ] Personal Code: `CUST-67890`
24. [ ] Passcode: `9876`
25. [ ] Login Credentials: (full text)

### Make Changes
- [ ] Change Status to "Active"
- [ ] Add another product
- [ ] Change description
- [ ] Click "Save API"
- [ ] Changes reflected in card

**✅ Edit API PASS if all 24 fields load and save correctly**

---

## 11. Delete API

- [ ] Find "Test API Service" card
- [ ] Click "Delete" button
- [ ] Confirm dialog appears
- [ ] Click "OK"
- [ ] Card disappears
- [ ] Refresh page
- [ ] Card still gone (localStorage updated)

**✅ Delete API PASS**

---

## 12. Export Functions

### Export JSON
- [ ] Click "Export JSON"
- [ ] File downloads: `cluesvault-api-registry.json`
- [ ] Open file in text editor
- [ ] Valid JSON format
- [ ] Contains all API data
- [ ] All 24 fields present per API

### Export CSV
- [ ] Click "Export CSV"
- [ ] File downloads: `cluesvault-api-registry.csv`
- [ ] Open in Excel/Sheets
- [ ] 24 column headers (all fields)
- [ ] All rows populated
- [ ] Data matches app

### Export JavaScript
- [ ] Click "Export JS"
- [ ] File downloads: `cluesvault-apis.js`
- [ ] Valid JS module format
- [ ] `export const CLUES_APIS = [...]`
- [ ] Can import in Node.js

### Export Python
- [ ] Click "Export Python"
- [ ] File downloads: `cluesvault_apis.py`
- [ ] Valid Python format
- [ ] Contains `json.loads()` call
- [ ] `APIS` variable defined

**✅ All Exports PASS if files download and contain correct data**

---

## 13. Import JSON

### Prepare Test File
Create `test-import.json`:
```json
[
  {
    "apiId": "import-test-1",
    "name": "Imported API 1",
    "status": "active",
    "products": ["CLUES Core"],
    "category": "Import Test",
    "description": "Test import functionality",
    "baseUrlProd": "",
    "docsUrl": "",
    "authMethod": "",
    "envProd": "",
    "envDev": "",
    "accountEmail": "",
    "loginUrl": "",
    "accountPassword": "",
    "apiKeyToken": "",
    "tokenPortalUrl": "",
    "tokenLastRotated": "",
    "secretLocation": "",
    "tags": [],
    "notes": "",
    "userId": "import_user",
    "username": "importtest",
    "personalCode": "IMP-001",
    "passcode": "1234",
    "loginCredentials": "Test import credentials"
  }
]
```

### Test Import
- [ ] Click "Import JSON"
- [ ] Select `test-import.json`
- [ ] All previous APIs replaced
- [ ] Only "Imported API 1" shows
- [ ] All fields populated from JSON
- [ ] Verify new credential fields loaded:
  - [ ] User ID: `import_user`
  - [ ] Username: `importtest`
  - [ ] Personal Code: `IMP-001`
  - [ ] Passcode: `1234`
  - [ ] Login Credentials: `Test import credentials`

### Restore Default Data
- [ ] Refresh page (or clear localStorage)
- [ ] Login again
- [ ] 16 default APIs return

**✅ Import PASS if JSON loads correctly with all 24 fields**

---

## 14. localStorage Persistence

- [ ] Create a new test API
- [ ] Close browser completely
- [ ] Reopen browser
- [ ] Navigate to CluesVault
- [ ] Login with same credentials
- [ ] Test API still present
- [ ] All data persisted

**✅ Persistence PASS**

---

## 15. Responsive Design

### Desktop (1920x1080)
- [ ] Open at full screen
- [ ] Cards display in grid (3-4 columns)
- [ ] All elements visible
- [ ] No horizontal scroll

### Tablet (768x1024)
- [ ] Resize window to 768px wide
- [ ] Cards adjust to 2 columns
- [ ] Filters stack properly
- [ ] Modal fits screen

### Mobile (375x667)
- [ ] Resize to mobile width
- [ ] Cards single column
- [ ] Filters stack vertically
- [ ] Alphabet nav wraps
- [ ] Modal scrollable
- [ ] All buttons reachable

**✅ Responsive PASS if layouts adapt properly**

---

## 16. UI/Visual Testing

### Colors & Styling
- [ ] Background: Dark radial gradient
- [ ] Title: Orange-yellow gradient
- [ ] Cards: Dark glassmorphic effect
- [ ] Status pills colored correctly:
  - [ ] Green for Active
  - [ ] Orange for Testing
  - [ ] Gray for Deprecated/Planning
- [ ] Buttons have hover effects
- [ ] Links are blue

### Typography
- [ ] All text readable
- [ ] No overlapping text
- [ ] Font sizes appropriate

### Spacing
- [ ] Consistent padding/margins
- [ ] Cards have proper gaps
- [ ] Modal centered
- [ ] No elements touching edges

**✅ Visual PASS if design matches original**

---

## 17. Cross-Browser Testing

Test in ALL browsers:

### Chrome
- [ ] Authentication works
- [ ] All features functional
- [ ] No console errors

### Firefox
- [ ] Authentication works
- [ ] All features functional
- [ ] No console errors

### Safari
- [ ] Authentication works
- [ ] All features functional
- [ ] No console errors

### Edge
- [ ] Authentication works
- [ ] All features functional
- [ ] No console errors

**✅ Cross-Browser PASS if works in all 4 browsers**

---

## 18. Performance Testing

- [ ] Page load time < 2 seconds
- [ ] Smooth scrolling
- [ ] No lag when filtering
- [ ] Modal opens instantly
- [ ] Export/download immediate

**✅ Performance PASS**

---

## Post-Deployment Testing

After deploying to Vercel, repeat these critical tests:

### Production URL Testing
- [ ] Visit production URL
- [ ] Test authentication
- [ ] Create test API
- [ ] Test all filters
- [ ] Export functions work
- [ ] Import function works
- [ ] Test on mobile device
- [ ] Test in different browser

### HTTPS & Security
- [ ] URL starts with `https://`
- [ ] Lock icon in browser
- [ ] localStorage works on HTTPS
- [ ] No mixed content warnings

**✅ Production PASS if all features work on live URL**

---

## Final Verification

- [ ] All 19 original fields present
- [ ] All 5 new credential fields present
- [ ] 16 default APIs load
- [ ] Authentication system works
- [ ] All filters function
- [ ] CRUD operations work
- [ ] Export/import functions
- [ ] Responsive on all devices
- [ ] Works in all browsers
- [ ] Deployed successfully
- [ ] No console errors
- [ ] localStorage persists

---

## Test Results Template

```
========================================
CluesVault Testing Results
========================================
Date: _________________
Tester: _______________
Version: v2.0

[ ] Authentication System
[ ] Default Data Loading
[ ] Search Functionality
[ ] Product Filter
[ ] Category Filter
[ ] Status Filter
[ ] Alphabet Navigation
[ ] Combined Filters
[ ] Create New API (24 fields)
[ ] Edit API (24 fields)
[ ] Delete API
[ ] Export JSON
[ ] Export CSV
[ ] Export JS
[ ] Export Python
[ ] Import JSON
[ ] localStorage Persistence
[ ] Responsive Design
[ ] Cross-Browser (Chrome/Firefox/Safari/Edge)
[ ] Performance
[ ] Production Deployment

Overall Result: PASS / FAIL
Notes:
________________________________________
________________________________________
________________________________________
```

---

**If ALL tests PASS → Ready for production use! ✅**
