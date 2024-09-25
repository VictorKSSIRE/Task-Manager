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
        const { name, email } = JSON.parse(body);
        const newUser = await userModel.createUser(name, email);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
};

// Update or Replace user - PUT

// Partially Updates user - PATCH

// Delete user - DELETE
