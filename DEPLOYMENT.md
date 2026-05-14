# Deployment Guide - ShopHub E-Commerce App

This guide will help you deploy your e-commerce application to production using Vercel (Frontend), Railway (Backend), and Neon (PostgreSQL Database).

## Prerequisites

- GitHub account (for repository hosting)
- Vercel account (free at vercel.com)
- Railway account (free at railway.app)
- Neon account (free at neon.tech)
- Your project pushed to GitHub

---

## Step 1: Prepare Your Project

### 1.1 Update Git
Push your code with the new deployment-ready configuration:

```bash
git add .
git commit -m "Prepare project for production deployment"
git push origin main
```

---

## Step 2: Set Up PostgreSQL Database (Neon)

### 2.1 Create Neon Database
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create a new project (free tier)
4. Copy your connection string - it will look like:
   ```
   postgresql://user:password@host/dbname?sslmode=require
   ```
5. Save this string - you'll need it for Railway

---

## Step 3: Deploy Backend (Railway)

### 3.1 Connect Railway to GitHub
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Create New Project"
4. Select "Deploy from GitHub repo"
5. Authorize Railway to access your GitHub
6. Select your e-commerce project repository

### 3.2 Configure Backend Service
1. Railway auto-detects Node.js - select `backend` as root directory
2. Click "Deploy"
3. Wait for initial deployment (may take 2-3 minutes)

### 3.3 Add Environment Variables to Railway
1. In Railway dashboard, go to your project
2. Click on the backend service
3. Go to "Variables" tab
4. Add these environment variables:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_secure_random_string_here_at_least_32_characters
JWT_EXPIRE=7d
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
FRONTEND_URL=https://your-app.vercel.app
```

**Important:** Replace:
- `DATABASE_URL` with your Neon connection string from Step 2
- `JWT_SECRET` with a strong random string (use an online generator)
- `FRONTEND_URL` with your Vercel URL (you'll get this in Step 4)

### 3.4 Get Your Backend API URL
1. In Railway, go to your backend service
2. Look for "Domains" section
3. Copy the URL (e.g., `https://your-app-prod.railway.app`)
4. Your API URL is: `https://your-app-prod.railway.app/api`
5. Save this - you'll need it for the frontend

### 3.5 Database Auto-Migration (Optional)
The database tables are auto-created on first server start. To seed sample data:

1. Open Railway shell for backend
2. Run: `npm run db:seed`
3. Done! Your database now has sample products

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Click "Import"

### 4.2 Configure Build Settings
Vercel should auto-detect, but verify:
- **Framework Preset:** Next.js (or leave auto)
- **Root Directory:** `./frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4.3 Add Environment Variables
1. Go to "Environment Variables" section
2. Add:
   ```
   VITE_API_URL=https://your-app-prod.railway.app/api
   ```
   (Replace with your actual Railway backend URL from Step 3.4)

3. Click "Deploy"
4. Wait for deployment to complete (usually 2-3 minutes)

### 4.4 Get Your Frontend URL
After deployment completes:
- Vercel shows your URL (e.g., `https://your-app.vercel.app`)
- Share this with users!

---

## Step 5: Update Backend CORS Settings

Now that you have your Vercel frontend URL, update the backend:

### 5.1 Update Railway Environment Variables
1. Go back to Railway → Backend service
2. Edit the `FRONTEND_URL` variable
3. Change from placeholder to your actual Vercel URL
4. Save - Railway auto-deploys

---

## Step 6: Test Your Deployment

1. Visit your frontend URL: `https://your-app.vercel.app`
2. Test these features:
   - Browse products
   - Register a new account
   - Add items to cart
   - Complete a checkout
   - View order history

### Common Issues & Fixes

**Frontend shows "Cannot connect to API":**
- Check that `VITE_API_URL` in Vercel matches your Railway backend URL
- Verify Railway backend is running (check Railway dashboard)

**Login not working:**
- Verify `JWT_SECRET` is set in Railway
- Check browser console for error messages

**Database errors:**
- Verify `DATABASE_URL` is correct in Railway
- Check Neon connection string format
- Ensure Neon PostgreSQL is running

---

## Step 7: Automatic Deployments

### Frontend (Vercel)
- Auto-deploys on every push to `main` branch
- No additional setup needed

### Backend (Railway)
- Auto-deploys on every push to `main` branch
- No additional setup needed

Just push your code to GitHub and both will update automatically!

---

## Monitoring & Maintenance

### View Logs

**Vercel Frontend:**
1. Dashboard → Deployments → Click latest
2. Scroll to see build and runtime logs

**Railway Backend:**
1. Dashboard → Backend service
2. Go to "Logs" tab
3. See real-time server logs

### Monitor Health

**Backend Health Check:**
- Visit: `https://your-app-prod.railway.app/health`
- Should return: `{"status":"ok","message":"Server is running"}`

---

## Production Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string (not development key)
- [ ] Use strong `DB_PASSWORD` in PostgreSQL
- [ ] Enable HTTPS (auto-enabled by Vercel & Railway)
- [ ] Keep secrets out of GitHub (use Railway variables, not .env)
- [ ] Regular database backups (Neon handles automatically)
- [ ] Monitor logs for errors
- [ ] Set up error tracking (optional: Sentry, LogRocket)

---

## Cost Estimates

- **Vercel:** Free tier sufficient (up to 100GB bandwidth/month)
- **Railway:** Free tier $5 credit/month (usually covers small app)
- **Neon:** Free tier sufficient (3GB storage)

All are free to start! Upgrade only if you exceed free tier limits.

---

## Troubleshooting

### Need to restart server?
Railway auto-restarts deployments. Just re-push to GitHub or click redeploy in dashboard.

### Database migration issues?
Run in Railway shell:
```
npm run db:migrate
```

### Want to reset database?
Delete all tables in Neon console and re-deploy (tables auto-create).

---

## Next Steps

Once deployed:
1. Test thoroughly with real data
2. Share your portfolio project with others
3. Monitor performance in Railway logs
4. Gather user feedback
5. Plan new features for v2

---

## Quick Reference

| Component | URL | Access |
|-----------|-----|--------|
| Frontend | `https://your-app.vercel.app` | Browser |
| Backend API | `https://your-app-prod.railway.app/api` | Frontend calls |
| Backend Health | `https://your-app-prod.railway.app/health` | Browser |
| Database | Neon Dashboard | Neon console |
| Logs | Railway Dashboard | Railway console |
| Settings | Vercel & Railway dashboards | Web |

---

**Questions? Issues?**
- Check Railway logs for backend errors
- Check Vercel deployment logs for frontend errors
- Verify all environment variables are set correctly
- Ensure GitHub has latest code pushed
