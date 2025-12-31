# Traffic & Marketing Module

This module automates the generation, scheduling, and publishing of social media content for Resonate.

## Overview
-   **Admin Dashboard**: `/admin/marketing`
-   **API Endpoints**:
    -   `GET /api/marketing/settings`: Fetch configuration.
    -   `POST /api/marketing/settings`: Update configuration.
    -   `POST /api/marketing/generate`: Trigger AI generation.
    -   `POST /api/marketing/publish`: Publish a specific post.
    -   `GET /api/marketing/posts`: List posts.
    -   `GET /api/marketing/cron`: Daily scheduler job.

## Configuration
Ensure the following environment variables are set in `.env.local`:

```env
# Database
DATABASE_URL="..."

# Auth
ADMIN_EMAILS="your-email@example.com,another-admin@example.com"

# AI Provider
GOOGLE_GENERATIVE_AI_API_KEY="..." # or OPENAI_API_KEY

# Publishing
SOCIAL_POST_WEBHOOK_URL="https://hooks.zapier.com/..." # Optional, for real publishing

# Security
CRON_SECRET="some-secure-string"
```

## Scheduling (Cron)
To run the generator daily:

1.  **Vercel Cron**:
    Add `vercel.json` (if not present) with:
    ```json
    {
      "crons": [
        {
          "path": "/api/marketing/cron",
          "schedule": "0 9 * * *"
        }
      ]
    }
    ```
2.  **GitHub Actions / External**:
    Make a daily HTTP GET request to `https://your-domain.com/api/marketing/cron` with header `Authorization: Bearer <CRON_SECRET>`.

## Usage
1.  Go to `/admin/marketing`.
2.  Fill in "Settings" (Product Name, Audience, etc.).
3.  Go to "Posts & Generation" tab.
4.  Click "Generate New Drafts".
5.  Review drafts, click "Publish" to test immediately.
