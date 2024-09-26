/**
 * User-related logic handler
 * 
 */

// Simulate Database
//const users = [
//    {id:1, name: "Victor", age: 23},
//    {id:2, name: "Abebe", age: 22}
//];

// import Database
import * as userModel from '../models/userModel.js';

// Fetching users - GET all users
export const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(); 
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
};

// Create a new user - POST
export const createUser = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { name, email } = JSON.parse(body);
            if (!name) {
                throw new Error('Missing name argument');
            } else if (!email) {
                throw new Error('Missing email argument');
            }
            const newUser = await userModel.createUser(name, email);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch(error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid request data', error: error.message }));
        }
    });
};

// Update or Replace user - PUT

// Partially Updates user - PATCH

// Delete user - DELETE
