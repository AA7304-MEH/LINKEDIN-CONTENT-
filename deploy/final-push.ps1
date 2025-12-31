Write-Host "[ADMIN] === ADMIN REPO (matricphase-dot/resonateadmin) ==="
Set-Location "d:\linkedin content generator\admin-repo"
if (!(Test-Path .git)) { git init }
git remote add origin https://github.com/matricphase-dot/resonateadmin.git 2>$null
git remote set-url origin https://github.com/matricphase-dot/resonateadmin.git
git checkout -b main 2>$null
git add .
git commit -m "v1.0 PRODUCTION - All engines + admin dashboard (Zoho SMTP)"
git push -f origin main
Write-Host "[SUCCESS] Admin repo pushed: https://github.com/matricphase-dot/resonateadmin"

Write-Host "`n[PUBLIC] === PUBLIC REPO (AA7304-MEH/LINKEDIN-CONTENT-) ==="
Set-Location "d:\linkedin content generator\public-repo"
if (!(Test-Path .git)) { git init }
git remote add origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git 2>$null
git remote set-url origin https://github.com/AA7304-MEH/LINKEDIN-CONTENT-.git
git checkout -b main 2>$null
git add .
git commit -m "v1.0 PRODUCTION - Clean public site (NO admin/engines)"
git push -f origin main
Write-Host "[SUCCESS] Public repo pushed: https://github.com/AA7304-MEH/LINKEDIN-CONTENT-"

Set-Location "d:\linkedin content generator"
Write-Host "DONE: ALL LATEST CODE PUSHED TO GITHUB!"
