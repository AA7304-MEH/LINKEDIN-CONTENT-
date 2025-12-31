
# Make.com Automation Integration

Resonate supports fully automated social posting via Make.com (formerly Integromat).
This allows you to bypass complex direct API integrations (LinkedIn/Twitter) and use a visual scenario builder.

## 1. How it Works
1.  **Resonate** checks for scheduled posts every 5 minutes (via Cron).
2.  If a post is due and `Make Webhook URL` is configured, Resonate sends a POST request to Make.
3.  **Make.com** receives the data, posts to LinkedIn/Twitter/etc.
4.  (Optional) **Make.com** calls back to Resonate to confirm success or failure.

## 2. Configuration (`/admin/marketing` -> Settings)
*   **Make Webhook URL**: The URL provided by your Make "Custom Webhook" trigger.
*   **Callback Secret**: A shared string (e.g., "my-secret-token") to secure the callback endpoint.

## 3. Webhook Payload (Resonate -> Make)
Resonate sends the following JSON body to your Make Webhook:

```json
{
  "postId": "123e4567-e89b-12d3-a456-426614174000",
  "platform": "linkedin",
  "content": "Check out our new AI tool! #AI \n\nhttps://resonate.app/r/123e...",
  "trackingUrl": "https://resonate.app/r/123e...",
  "scheduledAt": "2025-01-01T12:00:00.000Z",
  "metadata": {
    "campaign": "launch-campaign",
    "primaryWebsiteUrl": "https://resonate.app"
  }
}
```

## 4. Make Scenario Setup
1.  **Trigger**: Custom Webhook.
2.  **Steps**:
    *   **Router**: Check `platform` value.
    *   **Route 1 (LinkedIn)**: Use LinkedIn "Create a Post" module. Map `content`.
    *   **Route 2 (Twitter)**: Use Twitter "Create a Tweet" module.
3.  **Completion (Callback)**:
    *   Use **HTTP** module -> **Make a request**.
    *   **URL**: `https://your-domain.com/api/marketing/make-callback`
    *   **Method**: POST
    *   **Body Type**: Raw (JSON)
    *   **Content**:
        ```json
        {
          "postId": "{{1.postId}}",
          "status": "published",
          "secret": "your-callback-secret"
        }
        ```
    *   **Error Handling**: If the social post module fails, add an error handler route that calls the callback with `"status": "failed"` and `"errorMessage": "{{error.message}}"`.

## 5. Troubleshooting
*   **"Sent to Make"**: The post was sent to the webhook but no callback was received. Check your Make scenario execution history.
*   **"Callback Error"**: The callback was received but rejected (e.g., invalid secret).
