## Test Zoho SMTP (12-char password OK)

1. Update .env.local → SMTP_PASS=your_12char_code
2. npm run dev
3. Test:
   curl -X POST http://localhost:3000/api/admin/test-smtp \
     -H "X-Admin-Bypass-Secret: temporary_emergency_secret_12345" \
     -H "Content-Type: application/json" \
     -d '{}'

Expected: {"success":true}

4. Check resonateteam@zohomail.com → Sent folder
5. Check resonate.admin8153@protonmail.com → Inbox
