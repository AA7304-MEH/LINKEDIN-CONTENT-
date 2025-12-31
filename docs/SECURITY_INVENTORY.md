# Security Inventory

## Admin UI Routes (`/admin/*`)
| Route | Access Level | Description |
|---|---|---|
| `/admin/login` | **Public** | Admin login page (email entry) |
| `/admin/(protected)/dashboard` | **Admin** | Main admin dashboard |
| `/admin/(protected)/marketing` | **Admin** | Marketing engine dashboard |
| `/admin/outreach` | **Admin** | Outreach engine dashboard |
| `/admin/support` | **Admin** | Support ticket list |
| `/admin/support/[id]` | **Admin** | Support ticket detail |
| `/admin/support/KBManager` | **Admin** | Knowledge base manager |
| `/admin/(protected)/layout.tsx` | **Admin** | Protected layout (needs verification) |

## Public/User UI Routes
| Route | Access Level | Description |
|---|---|---|
| `/` | **Public** | Landing page |
| `/dashboard` | **User** | User dashboard |
| `/calendar` | **User** | Content calendar |
| `/comments` | **User** | Comment generator |
| `/extension` | **Public** | Extension info |
| `/hook-analyzer` | **Public** | Hook analyzer tool |
| `/onboarding` | **User** | User onboarding |
| `/pricing` | **Public** | Pricing page |
| `/repurpose` | **User** | Content repurposing |
| `/video-demo` | **Public** | Demo video page |

## API Routes (`/api/*`)

### Admin Engine APIs
| Route | Access Level | Description |
|---|---|---|
| `/api/admin/bootstrap` | **Admin** | System initialization |
| `/api/admin/login` | **Public** | Admin login (OTP request) |
| `/api/admin/logout` | **Admin** | Admin logout |
| `/api/admin/outreach/test-email` | **Admin** | Test email sender |
| `/api/admin/support/articles` | **Admin** | KB article management |
| `/api/admin/support/faqs` | **Admin** | FAQ management |
| `/api/admin/support/reply` | **Admin** | Reply to tickets |
| `/api/admin/support/tickets` | **Admin** | Ticket management |
| `/api/marketing/analytics` | **Admin** | Marketing analytics |
| `/api/marketing/articles` | **Admin** | Article handling |
| `/api/marketing/generate` | **Admin** | Marketing generation |
| `/api/marketing/posts` | **Admin** | Post management |
| `/api/marketing/publish` | **Admin** | Publish posts |
| `/api/marketing/settings` | **Admin** | Marketing settings |
| `/api/outreach/events` | **Admin** | Outreach event logging |
| `/api/outreach/leads` | **Admin** | Lead management |
| `/api/outreach/run` | **Admin** | Run outreach campaign |
| `/api/outreach/sequences` | **Admin** | Sequence management |
| `/api/outreach/sync-users` | **Admin** | User sync |

### User/Public APIs
| Route | Access Level | Description |
|---|---|---|
| `/api/analyze-hook` | **User/Public** | Hook analysis |
| `/api/create-order` | **User** | Payment processing |
| `/api/generate` | **User** | Content generation |
| `/api/generate-comment` | **User** | Comment generation |
| `/api/posts` | **User** | User posts |
| `/api/repurpose` | **User** | Repurposing logic |
| `/api/support/ask` | **User** | Submit support ticket |
| `/api/outreach/unsubscribe` | **Public** | Unsubscribe (Tokenized) |

### Cron & Webhooks
| Route | Access Level | Description |
|---|---|---|
| `/api/marketing/cron` | **Cron** | Scheduled tasks |
| `/api/marketing/make-callback` | **Webhook** | Make.com callback |

## Server Actions
*None explicitly found via `use server` search.*
