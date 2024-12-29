const db = require('../db');

// Create a new project
exports.create = (user_id, name, description, callback) => {
  const stmt = db.prepare("INSERT INTO projects (user_id, name, description) VALUES (?, ?, ?)");
  stmt.run(user_id, name, description, function(err) {
    callback(err, this.lastID);
  });
};

// Get all projects by user ID
exports.getByUserId = (user_id, callback) => {
  db.all("SELECT * FROM projects WHERE user_id = ?", [user_id], (err, rows) => {
    callback(err, rows);
  });
};

// Get project by ID
exports.getById = (id, callback) => {
  db.get("SELECT * FROM projects WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};