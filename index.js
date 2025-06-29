const express = require('express');
const userRouter = require('./src/controllers/user');
const todoRouter = require('./src/controllers/todo');

const server = express();

// Middleware to parse JSON request bodies
server.use(express.json());


server.use('/users', userRouter)

server.use('/todos', todoRouter);


server.listen(3000, () => {
    console.log('Server is running on port 3000');
})