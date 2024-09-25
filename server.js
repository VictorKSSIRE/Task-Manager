/* 
* Main server file
* Conatins:
*/
// Importing HTTP module
import {createServer} from 'http';
// Importing File System module
import fs from 'fs/promises';
// Get appendFile function
import appendFile from './utils.js';

// Defining port where server will listen
const PORT = process.env.PORT || 8000;
// Defining where route logic will come from
import routes from './routes.js';


// Logging Middleware - Logs URL and Methods when Request is made
// to both console and text file
const logger = async (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    await appendFile(`${req.method} ${req.url}`);
    next();
};

// Server
const server = createServer((req, res) => {
    logger(req, res, () => {
        routes(req, res);
        console.log(`Routes have been run`);
    });
});


// Server starts listening on port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
