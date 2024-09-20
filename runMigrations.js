// runMigrations.js

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function runMigrations() {
  try {
    await client.connect();
    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'));

    for (const file of migrationFiles) {
      const filePath = path.join(__dirname, 'migrations', file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`Running migration: ${file}`);
      await client.query(sql);
    }

    console.log('All migrations ran successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await client.end();
  }
}

runMigrations();
