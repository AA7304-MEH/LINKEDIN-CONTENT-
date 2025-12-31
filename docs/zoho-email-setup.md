
# Zoho Mail SMTP Setup & Outreach Engine Guide

## 1. Description
This module enables "Resonate" to send outreach emails and handle support tickets using your Zoho Mail account via SMTP.

## 2. Environment Setup (Required)
Update your `.env.local` or `.env` file with real credentials.

```properties
# Zoho SMTP Settings
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resonateteam@zohomail.com
SMTP_PASS=YOUR_ZOHO_APP_PASSWORD  <-- REQUIRED
EMAIL_FROM_NAME=Resonate
EMAIL_FROM_ADDRESS=resonateteam@zohomail.com
EMAIL_REPLY_TO=resonateteam@zohomail.com

# Admin Notifications
SUPPORT_NOTIFICATION_EMAIL=resonateteam@zohomail.com
ADMIN_NOTIFICATION_EMAIL=resonateteam@zohomail.com

# Security
UNSUBSCRIBE_SECRET=some_random_secret_string_here
APP_BASE_URL=https://your-domain.com
```

### How to get Zoho App Password
1. Log in to your Zoho Mail account.
2. Go to [Zoho Accounts Security](https://accounts.zoho.com/home#security/twofactor_auth).
3. If 2FA is enabled (recommended), go to **App Passwords**.
4. Generate a new app password named "Resonate App".
5. Use this password in `SMTP_PASS`. (Note: Zoho app passwords are usually 12-16 characters long).

## 3. Running Outreach Automation
The outreach engine requires a recurring job to process queued emails.

### Local Development
Invoke the endpoint manually:
`GET http://localhost:3000/api/outreach/run`

### Production (Vercel Cron)
Add a `vercel.json` to your project root to schedule the cron job (if on Vercel Pro).

```json
{
  "crons": [
    {
      "path": "/api/outreach/run",
      "schedule": "0 * * * *"
    }
  ]
}
```
*Note: This runs once every hour.*

## 4. Admin Dashboard
Access the new admin dashboards at:
- **Support Inbox**: `/admin/support`
- **Outreach Manager**: `/admin/outreach`

## 5. Troubleshooting
- **Error: Invalid login**: Check your `SMTP_USER` and `SMTP_PASS`. Ensure you are using an **App Password** if 2FA is on.
- **Error: ETIMEDOUT**: Check firewall settings or try `SMTP_PORT=465` and `SMTP_SECURE=true`.
- **Emails to Spam**: Ensure your domain has proper SPF and DKIM records set up in Zoho Mail Control Panel.
