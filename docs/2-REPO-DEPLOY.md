# Resonate Deployment Checklist (2-Repo Architecture)

## 1. ADMIN REPO: matricphase-dot/resonateadmin
**Goal**: Core engines, admin dashboard, SMTP logic.

### Deployment steps:
1. `cd admin-repo`
2. `vercel --prod`
3. Connect to GitHub: `matricphase-dot/resonateadmin`

### Environment Variables:
- `SMTP_HOST=smtp.zoho.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=resonateteam@zohomail.com`
- `SMTP_PASS=t6b3LFSMXB1P`
- `ADMIN_BYPASS_SECRET=temporary_emergency_secret_12345`
- `ADMIN_EMAIL_ALLOWLIST=resonate.admin8153@protonmail.com`
- `APP_BASE_URL=https://resonateadmin-xyz.vercel.app`

---

## 2. PUBLIC REPO: AA7304-MEH/LINKEDIN-CONTENT-
**Goal**: User-facing site, landing page, signups.

### Deployment steps:
1. `cd public-repo`
2. `vercel --prod`
3. Connect to GitHub: `AA7304-MEH/LINKEDIN-CONTENT-`

### Environment Variables:
- `DATABASE_URL=your_user_db`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key`
- `CLERK_SECRET_KEY=your_secret`
- `APP_BASE_URL=https://linkedin-content-abc.vercel.app`

---

## 3. Verification Commands
Run from terminal to verify separate deployment:

### Test Admin API
```bash
curl -X POST https://resonateadmin-xyz.vercel.app/api/admin/test-smtp \
  -H "X-Admin-Bypass-Secret: temporary_emergency_secret_12345" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Check Public Site
Visit: `https://linkedin-content-abc.vercel.app/`
Verify that visiting `/admin` returns a **404 NOT FOUND**.
