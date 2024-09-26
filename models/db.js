/**
 * Pooling PostgreSQL databases
 * Here's what they look like:
 * -- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tasks table with a foreign key reference to the Users table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);
 */

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    // From .env file
    user: process.env.DB_USER,      
    host: process.env.DB_HOST,      
    database: process.env.DB_NAME,
    password: process.env.DB_PASS, 
    port: process.env.DB_PORT,      
});

export default pool;
