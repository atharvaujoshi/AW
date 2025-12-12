const { getSupabaseClient } = require('./supabase-client');

exports.handler = async (event) => {
  try {
    const supabase = getSupabaseClient();
    
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    
    const { bib_number, color, group_number, stopped_time } = body;
    
    if (!bib_number || !color || !group_number || stopped_time === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Insert into leaderboard
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([
        {
          bib_number,
          color,
          group_number,
          stopped_time
        }
      ])
      .select();
    
    if (error) {
      throw error;
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    console.error('Error saving leaderboard:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
