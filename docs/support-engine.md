# Support AI Engine Documentation

This system integrates a Knowledge Base, AI Chat, and Ticketing system into Resonate.

## Components

### 1. Database Schema
New models in `prisma/schema.prisma`:
- `SupportFAQ`: Stores frequently asked questions.
- `SupportArticle`: Stores longer content.
- `SupportTicket`: Stores user tickets.
- `SupportTicketEvent`: Tracks ticket history (replies, status changes).

> [!IMPORTANT]
> You MUST run `npx prisma db push` to apply these schema changes, as the automatic attempt failed due to environment issues.

### 2. Admin Dashboard (`/admin/support`)
- **Tickets Tab**: View, filter, and manage support tickets.
- **Knowledge Base Tab**: Create/Edit/Delete FAQs and Articles.
- **Ticket Details**: Click "View" on a ticket to see the conversation and reply.
  - Replies are sent via Zoho Mail (`resonateteam@zohomail.com`).

### 3. User Widget
- Floating button in the bottom-right of the logged-in app.
- **AI Chat**: Answers questions using Gemini based *only* on published KB items.
- **Ticket Fallback**: If AI fails or user clicks "Contact Support", a ticket form is shown.

### 4. API Routes
- `GET /api/support/tickets`: Admin list of tickets.
- `POST /api/support/tickets`: Create a ticket (sends email).
- `POST /api/support/ask`: AI Q&A endpoint.
- `/api/admin/support/*`: CRUD for KB.

## Environment Variables
Ensure these are set in `.env`:
- `DATABASE_URL`: Postgres connection.
- `GOOGLE_GENERATIVE_AI_API_KEY`: For Gemini.
- `SMTP_USER` / `SMTP_PASS`: Zoho Mail credentials.
- `SUPPORT_NOTIFICATION_EMAIL`: Email to receive ticket alerts (default: `resonateteam@zohomail.com`).
- `APP_BASE_URL`: Base URL for links in emails (e.g., `http://localhost:3000`).

## Troubleshooting
- **AI not answering**: Ensure FAQs/Articles are "Published".
- **Emails not sending**: Check Zoho credentials and `SMTP_SECURE` settings.
- **Database errors**: Run `npx prisma db push` manually.
