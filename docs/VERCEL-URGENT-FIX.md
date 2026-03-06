## 🚨 VERCEL ENV VARS - COPY PASTE NOW

Go to: https://vercel.com/dashboard (Select resodinadmin project → Settings → Environment Variables)

ADD THESE EXACTLY:

| Key | Value |
|-----|-------|
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `resodinteam@zohomail.com` |
| `SMTP_PASS` | `t6b3LFSMXB1P` |
| `EMAIL_FROM_ADDRESS` | `resodinteam@zohomail.com` |
| `ADMIN_BYPASS_SECRET` | `temporary_emergency_secret_12345` |
| `ADMIN_EMAIL_ALLOWLIST` | `resodin.admin8153@protonmail.com` |
| `APP_BASE_URL` | `https://resodinadmin.vercel.app` |
| `NODE_ENV` | `production` |

### Post-Configuration:
1. Go to **Deployments** tab.
2. Click the three dots on the latest production deployment.
3. Click **Redeploy** to apply the new variables.
