const Project = require('../models/projectModel');

// Create a new project
exports.createProject = (req, res) => {
  const { user_id, name, description } = req.body;

  Project.create(user_id, name, description, (err, projectId) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating project' });
    }
    res.status(201).json({ message: 'Project created successfully', projectId });
  });
};

// Get all projects for a user
exports.getProjectsByUserId = (req, res) => {
  const user_id = req.params.user_id;

  Project.getByUserId(user_id, (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching projects' });
    }
    res.status(200).json({ projects });
  });
};

// Get project by ID
exports.getProjectById = (req, res) => {
  const id = req.params.id;

  Project.getById(id, (err, project) => {
    if (err || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ project });
  });
};