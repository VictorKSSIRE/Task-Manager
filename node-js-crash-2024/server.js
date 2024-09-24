// Entry Point
import http from 'http'; //importing from http module included in Node.js
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = process.env.PORT;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
    //res.setHeader('Content-Type', 'text/html'); // 
    //res.statusCode = 404;
    //res.write('Hello World'); //Sending text to client, e.g. browser
    //console.log(req.url); //Check where you are sending request
    //console.log(req.method); // Check what request you are making
    //res.end('<h1>Hello World</h1>'); // Ending stream
    try {
        // Check if GET request
        if (req.method === 'GET') {
            let filePath;
            if(req.url === '/') {
                //res.writeHead(200, {'Content-Type': 'text/html'});
                //res.end('<h1>Homepage</h1>');
                filePath = path.join(__dirname, 'public', 'index.html');
            } else if(req.url === '/about') {
                //res.writeHead(200, {'Content-Type': 'text/html'});
                //res.end('<h1>About</h1>');
                filePath = path.join(__dirname, 'public', 'about.html');
            } else {
                //res.writeHead(404, {'Content-Type': 'text/html'});
                //res.end('<h1>Not Found</h1>');
                throw new Error('Not Found');
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
        } else {
            throw new Error('Method not allowed');
        } 
    }   catch (error) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Server Error');
        }
    
}); //creating a servier. createServer takes as arguments a function

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); // takes in a port # and function