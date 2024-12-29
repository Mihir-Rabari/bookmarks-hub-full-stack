const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
const session = require('express-session');
const db = require('./api/db');

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Routes
const authRoutes = require('./api/routes/auth');
const projectRoutes = require('./api/routes/projects');
const taskRoutes = require('./api/routes/tasks');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle joining a project
  socket.on('joinProject', ({ projectId, userName }) => {
    socket.join(projectId);
    console.log(`${userName} joined project ${projectId}`);
  });

  // Emit project update to all connected clients in a project
  socket.on('updateProject', (data) => {
    io.to(data.projectId).emit('projectUpdate', data);
  });

  // Emit task update to all connected clients in a project
  socket.on('updateTaskProgress', (data) => {
    io.to(data.projectId).emit('taskUpdate', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve the app on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});