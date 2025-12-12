# ⚡ Quick Start Checklist

## 🚀 Get Your Backend Live in 15 Minutes

### ✅ Step 1: Supabase Setup (5 min)
- [ ] Go to https://supabase.com and sign up
- [ ] Create a new project
- [ ] Get your 3 API keys (URL, anon key, service key)
- [ ] Open `supabase-config.txt`
- [ ] Paste your keys in the format:
  ```
  SUPABASE_URL=https://xxxxx.supabase.co
  SUPABASE_ANON_KEY=sb_publishable_xxxxx
  SUPABASE_SERVICE_KEY=sb_secret_xxxxx
  ```
- [ ] Save the file

### ✅ Step 2: Create Database (3 min)
- [ ] In Supabase, go to **SQL Editor**
- [ ] Click **New query**
- [ ] Open `supabase-setup.sql` from your folder
- [ ] Copy ALL the SQL code
- [ ] Paste it into Supabase SQL editor
- [ ] Click **Run**
- [ ] Wait for success ✓

### ✅ Step 3: Install & Deploy (7 min)
- [ ] Open PowerShell in your project folder
- [ ] Run: `npm install`
- [ ] Push to GitHub (or create a new repo)
- [ ] Go to https://netlify.com and sign in with GitHub
- [ ] Click "New site from Git"
- [ ] Select your GitHub repo
- [ ] Click "Deploy site"
- [ ] Wait for the green "Deployed" status (2-5 min)

### ✅ Step 4: Test It (1 min)
- [ ] Click your Netlify domain
- [ ] Log in as admin (code: ADMIN123)
- [ ] Stop a timer for any runner
- [ ] Refresh the page
- [ ] **Leaderboard data persists!** ✅

---

## 📁 What You Have

```
✅ index.html                 - Updated with Supabase sync
✅ netlify/functions/         - 5 serverless API endpoints
✅ supabase-config.txt        - Your API keys (KEEP SECRET!)
✅ supabase-setup.sql         - Database creation script
✅ netlify.toml               - Netlify configuration
✅ package.json               - Node dependencies
✅ .gitignore                 - Prevents accidental commits
✅ SETUP.md                   - Detailed setup guide
✅ API_REFERENCE.md           - API endpoint docs
✅ BACKEND_SUMMARY.md         - What was created
```

---

## 🎯 What Now Works

### Before (Local Only)
- ❌ Data lost on refresh
- ❌ No multi-user sync
- ❌ Each browser has separate data
- ❌ Can't scale beyond one device

### After (Global Backend)
- ✅ Data persists forever
- ✅ All volunteers see same leaderboard
- ✅ Works across devices
- ✅ Ready to scale
- ✅ Can add analytics later
- ✅ Can add real-time notifications

---

## 🆘 If Something Goes Wrong

### "Error: Configuration file not found"
→ Make sure `supabase-config.txt` exists in root folder with your keys

### "Invalid API key"
→ Double-check your keys are copied correctly (no extra spaces/quotes)

### "Table 'leaderboard' does not exist"
→ Re-run the SQL setup script in Supabase

### "Netlify deploy failed"
→ Check Netlify deploy logs (click Deploy on dashboard)
→ Make sure `package.json` exists

### "Leaderboard shows no data"
→ Make sure you've stopped at least one timer
→ Check browser console for errors (F12)

---

## 📞 Need Help?

1. **Check SETUP.md** - Full step-by-step guide
2. **Check API_REFERENCE.md** - API endpoint details
3. **Browser Console (F12)** - Shows JavaScript errors
4. **Netlify Dashboard** - Shows deploy errors

---

## 🔐 Security Reminder

⚠️ Your `supabase-config.txt` is in `.gitignore`
- This means your secret keys WON'T be committed to GitHub
- But YOU must never share this file publicly
- Keep it in your project only

✅ Best practice:
- Only your computer has this file
- Team members connect with their own Supabase keys
- Production systems use environment variables

---

## 🎉 You're Almost There!

Your timer system is now production-ready with:
- Real database
- Serverless API
- Multi-user sync
- Data persistence
- Live leaderboard

**Next: Fill in your Supabase keys and deploy!**
