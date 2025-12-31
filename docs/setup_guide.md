# 🚀 Quick Start Guide: Setup for Free
Get your "Traffic & Marketing Engine" running in 5 minutes for $0.

## 1. Get Your Free AI Key (Google Gemini)
This key powers the content generation (Posts, Blogs, Hooks).

1.  **Go to Google AI Studio**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2.  **Sign in** with your Google account.
3.  Click **"Create API Key"**.
4.  Select a project (or "Create new project").
5.  **Copy the key** (example: `AIzaSyD...`).
6.  **Paste it** in your project's `.env.local` file:
    ```env
    GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyD...
    ```
    *(Or provide it to the chat agent to update it for you)*.

## 2. Get Your Automation Webhook (Make.com)
This allows the app to post to LinkedIn/Twitter automatically.

1.  **Sign up for Make (Free)**: [https://www.make.com/en/register](https://www.make.com/en/register)
2.  **Create a New Scenario**:
    *   Click "+ Create a new scenario" (top right).
    *   Click the big purple "+" button.
    *   Search for **"Webhooks"** -> Select **"Custom webhook"**.
3.  **Configure Webhook**:
    *   Click "Add" -> Name it "Resonate Post Receiver".
    *   Click "Save".
    *   **Copy the URL** (Address) shown (e.g., `https://hook.us1.make.com/abcdef12345...`).
4.  **Paste it in Resonate**:
    *   Go to your dashboard: [http://localhost:3000/admin/marketing](http://localhost:3000/admin/marketing)
    *   Click **Settings** tab.
    *   Scroll to **Automation Settings** and paste the URL.
    *   Click **Save Settings**.

## 3. Verify It Works
1.  **Generate a Post** (Posts tab).
2.  **Schedule it** for 5 minutes from now.
3.  **Wait**:
    *   In Make.com, click **"Run once"** to listen for the test.
    *   When the time comes, Resonate will send the data.
    *   If Make receives it (green checkmark), you are connected! ✅

---
### 💡 Next Steps in Make.com
Once you see the data arriving in Make, add the next module:
*   Click the little semi-circle on the right of the Webhook module.
*   Search **"LinkedIn"** -> **"Create a Post"**.
*   Connect your LinkedIn account.
*   Map the `content` field from the webhook to the `Content` field in LinkedIn.
