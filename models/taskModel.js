/**
 * Managing Task Database
 */

import pool from './db.js';

// Get all tasks for a specific user
export const getTasksByUser = async (user_id) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
    return result.rows;
};

// Create a new task for a user with a timestamp
export const createTask = async (user_id, task) => {
    const result = await pool.query(
        'INSERT INTO tasks (user_id, task) VALUES ($1, $2) RETURNING *',
        [user_id, task]
    );
    return result.rows[0];
};

// Mark a task as completed and update the completion time
export const completeTask = async (task_id) => {
    const result = await pool.query(
        'UPDATE tasks SET completed = true, completed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [task_id]
    );
    return result.rows[0];
};

