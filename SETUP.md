# RevShare - Setup Guide

This guide will help you deploy RevShare with the booking system and automated reminder emails.

## Prerequisites

- A Vercel account (free tier works)
- A Gmail account with 2-Factor Authentication enabled

---

## Step 1: Gmail App Password

The booking system sends emails through Gmail. You need to create an App Password:

1. **Enable 2-Factor Authentication**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Navigate to **Security** → **2-Step Verification**
   - Turn it on if not already enabled

2. **Create App Password**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select **Mail** as the app
   - Select **Other (Custom name)** and enter "RevShare"
   - Click **Generate**
   - Copy the 16-character password (you'll need this later)

---

## Step 2: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/revshare.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Click **Deploy**

---

## Step 3: Set Up Upstash Redis (Storage)

The booking system stores appointments in Upstash Redis:

1. In your Vercel dashboard, go to your project
2. Click **Storage** tab
3. Click **Upstash** from the Marketplace
4. Click **Create Database**
5. Select **Redis** and name it "revshare-bookings"
6. Choose the free tier and your preferred region
7. Click **Create**
8. The environment variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) will be automatically added to your project

---

## Step 4: Add Environment Variables

In Vercel, go to **Settings** → **Environment Variables** and add:

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | `couragealison1@gmail.com` | Your Gmail address |
| `EMAIL_PASSWORD` | `your-app-password` | The 16-char App Password from Step 1 |
| `CRON_SECRET` | `your-secret-string` | A random string to secure the cron endpoint |
| `CLAUDE_API_KEY` | `sk-ant-api03-...` | Your Anthropic Claude API key for AI features |

**Generate a secure CRON_SECRET:**
```bash
openssl rand -hex 32
```

---

## Step 5: Verify Cron Jobs

Vercel Cron Jobs are configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

This runs every 30 minutes and checks for:
- **1-day reminders** (sent 20-28 hours before meeting)
- **2-hour reminders** (sent 90-150 minutes before meeting)
- **30-min reminders** (sent 20-45 minutes before meeting)

After deployment, you can see cron job logs in the Vercel dashboard under **Logs**.

---

## Step 6: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**

---

## Local Development

For local development, create a `.env.local` file:

```env
# Gmail Configuration
EMAIL_USER=couragealison1@gmail.com
EMAIL_PASSWORD=your-app-password

# Claude API for AI-powered features
CLAUDE_API_KEY=your-claude-api-key

# Optional: Upstash Redis (for local testing with production storage)
# UPSTASH_REDIS_REST_URL=your-upstash-url
# UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

Run the development server:
```bash
npm run dev
```

**Note:** Without Vercel KV configured locally, bookings will use in-memory storage (data resets when server restarts).

---

## Reminder Email Schedule

| Email | When Sent | Purpose |
|-------|-----------|---------|
| Confirmation | Immediately after booking | Confirms the meeting details |
| 1-Day Reminder | ~24 hours before | Builds anticipation, shares a quick stat |
| 2-Hour Reminder | ~2 hours before | Checklist to prepare |
| 30-Min Reminder | ~30 mins before | Final excitement builder |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/book` | POST | Create a new booking |
| `/api/book` | GET | List all bookings |
| `/api/cron/send-reminders` | GET | Cron job to send reminders |

---

## Troubleshooting

### Emails not sending

1. Check that your Gmail App Password is correct
2. Make sure 2FA is enabled on Gmail
3. Check Vercel logs for errors

### Cron jobs not running

1. Make sure `vercel.json` is in the root directory
2. Cron jobs only run on production (not preview deployments)
3. Check Vercel dashboard under **Logs** → **Functions**

### Bookings not persisting

1. Make sure Upstash Redis is set up
2. Check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are added
3. Redeploy after adding variables

---

## Support

For issues, check the Vercel logs or email configuration. Most problems are related to:
- Gmail App Password not set correctly
- Environment variables not configured
- Vercel KV not connected
