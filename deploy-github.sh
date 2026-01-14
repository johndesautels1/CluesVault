#!/bin/bash

# CluesVault GitHub Deployment Script
# Run this to initialize Git and push to GitHub

echo "🚀 CluesVault GitHub Deployment"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Install from: https://git-scm.com/"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .
echo "✅ Files added"

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "CluesVault v2.0 - React + Vite with credential management"
echo "✅ Commit created"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main
echo "✅ Main branch set"

# Instructions for remote
echo ""
echo "======================================"
echo "📤 NEXT STEPS:"
echo "======================================"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Name it: CluesVault"
echo ""
echo "3. Run this command (replace YOUR_USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/CluesVault.git"
echo "   git push -u origin main"
echo ""
echo "4. Then deploy on Vercel:"
echo "   https://vercel.com/new"
echo ""
echo "======================================"
