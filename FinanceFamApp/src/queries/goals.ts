// Import the shared pool from the parent directory
import pool from '../server';

// Interface for Goal
export interface Goal {
  goalID: string;
  userID: string;
  targetAmount: number;
  progress: string;
  category: string;
  deadline: string;
}

// Function to get goals for a user
export async function getGoalsByUserId(userID: string): Promise<Goal[]> {
  try {
    const query = `SELECT * FROM goals WHERE userID = $1`;
    const result = await pool.query(query, [userID]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching goals by user ID:', err);
    return [];
  }
}

// Function to create a new goal
export async function createGoal(goal: Goal): Promise<boolean> {
  try {
    const query = `
      INSERT INTO goals (goalID, userID, targetAmount, progress, category, deadline)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await pool.query(query, [
      goal.goalID,
      goal.userID,
      goal.targetAmount,
      goal.progress,
      goal.category,
      goal.deadline,
    ]);
    return true;
  } catch (err) {
    console.error('Error creating goal:', err);
    return false;
  }
}
