# Deployment Checklist - ShopHub E-Commerce App

Use this checklist to ensure your project is properly deployed and working.

## Pre-Deployment (Local)

- [ ] All code committed to Git
- [ ] `.env` files are in `.gitignore` (secrets won't be pushed)
- [ ] `.env.example` files exist and are accurate
- [ ] Backend runs locally: `cd backend && npm run dev`
- [ ] Frontend runs locally: `cd frontend && npm run dev`
- [ ] No console errors in browser DevTools
- [ ] All features work locally (login, cart, checkout, orders)
- [ ] TypeScript compiles without errors: `tsc -b`
- [ ] Linting passes: `npm run lint`

## Push to GitHub

- [ ] Code pushed to main branch
  ```bash
  git add .
  git commit -m "Prepare for production deployment"
  git push origin main
  ```

## Database Setup (Neon)

- [ ] Create account at neon.tech
- [ ] Create new project
- [ ] Copy connection string
- [ ] Connection string format verified:
  ```
  postgresql://user:password@host/dbname?sslmode=require
  ```

## Backend Deployment (Railway)

- [ ] Create Railway account
- [ ] Import GitHub repository
- [ ] Verify backend service created and building
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `JWT_SECRET=` (strong random string)
  - [ ] `JWT_EXPIRE=7d`
  - [ ] `DATABASE_URL=` (from Neon)
  - [ ] `FRONTEND_URL=http://localhost:5173` (temp)
- [ ] Deployment completes successfully
- [ ] Copy backend URL from Railway dashboard
  - Format: `https://your-app-prod.railway.app`
- [ ] Test health check endpoint:
  - [ ] Visit: `https://your-app-prod.railway.app/health`
  - [ ] Should return JSON with `"status":"ok"`
- [ ] Check backend logs for errors
  - [ ] No database connection errors
  - [ ] No port binding errors

## Frontend Deployment (Vercel)

- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure build settings:
  - [ ] Root Directory: `./frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add environment variables:
  - [ ] `VITE_API_URL=https://your-app-prod.railway.app/api`
    (Use Railway backend URL from previous step)
- [ ] Deployment completes successfully
- [ ] Copy frontend URL from Vercel
  - Format: `https://your-app.vercel.app`
- [ ] Check deployment logs for build errors

## Update Backend CORS

- [ ] Go back to Railway dashboard
- [ ] Edit `FRONTEND_URL` variable with actual Vercel URL
- [ ] Save changes (auto-redeploy)
- [ ] Wait for Railway to redeploy

## Post-Deployment Testing

### Frontend Tests
- [ ] Visit frontend URL in browser: `https://your-app.vercel.app`
- [ ] Page loads without errors
- [ ] Check browser console (F12) for errors
- [ ] Network tab shows requests to correct backend URL

### Product Catalog Tests
- [ ] Products load on homepage
- [ ] Can see product list
- [ ] Search functionality works
- [ ] Filter functionality works
- [ ] Sort functionality works
- [ ] Click product shows details
- [ ] Images load correctly

### Authentication Tests
- [ ] Register new account
  - [ ] Validation works (email format, password length)
  - [ ] Redirects to login after registration
  - [ ] Can log in with new account
- [ ] Login with existing account
  - [ ] Token stored in localStorage
  - [ ] User profile visible
- [ ] Logout works
  - [ ] Token cleared
  - [ ] Redirects to home

### Shopping Cart Tests
- [ ] Add item to cart
  - [ ] Cart count updates
  - [ ] Item appears in cart
  - [ ] Price calculates correctly
- [ ] Update quantity
  - [ ] Total recalculates
- [ ] Remove item
  - [ ] Item removed from cart
- [ ] Clear cart
  - [ ] All items removed

### Checkout Tests
- [ ] Navigate to checkout
  - [ ] Cart items display
  - [ ] Total includes tax and shipping
- [ ] Fill in shipping info
  - [ ] Form validates
  - [ ] Accepts valid data
- [ ] Fill in payment info
  - [ ] Form accepts data
- [ ] Submit order
  - [ ] Order confirmation displays
  - [ ] Order number shown
  - [ ] Redirects correctly

### Order Management Tests
- [ ] View order history
  - [ ] All orders display
  - [ ] Order details correct
- [ ] Track order
  - [ ] Status visible
  - [ ] Can see order items

### Error Handling Tests
- [ ] Try invalid login
  - [ ] Error message displays
  - [ ] Doesn't log in
- [ ] Try API request without token
  - [ ] 401 error handled
  - [ ] Redirects to login
- [ ] Network disconnected simulation
  - [ ] Error message displays gracefully

## Performance & Monitoring

- [ ] Check Vercel Analytics
  - [ ] Page load time acceptable
  - [ ] No 4xx or 5xx errors
- [ ] Check Railway logs
  - [ ] No error logs
  - [ ] Database queries successful
- [ ] Check database health
  - [ ] Neon console shows active connections
  - [ ] No timeouts or errors

## Documentation

- [ ] DEPLOYMENT.md created and filled out
- [ ] README.md updated with live demo link
- [ ] Environment variables documented
- [ ] API endpoints tested and working

## Final Checks

- [ ] Live demo URL works from different browsers
- [ ] Live demo URL works on mobile devices
- [ ] All features work end-to-end
- [ ] No sensitive data exposed in logs
- [ ] Git repository is clean (no uncommitted changes)
- [ ] All secrets are in environment variables (not in code)

## Launch!

- [ ] Share live demo URL with portfolio
- [ ] Update GitHub README with live demo link
- [ ] Test one more time on fresh browser
- [ ] Ready to showcase to others!

---

## Quick Reference Commands

### Check Status Locally
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev
```

### Build for Production Locally
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

### View Deployment Logs
- **Vercel:** Dashboard → Deployments → Latest
- **Railway:** Dashboard → Backend Service → Logs
- **Neon:** neon.tech console

### Rollback a Deployment
- **Vercel:** Deployments → Click previous deployment → Promote to Production
- **Railway:** Deployments → Click previous deployment → Redeploy

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to API" | Check `VITE_API_URL` in Vercel matches Railway URL |
| "Database connection error" | Verify `DATABASE_URL` in Railway, check Neon status |
| "CORS error" | Update `FRONTEND_URL` in Railway with Vercel URL |
| "401 Unauthorized" | Clear localStorage, JWT_SECRET should match |
| "Build failed" | Check build logs in Vercel/Railway, verify dependencies |

---

## Notes

- Railway auto-deploys on every GitHub push
- Vercel auto-deploys on every GitHub push
- No manual deployment steps needed after initial setup
- Database persists between deployments

---

**Status:** ☐ Not Started | ⊙ In Progress | ✓ Complete

Last Updated: [Today's Date]
