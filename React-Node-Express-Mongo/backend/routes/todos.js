const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const todo = new Todo({
      title,
      completed
    });
    await todo.save();
    res.status(201).json(todo); // HTTP 201 Created
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
});

// PUT update a todo by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' }); // HTTP 404 Not Found
    }
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' }); // HTTP 404 Not Found
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

module.exports = router;
