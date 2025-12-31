Write-Host "[ADMIN] === DEPLOYING ADMIN REPO ==="
Set-Location "d:\linkedin content generator\admin-repo"
npm ci --legacy-peer-deps
npm run build
Write-Host "Admin build OK"
vercel --prod --name resonateadmin-prod --confirm

Write-Host "`n[PUBLIC] === DEPLOYING PUBLIC REPO ==="
Set-Location "d:\linkedin content generator\public-repo"
npm ci --legacy-peer-deps
npm run build
Write-Host "Public build OK"
vercel --prod --name resonate-public-prod --confirm

Set-Location "d:\linkedin content generator"
Write-Host "`n[SUCCESS] PRODUCTION DEPLOYMENT COMPLETE!"
Write-Host "=================================="
Write-Host "👥 PUBLIC (Users): https://resonate-public-prod.vercel.app"
Write-Host "🔐 ADMIN (You):    https://resonateadmin-prod.vercel.app/admin"
Write-Host "=================================="
