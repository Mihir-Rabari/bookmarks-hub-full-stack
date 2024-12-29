const db = require('../db');

// Create a new user
exports.create = (email, password, name, callback) => {
  const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
  stmt.run(email, password, name, function(err) {
    callback(err, this.lastID);
  });
};

// Find a user by email
exports.findByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    callback(err, row);
  });
};

// Find a user by ID
exports.findById = (id, callback) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};