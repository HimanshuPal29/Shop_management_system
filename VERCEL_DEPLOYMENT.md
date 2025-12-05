# Vercel Deployment Guide

## Problem Fixed
The `ERR_BLOCKED_BY_CLIENT` error was caused by the frontend trying to connect to `http://localhost:3000/api` in production, which doesn't exist on Vercel.

## Solution
Updated the API configuration to use environment variables that can be set differently for development and production.

## Setup Instructions

### Step 1: Deploy Your Backend Server

Your backend needs to be deployed somewhere accessible (e.g., Render, Railway, Heroku, or another Vercel project). 

**Important**: Make sure your backend server:
1. Is publicly accessible
2. Has CORS configured to allow your Vercel frontend URL
3. Has all environment variables set (MONGO_URI, SECRET_KEY)

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variable:

   **Variable Name**: `VITE_API_URL`
   
   **Value**: Your deployed backend URL with `/api` suffix
   
   **Example**: `https://your-backend-app.onrender.com/api`

4. Select which environments to apply it to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click **Save**

### Step 3: Redeploy Your Frontend

After adding the environment variable, you need to redeploy:

**Option 1: Trigger redeploy from Vercel dashboard**
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**

**Option 2: Push a new commit**
```bash
git add .
git commit -m "Configure production API URL"
git push origin main
```

Vercel will automatically redeploy with the new environment variables.

### Step 4: Update Backend CORS

Make sure your backend server allows requests from your Vercel URL. Update `server/index.js`:

```javascript
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-vercel-app.vercel.app",  // Add your Vercel URL
        "https://shop-management-system-gray-zeta.vercel.app"
    ],
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH"
}))
```

## Backend Deployment Options

### Option 1: Render (Recommended - Free Tier Available)
1. Go to [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add environment variables (MONGO_URI, SECRET_KEY)
6. Deploy

### Option 2: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Set root directory to `server`
4. Add environment variables
5. Deploy

### Option 3: Vercel (Serverless)
You can also deploy the backend on Vercel, but you'll need to convert it to serverless functions.

## Verification

After deployment, test your login:
1. Open your Vercel app URL
2. Try to register/login
3. Check browser console for any errors
4. Verify the API calls are going to your production backend URL

## Troubleshooting

### Still getting ERR_BLOCKED_BY_CLIENT?
- Check browser extensions (disable ad blockers)
- Verify the environment variable is set correctly in Vercel
- Check that the backend URL is accessible (visit it in browser)

### CORS Errors?
- Make sure your backend CORS configuration includes your Vercel URL
- Verify `credentials: true` is set in CORS config

### 404 Errors?
- Ensure your backend routes are working
- Check that `/api` is included in the VITE_API_URL

## Environment Variables Summary

### Client (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Server (.env)
```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=3000
```

## Quick Deploy Checklist

- [ ] Backend deployed and accessible
- [ ] Backend CORS configured with Vercel URL
- [ ] VITE_API_URL set in Vercel environment variables
- [ ] Frontend redeployed after adding env variable
- [ ] Tested login/register on production
