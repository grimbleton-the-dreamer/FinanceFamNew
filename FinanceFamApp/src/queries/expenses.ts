import { Pool, type PoolClient, type QueryResult } from 'pg';
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

// Interface for Expenses
interface Expense {
  expenseID: string;
  userID: string;
  category: string;
  amount: number;
  dueDate: string; // String representation of the date
  recurring: boolean;
  isPaid: boolean;
}

// Function to fetch a user's expenses
async function getUserExpenses(userID: string): Promise<Expense[]> {
  let client: PoolClient | undefined;
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
    const result: QueryResult<Expense> = await client.query(query, [userID]);

    // Return the rows
    return result.rows;
  } catch (err) {
    console.error('Error fetching user expenses:', (err as Error).message);
    return [];
  } finally {
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
  } catch (error) {
    console.error('Error:', error);
  }
})();
