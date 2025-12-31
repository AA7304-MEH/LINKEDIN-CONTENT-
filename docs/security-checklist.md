# Security Verification Checklist

## 1. Environment Setup
- [ ] Check `.env` contains `ADMIN_EMAIL_ALLOWLIST`, `AUTH_SESSION_SECRET`, `ADMIN_OTP_SECRET`, `INTERNAL_CRON_SECRET`, `MAKE_SOCIAL_CALLBACK_SECRET`.
- [ ] Ensure `ADMIN_EMAIL_ALLOWLIST` matches your proton mail exactly.

## 2. Admin Login Flow
- [ ] Go to `/admin/login`. Verify input accepts email.
- [ ] Enter a NON-admin email.
    - [ ] Result: Check "Access Denied" or generic success (check Network tab for 403 or success).
    - [ ] Check console Logs for `SECURITY_AUDIT` even `ACCESS_DENIED_GENERIC` or similar.
- [ ] Enter valid admin email (`resonate.admin8153@protonmail.com`).
    - [ ] Result: Page redirects to `/admin/verify`.
    - [ ] Email: Check Zoho mail for OTP code.
- [ ] Go to `/admin/verify`.
    - [ ] Enter INVALID code. Result: Error message.
    - [ ] Enter VALID code. Result: Redirect to `/admin/dashboard` (or first available admin page).

## 3. UI Protection
- [ ] Try to access `/admin/marketing` directly in an Incognito window (logged out).
    - [ ] Result: Redirect to `/admin/login`.
- [ ] Login as a regular user (if possible via Clerk). Try to access `/admin/marketing`.
    - [ ] Result: Redirect to `/admin/login` or 403.

## 4. API Protection (Engine Lock)
- [ ] Use Postman/Curl to POST to `/api/admin/marketing/generate`.
    - [ ] Helper: `curl -X POST http://localhost:3000/api/admin/marketing/generate`
    - [ ] Result: `401 Unauthorized` or `403 Forbidden` JSON.
    - [ ] Audit Log: Check console for `AUTH_FAIL_ADMIN`.

## 5. Cron & Webhook Protection
- [ ] GET `/api/cron/marketing` without header.
    - [ ] Result: `403 Forbidden`.
- [ ] GET `/api/cron/marketing` WITH header `x-cron-secret: <INTERNAL_CRON_SECRET>`.
    - [ ] Result: Success (200).
- [ ] POST `/api/webhooks/marketing` without header `x-webhook-secret` or query `?secret=...`.
    - [ ] Result: `403 Forbidden`.

## 6. Unsubscribe
- [ ] Test unsubscribe public link (if available). Ensure it works without login but requires token.
