const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get projects for a user
router.get('/:user_id', projectController.getProjectsByUserId);

// Get a project by ID
router.get('/project/:id', projectController.getProjectById);

module.exports = router;