const fs = require('fs');
const path = require('path');


function readTodoFile() {
    const filePath = path.join(__dirname, '../models/todos.json');
    const todos = fs.readFileSync(filePath, 'utf8');

    // If the file is empty, return an empty array
    return JSON.parse(todos || '[]');
}

function writeTodoFile(todos) {
    // Read existing todos from the file
    const savedTodos = readTodoFile();
    // Combine existing todos with new todos
    const allTodos = [...savedTodos, ...todos];
    // Write the combined todos back to the file
    const filePath = path.join(__dirname, '../models/todos.json');
    fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2));
}


const createTodo = (todo) => {
    console.log('Creating todo:', todo);
    const todoItem = {
        id: new Date().getTime(), // Simple ID based on timestamp
        todo,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        createdBy: 'user-1234', // Placeholder for user ID
    }
    writeTodoFile([todoItem]);
    return todoItem;
}


const getAllTodos = () => {
    console.log('Fetching all todos');
    const todos = readTodoFile();
    return todos;
}

const getTodoById = (id) => {
    console.log('Fetching todo by ID:', id);
    const todos = readTodoFile();
    const todo = todos.find(t => t.id === id);
    return todo;
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById
}