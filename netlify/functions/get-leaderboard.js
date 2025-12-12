const { getSupabaseClient } = require('./supabase-client');

exports.handler = async (event) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get all leaderboard entries, sorted by stopped_time
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('stopped_time', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
