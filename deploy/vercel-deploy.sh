#!/bin/bash
echo "🔐 Deploying ADMIN repo..."
cd "d:\linkedin content generator\admin-repo"
npm install
npm run build
vercel --prod

echo "🚀 Deploying PUBLIC repo..."
cd "d:\linkedin content generator\public-repo"
npm install
npm run build
vercel --prod

echo "✅ PRODUCTION DEPLOYMENT TRIGGERED!"
echo "Check your Vercel dashboard for final URLs."
