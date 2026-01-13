# Deployment Guide - FastAPI + PostgreSQL

## Quick Start: Railway.app (Recommended)

### Why Railway?

- Free PostgreSQL database
- Free FastAPI hosting
- Auto-deploy from GitHub
- $5 free credits/month
- No credit card needed initially

### Setup Steps

#### 1. Prepare Your Code

Make sure you have these files:

**requirements.txt** (already exists)
**main.py** (already exists)
**Procfile** (create this):

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**runtime.txt** (optional, create this):

```
python-3.11
```

#### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### 3. Deploy on Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy PostgreSQL"
5. Click "New" → "GitHub Repo" → Select your backend repo
6. Railway will auto-detect Python and deploy

#### 4. Configure Environment

Railway auto-creates `DATABASE_URL`, but you can add more:

- Click on your service
- Go to "Variables" tab
- Add any additional environment variables

#### 5. Get Your URL

- Click on your service
- Go to "Settings" → "Networking"
- Click "Generate Domain"
- Your API will be live at: `https://your-app.up.railway.app`

---

## Alternative: Neon.tech + Render.com

### Step 1: Setup Neon.tech Database

1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string
4. Update your `.env` file locally

### Step 2: Deploy on Render.com

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name:** your-app-name
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon.tech connection string
7. Click "Create Web Service"

---

## Alternative: Vercel (API Routes)

If you want to deploy as serverless functions:

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Create `vercel.json`:

```json
{
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

3. Deploy:

```bash
vercel
```

---

## Environment Variables

Make sure to set these on your deployment platform:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

---

## Testing Your Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-app.up.railway.app/health

# Root endpoint
curl https://your-app.up.railway.app/
```

---

## Troubleshooting

### Database Connection Issues

- Make sure `DATABASE_URL` is set in environment variables
- Check if database allows connections from your deployment platform
- Verify connection string format

### Port Issues

- Use `$PORT` environment variable (Railway/Render provide this)
- Don't hardcode port 9000

### Import Errors

- Make sure all dependencies are in `requirements.txt`
- Check Python version compatibility

---

## Next Steps After Deployment

1. Set up custom domain (if needed)
2. Configure CORS for frontend
3. Set up CI/CD pipeline
4. Monitor logs and performance
5. Set up database backups

---

## Cost Breakdown

| Platform      | Database          | Hosting           | Total/Month         |
| ------------- | ----------------- | ----------------- | ------------------- |
| Railway.app   | Free ($5 credits) | Free ($5 credits) | $0 (within credits) |
| Neon + Render | Free              | Free              | $0                  |
| Neon + Vercel | Free              | Free              | $0                  |

All options are **completely free** for small projects!
