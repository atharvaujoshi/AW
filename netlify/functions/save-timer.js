const { getSupabaseClient } = require('./supabase-client');

exports.handler = async (event) => {
  try {
    const supabase = getSupabaseClient();
    
    const body = JSON.parse(event.body || '{}');
    const { group_number, wave_number, is_running, elapsed_time } = body;
    
    if (group_number === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'group_number is required' })
      };
    }
    
    // Upsert timer data
    const { data, error } = await supabase
      .from('timers')
      .upsert([
        {
          group_number,
          wave_number,
          is_running,
          elapsed_time,
          started_at: is_running ? new Date().toISOString() : null
        }
      ], { onConflict: 'group_number' })
      .select();
    
    if (error) {
      throw error;
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    console.error('Error saving timer:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
