require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create database if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME, (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Switch to the todo_app_db database
    connection.query("USE " + process.env.DB_NAME, (err, result) => {
      if (err) {
        console.error('Error switching to todo_app_db:', err);
        return;
      }
      console.log('Using ' + process.env.DB_NAME + ' database');

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

module.exports = connection;
