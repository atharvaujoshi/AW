-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bib_number TEXT NOT NULL,
  color TEXT NOT NULL,
  group_number INT NOT NULL,
  stopped_time INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create timers table
CREATE TABLE IF NOT EXISTS timers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_number INT NOT NULL UNIQUE,
  wave_number INT NOT NULL,
  is_running BOOLEAN DEFAULT FALSE,
  elapsed_time INT DEFAULT 0,
  started_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_group ON leaderboard(group_number);
CREATE INDEX IF NOT EXISTS idx_leaderboard_color ON leaderboard(color);

-- Enable realtime (add tables to publication only if not already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'leaderboard'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE leaderboard';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'timers'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE timers';
  END IF;
END
$$;
