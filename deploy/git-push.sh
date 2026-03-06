#!/bin/bash
echo "🚀 Pushing ADMIN repo..."
cd "d:\linkedin content generator\admin-repo"
git init
if ! git remote | grep -q 'origin'; then
  git remote add origin https://github.com/matricphase-dot/resodinadmin.git
fi
git checkout -b main
git add .
git commit -m "v1.0 - Production admin + engines"
git push -f origin main

echo "🚀 Pushing PUBLIC repo..."
cd "d:\linkedin content generator\public-repo"
git init
if ! git remote | grep -q 'origin'; then
  git remote add origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git
fi
git checkout -b main
git add .
git commit -m "v1.0 - Production public site (clean)"
git push -f origin main

echo "✅ Both repos pushed to GitHub!"
