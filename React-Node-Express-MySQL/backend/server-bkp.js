const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create database if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS todo_app_db", (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Switch to the todo_app_db database
    connection.query("USE todo_app_db", (err, result) => {
      if (err) {
        console.error('Error switching to todo_app_db:', err);
        return;
      }
      console.log('Using todo_app_db database');

      // Create todos table if it doesn't exist
      connection.query(`
        CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN NOT NULL
        )`, (err, result) => {
        if (err) {
          console.error('Error creating todos table:', err);
          return;
        }
        console.log('Todos table created or already exists');
      });
    });
  });
});

// GET all todos
app.get('/todos', (req, res) => {
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
app.post('/todos', (req, res) => {
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
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    console.log('Todo ID:', id); // Log the id parameter
  
    const { title, completed } = req.body;
    console.log('New todo:', title, completed);
  
    const sql = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
    console.log('SQL:', sql);
  
    connection.query(sql, [title, completed, id], (err, result) => {
      if (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: 'Failed to update todo' });
        return;
      }
      console.log('Result:', result);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.json({ id, title, completed });
    });
  });
  
  

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});