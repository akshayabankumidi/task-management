// src/scripts/testDbConnection.js
const pool = require('../config/database');

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the Supabase database');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from database:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    if (err.code) console.error('Error code:', err.code);
    if (err.detail) console.error('Error detail:', err.detail);
  } finally {
    await pool.end();
  }
}

testConnection();