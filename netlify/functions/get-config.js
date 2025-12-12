const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const configPath = path.join(__dirname, '../../supabase-config.txt');
    const config = fs.readFileSync(configPath, 'utf8');
    const lines = config.split('\n');
    const result = {};
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) result[key.trim()] = value.trim();
    });

    // Only return public (anon) values to the browser
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ SUPABASE_URL: result.SUPABASE_URL, SUPABASE_ANON_KEY: result.SUPABASE_ANON_KEY })
    };
  } catch (err) {
    console.error('Error reading config:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read config' })
    };
  }
};
