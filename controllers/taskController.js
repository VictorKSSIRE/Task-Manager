/* 
* Task-related logic handling
*/

// Simulate database with task array
export const tasks = [
    {id: 1, task: "Complete homework", completed: false},
    {id: 2, task: "Go grocery shopping", completed: true}
];

// Fetching tasks - GET
export const getTasks = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(tasks));
};

// Adding/Creating task - POST
export const createTask = (req, res) => {
    let body = '';

    // Listen for data from the request
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    // Once all data is received, parse and add to task
    req.on('end', () => {
        try {
            const { task } = JSON.parse(body);
            if (!task) {
                throw new Error('Task description is required');
            }
            const newTask = {
                id: tasks.length + 1, 
                task, 
                completed: false
            };
            tasks.push(newTask);
    
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(newTask));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid request data', error: error.message }));
        }
        
    }); 
};

// Update or Replace task - PUT

// Partially Updates task - PATCH

// Delete task - DELETE