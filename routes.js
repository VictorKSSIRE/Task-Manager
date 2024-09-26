/* 
* File that handles route logic.
* Uses controller calls
*/

import * as userController from './controllers/userController.js';
import * as taskController from './controllers/taskController.js';

// Create routes using controllers
const routes = async (req, res) => {
    const {url, method} = req;
    // Extract path and parameters
    const urlParts = url.split('/');
    const path = `/${urlParts[1]}/${urlParts[2]}`;
    const id = urlParts[3]; // Could be userId or taskId, depending on the route

    // Routes for Users
    if (path === '/api/users') {
        if (method === 'GET' && !id) {
            // GET all users
            await userController.getUsers(req, res);
        } else if (method === 'POST' && !id) {
            // Create a new user
            await userController.createUser(req, res);
        } else if (method === 'GET' && id) {
            // GET a specific user by id, name, or email
            req.params = { id }; // Pass the user ID to the controller
            await userController.getUser(req, res);
        } else if (method === 'PATCH' && id) {
            // Partially update a user
            req.params = { id };
            await userController.updateUserPartially(req, res);
        } else if (method === 'PUT' && id) {
            // Fully update a user
            req.params = { id };
            await userController.updateUser(req, res);
        } else if (method === 'DELETE' && id) {
            // DELETE a specific user by ID, name, or email
            req.params = { id };
            await userController.deleteUserById(req, res);
        } else if (method === 'DELETE' && !id) {
            // DELETE all users (bulk delete)
            await userController.deleteAllUsers(req, res);
        } else {
            // Route not found
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route Not Found' }));
        }
    } 

    // Task Routes
    
    // If no route matches, return 404
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Route Not Found'
        }));
    }
    /*if (url === '/api/users' && method === 'GET') {
        userController.getUsers(req, res);
    } else if(url === '/api/users' && method === 'POST') {
        userController.createUser(req, res);
    } else if (url === '/api/tasks' && method === 'GET') {
        taskController.getTasks(req, res);
    } else if (url === '/api/tasks' && method === 'POST') {
        taskController.createTask(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Route Not Found'
        }));
    }*/
};

export default routes;