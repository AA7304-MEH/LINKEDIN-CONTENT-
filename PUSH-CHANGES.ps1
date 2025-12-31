Write-Host "🚀 STARTING PRODUCTION SYNC..." -ForegroundColor Cyan

# 1. Admin Repo
Write-Host "`n--- SYNCING ADMIN REPO ---" -ForegroundColor Yellow
Set-Location "d:\linkedin content generator\admin-repo"
git remote set-url origin https://github.com/AA7304-MEH/resonateadmin.git
git add .
git commit -m "FIX: Hardened Zoho SMTP + Detailed Error Logging + Build Stability"
git push -f origin main

# 2. Public Repo
Write-Host "`n--- SYNCING PUBLIC REPO ---" -ForegroundColor Yellow
Set-Location "d:\linkedin content generator\public-repo"
git remote set-url origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git
git add .
git commit -m "FIX: Security patch + Clean production build"
git push -f origin main

Write-Host "`n✅ ALL CHANGES PUSHED! Vercel is now building." -ForegroundColor Green
Write-Host "Please wait 2 minutes for the build to finish." -ForegroundColor Gray
Read-Host "Press Enter to exit"
