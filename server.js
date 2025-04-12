// 1. Basic Setup and all Require Packages
const express = require("express");  // Express helps us build the server easily
const fs = require("fs");           // File system for reading/writing to tasks.json
const cors = require("cors");       // Allows frontend (React) to talk to backend (Node)


// 2. Initialize the App
const app = express();               // Start the express app
const PORT = 5000;
const FILE = "tasks.json";           // stores everything in a file called tasks.json (like our notebook).

// 3. Middleware (helpers)
app.use(cors());                      // Allow requests from frontend (no CORS error)
app.use(express.json());              // Allows us to read JSON data from requests

// 4. Helper Functions to Read/Write File
function readTasks() {
  const data = fs.readFileSync(FILE); // Read data from tasks.json file
  return JSON.parse(data);            // Convert that JSON text to a JS array
}

function writeTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2)); // Save tasks array as JSON (with spacing)
}


// 5. GET Request — Fetch All Tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();  // Get all tasks from file
  res.json(tasks);            // Send them as a response to frontend
});

// 6. POST Request — Add New Task
app.post("/tasks", (req, res) => {
  const tasks = readTasks();    // Get current tasks
  tasks.push(req.body);         // Add the new task (from frontend)
  writeTasks(tasks);            // Save updated list back to file
  res.status(201).json({ success: true }); // Respond with success
});

// 7. PUT Request — Update a Task
app.put("/tasks/:index", (req, res) => {
  const tasks = readTasks();                   // Get all tasks
  const index = parseInt(req.params.index);    // Get task index from URL
  tasks[index] = req.body;                     // Replace the old task with updated one
  writeTasks(tasks);                           // Save back to file
  res.json({ success: true });                 // Send success response
});

// 8. DELETE Request — Remove a Task
app.delete("/tasks/:index", (req, res) => {
  const tasks = readTasks();                   // Get all tasks
  const index = parseInt(req.params.index);    // Get task index to delete
  tasks.splice(index, 1);                      // Remove it from array
  writeTasks(tasks);                           // Save updated list
  res.json({ success: true });                 // Send success
});

// 9. Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
