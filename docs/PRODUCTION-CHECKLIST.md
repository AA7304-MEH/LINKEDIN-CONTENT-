# Production Deployment Verification Checklist

Run these tests after your Vercel deployment completes.

## 1. PUBLIC SITE VERIFICATION
- [ ] **Landing Page**: Visit the root URL. Ensure it loads correctly.
- [ ] **User Auth**: Sign up or log in as a normal user.
- [ ] **Dashboard**: Ensure user dashboard works without any admin links.
- [ ] **Isolation**: Visit `/admin` on the public site. It MUST return a **404 NOT FOUND**.
- [ ] **API Security**: Try hitting `/api/admin/login`. It SHOULD 404 or be unavailable.

## 2. ADMIN SITE VERIFICATION
- [ ] **Root Redirect**: Visit the root URL. It SHOULD redirect to `/admin`.
- [ ] **Admin Login**: Visit `/admin/login`. Ensure the login form appears.
- [ ] **OTP Delivery**: Enter `resonate.admin8153@protonmail.com`. Check ProtonMail for the OTP (powered by Zoho).
- [ ] **Dashboard Access**: Enter the OTP and verify access to all engines (Marketing, Outreach, Support).
- [ ] **SMTP Diagnostic**: Call `https://your-admin-url.com/api/admin/test-smtp` with secret header.

## 3. ENGINE VERIFICATION
- [ ] **Marketing**: Generate a LinkedIn post.
- [ ] **Outreach**: Sync users or test an email sequence.
- [ ] **Support**: Create a ticket from the public site and ensure it appears in the admin dashboard.
