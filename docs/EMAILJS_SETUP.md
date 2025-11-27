# EmailJS Setup Guide

## Overview

The contact form uses EmailJS to send emails without a backend server. Follow these steps to configure it.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)

## Step 2: Create an Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content

Example template:
```
From: {{from_name}} <{{from_email}}>
Subject: New Contact Form Submission

Message:
{{message}}
```

4. Note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find **API Keys** section
3. Copy your **Public Key** (e.g., `abc123xyz789`)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholders:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Replace with your actual values:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=abc123xyz789
   ```

## Step 6: Test the Form

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

### Form shows "EmailJS is not configured"
- Make sure `.env` file exists in the project root
- Verify all three environment variables are set
- Restart the development server after changing `.env`

### "Failed to send message" error
- Check that your EmailJS service is active
- Verify template variables match (`from_name`, `from_email`, `message`)
- Check browser console for detailed error messages
- Ensure you haven't exceeded the free tier limit (100 emails/month)

### Environment variables not loading
- Vite requires variables to start with `VITE_`
- Restart the dev server after changing `.env`
- In production, set these as environment variables in your hosting platform

## Security Notes

- Never commit `.env` to version control (it's in `.gitignore`)
- The Public Key is safe to expose in frontend code
- EmailJS handles rate limiting and spam protection
- Consider adding reCAPTCHA for production use

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Redeploy your application

## Alternative: Backend Solution

For higher volume or more control, consider:
- Node.js backend with Nodemailer
- Serverless functions (Vercel, Netlify Functions)
- Third-party services (SendGrid, Mailgun)

