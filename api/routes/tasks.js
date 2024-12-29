const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/', taskController.createTask);

// Get tasks for a project
router.get('/:project_id', taskController.getTasksByProjectId);

// Get a task by ID
router.get('/task/:id', taskController.getTaskById);

// Update task progress
router.put('/task/:id', taskController.updateTaskProgress);

module.exports = router;