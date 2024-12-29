const Task = require('../models/taskModel');

// Create a new task
exports.createTask = (req, res) => {
  const { project_id, name, description, category, progress } = req.body;

  Task.create(project_id, name, description, category, progress, (err, taskId) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating task' });
    }
    res.status(201).json({ message: 'Task created successfully', taskId });
  });
};

// Get all tasks for a project
exports.getTasksByProjectId = (req, res) => {
  const project_id = req.params.project_id;

  Task.getByProjectId(project_id, (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.status(200).json({ tasks });
  });
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const id = req.params.id;

  Task.getById(id, (err, task) => {
    if (err || !task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  });
};

// Update task progress
exports.updateTaskProgress = (req, res) => {
  const id = req.params.id;
  const { progress } = req.body;

  Task.updateProgress(id, progress, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating task progress' });
    }
    res.status(200).json({ message: 'Task progress updated successfully' });
  });
};