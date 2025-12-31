# Vercel Production Environment Variables

Use this list to configure your Vercel projects. Ensure "Production" environment is selected for all.

## 1. ADMIN PROJECT (resonateadmin)

| Variable | Value / Note |
|----------|--------------|
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `resonateteam@zohomail.com` |
| `SMTP_PASS` | `t6b3LFSMXB1P` |
| `EMAIL_FROM_ADDRESS` | `resonateteam@zohomail.com` |
| `ADMIN_BYPASS_SECRET` | `temporary_emergency_secret_12345` |
| `ADMIN_EMAIL_ALLOWLIST` | `resonate.admin8153@protonmail.com` |
| `ADMIN_OTP_SECRET` | `generate_a_random_32_char_string` |
| `AUTH_SESSION_SECRET` | `generate_another_random_32_char_string` |
| `MAKE_SOCIAL_POST_WEBHOOK_URL` | `your_make_webhook_url_here` |
| `APP_BASE_URL` | `https://resonateadmin-xyz.vercel.app` |
| `DATABASE_URL` | `your_admin_database_connection_string` |
| `NODE_ENV` | `production` |

## 2. PUBLIC PROJECT (LINKEDIN-CONTENT-)

| Variable | Value / Note |
|----------|--------------|
| `DATABASE_URL` | `your_user_database_connection_string` |
| `NEXTAUTH_SECRET` | `generate_a_random_32_char_string` |
| `NEXTAUTH_URL` | `https://linkedin-content-abc.vercel.app` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `your_clerk_publishable_key` |
| `CLERK_SECRET_KEY` | `your_clerk_secret_key` |
| `APP_BASE_URL` | `https://linkedin-content-abc.vercel.app` |
| `NODE_ENV` | `production` |
