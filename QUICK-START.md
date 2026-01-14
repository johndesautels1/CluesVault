# CluesVault Quick Start Guide

**Get up and running in 5 minutes!**

---

## Option 1: Local Development (Fastest)

### 1. Install Dependencies
```bash
cd CluesVault
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:3000
```

### 4. Create Login
- First time: Enter any email + password
- This creates your vault credentials
- Remember them!

### 5. Start Using
✅ 16 default APIs loaded  
✅ Search, filter, create, edit  
✅ Export data anytime  

**Done! You're ready to use CluesVault locally.**

---

## Option 2: Deploy to Vercel (Production)

### Prerequisites
- GitHub account
- Vercel account (free)

### 1. Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "CluesVault v2.0"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/CluesVault.git

# Push
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your CluesVault repository
4. Click "Deploy"
5. Wait 2-3 minutes

### 3. Visit Your Live Site

```
https://cluesvault-xyz.vercel.app
```

**Done! Your vault is live and accessible anywhere.**

---

## First Time Setup

After opening CluesVault:

1. **Login Screen Appears**
   - Enter email (e.g., `john@cluesvault.com`)
   - Enter password (e.g., `SecurePass123!`)
   - Click "Continue"

2. **App Opens**
   - 16 pre-loaded APIs display
   - Ready to use immediately

3. **Test It Out**
   - Search for "OpenAI"
   - Click "Edit" on any card
   - See all 24 fields
   - Close without saving

---

## Core Features - 30 Second Tour

### Search & Filter
- **Search box:** Type any keyword
- **Product filter:** Filter by CLUES product
- **Category filter:** Group by category
- **Status filter:** Active/Testing/Deprecated
- **A-Z nav:** Click letters to filter

### Create New API
1. Click "+ New API"
2. Fill in fields (only Name required)
3. Click "Save API"
4. Done!

### Edit API
1. Click "Edit" on any card
2. Update fields
3. Click "Save API"
4. Changes saved instantly

### Delete API
1. Click "Delete" on any card
2. Confirm
3. Gone!

### Export Data
- **JSON:** Full structured export
- **CSV:** Open in Excel/Sheets
- **JavaScript:** Import in JS projects
- **Python:** Use in Python scripts

### Import Data
1. Click "Import JSON"
2. Select JSON file
3. Data replaces current vault

---

## The 24 Data Fields

Every API entry tracks:

**Basic Info (7)**
- API ID
- Name
- Status (Active/Testing/Deprecated)
- Products (which apps use it)
- Category
- Description
- Tags

**API Configuration (5)**
- Base URL
- Documentation URL
- Auth Method
- Environment Variables (prod/dev)

**Account Info (3)**
- Account Email
- Login Portal URL
- Password/Hint

**Login Credentials (5) ⭐ NEW**
- User ID
- Username
- Personal Code
- Passcode
- Combined Credentials Notes

**API Keys & Tokens (4)**
- API Key/Token
- Token Management Portal
- Last Rotation Date
- Secret Storage Location

**Additional (1)**
- Notes

---

## Common Tasks

### Add Your First API

```
1. Click "+ New API"
2. Name: Stripe
3. Status: Active
4. Products: Check "CLUES Core"
5. Category: Payments
6. Description: Payment processing for CLUES
7. Base URL: https://api.stripe.com
8. Account Email: your@email.com
9. User ID: acct_xyz123
10. Username: your_username
11. Click "Save API"
```

### Search for APIs

```
- Search: "payment" → Shows Stripe
- Search: "CLUES Core" → Shows all CLUES APIs
- Search: "critical" → Shows tagged APIs
```

### Filter by Product

```
1. Select dropdown: "Filter by product"
2. Choose: "CLUES Core"
3. See only CLUES Core APIs
```

### Export Your Vault

```
1. Click "Export JSON"
2. File downloads
3. Backup saved!
```

### Import Vault on New Device

```
1. Click "Import JSON"
2. Select backup file
3. Vault restored!
```

---

## Tips & Tricks

### Organize with Tags
Use tags for quick filtering:
- `critical` - Mission critical APIs
- `paid` - Paid services
- `external` - Third-party services
- `internal` - Your own APIs
- `deprecated` - Old/unused

### Use Secret Location
Don't store actual keys in CluesVault!
Instead note where they're stored:
- `1Password › CLUES › API Name`
- `Vercel › Environment Variables`
- `AWS Secrets Manager › prod/api-keys`

### Product Organization
Assign APIs to products to see dependencies:
- Which APIs does CLUES Core use?
- What needs to be set up for new project?
- What can be deprecated safely?

### Regular Maintenance
- Rotate tokens → Update "Last Rotated" date
- Deprecated API → Change status
- New environment → Add to products
- Export monthly → Backup your vault

---

## Security Best Practices

✅ **DO:**
- Store real secrets in 1Password/Secrets Manager
- Use CluesVault as a directory/reference
- Keep devices/browsers secure
- Export regular backups

❌ **DON'T:**
- Treat as password manager replacement
- Share login credentials
- Use on public/shared computers
- Store highly sensitive data

---

## Keyboard Shortcuts

- **Ctrl/Cmd + F** - Focus search box
- **Escape** - Close modal
- **Enter** - Submit form
- **Tab** - Navigate fields

---

## Mobile Usage

CluesVault works great on mobile:

1. Open your deployment URL
2. Add to home screen (iOS/Android)
3. Use like native app
4. All features work
5. Data syncs via browser storage

---

## What's Next?

After basic setup:

1. **Customize:** Add all your APIs
2. **Organize:** Tag and categorize
3. **Backup:** Export JSON regularly
4. **Share:** Deploy and share URL with team
5. **Maintain:** Keep credentials updated

---

## Need Help?

- **Testing:** See `TESTING-CHECKLIST.md`
- **Deployment:** See `DEPLOYMENT-GUIDE.md`
- **Issues:** See `TROUBLESHOOTING.md`
- **Full Docs:** See `README.md`

---

## Support

**Email:** cluesnomads@gmail.com  
**Company:** John E. Desautels & Associates  
**Website:** https://cluesnomad.com

---

**Happy vault management! 🔐**
