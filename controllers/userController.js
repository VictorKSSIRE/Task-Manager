/**
 * User-related logic handler. Used methods from userModel and handles errors.
 * Handles Client requests and links to database manipulation
 * 
 */
// import Database
import * as userModel from '../models/userModel.js';

// GET all users
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers(); 
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch(error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching users', error: error.message }));
    }
};

// GET individual user by Id
export const getUser = async (req, res) => {
    // Assuming the user info is passed in URL as a parameter
    const userId = req.params.id; 

    // If none of id, name, or email is provided, return a 400 error
    if (!userId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Bad Request: You must provide either an ID, name, or email to search for the user' }));
        return;
    }

    try {
        const user = await userModel.getUserById(userId);
        

        // If no user is found, return 404
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        // If user is found, return the user
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching user', error: error.message }));
    }
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
            if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Name and email are required' }));
                return;
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


// PATCH - Partially update user info
export const updateUserPartially = async (req, res) => {
    const userId = req.params.id;
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const fieldsToUpdate = JSON.parse(body);
            const updatedUser = await userModel.updateUserPartially(userId, fieldsToUpdate);

            if (!updatedUser) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating user', error: error.message }));
    }
};

// PUT - Fully update user info
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const { name, email } = JSON.parse(body);
            if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Bad Request: Both Name and Email are required' }));
                return;
            }

            const updatedUser = await userModel.updateUser(userId, name, email);

            if (!updatedUser) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating user', error: error.message }));
    }
};


// DELETE user
export const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    // If none of id, name, or email is provided, return a 400 error
    if (!userId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Bad Request: You must provide either an ID, name, or email to delete the user' }));
        return;
    }

    try {
        const deletedUser = await userModel.deleteUserById(userId);
        
        if (!deletedUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedUser));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error deleting user', error: error.message }));
    }
};


// DELETE all users (bulk delete)
export const deleteAllUsers = async (req, res) => {
    try {
        const deletedUsers = await userModel.deleteAllUsers();
        if (deletedUsers.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No users found to delete' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedUsers));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error deleting users', error: error.message }));
    }
};
