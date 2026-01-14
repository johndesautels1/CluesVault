# CluesVault - API Registry

**Secure, local-only API credential management for CLUES™ & Olivia platforms**

## Overview

CluesVault is a React-based web application that serves as a central vault for managing API credentials, tokens, and configuration for all CLUES platforms:

- CLUES Core
- CLUES: QI  
- CLUES: Valiant
- CLUES: TES
- Heart-Recovery_Calendar
- Olivia-Chatbot

## Features

✅ **24 Data Fields per API** (19 original + 5 new credential fields)
✅ **SHA-256 Authentication** - Secure login system
✅ **localStorage Persistence** - All data stored locally (no server required)
✅ **Advanced Filtering** - By product, category, status, search, A-Z
✅ **Export Capabilities** - JSON, CSV, JavaScript, Python
✅ **Import JSON** - Bulk import API configurations
✅ **16 Pre-loaded APIs** - OpenAI, Typeform, Stripe, Zapier, Google, etc.
✅ **Dark Glassmorphic UI** - Beautiful, modern design
✅ **Fully Responsive** - Works on desktop, tablet, mobile

## Data Fields

### Existing Fields (19)
- API ID, Name, Status
- Products, Category, Description
- Base URL, Docs URL, Auth Method
- Environment Variables (Prod/Dev)
- Account Email, Login URL, Password/Hint
- API Key/Token, Token Portal URL, Last Rotated
- Secret Location, Tags, Notes

### New Credential Fields (5)
- **User ID** - User ID for the service
- **Username** - Username for login
- **Personal Code** - Personal/customer identification code
- **Passcode** - Passcode or PIN
- **Login Credentials** - Combined login information/notes

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Opens at: http://localhost:3000

### 3. Login

**First Time:**
- Enter any email + password
- This creates your vault login

**Returning:**
- Enter same email + password

## Deployment to Vercel

### Option A: Vercel Dashboard (Easiest)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial CluesVault setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to https://vercel.com
3. Click "Import Project"
4. Connect GitHub repository
5. Deploy! (Settings auto-detected from vercel.json)

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

Your app will be live at: `https://cluesvault.vercel.app` (or custom domain)

## Project Structure

```
CluesVault/
├── src/
│   ├── components/
│   │   ├── APICard.jsx          # Individual API display card
│   │   ├── APIEditor.jsx        # Modal editor for API (24 fields)
│   │   ├── AlphabetNav.jsx      # A-Z filter navigation
│   │   ├── AuthModal.jsx        # Login/authentication
│   │   ├── Footer.jsx           # App footer
│   │   └── Toolbar.jsx          # Search, filters, export buttons
│   ├── utils/
│   │   ├── data.js              # Default APIs and constants
│   │   └── storage.js           # localStorage utilities
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # All styles (glassmorphic design)
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Build and deploy to Vercel
```

## Security Notes

⚠️ **IMPORTANT:** CluesVault stores all data in **browser localStorage**

- No data is transmitted to any server
- Data is stored only on the device/browser where accessed
- For maximum security:
  - Store actual API keys in 1Password or similar
  - Use CluesVault as a directory/reference tool
  - Treat the device/browser as sensitive

## Default Login

On first run, you create your own email/password combination.

**To reset:**
1. Open browser DevTools (F12)
2. Console tab
3. Run: `localStorage.clear()`
4. Refresh page

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires browser with:
- localStorage support
- Web Crypto API (for SHA-256)
- ES6+ JavaScript

## Customization

### Change Branding

Edit `src/components/Footer.jsx` and header in `src/App.jsx`

### Add More Default APIs

Edit `src/utils/data.js` - add to `DEFAULT_APIS` array

### Modify Styles

Edit `src/index.css` - CSS variables at top for colors

### Change Products List

Edit `src/utils/data.js` - modify `PRODUCTS` array

## Support

**Developer:** John E. Desautels & Associates
**Email:** cluesnomads@gmail.com  
**Website:** https://cluesnomad.com

## License

Private use only for John E. Desautels & Associates and CLUES™ platforms.

---

**CluesVault v2.0 - React Edition**  
Built with React 18 + Vite 6
