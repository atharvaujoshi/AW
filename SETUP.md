# Alpha Run Club Timer - Backend Setup Guide

## What's New

This setup adds **Supabase** (backend database) and **Netlify Functions** (serverless API) to your timer system. Now:

✅ Leaderboard persists in database (not lost on refresh)
✅ Multi-user sync (everyone sees same data)
✅ Real-time updates (live leaderboard)
✅ Scalable to any number of runners

---

## Step 1: Set Up Supabase

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub/Google/Email
4. Click "New project"
5. Fill in:
   - **Name**: Alpha Run Club (or your preference)
   - **Password**: Create a strong password (save it!)
   - **Region**: Select closest to your location
6. Click "Create new project" (wait ~2 minutes)

### 1.2 Get Your API Keys
1. Once created, click **Settings** (gear icon, bottom left)
2. Click **API** in left sidebar
3. Copy these 3 values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon key** (long string starting with `sb_publishable_`)
   - **service_role key** (long string starting with `sb_secret_`)

### 1.3 Fill In Your Config File
1. Open `supabase-config.txt` in your project folder
2. Paste your values:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xxxxx
SUPABASE_SERVICE_KEY=sb_secret_xxxxx
```
3. **Save the file**

### 1.4 Create Database Tables
1. Back in Supabase, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy all code from `supabase-setup.sql`
4. Paste into the SQL editor
5. Click **Run**
6. You should see success messages

---

## Step 2: Install Node Dependencies

Open PowerShell in your project folder and run:

```powershell
npm install
```

This installs the `@supabase/supabase-js` package needed for the backend.

---

## Step 3: Deploy to Netlify

### 3.1 Push to Git (if not already done)
```powershell
git init
git add .
git commit -m "Add Supabase backend"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO
git push -u origin main
```

### 3.2 Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your GitHub repo
5. **Build settings** should auto-fill:
   - Build command: `npm install`
   - Publish directory: (leave empty for root)
6. Click "Deploy site"

### 3.3 Wait for Deployment
Netlify will build your site. This takes 2-5 minutes. You'll see:
- 🟡 Building
- 🟢 Deployed (when complete)

Your site is now live! 🎉

---

## Step 4: How It Works

### Frontend → API → Database Flow:

1. **Volunteer stops timer** → Calls `stopColor()`
2. **Volunteer stop triggers** → Calls `saveToSupabase()`
3. **Frontend sends HTTP request** → To `/.netlify/functions/save-leaderboard`
4. **Netlify Function receives** → Reads Supabase config
5. **Function saves to database** → Via Supabase SDK
6. **Leaderboard updates** → Calls `renderLeaderboard()`
7. **Database query executes** → Via `get-leaderboard` function
8. **All users see live data** → Real-time sync

---

## File Structure

```
your-project/
├── index.html                          (Updated with Supabase calls)
├── supabase-config.txt                 (Your API keys - KEEP SECRET!)
├── supabase-setup.sql                  (SQL for creating tables)
├── netlify.toml                        (Netlify config)
├── package.json                        (Node dependencies)
├── .gitignore                          (Prevents config from being committed)
└── netlify/
    └── functions/
        ├── supabase-client.js          (Shared Supabase connection)
        ├── save-leaderboard.js         (POST /save-leaderboard)
        ├── get-leaderboard.js          (GET /get-leaderboard)
        ├── save-timer.js               (POST /save-timer)
        └── get-timer.js                (GET /get-timer)
```

---

## Testing Locally (Optional)

To test before deploying:

1. Install Netlify CLI:
```powershell
npm install -g netlify-cli
```

2. Run locally:
```powershell
netlify dev
```

3. Open `http://localhost:8888`

---

## Troubleshooting

### "Error: Configuration file not found"
- Make sure `supabase-config.txt` is in the root folder
- Make sure it has the correct format (no extra spaces)

### "Invalid access token"
- Check your Supabase keys in `supabase-config.txt`
- Make sure they're copied exactly (no extra characters)

### "Database error: table 'leaderboard' does not exist"
- Run the SQL setup script again in Supabase
- Make sure you see "Success" message

### Leaderboard showing old data
- Netlify Functions cache responses. This is normal.
- Refresh the page to force fresh data

---

## Security Notes

⚠️ **Important:**
- `.gitignore` prevents `supabase-config.txt` from being committed
- Your `supabase-config.txt` keys are read server-side (safe)
- Never expose `SUPABASE_SERVICE_KEY` to frontend
- The `anon` key is public (used for frontend auth)

---

## Next Steps

Once deployed, your timer system will:
1. ✅ Save all leaderboard times to Supabase
2. ✅ Persist data across browser refreshes
3. ✅ Sync data across multiple devices/volunteers
4. ✅ Display real-time leaderboard updates

---

## Support

If you hit issues:
1. Check browser Console (F12) for JavaScript errors
2. Check Netlify Deploy logs in dashboard
3. Check Supabase SQL editor for database errors
4. Verify `supabase-config.txt` format
