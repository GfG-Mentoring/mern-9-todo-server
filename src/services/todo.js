const Todo = require('../models/todo');

const createTodo = (todo) => {
  const todoItem = new Todo({
    todo: todo,
    createdBy: 'user-1234', // Placeholder for user ID
  });

  return todoItem.save();
};

const getAllTodos = async (limit = 10, skip = 0) => {
  return {
    todos: await Todo.find({}).limit(limit).skip(skip),
    total: await Todo.countDocuments({}),
  };
};

const getTodoById = (id) => {
  console.log('Fetching todo by ID:', id);
  return Todo.findById(id);
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
};
