// Import the shared pool from the parent directory
import pool from '../server';

// Interface for User
export interface User {
  userID: string;
  name: string;
  password: string;
  role: string;
  yearlySalary: number;
  bankAmount: number;
  adminID: string | null;
}

// Function to get a user by ID
export async function getUserById(userID: string): Promise<User | null> {
  try {
    const query = `SELECT * FROM users WHERE userID = $1`;
    const result = await pool.query(query, [userID]);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    return null;
  }
}

// Function to create a new user
export async function createUser(user: User): Promise<boolean> {
  try {
    const query = `
      INSERT INTO users (userID, name, password, role, yearlySalary, bankAmount, adminID)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(query, [
      user.userID,
      user.name,
      user.password,
      user.role,
      user.yearlySalary,
      user.bankAmount,
      user.adminID,
    ]);
    return true;
  } catch (err) {
    console.error('Error creating user:', err);
    return false;
  }
}
