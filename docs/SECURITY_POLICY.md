# Security Policy

## Core Principles
1.  **Deny by Default**: Any route not explicitly public or allowlisted is denied.
2.  **Server-Side Enforcement**: UI hiding is insufficient; authorization must happen on the server.
3.  **Centralized Logic**: Use `src/lib/security/authz.ts` for all checks.

## Roles
- **Public**: Unauthenticated visitors.
- **User**: Authenticated customers.
- **Admin**: Authenticated super-admin (`resonate.admin8153@protonmail.com`).
- **Cron**: Requests with valid `x-cron-secret` header.
- **Webhook**: Requests with valid provider signature/secret.

## Access Rules

### 1. Admin Access
- **Who**: Only `resonate.admin8153@protonmail.com` can access `/admin/*` (except login) and `/api/admin/*`.
- **Enforcement**:
    - UI: `requireAdmin()` in `app/admin/layout.tsx`.
    - API: `requireAdmin()` at the start of every admin route handler.
    - Middleware: Reject `/admin/*` and `/api/admin/*` if not authenticated (early gate).

### 2. User Access
- **Who**: Logged-in users.
- **Enforcement**:
    - UI: `requireUser()` (or auth guard) in user dashboards.
    - API: `requireUser()` in user-facing endpoints.

### 3. Engine Protection (Marketing, Outreach, Support)
- **Status**: **INTERNAL ONLY**.
- **Rule**: No regular user can access engine endpoints.
- **Specifics**:
    - `api/marketing/generate` -> Admin only.
    - `api/outreach/run` -> Admin only.
    - `api/support/tickets` (list) -> Admin only.

### 4. Cron & Automations
- **Cron**: Must have `INTERNAL_CRON_SECRET`.
    - Endpoint: `/api/marketing/cron`
- **Webhooks**: Must have `MAKE_SOCIAL_CALLBACK_SECRET`.
    - Endpoint: `/api/marketing/make-callback`

## Environment Variables
Required for security to function:
- `ADMIN_EMAIL_ALLOWLIST`
- `AUTH_SESSION_SECRET`
- `ADMIN_OTP_SECRET`
- `INTERNAL_CRON_SECRET`
- `MAKE_SOCIAL_CALLBACK_SECRET`
- `ADMIN_LOGIN_RATE_LIMIT_PER_MIN`
