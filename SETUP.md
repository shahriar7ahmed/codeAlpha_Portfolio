# Portfolio Setup Guide

This guide will help you set up your portfolio website, including EmailJS integration, admin panel access, and all necessary configurations.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [EmailJS Configuration](#emailjs-configuration)
3. [Admin Panel Setup](#admin-panel-setup)
4. [Environment Variables](#environment-variables)
5. [Resume Setup](#resume-setup)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### Prerequisites

- Node.js (v18.x or higher)
- npm (v9.0.0 or higher)
- Git (optional)

### Installation Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd codeAlpha_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - You should see your portfolio website

---

## EmailJS Configuration

EmailJS allows you to send emails directly from your contact form without a backend server.

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)
3. Verify your email address

### Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. **Note down your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template structure:

   **Template Name:** `portfolio_contact`

   **Subject:** `New Contact Form Message from {{from_name}}`

   **Content:**
   ```
   You have received a new message from your portfolio contact form.

   From: {{from_name}}
   Email: {{from_email}}

   Message:
   {{message}}

   ---
   This email was sent from your portfolio website.
   ```

4. **Note down your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)
3. **Note down your Public Key**

### Step 5: Configure Environment Variables

1. **Create a `.env` file** in the root directory of your project:
   ```bash
   # Windows (PowerShell)
   New-Item .env

   # Mac/Linux
   touch .env
   ```

2. **Add your EmailJS credentials** to the `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_ADMIN_PASSWORD=your_secure_password_here
   ```

3. **Replace the placeholder values:**
   - `your_service_id_here` → Your EmailJS Service ID
   - `your_template_id_here` → Your EmailJS Template ID
   - `your_public_key_here` → Your EmailJS Public Key
   - `your_secure_password_here` → A strong password for admin access

4. **Example `.env` file:**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
   VITE_ADMIN_PASSWORD=MySecurePassword123!
   ```

5. **Important:** The `.env` file is already in `.gitignore`, so it won't be committed to Git.

6. **Restart your development server** after creating/updating `.env`:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

### Step 6: Test EmailJS Integration

1. Open your portfolio in the browser
2. Navigate to the **Contact** section
3. Fill out the contact form
4. Submit the form
5. Check your email inbox - you should receive the message!

---

## Admin Panel Setup

The admin panel allows you to manage your projects, certificates, and achievements directly from the browser.

### Accessing the Admin Panel

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the admin page:**
   - Development: `http://localhost:5173/admin`
   - Production: `https://your-domain.com/admin`

3. **Login with your admin password:**
   - Enter the password you set in `VITE_ADMIN_PASSWORD` in your `.env` file
   - Default password (if not set): `admin123`

### Admin Panel Features

#### Projects Management
- **View all projects** in a grid layout
- **Add new project:**
  - Click "Add Project" button
  - Fill in: Title, Description, Tags (comma-separated), GitHub URL, Demo URL, Image URL
  - Click "Add Project" to save
- **Edit project:**
  - Click "Edit" on any project card
  - Modify the fields
  - Click "Update Project" to save changes
- **Delete project:**
  - Click the trash icon on any project card
  - Confirm deletion

#### Certificates Management
- **View all certificates** in a grid layout
- **Add new certificate:**
  - Click "Add Certificate" button
  - Fill in: Title, Issuer, Issue Date, Description, Category, Skills, Image URL, Verification Link (optional)
  - Click "Add Certificate" to save
- **Edit/Delete certificates** (same as projects)

#### Achievements Management
- **View all achievements** in a list
- **Add new achievement:**
  - Click "Add Achievement" button
  - Fill in: Type, Title, Company/Organization, Location, Period, Description (one line per bullet point)
  - Click "Add Achievement" to save
- **Edit/Delete achievements** (same as projects)

#### Data Export/Import
- **Export Data:**
  - Click "Export" button in the admin header
  - Downloads a JSON file with all your data
  - Use this as a backup
- **Import Data:**
  - Click "Import" button in the admin header
  - Select a previously exported JSON file
  - Your data will be restored
  - Page will refresh automatically

### Important Notes

- **Data Storage:** All data is stored in your browser's localStorage
- **Session:** Admin sessions last 24 hours
- **Security:** Change the default password in production!
- **Backup:** Regularly export your data to prevent loss

---

## Environment Variables

### Required Variables

Create a `.env` file in the root directory with the following variables:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Admin Panel Password
VITE_ADMIN_PASSWORD=your_secure_password
```

### Optional Variables

For production deployment, you may also want to set:

```env
# Production URL (for SEO)
VITE_SITE_URL=https://your-domain.com
```

### Environment Variable Naming

- **Important:** All Vite environment variables must start with `VITE_`
- Variables without `VITE_` prefix won't be accessible in the browser
- Never commit `.env` file to Git (already in `.gitignore`)

---

## Resume Setup

### Adding Your Resume

1. **Prepare your resume PDF:**
   - Name it: `Shahriar Ahmed Resume.pdf`
   - Ensure it's a PDF file

2. **Place it in the public folder:**
   ```
   public/
     └── Shahriar Ahmed Resume.pdf
   ```

3. **The resume will be automatically available:**
   - Download button in Hero section
   - View/Download buttons in About section

### Resume Error Handling

- If the resume file is missing, users will see a friendly error message
- The error message suggests contacting you directly
- Check browser console for detailed error logs (development only)

---

## Deployment

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] EmailJS integration tested
- [ ] Admin panel accessible and working
- [ ] Resume PDF added to public folder
- [ ] All images optimized
- [ ] Test contact form submission
- [ ] Test admin panel CRUD operations

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`
     - `VITE_ADMIN_PASSWORD`

4. **Deploy:**
   - Vercel auto-detects Vite
   - Click "Deploy"
   - Your site will be live in seconds!

5. **Access Admin Panel:**
   - Go to `https://your-vercel-app.vercel.app/admin`
   - Login with your admin password

### Deploy to Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Add environment variables** in Netlify dashboard
4. **Deploy**

### Deploy to Other Platforms

- **GitHub Pages:** Use `vite-plugin-gh-pages`
- **Render:** Connect GitHub repo, set build command
- **Cloudflare Pages:** Connect GitHub repo, auto-detects Vite

---

## Troubleshooting

### EmailJS Not Working

**Problem:** Contact form shows error message

**Solutions:**
1. Check that all EmailJS credentials are correct in `.env`
2. Verify EmailJS service is active in dashboard
3. Check EmailJS template variables match the code
4. Ensure `.env` file is in root directory
5. Restart dev server after changing `.env`
6. Check browser console for detailed errors

### Admin Panel Not Accessible

**Problem:** Can't access `/admin` route

**Solutions:**
1. Ensure you're using the correct URL: `http://localhost:5173/admin`
2. For production, configure your hosting provider to handle client-side routing
3. Check browser console for errors
4. Clear browser cache and localStorage

### Admin Login Not Working

**Problem:** Password not accepted

**Solutions:**
1. Check `VITE_ADMIN_PASSWORD` in `.env` file
2. Ensure no extra spaces in password
3. Restart dev server after changing password
4. Clear browser localStorage and try again

### Images Not Loading

**Problem:** Certificate/project images not showing

**Solutions:**
1. Ensure images are in `public/` folder
2. Use correct path: `/image-name.png` (starts with `/`)
3. Check file names match exactly (case-sensitive)
4. Verify image file extensions are correct

### Data Not Persisting

**Problem:** Changes in admin panel not saving

**Solutions:**
1. Check browser console for errors
2. Ensure localStorage is enabled in browser
3. Clear browser cache and try again
4. Export data regularly as backup

### Build Errors

**Problem:** `npm run build` fails

**Solutions:**
1. Check for syntax errors in code
2. Ensure all dependencies are installed: `npm install`
3. Check Node.js version matches requirements
4. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

## Quick Reference

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Important URLs

- **Portfolio:** `http://localhost:5173`
- **Admin Panel:** `http://localhost:5173/admin`
- **EmailJS Dashboard:** `https://dashboard.emailjs.com/`

### File Structure

```
codeAlpha_Portfolio/
├── public/              # Static assets (images, resume)
├── src/
│   ├── components/      # Reusable components
│   ├── sections/        # Page sections
│   ├── pages/           # Full pages (Admin)
│   ├── utils/           # Utility functions
│   └── data/            # Data structures
├── .env                 # Environment variables (create this)
├── index.html           # Main HTML file
└── package.json         # Dependencies
```

---

## Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Review browser console for error messages
3. Check EmailJS dashboard for service status
4. Verify all environment variables are set correctly

---

## Security Notes

- **Never commit `.env` file** to Git (already in `.gitignore`)
- **Change default admin password** in production
- **Use strong passwords** for admin access
- **Keep EmailJS credentials secure**
- **Regularly backup your data** using export feature

---

**Last Updated:** 2025-01-XX

**Need Help?** Check the troubleshooting section or review the code comments for detailed explanations.

