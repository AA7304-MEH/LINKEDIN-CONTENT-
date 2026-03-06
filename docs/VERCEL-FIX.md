## 🚨 VERCEL ENV VARS MUST BE SET (Project Settings → Environment Variables)

ADMIN PROJECT (resodinadmin-*.vercel.app):
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resodinteam@zohomail.com
SMTP_PASS=t6b3LFSMXB1P
EMAIL_FROM_ADDRESS=resodinteam@zohomail.com
ADMIN_BYPASS_SECRET=temporary_emergency_secret_12345
ADMIN_EMAIL_ALLOWLIST=resodin.admin8153@protonmail.com
APP_BASE_URL=https://resodinadmin-prod.vercel.app
NODE_ENV=production

## IMMEDIATE TEST (after deploy):
curl -X POST https://resodinadmin-prod.vercel.app/api/admin/test-smtp \
-H "X-Admin-Bypass-Secret: temporary_emergency_secret_12345"
