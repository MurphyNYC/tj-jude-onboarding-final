-- Create sessions table for onboarding data
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  client TEXT DEFAULT 'TJ Jude',
  data JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (unrestricted)
CREATE POLICY "Service role can do everything" ON sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index on session_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
