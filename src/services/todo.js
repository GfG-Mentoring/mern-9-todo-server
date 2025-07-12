const Todo = require('../models/todo');

const createTodo = (todo, createdBy) => {
  const todoItem = new Todo({
    todo: todo,
    createdBy: createdBy,
  });

  return todoItem.save();
};

const getAllTodos = async (limit = 10, skip = 0, createdBy) => {
  const findCondition = {
    createdBy: createdBy,
  };

  return {
    todos: await Todo.find(findCondition).limit(limit).skip(skip),
    total: await Todo.countDocuments(findCondition),
  };
};

const getTodoById = (id, createdBy) => {
  console.log('Fetching todo by ID:', id);
  return Todo.find({
    _id: id,
    createdBy,
  });
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
};
