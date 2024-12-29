const db = require('../db');

// Create a new task
exports.create = (project_id, name, description, category, progress, callback) => {
  const stmt = db.prepare("INSERT INTO tasks (project_id, name, description, category, progress) VALUES (?, ?, ?, ?, ?)");
  stmt.run(project_id, name, description, category, progress, function(err) {
    callback(err, this.lastID);
  });
};

// Get all tasks by project ID
exports.getByProjectId = (project_id, callback) => {
  db.all("SELECT * FROM tasks WHERE project_id = ?", [project_id], (err, rows) => {
    callback(err, rows);
  });
};

// Get task by ID
exports.getById = (id, callback) => {
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};

// Update task progress
exports.updateProgress = (id, progress, callback) => {
  const stmt = db.prepare("UPDATE tasks SET progress = ? WHERE id = ?");
  stmt.run(progress, id, function(err) {
    callback(err);
  });
};