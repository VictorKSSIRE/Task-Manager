/**
 * Managing User Database
 */

import pool from './db.js';

// Get all users
export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Create a new user
export const createUser = async (name, email) => {
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return result.rows[0];
};

