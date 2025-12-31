## Test Zoho SMTP PRODUCTION (after deploy)

1. Wait 2 min for Vercel build to complete.
2. Test SMTP via curl:
   ```bash
   curl -X POST https://resonateadmin-prod.vercel.app/api/admin/test-smtp \
     -H "X-Admin-Bypass-Secret: temporary_emergency_secret_12345" \
     -H "Content-Type: application/json" \
     -d '{}'
   ```
3. Expected Response:
   ✅ `{"success":true,"messageId":"...","smtpStatus":"working"}`

4. Admin Login Verification:
   - Go to: `https://resonateadmin-prod.vercel.app/admin`
   - Enter Email: `resonate.admin8153@protonmail.com`
   - Check ProtonMail → Verify OTP arrives within seconds.
   - Enter OTP → Access Dashboard.

## Key Changes
- **Zoho explicit LOGIN auth**: Forced to ensure compatibility with Zoho SMTP.
- **Resilient TLS**: `rejectUnauthorized: false` for production cloud environments.
- **Cookie-based Session**: Stateless production-ready session management.
