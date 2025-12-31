## PRODUCTION VERIFICATION (Run after deploy)

### 1. PUBLIC SITE
https://resonate-public-prod.vercel.app/
- [ ] Landing page loads (check animations & gradients)
- [ ] User signup/login works (Clerk)
- [ ] Dashboard accessible (check PostDisplay & ContentForm)
- [ ] Verify NO admin links or engines are visible
- [ ] /admin returns a clean 404

### 2. ADMIN SITE  
https://resonateadmin-prod.vercel.app/admin
- [ ] Login screen loads with OTP form
- [ ] Enter: resonate.admin8153@protonmail.com
- [ ] Verify OTP email arrives (check Zoho SMTP logs if needed)
- [ ] Enter OTP and gain access to Dashboard
- [ ] Test Support Tickets & Outreach Engines

### 3. SMTP Engine Test
- [ ] Run test SMTP route:
  ```bash
  curl -X POST https://resonateadmin-prod.vercel.app/api/admin/test-smtp \
    -H "X-Admin-Bypass-Secret: temporary_emergency_secret_12345"
  ```
- [ ] Verify response: `{"success":true}`
- [ ] Check inbox `resonate.admin8153@protonmail.com` for the test email.

### 4. Marketing & Cron
- [ ] Verify `/api/cron/marketing` is secure (returns 401 without secret)
- [ ] Check `MarketingDashboard` for content generation functionality (requires Gemini Key)
