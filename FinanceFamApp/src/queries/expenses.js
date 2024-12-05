import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
// Load environment variables
dotenv.config({
    path: path.resolve(__dirname, '../.env'), // Adjust the path as needed
});
// Initialize the PostgreSQL pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT), // Ensure PORT is treated as a number
});
// Function to fetch a user's expenses
async function getUserExpenses(userID) {
    let client;
    try {
        // Connect to the pool
        client = await pool.connect();
        // SQL query to fetch user's expenses
        const query = `
      SELECT 
        expenseID, 
        userID, 
        category, 
        amount, 
        dueDate, 
        recurring, 
        isPaid 
      FROM 
        expenses 
      WHERE 
        userID = $1
      ORDER BY 
        dueDate ASC;
    `;
        // Execute the query
        const result = await client.query(query, [userID]);
        // Return the rows
        return result.rows;
    }
    catch (err) {
        console.error('Error fetching user expenses:', err.message);
        return [];
    }
    finally {
        // Release the client back to the pool
        if (client) {
            client.release();
        }
    }
}
// Example usage
(async () => {
    try {
        const userID = '3'; // Example user ID
        const expenses = await getUserExpenses(userID);
        console.log('User Expenses:', expenses);
    }
    catch (error) {
        console.error('Error:', error);
    }
})();
