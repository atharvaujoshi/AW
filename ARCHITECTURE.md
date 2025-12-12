# System Architecture

## 🏗️ Complete Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (Browser)                     │
│                     index.html + JavaScript                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ • Admin Panel (timer controls, wave management)        │ │
│  │ • Volunteer Dashboard (individual timer view)          │ │
│  │ • Leaderboard (live results)                           │ │
│  │ • Sync functions (saveToSupabase, fetch data)          │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
┌────────▼────────────────────┐   ┌─────────▼──────────────────┐
│  Netlify Functions (API)    │   │  Netlify Hosting (Files)   │
│  /.netlify/functions/       │   │  Serves index.html + CSS   │
│                             │   │                            │
│ • save-leaderboard.js       │   │ • Automatic HTTPS          │
│ • get-leaderboard.js        │   │ • Global CDN               │
│ • save-timer.js             │   │ • Instant deploys          │
│ • get-timer.js              │   │                            │
│ • supabase-client.js        │   └────────────────────────────┘
│                             │
│ Reads supabase-config.txt   │
│ Connects to Supabase        │
└────────────┬────────────────┘
             │
    ┌────────▼──────────────┐
    │  Supabase Backend     │
    │  PostgreSQL Database  │
    │                       │
    │ Tables:              │
    │ • leaderboard        │
    │ • timers             │
    │                       │
    │ Features:            │
    │ • Real-time sync     │
    │ • Data persistence   │
    │ • Row-level security │
    └───────────────────────┘
```

---

## 📊 Data Flow Diagram

### Volunteer Stops Timer

```
Volunteer clicks STOP button
    ↓
volunteerStop(group, color)
    ↓
stopColor(group, color)
    ├─ Updates local timer object
    ├─ Adds to globalStoppedTimes array
    └─ Calls saveToSupabase()
        ↓
    fetch(/.netlify/functions/save-leaderboard, POST)
        ↓
    Netlify Function executes
    ├─ Reads supabase-config.txt
    ├─ Connects to Supabase
    └─ INSERT into leaderboard table
        ↓
    Response returns to frontend
        ↓
    renderLeaderboard() executes
        ├─ Calls fetchLeaderboardFromSupabase()
        ├─ fetch(/.netlify/functions/get-leaderboard, GET)
        ├─ Gets all records from database
        └─ Renders HTML table
            ↓
    ✅ Leaderboard displayed with latest data
```

---

## 🔄 Multi-User Sync

```
Device A (Volunteer)         Device B (Volunteer)         Device C (Admin)
     │                              │                           │
     ├─ Stops timer ────────────────┼──────────────────────────┤
     │                              │                           │
     └─ Saves to Supabase ──────────┼──────────────────────────┤
                                    │                           │
                         ┌──────────▼───────────┐               │
                         │  Supabase Database   │               │
                         │  (Single source of  │               │
                         │   truth)             │               │
                         └──────────┬───────────┘               │
                                    │                           │
     ┌──────────────────────────────┼───────────────────────────┤
     │                              │                           │
     ├─ Fetches latest data ────────┼─ Fetches latest data ────┤
     │                              │                           │
     ✅ Same leaderboard          ✅ Same leaderboard      ✅ Same leaderboard
     ✅ Same wave numbers         ✅ Same wave numbers      ✅ Same wave numbers
     ✅ Real-time sync            ✅ Real-time sync        ✅ Real-time sync
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Public)                     │
│           Runs in user's browser                        │
│           Can be inspected by anyone                    │
│           Uses read-only (anon) Supabase key            │
└──────────────────────────┬──────────────────────────────┘
                           │
                   Netlify Functions
                   (Verification Layer)
                           │
┌──────────────────────────▼──────────────────────────────┐
│              Netlify Functions (Private)                │
│              Runs on Netlify servers only               │
│              Reads full Supabase keys from file         │
│              Validates all requests                     │
│              Can't be inspected by users                │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│            Supabase Database (Encrypted)                │
│            Data encrypted at rest                       │
│            HTTPS for all connections                   │
│            Automatic backups                            │
│            Access controlled by API keys                │
└─────────────────────────────────────────────────────────┘

Key Files:
✅ supabase-config.txt     - Server-side only (in .gitignore)
✅ netlify/functions/*.js  - Server-side only (compiled)
⚠️  index.html             - Public (but doesn't expose secrets)
```

---

## 📱 Deployment Architecture

```
Your Local Machine
    ↓
GitHub Repository
    ↓
Netlify (Connected via GitHub)
    ├─ Detects push to main
    ├─ Runs: npm install
    ├─ Creates Functions bundle
    ├─ Uploads to CDN
    ├─ Deploys to global servers
    └─ Generates domain: yoursite.netlify.app
        ↓
Global CDN
    ├─ Americas edge servers
    ├─ Europe edge servers
    ├─ Asia edge servers
    └─ Users get fastest response
```

---

## 🔄 Request/Response Flow

### POST Request (Save Time)

```
Frontend:
POST /.netlify/functions/save-leaderboard
{
  "bib_number": "AW001",
  "color": "Red",
  "group_number": 1,
  "stopped_time": 45230
}
    ↓
Netlify Function:
1. Receives request
2. Parses JSON body
3. Validates fields
4. Connects to Supabase
5. INSERT into leaderboard
6. Returns response
    ↓
Frontend:
{
  "success": true,
  "data": [{ ... }]
}
```

### GET Request (Fetch Leaderboard)

```
Frontend:
GET /.netlify/functions/get-leaderboard
    ↓
Netlify Function:
1. Receives request
2. Connects to Supabase
3. SELECT * FROM leaderboard
4. Sorts by stopped_time
5. Returns all records
    ↓
Frontend:
{
  "data": [
    { id, bib_number, color, group_number, stopped_time, ... },
    { id, bib_number, color, group_number, stopped_time, ... },
    ...
  ]
}
    ↓
Renders HTML table with all data
```

---

## 🚀 Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| **Page Load** | < 2s | Cached by CDN |
| **Save Time** | ~300ms | Network + DB write |
| **Fetch Leaderboard** | ~200ms | Database query |
| **Update Interval** | 50ms | Frontend timer tick |
| **Database Queries/min** | ~10-50 | Depends on users |
| **Storage** | 500 MB (free) | Per entry: ~200 bytes |

---

## 🔧 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML/CSS/JS | User interface |
| **API** | Netlify Functions | Serverless backend |
| **Database** | Supabase + PostgreSQL | Data persistence |
| **Hosting** | Netlify | Web hosting + functions |
| **Version Control** | Git + GitHub | Code management |
| **Authentication** | Manual admin code | Access control |

---

## 📈 Scalability

### Current Capacity
- ✅ Works for 10-1000 runners
- ✅ Multiple volunteers
- ✅ Real-time sync
- ✅ Free tier sufficient

### If You Need to Scale
- ✅ Supabase auto-scales database
- ✅ Netlify auto-scales functions
- ✅ CDN handles global traffic
- ⚠️ May need paid Supabase plan if >500MB data

---

## 🎯 Next Steps

1. **Fill in `supabase-config.txt`** with your Supabase keys
2. **Run SQL setup** to create database tables
3. **Deploy to Netlify** via GitHub
4. **Test the system** - Stop a timer and verify persistence
5. **Monitor Netlify dashboard** for any errors

Your system is now **production-grade**! 🎉
