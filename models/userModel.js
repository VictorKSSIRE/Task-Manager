/**
 * Managing User Database. Focuses on interacting with database, leaves error
 * handling to controller.
 * 
 * -- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
 */

import pool from './db.js';

// GET all users
export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// GET an individual user by id (Probably used internally)
export const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

// GET individual user by name
export const getUserByName = async (name) => {
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    return result.rows[0];
};

// GET individual user by email
export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Create a new user - POST
export const createUser = async (name, email) => {
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return result.rows[0];
};

// PATCH - partial update (e.g., updating name or email)
export const updateUserPartially = async (id, fieldsToUpdate) => {
    const { name, email } = fieldsToUpdate;

    // Dynamically build the query to update only the provided fields
    const updates = [];
    const values = [];

    if (name) {
        updates.push(`name = $${updates.length + 1}`);
        values.push(name);
    }

    if (email) {
        updates.push(`email = $${updates.length + 1}`);
        values.push(email);
    }

    if (updates.length === 0) {
        throw new Error('No fields provided to update');
    }

    const query = `
        UPDATE users
        SET ${updates.join(', ')}
        WHERE id = $${values.length + 1}
        RETURNING *
    `;

    values.push(id); // Use the id for locating the user, not for updating it.
    const result = await pool.query(query, values);
    return result.rows[0];
};

// PUT - full update (replace all fields except for the id)
export const updateUser = async (id, name, email) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id] // id is used to locate the user, not to be updated
    );
    return result.rows[0];
};

// DELETE user by id
export const deleteUserById = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0]; // Return the deleted user info
};

// DELETE user by name
export const deleteUserByName = async (name) => {
    const result = await pool.query('DELETE FROM users WHERE name = $1 RETURNING *', [name]);
    return result.rows[0]; // Return the deleted user info
};

// DELETER user by email
export const deleteUserByEmail = async (email) => {
    const result = await pool.query('DELETE FROM users WHERE name = $1 RETURNING *', [email]);
    return result.rows[0]; // Return the deleted user info
};

// DELETE all users (bulk delete)
export const deleteAllUsers = async () => {
    const result = await pool.query('DELETE FROM users RETURNING *');
    return result.rows; // Return an array of all deleted users
};

