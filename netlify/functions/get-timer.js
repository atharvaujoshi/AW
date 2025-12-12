const { getSupabaseClient } = require('./supabase-client');

exports.handler = async (event) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('timers')
      .select('*');
    
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
    console.error('Error fetching timers:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
