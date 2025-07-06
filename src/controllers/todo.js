const { Router } = require('express');
const { createTodo, getAllTodos, getTodoById } = require('../services/todo');

const mongoose = require('mongoose');

const todoRouter = Router();

todoRouter.post('/', async (req, res) => {
  // Extract the todo item from the request body
  const todoItem = req.body.todo;

  if (!todoItem) {
    // If no todo item is provided, send a 400 Bad Request response
    return res.status(400).send('Todo item is required');
  }

  try {
    const todo = await createTodo(todoItem);
    res.send({
      message: 'Todo item created successfully',
      data: todo,
    });
  } catch (error) {
    console.error('Error creating todo item:', error);
    // If an error occurs while creating the todo item, send a 500 Internal Server Error response
    return res.status(500).send('Error creating todo item');
  }
});

todoRouter.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // skip items based on the page number and limit
    // For example, if page is 2 and limit is 10, skip will be 10
    const todos = await getAllTodos(limit, (page - 1) * limit);
    res.send({
      message: 'Todo items fetched successfully',
      data: todos,
    });
  } catch (error) {
    console.error('Error fetching todo items:', error);
    // If an error occurs while fetching the todo items, send a 500 Internal Server Error response
    return res.status(500).send('Error fetching todo items');
  }
  // This route can be used to fetch all todo items
  // For now, we will just send a placeholder response
});

todoRouter.get('/:id', async (req, res) => {
  const todoId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).send('Invalid todo ID');
  }

  try {
    const todo = await getTodoById(todoId);
    if (!todo) {
      return res.status(404).send('Todo item not found');
    }
    res.send({
      message: 'Todo item fetched successfully',
      data: todo,
    });
  } catch (err) {
    console.error('Error fetching todo item:', err);
    // If an error occurs while fetching the todo item, send a 500 Internal Server Error response
    return res.status(500).send('Error fetching todo item');
  }
});

// todoRouter.update()
// todoRouter.delete()

module.exports = todoRouter;
