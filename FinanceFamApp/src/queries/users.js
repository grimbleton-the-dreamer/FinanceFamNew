// Import the shared pool from the parent directory
import pool from '../server';
export async function getUsers() {
    try {
        const query = `SELECT * FROM users`;
        const result = await pool.query(query);
        // Return all rows (i.e., all users) from the result
        return result.rows;
    }
    catch (err) {
        console.error('Error fetching all users:', err);
        // Return an empty array in case of an error
        return [];
    }
}
// Function to get a user by ID
export async function getUserById(userID) {
    try {
        const query = `SELECT * FROM users WHERE userID = $1`;
        const result = await pool.query(query, [userID]);
        return result.rows[0] || null;
    }
    catch (err) {
        console.error('Error fetching user by ID:', err);
        return null;
    }
}
// Function to create a new user
export async function createUser(user) {
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
    }
    catch (err) {
        console.error('Error creating user:', err);
        return false;
    }
}
