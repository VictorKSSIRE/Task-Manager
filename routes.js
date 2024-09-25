/* 
* File that handles route logic
*/

import * as userController from './controllers/userController.js';
import * as taskController from './controllers/taskController.js';

// Create routes using controllers
const routes = (req, res) => {
    const {url, method} = req;
    if (url === '/api/users' && method === 'GET') {
        userController.getUsers(req, res);
    } else if (url === '/api/tasks' && method === 'GET') {
        taskController.getTasks(req, res);
    } else if (url === '/api/tasks' && method === 'POST') {
        taskController.createTask(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Route Not Found'
        }));
    }
};

export default routes;