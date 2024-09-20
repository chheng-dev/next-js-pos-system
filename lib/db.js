const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.on('error', (error) => {
  console.error('Unexpected error on idle client', error);
});

module.exports = pool;
