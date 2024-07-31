const { Pool } = require('pg');
const { DATABASE_URL } = require('./env');

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  

module.exports = pool;

