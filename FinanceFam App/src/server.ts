// Importing pg module as a default import
import pkg from 'pg';  // Default import for 'pg' (PostgreSQL module)
const { Pool } = pkg;  // Destructure Pool from the default import

// Importing required modules for path and dotenv
import * as path from 'path';
import * as dotenv from 'dotenv';


dotenv.config({
  override: true,  // Overwrite existing environment variables (if any)
  path: path.join('./src/', 'process.env')  // Path to the custom environment file (db.env)
});

// Define an interface for environment variables (optional but recommended for type safety)
interface EnvConfig {
  USER: string;
  HOST: string;
  DATABASE: string;
  PASSWORD: string;
  PORT: string;  // PORT will be a string, but will convert to a number later
}

// Type-casting `process.env` to match our EnvConfig type
const config = process.env as unknown as EnvConfig;

// Ensure the required environment variables are available
if (!config.USER || !config.HOST || !config.DATABASE || !config.PASSWORD || !config.PORT) {
  console.error('Missing required environment variables!');
  process.exit(1);
}

// Initialize the PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: String(config.USER),
  host: config.HOST,
  database: config.DATABASE,
  password: String(config.PASSWORD),
  port: Number(config.PORT),  // Ensure the PORT is treated as a number
});

// Async IIFE (Immediately Invoked Function Expression) to run the database query
(async () => {
  let client;
  try {
    // Connecting to the database
    client = await pool.connect();

    // Running a simple query to fetch the current user
    const { rows } = await client.query('SELECT current_user');

    // Extracting the current user from the result set
    const currentUser = rows[0]['current_user'];
    console.log(`Connected as: ${currentUser}`);
  } catch (err) {
    // Handling any errors that occur during the query
    console.error('Error executing query:', err);
  } finally {
    // Safely releasing the client back to the pool if it exists
    if (client) {
      client.release();
    }
  }
})();
