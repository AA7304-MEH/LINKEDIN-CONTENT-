#!/bin/bash
cd "d:/linkedin content generator"

echo "🔐 === ADMIN REPO (matricphase-dot/resodinadmin) ==="
cd admin-repo
git init
git remote add origin https://github.com/matricphase-dot/resodinadmin.git || git remote set-url origin https://github.com/matricphase-dot/resodinadmin.git
git checkout -b main
git add .
git rm -r --cached . 2>/dev/null || true
git add .
git commit -m "v1.0 PRODUCTION - All engines + admin dashboard (Zoho SMTP)"
git push -f origin main
echo "✅ Admin repo pushed: https://github.com/matricphase-dot/resodinadmin"

echo ""
echo "🚀 === PUBLIC REPO (AA7304-MEH/LINKEDIN-CONTENT-) ==="
cd "../public-repo"
git init
git remote add origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git || git remote set-url origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git
git checkout -b main
git add .
git rm -r --cached . 2>/dev/null || true
git add .
git commit -m "v1.0 PRODUCTION - Clean public site (NO admin/engines)"
git push -f origin main
echo "✅ Public repo pushed: https://github.com/AA7304-MEH/LINKEDIN-CONTENT-"

echo "🎉 ALL LATEST CODE PUSHED TO GITHUB!"
