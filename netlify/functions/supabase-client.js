const { createClient } = require('@supabase/supabase-js');

// Use environment variables for Supabase configuration
function getConfig() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables');
    throw new Error('Supabase configuration missing in environment variables');
  }

  return {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY
  };
}

function getSupabaseClient() {
  const config = getConfig();
  return createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY || config.SUPABASE_ANON_KEY);
}

exports.getSupabaseClient = getSupabaseClient;
exports.getConfig = getConfig;
