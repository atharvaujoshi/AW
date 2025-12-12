const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read config from file
function getConfig() {
  try {
    const configPath = path.join(__dirname, '../../supabase-config.txt');
    const config = fs.readFileSync(configPath, 'utf8');
    const lines = config.split('\n');
    const result = {};
    
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error reading config:', error);
    throw new Error('Configuration file not found');
  }
}

function getSupabaseClient() {
  const config = getConfig();
  return createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
}

exports.getSupabaseClient = getSupabaseClient;
exports.getConfig = getConfig;
