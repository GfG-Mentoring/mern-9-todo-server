require('dotenv').config();

const express = require('express');

const { connectToDatabase } = require('./src/models');

const userRouter = require('./src/controllers/user');
const todoRouter = require('./src/controllers/todo');

const server = express();

// Middleware to parse JSON request bodies
server.use(express.json());

server.use('/auth', userRouter);

server.use('/todos', todoRouter);

server.listen(3000, async () => {
  console.log('Connecting to the database...');
  await connectToDatabase(process.env.MONGODB_URL);
  console.log('Connected to the database successfully');
  console.log('Server is running on port 3000');
});
