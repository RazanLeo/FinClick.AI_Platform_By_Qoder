#!/bin/bash

# FinClick.AI Platform Package Creator
# Creates a clean, production-ready ZIP package

echo "🚀 Creating FinClick.AI Platform Package..."

# Create temporary directory
TEMP_DIR="FinClick.AI_Platform_Production"
rm -rf "$TEMP_DIR"
mkdir "$TEMP_DIR"

# Copy essential files and directories
echo "📁 Copying project files..."

# Core application files
cp -r app "$TEMP_DIR/"
cp -r components "$TEMP_DIR/"
cp -r lib "$TEMP_DIR/"
cp -r types "$TEMP_DIR/"
cp -r public "$TEMP_DIR/"
cp -r styles "$TEMP_DIR/"
cp -r hooks "$TEMP_DIR/"

# Configuration files
cp package.json "$TEMP_DIR/"
cp tsconfig.json "$TEMP_DIR/"
cp next.config.mjs "$TEMP_DIR/"
cp postcss.config.mjs "$TEMP_DIR/"
cp components.json "$TEMP_DIR/"
cp vercel.json "$TEMP_DIR/"

# Environment and deployment files
cp .env.example "$TEMP_DIR/"
cp .env.production "$TEMP_DIR/"
cp .gitignore "$TEMP_DIR/"

# Documentation
cp README.md "$TEMP_DIR/"
cp DEPLOYMENT_GUIDE.md "$TEMP_DIR/"
cp VERCEL_DEPLOYMENT.md "$TEMP_DIR/"

# GitHub workflows
cp -r .github "$TEMP_DIR/" 2>/dev/null || echo "No .github directory found"

# Create ZIP package
echo "📦 Creating ZIP package..."
zip -r "FinClick.AI_Platform_Complete_$(date +%Y%m%d_%H%M%S).zip" "$TEMP_DIR"

# Cleanup
rm -rf "$TEMP_DIR"

echo "✅ Package created successfully!"
echo "📍 Location: $(pwd)/FinClick.AI_Platform_Complete_$(date +%Y%m%d_%H%M%S).zip"
echo ""
echo "📋 Package Contents:"
echo "   ✅ Complete source code"
echo "   ✅ All 180 analysis types"
echo "   ✅ AI system components"
echo "   ✅ Payment integration"
echo "   ✅ Database configurations"
echo "   ✅ Deployment files"
echo "   ✅ Documentation"
echo ""
echo "🚀 Ready for upload to GitHub and deployment to Vercel!"