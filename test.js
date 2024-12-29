const axios = require('axios');

const BASE_URL = 'http://localhost:3000';  // Replace with your app's base URL

let token;  // To store JWT token

// Helper function to log in and get the token
async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    // Save the JWT token from the response
    token = response.data.token;
    console.log('Login successful');
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
  }
}

// Helper function to create a task
async function createTask(projectId, taskName, category, progress) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/tasks`,
      {
        projectId,
        taskName,
        category,
        progress,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Task created:', response.data.task);
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
  }
}

// Helper function to get all tasks
async function getTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Tasks:', response.data.tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
  }
}

// Simulate the process
async function simulate() {
  // Step 1: Login
  await login('user@example.com', 'yourpassword');

  // Step 2: Create some tasks
  await createTask(1, 'Task 1', 'Development', 20);
  await createTask(1, 'Task 2', 'Testing', 40);

  // Step 3: Optionally log out (simulate by discarding the token)
  console.log('Logging out...');
  token = null;

  // Step 4: Re-login
  console.log('Re-logging in...');
  await login('user@example.com', 'yourpassword');

  // Step 5: Get tasks after re-login
  await getTasks();
}

// Run the simulation
simulate();