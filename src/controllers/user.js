const { Router } = require('express');
const { createUser, checkUserExists } = require('../services/user');
const { comparePassword } = require('../utils/password');

const userRouter = Router();

// Define a route to handle GET requests to the root path
userRouter.get('/', (req, res) => {
  // Send a simple response
  res.send('Hello, this is the user route!');
});

// Define a route to handle GET requests to the /profile path
userRouter.post('/signup', async (req, res) => {
  const { fullName, email, password, profilePicture } = req.body ?? {};

  if (!fullName || !email || !password) {
    // If any required field is missing, send a 400 Bad Request response
    return res.status(400).send('Full name, email, and password are required');
  }
  if (!email.includes('@')) {
    // If the email format is invalid, send a 400 Bad Request response
    return res.status(400).send('Invalid email format');
  }
  if (await checkUserExists(email)) {
    return res.status(400).send('User with this email already exists');
  }
  if (password.length < 6) {
    // If the password is too short, send a 400 Bad Request response
    return res.status(400).send('Password must be at least 6 characters long');
  }

  try {
    const user = await createUser(fullName, email, password, profilePicture);
    return res.status(201).send({
      message: 'User created successfully',
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    // If an error occurs while creating the user, send a 500 Internal Server Error response
    return res.status(500).send('Error creating user');
  }

  // Send a simple response
  res.send('Hello, this is the user profile route!');
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    // If email or password is missing, send a 400 Bad Request response
    return res.status(400).send('Email and password are required');
  }
  if (!email.includes('@')) {
    // If the email format is invalid, send a 400 Bad Request response
    return res.status(400).send('Invalid email format');
  }

  const user = await checkUserExists(email);
  if (!user) {
    // If the user does not exist, send a 404 Not Found response
    return res.status(404).send('User not found. Please sign up first.');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    // If the password is incorrect, send a 401 Unauthorized response
    return res.status(401).send('Invalid password.');
  }

  return res.status(200).send({
    message: 'Login successful',
    data: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
});

userRouter.get('/:id', (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.id;

  // Send a response with the user ID
  res.send(`User ID: ${userId}`);
});

module.exports = userRouter;
