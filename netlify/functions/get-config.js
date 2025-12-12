exports.handler = async () => {
  try {
    // Read public values from environment variables
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase environment variables not set' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ SUPABASE_URL, SUPABASE_ANON_KEY })
    };
  } catch (err) {
    console.error('Error returning config:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to return config' })
    };
  }
};
