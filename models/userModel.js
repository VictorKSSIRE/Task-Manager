/**
 * Managing User Database
 */

import pool from './db.js';

// GET all users
export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// GET indiv user by id

// GET indiv user by name

// GET indiv user by email

// Create a new user - POST
export const createUser = async (name, email) => {
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return result.rows[0];
};

// PATCH - partial update

// PUT - update

// DELETE


