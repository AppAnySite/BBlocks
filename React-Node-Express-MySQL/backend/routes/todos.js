// todos.js
const express = require('express');
const router = express.Router();
const connection = require('../models/Todo');

// GET all todos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM todos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).json({ message: 'Failed to fetch todos' });
      return;
    }
    res.json(results);
  });
});

// POST a new todo
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  const sql = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
  connection.query(sql, [title, completed], (err, result) => {
    if (err) {
      console.error('Error creating todo:', err);
      res.status(500).json({ message: 'Failed to create todo' });
      return;
    }
    res.status(201).json({ id: result.insertId, title, completed });
  });
});

// PUT update a todo by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const sql = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
  connection.query(sql, [title, completed, id], (err, result) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.status(500).json({ message: 'Failed to update todo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.json({ id, title, completed });
  });
});

// DELETE a todo by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ message: 'Failed to delete todo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});

module.exports = router;
