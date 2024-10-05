const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

let tasks = [];

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
    };
  
    tasks.push(newTask);
    res.status(201).json(newTask);
  });


  // Get all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
  });

  // Get a task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
  
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    res.status(200).json(task);
  });

  // Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
  
    const task = tasks.find(t => t.id === taskId);
  
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed === 'boolean') task.completed = completed;
  
    res.status(200).json(task);
  });

  // Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
  
    if (taskindex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  });


module.exports = app;
