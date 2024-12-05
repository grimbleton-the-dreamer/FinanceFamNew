// Importing pg module as a default import
import pkg from 'pg'; // Default import for 'pg' (PostgreSQL module)
const { Pool } = pkg; // Destructure Pool from the default import
// Importing required modules for path and dotenv
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
    override: true, // Overwrite existing environment variables (if any)
    path: path.join('./src/', 'process.env') // Path to the custom environment file (db.env)
});
// Type-casting `process.env` to match our EnvConfig type
const config = process.env;
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
    port: Number(config.PORT), // Ensure the PORT is treated as a number
});
// Connect to the database and perform a query
async function connectAndQuery() {
    try {
        // Attempt to get a client from the pool
        const client = await pool.connect();
        // Execute a query to test the connection (e.g., SELECT the current timestamp)
        const res = await client.query('SELECT NOW();');
        // Log the result to the console (this should return the current timestamp)
        console.log('Successfully connected to the database. Result:', res.rows[0]);
        // Release the client back to the pool
        client.release();
    }
    catch (err) {
        // Log an error if the connection or query fails
        console.error('Error connecting to the database:', err);
    }
}
// Call the function to connect and run the query
connectAndQuery();
// Export the pool to be used in query files
export default pool;
