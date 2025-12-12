# API Endpoints Reference

## Base URL
```
/.netlify/functions
```

---

## 1. Save Leaderboard Time

**Endpoint:** `POST /.netlify/functions/save-leaderboard`

**Request Body:**
```json
{
  "bib_number": "AW001",
  "color": "Red",
  "group_number": 1,
  "stopped_time": 45230
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "bib_number": "AW001",
      "color": "Red",
      "group_number": 1,
      "stopped_time": 45230,
      "created_at": "2025-12-12T10:30:00Z"
    }
  ]
}
```

---

## 2. Get Leaderboard

**Endpoint:** `GET /.netlify/functions/get-leaderboard`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "bib_number": "AW001",
      "color": "Red",
      "group_number": 1,
      "stopped_time": 45230,
      "created_at": "2025-12-12T10:30:00Z"
    },
    {
      "id": "uuid-string",
      "bib_number": "AW002",
      "color": "Blue",
      "group_number": 2,
      "stopped_time": 46100,
      "created_at": "2025-12-12T10:30:15Z"
    }
  ]
}
```

---

## 3. Save Timer State

**Endpoint:** `POST /.netlify/functions/save-timer`

**Request Body:**
```json
{
  "group_number": 1,
  "wave_number": 3,
  "is_running": true,
  "elapsed_time": 45230
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "group_number": 1,
      "wave_number": 3,
      "is_running": true,
      "elapsed_time": 45230,
      "started_at": "2025-12-12T10:30:00Z"
    }
  ]
}
```

---

## 4. Get Timer State

**Endpoint:** `GET /.netlify/functions/get-timer`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "group_number": 1,
      "wave_number": 3,
      "is_running": false,
      "elapsed_time": 45230,
      "started_at": "2025-12-12T10:30:00Z"
    },
    {
      "id": "uuid-string",
      "group_number": 2,
      "wave_number": 2,
      "is_running": true,
      "elapsed_time": 32100,
      "started_at": "2025-12-12T10:35:00Z"
    }
  ]
}
```

---

## Frontend Integration

These endpoints are called automatically in your frontend:

```javascript
// Save a stopped time
saveToSupabase(bibNumber, color, groupNumber, stoppedTimeMs);

// Fetch all leaderboard times
const leaderboard = await fetchLeaderboardFromSupabase();

// Save timer state when wave starts/stops
saveTimerState(groupNumber, waveNumber, isRunning, elapsedTime);
```

---

## Error Responses

All endpoints return error responses like:

```json
{
  "error": "Missing required fields"
}
```

Common errors:
- `400` - Missing required fields
- `500` - Database connection error
- `500` - Configuration file not found

Check browser console (F12) for detailed error messages.

---

## Database Schema

### leaderboard table
```sql
id (UUID) - Primary key
bib_number (TEXT) - Runner BIB number (e.g., AW001)
color (TEXT) - Color category (Red, Blue, etc)
group_number (INT) - Group 1 or 2
stopped_time (INT) - Milliseconds
created_at (TIMESTAMP) - When record was created
updated_at (TIMESTAMP) - When record was last updated
```

### timers table
```sql
id (UUID) - Primary key
group_number (INT) - Group 1 or 2 (UNIQUE)
wave_number (INT) - Current wave number
is_running (BOOLEAN) - Whether timer is currently running
elapsed_time (INT) - Milliseconds elapsed
started_at (TIMESTAMP) - When timer was started
created_at (TIMESTAMP) - When record was created
updated_at (TIMESTAMP) - When record was last updated
```

---

## Testing with curl

```powershell
# Save a time
Invoke-WebRequest -Uri "http://localhost:8888/.netlify/functions/save-leaderboard" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"bib_number":"AW001","color":"Red","group_number":1,"stopped_time":45230}'

# Get leaderboard
Invoke-WebRequest -Uri "http://localhost:8888/.netlify/functions/get-leaderboard" `
  -Method GET
```

---

## Notes

- Responses are JSON
- All times are in **milliseconds**
- The `anon` key in config is used (public, safe for API calls)
- `service_role` key is for admin operations (kept server-side)
