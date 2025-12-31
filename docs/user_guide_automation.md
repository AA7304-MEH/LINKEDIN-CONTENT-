# 🤖 How to Set Up Full Automation (Make.com)

Turn your marketing engine into a real robot that posts while you sleep.

## Prerequisites
1.  A **Make.com** account (Free tier is fine).
2.  Your **Resonate** Dashboard open.
3.  Your **LinkedIn** account password handy.

---

## Step 1: Create the "Listener" (Webhook) 👂
*This allows Resonate to shout "Hey, post this!" to Make.*

1.  Log in to [Make.com](https://www.make.com/).
2.  Click **"+ Create a new scenario"**.
3.  Click the big **Purple Plus (+)** button.
4.  Search for **"Webhooks"** and select it.
5.  Choose **"Custom Webhook"**.
6.  Click **"Add"**.
    *   **Webhook Name**: `Resonate Automation`.
    *   Click **Save**.
7.  **COPY the URL** (it looks like `https://hook.us1.make.com/...`).
8.  **Go to Resonate Dashboard**:
    *   `Settings` tab > `Automation Settings`.
    *   Paste the URL into **"Make Webhook URL"**.
    *   Click **Save Settings**.
9.  **Keep Make Open!** It is waiting for data.
    *   Click **"Re-determine data structure"** (or ensure it's spinning/waiting).
    *   **In Resonate Posts**: Click "Generate New Drafts". Wait for drafts.
    *   **Schedule One**: Find a draft, set `Schedule Date` to **NOW + 1 minute**.
    *   **Wait**: When the time hits, Resonate sends data to Make.
    *   Make should say **"Successfully determined"** (Green Check). *Now it knows your data structure.*

---

## Step 2: Connect LinkedIn 🔗
*Now Make knows WHAT to post. Let's tell it WHERE.*

1.  In Make, hover over the Webhook module’s right ear (little semi-circle).
2.  Click **"Add another module"**.
3.  Search **"LinkedIn"**.
4.  Select **"Create a Post"** (or "Create a Text Post").
5.  **Connection**: Click "Add" and log in to your LinkedIn account.
6.  **Content**:
    *   Click inside the **"Content"** (or Text) field.
    *   A panel pops up with fields from Resonate.
    *   Select the **`content`** field (purple bubble).
7.  **Visibility**: Public.
8.  Click **OK**.

---

## Step 3: (Optional) Connect Twitter/X 🐦
*If you want to post to Twitter too.*

1.  In Make, add a **Router** (Flow Control) after the Webhook if you want to split by platform.
2.  *OR just to keep it simple*: Add Twitter after LinkedIn if you want to post to both.

---

## Step 4: Turn It O-N ⚡
1.  Click the **Save** icon (Floppy Disk) at the bottom.
2.  Toggle the **Scheduling** switch to **ON** (bottom left).
3.  **You are DONE.**

## Testing It
1.  Go to Resonate.
2.  Schedule a new post for 5 minutes from now.
3.  Go grab a coffee. ☕
4.  Check your LinkedIn Profile in 6 minutes. The post will be there!
