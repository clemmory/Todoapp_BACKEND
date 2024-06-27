require('dotenv').config();

const { Pool } = require('pg');

const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_DATABASE;
const dbPass = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPass,
    port: dbPort,
  });

// Test connection
pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err.stack);
  } else {
    console.log('Connected to PostgreSQL successfully');
  }
});


module.exports = pool;
