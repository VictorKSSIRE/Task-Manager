/**
 * User-related logic handler
 * 
 */

// Simulate Database
const users = [
    {id:1, name: "Victor", age: 23},
    {id:2, name: "Abebe", age: 22}
];

// Fetching user - GET
export const getUsers = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
};

// Adding user - POST

// Update or Replace user - PUT

// Partially Updates user - PATCH

// Delete user - DELETE
