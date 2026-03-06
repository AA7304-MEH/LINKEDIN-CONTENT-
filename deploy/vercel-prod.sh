#!/bin/bash
cd "d:/linkedin content generator"

echo "🔐 === DEPLOYING ADMIN REPO ==="
cd admin-repo
npm ci --legacy-peer-deps
npm run build
echo "Admin build OK"
vercel --prod --name resodinadmin-prod --confirm

echo ""
echo "🚀 === DEPLOYING PUBLIC REPO ==="
cd "../public-repo"
npm ci --legacy-peer-deps
npm run build
echo "Public build OK"
vercel --prod --name resodin-public-prod --confirm

echo ""
echo "🎉 PRODUCTION DEPLOYMENT COMPLETE!"
echo "=================================="
echo "👥 PUBLIC (Users): https://resodin-public-prod.vercel.app"
echo "🔐 ADMIN (You):    https://resodinadmin-prod.vercel.app/admin"
echo "=================================="
